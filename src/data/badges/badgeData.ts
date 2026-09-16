// src/data/badges/badgeData.ts
// Comprehensive Korean TokTok Achievement & Milestone Badge Definitions

import { EditionType, AppStorageData } from '../../types';

export type BadgeCategory = 'all' | 'unit' | 'quiz' | 'vocab' | 'streak';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond' | 'ruby' | 'special';

export interface BadgeItem {
  id: string;
  category: 'unit' | 'quiz' | 'vocab' | 'streak';
  tier: BadgeTier;
  icon: string;
  name: string;
  englishName: string;
  description: string;
  requirementText: string;
  currentValue: number;
  targetValue: number;
  isUnlocked: boolean;
  unlockedPercentage: number;
  gradient: string;
  borderGlow: string;
}

export function computeUserBadges(
  progressData: Record<string, { studied: boolean; vocabMastered: string[] }>,
  quizScoresData: Record<string, { attempts: number; bestScore: number; totalQuestions: number }>,
  streakDays: number,
  edition: EditionType
): BadgeItem[] {
  // 1. Calculate Unit completion by book
  let totalStudiedUnits = 0;
  let begAStudied = 0; // 1~10
  let begBStudied = 0; // 11~20
  let intAStudied = 0; // 21~30
  let intBStudied = 0; // 31~40
  let advStudied = 0; // 41~45

  for (let i = 1; i <= 45; i++) {
    const key = `unit_${i}_${edition}`;
    if (progressData[key]?.studied) {
      totalStudiedUnits++;
      if (i <= 10) begAStudied++;
      else if (i <= 20) begBStudied++;
      else if (i <= 30) intAStudied++;
      else if (i <= 40) intBStudied++;
      else advStudied++;
    }
  }

  // 2. Calculate Mastered Vocab total
  let totalMasteredVocab = 0;
  for (let i = 1; i <= 45; i++) {
    const key = `unit_${i}_${edition}`;
    totalMasteredVocab += progressData[key]?.vocabMastered?.length || 0;
  }

  // 3. Calculate Quiz achievements
  let totalQuizAttempts = 0;
  let perfectScoreCount = 0;
  for (let i = 1; i <= 45; i++) {
    const key = `unit_${i}_${edition}`;
    const q = quizScoresData[key];
    if (q && q.attempts > 0) {
      totalQuizAttempts++;
      if (q.bestScore === q.totalQuestions && q.totalQuestions > 0) {
        perfectScoreCount++;
      }
    }
  }

  const calcPct = (curr: number, target: number) => Math.min(100, Math.round((curr / target) * 100));

  const badges: BadgeItem[] = [
    // --- 1. Unit Badges ---
    {
      id: 'badge_first_step',
      category: 'unit',
      tier: 'bronze',
      icon: '🌱',
      name: '첫 걸음 마스터',
      englishName: 'First Step',
      description: '첫 번째 학습 단원을 성공적으로 완주했습니다.',
      requirementText: '1개 단원 완료',
      currentValue: totalStudiedUnits,
      targetValue: 1,
      isUnlocked: totalStudiedUnits >= 1,
      unlockedPercentage: calcPct(totalStudiedUnits, 1),
      gradient: 'from-amber-600 via-amber-700 to-amber-900',
      borderGlow: 'border-amber-500/50 shadow-amber-500/20'
    },
    {
      id: 'badge_beg_a',
      category: 'unit',
      tier: 'bronze',
      icon: '🥉',
      name: '초급A 정복자',
      englishName: 'Beginner A Master',
      description: '초급A (1~10과: 인사, 일상, 음식, 쇼핑) 전체 단원을 마스터했습니다.',
      requirementText: '초급A 10개 단원 완료',
      currentValue: begAStudied,
      targetValue: 10,
      isUnlocked: begAStudied >= 10,
      unlockedPercentage: calcPct(begAStudied, 10),
      gradient: 'from-orange-500 via-amber-600 to-amber-800',
      borderGlow: 'border-orange-500/50 shadow-orange-500/20'
    },
    {
      id: 'badge_beg_b',
      category: 'unit',
      tier: 'silver',
      icon: '🥈',
      name: '초급B 정복자',
      englishName: 'Beginner B Master',
      description: '초급B (11~20과: 명절, 병원, 교통, 취미) 전체 단원을 마스터했습니다.',
      requirementText: '초급B 10개 단원 완료',
      currentValue: begBStudied,
      targetValue: 10,
      isUnlocked: begBStudied >= 10,
      unlockedPercentage: calcPct(begBStudied, 10),
      gradient: 'from-slate-400 via-slate-500 to-slate-700',
      borderGlow: 'border-slate-300/60 shadow-slate-300/30'
    },
    {
      id: 'badge_int_a',
      category: 'unit',
      tier: 'gold',
      icon: '🥇',
      name: '중급A 정복자',
      englishName: 'Intermediate A Master',
      description: '중급A (21~30과: 직장, 문화, 은행, 예약) 전체 단원을 마스터했습니다.',
      requirementText: '중급A 10개 단원 완료',
      currentValue: intAStudied,
      targetValue: 10,
      isUnlocked: intAStudied >= 10,
      unlockedPercentage: calcPct(intAStudied, 10),
      gradient: 'from-amber-400 via-yellow-500 to-amber-600',
      borderGlow: 'border-amber-300/80 shadow-amber-400/40'
    },
    {
      id: 'badge_int_b',
      category: 'unit',
      tier: 'diamond',
      icon: '💎',
      name: '중급B 정복자',
      englishName: 'Intermediate B Master',
      description: '중급B (31~40과: 심화 회화, 감정 표현, 비즈니스)를 마스터했습니다.',
      requirementText: '중급B 10개 단원 완료',
      currentValue: intBStudied,
      targetValue: 10,
      isUnlocked: intBStudied >= 10,
      unlockedPercentage: calcPct(intBStudied, 10),
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      borderGlow: 'border-cyan-300/80 shadow-cyan-400/40'
    },
    {
      id: 'badge_grand_master',
      category: 'unit',
      tier: 'ruby',
      icon: '👑',
      name: '톡톡 그랜드 마스터',
      englishName: 'Grand Master',
      description: '한국어 톡톡 전체 45개 단원을 완강한 최고의 한국어 마스터!',
      requirementText: '전체 45개 단원 100% 완강',
      currentValue: totalStudiedUnits,
      targetValue: 45,
      isUnlocked: totalStudiedUnits >= 45,
      unlockedPercentage: calcPct(totalStudiedUnits, 45),
      gradient: 'from-rose-500 via-purple-600 to-amber-500',
      borderGlow: 'border-rose-400/80 shadow-rose-500/50'
    },

    // --- 2. Quiz Badges ---
    {
      id: 'badge_quiz_starter',
      category: 'quiz',
      tier: 'bronze',
      icon: '🎯',
      name: '퀴즈 도전자',
      englishName: 'Quiz Explorer',
      description: '첫 번째 단원 퀴즈에 도전하여 실력을 테스트했습니다.',
      requirementText: '퀴즈 1회 응시',
      currentValue: totalQuizAttempts,
      targetValue: 1,
      isUnlocked: totalQuizAttempts >= 1,
      unlockedPercentage: calcPct(totalQuizAttempts, 1),
      gradient: 'from-blue-600 via-indigo-700 to-slate-900',
      borderGlow: 'border-blue-400/50 shadow-blue-500/20'
    },
    {
      id: 'badge_quiz_perfect_3',
      category: 'quiz',
      tier: 'gold',
      icon: '🏅',
      name: '백점 만점 골드',
      englishName: 'Triple Perfect',
      description: '단원 퀴즈에서 100점 만점을 3회 이상 달성했습니다.',
      requirementText: '퀴즈 만점 3회 달성',
      currentValue: perfectScoreCount,
      targetValue: 3,
      isUnlocked: perfectScoreCount >= 3,
      unlockedPercentage: calcPct(perfectScoreCount, 3),
      gradient: 'from-yellow-400 via-amber-500 to-orange-600',
      borderGlow: 'border-yellow-300/70 shadow-yellow-400/30'
    },
    {
      id: 'badge_quiz_champion',
      category: 'quiz',
      tier: 'ruby',
      icon: '🏆',
      name: '퀴즈 챔피언',
      englishName: 'Quiz Champion',
      description: '단원 퀴즈에서 100점 만점을 10회 이상 달성한 퀴즈의 제왕!',
      requirementText: '퀴즈 만점 10회 달성',
      currentValue: perfectScoreCount,
      targetValue: 10,
      isUnlocked: perfectScoreCount >= 10,
      unlockedPercentage: calcPct(perfectScoreCount, 10),
      gradient: 'from-pink-500 via-rose-600 to-purple-800',
      borderGlow: 'border-rose-400/80 shadow-rose-500/40'
    },

    // --- 3. Vocab Badges ---
    {
      id: 'badge_vocab_sprout',
      category: 'vocab',
      tier: 'bronze',
      icon: '🌿',
      name: '단어 새싹',
      englishName: 'Vocab Sprout',
      description: '핵심 어휘 플래시카드에서 10개 단어를 완벽 암기했습니다.',
      requirementText: '어휘 10개 마스터',
      currentValue: totalMasteredVocab,
      targetValue: 10,
      isUnlocked: totalMasteredVocab >= 10,
      unlockedPercentage: calcPct(totalMasteredVocab, 10),
      gradient: 'from-emerald-500 via-teal-600 to-slate-900',
      borderGlow: 'border-emerald-400/50 shadow-emerald-500/20'
    },
    {
      id: 'badge_vocab_collector',
      category: 'vocab',
      tier: 'silver',
      icon: '📚',
      name: '어휘 수집가',
      englishName: 'Vocab Collector',
      description: '핵심 어휘 플래시카드에서 30개 단어를 암기 마스터했습니다.',
      requirementText: '어휘 30개 마스터',
      currentValue: totalMasteredVocab,
      targetValue: 30,
      isUnlocked: totalMasteredVocab >= 30,
      unlockedPercentage: calcPct(totalMasteredVocab, 30),
      gradient: 'from-teal-400 via-emerald-600 to-cyan-800',
      borderGlow: 'border-teal-300/60 shadow-teal-400/30'
    },
    {
      id: 'badge_vocab_master',
      category: 'vocab',
      tier: 'diamond',
      icon: '📖',
      name: '어휘의 달인',
      englishName: 'Vocab Master',
      description: '100개 이상의 풍부한 한국어 어휘를 완벽하게 정복했습니다.',
      requirementText: '어휘 100개 마스터',
      currentValue: totalMasteredVocab,
      targetValue: 100,
      isUnlocked: totalMasteredVocab >= 100,
      unlockedPercentage: calcPct(totalMasteredVocab, 100),
      gradient: 'from-indigo-500 via-purple-600 to-blue-700',
      borderGlow: 'border-indigo-300/80 shadow-indigo-400/40'
    },

    // --- 4. Streak Badges ---
    {
      id: 'badge_streak_3',
      category: 'streak',
      tier: 'bronze',
      icon: '🔥',
      name: '작심삼일 탈출',
      englishName: '3-Day Streak',
      description: '3일 연속으로 앱에 접속하여 꾸준히 한국어를 학습했습니다.',
      requirementText: '연속 출석 3일 달성',
      currentValue: streakDays,
      targetValue: 3,
      isUnlocked: streakDays >= 3,
      unlockedPercentage: calcPct(streakDays, 3),
      gradient: 'from-orange-500 via-red-600 to-amber-700',
      borderGlow: 'border-orange-400/50 shadow-orange-500/20'
    },
    {
      id: 'badge_streak_7',
      category: 'streak',
      tier: 'silver',
      icon: '⚡',
      name: '일주일 완주',
      englishName: '7-Day Streak',
      description: '7일 동안 매일매일 쉬지 않고 한국어 학습 열정을 불태웠습니다.',
      requirementText: '연속 출석 7일 달성',
      currentValue: streakDays,
      targetValue: 7,
      isUnlocked: streakDays >= 7,
      unlockedPercentage: calcPct(streakDays, 7),
      gradient: 'from-amber-400 via-orange-500 to-rose-600',
      borderGlow: 'border-amber-300/70 shadow-amber-400/30'
    },
    {
      id: 'badge_streak_30',
      category: 'streak',
      tier: 'special',
      icon: '🌟',
      name: '한 달의 기적',
      englishName: '30-Day Master',
      description: '한 달(30일) 동안 끊임없는 열정으로 한국어 마스터가 되었습니다.',
      requirementText: '연속 출석 30일 달성',
      currentValue: streakDays,
      targetValue: 30,
      isUnlocked: streakDays >= 30,
      unlockedPercentage: calcPct(streakDays, 30),
      gradient: 'from-purple-500 via-pink-500 to-amber-400',
      borderGlow: 'border-purple-300/80 shadow-purple-500/40'
    }
  ];

  return badges;
}
