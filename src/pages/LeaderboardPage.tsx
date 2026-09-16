import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Flame,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check,
  ChevronRight,
  TrendingUp,
  Globe2,
  Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { getSpeakerAvatar } from '../utils/characterAvatar';
import {
  getWeeklyStudyLeaderboard,
  getQuizHallOfFame
} from '../services/leaderboardService';
import { LeaderboardRankItem, QuizHallOfFameItem, MistakeNoteItem } from '../types';

export const LeaderboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, cloudSyncStatus } = useAuth();
  const {
    stats,
    streakDays,
    totalStudyMinutes,
    completedUnitsCount,
    mistakeNotes,
    resolveMistake,
    deleteMistake
  } = useProgress();

  const [activeTab, setActiveTab] = useState<'weekly' | 'hall_of_fame' | 'mistakes'>('weekly');
  const [weeklyData, setWeeklyData] = useState<{
    rankings: LeaderboardRankItem[];
    currentUserRank: LeaderboardRankItem;
    weeklyEndsInDays: number;
    weeklyEndsInHours: number;
  } | null>(null);

  const [hallData, setHallData] = useState<{
    hallOfFame: QuizHallOfFameItem[];
    currentUserHallItem: QuizHallOfFameItem;
  } | null>(null);

  const [mistakeFilter, setMistakeFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  // Load leaderboard data
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const wData = await getWeeklyStudyLeaderboard(
        user,
        totalStudyMinutes,
        streakDays,
        completedUnitsCount
      );
      const hData = await getQuizHallOfFame(
        user,
        stats.perfectUnitsCount || 0,
        stats.totalQuizScore || 0
      );

      if (isMounted) {
        setWeeklyData(wData);
        setHallData(hData);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [user, totalStudyMinutes, streakDays, completedUnitsCount, stats.perfectUnitsCount, stats.totalQuizScore]);

  // Filtered mistake notes
  const filteredMistakes = useMemo(() => {
    if (mistakeFilter === 'unresolved') {
      return mistakeNotes.filter((m) => !m.resolved);
    }
    if (mistakeFilter === 'resolved') {
      return mistakeNotes.filter((m) => m.resolved);
    }
    return mistakeNotes;
  }, [mistakeNotes, mistakeFilter]);

  const top3 = useMemo(() => {
    if (!weeklyData) return [];
    return weeklyData.rankings.slice(0, 3);
  }, [weeklyData]);

  const restRankings = useMemo(() => {
    if (!weeklyData) return [];
    return weeklyData.rankings.slice(3);
  }, [weeklyData]);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 text-white/[0.04] font-black text-9xl select-none pointer-events-none">
          🏆
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Trophy size={13} className="text-amber-400" />
                <span>글로벌 랭킹 & 실시간 동기화</span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  cloudSyncStatus === 'synced'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : cloudSyncStatus === 'syncing'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    cloudSyncStatus === 'synced'
                      ? 'bg-emerald-400'
                      : cloudSyncStatus === 'syncing'
                      ? 'bg-blue-400 animate-ping'
                      : 'bg-slate-400'
                  }`}
                />
                <span>
                  {cloudSyncStatus === 'synced'
                    ? 'Supabase 클라우드 실시간 동기화됨'
                    : cloudSyncStatus === 'syncing'
                    ? '클라우드 동기화 중...'
                    : '로컬 오프라인 모드'}
                </span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              글로벌 학습자 리더보드 & 오답노트
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              전 세계 한국어 톡톡 학습자들과 주간 학습 시간을 겨루고, 퀴즈 만점 명예의 전당과 맞춤 오답노트로 빈틈없이 실력을 완성해보세요.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-row md:flex-col gap-2.5 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center min-w-[120px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase">내 주간 학습 시간</div>
              <div className="text-xl font-black text-amber-300 mt-0.5">
                {Math.floor(totalStudyMinutes / 60)}시간 {totalStudyMinutes % 60}분
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center min-w-[120px]">
              <div className="text-[10px] text-slate-400 font-bold uppercase">복습 대기 오답</div>
              <div className="text-xl font-black text-rose-300 mt-0.5">
                {mistakeNotes.filter((m) => !m.resolved).length}개
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Main Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('weekly')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === 'weekly'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]'
              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80'
          }`}
        >
          <Clock size={16} />
          <span>주간 학습 시간 랭킹</span>
          {weeklyData && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-black">
              Top 20
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hall_of_fame')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === 'hall_of_fame'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20 scale-[1.01]'
              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80'
          }`}
        >
          <Award size={16} />
          <span>퀴즈 만점자 명예의 전당</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mistakes')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
            activeTab === 'mistakes'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-[1.01]'
              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80'
          }`}
        >
          <HelpCircle size={16} />
          <span>나의 맞춤 오답노트</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              activeTab === 'mistakes' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
            }`}
          >
            {mistakeNotes.filter((m) => !m.resolved).length}
          </span>
        </button>
      </div>

      {/* 3. Tab 1: Weekly Study Time Ranking */}
      {activeTab === 'weekly' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Weekly Timer Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900 font-bold">
              <span className="p-1.5 bg-amber-200/80 text-amber-800 rounded-lg">⏱️</span>
              <span>
                이번 주 랭킹 마감까지{' '}
                <strong className="text-amber-700 font-black">
                  D-{weeklyData?.weeklyEndsInDays ?? 3} {weeklyData?.weeklyEndsInHours ?? 12}시간
                </strong>{' '}
                남았습니다. 매주 일요일 자정에 초기화됩니다.
              </span>
            </div>
            <span className="text-[11px] text-amber-700/80 font-medium">
              학습 시간 1분당 10 XP 적립
            </span>
          </div>

          {/* Top 3 Podium Cards */}
          {top3.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* 2nd Place (Silver) */}
              <div className="order-2 md:order-1 p-5 rounded-3xl bg-gradient-to-b from-slate-100 via-white to-slate-50 border-2 border-slate-300 shadow-sm relative overflow-hidden flex flex-col items-center text-center space-y-3">
                <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center text-sm shadow-xs">
                  2
                </div>
                <div className="relative">
                  <img
                    src={getSpeakerAvatar(top3[1].avatarId).avatarUrl}
                    alt={top3[1].userName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-xl">{top3[1].countryFlag}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{top3[1].userName}</h3>
                  <p className="text-[11px] text-slate-500">{top3[1].countryName} · {top3[1].targetLevel}</p>
                </div>
                <div className="w-full pt-2 border-t border-slate-200/80 flex items-center justify-around text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">주간 학습</div>
                    <div className="font-black text-slate-800">
                      {Math.floor(top3[1].weeklyStudyMinutes / 60)}h {top3[1].weeklyStudyMinutes % 60}m
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">스트릭</div>
                    <div className="font-black text-orange-600">{top3[1].streakDays}일 🔥</div>
                  </div>
                </div>
              </div>

              {/* 1st Place (Gold Champion) */}
              <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-100 via-amber-50 to-white border-2 border-amber-400 shadow-lg relative overflow-hidden flex flex-col items-center text-center space-y-3 transform md:-translate-y-2">
                <div className="absolute top-2 right-2 text-2xl">👑</div>
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-base shadow-sm">
                  1
                </div>
                <div className="relative">
                  <img
                    src={getSpeakerAvatar(top3[0].avatarId).avatarUrl}
                    alt={top3[0].userName}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-amber-400 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-2xl">{top3[0].countryFlag}</span>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">{top3[0].userName}</h3>
                  <p className="text-xs text-amber-900 font-semibold">{top3[0].countryName} · {top3[0].targetLevel}</p>
                </div>
                <div className="w-full pt-2 border-t border-amber-200 flex items-center justify-around text-xs">
                  <div>
                    <div className="text-[10px] text-amber-700 font-bold">주간 학습</div>
                    <div className="font-black text-amber-950 text-sm">
                      {Math.floor(top3[0].weeklyStudyMinutes / 60)}h {top3[0].weeklyStudyMinutes % 60}m
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-700 font-bold">스트릭</div>
                    <div className="font-black text-orange-600 text-sm">{top3[0].streakDays}일 🔥</div>
                  </div>
                </div>
              </div>

              {/* 3rd Place (Bronze) */}
              <div className="order-3 p-5 rounded-3xl bg-gradient-to-b from-amber-50 via-white to-orange-50/30 border-2 border-amber-600/40 shadow-sm relative overflow-hidden flex flex-col items-center text-center space-y-3">
                <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  3
                </div>
                <div className="relative">
                  <img
                    src={getSpeakerAvatar(top3[2].avatarId).avatarUrl}
                    alt={top3[2].userName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-600/50 shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 text-xl">{top3[2].countryFlag}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{top3[2].userName}</h3>
                  <p className="text-[11px] text-slate-500">{top3[2].countryName} · {top3[2].targetLevel}</p>
                </div>
                <div className="w-full pt-2 border-t border-slate-200/80 flex items-center justify-around text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">주간 학습</div>
                    <div className="font-black text-slate-800">
                      {Math.floor(top3[2].weeklyStudyMinutes / 60)}h {top3[2].weeklyStudyMinutes % 60}m
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">스트릭</div>
                    <div className="font-black text-orange-600">{top3[2].streakDays}일 🔥</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Current User Highlight Card */}
          {weeklyData?.currentUserRank && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-lg">
                  #{weeklyData.currentUserRank.rank}
                </div>
                <div className="relative">
                  <img
                    src={getSpeakerAvatar(user.avatarId || 'minho').avatarUrl}
                    alt={user.name}
                    className="w-11 h-11 rounded-xl object-cover border border-white/40"
                  />
                  <span className="absolute -bottom-1 -right-1 text-base">
                    {weeklyData.currentUserRank.countryFlag}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm">{user.name} (나)</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 font-bold">
                      {user.targetLevel}
                    </span>
                  </div>
                  <p className="text-xs text-blue-100">
                    현재 상위 {Math.max(1, Math.round((weeklyData.currentUserRank.rank / (weeklyData.rankings.length || 1)) * 100))}% 리더보드에 랭크인!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t sm:border-t-0 border-white/20 pt-2 sm:pt-0">
                <div className="text-right">
                  <div className="text-[10px] text-blue-200">주간 학습 시간</div>
                  <div className="font-black text-sm">
                    {Math.floor(weeklyData.currentUserRank.weeklyStudyMinutes / 60)}시간 {weeklyData.currentUserRank.weeklyStudyMinutes % 60}분
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-blue-200">연속 스트릭</div>
                  <div className="font-black text-sm text-amber-300">{streakDays}일 🔥</div>
                </div>
              </div>
            </div>
          )}

          {/* Rest of Leaderboard List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">주간 랭킹 4위 ~ 20위</h3>
              <span className="text-xs text-slate-500">실시간 집계</span>
            </div>

            <div className="divide-y divide-slate-100">
              {restRankings.map((item) => (
                <div
                  key={item.userId}
                  className={`p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors ${
                    item.isCurrentUser ? 'bg-blue-50/60 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center font-mono font-black text-slate-500 text-sm">
                      {item.rank}
                    </span>
                    <div className="relative">
                      <img
                        src={getSpeakerAvatar(item.avatarId).avatarUrl}
                        alt={item.userName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <span className="absolute -bottom-1 -right-1 text-sm">{item.countryFlag}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{item.userName}</span>
                        {item.isCurrentUser && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-blue-600 text-white">
                            나
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {item.countryName} · {item.targetLevel} 레벨
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-[10px] text-slate-400 font-medium">학습 시간</div>
                      <div className="text-xs sm:text-sm font-black text-slate-800">
                        {Math.floor(item.weeklyStudyMinutes / 60)}h {item.weeklyStudyMinutes % 60}m
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-[10px] text-slate-400 font-medium">연속</div>
                      <div className="text-xs font-bold text-orange-600">{item.streakDays}일 🔥</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Tab 2: Quiz Perfect Score Hall of Fame */}
      {activeTab === 'hall_of_fame' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg space-y-2">
            <div className="flex items-center gap-2">
              <Award size={24} className="text-slate-950" />
              <h2 className="text-xl font-black">한국어 퀴즈 만점자 명예의 전당 (Hall of Fame)</h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900/90 leading-relaxed">
              45개 단원 퀴즈에서 100% 만점을 달성한 에이스 학습자들의 영예로운 기록입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hallData?.hallOfFame.map((honor) => (
              <div
                key={honor.userId}
                className={`p-5 rounded-3xl bg-white border shadow-xs transition-all space-y-3 ${
                  honor.isCurrentUser
                    ? 'border-2 border-amber-400 ring-2 ring-amber-400/20 shadow-md'
                    : 'border-slate-200/80 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={getSpeakerAvatar(honor.avatarId).avatarUrl}
                        alt={honor.userName}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                      />
                      <span className="absolute -bottom-1 -right-1 text-base">{honor.countryFlag}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{honor.userName}</h4>
                        {honor.isCurrentUser && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-amber-400 text-slate-950">
                            나
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 inline-block mt-0.5">
                        {honor.badgeTitle}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-black px-2 py-1 rounded-lg bg-slate-100 text-slate-700">
                    Rank #{honor.rank}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">100% 만점 단원</div>
                    <div className="text-base font-black text-amber-600 mt-0.5">
                      {honor.perfectUnitsCount} / 45과
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400">퀴즈 누적 총점</div>
                    <div className="text-base font-black text-blue-600 mt-0.5">{honor.totalScore}점</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Tab 3: Mistake Review Notebook (나의 오답노트) */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Mistake Header & Filters */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>📝 퀴즈 취약점 집중 복습 오답노트</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  단원 퀴즈에서 틀렸던 문항이 클라우드에 자동 기록됩니다. 완벽히 이해할 때까지 다시 풀어보세요.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setMistakeFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mistakeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  전체 ({mistakeNotes.length})
                </button>
                <button
                  type="button"
                  onClick={() => setMistakeFilter('unresolved')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mistakeFilter === 'unresolved' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  복습 필요 ({mistakeNotes.filter((m) => !m.resolved).length})
                </button>
                <button
                  type="button"
                  onClick={() => setMistakeFilter('resolved')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mistakeFilter === 'resolved' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  해결 완료 ({mistakeNotes.filter((m) => m.resolved).length})
                </button>
              </div>
            </div>
          </div>

          {/* Mistake Cards List */}
          {filteredMistakes.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🎉
              </div>
              <h3 className="font-bold text-slate-900 text-base">오답노트가 비어있습니다!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                틀린 문제가 없거나 모든 오답을 성공적으로 복습 완료했습니다. 단원 퀴즈를 풀며 실력을 계속 점검해보세요!
              </p>
              <button
                type="button"
                onClick={() => navigate('/quiz')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                단원 퀴즈 풀러 가기
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMistakes.map((item) => (
                <div
                  key={`${item.edition}_${item.unitNumber}_${item.quizId}`}
                  className={`p-6 rounded-3xl bg-white border transition-all space-y-4 ${
                    item.resolved
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-rose-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-100 text-slate-700">
                        Unit {item.unitNumber} ({item.edition.toUpperCase()})
                      </span>
                      {item.resolved ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          <span>이해 완료</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                          <XCircle size={12} className="text-rose-600" />
                          <span>복습 필요</span>
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteMistake(item.unitNumber, item.edition, item.quizId)}
                      className="text-xs text-slate-400 hover:text-rose-500 transition-colors p-1"
                      title="오답노트에서 삭제"
                    >
                      삭제
                    </button>
                  </div>

                  {/* Question */}
                  <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                    {item.question}
                  </div>

                  {/* User Answer vs Correct Answer */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {item.userAnswer && (
                      <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
                        <span className="text-[10px] font-bold text-rose-700">❌ 내가 선택한 오답:</span>
                        <div className="font-bold text-rose-900">{item.userAnswer}</div>
                      </div>
                    )}
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700">✅ 올바른 정답:</span>
                      <div className="font-bold text-emerald-900">{item.correctAnswer}</div>
                    </div>
                  </div>

                  {/* Explanation */}
                  {item.explanation && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900">💡 문법 & 풀이 해설: </span>
                      {item.explanation}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/quiz?unit=${item.unitNumber}&edition=${item.edition}`)
                      }
                      className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw size={14} />
                      <span>해당 단원 퀴즈 다시 풀기</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        resolveMistake(item.unitNumber, item.edition, item.quizId, !item.resolved)
                      }
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                        item.resolved
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <Check size={14} />
                      <span>{item.resolved ? '다시 복습으로 변경' : '이해 완료 체크'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
