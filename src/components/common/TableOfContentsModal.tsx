import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditionType, BookCode, TabTarget } from '../../types';
import { SearchService } from '../../services/searchService';
import { ALL_BOOKS } from '../../data';

interface TableOfContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  edition: EditionType;
  onSelectUnit?: (unitNumber: number, tab?: TabTarget | 'shadowing') => void;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  isOpen,
  onClose,
  edition,
  onSelectUnit
}) => {
  const navigate = useNavigate();
  const [selectedBookCode, setSelectedBookCode] = useState<BookCode | 'all'>('all');
  const curriculum = SearchService.getCurriculumOverview(edition);

  if (!isOpen) return null;

  const filteredCurriculum =
    selectedBookCode === 'all'
      ? curriculum
      : curriculum.filter((c) => c.book.code === selectedBookCode);

  const handleGoStudy = (unitNum: number, tab: TabTarget = 'dialogue') => {
    onClose();
    if (onSelectUnit) {
      onSelectUnit(unitNum, tab);
    } else {
      navigate(`/?unit=${unitNum}&tab=${tab}&edition=${edition}`);
    }
  };

  const handleGoQuiz = (unitNum: number) => {
    onClose();
    navigate(`/quiz?unit=${unitNum}&edition=${edition}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  교재별 전체 목차 (Table of Contents)
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {edition === 'kbs' ? 'KBS 공식 교재' : 'Wiz AI 에디션'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                한국어 톡톡 전 5권(총 45개 단원)의 커리큘럼, 주제, 핵심 문법 및 어휘 구성을 한눈에 확인하세요.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Book Filter Pills */}
        <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/80 border-b border-slate-800 overflow-x-auto">
          <span className="text-xs font-semibold text-slate-400 shrink-0">교재 필터:</span>
          <button
            type="button"
            onClick={() => setSelectedBookCode('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedBookCode === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            전체 (45과)
          </button>
          {ALL_BOOKS.map((b) => (
            <button
              key={b.code}
              type="button"
              onClick={() => setSelectedBookCode(b.code)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedBookCode === b.code
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {b.title.replace('한국어 톡톡 ', '')} ({b.unitCount}과)
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 divide-y divide-slate-800/80">
          {filteredCurriculum.map(({ book, lessons, totalVocab, totalGrammar, totalDialogues }) => (
            <div key={book.code} className="pt-6 first:pt-0">
              {/* Book Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900 border border-slate-700/60 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {book.level}
                    </span>
                    <h3 className="text-base font-bold text-white">{book.title}</h3>
                    <span className="text-xs text-slate-400">
                      ({book.unitRange[0]}과 ~ {book.unitRange[1]}과)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{book.description}</p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-700 text-slate-300">
                    <span className="text-cyan-400 font-bold">{lessons.length}</span> 단원
                  </div>
                  <div className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-700 text-slate-300">
                    <span className="text-indigo-400 font-bold">{totalGrammar}</span> 문법
                  </div>
                  <div className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-700 text-slate-300">
                    <span className="text-emerald-400 font-bold">{totalVocab}</span> 어휘
                  </div>
                </div>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.unitNumber}
                    className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                            {lesson.unitNumber}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                              {lesson.mainTitle}
                            </h4>
                            <span className="text-xs text-cyan-400 font-medium">
                              주제: {lesson.topics}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-2.5 leading-relaxed">
                        {lesson.situations}
                      </p>

                      {/* Grammar Points Tags */}
                      {lesson.grammarPoints.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {lesson.grammarPoints.map((gp, i) => (
                            <span
                              key={i}
                              onClick={() => handleGoStudy(lesson.unitNumber, 'grammar')}
                              className="cursor-pointer text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors"
                              title="클릭하여 문법 학습으로 이동"
                            >
                              {gp}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-2 text-xs">
                      <span className="text-[11px] text-slate-400">
                        어휘 <strong className="text-slate-200">{lesson.vocabCount}개</strong>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleGoStudy(lesson.unitNumber, 'dialogue')}
                          className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all font-semibold"
                        >
                          학습하기
                        </button>
                        <button
                          type="button"
                          onClick={() => handleGoQuiz(lesson.unitNumber)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all font-semibold"
                        >
                          퀴즈
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <span>선택한 단원을 클릭하면 해당 학습 화면으로 즉시 이동합니다.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
