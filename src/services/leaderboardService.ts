import { LeaderboardRankItem, QuizHallOfFameItem, UserProfile } from '../types';
import { getSupabaseClient } from './supabaseClient';

// Realistic Global Learners Seed Data (다문화·외국인 글로벌 학습자)
const SEED_WEEKLY_LEADERBOARD: Omit<LeaderboardRankItem, 'rank' | 'isCurrentUser'>[] = [
  {
    userId: 'seed_vn_nguyen',
    userName: '응우옌 티 마이 (Nguyen Thi Mai)',
    avatarId: 'doanning',
    countryFlag: '🇻🇳',
    countryName: '베트남',
    targetLevel: '고급',
    weeklyStudyMinutes: 460,
    streakDays: 42,
    completedUnitsCount: 41
  },
  {
    userId: 'seed_jp_sakura',
    userName: '사토 사쿠라 (Sato Sakura)',
    avatarId: 'suyeon',
    countryFlag: '🇯🇵',
    countryName: '일본',
    targetLevel: '중급',
    weeklyStudyMinutes: 395,
    streakDays: 28,
    completedUnitsCount: 33
  },
  {
    userId: 'seed_us_david',
    userName: '데이비드 밀러 (David Miller)',
    avatarId: 'minho',
    countryFlag: '🇺🇸',
    countryName: '미국',
    targetLevel: '초급',
    weeklyStudyMinutes: 340,
    streakDays: 19,
    completedUnitsCount: 22
  },
  {
    userId: 'seed_cn_lihong',
    userName: '왕리홍 (Wang Lihong)',
    avatarId: 'lihong',
    countryFlag: '🇨🇳',
    countryName: '중국',
    targetLevel: '고급',
    weeklyStudyMinutes: 310,
    streakDays: 35,
    completedUnitsCount: 38
  },
  {
    userId: 'seed_th_somchai',
    userName: '쏨차이 폰사왓 (Somchai)',
    avatarId: 'clerk',
    countryFlag: '🇹🇭',
    countryName: '태국',
    targetLevel: '중급',
    weeklyStudyMinutes: 280,
    streakDays: 14,
    completedUnitsCount: 19
  },
  {
    userId: 'seed_mn_bat',
    userName: '바트자르갈 (Batjargal)',
    avatarId: 'friend',
    countryFlag: '🇲🇳',
    countryName: '몽골',
    targetLevel: '초급',
    weeklyStudyMinutes: 245,
    streakDays: 11,
    completedUnitsCount: 16
  },
  {
    userId: 'seed_es_carlos',
    userName: '카를로스 가르시아 (Carlos G.)',
    avatarId: 'teacher',
    countryFlag: '🇪🇸',
    countryName: '스페인',
    targetLevel: '중급',
    weeklyStudyMinutes: 210,
    streakDays: 8,
    completedUnitsCount: 14
  },
  {
    userId: 'seed_fr_chloe',
    userName: '클로에 뒤퐁 (Chloé Dupont)',
    avatarId: 'suyeon',
    countryFlag: '🇫🇷',
    countryName: '프랑스',
    targetLevel: '초급',
    weeklyStudyMinutes: 185,
    streakDays: 6,
    completedUnitsCount: 10
  }
];

const SEED_HALL_OF_FAME: Omit<QuizHallOfFameItem, 'rank' | 'isCurrentUser'>[] = [
  {
    userId: 'seed_vn_nguyen',
    userName: '응우옌 티 마이 (Nguyen Thi Mai)',
    avatarId: 'doanning',
    countryFlag: '🇻🇳',
    countryName: '베트남',
    perfectUnitsCount: 45,
    totalScore: 585,
    badgeTitle: '🏆 전 단원 만점 마스터'
  },
  {
    userId: 'seed_cn_lihong',
    userName: '왕리홍 (Wang Lihong)',
    avatarId: 'lihong',
    countryFlag: '🇨🇳',
    countryName: '중국',
    perfectUnitsCount: 38,
    totalScore: 512,
    badgeTitle: '💎 한국어 퀴즈 그랜드마스터'
  },
  {
    userId: 'seed_jp_sakura',
    userName: '사토 사쿠라 (Sato Sakura)',
    avatarId: 'suyeon',
    countryFlag: '🇯🇵',
    countryName: '일본',
    perfectUnitsCount: 33,
    totalScore: 460,
    badgeTitle: '🥇 문법 & 어휘 스페셜리스트'
  },
  {
    userId: 'seed_us_david',
    userName: '데이비드 밀러 (David Miller)',
    avatarId: 'minho',
    countryFlag: '🇺🇸',
    countryName: '미국',
    perfectUnitsCount: 22,
    totalScore: 310,
    badgeTitle: '⭐ 실전 회화 퀴즈 달인'
  },
  {
    userId: 'seed_th_somchai',
    userName: '쏨차이 폰사왓 (Somchai)',
    avatarId: 'clerk',
    countryFlag: '🇹🇭',
    countryName: '태국',
    perfectUnitsCount: 19,
    totalScore: 265,
    badgeTitle: '✨ 초·중급 완벽 정복'
  }
];

// Country flag mapping helper
export const getLanguageFlag = (lang: string): { flag: string; name: string } => {
  switch (lang) {
    case '베트남어':
      return { flag: '🇻🇳', name: '베트남' };
    case '중국어':
      return { flag: '🇨🇳', name: '중국' };
    case '일본어':
      return { flag: '🇯🇵', name: '일본' };
    case '영어':
      return { flag: '🇺🇸', name: '미국' };
    case '태국어':
      return { flag: '🇹🇭', name: '태국' };
    case '몽골어':
      return { flag: '🇲🇳', name: '몽골' };
    case '스페인어':
      return { flag: '🇪🇸', name: '스페인' };
    case '러시아어':
      return { flag: '🇷🇺', name: '러시아' };
    default:
      return { flag: '🇰🇷', name: '대한민국' };
  }
};

