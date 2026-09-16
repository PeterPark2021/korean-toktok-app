import React, { useState, useEffect, useRef, useMemo, useDeferredValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditionType, BookFilter, SearchCategory, SearchResultItem, TabTarget } from '../../types';
import { SearchService } from '../../services/searchService';
import { ALL_BOOKS } from '../../data';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  edition: EditionType;
  onSelectResult?: (unitNumber: number, tab?: TabTarget) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  edition,
  onSelectResult
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [selectedBook, setSelectedBook] = useState<BookFilter>('all');

  // Deferred query for buttery smooth 60fps input without rendering stutters
  const deferredQuery = useDeferredValue(query);

  // Focus input on open & clear query on close
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Instant Hangul-aware search with continuous prefix & choseong matching
  const results = useMemo(() => {
    const trimmed = deferredQuery.trim();
    if (!trimmed) return [];
    return SearchService.search(trimmed, edition, selectedBook, selectedCategory);
  }, [deferredQuery, edition, selectedBook, selectedCategory]);

  // Keyboard navigation / shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (item: SearchResultItem) => {
    const targetTab = item.tabTarget || 'dialogue';
    onClose();
    if (onSelectResult) {
      onSelectResult(item.unitNumber, targetTab);
    } else {
      navigate(`/?unit=${item.unitNumber}&tab=${targetTab}&edition=${edition}`);
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'grammar':
        return (
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
        );
      case 'vocab':
        return (
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </span>
        );
      case 'dialogue':
        return (
          <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 will-change-transform"
      style={{ isolation: 'isolate' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 max-h-[80vh] transform transition-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center gap-3">
          <svg className="w-6 h-6 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="주제, 문법(-는데, -아서/어서), 어휘, 회화문 검색... (예: 인사, 병원, 날씨)"
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg shrink-0 font-medium cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Categories Bar */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-slate-400 font-semibold shrink-0 mr-1">카테고리:</span>
            {(
              [
                { id: 'all', label: '전체' },
                { id: 'unit', label: '단원·주제' },
                { id: 'grammar', label: '문법' },
                { id: 'vocab', label: '어휘' },
                { id: 'dialogue', label: '회화문' }
              ] as { id: SearchCategory; label: string }[]
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Book Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto ml-auto">
            <span className="text-slate-400 font-semibold shrink-0">교재:</span>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value as BookFilter)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">전체 (45과)</option>
              {ALL_BOOKS.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.title.replace('한국어 톡톡 ', '')} ({b.unitRange[0]}~{b.unitRange[1]}과)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-[300px] max-h-[60vh]">
          {!deferredQuery.trim() ? (
            <div className="py-12 text-center text-slate-500 space-y-3">
              <svg className="w-12 h-12 mx-auto text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm">검색어를 입력하여 단원, 문법, 어휘, 회화문을 빠르게 찾아보세요.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-xs text-slate-400">추천 검색어:</span>
                {['안녕하세요', '-는데', '병원', '약속', '속담', '지구 온난화'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-cyan-400 border border-slate-700/60 cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <p className="text-base font-semibold text-slate-400">검색 결과가 없습니다.</p>
              <p className="text-xs">다른 검색어를 입력하거나 카테고리/교재 필터를 변경해 보세요.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs text-slate-400 px-2 py-1 flex items-center justify-between">
                <span>
                  검색 결과 <strong className="text-blue-400">{results.length}</strong>개
                </span>
                <span className="text-[11px] text-slate-400">클릭 시 해당 단원으로 즉시 이동</span>
              </div>

              {results.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => handleItemClick(item)}
                  className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-colors flex items-start gap-3 group shadow-sm"
                >
                  {getCategoryIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 font-medium truncate mb-1">
                      {item.subtitle}
                    </p>

                    {item.snippet && (
                      <p className="text-xs text-slate-400 line-clamp-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
                        {item.snippet}
                      </p>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 group-hover:text-blue-400 shrink-0 self-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              에디션: <strong className="text-slate-200">{edition === 'kbs' ? 'KBS 교재' : 'Wiz AI'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>단축키: <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Ctrl+K</kbd></span>
          </div>
        </div>
      </div>
    </div>
  );
};
