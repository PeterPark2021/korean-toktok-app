import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  SEVEN_REPRESENTATIVE_BATCHIM,
  COMPOUND_BATCHIM_RULES,
  BATCHIM_PRACTICE_SENTENCES,
  BatchimRule
} from '../../data/hangul';
import { useTTS } from '../../hooks/useTTS';

export const BatchimRulesExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seven' | 'compound' | 'sentences'>('seven');
  const [selectedRule, setSelectedRule] = useState<BatchimRule>(SEVEN_REPRESENTATIVE_BATCHIM[0]);
  const [compoundCategory, setCompoundCategory] = useState<'all' | 'first_sound' | 'second_sound' | 'conditional'>('all');
  const { speak } = useTTS();

  const filteredCompoundRules =
    compoundCategory === 'all'
      ? COMPOUND_BATCHIM_RULES
      : COMPOUND_BATCHIM_RULES.filter((r) => r.category === compoundCategory);

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('seven')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'seven'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7대 대표음 체계
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compound')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'compound'
                ? 'bg-white text-purple-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            11개 겹받침 발음 공식
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sentences')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'sentences'
                ? 'bg-white text-emerald-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            겹받침 실전문장 10선
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          한국어 받침(종성)은 27종류가 있지만, 실제 발음은 단 7개의 대표음으로 소리납니다.
        </div>
      </div>

      {activeTab === 'seven' && (
        /* 1. 7 Representative Sounds */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Cards Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SEVEN_REPRESENTATIVE_BATCHIM.map((rule) => {
              const isSelected = selectedRule.representativeSound === rule.representativeSound;
              return (
                <button
                  key={rule.representativeSound}
                  type="button"
                  onClick={() => setSelectedRule(rule)}
                  className={`p-5 rounded-3xl border text-left transition-all duration-200 relative group cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-[1.02]'
                      : 'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-800 hover:border-blue-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-serif">
                      {rule.representativeSound}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      대표음 [{rule.romanization}]
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-bold opacity-80">해당 받침 자음들:</div>
                    <div className="flex flex-wrap gap-1">
                      {rule.consonants.map((c) => (
                        <span
                          key={c}
                          className={`w-6 h-6 rounded-lg font-black text-xs font-serif flex items-center justify-center ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] leading-snug opacity-90 line-clamp-2">
                    {rule.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Pane (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    대표음 {selectedRule.representativeSound}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    해당 종성: {selectedRule.consonants.join(', ')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => speak(selectedRule.exampleWords[0]?.word || selectedRule.representativeSound)}
                  className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 cursor-pointer font-bold text-xs flex items-center gap-1.5"
                >
                  <Volume2 size={16} />
                  <span>소리 듣기</span>
                </button>
              </div>

              {/* Description Box */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 leading-relaxed space-y-1.5">
                <div className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-blue-600" />
                  <span>발음 조음 방식</span>
                </div>
                <p>{selectedRule.description}</p>
              </div>

              {/* Example Words */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>수록 예시 단어 & 실제 발음:</span>
                  <span className="text-[10px] text-slate-400">클릭하여 발음 듣기</span>
                </div>

                <div className="space-y-2">
                  {selectedRule.exampleWords.map((ex, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => speak(ex.word)}
                      className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600">
                          {ex.word}
                        </span>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md">
                          발음: {ex.actualPronunciation}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{ex.meaning}</span>
                        <Volume2 size={14} className="text-slate-300 group-hover:text-blue-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compound' && (
        /* 2. 11 Compound Batchims */
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className="text-slate-700 mr-1">규칙 분류:</span>
              <button
                type="button"
                onClick={() => setCompoundCategory('all')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  compoundCategory === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                전체 (11개)
              </button>
              <button
                type="button"
                onClick={() => setCompoundCategory('first_sound')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  compoundCategory === 'first_sound'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                앞 자음 발음 (7)
              </button>
              <button
                type="button"
                onClick={() => setCompoundCategory('second_sound')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  compoundCategory === 'second_sound'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                뒷 자음 발음 (2)
              </button>
              <button
                type="button"
                onClick={() => setCompoundCategory('conditional')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  compoundCategory === 'conditional'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                조건부 불규칙 (2: ㄺ, ㄼ)
              </button>
            </div>
          </div>

          {/* Compound Batchim Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompoundRules.map((rule) => (
              <div
                key={rule.batchim}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-800 font-black text-2xl font-serif flex items-center justify-center">
                      {rule.batchim}
                    </span>
                    <div>
                      <div className="text-sm font-black text-slate-900">
                        소리: <span className="text-purple-600">{rule.pronouncedAs}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {rule.category === 'first_sound'
                          ? '#앞글자로 발음'
                          : rule.category === 'second_sound'
                          ? '#뒷글자로 발음'
                          : '#조건부/불규칙'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => speak(rule.exampleWords[0]?.word || rule.batchim)}
                    className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 cursor-pointer transition-transform hover:scale-105"
                    title="대표 단어 발음 듣기"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {rule.ruleDescription}
                </p>

                {/* Example Words */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400">대표 단어:</div>
                  <div className="flex flex-wrap gap-2">
                    {rule.exampleWords.map((ex, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => speak(ex.word)}
                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-xs font-bold text-slate-800 hover:text-purple-700 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{ex.word}</span>
                        <span className="text-[10px] text-purple-600">{ex.actualPronunciation}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sentences' && (
        /* 3. Textbook Sentences */
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white shadow-md space-y-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Sparkles size={20} className="text-emerald-400" />
              <span>교재 예비편 수록 겹받침 실전문장 10선 (듣고 따라하기)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              문장 속에서 겹받침이 연음되거나 대표음으로 바뀌는 실제 소리를 원어민 발음으로 듣고 따라 연습해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {BATCHIM_PRACTICE_SENTENCES.map((sent) => (
              <div
                key={sent.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center shrink-0">
                        {sent.id}
                      </span>
                      <h4 className="text-base font-black text-slate-900">
                        {sent.korean}
                      </h4>
                    </div>
                    <div className="text-xs font-bold text-emerald-700 pl-7">
                      실제 발음: {sent.pronunciation}
                    </div>
                    <p className="text-xs text-slate-500 pl-7">
                      {sent.translation}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => speak(sent.korean)}
                    className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
                    title="문장 듣기"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>핵심 겹받침: <strong className="text-slate-700">{sent.targetBatchim}</strong></span>
                  <span className="text-emerald-600 font-bold">따라 말해보세요 🗣️</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
