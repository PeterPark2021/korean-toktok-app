import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { BASIC_VOWELS, COMPOUND_VOWELS, VowelData } from '../../data/hangul';
import { useTTS } from '../../hooks/useTTS';

export const HangulVowelExplorer: React.FC = () => {
  const [activeType, setActiveType] = useState<'all' | 'basic' | 'compound'>('basic');
  const [selectedVowel, setSelectedVowel] = useState<VowelData>(BASIC_VOWELS[0]);
  const { speak, speaking, currentSpeakingText } = useTTS();

  const displayedVowels =
    activeType === 'all'
      ? [...BASIC_VOWELS, ...COMPOUND_VOWELS]
      : activeType === 'basic'
      ? BASIC_VOWELS
      : COMPOUND_VOWELS;

  const handlePlaySound = (text: string) => {
    // For single vowels, prepend ㅇ for clear TTS articulation (e.g. "아", "야")
    const speakText = text.length === 1 ? `ㅇ${text}` : text;
    speak(selectedVowel.name || speakText);
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveType('basic')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeType === 'basic'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            기본 모음 (10개)
          </button>
          <button
            type="button"
            onClick={() => setActiveType('compound')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeType === 'compound'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            복합 모음 (11개)
          </button>
          <button
            type="button"
            onClick={() => setActiveType('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeType === 'all'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            전체 모음 (21개)
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          카드를 클릭하면 발음 팁과 획순, 예시 단어를 확인할 수 있습니다.
        </div>
      </div>

      {/* Main Grid & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Vowel Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {displayedVowels.map((vowel) => {
            const isSelected = selectedVowel.char === vowel.char;
            return (
              <button
                key={vowel.char}
                type="button"
                onClick={() => setSelectedVowel(vowel)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group cursor-pointer flex flex-col items-center justify-between min-h-[110px] ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.03]'
                    : 'bg-white hover:bg-blue-50/50 border-slate-200 text-slate-800 hover:border-blue-300'
                }`}
              >
                <div className="w-full flex items-center justify-between text-[11px] font-bold opacity-80">
                  <span>[{vowel.romanization}]</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {vowel.type === 'basic' ? '기본' : '복합'}
                  </span>
                </div>

                <div className="text-4xl font-black my-1 font-serif">
                  {vowel.char}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-medium">
                  <span className={isSelected ? 'text-blue-100' : 'text-slate-500'}>
                    소리: {vowel.name}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(vowel.name);
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

        {/* Right: Selected Vowel Detail Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-slate-50/80 to-blue-50/40 border border-slate-200 shadow-sm space-y-5">
            {/* Vowel Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-4xl font-black shadow-md shadow-blue-500/20 font-serif">
                  {selectedVowel.char}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900">
                      {selectedVowel.name} [{selectedVowel.char}]
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                      {selectedVowel.type === 'basic' ? '기본 모음' : '복합/이중 모음'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    로마자 표기: <span className="text-blue-600 font-black">[{selectedVowel.romanization}]</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handlePlaySound(selectedVowel.char)}
                className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-md shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer font-bold text-xs"
              >
                <Volume2 size={18} className={speaking ? 'animate-bounce' : ''} />
                <span>발음 듣기</span>
              </button>
            </div>

            {/* Pronunciation & Mouth Shape Guide */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-blue-900">
                <Sparkles size={15} className="text-blue-600" />
                <span>정확한 발음 & 조음 팁</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedVowel.pronunciationTip}
              </p>
              {selectedVowel.mouthShape && (
                <div className="pt-1.5 flex items-center gap-2 text-[11px] text-blue-800 font-bold border-t border-blue-200/60">
                  <span>👄 입모양 가이드:</span>
                  <span className="text-slate-800 font-medium">{selectedVowel.mouthShape}</span>
                </div>
              )}
            </div>

            {/* Stroke Order (획순 가이드) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Layers size={15} className="text-slate-500" />
                <span>쓰는 순서 (획순)</span>
              </div>
              <div className="space-y-1.5">
                {selectedVowel.strokes.map((stroke, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center text-[10px] shrink-0">
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
                {selectedVowel.exampleWords.map((ex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => speak(ex.word)}
                    className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
                  >
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        {ex.word}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">
                        [{ex.romanization}] • {ex.meaning}
                      </div>
                    </div>
                    <Volume2
                      size={15}
                      className="text-slate-300 group-hover:text-blue-600 group-hover:scale-110 transition-all shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
