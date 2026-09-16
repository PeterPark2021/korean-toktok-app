import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { AppStorageData, UnitProgressRecord, UnitQuizScoreRecord, EditionType, MistakeNoteItem } from '../types';
import { getUnitKey } from '../hooks/useProgress';

const MISTAKES_STORAGE_KEY = 'korean_toktok_mistakes_v1';

// Get local mistake notes
export const getLocalMistakeNotes = (): MistakeNoteItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(MISTAKES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to get local mistakes:', e);
    return [];
  }
};

// Save local mistake notes
export const saveLocalMistakeNotes = (mistakes: MistakeNoteItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MISTAKES_STORAGE_KEY, JSON.stringify(mistakes));
  } catch (e) {
    console.error('Failed to save local mistakes:', e);
  }
};

/**
 * 1. Pull user data from Supabase and merge with LocalStorage (Bidirectional Sync)
 */
export const syncLocalWithCloud = async (
  userId: string,
  localData: AppStorageData,
  localMistakes: MistakeNoteItem[]
): Promise<{
  mergedData: AppStorageData;
  mergedMistakes: MistakeNoteItem[];
  isCloudConnected: boolean;
}> => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') {
    return {
      mergedData: localData,
      mergedMistakes: localMistakes,
      isCloudConnected: false
    };
  }

  try {
    // 1. Fetch Cloud Progress
    const { data: cloudProgress, error: progErr } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (progErr) console.warn('Supabase user_progress fetch error:', progErr);

    // 2. Fetch Cloud Quiz Scores
    const { data: cloudScores, error: scoreErr } = await supabase
      .from('quiz_scores')
      .select('*')
      .eq('user_id', userId);

    if (scoreErr) console.warn('Supabase quiz_scores fetch error:', scoreErr);

    // 3. Fetch Cloud Mistakes
    const { data: cloudMistakes, error: mistErr } = await supabase
      .from('user_mistakes')
      .select('*')
      .eq('user_id', userId);

    if (mistErr) console.warn('Supabase user_mistakes fetch error:', mistErr);

    // Merge Progress
    const mergedProgress = { ...localData.progress };
    (cloudProgress || []).forEach((row) => {
      const key = getUnitKey(row.unit_number, row.edition as EditionType);
      const local = mergedProgress[key] || { studied: false, vocabMastered: [] };
      const mergedVocab = Array.from(new Set([...(local.vocabMastered || []), ...(row.vocab_mastered || [])]));
      mergedProgress[key] = {
        studied: local.studied || row.studied,
        vocabMastered: mergedVocab
      };
    });

    // Merge Quiz Scores
    const mergedScores = { ...localData.quizScores };
    (cloudScores || []).forEach((row) => {
      const key = getUnitKey(row.unit_number, row.edition as EditionType);
      const local = mergedScores[key] || { attempts: 0, bestScore: 0, totalQuestions: row.total_questions || 13 };
      mergedScores[key] = {
        attempts: Math.max(local.attempts, row.attempts || 0),
        bestScore: Math.max(local.bestScore, row.best_score || 0),
        totalQuestions: row.total_questions || 13,
        lastAttemptAt: row.last_attempt_at || local.lastAttemptAt
      };
    });

    // Merge Mistakes
    const mistakeMap = new Map<string, MistakeNoteItem>();
    localMistakes.forEach((m) => mistakeMap.set(`${m.edition}_${m.unitNumber}_${m.quizId}`, m));
    (cloudMistakes || []).forEach((row) => {
      const key = `${row.edition}_${row.unit_number}_${row.quiz_id}`;
      const existing = mistakeMap.get(key);
      mistakeMap.set(key, {
        id: row.id,
        unitNumber: row.unit_number,
        edition: row.edition as EditionType,
        quizId: row.quiz_id,
        question: row.question_text,
        userAnswer: row.user_answer,
        correctAnswer: row.correct_answer,
        explanation: row.explanation,
        resolved: existing ? (existing.resolved && row.resolved) : row.resolved,
        createdAt: row.created_at
      });
    });

    const mergedMistakesList = Array.from(mistakeMap.values());

    const resultData: AppStorageData = {
      ...localData,
      progress: mergedProgress,
      quizScores: mergedScores
    };

    // Push local units that haven't been stored in cloud yet
    const progressUpserts = Object.entries(mergedProgress).map(([k, v]) => {
      const isKbs = k.startsWith('kbs_');
      const num = parseInt(k.replace('kbs_unit', '').replace('wiz_unit', ''), 10);
      return {
        user_id: userId,
        edition: isKbs ? 'kbs' : 'wiz',
        unit_number: num,
        studied: v.studied,
        vocab_mastered: v.vocabMastered || []
      };
    });

    if (progressUpserts.length > 0) {
      await supabase.from('user_progress').upsert(progressUpserts, {
        onConflict: 'user_id,edition,unit_number'
      });
    }

    return {
      mergedData: resultData,
      mergedMistakes: mergedMistakesList,
      isCloudConnected: true
    };
  } catch (e) {
    console.error('Error during cloud sync:', e);
    return {
      mergedData: localData,
      mergedMistakes: localMistakes,
      isCloudConnected: false
    };
  }
};

