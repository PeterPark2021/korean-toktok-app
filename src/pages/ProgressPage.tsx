import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  Flame,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BarChart3,
  Award,
  Layers,
  Check,
  ChevronRight
} from 'lucide-react';
import { useProgress, getUnitKey } from '../hooks/useProgress';
import { useTTS } from '../hooks/useTTS';
import {
  getAllUnits,
  getUnitVocab,
  getActiveEdition,
  setActiveEdition,
  ALL_BOOKS,
  getBookForUnit
} from '../data';
import { EditionSelector } from '../components/common/EditionSelector';
import { AudioButton } from '../components/common/AudioButton';
import { BadgeCollection } from '../components/dashboard/BadgeCollection';
import { EditionType, BookFilter, BookCode } from '../types';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentEdition, setCurrentEdition] = useState<EditionType>(getActiveEdition());
  const [selectedBookFilter, setSelectedBookFilter] = useState<BookFilter>('all');
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');

  const {
    progress,
    quizScores,
    streakDays,
    totalStudyMinutes,
    getEditionStats,
    toggleVocabMastered
  } = useProgress();

  const { speak, speaking, currentSpeakingText } = useTTS();

  const units = useMemo(() => {
    return getAllUnits(currentEdition);
  }, [currentEdition]);

  const kbsStats = getEditionStats('kbs');
  const wizStats = getEditionStats('wiz');
  const activeStats = currentEdition === 'kbs' ? kbsStats : wizStats;

  // Level statistics for active edition
  const beginnerUnits = units.filter((u) => u.level === '초급');
  const intermediateUnits = units.filter((u) => u.level === '중급');
  const advancedUnits = units.filter((u) => u.level === '고급');

  const getLevelProgress = (unitList: typeof units) => {
    const done = unitList.filter((u) => progress[getUnitKey(u.unit_number, currentEdition)]?.studied).length;
    return {
      count: done,
      total: unitList.length,
      pct: unitList.length > 0 ? Math.round((done / unitList.length) * 100) : 0
    };
  };

  const begStats = getLevelProgress(beginnerUnits);
  const intStats = getLevelProgress(intermediateUnits);
  const advStats = getLevelProgress(advancedUnits);

  // Filtered unit list for progress display
  const displayedUnits = useMemo(() => {
    return units.filter((u) => {
      const bookCode = getBookForUnit(u.unit_number);
      if (selectedBookFilter === 'all') return true;
      return bookCode === selectedBookFilter;
    });
  }, [units, selectedBookFilter]);

  // Collect all mastered words across all units for this edition
  const allMasteredWords = useMemo(() => {
    const list: { word: string; unitNumber: number; unitTitle: string }[] = [];
    units.forEach((u) => {
      const key = getUnitKey(u.unit_number, currentEdition);
      const words = progress[key]?.vocabMastered || [];
      words.forEach((w) => {
        list.push({ word: w, unitNumber: u.unit_number, unitTitle: u.title });
      });
    });
    return list;
  }, [progress, units, currentEdition]);

  const handleEditionChange = (ed: EditionType) => {
    setCurrentEdition(ed);
    setActiveEdition(ed);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Top Section: Edition Selection & View Switcher */}
      <div className="space-y-4">
        <EditionSelector
          currentEdition={currentEdition}
          onEditionChange={handleEditionChange}
        />

        {/* Dashboard View Mode Tabs */}
        <div className="flex items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 p-2 rounded-2xl">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setViewMode('single');
                handleEditionChange('kbs');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'single' && currentEdition === 'kbs'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>📘 KBS 공식 교재 진도표</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-900/80 text-blue-200">
                {kbsStats.completedUnitsCount}/45
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('single');
                handleEditionChange('wiz');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'single' && currentEdition === 'wiz'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>🔮 Wiz AI 에디션 진도표</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-900/80 text-purple-200">
                {wizStats.completedUnitsCount}/45
              </span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'compare' ? 'single' : 'compare')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'compare'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BarChart3 size={15} />
            <span>양대 교재 종합 비교</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Comparison Matrix View */}
      {viewMode === 'compare' ? (
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white">
                  KBS 교재 vs Wiz AI 에디션 학습 성취도 비교
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  두 에디션 간의 단원 완료율, 마스터한 어휘 수, 퀴즈 응시 현황을 한눈에 비교합니다.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
                비교 분석 모드
              </span>
            </div>

            {/* Comparison Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* KBS Summary */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">📘</span>
                    <h3 className="font-bold text-white text-base">한국어 톡톡 (KBS 공식)</h3>
                  </div>
                  <span className="text-sm font-black text-blue-400">{kbsStats.overallPercentage}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">완료 단원</div>
                    <div className="text-base font-bold text-white mt-0.5">{kbsStats.completedUnitsCount}/45</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">마스터 어휘</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">{kbsStats.totalMasteredVocabCount}개</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">퀴즈 응시</div>
                    <div className="text-base font-bold text-blue-400 mt-0.5">{kbsStats.quizAttemptedCount}과</div>
                  </div>
                </div>
              </div>

              {/* Wiz Summary */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-purple-500/20 text-purple-400 rounded-lg">🔮</span>
                    <h3 className="font-bold text-white text-base">한국어 톡톡 (Wiz AI)</h3>
                  </div>
                  <span className="text-sm font-black text-purple-400">{wizStats.overallPercentage}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">완료 단원</div>
                    <div className="text-base font-bold text-white mt-0.5">{wizStats.completedUnitsCount}/45</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">마스터 어휘</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">{wizStats.totalMasteredVocabCount}개</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-slate-400 text-[10px]">퀴즈 응시</div>
                    <div className="text-base font-bold text-purple-400 mt-0.5">{wizStats.quizAttemptedCount}과</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">단원별 에디션 진도 비교표</h3>
              <span className="text-xs text-slate-500">전체 45개 단원</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold">
                  <tr>
                    <th className="p-3.5 pl-6">단원 번호 및 제목</th>
                    <th className="p-3.5 text-center">레벨 / 교재</th>
                    <th className="p-3.5 text-center">KBS 학습 완료</th>
                    <th className="p-3.5 text-center">KBS 퀴즈 점수</th>
                    <th className="p-3.5 text-center">Wiz 학습 완료</th>
                    <th className="p-3.5 text-center">Wiz 퀴즈 점수</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {units.map((u) => {
                    const kbsProg = progress[getUnitKey(u.unit_number, 'kbs')];
                    const wizProg = progress[getUnitKey(u.unit_number, 'wiz')];
                    const kbsQuiz = quizScores[getUnitKey(u.unit_number, 'kbs')];
                    const wizQuiz = quizScores[getUnitKey(u.unit_number, 'wiz')];

                    return (
                      <tr key={u.unit_number} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 pl-6 font-bold text-slate-900">
                          Unit {u.unit_number}. {u.title}
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium text-[11px]">
                            {u.level}
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          {kbsProg?.studied ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                              <CheckCircle2 size={14} /> 완료
                            </span>
                          ) : (
                            <span className="text-slate-400">미완료</span>
                          )}
                        </td>
                        <td className="p-3.5 text-center font-mono">
                          {kbsQuiz?.attempts ? (
                            <span className="text-blue-600 font-bold">{kbsQuiz.bestScore}/{kbsQuiz.totalQuestions}점</span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          {wizProg?.studied ? (
                            <span className="inline-flex items-center gap-1 text-purple-600 font-bold">
                              <CheckCircle2 size={14} /> 완료
                            </span>
                          ) : (
                            <span className="text-slate-400">미완료</span>
                          )}
                        </td>
                        <td className="p-3.5 text-center font-mono">
                          {wizQuiz?.attempts ? (
                            <span className="text-purple-600 font-bold">{wizQuiz.bestScore}/{wizQuiz.totalQuestions}점</span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Combined Achievement Badge Showcase */}
          <BadgeCollection
            key="badges-compare"
            progressData={progress}
            quizScoresData={quizScores}
            streakDays={streakDays}
            edition={currentEdition}
          />
        </div>
      ) : (
        /* VIEW 2: Single Edition Dedicated Dashboard */
        <div className="space-y-8">
          {/* 2. Dashboard Hero Header */}
          <div
            className={`p-8 rounded-3xl text-white shadow-xl space-y-6 relative overflow-hidden border ${
              currentEdition === 'kbs'
                ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-blue-800/60'
                : 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-purple-800/60'
            }`}
          >
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 text-white/5 font-black text-9xl select-none pointer-events-none">
              톡
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    currentEdition === 'kbs'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }`}
                >
                  <Sparkles size={13} />
                  <span>
                    {currentEdition === 'kbs' ? '한국어 톡톡 (KBS 공식 교재)' : '한국어 톡톡 (Wiz AI 에디션)'} 진도 대시보드
                  </span>
                </span>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                  {currentEdition === 'kbs' ? 'KBS 교재 학습 진행 현황' : 'Wiz AI 에디션 학습 진행 현황'}
                </h1>
                <p className="text-xs md:text-sm text-slate-300 font-medium max-w-xl">
                  총 45개 단원 중 현재 <strong className={currentEdition === 'kbs' ? 'text-blue-400 font-bold' : 'text-purple-400 font-bold'}>{activeStats.completedUnitsCount}개</strong> 단원을 완료하고 <strong className="text-amber-300 font-bold">{activeStats.totalMasteredVocabCount}개</strong> 어휘를 마스터했습니다!
                </p>
              </div>

              <button
                onClick={() => navigate(`/?unit=1&edition=${currentEdition}`)}
                className={`flex items-center gap-2 px-6 py-3.5 text-white rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 ${
                  currentEdition === 'kbs'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/25'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/25'
                }`}
              >
                <span>이어서 학습하기</span>
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Global Progress Bar */}
            <div className="space-y-2 pt-2 relative z-10">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>{currentEdition.toUpperCase()} 에디션 전체 완강률</span>
                <span className={currentEdition === 'kbs' ? 'text-blue-400 font-mono text-sm' : 'text-purple-400 font-mono text-sm'}>
                  {activeStats.overallPercentage}% ({activeStats.completedUnitsCount}/45)
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    currentEdition === 'kbs'
                      ? 'bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-300'
                      : 'bg-gradient-to-r from-purple-500 via-pink-400 to-amber-300'
                  }`}
                  style={{ width: `${Math.max(activeStats.overallPercentage, 2)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 3. KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className={`p-3 rounded-2xl w-fit ${currentEdition === 'kbs' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                <BookOpen size={22} />
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                {activeStats.completedUnitsCount} <span className="text-sm font-semibold text-slate-400">/ 45</span>
              </div>
              <div className="text-xs text-slate-500 font-bold">완료한 학습 단원 ({currentEdition.toUpperCase()})</div>
            </div>

            <div className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit">
                <Award size={22} />
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                {activeStats.totalMasteredVocabCount} <span className="text-sm font-semibold text-slate-400">단어</span>
              </div>
              <div className="text-xs text-slate-500 font-bold">마스터한 어휘 ({currentEdition.toUpperCase()})</div>
            </div>

            <div className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className={`p-3 rounded-2xl w-fit ${currentEdition === 'kbs' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'}`}>
                <Trophy size={22} />
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                {activeStats.quizAttemptedCount} <span className="text-sm font-semibold text-slate-400">개 단원</span>
              </div>
              <div className="text-xs text-slate-500 font-bold">퀴즈 응시 단원 ({currentEdition.toUpperCase()})</div>
            </div>

            <div className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl w-fit">
                <Flame size={22} />
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                {streakDays} <span className="text-sm font-semibold text-slate-400">일</span>
              </div>
              <div className="text-xs text-slate-500 font-bold">연속 학습 스트릭</div>
            </div>
          </div>

          {/* 4. Level Breakdown Progress Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <BarChart3 size={20} className={currentEdition === 'kbs' ? 'text-blue-600' : 'text-purple-600'} />
              <span>{currentEdition === 'kbs' ? 'KBS 교재' : 'Wiz AI'} 단계별 진도 현황</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Beginner */}
              <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    초급 (초급A · 초급B)
                  </span>
                  <span className="text-sm font-black text-emerald-700">{begStats.pct}%</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {begStats.count} / {begStats.total} 단원 완료
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${begStats.pct}%` }}
                  ></div>
                </div>
              </div>

              {/* Intermediate */}
              <div className="p-6 rounded-3xl bg-white border border-indigo-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    중급 (중급A · 중급B)
                  </span>
                  <span className="text-sm font-black text-indigo-700">{intStats.pct}%</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {intStats.count} / {intStats.total} 단원 완료
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${intStats.pct}%` }}
                  ></div>
                </div>
              </div>

              {/* Advanced */}
              <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    고급 (고급A)
                  </span>
                  <span className="text-sm font-black text-purple-700">{advStats.pct}%</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {advStats.count} / {advStats.total} 단원 완료
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${advStats.pct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Visual Achievement Badge Collection */}
          <BadgeCollection
            key={`badges-${currentEdition}`}
            progressData={progress}
            quizScoresData={quizScores}
            streakDays={streakDays}
            edition={currentEdition}
          />

          {/* 6. Unit-by-Unit Progress Visualizer */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  {currentEdition === 'kbs' ? 'KBS 교재' : 'Wiz AI'} 상세 단원별 진도 & 퀴즈 기록
                </h2>
                <p className="text-xs text-slate-500">
                  선택한 {currentEdition.toUpperCase()} 에디션의 학습 완료 상태 및 퀴즈 최고 점수를 확인하세요
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setSelectedBookFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedBookFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  전체
                </button>
                {ALL_BOOKS.map((b) => (
                  <button
                    key={b.code}
                    type="button"
                    onClick={() => setSelectedBookFilter(b.code)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedBookFilter === b.code
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {b.title.replace('한국어 톡톡 ', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Units Progress Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedUnits.map((unit) => {
                const key = getUnitKey(unit.unit_number, currentEdition);
                const unitProg = progress[key] || { studied: false, vocabMastered: [] };
                const unitQuiz = quizScores[key] || { attempts: 0, bestScore: 0, totalQuestions: 13 };
                const totalVocabInUnit = getUnitVocab(unit.unit_number, currentEdition).length || 1;
                const masteredCount = unitProg.vocabMastered?.length || 0;
                const vocabPct = Math.min(Math.round((masteredCount / totalVocabInUnit) * 100), 100);
                const quizPct =
                  unitQuiz.totalQuestions > 0
                    ? Math.round((unitQuiz.bestScore / unitQuiz.totalQuestions) * 100)
                    : 0;

                const bookCode = getBookForUnit(unit.unit_number);

                return (
                  <div
                    key={`${unit.level}-${unit.unit_number}`}
                    className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    {/* Card Top */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          Unit {unit.unit_number} · {unit.level} ({bookCode})
                        </span>
                        {unitProg.studied ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            <span>학습 완료</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                            미완료
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900 text-base line-clamp-1">{unit.title}</h3>
                        <p className={`text-xs font-medium ${currentEdition === 'kbs' ? 'text-blue-600' : 'text-purple-600'}`}>
                          주제: {unit.topic}
                        </p>
                        <p className="text-xs text-slate-400 line-clamp-1">{unit.situation}</p>
                      </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      {/* 1. Vocab Mastery Progress */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                          <span className="flex items-center gap-1">
                            <BookOpen size={12} className="text-emerald-600" />
                            <span>어휘 마스터</span>
                          </span>
                          <span className="text-emerald-700 font-mono">
                            {masteredCount} / {totalVocabInUnit}개 ({vocabPct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${vocabPct}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* 2. Quiz Score Progress */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                          <span className="flex items-center gap-1">
                            <HelpCircle size={12} className={currentEdition === 'kbs' ? 'text-blue-600' : 'text-purple-600'} />
                            <span>퀴즈 성취도</span>
                          </span>
                          <span className={`${currentEdition === 'kbs' ? 'text-blue-600' : 'text-purple-600'} font-mono`}>
                            {unitQuiz.attempts > 0
                              ? `최고 ${unitQuiz.bestScore}/${unitQuiz.totalQuestions}점 (${quizPct}%)`
                              : '미응시'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              currentEdition === 'kbs'
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-500'
                                : 'bg-gradient-to-r from-purple-600 to-pink-500'
                            }`}
                            style={{ width: `${quizPct}%` }}
                          ></div>
                        </div>
                        {unitQuiz.attempts > 0 && (
                          <div className="text-[10px] text-slate-400 text-right">
                            총 {unitQuiz.attempts}회 응시 완료
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => navigate(`/?unit=${unit.unit_number}&edition=${currentEdition}`)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        학습하기
                      </button>
                      <button
                        onClick={() => navigate(`/quiz?unit=${unit.unit_number}&edition=${currentEdition}`)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center ${
                          currentEdition === 'kbs'
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                        }`}
                      >
                        퀴즈 풀기
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. Mastered Vocabulary Words Cloud for Active Edition */}
          <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
                  <Award size={18} />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-black text-slate-900">
                    {currentEdition === 'kbs' ? 'KBS 교재' : 'Wiz AI'} 마스터한 단어장
                  </h2>
                  <p className="text-xs text-slate-500">
                    {currentEdition.toUpperCase()} 에디션 어휘 플래시카드에서 암기 완료한 단어 목록
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                총 {allMasteredWords.length}개 마스터
              </span>
            </div>

            {allMasteredWords.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                아직 {currentEdition.toUpperCase()} 에디션에서 마스터한 단어가 없습니다. 어휘 학습 카드에서 '외웠어요 체크'를 눌러 추가해 보세요!
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pt-2">
                {allMasteredWords.map((item, idx) => (
                  <div
                    key={`${item.word}-${idx}`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 text-slate-800 text-sm font-bold shadow-xs hover:shadow-sm transition-all"
                  >
                    <span className="text-slate-900">{item.word}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-200/60 text-emerald-900 font-semibold">
                      Unit {item.unitNumber}
                    </span>
                    <AudioButton
                      text={item.word}
                      onPlay={speak}
                      isPlaying={speaking && currentSpeakingText === item.word}
                      size="sm"
                    />
                    <button
                      onClick={() => toggleVocabMastered(item.unitNumber, item.word, currentEdition)}
                      className="text-slate-400 hover:text-rose-500 text-xs cursor-pointer p-0.5"
                      title="마스터 해제"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
