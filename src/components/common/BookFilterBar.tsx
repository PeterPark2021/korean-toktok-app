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
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xs">
      {/* 1. Textbook Level Filter Tabs (High Contrast WCAG AA) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
        <button
          type="button"
          onClick={() => onSelectBook('all')}
          className={`px-3 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            selectedBook === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
          }`}
        >
          <span>전체 교재</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            selectedBook === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
          }`}>
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
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span>{book.title.replace('한국어 톡톡 ', '')}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {book.unitRange[0]}~{book.unitRange[1]}과
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Navigation & Search Tools (Distinct Group) */}
      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-slate-100 w-full md:w-auto justify-end">
        {onOpenTOC && (
          <button
            type="button"
            onClick={onOpenTOC}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 transition-all shadow-2xs cursor-pointer group"
            title="교재별 전체 목차 및 커리큘럼 보기"
          >
            <svg className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>교재 목차 (TOC)</span>
          </button>
        )}

        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-blue-700 transition-all shadow-2xs cursor-pointer"
            title="주제, 문법, 어휘, 회화 통합 검색 (단축키: Ctrl+K)"
          >
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>검색</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-500 font-bold">
              Ctrl+K
            </kbd>
          </button>
        )}
      </div>
    </div>
  );
};
