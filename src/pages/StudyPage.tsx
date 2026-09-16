import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MessageSquare, BookOpen, FileText, CheckCircle2, HelpCircle, Sparkles, Search, ListFilter, Landmark } from 'lucide-react';
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
  const { progress, markUnitStudied, getUnitProgress } = useProgress();

  // Sync active edition globally when URL changes
  useEffect(() => {
    setActiveEdition(currentEdition);
  }, [currentEdition]);

  // Data Getters for active unit and edition
  const currentUnit = useMemo(() => {
    return getUnitDetails(currentUnitNumber, currentEdition);
  }, [currentUnitNumber, currentEdition]);

  const dialogues = useMemo(() => getUnitDialogues(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);
  const vocabList = useMemo(() => getUnitVocab(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);
  const grammarList = useMemo(() => getUnitGrammar(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);

  const unitProgress = getUnitProgress(currentUnitNumber, currentEdition);
  const isCompleted = unitProgress.studied;

  const currentBookCode = getBookForUnit(currentUnitNumber);
  const currentBookMeta = BOOKS_METADATA[currentBookCode];

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

  const completedMap = useMemo(() => {
    const map: Record<number, boolean> = {};
    const units = getAllUnits(currentEdition);
    units.forEach((u) => {
      const key = getUnitKey(u.unit_number, currentEdition);
      map[u.unit_number] = !!progress[key]?.studied;
    });
    return map;
  }, [progress, currentEdition]);

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
      {/* 1. Top Section: Edition Selection Card */}
      <EditionSelector
        currentEdition={currentEdition}
        onEditionChange={handleEditionChange}
      />

      {/* 2. Textbook Book Filter & Quick Navigation Bar */}
      <BookFilterBar
        selectedBook={selectedBookFilter}
        onSelectBook={handleBookFilterChange}
        onOpenTOC={() => setIsTOCModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* 3. Hero Header with Current Textbook & Unit Info */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 text-white/5 font-black text-9xl select-none pointer-events-none">
          {currentUnitNumber}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {currentBookMeta.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-slate-300">
                {currentUnit.level} 레벨
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentEdition === 'kbs' ? 'KBS 교재 원문' : 'Wiz AI 강화'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Unit {currentUnit.unit_number}.</span>
              <span>{currentUnit.title}</span>
            </h1>

            <p className="text-sm text-cyan-300 font-semibold flex items-center gap-1.5">
              <span>주제: {currentUnit.topic}</span>
            </p>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {currentUnit.situation}
            </p>
          </div>

          {/* Action Buttons: Mark Completed & Jump to Quiz */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30'
                  : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white'
              }`}
            >
              <CheckCircle2 size={16} className={isCompleted ? 'text-emerald-400' : 'text-slate-400'} />
              <span>{isCompleted ? '학습 완료됨' : '학습 완료 체크'}</span>
            </button>

            <button
              onClick={handleGoToQuiz}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
            >
              <HelpCircle size={16} />
              <span>단원 퀴즈 풀기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Unit Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl">
          <UnitSelector
            currentUnitNumber={currentUnitNumber}
            onSelectUnit={(num) => handleSelectUnit(num, activeTab)}
            completedUnits={completedMap}
            edition={currentEdition}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsTOCModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-xs"
          >
            <ListFilter size={15} className="text-blue-600" />
            <span>전체 목차</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-xs"
          >
            <Search size={15} className="text-blue-600" />
            <span>단원·문법 검색</span>
          </button>
        </div>
      </div>

      {/* 5. Study Sub-Tabs (회화문 / 어휘 / 문법) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
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
                  : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
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
