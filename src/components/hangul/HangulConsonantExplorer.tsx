import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, Zap } from 'lucide-react';
import {
  BASIC_CONSONANTS,
  TENSE_CONSONANTS,
  ALL_CONSONANTS,
  CONTRAST_GROUPS,
  ConsonantData
} from '../../data/hangul';
import { useTTS } from '../../hooks/useTTS';

export const HangulConsonantExplorer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'contrast'>('grid');
  const [filterType, setFilterType] = useState<'all' | 'basic' | 'tense'>('all');
  const [selectedConsonant, setSelectedConsonant] = useState<ConsonantData>(BASIC_CONSONANTS[0]);
  const { speak, speaking } = useTTS();

  const displayedConsonants =
    filterType === 'all'
      ? ALL_CONSONANTS
      : filterType === 'basic'
      ? BASIC_CONSONANTS
      : TENSE_CONSONANTS;

  const handlePlaySound = (char: string, name: string) => {
    // Speak combining with vowel 'ㅏ' for clear consonant hearing (e.g. 가, 나, 다)
    const combinedSound = `${char}아`;
    speak(`${name}. ${combinedSound}`);
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            자음 목록 (19개)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('contrast')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'contrast'
                ? 'bg-white text-purple-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap size={14} className="text-amber-500 fill-amber-500" />
            <span>3분 대립 발음 비교 (예사/된/거센소리)</span>
          </button>
        </div>

        {viewMode === 'grid' && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              전체 (19)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('basic')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filterType === 'basic' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              기본 자음 (14)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('tense')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filterType === 'tense' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              쌍자음 (5)
            </button>
          </div>
        )}
      </div>

      {viewMode === 'grid' ? (
        /* Grid Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Consonant Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {displayedConsonants.map((consonant) => {
              const isSelected = selectedConsonant.char === consonant.char;
              return (
                <button
                  key={consonant.char}
                  type="button"
                  onClick={() => setSelectedConsonant(consonant)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group cursor-pointer flex flex-col items-center justify-between min-h-[115px] ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.03]'
                      : 'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-800 hover:border-blue-300'
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-[11px] font-bold opacity-80">
                    <span>[{consonant.romanization}]</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-md ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : consonant.soundType === 'tense'
                          ? 'bg-purple-100 text-purple-700'
                          : consonant.soundType === 'aspirated'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {consonant.soundType === 'tense'
                        ? '된소리'
                        : consonant.soundType === 'aspirated'
                        ? '거센소리'
                        : '예사소리'}
                    </span>
                  </div>

                  <div className="text-4xl font-black my-1 font-serif">
                    {consonant.char}
                  </div>

                  <div className="w-full flex items-center justify-between text-[11px] font-medium">
                    <span className={isSelected ? 'text-blue-100' : 'text-slate-500'}>
                      {consonant.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySound(consonant.char, consonant.name);
                      }}
                      className={`p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                      }`}
                      title="발음 듣기"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Consonant Detail Pane */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-slate-50/80 to-blue-50/40 border border-slate-200 shadow-sm space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center text-4xl font-black shadow-md shadow-blue-500/20 font-serif">
                    {selectedConsonant.char}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-slate-900">
                        {selectedConsonant.name} [{selectedConsonant.char}]
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          selectedConsonant.soundType === 'tense'
                            ? 'bg-purple-100 text-purple-800'
                            : selectedConsonant.soundType === 'aspirated'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {selectedConsonant.soundType === 'tense'
                          ? '된소리 (Tense)'
                          : selectedConsonant.soundType === 'aspirated'
                          ? '거센소리 (Aspirated)'
                          : '예사소리 (Plain)'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      로마자 표기: <span className="text-blue-600 font-black">[{selectedConsonant.romanization}]</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePlaySound(selectedConsonant.char, selectedConsonant.name)}
                  className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer font-bold text-xs"
                >
                  <Volume2 size={18} className={speaking ? 'animate-bounce' : ''} />
                  <span>발음 듣기</span>
                </button>
              </div>

              {/* Articulation & Sound Guide */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-indigo-950">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={15} className="text-indigo-600" />
                    <span>조음 위치 & 발음 원리</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-200/70 text-indigo-900 text-[10px] font-bold">
                    {selectedConsonant.articulationPosition}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedConsonant.pronunciationTip}
                </p>
              </div>

              {/* Stroke Order */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Layers size={15} className="text-slate-500" />
                  <span>쓰는 순서 (획순)</span>
                </div>
                <div className="space-y-1.5">
                  {selectedConsonant.strokes.map((stroke, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-medium"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{stroke}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Words with Audio */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={15} className="text-slate-500" />
                    <span>수록 단어 익히기</span>
                  </span>
                  <span className="text-[10px] text-slate-400">클릭하여 발음 듣기</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedConsonant.exampleWords.map((ex, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => speak(ex.word)}
                      className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <div>
                        <div className="font-extrabold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {ex.word}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          [{ex.romanization}] • {ex.meaning}
                        </div>
                      </div>
                      <Volume2
                        size={15}
                        className="text-slate-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all shrink-0"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3-Way Phonation Contrast View */
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white shadow-md space-y-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Zap size={20} className="text-amber-400 fill-amber-400" />
              <span>한국어의 자음 3분 대립 체계 (Phonation Contrast)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              한국어는 유성음/무성음 구분 대신 **예사소리(평음, Plain)**, **된소리(경음, Tense)**, **거센소리(격음, Aspirated)**의 3가지 숨의 세기와 목의 긴장도로 단어의 의미를 구별합니다. 각 카드를 눌러 발음 차이를 직접 비교해 보세요!
            </p>
          </div>

          <div className="space-y-4">
            {CONTRAST_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-black text-slate-900 text-base">
                    {group.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const plainWord = group.plain.word;
                      const tenseWord = group.tense.word;
                      const aspWord = group.aspirated ? group.aspirated.word : '';
                      speak(`${plainWord}, ${tenseWord}${aspWord ? `, ${aspWord}` : ''}`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-purple-200"
                  >
                    <Volume2 size={14} />
                    <span>연속 듣기</span>
                  </button>
                </div>

                <div className={`grid grid-cols-1 ${group.aspirated ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                  {/* Plain Sound Card */}
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-800">예사소리 (Plain)</span>
                      <span className="text-2xl font-serif font-black text-blue-600">
                        {group.plain.char}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{group.plain.desc}</p>
                    <button
                      type="button"
                      onClick={() => speak(`${group.plain.word}`)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-slate-800 border border-blue-200 font-bold text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <span>예시: <strong className="text-blue-600 group-hover:text-white">{group.plain.word}</strong></span>
                      <Volume2 size={15} className="text-blue-500 group-hover:text-white" />
                    </button>
                  </div>

                  {/* Tense Sound Card */}
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-800">된소리 (Tense)</span>
                      <span className="text-2xl font-serif font-black text-purple-600">
                        {group.tense.char}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{group.tense.desc}</p>
                    <button
                      type="button"
                      onClick={() => speak(`${group.tense.word}`)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-purple-600 hover:text-white text-slate-800 border border-purple-200 font-bold text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                    >
                      <span>예시: <strong className="text-purple-600 group-hover:text-white">{group.tense.word}</strong></span>
                      <Volume2 size={15} className="text-purple-500 group-hover:text-white" />
                    </button>
                  </div>

                  {/* Aspirated Sound Card (if present) */}
                  {group.aspirated && (
                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-rose-800">거센소리 (Aspirated)</span>
                        <span className="text-2xl font-serif font-black text-rose-600">
                          {group.aspirated.char}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{group.aspirated.desc}</p>
                      <button
                        type="button"
                        onClick={() => speak(`${group.aspirated.word}`)}
                        className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-rose-600 hover:text-white text-slate-800 border border-rose-200 font-bold text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                      >
                        <span>예시: <strong className="text-rose-600 group-hover:text-white">{group.aspirated.word}</strong></span>
                        <Volume2 size={15} className="text-rose-500 group-hover:text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
