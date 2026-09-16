import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  BookOpen,
  FileText,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Play,
  Flame,
  GraduationCap
} from 'lucide-react';
import { UnitSelector } from '../components/common/UnitSelector';
import { EditionSelector } from '../components/common/EditionSelector';
import { BookFilterBar } from '../components/common/BookFilterBar';
import { TableOfContentsModal } from '../components/common/TableOfContentsModal';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';
import { DialogueViewer } from '../components/study/DialogueViewer';
import { VocabFlashcard } from '../components/study/VocabFlashcard';
import { GrammarViewer } from '../components/study/GrammarViewer';
import { CultureViewer } from '../components/study/CultureViewer';
import { useTTS } from '../hooks/useTTS';
import { useProgress, getUnitKey } from '../hooks/useProgress';
import {
  getAllUnits,
  getUnitDialogues,
  getUnitVocab,
  getUnitGrammar,
  getUnitDetails,
  getActiveEdition,
  setActiveEdition,
  getBookForUnit,
  BOOKS_METADATA
} from '../data';
import { EditionType, BookFilter, BookCode, TabTarget } from '../types';

export const StudyPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Edition: single-source-of-truth from searchParams or default
  const editionParam = (searchParams.get('edition') as EditionType) || getActiveEdition();
  const currentEdition: EditionType = editionParam === 'kbs' || editionParam === 'wiz' ? editionParam : 'kbs';

  // Unit Number: single-source-of-truth from searchParams
  const unitParam = parseInt(searchParams.get('unit') || '1', 10);
  const currentUnitNumber = isNaN(unitParam) ? 1 : Math.max(1, Math.min(45, unitParam));

  // Active Tab: single-source-of-truth from searchParams
  const tabParam = searchParams.get('tab') as TabTarget;
  const activeTab: TabTarget = tabParam && ['dialogue', 'vocab', 'grammar', 'culture'].includes(tabParam)
    ? tabParam
    : 'dialogue';

  // Book Filter
  const [selectedBookFilter, setSelectedBookFilter] = useState<BookFilter>('all');

  // Modals state
  const [isTOCModalOpen, setIsTOCModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // TTS Hook
  const {
    speak,
    stop,
    speaking,
    currentSpeakingText,
    speechRate,
    setSpeechRate,
    playDialogueQueue,
    isQueuePlaying,
    queueIndex
  } = useTTS();

  // Progress Hook
  const { progress, streakDays, completedUnitsCount, markUnitStudied, getUnitProgress } = useProgress();

  // Sync active edition globally when URL changes
  useEffect(() => {
    setActiveEdition(currentEdition);
  }, [currentEdition]);

  // Data Getters for active unit and edition
  const currentUnit = useMemo(() => {
    return getUnitDetails(currentUnitNumber, currentEdition);
  }, [currentUnitNumber, currentEdition]);

  const allUnits = useMemo(() => getAllUnits(currentEdition), [currentEdition]);

  const dialogues = useMemo(() => getUnitDialogues(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);
  const vocabList = useMemo(() => getUnitVocab(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);
  const grammarList = useMemo(() => getUnitGrammar(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);

  const unitProgress = getUnitProgress(currentUnitNumber, currentEdition);
  const isCompleted = unitProgress.studied;

  const currentBookCode = getBookForUnit(currentUnitNumber);
  const currentBookMeta = BOOKS_METADATA[currentBookCode];

  const completedMap = useMemo(() => {
    const map: Record<number, boolean> = {};
    allUnits.forEach((u) => {
      const key = getUnitKey(u.unit_number, currentEdition);
      map[u.unit_number] = !!progress[key]?.studied;
    });
    return map;
  }, [allUnits, progress, currentEdition]);

  // Compute next recommended uncompleted unit
  const nextRecommendedUnitNumber = useMemo(() => {
    const uncompleted = allUnits.find((u) => !completedMap[u.unit_number]);
    return uncompleted ? uncompleted.unit_number : 1;
  }, [allUnits, completedMap]);

  const handleSelectUnit = (num: number, targetTab?: TabTarget | 'shadowing') => {
    stop();
    const tabToSet = (targetTab === 'vocab' || targetTab === 'grammar' || targetTab === 'culture') 
      ? targetTab 
      : (targetTab === 'dialogue' ? 'dialogue' : activeTab);
    
    const unitBook = getBookForUnit(num);
    if (selectedBookFilter !== 'all' && selectedBookFilter !== unitBook) {
      setSelectedBookFilter(unitBook);
    }

    setSearchParams(
      {
        unit: num.toString(),
        tab: tabToSet,
        edition: currentEdition
      },
      { replace: true }
    );
  };

  const handleEditionChange = (newEdition: EditionType) => {
    setActiveEdition(newEdition);
    setSearchParams(
      {
        unit: currentUnitNumber.toString(),
        tab: activeTab,
        edition: newEdition
      },
      { replace: true }
    );
  };

  const handleBookFilterChange = (book: BookFilter) => {
    setSelectedBookFilter(book);
    if (book !== 'all') {
      const meta = BOOKS_METADATA[book as BookCode];
      // If current unit is not in this book, switch to the first unit of the selected book
      if (currentUnitNumber < meta.unitRange[0] || currentUnitNumber > meta.unitRange[1]) {
        handleSelectUnit(meta.unitRange[0], activeTab);
      }
    }
  };

  const handleToggleComplete = () => {
    markUnitStudied(currentUnitNumber, !isCompleted, currentEdition);
  };

  const handleGoToQuiz = () => {
    navigate(`/quiz?unit=${currentUnitNumber}&edition=${currentEdition}`);
  };

  const handleGoToNextUnit = () => {
    if (currentUnitNumber < 45) {
      handleSelectUnit(currentUnitNumber + 1, 'dialogue');
    } else {
      handleSelectUnit(1, 'dialogue');
    }
  };

  const handleGoToRecommended = () => {
    handleSelectUnit(nextRecommendedUnitNumber, 'dialogue');
  };

  const tabs = [
    {
      id: 'dialogue' as const,
      label: '회화문 학습',
      icon: MessageSquare,
      count: dialogues.length
    },
    {
      id: 'vocab' as const,
      label: '핵심 어휘',
      icon: BookOpen,
      count: vocabList.length
    },
    {
      id: 'grammar' as const,
      label: '문법 해설',
      icon: FileText,
      count: grammarList.length
    },
    {
      id: 'culture' as const,
      label: '문화 톡톡',
      icon: Sparkles,
      count: 1
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Utility Header: Greeting & Compact Edition Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              오늘의 한국어 학습 🇰🇷
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
              <Flame size={13} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span>{streakDays}일 연속</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            생생한 대화와 퀴즈로 실전 한국어 실력을 완성해보세요.
          </p>
        </div>

        {/* Compact Edition Selector Pill */}
        <div className="shrink-0 max-w-full sm:max-w-md">
          <EditionSelector
            currentEdition={currentEdition}
            onEditionChange={handleEditionChange}
            compact={true}
          />
        </div>
      </div>

      {/* Beginner Hangul Callout Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-xs">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                한글 자모나 기초 문법이 처음이신가요?
              </span>
              <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-blue-100 text-blue-700">
                초급 예비편
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              세종대왕의 창제 원리, 40자 자모, 실시간 글자 결합기, 받침 7대 대표음부터 시작해 보세요.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/hangul')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>한글 익히기 시작하기</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 2. Primary "이어서 학습하기 (Hero Card)" - Highest Information Hierarchy */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
        {/* Decorative Watermark Number */}
        <div className="absolute right-2 top-0 translate-x-4 -translate-y-4 text-white/[0.04] font-black text-9xl select-none pointer-events-none">
          {currentUnitNumber}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            {/* Top Status & Context Pill Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-xs">
                {currentBookMeta.title}
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-300 border border-white/10">
                {currentUnit.level} 레벨
              </span>

              {/* Clear Non-Button Status Pill */}
              {isCompleted ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>학습 완료됨</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{currentUnitNumber === nextRecommendedUnitNumber ? '오늘의 추천 단원' : '학습 진행 중'}</span>
                </span>
              )}

              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {currentEdition === 'kbs' ? 'KBS 원문' : 'Wiz AI 강화'}
              </span>
            </div>

            {/* Unit Title */}
            <div>
              <div className="text-xs font-bold text-cyan-400 tracking-wider uppercase mb-1">
                {isCompleted ? '최근 학습 단원' : '이어서 학습하기'}
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-baseline gap-2.5">
                <span className="text-blue-400 font-extrabold">Unit {currentUnit.unit_number}.</span>
                <span>{currentUnit.title}</span>
              </h1>
            </div>

            {/* Topic & Situation */}
            <div className="space-y-1">
              <p className="text-sm text-cyan-200 font-semibold flex items-center gap-1.5">
                <span>주제: {currentUnit.topic}</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentUnit.situation}
              </p>
            </div>

            {/* If completed, subtle jump hint */}
            {isCompleted && currentUnitNumber < 45 && (
              <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
                <span>💡 이미 완료한 단원입니다. 다음 단원(Unit {currentUnitNumber + 1})으로 이어가거나 퀴즈로 복습하세요.</span>
              </div>
            )}
          </div>

          {/* Action Button Group: Distinct, High Affordance */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-2 lg:pt-0">
            {/* Primary Action Button */}
            {isCompleted ? (
              <button
                type="button"
                onClick={handleGoToNextUnit}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-400 text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
              >
                <span>다음 단원으로 이동 (Unit {currentUnitNumber < 45 ? currentUnitNumber + 1 : 1})</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('study-sub-tabs');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer"
              >
                <Play size={16} className="fill-white" />
                <span>회화문 바로 학습하기</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              {/* Quiz Button */}
              <button
                type="button"
                onClick={handleGoToQuiz}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer"
              >
                <HelpCircle size={15} className="text-cyan-300" />
                <span>단원 퀴즈 풀기</span>
              </button>

              {/* Toggle Studied Status Button (Secondary) */}
              <button
                type="button"
                onClick={handleToggleComplete}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isCompleted
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-emerald-600/30 hover:bg-emerald-600/40 border-emerald-500/50 text-emerald-300'
                }`}
                title={isCompleted ? '완료 상태 취소하기' : '학습 완료로 체크하기'}
              >
                {isCompleted ? (
                  <>
                    <RotateCcw size={14} />
                    <span>완료 취소</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>완료 체크</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Textbook Book Filter Bar (Level Tabs & Exploration Tools) */}
      <BookFilterBar
        selectedBook={selectedBookFilter}
        onSelectBook={handleBookFilterChange}
        onOpenTOC={() => setIsTOCModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* 4. Unit Selector Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-full">
          <UnitSelector
            currentUnitNumber={currentUnitNumber}
            onSelectUnit={(num) => handleSelectUnit(num, activeTab)}
            completedUnits={completedMap}
            edition={currentEdition}
          />
        </div>
      </div>

      {/* 5. Study Sub-Tabs (회화문 / 어휘 / 문법 / 문화) */}
      <div id="study-sub-tabs" className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSearchParams(
                  {
                    unit: currentUnitNumber.toString(),
                    tab: tab.id,
                    edition: currentEdition
                  },
                  { replace: true }
                );
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]'
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 6. Active Study Tab Content Area */}
      <div className="pt-2">
        {activeTab === 'dialogue' && (
          <DialogueViewer
            key={`dialogue-unit-${currentUnitNumber}-${currentEdition}`}
            dialogues={dialogues}
            onPlayTTS={speak}
            onStopTTS={stop}
            speaking={speaking}
            currentSpeakingText={currentSpeakingText}
            speechRate={speechRate}
            setSpeechRate={setSpeechRate}
            playDialogueQueue={playDialogueQueue}
            isQueuePlaying={isQueuePlaying}
            queueIndex={queueIndex}
            unitNumber={currentUnitNumber}
            situationText={currentUnit.situation}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabFlashcard
            key={`vocab-unit-${currentUnitNumber}-${currentEdition}`}
            vocabList={vocabList}
            unitNumber={currentUnitNumber}
            onPlayTTS={speak}
            speaking={speaking}
            currentSpeakingText={currentSpeakingText}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarViewer
            key={`grammar-unit-${currentUnitNumber}-${currentEdition}`}
            grammarList={grammarList}
            onPlayTTS={speak}
            speaking={speaking}
            currentSpeakingText={currentSpeakingText}
          />
        )}

        {activeTab === 'culture' && (
          <CultureViewer
            key={`culture-unit-${currentUnitNumber}`}
            unitNumber={currentUnitNumber}
            unitTopic={currentUnit.topic}
            unitSituation={currentUnit.situation}
            onPlayTTS={speak}
            speaking={speaking}
            currentSpeakingText={currentSpeakingText}
          />
        )}
      </div>

      {/* 7. Global Modals: Table of Contents & Global Search */}
      <TableOfContentsModal
        isOpen={isTOCModalOpen}
        onClose={() => setIsTOCModalOpen(false)}
        edition={currentEdition}
        onSelectUnit={handleSelectUnit}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        edition={currentEdition}
        onSelectResult={(unitNum, tab) => handleSelectUnit(unitNum, tab)}
      />
    </div>
  );
};

