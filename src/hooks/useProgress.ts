import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AppStorageData,
  UnitProgressRecord,
  UnitQuizScoreRecord,
  EditionType,
  MistakeNoteItem
} from '../types';
import { useAuth } from '../contexts/AuthContext';
import {
  getLocalMistakeNotes,
  saveLocalMistakeNotes,
  syncLocalWithCloud,
  saveUnitProgressToCloud,
  saveQuizScoreToCloud,
  saveMistakeNoteToCloud,
  resolveMistakeNoteInCloud,
  recordStudySessionToCloud,
  subscribeToRealtimeSync
} from '../services/cloudSyncService';

const STORAGE_KEY = 'korean_toktok_progress_v3';

export const getUnitKey = (unitNumber: number, edition: EditionType = 'kbs'): string => {
  return `${edition}_unit${unitNumber.toString().padStart(2, '0')}`;
};

const initialStorageData: AppStorageData = {
  progress: {
    kbs_unit01: {
      studied: true,
      vocabMastered: ['안녕하세요', '회사원', '의사']
    },
    wiz_unit01: {
      studied: true,
      vocabMastered: ['안녕하세요', '선생님']
    }
  },
  quizScores: {
    kbs_unit01: {
      attempts: 1,
      bestScore: 12,
      totalQuestions: 13,
      lastAttemptAt: new Date().toISOString()
    },
    wiz_unit01: {
      attempts: 1,
      bestScore: 10,
      totalQuestions: 13,
      lastAttemptAt: new Date().toISOString()
    }
  },
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalStudyMinutes: 25,
  currentEdition: 'kbs'
};

