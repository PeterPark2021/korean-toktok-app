import React, { useState } from 'react';
import { Play, Pause, Eye, EyeOff, Mic, Sparkles, Sliders, MapPin, Users } from 'lucide-react';
import { DialogueItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { SpeechPracticeModal } from './SpeechPracticeModal';
import { getSpeakerAvatar } from '../../utils/characterAvatar';
import { getUnitSituationBanner } from '../../utils/unitSituation';

interface DialogueViewerProps {
  dialogues: DialogueItem[];
  onPlayTTS: (text: string, rate?: number) => void;
  onStopTTS: () => void;
  speaking: boolean;
  currentSpeakingText: string | null;
  playDialogueQueue: (texts: string[], onIndexChange?: (i: number) => void, onComplete?: () => void) => void;
  isQueuePlaying: boolean;
  queueIndex: number;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  unitNumber?: number;
  situationText?: string;
}

export const DialogueViewer: React.FC<DialogueViewerProps> = ({
  dialogues,
  onPlayTTS,
  onStopTTS,
  speaking,
  currentSpeakingText,
  playDialogueQueue,
  isQueuePlaying,
  queueIndex,
  speechRate,
  setSpeechRate,
  unitNumber = 1,
  situationText
}) => {
  const [showTranslations, setShowTranslations] = useState(true);
  const [selectedForPractice, setSelectedForPractice] = useState<DialogueItem | null>(null);

  const bannerInfo = getUnitSituationBanner(unitNumber);

  // Collect unique speakers for this dialogue
  const uniqueSpeakers = Array.from(new Set(dialogues.map((d) => d.speaker)));

  const handlePlayAll = () => {
    if (isQueuePlaying) {
      onStopTTS();
    } else {
      const texts = dialogues.map((d) => d.korean_text);
      playDialogueQueue(texts);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Unit Situation Visual Banner (Phase 1 Visual Feature) */}
      {bannerInfo.hasCustomImage && bannerInfo.imageUrl ? (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md group">
          {/* Background Illustration Image */}
          <div className="h-48 md:h-60 w-full overflow-hidden bg-slate-900 relative">
            <img
              src={bannerInfo.imageUrl}
              alt={bannerInfo.sceneTitle}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
              loading="lazy"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          </div>

          {/* Banner Text Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white">
                <MapPin size={13} className="text-rose-400" />
                <span>단원 대화 상황</span>
              </span>

              {/* Character Cast Badges */}
              <div className="flex items-center gap-1.5">
                {uniqueSpeakers.map((spk) => {
                  const avatar = getSpeakerAvatar(spk);
                  return (
                    <span
                      key={spk}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/40 backdrop-blur-md text-slate-200 border border-white/10"
                    >
                      <span>{avatar.name}</span>
                      <span className="text-slate-400">({avatar.role.split(' ')[0]})</span>
                    </span>
                  );
                })}
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-black text-white drop-shadow-sm">
              {bannerInfo.sceneTitle}
            </h3>
            {situationText && (
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed drop-shadow-sm">
                {situationText}
              </p>
            )}
          </div>
        </div>
      ) : null}

      {/* 2. Audio Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Left: Play All Button & Translation Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePlayAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
              isQueuePlaying
                ? 'bg-rose-600 text-white shadow-rose-500/30 ring-2 ring-rose-300'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isQueuePlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isQueuePlaying ? '연속 재생 정지' : '전체 대화 연속 재생'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTranslations(!showTranslations)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {showTranslations ? <EyeOff size={15} /> : <Eye size={15} />}
            <span>{showTranslations ? '번역 숨기기' : '번역 보기'}</span>
          </button>
        </div>

        {/* Right: Speech Rate Selector */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Sliders size={14} className="text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">재생 속도:</span>
          {[0.8, 1.0, 1.2].map((rate) => (
            <button
              key={rate}
              onClick={() => setSpeechRate(rate)}
              className={`px-2 py-0.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                speechRate === rate
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* 3. Dialogue Cards List with High-Res Character Avatars */}
      <div className="space-y-4">
        {dialogues.map((item, index) => {
          const charInfo = getSpeakerAvatar(item.speaker);
          const isCurrentActive =
            (isQueuePlaying && queueIndex === index) ||
            (!isQueuePlaying && speaking && currentSpeakingText === item.korean_text);

          const isSpeakerA = index % 2 === 0;

          return (
            <div
              key={item.dialogue_id || index}
              className={`p-5 md:p-6 rounded-3xl transition-all duration-300 border ${
                isCurrentActive
                  ? 'bg-blue-50/90 border-blue-300 ring-2 ring-blue-400 shadow-md scale-[1.01]'
                  : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Character Profile Avatar */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-100">
                    <img
                      src={charInfo.avatarUrl}
                      alt={charInfo.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to stylized initial badge if image error
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Speaker Turn Number Badge */}
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs">
                    {index + 1}
                  </span>
                </div>

                {/* Speech Bubble Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Speaker Name & Role Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm md:text-base text-slate-900 tracking-tight">
                        {item.speaker}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${charInfo.badgeBg}`}>
                        {charInfo.role}
                      </span>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-1.5">
                      {/* Audio Button */}
                      <AudioButton
                        text={item.korean_text}
                        onPlay={(txt) => onPlayTTS(txt, speechRate)}
                        isPlaying={speaking && currentSpeakingText === item.korean_text}
                        size="sm"
                        label="듣기"
                      />

                      {/* Shadowing Practice Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedForPractice(item)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                        title="발음 따라 읽기 연습"
                      >
                        <Mic size={14} className="text-blue-600" />
                        <span className="hidden sm:inline">따라 읽기</span>
                      </button>
                    </div>
                  </div>

                  {/* Korean Dialogue Text */}
                  <div className="text-base md:text-lg font-bold text-slate-900 leading-relaxed pt-0.5">
                    {item.korean_text}
                  </div>

                  {/* English Translation */}
                  {showTranslations && (
                    <div className="text-xs md:text-sm text-slate-500 font-medium">
                      {item.translation}
                    </div>
                  )}

                  {/* Audio Hint / Intonation Guide */}
                  {item.audio_hint && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50/90 border border-amber-200/70 px-2.5 py-1 rounded-xl mt-1">
                      <Sparkles size={12} className="shrink-0 text-amber-500" />
                      <span>{item.audio_hint}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shadowing Practice Modal */}
      {selectedForPractice && (
        <SpeechPracticeModal
          dialogue={selectedForPractice}
          onClose={() => setSelectedForPractice(null)}
          onPlayTTS={(txt) => onPlayTTS(txt, speechRate)}
          isTTSPlaying={speaking}
        />
      )}
    </div>
  );
};
