-- ==============================================================================
-- Korean TokTok (한국어 톡톡) - Supabase PostgreSQL Schema
-- ==============================================================================

-- 1. Profiles Table (학습자 프로필)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_id TEXT DEFAULT 'minho',
    native_language TEXT DEFAULT '한국어',
    target_level TEXT DEFAULT '초급',
    total_study_minutes INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Progress Table (단원별 학습 완료 및 마스터 어휘)
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    edition TEXT NOT NULL CHECK (edition IN ('kbs', 'wiz')),
    unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 45),
    studied BOOLEAN DEFAULT FALSE,
    vocab_mastered TEXT[] DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, edition, unit_number)
);

-- 3. Quiz Scores Table (단원별 퀴즈 응시 이력 & 최고 점수)
CREATE TABLE IF NOT EXISTS public.quiz_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    edition TEXT NOT NULL CHECK (edition IN ('kbs', 'wiz')),
    unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 45),
    attempts INTEGER DEFAULT 0,
    best_score INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 13,
    last_attempt_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, edition, unit_number)
);

-- 4. User Mistakes Table (오답노트 - 틀린 퀴즈 문항 복습)
CREATE TABLE IF NOT EXISTS public.user_mistakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    edition TEXT NOT NULL CHECK (edition IN ('kbs', 'wiz')),
    unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 45),
    quiz_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    user_answer TEXT,
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, edition, unit_number, quiz_id)
);

-- 5. User Badges Table (획득 성취 뱃지)
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    badge_id TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- 6. Study Sessions Table (주간 학습 시간 및 랭킹 통계)
CREATE TABLE IF NOT EXISTS public.study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    minutes_spent INTEGER NOT NULL CHECK (minutes_spent > 0),
    session_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can read leaderboard info; only owner can update
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- User Progress: Only owner can view and modify
CREATE POLICY "Users can view own progress" 
ON public.user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" 
ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Quiz Scores: Publicly viewable for leaderboard; only owner can insert/update
CREATE POLICY "Quiz scores are viewable for leaderboard" 
ON public.quiz_scores FOR SELECT USING (true);

CREATE POLICY "Users can insert own quiz scores" 
ON public.quiz_scores FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz scores" 
ON public.quiz_scores FOR UPDATE USING (auth.uid() = user_id);

-- User Mistakes: Only owner
CREATE POLICY "Users can view own mistakes" 
ON public.user_mistakes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mistakes" 
ON public.user_mistakes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mistakes" 
ON public.user_mistakes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mistakes" 
ON public.user_mistakes FOR DELETE USING (auth.uid() = user_id);

-- User Badges: Publicly viewable for leaderboard/profiles; only owner can insert
CREATE POLICY "Badges are viewable by everyone" 
ON public.user_badges FOR SELECT USING (true);

CREATE POLICY "Users can insert own badges" 
ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Study Sessions: Publicly viewable for weekly rankings; only owner can insert
CREATE POLICY "Study sessions are viewable for leaderboard" 
ON public.study_sessions FOR SELECT USING (true);

CREATE POLICY "Users can insert own study sessions" 
ON public.study_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- Realtime Publication Enablement
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quiz_scores;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_mistakes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_badges;