/**
 * 2. Save Unit Progress to Cloud in background
 */
export const saveUnitProgressToCloud = async (
  userId: string,
  unitNumber: number,
  edition: EditionType,
  studied: boolean,
  vocabMastered: string[]
): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') return;

  try {
    await supabase.from('user_progress').upsert(
      {
        user_id: userId,
        edition,
        unit_number: unitNumber,
        studied,
        vocab_mastered: vocabMastered,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id,edition,unit_number' }
    );
  } catch (e) {
    console.error('Failed to save unit progress to Supabase:', e);
  }
};

/**
 * 3. Save Quiz Score to Cloud in background
 */
export const saveQuizScoreToCloud = async (
  userId: string,
  unitNumber: number,
  edition: EditionType,
  bestScore: number,
  attempts: number,
  totalQuestions: number
): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') return;

  try {
    await supabase.from('quiz_scores').upsert(
      {
        user_id: userId,
        edition,
        unit_number: unitNumber,
        best_score: bestScore,
        attempts,
        total_questions: totalQuestions,
        last_attempt_at: new Date().toISOString()
      },
      { onConflict: 'user_id,edition,unit_number' }
    );
  } catch (e) {
    console.error('Failed to save quiz score to Supabase:', e);
  }
};

/**
 * 4. Save Mistake Note to Cloud
 */
export const saveMistakeNoteToCloud = async (
  userId: string,
  mistake: MistakeNoteItem
): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') return;

  try {
    await supabase.from('user_mistakes').upsert(
      {
        user_id: userId,
        edition: mistake.edition,
        unit_number: mistake.unitNumber,
        quiz_id: mistake.quizId,
        question_text: mistake.question,
        user_answer: mistake.userAnswer,
        correct_answer: mistake.correctAnswer,
        explanation: mistake.explanation,
        resolved: mistake.resolved,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'user_id,edition,unit_number,quiz_id' }
    );
  } catch (e) {
    console.error('Failed to save mistake note to Supabase:', e);
  }
};

/**
 * 5. Update Mistake Note Resolution status
 */
export const resolveMistakeNoteInCloud = async (
  userId: string,
  unitNumber: number,
  edition: EditionType,
  quizId: string,
  resolved: boolean
): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') return;

  try {
    await supabase
      .from('user_mistakes')
      .update({ resolved, updated_at: new Date().toISOString() })
      .match({ user_id: userId, unit_number: unitNumber, edition, quiz_id: quizId });
  } catch (e) {
    console.error('Failed to resolve mistake note in Supabase:', e);
  }
};

/**
 * 6. Record Study Session (Minutes spent)
 */
export const recordStudySessionToCloud = async (
  userId: string,
  minutesSpent: number
): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') return;

  try {
    await supabase.from('study_sessions').insert({
      user_id: userId,
      minutes_spent: minutesSpent,
      session_date: new Date().toISOString().split('T')[0]
    });

    // Also increment total_study_minutes in profile
    const { data: profile } = await supabase.from('profiles').select('total_study_minutes').eq('id', userId).single();
    if (profile) {
      await supabase
        .from('profiles')
        .update({
          total_study_minutes: (profile.total_study_minutes || 0) + minutesSpent,
          last_active_date: new Date().toISOString().split('T')[0]
        })
        .eq('id', userId);
    }
  } catch (e) {
    console.error('Failed to record study session to Supabase:', e);
  }
};

/**
 * 7. Realtime Subscription for Multi-Device Live Sync
 */
export const subscribeToRealtimeSync = (
  userId: string,
  onProgressUpdate: (updatedRecord: any) => void,
  onScoreUpdate: (updatedScore: any) => void,
  onMistakeUpdate: (updatedMistake: any) => void
): (() => void) => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId || userId.startsWith('guest_') || userId === 'guest') {
    return () => {};
  }

  const channel = supabase
    .channel(`user-sync-${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_progress',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        if (payload.new) {
          onProgressUpdate(payload.new);
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'quiz_scores',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        if (payload.new) {
          onScoreUpdate(payload.new);
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_mistakes',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        if (payload.new) {
          onMistakeUpdate(payload.new);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
