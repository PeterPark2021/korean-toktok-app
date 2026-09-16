import React from 'react';
import { EditionType } from '../../types';
import { getActiveEdition, setActiveEdition } from '../../data';

interface EditionSelectorProps {
  currentEdition: EditionType;
  onEditionChange: (edition: EditionType) => void;
  compact?: boolean;
}

export const EditionSelector: React.FC<EditionSelectorProps> = ({
  currentEdition,
  onEditionChange,
  compact = false
}) => {
  const handleSelect = (ed: EditionType) => {
    setActiveEdition(ed);
    onEditionChange(ed);
  };

  if (compact) {
    return (
      <div className="inline-flex items-center p-1 bg-slate-800/80 border border-slate-700/60 rounded-xl shadow-inner backdrop-blur-sm">
        <button
          type="button"
          onClick={() => handleSelect('kbs')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            currentEdition === 'kbs'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
          }`}
          title="KBS 한국어 톡톡 정규 교재 원문 데이터"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>한국어 톡톡 (KBS)</span>
        </button>
        <button
          type="button"
          onClick={() => handleSelect('wiz')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
            currentEdition === 'wiz'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/40'
          }`}
          title="Wiz AI 인터랙티브 보충 및 심화 데이터"
        >
          <span className="w-2 h-2 rounded-full bg-pink-400"></span>
          <span>한국어 톡톡 (Wiz)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            교재 에디션 선택
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            학습 목적에 맞춰 교재 원문 모드와 AI 인터랙티브 모드를 전환할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* KBS Edition Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleSelect('kbs')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect('kbs'); }}
          className={`cursor-pointer p-4 rounded-xl border transition-all text-left relative overflow-hidden ${
            currentEdition === 'kbs'
              ? 'bg-gradient-to-br from-blue-950/60 to-indigo-950/40 border-blue-500/60 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10'
              : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70'
          }`}
        >
          {currentEdition === 'kbs' && (
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              현재 선택됨
            </div>
          )}
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </span>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">한국어 톡톡 (KBS)</h4>
              <span className="text-[11px] text-blue-300 font-medium">공식 교재 원문 기반</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            KBS 정규 교재(초급A~고급A) 원문 대화문, 어휘 목록, 문법 체계 및 단원 구성을 충실히 반영한 공식 커리큘럼입니다.
          </p>
        </div>

        {/* Wiz Edition Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleSelect('wiz')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect('wiz'); }}
          className={`cursor-pointer p-4 rounded-xl border transition-all text-left relative overflow-hidden ${
            currentEdition === 'wiz'
              ? 'bg-gradient-to-br from-purple-950/60 to-pink-950/40 border-purple-500/60 ring-2 ring-purple-500/20 shadow-lg shadow-purple-500/10'
              : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70'
          }`}
        >
          {currentEdition === 'wiz' && (
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              현재 선택됨
            </div>
          )}
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <div>
              <h4 className="font-bold text-slate-100 text-sm">한국어 톡톡 (Wiz)</h4>
              <span className="text-[11px] text-purple-300 font-medium">AI 인터랙티브 강화</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            AI 심화 문법 해설, 단계별 인터랙티브 퀴즈(객관식/빈칸/문장배열), AI 질의응답 보조 기능을 강화한 디지털 모드입니다.
          </p>
        </div>
      </div>
    </div>
  );
};
