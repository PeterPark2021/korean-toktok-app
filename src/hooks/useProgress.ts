import { useState, useEffect, useCallback } from 'react';
import { AppStorageData, UnitProgressRecord, UnitQuizScoreRecord, EditionType } from '../types';

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
        // copy unitXX to kbs_unitXX and wiz_unitXX
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

  // 1. Mark Unit as Studied
  const markUnitStudied = useCallback((unitNumber: number, studied = true, edition: EditionType = 'kbs') => {
    const key = getUnitKey(unitNumber, edition);
    setData((prev) => {
      const current = prev.progress[key] || { studied: false, vocabMastered: [] };
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
  }, []);

  // 2. Toggle Vocab Mastered
  const toggleVocabMastered = useCallback((unitNumber: number, word: string, edition: EditionType = 'kbs') => {
    const key = getUnitKey(unitNumber, edition);
    setData((prev) => {
      const current = prev.progress[key] || { studied: false, vocabMastered: [] };
      const exists = current.vocabMastered.includes(word);
      const updatedVocab = exists
        ? current.vocabMastered.filter((w) => w !== word)
        : [...current.vocabMastered, word];

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
  }, []);

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
          lastActiveDate: new Date().toISOString().split('T')[0]
        };
      });
    },
    []
  );

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

      return {
        completedUnitsCount,
        totalMasteredVocabCount,
        quizAttemptedCount,
        totalUnits: 45,
        overallPercentage: Math.round((completedUnitsCount / 45) * 100)
      };
    },
    [data]
  );

  const activeStats = getEditionStats('kbs');

  const stats = {
    streakDays: data.streakDays,
    totalStudyMinutes: data.totalStudyMinutes,
    completedUnitsCount: activeStats.completedUnitsCount,
    totalMasteredVocabCount: activeStats.totalMasteredVocabCount,
    overallPercentage: activeStats.overallPercentage
  };

  return {
    data,
    progress: data.progress,
    quizScores: data.quizScores,
    streakDays: data.streakDays,
    totalStudyMinutes: data.totalStudyMinutes,
    completedUnitsCount: activeStats.completedUnitsCount,
    stats,
    markUnitStudied,
    toggleVocabMastered,
    isVocabMastered,
    recordQuizAttempt,
    getUnitProgress,
    getUnitQuizScore,
    getEditionStats
  };
};
