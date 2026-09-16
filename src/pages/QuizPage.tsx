import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { UnitSelector } from '../components/common/UnitSelector';
import { BookFilterBar } from '../components/common/BookFilterBar';
import { TableOfContentsModal } from '../components/common/TableOfContentsModal';
import { GlobalSearchModal } from '../components/common/GlobalSearchModal';
import { EditionSelector } from '../components/common/EditionSelector';
import { QuizEngine } from '../components/quiz/QuizEngine';
import {
  getQuizForUnit,
  getUnitDetails,
  getAllUnits,
  getActiveEdition,
  setActiveEdition,
  getBookForUnit,
  BOOKS_METADATA
} from '../data';
import { useProgress, getUnitKey } from '../hooks/useProgress';
import { HelpCircle, ArrowLeft, Sparkles, BookOpen, ListFilter, Search, Trophy, CheckCircle2 } from 'lucide-react';
import { EditionType, BookFilter, BookCode } from '../types';

export const QuizPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Edition: single-source-of-truth from searchParams
  const editionParam = (searchParams.get('edition') as EditionType) || getActiveEdition();
  const currentEdition: EditionType = editionParam === 'kbs' || editionParam === 'wiz' ? editionParam : 'kbs';

  // Unit Number: single-source-of-truth from searchParams
  const unitParam = parseInt(searchParams.get('unit') || '1', 10);
  const currentUnitNumber = isNaN(unitParam) ? 1 : Math.max(1, Math.min(45, unitParam));

  const [selectedBookFilter, setSelectedBookFilter] = useState<BookFilter>('all');
  const [isTOCModalOpen, setIsTOCModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { quizScores, getUnitQuizScore } = useProgress();

  useEffect(() => {
    setActiveEdition(currentEdition);
  }, [currentEdition]);

  const currentUnit = useMemo(() => {
    return getUnitDetails(currentUnitNumber, currentEdition);
  }, [currentUnitNumber, currentEdition]);

  const quizList = useMemo(() => getQuizForUnit(currentUnitNumber, currentEdition), [currentUnitNumber, currentEdition]);
  const currentBookCode = getBookForUnit(currentUnitNumber);
  const currentBookMeta = BOOKS_METADATA[currentBookCode];
  const unitScore = getUnitQuizScore(currentUnitNumber, currentEdition);

  const handleSelectUnit = (num: number, targetTab?: string) => {
    if (targetTab && targetTab !== 'quiz') {
      navigate(`/?unit=${num}&tab=${targetTab}&edition=${currentEdition}`);
    } else {
      setSearchParams({ unit: num.toString(), edition: currentEdition }, { replace: true });
    }
  };

  const handleEditionChange = (newEdition: EditionType) => {
    setActiveEdition(newEdition);
    setSearchParams({ unit: currentUnitNumber.toString(), edition: newEdition }, { replace: true });
  };

  const handleBookFilterChange = (book: BookFilter) => {
    setSelectedBookFilter(book);
    if (book !== 'all') {
      const meta = BOOKS_METADATA[book as BookCode];
      if (currentUnitNumber < meta.unitRange[0] || currentUnitNumber > meta.unitRange[1]) {
        handleSelectUnit(meta.unitRange[0]);
      }
    }
  };

  const handleGoToStudy = () => {
    navigate(`/?unit=${currentUnitNumber}&edition=${currentEdition}`);
  };

  const completedMap = useMemo(() => {
    const map: Record<number, boolean> = {};
    const units = getAllUnits(currentEdition);
    units.forEach((u) => {
      const key = getUnitKey(u.unit_number, currentEdition);
      const score = quizScores[key];
      map[u.unit_number] = !!(score && score.attempts > 0);
    });
    return map;
  }, [quizScores, currentEdition]);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Edition Selector Card */}
      <EditionSelector
        currentEdition={currentEdition}
        onEditionChange={handleEditionChange}
      />

      {/* 2. Textbook Filter Bar */}
      <BookFilterBar
        selectedBook={selectedBookFilter}
        onSelectBook={handleBookFilterChange}
        onOpenTOC={() => setIsTOCModalOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* 3. Quiz Hero Info Card */}
      <div
        className={`p-6 rounded-3xl text-white shadow-xl relative overflow-hidden border ${
          currentEdition === 'kbs'
            ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border-blue-800/60'
            : 'bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-purple-800/60'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-black border ${
                  currentEdition === 'kbs'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                }`}
              >
                {currentEdition === 'kbs' ? 'KBS 공식 교재 평가 퀴즈' : 'Wiz AI 인터랙티브 퀴즈'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-white/10 text-slate-300">
                {currentBookMeta.title} · {currentUnit.level}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-white">
              Unit {currentUnit.unit_number}. {currentUnit.title}
            </h1>
            <p className="text-xs text-slate-300">
              {currentEdition === 'kbs'
                ? 'KBS 정규 교재에 수록된 연습문제와 본문 대화문을 바탕으로 구성된 실전 평가입니다.'
                : 'AI 기반 객관식, 빈칸 채우기, 문장 재배열 3단계 인터랙티브 퀴즈와 심화 해설을 제공합니다.'}
            </p>
          </div>

          {/* Previous Score Badge */}
          <div className="flex items-center gap-3 p-3 bg-black/40 rounded-2xl border border-white/10 shrink-0 text-xs">
            <Trophy size={20} className={currentEdition === 'kbs' ? 'text-blue-400' : 'text-purple-400'} />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">이전 최고 기록 ({currentEdition.toUpperCase()})</div>
              <div className="text-sm font-black text-slate-100">
                {unitScore.attempts > 0 ? (
                  <span>
                    <strong className="text-emerald-400">{unitScore.bestScore}</strong> / {unitScore.totalQuestions}점 ({unitScore.attempts}회 응시)
                  </span>
                ) : (
                  <span className="text-slate-400 font-normal">아직 응시하지 않음</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Top Controls: Unit Selector & Return to Study */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 max-w-xl">
          <UnitSelector
            currentUnitNumber={currentUnitNumber}
            onSelectUnit={(num) => handleSelectUnit(num)}
            completedUnits={completedMap}
            edition={currentEdition}
          />
        </div>

        <button
          onClick={handleGoToStudy}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>단원 회화·어휘 학습으로 이동</span>
        </button>
      </div>

      {/* 5. Main Quiz Engine */}
      <QuizEngine
        key={`quiz-unit-${currentUnitNumber}-${currentEdition}-${quizList[0]?.quiz_id}-${quizList[4]?.question}`}
        quizList={quizList}
        unitNumber={currentUnitNumber}
        onGoToStudy={handleGoToStudy}
        edition={currentEdition}
      />

      {/* 6. Modals */}
      <TableOfContentsModal
        isOpen={isTOCModalOpen}
        onClose={() => setIsTOCModalOpen(false)}
        edition={currentEdition}
        onSelectUnit={(num, tab) => handleSelectUnit(num, tab)}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        edition={currentEdition}
        onSelectResult={(num, tab) => handleSelectUnit(num, tab)}
      />
    </div>
  );
};