/**
 * Get Weekly Study Time Leaderboard
 */
export const getWeeklyStudyLeaderboard = async (
  currentUser: UserProfile,
  currentUserMinutes: number,
  currentUserStreak: number,
  currentUserCompletedCount: number
): Promise<{
  rankings: LeaderboardRankItem[];
  currentUserRank: LeaderboardRankItem;
  weeklyEndsInDays: number;
  weeklyEndsInHours: number;
}> => {
  const supabase = getSupabaseClient();
  const { flag, name } = getLanguageFlag(currentUser.nativeLanguage);

  const currentUserItem: LeaderboardRankItem = {
    rank: 1,
    userId: currentUser.id,
    userName: `${currentUser.name} (나)`,
    avatarId: currentUser.avatarId || 'minho',
    countryFlag: flag,
    countryName: name,
    targetLevel: currentUser.targetLevel || '초급',
    weeklyStudyMinutes: Math.max(currentUserMinutes, 25),
    streakDays: Math.max(currentUserStreak, 1),
    completedUnitsCount: currentUserCompletedCount,
    isCurrentUser: true
  };

  let allLearners: Omit<LeaderboardRankItem, 'rank'>[] = [...SEED_WEEKLY_LEADERBOARD];

  if (supabase) {
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_id, native_language, target_level, total_study_minutes, streak_days')
        .order('total_study_minutes', { ascending: false })
        .limit(20);

      if (profiles && profiles.length > 0) {
        profiles.forEach((p) => {
          if (p.id !== currentUser.id) {
            const pFlag = getLanguageFlag(p.native_language);
            allLearners.push({
              userId: p.id,
              userName: p.name,
              avatarId: p.avatar_id || 'minho',
              countryFlag: pFlag.flag,
              countryName: pFlag.name,
              targetLevel: p.target_level || '초급',
              weeklyStudyMinutes: p.total_study_minutes || 0,
              streakDays: p.streak_days || 1,
              completedUnitsCount: 5
            });
          }
        });
      }
    } catch (e) {
      console.warn('Leaderboard Supabase query fallback to seed:', e);
    }
  }

  // Include current user
  allLearners.push(currentUserItem);

  // Sort by weekly study minutes descending
  allLearners.sort((a, b) => b.weeklyStudyMinutes - a.weeklyStudyMinutes);

  // Assign ranks
  const rankings: LeaderboardRankItem[] = allLearners.map((item, index) => ({
    ...item,
    rank: index + 1,
    isCurrentUser: item.userId === currentUser.id
  }));

  const myRank = rankings.find((r) => r.isCurrentUser) || {
    ...currentUserItem,
    rank: rankings.length
  };

  // Weekly countdown to Sunday midnight
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday
  const daysUntilSunday = (7 - dayOfWeek) % 7;
  const hoursUntilMidnight = 23 - now.getHours();

  return {
    rankings: rankings.slice(0, 20),
    currentUserRank: myRank,
    weeklyEndsInDays: daysUntilSunday,
    weeklyEndsInHours: Math.max(0, hoursUntilMidnight)
  };
};

/**
 * Get Quiz Perfect Score Hall of Fame
 */
export const getQuizHallOfFame = async (
  currentUser: UserProfile,
  currentUserPerfectCount: number,
  currentUserTotalQuizScore: number
): Promise<{
  hallOfFame: QuizHallOfFameItem[];
  currentUserHallItem: QuizHallOfFameItem;
}> => {
  const { flag, name } = getLanguageFlag(currentUser.nativeLanguage);

  const getBadgeTitle = (count: number) => {
    if (count >= 45) return '🏆 전 단원 만점 마스터';
    if (count >= 30) return '💎 한국어 퀴즈 그랜드마스터';
    if (count >= 15) return '🥇 문법 & 어휘 스페셜리스트';
    if (count >= 5) return '⭐ 실전 회화 퀴즈 달인';
    return '🌱 성장하는 퀴즈 도전자';
  };

  const currentUserHallItem: QuizHallOfFameItem = {
    rank: 1,
    userId: currentUser.id,
    userName: `${currentUser.name} (나)`,
    avatarId: currentUser.avatarId || 'minho',
    countryFlag: flag,
    countryName: name,
    perfectUnitsCount: currentUserPerfectCount,
    totalScore: currentUserTotalQuizScore,
    badgeTitle: getBadgeTitle(currentUserPerfectCount),
    isCurrentUser: true
  };

  const allHonors: Omit<QuizHallOfFameItem, 'rank'>[] = [...SEED_HALL_OF_FAME, currentUserHallItem];

  allHonors.sort((a, b) => {
    if (b.perfectUnitsCount !== a.perfectUnitsCount) {
      return b.perfectUnitsCount - a.perfectUnitsCount;
    }
    return b.totalScore - a.totalScore;
  });

  const hallOfFame: QuizHallOfFameItem[] = allHonors.map((item, idx) => ({
    ...item,
    rank: idx + 1,
    isCurrentUser: item.userId === currentUser.id
  }));

  const myHallRank = hallOfFame.find((h) => h.isCurrentUser) || {
    ...currentUserHallItem,
    rank: hallOfFame.length
  };

  return {
    hallOfFame,
    currentUserHallItem: myHallRank
  };
};