export const useProgress = () => {
  const { user, isAuthenticated, setCloudSyncStatus } = useAuth();
  const isInitialSyncDone = useRef(false);

  const [data, setData] = useState<AppStorageData>(() => {
    if (typeof window === 'undefined') return initialStorageData;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Migrate from legacy key if exists
      const legacy = localStorage.getItem('korean_toktok_progress_v2');
      if (legacy) {
        const parsed = JSON.parse(legacy);
        const migrated: AppStorageData = {
          ...initialStorageData,
          streakDays: parsed.streakDays || 1,
          lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0],
          totalStudyMinutes: parsed.totalStudyMinutes || 25,
          progress: {},
          quizScores: {}
        };
        Object.entries(parsed.progress || {}).forEach(([k, v]) => {
          const num = k.replace('unit', '');
          migrated.progress[`kbs_unit${num}`] = v as UnitProgressRecord;
          migrated.progress[`wiz_unit${num}`] = v as UnitProgressRecord;
        });
        Object.entries(parsed.quizScores || {}).forEach(([k, v]) => {
          const num = k.replace('unit', '');
          migrated.quizScores[`kbs_unit${num}`] = v as UnitQuizScoreRecord;
          migrated.quizScores[`wiz_unit${num}`] = v as UnitQuizScoreRecord;
        });
        return migrated;
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage:', e);
    }
    return initialStorageData;
  });

  const [mistakeNotes, setMistakeNotes] = useState<MistakeNoteItem[]>(() => {
    return getLocalMistakeNotes();
  });

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save progress to localStorage:', e);
      }
    }
  }, [data]);

  // Save mistake notes to LocalStorage
  useEffect(() => {
    saveLocalMistakeNotes(mistakeNotes);
  }, [mistakeNotes]);

  // Perform Cloud Sync when user changes or logs in
  useEffect(() => {
    if (!isAuthenticated || user.isGuest) {
      isInitialSyncDone.current = false;
      return;
    }

    let isMounted = true;
    const performSync = async () => {
      setCloudSyncStatus('syncing');
      const { mergedData, mergedMistakes, isCloudConnected } = await syncLocalWithCloud(
        user.id,
        data,
        mistakeNotes
      );

      if (isMounted) {
        setData(mergedData);
        setMistakeNotes(mergedMistakes);
        setCloudSyncStatus(isCloudConnected ? 'synced' : 'offline');
        isInitialSyncDone.current = true;
      }
    };

    performSync();

    // Subscribe to Realtime Sync updates from other devices
    const unsubscribe = subscribeToRealtimeSync(
      user.id,
      (remoteProg) => {
        if (!remoteProg) return;
        const key = getUnitKey(remoteProg.unit_number, remoteProg.edition);
        setData((prev) => ({
          ...prev,
          progress: {
            ...prev.progress,
            [key]: {
              studied: remoteProg.studied,
              vocabMastered: remoteProg.vocab_mastered || []
            }
          }
        }));
      },
      (remoteScore) => {
        if (!remoteScore) return;
        const key = getUnitKey(remoteScore.unit_number, remoteScore.edition);
        setData((prev) => ({
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [key]: {
              attempts: remoteScore.attempts,
              bestScore: remoteScore.best_score,
              totalQuestions: remoteScore.total_questions,
              lastAttemptAt: remoteScore.last_attempt_at
            }
          }
        }));
      },
      (remoteMistake) => {
        if (!remoteMistake) return;
        setMistakeNotes((prev) => {
          const idx = prev.findIndex(
            (m) =>
              m.unitNumber === remoteMistake.unit_number &&
              m.edition === remoteMistake.edition &&
              m.quizId === remoteMistake.quiz_id
          );
          const formatted: MistakeNoteItem = {
            id: remoteMistake.id,
            unitNumber: remoteMistake.unit_number,
            edition: remoteMistake.edition,
            quizId: remoteMistake.quiz_id,
            question: remoteMistake.question_text,
            userAnswer: remoteMistake.user_answer,
            correctAnswer: remoteMistake.correct_answer,
            explanation: remoteMistake.explanation,
            resolved: remoteMistake.resolved,
            createdAt: remoteMistake.created_at
          };

          if (idx !== -1) {
            const next = [...prev];
            next[idx] = formatted;
            return next;
          }
          return [formatted, ...prev];
        });
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user.id, isAuthenticated, user.isGuest]);

  // 1. Mark Unit as Studied
  const markUnitStudied = useCallback(
    (unitNumber: number, studied = true, edition: EditionType = 'kbs') => {
      const key = getUnitKey(unitNumber, edition);
      setData((prev) => {
        const current = prev.progress[key] || { studied: false, vocabMastered: [] };
        const updatedVocab = current.vocabMastered || [];
        
        // Cloud Sync background push
        if (isAuthenticated && !user.isGuest) {
          saveUnitProgressToCloud(user.id, unitNumber, edition, studied, updatedVocab);
        }

        return {
          ...prev,
          progress: {
            ...prev.progress,
            [key]: {
              ...current,
              studied
            }
          },
          lastActiveDate: new Date().toISOString().split('T')[0]
        };
      });
    },
    [user.id, isAuthenticated, user.isGuest]
  );

  // 2. Toggle Vocab Mastered
  const toggleVocabMastered = useCallback(
    (unitNumber: number, word: string, edition: EditionType = 'kbs') => {
      const key = getUnitKey(unitNumber, edition);
      setData((prev) => {
        const current = prev.progress[key] || { studied: false, vocabMastered: [] };
        const exists = current.vocabMastered.includes(word);
        const updatedVocab = exists
          ? current.vocabMastered.filter((w) => w !== word)
          : [...current.vocabMastered, word];

        // Cloud Sync background push
        if (isAuthenticated && !user.isGuest) {
          saveUnitProgressToCloud(user.id, unitNumber, edition, current.studied, updatedVocab);
        }

        return {
          ...prev,
          progress: {
            ...prev.progress,
            [key]: {
              ...current,
              vocabMastered: updatedVocab
            }
          }
        };
      });
    },
    [user.id, isAuthenticated, user.isGuest]
  );

  // 3. Check if Vocab is Mastered
  const isVocabMastered = useCallback(
    (unitNumber: number, word: string, edition: EditionType = 'kbs'): boolean => {
      const key = getUnitKey(unitNumber, edition);
      return data.progress[key]?.vocabMastered?.includes(word) || false;
    },
    [data]
  );

  // 4. Record Quiz Attempt
  const recordQuizAttempt = useCallback(
    (unitNumber: number, score: number, totalQuestions: number, edition: EditionType = 'kbs') => {
      const key = getUnitKey(unitNumber, edition);
      setData((prev) => {
        const current = prev.quizScores[key] || {
          attempts: 0,
          bestScore: 0,
          totalQuestions
        };

        const newAttempts = current.attempts + 1;
        const newBestScore = Math.max(current.bestScore, score);

        // Cloud Sync background push
        if (isAuthenticated && !user.isGuest) {
          saveQuizScoreToCloud(user.id, unitNumber, edition, newBestScore, newAttempts, totalQuestions);
          recordStudySessionToCloud(user.id, 5); // Add 5 minutes of quiz study
        }

        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [key]: {
              attempts: newAttempts,
              bestScore: newBestScore,
              totalQuestions,
              lastAttemptAt: new Date().toISOString()
            }
          },
          totalStudyMinutes: (prev.totalStudyMinutes || 25) + 5,
          lastActiveDate: new Date().toISOString().split('T')[0]
        };
      });
    },
    [user.id, isAuthenticated, user.isGuest]
  );

  // 5. Record Mistake Note
  const recordMistake = useCallback(
    (mistake: Omit<MistakeNoteItem, 'id' | 'createdAt' | 'resolved'>) => {
      const newItem: MistakeNoteItem = {
        ...mistake,
        id: `mistake_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        resolved: false,
        createdAt: new Date().toISOString()
      };

      setMistakeNotes((prev) => {
        const filtered = prev.filter(
          (m) => !(m.unitNumber === mistake.unitNumber && m.edition === mistake.edition && m.quizId === mistake.quizId)
        );
        return [newItem, ...filtered];
      });

      if (isAuthenticated && !user.isGuest) {
        saveMistakeNoteToCloud(user.id, newItem);
      }
    },
    [user.id, isAuthenticated, user.isGuest]
  );

  // 6. Resolve / Unresolve Mistake Note
  const resolveMistake = useCallback(
    (unitNumber: number, edition: EditionType, quizId: string, resolved = true) => {
      setMistakeNotes((prev) =>
        prev.map((m) => {
          if (m.unitNumber === unitNumber && m.edition === edition && m.quizId === quizId) {
            return { ...m, resolved };
          }
          return m;
        })
      );

      if (isAuthenticated && !user.isGuest) {
        resolveMistakeNoteInCloud(user.id, unitNumber, edition, quizId, resolved);
      }
    },
    [user.id, isAuthenticated, user.isGuest]
  );

  // 7. Delete Mistake Note
  const deleteMistake = useCallback((unitNumber: number, edition: EditionType, quizId: string) => {
    setMistakeNotes((prev) =>
      prev.filter(
        (m) => !(m.unitNumber === unitNumber && m.edition === edition && m.quizId === quizId)
      )
    );
  }, []);

  // Getters
  const getUnitProgress = useCallback(
    (unitNumber: number, edition: EditionType = 'kbs'): UnitProgressRecord => {
      const key = getUnitKey(unitNumber, edition);
      return data.progress[key] || { studied: false, vocabMastered: [] };
    },
    [data]
  );

  const getUnitQuizScore = useCallback(
    (unitNumber: number, edition: EditionType = 'kbs'): UnitQuizScoreRecord => {
      const key = getUnitKey(unitNumber, edition);
      return data.quizScores[key] || { attempts: 0, bestScore: 0, totalQuestions: 13 };
    },
    [data]
  );

  // Helper stats for a given edition
  const getEditionStats = useCallback(
    (edition: EditionType) => {
      const prefix = `${edition}_`;
      const editionProgressKeys = Object.keys(data.progress).filter((k) => k.startsWith(prefix));
      const completedUnitsCount = editionProgressKeys.filter((k) => data.progress[k]?.studied).length;

      const totalMasteredVocabCount = editionProgressKeys.reduce((acc, k) => {
        return acc + (data.progress[k]?.vocabMastered?.length || 0);
      }, 0);

      const editionQuizKeys = Object.keys(data.quizScores).filter((k) => k.startsWith(prefix));
      const quizAttemptedCount = editionQuizKeys.filter((k) => data.quizScores[k]?.attempts > 0).length;

      const perfectUnitsCount = editionQuizKeys.filter((k) => {
        const item = data.quizScores[k];
        return item && item.attempts > 0 && item.bestScore >= item.totalQuestions;
      }).length;

      const totalQuizScore = editionQuizKeys.reduce((acc, k) => {
        return acc + (data.quizScores[k]?.bestScore || 0);
      }, 0);

      return {
        completedUnitsCount,
        totalMasteredVocabCount,
        quizAttemptedCount,
        perfectUnitsCount,
        totalQuizScore,
        totalUnits: 45,
        overallPercentage: Math.round((completedUnitsCount / 45) * 100)
      };
    },
    [data]
  );

  // Data Backup & Restore utilities
  const exportProgressData = useCallback((): string => {
    return JSON.stringify({ ...data, mistakeNotes }, null, 2);
  }, [data, mistakeNotes]);

  const importProgressData = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.progress && parsed.quizScores) {
        setData(parsed);
        if (Array.isArray(parsed.mistakeNotes)) {
          setMistakeNotes(parsed.mistakeNotes);
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import progress JSON:', e);
      return false;
    }
  }, []);

  const resetProgressData = useCallback(() => {
    setData(initialStorageData);
    setMistakeNotes([]);
  }, []);

  const activeStats = getEditionStats(data.currentEdition || 'kbs');

  const stats = {
    streakDays: data.streakDays,
    totalStudyMinutes: data.totalStudyMinutes,
    completedUnitsCount: activeStats.completedUnitsCount,
    totalMasteredVocabCount: activeStats.totalMasteredVocabCount,
    overallPercentage: activeStats.overallPercentage,
    perfectUnitsCount: activeStats.perfectUnitsCount,
    totalQuizScore: activeStats.totalQuizScore
  };

  return {
    data,
    progress: data.progress,
    quizScores: data.quizScores,
    mistakeNotes,
    streakDays: data.streakDays,
    totalStudyMinutes: data.totalStudyMinutes,
    completedUnitsCount: activeStats.completedUnitsCount,
    stats,
    markUnitStudied,
    toggleVocabMastered,
    isVocabMastered,
    recordQuizAttempt,
    recordMistake,
    resolveMistake,
    deleteMistake,
    getUnitProgress,
    getUnitQuizScore,
    getEditionStats,
    exportProgressData,
    importProgressData,
    resetProgressData
  };
};

