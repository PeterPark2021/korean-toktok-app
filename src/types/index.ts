// 1. 단원 목록 스키마
export interface UnitItem {
  unit_number: number;
  title: string;
  topic: string;
  situation: string;
  level: '초급' | '중급' | '고급' | string;
  book?: '초급a' | '초급b' | '중급a' | '중급b' | '고급a' | string;
}

// 2. 회화문 스키마
export interface DialogueItem {
  unit: number;
  dialogue_id: string;
  speaker: string;
  korean_text: string;
  translation: string;
  audio_hint: string;
}

// 3. 어휘 스키마
export interface VocabItem {
  word: string;
  meaning: string;
  part_of_speech: string;
  example_sentence: string;
  level: '초급' | '중급' | '고급' | string;
}

// 4. 문법 스키마
export interface GrammarItem {
  grammar_point: string;
  explanation: string;
  example_sentences: string[];
  related_vocab: string[];
}

// 5. 퀴즈 스키마
export type QuizType = 'multiple_choice' | 'fill_in_the_blank' | 'sentence_reordering';

export interface QuizItem {
  quiz_id: string;
  type: QuizType;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  source_unit: number;
  image_url?: string;
  image_caption?: string;
  image_alt?: string;
}

// 6. 교재 및 에디션 타입
export type EditionType = 'kbs' | 'wiz';

export type BookCode = '초급a' | '초급b' | '중급a' | '중급b' | '고급a';

export type BookFilter = 'all' | BookCode;

export interface BookMeta {
  code: BookCode;
  title: string;
  level: '초급' | '중급' | '고급';
  unitRange: [number, number];
  unitCount: number;
  description: string;
  color: string;
  accentBg: string;
}

// 7. 검색 결과 인터페이스
export type SearchCategory = 'all' | 'unit' | 'grammar' | 'vocab' | 'dialogue';

export type TabTarget = 'dialogue' | 'vocab' | 'grammar' | 'culture';

export interface SearchResultItem {
  id: string;
  type: 'unit' | 'grammar' | 'vocab' | 'dialogue';
  title: string;
  subtitle: string;
  snippet?: string;
  unitNumber: number;
  book: BookCode;
  level: string;
  badge: string;
  tabTarget?: TabTarget;
}

// 8. 진도 및 통계 스키마
export interface UnitProgressRecord {
  studied: boolean;
  vocabMastered: string[];
}

export interface UnitQuizScoreRecord {
  attempts: number;
  bestScore: number;
  totalQuestions: number;
  lastAttemptAt?: string;
}

export interface AppStorageData {
  progress: Record<string, UnitProgressRecord>;
  quizScores: Record<string, UnitQuizScoreRecord>;
  streakDays: number;
  lastActiveDate: string;
  totalStudyMinutes: number;
  currentEdition?: EditionType;
}

// 9. 사용자 및 회원 인증 스키마
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarId: string;
  nativeLanguage: string;
  targetLevel: '초급' | '중급' | '고급';
  createdAt: string;
  lastLoginAt: string;
  isGuest?: boolean;
}

// 10. AI 실시간 롤플레이 스키마
export type RoleplayCategory = 'restaurant' | 'hospital' | 'cafe' | 'real_estate' | 'market' | 'office' | 'transport' | 'public';

export interface RoleplayMission {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
}

export interface RoleplayPersona {
  name: string;
  role: string;
  avatarId: string;
  avatarEmoji: string;
  tone: string;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  category: RoleplayCategory;
  categoryName: string;
  level: '초급' | '중급' | '고급';
  situation: string;
  aiPersona: RoleplayPersona;
  userRole: string;
  initialMessage: string;
  initialTranslation: string;
  missions: RoleplayMission[];
  suggestedExpressions: { korean: string; meaning: string }[];
  culturalNote?: string;
  bgGradient: string;
}

export interface RoleplayMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  translation?: string;
  coachingTip?: string; // 실시간 원어민식 자연스러운 표현 교정
  timestamp: number;
}

export interface RoleplaySessionResult {
  scenarioId: string;
  totalTurns: number;
  completedMissionsCount: number;
  totalMissionsCount: number;
  coachingTips: string[];
  xpEarned: number;
}

// 11. 오답노트 (Mistake Notes) 스키마
export interface MistakeNoteItem {
  id: string;
  unitNumber: number;
  edition: EditionType;
  quizId: string;
  question: string;
  options?: string[];
  userAnswer?: string;
  correctAnswer: string;
  explanation: string;
  resolved: boolean;
  createdAt: string;
}

// 12. 글로벌 리더보드 (Global Leaderboard) 스키마
export interface LeaderboardRankItem {
  rank: number;
  userId: string;
  userName: string;
  avatarId: string;
  countryFlag: string;
  countryName: string;
  targetLevel: string;
  weeklyStudyMinutes: number;
  streakDays: number;
  completedUnitsCount: number;
  isCurrentUser?: boolean;
}

export interface QuizHallOfFameItem {
  rank: number;
  userId: string;
  userName: string;
  avatarId: string;
  countryFlag: string;
  countryName: string;
  perfectUnitsCount: number; // 퀴즈 100% 만점 달성 단원 수
  totalScore: number;
  badgeTitle: string;
  isCurrentUser?: boolean;
}

// 13. 클라우드 동기화 상태
export type CloudSyncStatus = 'synced' | 'syncing' | 'offline' | 'guest' | 'error';

