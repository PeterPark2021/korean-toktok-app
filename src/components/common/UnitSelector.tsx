import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Search, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { UnitItem, EditionType, BookCode, BookFilter } from '../../types';
import { getAllUnits, ALL_BOOKS, getBookForUnit } from '../../data';

interface UnitSelectorProps {
  currentUnitNumber: number;
  onSelectUnit: (unitNumber: number) => void;
  completedUnits?: Record<number, boolean>;
  edition?: EditionType;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  currentUnitNumber,
  onSelectUnit,
  completedUnits = {},
  edition = 'kbs'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookFilter, setSelectedBookFilter] = useState<BookFilter>('all');

  const units = useMemo(() => {
    return getAllUnits(edition);
  }, [edition]);

  const currentUnit = useMemo(() => {
    return units.find((u) => u.unit_number === currentUnitNumber) || units[0];
  }, [units, currentUnitNumber]);

  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const bookCode = getBookForUnit(unit.unit_number);
      const matchesBook = selectedBookFilter === 'all' || bookCode === selectedBookFilter;
      const matchesSearch =
        unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(unit.unit_number).includes(searchQuery);
      return matchesBook && matchesSearch;
    });
  }, [units, searchQuery, selectedBookFilter]);

  const maxUnitNumber = useMemo(() => {
    return Math.max(...units.map((u) => u.unit_number), 45);
  }, [units]);

  const handlePrev = () => {
    if (currentUnitNumber > 1) {
      onSelectUnit(currentUnitNumber - 1);
    }
  };

  const handleNext = () => {
    if (currentUnitNumber < maxUnitNumber) {
      onSelectUnit(currentUnitNumber + 1);
    }
  };

  const currentBookCode = getBookForUnit(currentUnit.unit_number);

  const getBookBadgeColor = (book: BookCode) => {
    switch (book) {
      case '초급a':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case '초급b':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case '중급a':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case '중급b':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case '고급a':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="relative">
      {/* Unit Selector Bar */}
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-sm border border-slate-200/80">
        {/* Prev Unit Button */}
        <button
          onClick={handlePrev}
          disabled={currentUnitNumber <= 1}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          title="이전 단원"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Main Unit Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold border ${getBookBadgeColor(
                currentBookCode
              )}`}
            >
              {currentUnit.level} · {currentBookCode}
            </span>
            <div className="min-w-0">
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>Unit {currentUnit.unit_number}</span>
                <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded font-semibold">
                  {edition === 'kbs' ? 'KBS 원문' : 'Wiz AI'}
                </span>
              </div>
              <div className="font-bold text-slate-900 text-sm md:text-base truncate group-hover:text-blue-600 transition-colors">
                {currentUnit.title}
              </div>
            </div>
          </div>
          <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-600 transition-transform group-hover:translate-y-0.5" />
        </button>

        {/* Next Unit Button */}
        <button
          onClick={handleNext}
          disabled={currentUnitNumber >= maxUnitNumber}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          title="다음 단원"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Unit Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">단원 선택 (Curriculum)</h2>
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded-full">
                        {edition === 'kbs' ? 'KBS 공식 교재' : 'Wiz AI 에디션'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      총 5권 45개 단원 중 원하는 주제와 레벨을 선택하세요.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Search & Book Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="단원명, 주제, 번호 검색 (예: 12, 인사, 병원, 쇼핑...)"
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedBookFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                      selectedBookFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    전체 교재
                  </button>
                  {ALL_BOOKS.map((b) => (
                    <button
                      key={b.code}
                      type="button"
                      onClick={() => setSelectedBookFilter(b.code)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                        selectedBookFilter === b.code
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {b.title.replace('한국어 톡톡 ', '')} ({b.unitRange[0]}~{b.unitRange[1]}과)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Units List */}
            <div className="p-4 overflow-y-auto divide-y divide-slate-100">
              {filteredUnits.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  검색 결과와 일치하는 단원이 없습니다.
                </div>
              ) : (
                filteredUnits.map((unit, idx) => {
                  const isCurrent = unit.unit_number === currentUnitNumber;
                  const isDone = !!completedUnits[unit.unit_number];
                  const bookCode = getBookForUnit(unit.unit_number);

                  return (
                    <button
                      key={`${unit.level}-${unit.unit_number}-${idx}`}
                      onClick={() => {
                        onSelectUnit(unit.unit_number);
                        setIsOpen(false);
                      }}
                      className={`w-full p-3.5 rounded-2xl flex items-start justify-between gap-3 text-left transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-50/80 border border-blue-200 shadow-sm'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className={`mt-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold border shrink-0 ${getBookBadgeColor(
                            bookCode
                          )}`}
                        >
                          {unit.level} · {bookCode}
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <span className="text-blue-600">Unit {unit.unit_number}.</span>
                            <span>{unit.title}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-normal">
                                현재 학습 중
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-indigo-600 font-medium mt-0.5">
                            주제: {unit.topic}
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {unit.situation}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center pt-1">
                        {isDone ? (
                          <CheckCircle2 size={18} className="text-emerald-500" />
                        ) : isCurrent ? (
                          <Sparkles size={18} className="text-blue-500" />
                        ) : null}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
