import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, CheckCircle2, List, LayoutGrid, Sparkles, Check, Lightbulb } from 'lucide-react';
import { VocabItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { useProgress } from '../../hooks/useProgress';
import { getVocabVisual } from '../../utils/vocabVisuals';

interface VocabFlashcardProps {
  vocabList: VocabItem[];
  unitNumber: number;
  onPlayTTS: (text: string) => void;
  speaking: boolean;
  currentSpeakingText: string | null;
}

export const VocabFlashcard: React.FC<VocabFlashcardProps> = ({
  vocabList,
  unitNumber,
  onPlayTTS,
  speaking,
  currentSpeakingText
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [filterPOS, setFilterPOS] = useState<string>('전체');

  const { toggleVocabMastered, isVocabMastered, getUnitProgress } = useProgress();

  const currentItem = vocabList[currentIndex] || vocabList[0];
  const currentVisual = currentItem ? getVocabVisual(currentItem.word, currentItem.part_of_speech) : getVocabVisual('', '');
  
  const unitProgress = getUnitProgress(unitNumber);
  const masteredCount = unitProgress.vocabMastered?.length || 0;

  const posList = ['전체', '명사', '동사', '형용사', '감탄사'];

  const filteredVocab = vocabList.filter((v) => {
    if (filterPOS === '전체') return true;
    return v.part_of_speech === filterPOS;
  });

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(vocabList.length - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* View Switcher, Progress Pill & POS Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Left: Mode Toggle & Mastered Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid size={15} />
              <span>연상 플래시카드</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List size={15} />
              <span>단어 목록 (3열)</span>
            </button>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span>
              마스터: <strong>{masteredCount}</strong> / {vocabList.length}개
            </span>
          </span>
        </div>

        {/* Right: Part of Speech Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {posList.map((pos) => (
            <button
              key={pos}
              onClick={() => setFilterPOS(pos)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filterPOS === pos
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'card' ? (
        /* Flashcard View with Visual Association & Mnemonic Tips */
        <div className="max-w-xl mx-auto space-y-6">
          {/* Card Indicator & Master Toggle */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-2">
            <span className="flex items-center gap-1.5">
              <span>단어</span>
              <strong className="text-rose-600 font-bold">{currentIndex + 1}</strong> / {vocabList.length}
            </span>
            <button
              type="button"
              onClick={() => toggleVocabMastered(unitNumber, currentItem.word)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                isVocabMastered(unitNumber, currentItem.word)
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Check size={13} />
              <span>
                {isVocabMastered(unitNumber, currentItem.word) ? '외운 단어 (마스터됨)' : '외웠어요 체크'}
              </span>
            </button>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="perspective-1000 min-h-[380px] cursor-pointer group select-none"
          >
            <div
              className={`w-full min-h-[380px] rounded-3xl transition-transform duration-500 transform-style-3d relative shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front of Card */}
              <div className={`absolute inset-0 backface-hidden w-full h-full p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50/50 to-rose-50/30 border border-slate-200/90 flex flex-col justify-between overflow-hidden shadow-lg`}>
                {/* Visual Category & Level Badges */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${currentVisual.badgeBg} ${currentVisual.badgeText} border ${currentVisual.border}`}>
                      <span>{currentVisual.emoji}</span>
                      <span>{currentVisual.category}</span>
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {currentItem.part_of_speech}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-bold px-2 py-0.5 rounded-md bg-white border border-slate-100">{currentItem.level}</span>
                </div>

                {/* Main Visual Centerpiece */}
                <div className="text-center py-6 space-y-4 z-10">
                  {/* Thematic Emoji Icon Circle */}
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100/80 to-amber-100/80 shadow-inner border border-rose-200/60 text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {currentVisual.emoji}
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    {currentItem.word}
                  </h3>

                  <div className="flex items-center justify-center gap-2">
                    <AudioButton
                      text={currentItem.word}
                      onPlay={onPlayTTS}
                      isPlaying={speaking && currentSpeakingText === currentItem.word}
                      size="md"
                      label="원어민 발음 듣기"
                    />
                  </div>

                  {/* Associative Mnemonic Preview */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/80 text-xs font-medium text-amber-900 max-w-sm">
                    <Lightbulb size={13} className="text-amber-600 shrink-0" />
                    <span className="truncate">{currentVisual.mnemonicHint}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium z-10">
                  <RotateCw size={13} className="text-rose-400 animate-spin-slow" />
                  <span>카드를 클릭하여 뜻, 예문 & 연상 팁 확인</span>
                </div>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col justify-between shadow-2xl border border-slate-700 overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                    <span>{currentVisual.emoji}</span>
                    <span>{currentVisual.category} · {currentItem.part_of_speech}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">{currentItem.level}</span>
                </div>

                <div className="space-y-4 py-3 z-10">
                  <div>
                    <div className="text-xs text-rose-400 font-semibold mb-1 flex items-center gap-1">
                      <Sparkles size={13} />
                      <span>단어 의미 (Meaning)</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-white">
                      {currentItem.meaning}
                    </div>
                  </div>

                  {/* Associative Mnemonic Tip Card */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Lightbulb size={13} />
                      <span>연상 기억 팁 (Mnemonic Cue)</span>
                    </div>
                    <div className="text-xs text-slate-200 leading-relaxed font-medium">
                      {currentVisual.mnemonicHint}
                    </div>
                  </div>

                  {/* Representative Example */}
                  {currentItem.example_sentence && (
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-cyan-300 font-semibold">실전 회화 예문</span>
                        <AudioButton
                          text={currentItem.example_sentence}
                          onPlay={onPlayTTS}
                          isPlaying={speaking && currentSpeakingText === currentItem.example_sentence}
                          size="sm"
                          className="bg-white/20 text-white hover:bg-white/30 border-white/20"
                        />
                      </div>
                      <div className="text-sm font-medium text-slate-100">
                        "{currentItem.example_sentence}"
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium z-10">
                  <RotateCw size={13} />
                  <span>다시 앞면으로 뒤집기</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Slider Controls */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={18} />
              <span>이전 단어</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-sm transition-all cursor-pointer"
            >
              <RotateCw size={16} />
              <span>뒤집기</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>다음 단어</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        /* Responsive Grid: 1 col (Mobile) -> 2 col (Tablet) -> 3 col (Desktop) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocab.map((item, idx) => {
            const isMastered = isVocabMastered(unitNumber, item.word);
            const visual = getVocabVisual(item.word, item.part_of_speech);

            return (
              <div
                key={`${item.word}-${idx}`}
                className={`p-5 rounded-3xl bg-white border transition-all flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md ${
                  isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xl font-black text-slate-900">{item.word}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5 ${visual.badgeBg} ${visual.badgeText}`}>
                        <span>{visual.emoji}</span>
                        <span>{visual.category}</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.part_of_speech}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-rose-600">{item.meaning}</div>
                  </div>

                  <div className="flex items-center gap-1">
                    <AudioButton
                      text={item.word}
                      onPlay={onPlayTTS}
                      isPlaying={speaking && currentSpeakingText === item.word}
                      size="sm"
                    />
                    <button
                      onClick={() => toggleVocabMastered(unitNumber, item.word)}
                      title={isMastered ? '마스터 해제' : '마스터 체크'}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <CheckCircle2 size={18} className={isMastered ? 'fill-emerald-500 text-white' : ''} />
                    </button>
                  </div>
                </div>

                {/* Mnemonic Hint & Example */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 flex items-center gap-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Lightbulb size={12} className="text-amber-500 shrink-0" />
                    <span className="truncate">{visual.mnemonicHint}</span>
                  </div>

                  {item.example_sentence && (
                    <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between text-xs text-slate-700 font-medium">
                      <span className="truncate pr-2">"{item.example_sentence}"</span>
                      <AudioButton
                        text={item.example_sentence}
                        onPlay={onPlayTTS}
                        isPlaying={speaking && currentSpeakingText === item.example_sentence}
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
