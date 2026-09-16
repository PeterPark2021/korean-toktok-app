import React, { useState } from 'react';
import { EditionType } from '../../types';
import { setActiveEdition } from '../../data';
import { BookOpen, Sparkles, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';

interface EditionSelectorProps {
  currentEdition: EditionType;
  onEditionChange: (edition: EditionType) => void;
  compact?: boolean;
}

export const EditionSelector: React.FC<EditionSelectorProps> = ({
  currentEdition,
  onEditionChange,
  compact = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = (ed: EditionType) => {
    setActiveEdition(ed);
    onEditionChange(ed);
  };

  return (
    <div className="w-full">
      {/* Compact Top Bar Pill Switch */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-1.5 pl-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            교재 모드
          </span>
          <div className="inline-flex p-1 bg-slate-950/70 border border-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => handleSelect('kbs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentEdition === 'kbs'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title="KBS 정규 교재 원문 데이터 (초급~고급)"
            >
              <BookOpen size={13} className={currentEdition === 'kbs' ? 'text-cyan-200' : 'text-slate-400'} />
              <span>KBS 공식 교재</span>
              {currentEdition === 'kbs' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300"></span>}
            </button>

            <button
              type="button"
              onClick={() => handleSelect('wiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentEdition === 'wiz'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm shadow-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title="Wiz AI 인터랙티브 보충 및 심화 데이터"
            >
              <Sparkles size={13} className={currentEdition === 'wiz' ? 'text-pink-200' : 'text-slate-400'} />
              <span>Wiz AI 강화</span>
              {currentEdition === 'wiz' && <span className="w-1.5 h-1.5 rounded-full bg-pink-300"></span>}
            </button>
          </div>
        </div>

        {/* Expandable Explanation Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <Info size={12} className="text-cyan-400" />
          <span>에디션 차이점</span>
          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Collapsible Details Drawer */}
      {isExpanded && (
        <div className="mt-2.5 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSelect('kbs')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect('kbs'); }}
            className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left relative ${
              currentEdition === 'kbs'
                ? 'bg-blue-950/40 border-blue-500/50 ring-1 ring-blue-500/30 shadow-sm'
                : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-blue-400" />
                <h4 className="font-bold text-slate-100 text-xs">한국어 톡톡 (KBS)</h4>
              </div>
              {currentEdition === 'kbs' && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
                  <Check size={10} strokeWidth={3} /> 현재 선택됨
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              KBS 정규 교재(초급A~고급A) 원문 대화문, 어휘 목록, 문법 체계 및 단원 구성을 충실히 반영한 공식 커리큘럼입니다.
            </p>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => handleSelect('wiz')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect('wiz'); }}
            className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left relative ${
              currentEdition === 'wiz'
                ? 'bg-purple-950/40 border-purple-500/50 ring-1 ring-purple-500/30 shadow-sm'
                : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-400" />
                <h4 className="font-bold text-slate-100 text-xs">한국어 톡톡 (Wiz)</h4>
              </div>
              {currentEdition === 'wiz' && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
                  <Check size={10} strokeWidth={3} /> 현재 선택됨
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              AI 심화 문법 해설, 단계별 인터랙티브 퀴즈(객관식/빈칸/문장배열), AI 실시간 질의응답 보조 기능을 강화한 디지털 모드입니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

