import React from 'react';
import { BookFilter, BookCode } from '../../types';
import { ALL_BOOKS } from '../../data';

interface BookFilterBarProps {
  selectedBook: BookFilter;
  onSelectBook: (book: BookFilter) => void;
  onOpenTOC?: () => void;
  onOpenSearch?: () => void;
}

export const BookFilterBar: React.FC<BookFilterBarProps> = ({
  selectedBook,
  onSelectBook,
  onOpenTOC,
  onOpenSearch
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 py-2.5 px-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md">
      {/* Textbook Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => onSelectBook('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
            selectedBook === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-400/40'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>전체 교재</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/80 text-slate-300">
            45과
          </span>
        </button>

        {ALL_BOOKS.map((book) => {
          const isSelected = selectedBook === book.code;
          return (
            <button
              key={book.code}
              type="button"
              onClick={() => onSelectBook(book.code as BookCode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-100 text-slate-900 shadow-md shadow-white/10 ring-2 ring-white/50 font-bold'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/40'
              }`}
            >
              <span>{book.title.replace('한국어 톡톡 ', '')}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {book.unitRange[0]}~{book.unitRange[1]}과
              </span>
            </button>
          );
        })}
      </div>

      {/* Action Buttons: TOC & Search */}
      <div className="flex items-center gap-2 ml-auto">
        {onOpenTOC && (
          <button
            type="button"
            onClick={onOpenTOC}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/70 hover:border-slate-600 rounded-xl text-xs font-semibold text-slate-200 transition-all shadow-sm group"
            title="교재별 전체 목차 및 커리큘럼 보기"
          >
            <svg className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>교재 목차 (TOC)</span>
          </button>
        )}

        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 hover:border-blue-500/60 rounded-xl text-xs font-semibold text-blue-300 transition-all shadow-sm"
            title="주제, 문법, 어휘, 회화 통합 검색 (단축키: Ctrl+K)"
          >
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>검색</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">
              Ctrl+K
            </kbd>
          </button>
        )}
      </div>
    </div>
  );
};
