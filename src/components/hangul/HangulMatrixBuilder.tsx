import React, { useState, useMemo } from 'react';
import { Volume2, Sparkles, RefreshCw, Layers, Grid, Play } from 'lucide-react';
import { useTTS } from '../../hooks/useTTS';

// Standard Hangul Unicode Table Indices
const CHOSEONG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

const JUNGSEONG_LIST = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

const JONGSEONG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// Compose syllable from indices
export function composeHangul(choIdx: number, jungIdx: number, jongIdx: number = 0): string {
  const code = 0xac00 + choIdx * 588 + jungIdx * 28 + jongIdx;
  return String.fromCharCode(code);
}

export const HangulMatrixBuilder: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'builder' | 'matrix'>('builder');

  // Builder State
  const [selectedChoIdx, setSelectedChoIdx] = useState<number>(0); // 'ㄱ'
  const [selectedJungIdx, setSelectedJungIdx] = useState<number>(0); // 'ㅏ'
  const [selectedJongIdx, setSelectedJongIdx] = useState<number>(0); // '' (none)

  // Matrix Filter State
  const [matrixVowelGroup, setMatrixVowelGroup] = useState<'basic' | 'all'>('basic');

  const { speak, speaking } = useTTS();

  const assembledChar = useMemo(() => {
    return composeHangul(selectedChoIdx, selectedJungIdx, selectedJongIdx);
  }, [selectedChoIdx, selectedJungIdx, selectedJongIdx]);

  const handlePlaySound = (char: string) => {
    speak(char);
  };

  const handleRandomize = () => {
    const rCho = Math.floor(Math.random() * CHOSEONG_LIST.length);
    const rJung = Math.floor(Math.random() * 10); // pick from basic vowels mostly
    const rJong = Math.random() > 0.4 ? Math.floor(Math.random() * 8) : 0;
    setSelectedChoIdx(rCho);
    setSelectedJungIdx(rJung);
    setSelectedJongIdx(rJong);
    const char = composeHangul(rCho, rJung, rJong);
    speak(char);
  };

  // Vowels to show in Matrix
  const matrixVowels = matrixVowelGroup === 'basic'
    ? ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']
    : JUNGSEONG_LIST;

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveMode('builder')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeMode === 'builder'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={15} />
            <span>실시간 자모 결합기 (Syllable Builder)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('matrix')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeMode === 'matrix'
                ? 'bg-white text-indigo-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid size={15} />
            <span>19x21 자모 음절표 (Matrix Soundboard)</span>
          </button>
        </div>

        {activeMode === 'builder' && (
          <button
            type="button"
            onClick={handleRandomize}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
          >
            <RefreshCw size={13} className="text-blue-600" />
            <span>랜덤 글자 조합해보기</span>
          </button>
        )}
      </div>

      {activeMode === 'builder' ? (
        /* 1. Syllable Builder View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Assembly Result Display (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-slate-800 flex flex-col items-center justify-between min-h-[380px] relative overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-full flex items-center justify-between text-xs font-bold text-cyan-300 relative z-10">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>실시간 글자 합성 결과</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px]">
                  {selectedJongIdx > 0 ? '자음 + 모음 + 받침' : '자음 + 모음'}
                </span>
              </div>

              {/* Big Character Display */}
              <div className="my-6 text-center space-y-3 relative z-10">
                <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-7xl font-black font-serif shadow-2xl shadow-blue-500/40 border border-white/20 transform hover:scale-105 transition-transform">
                  {assembledChar}
                </div>

                {/* Breakdown badges */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 font-black text-sm border border-blue-500/30">
                    초성: {CHOSEONG_LIST[selectedChoIdx]}
                  </span>
                  <span className="text-slate-500 font-bold">+</span>
                  <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 font-black text-sm border border-purple-500/30">
                    중성: {JUNGSEONG_LIST[selectedJungIdx]}
                  </span>
                  {selectedJongIdx > 0 && (
                    <>
                      <span className="text-slate-500 font-bold">+</span>
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-black text-sm border border-amber-500/30">
                        종성: {JONGSEONG_LIST[selectedJongIdx]}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Big TTS Play Button */}
              <button
                type="button"
                onClick={() => handlePlaySound(assembledChar)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-10"
              >
                <Volume2 size={20} className={speaking ? 'animate-bounce' : ''} />
                <span>[{assembledChar}] 원어민 발음 듣기</span>
              </button>
            </div>
          </div>

          {/* Right: Component Selectors (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. 초성 (Initial Consonant) Selector */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  <span>초성 선택 (첫소리 자음 - 19개)</span>
                </span>
                <span className="text-blue-600 font-black">
                  선택: {CHOSEONG_LIST[selectedChoIdx]}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CHOSEONG_LIST.map((cho, idx) => {
                  const isSelected = selectedChoIdx === idx;
                  return (
                    <button
                      key={cho}
                      type="button"
                      onClick={() => {
                        setSelectedChoIdx(idx);
                        const nextChar = composeHangul(idx, selectedJungIdx, selectedJongIdx);
                        handlePlaySound(nextChar);
                      }}
                      className={`w-9 h-9 rounded-xl font-black text-sm font-serif transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200/80'
                      }`}
                    >
                      {cho}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. 중성 (Medial Vowel) Selector */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  <span>중성 선택 (가운데소리 모음 - 21개)</span>
                </span>
                <span className="text-purple-600 font-black">
                  선택: {JUNGSEONG_LIST[selectedJungIdx]}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {JUNGSEONG_LIST.map((jung, idx) => {
                  const isSelected = selectedJungIdx === idx;
                  return (
                    <button
                      key={jung}
                      type="button"
                      onClick={() => {
                        setSelectedJungIdx(idx);
                        const nextChar = composeHangul(selectedChoIdx, idx, selectedJongIdx);
                        handlePlaySound(nextChar);
                      }}
                      className={`w-9 h-9 rounded-xl font-black text-sm font-serif transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-600 border border-slate-200/80'
                      }`}
                    >
                      {jung}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. 종성 (Final Consonant / Batchim) Selector */}
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  <span>종성 선택 (끝소리 받침 - 선택 사항)</span>
                </span>
                <span className="text-amber-600 font-black">
                  {selectedJongIdx === 0 ? '받침 없음' : `선택: ${JONGSEONG_LIST[selectedJongIdx]}`}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {JONGSEONG_LIST.map((jong, idx) => {
                  const isSelected = selectedJongIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedJongIdx(idx);
                        const nextChar = composeHangul(selectedChoIdx, selectedJungIdx, idx);
                        handlePlaySound(nextChar);
                      }}
                      className={`px-2.5 h-9 rounded-xl font-black text-xs font-serif transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs scale-105'
                          : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 border border-slate-200/80'
                      }`}
                    >
                      {jong === '' ? '없음' : jong}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. 19x21 Matrix Soundboard View */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-700 font-bold flex items-center gap-2">
              <span>표시 모음 선택:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMatrixVowelGroup('basic')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    matrixVowelGroup === 'basic'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  기본 모음 10개 (19x10)
                </button>
                <button
                  type="button"
                  onClick={() => setMatrixVowelGroup('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    matrixVowelGroup === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  전체 모음 21개 (19x21)
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-medium hidden sm:block">
              원하는 음절 셀을 클릭하면 원어민 발음이 즉시 재생됩니다.
            </div>
          </div>

          {/* Scrollable Matrix Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-x-auto p-4">
            <table className="w-full border-collapse text-center">
              <thead>
                <tr>
                  <th className="p-2 text-xs font-black text-slate-400 bg-slate-50 rounded-tl-xl border border-slate-200 sticky left-0 z-20">
                    자음 \ 모음
                  </th>
                  {matrixVowels.map((vowel) => (
                    <th
                      key={vowel}
                      className="p-2 text-sm font-black text-indigo-700 bg-indigo-50 border border-slate-200 min-w-[42px] font-serif"
                    >
                      {vowel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CHOSEONG_LIST.map((cho, choIdx) => (
                  <tr key={cho} className="hover:bg-slate-50/50">
                    <td className="p-2 text-sm font-black text-blue-700 bg-blue-50 border border-slate-200 sticky left-0 z-10 font-serif">
                      {cho}
                    </td>
                    {matrixVowels.map((vowel) => {
                      const jungIdx = JUNGSEONG_LIST.indexOf(vowel);
                      const syllable = composeHangul(choIdx, jungIdx, 0);
                      return (
                        <td key={vowel} className="border border-slate-200 p-0">
                          <button
                            type="button"
                            onClick={() => handlePlaySound(syllable)}
                            className="w-full h-11 flex items-center justify-center font-bold text-xs text-slate-800 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-serif active:scale-90"
                            title={`${syllable} 발음 듣기`}
                          >
                            {syllable}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
