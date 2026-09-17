import React, { useState, useMemo, useEffect } from 'react';
import { Play, Pause, Eye, EyeOff, Mic, Sparkles, Sliders, MapPin, Users, Film, ArrowRight, ArrowLeft, Layers } from 'lucide-react';
import { DialogueItem, EditionType, UnitItem } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { SpeechPracticeModal } from './SpeechPracticeModal';
import { getSpeakerAvatar } from '../../utils/characterAvatar';
import { getUnitSituationBanner } from '../../utils/unitSituation';
import { getUnitSubLessons, getActiveEdition } from '../../data';

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
  edition?: EditionType;
}

export interface EpisodeData {
  episodeNumber: 1 | 2;
  title: string;
  topic?: string;
  situation?: string;
  dialogues: DialogueItem[];
  startIndex: number;
  uniqueSpeakers: string[];
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
  situationText,
  edition = getActiveEdition()
}) => {
  // View mode: 'ep1' | 'ep2' | 'all'
  const [viewMode, setViewMode] = useState<'ep1' | 'ep2' | 'all'>('ep1');
  const [showTranslations, setShowTranslations] = useState(true);
  const [selectedForPractice, setSelectedForPractice] = useState<DialogueItem | null>(null);

  // Retrieve sub-lesson metadata for this unit (e.g. 1-1 and 1-2)
  const subLessons = useMemo<UnitItem[]>(() => {
    return getUnitSubLessons(unitNumber, edition);
  }, [unitNumber, edition]);

  // Partition the full dialogues array into Episode 1 & Episode 2
  const episodes = useMemo<EpisodeData[]>(() => {
    if (!dialogues || dialogues.length === 0) return [];

    let splitIndex = 3;
    if (dialogues.length === 7) {
      splitIndex = 4;
    } else if (dialogues.length === 6) {
      splitIndex = 3;
    } else if (dialogues.length <= 4) {
      splitIndex = dialogues.length;
    } else {
      splitIndex = Math.ceil(dialogues.length / 2);
    }

    const ep1Dialogues = dialogues.slice(0, splitIndex);
    const ep2Dialogues = dialogues.slice(splitIndex);

    const sub1 = subLessons[0];
    const sub2 = subLessons[1];

    const ep1: EpisodeData = {
      episodeNumber: 1,
      title: sub1?.title || '에피소드 1',
      topic: sub1?.topic,
      situation: sub1?.situation || situationText,
      dialogues: ep1Dialogues,
      startIndex: 0,
      uniqueSpeakers: Array.from(new Set(ep1Dialogues.map((d) => d.speaker)))
    };

    const ep2: EpisodeData = {
      episodeNumber: 2,
      title: sub2?.title || '에피소드 2',
      topic: sub2?.topic,
      situation: sub2?.situation,
      dialogues: ep2Dialogues,
      startIndex: splitIndex,
      uniqueSpeakers: Array.from(new Set(ep2Dialogues.map((d) => d.speaker)))
    };

    return ep2Dialogues.length > 0 ? [ep1, ep2] : [ep1];
  }, [dialogues, subLessons, situationText]);

  const hasTwoEpisodes = episodes.length >= 2;
  const ep1 = episodes[0];
  const ep2 = episodes[1];

  // Stop TTS if switching modes
  useEffect(() => {
    if (isQueuePlaying) {
      onStopTTS();
    }
  }, [viewMode]);

  const bannerInfo = getUnitSituationBanner(unitNumber);

  // Active episode based on current viewMode
  const activeEpisode = viewMode === 'ep2' && ep2 ? ep2 : ep1;

  // Active dialogue list to play or display
  const activeDialogues = useMemo(() => {
    if (viewMode === 'ep1') return ep1?.dialogues || [];
    if (viewMode === 'ep2' && ep2) return ep2.dialogues;
    return dialogues;
  }, [viewMode, ep1, ep2, dialogues]);

  // Handle continuous audio playback for currently viewed episode or all
  const handlePlayQueue = (targetEpisode?: 1 | 2 | 'all') => {
    if (isQueuePlaying) {
      onStopTTS();
      return;
    }

    let textsToPlay: string[] = [];
    if (targetEpisode === 1 && ep1) {
      textsToPlay = ep1.dialogues.map((d) => d.korean_text);
    } else if (targetEpisode === 2 && ep2) {
      textsToPlay = ep2.dialogues.map((d) => d.korean_text);
    } else {
      textsToPlay = activeDialogues.map((d) => d.korean_text);
    }

    playDialogueQueue(textsToPlay);
  };

  // Helper to render a dialogue line card
  const renderDialogueCard = (
    item: DialogueItem,
    indexInEpisode: number,
    globalIndex: number,
    episodeNum: 1 | 2
  ) => {
    const charInfo = getSpeakerAvatar(item.speaker);
    
    // Check if currently speaking in queue or single play
    let isCurrentActive = false;
    if (isQueuePlaying) {
      if (viewMode === 'all') {
        isCurrentActive = queueIndex === globalIndex;
      } else if (viewMode === 'ep1' && episodeNum === 1) {
        isCurrentActive = queueIndex === indexInEpisode;
      } else if (viewMode === 'ep2' && episodeNum === 2) {
        isCurrentActive = queueIndex === indexInEpisode;
      }
    } else if (speaking && currentSpeakingText === item.korean_text) {
      isCurrentActive = true;
    }

    return (
      <div
        key={item.dialogue_id || `${episodeNum}-${indexInEpisode}`}
        className={`p-5 md:p-6 rounded-3xl transition-all duration-300 border ${
          isCurrentActive
            ? 'bg-blue-50/95 border-blue-400 ring-2 ring-blue-400 shadow-lg scale-[1.01]'
            : 'bg-white border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300'
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Character Profile Avatar */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-xs bg-slate-100">
              <img
                src={charInfo.avatarUrl}
                alt={charInfo.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Speaker Turn Number Badge (Clean Turn 1, 2, 3...) */}
            <span
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs ${
                episodeNum === 1 ? 'bg-blue-600' : 'bg-purple-600'
              }`}
            >
              {indexInEpisode + 1}
            </span>
          </div>

          {/* Speech Bubble Content */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Speaker Name & Role Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-sm md:text-base text-slate-900 tracking-tight">
                  {item.speaker}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${charInfo.badgeBg}`}>
                  {charInfo.role}
                </span>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
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
              <div className="text-xs md:text-sm text-slate-500 font-medium leading-normal">
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
  };

  return (
    <div className="space-y-6">
      {/* 1. Episode Selector Tabs (에피소드 1 / 에피소드 2 / 전체 에피소드) */}
      {hasTwoEpisodes && ep1 && ep2 && (
        <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 shadow-2xs">
          {/* Episode 1 Tab */}
          <button
            type="button"
            onClick={() => setViewMode('ep1')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              viewMode === 'ep1'
                ? 'bg-white text-blue-700 shadow-sm border border-blue-200/80 ring-1 ring-blue-400/30 scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Film size={15} className={viewMode === 'ep1' ? 'text-blue-600' : 'text-slate-400'} />
            <span className="truncate">에피소드 1: {ep1.title}</span>
            <span
              className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                viewMode === 'ep1' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {ep1.dialogues.length}턴
            </span>
          </button>

          {/* Episode 2 Tab */}
          <button
            type="button"
            onClick={() => setViewMode('ep2')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              viewMode === 'ep2'
                ? 'bg-white text-purple-700 shadow-sm border border-purple-200/80 ring-1 ring-purple-400/30 scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Film size={15} className={viewMode === 'ep2' ? 'text-purple-600' : 'text-purple-400'} />
            <span className="truncate">에피소드 2: {ep2.title}</span>
            <span
              className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                viewMode === 'ep2' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {ep2.dialogues.length}턴
            </span>
          </button>

          {/* Full View Tab */}
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`sm:flex-none flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-700 scale-[1.01]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Layers size={14} />
            <span>전체 보기</span>
          </button>
        </div>
      )}

      {/* 2. Visual Scene Context Banner (Selected Episode or Unit) */}
      {activeEpisode && (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 md:p-6">
          {/* Decorative Background Image if available */}
          {bannerInfo.hasCustomImage && bannerInfo.imageUrl && (
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img
                src={bannerInfo.imageUrl}
                alt={bannerInfo.sceneTitle}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>
          )}

          <div className="relative z-10 space-y-3">
            {/* Top Pill Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <MapPin size={13} className="text-cyan-400" />
                <span>{viewMode === 'all' ? `Unit ${unitNumber} 전체 대화 상황` : `${activeEpisode.title} 대화 상황`}</span>
              </span>

              {/* Cast Badges for this Scene */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Users size={12} />
                  <span>등장인물:</span>
                </span>
                {(viewMode === 'all'
                  ? Array.from(new Set(dialogues.map((d) => d.speaker)))
                  : activeEpisode.uniqueSpeakers
                ).map((spk) => {
                  const avatar = getSpeakerAvatar(spk);
                  return (
                    <span
                      key={spk}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 backdrop-blur-md text-slate-200 border border-white/10"
                    >
                      <span>{avatar.name}</span>
                      <span className="text-slate-400">({avatar.role.split(' ')[0]})</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Episode Title & Topic */}
            <div>
              <div className="text-xs font-bold text-cyan-300">
                {viewMode === 'all'
                  ? `Unit ${unitNumber} 통합 회화 (에피소드 1 & 2)`
                  : `에피소드 ${activeEpisode.episodeNumber} · ${activeEpisode.topic || '기초 회화'}`}
              </div>
              <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                {viewMode === 'all' ? `${ep1?.title || ''} & ${ep2 ? ep2.title : ''}` : activeEpisode.title}
              </h3>
            </div>

            {/* Situation Description */}
            {activeEpisode.situation && (
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {viewMode === 'all' ? situationText || ep1?.situation : activeEpisode.situation}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3. Audio Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Left: Continuous Play Button & Translation Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handlePlayQueue(viewMode === 'ep1' ? 1 : viewMode === 'ep2' ? 2 : 'all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
              isQueuePlaying
                ? 'bg-rose-600 text-white shadow-rose-500/30 ring-2 ring-rose-300'
                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
            }`}
          >
            {isQueuePlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>
              {isQueuePlaying
                ? '연속 재생 정지'
                : viewMode === 'ep1'
                ? '에피소드 1 연속 듣기'
                : viewMode === 'ep2'
                ? '에피소드 2 연속 듣기'
                : '전체 대화 연속 듣기'}
            </span>
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

      {/* 4. Dialogue Cards List */}
      {viewMode === 'all' ? (
        /* Full View Mode: Episode 1 + Scene Divider + Episode 2 */
        <div className="space-y-6">
          {/* Episode 1 Section */}
          {ep1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h4 className="font-black text-sm md:text-base text-slate-900">
                    에피소드 1: {ep1.title}
                  </h4>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {ep1.dialogues.length}개 대화
                </span>
              </div>

              <div className="space-y-4">
                {ep1.dialogues.map((item, idx) =>
                  renderDialogueCard(item, idx, idx, 1)
                )}
              </div>
            </div>
          )}

          {/* Prominent Visual Scene Transition Card */}
          {ep2 && ep1 && (
            <>
              <div className="relative my-8 py-5 px-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-md border border-purple-500/30 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] shadow-xs">
                        장면 전환 🎬
                      </span>
                      <span className="text-xs font-bold text-purple-200">
                        에피소드 2 시작
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      {ep2.title}
                    </h4>
                    {ep2.situation && (
                      <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                        {ep2.situation}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {ep2.uniqueSpeakers.map((spk) => {
                      const av = getSpeakerAvatar(spk);
                      return (
                        <span
                          key={spk}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-200 border border-white/15"
                        >
                          <span>{av.name}</span>
                          <span className="text-slate-400">({av.role.split(' ')[0]})</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Episode 2 Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <h4 className="font-black text-sm md:text-base text-slate-900">
                      에피소드 2: {ep2.title}
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {ep2.dialogues.length}개 대화
                  </span>
                </div>

                <div className="space-y-4">
                  {ep2.dialogues.map((item, idx) =>
                    renderDialogueCard(item, idx, ep1.dialogues.length + idx, 2)
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* Single Episode Mode (Episode 1 or Episode 2) */
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  viewMode === 'ep1' ? 'bg-blue-600' : 'bg-purple-600'
                }`}
              />
              <h4 className="font-black text-sm md:text-base text-slate-900">
                {activeEpisode.title}
              </h4>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              총 {activeEpisode.dialogues.length}턴의 대화
            </span>
          </div>

          <div className="space-y-4">
            {activeEpisode.dialogues.map((item, idx) =>
              renderDialogueCard(
                item,
                idx,
                viewMode === 'ep2' && ep2 && ep1 ? ep1.dialogues.length + idx : idx,
                activeEpisode.episodeNumber
              )
            )}
          </div>

          {/* Episode Navigation Footer */}
          {hasTwoEpisodes && ep1 && ep2 && (
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              {viewMode === 'ep1' && ep2 ? (
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('ep2');
                    window.scrollTo({ top: 200, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md shadow-purple-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <span>다음: 에피소드 2 ({ep2.title}) 학습하기</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <div className="w-full flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('ep1');
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    <ArrowLeft size={14} />
                    <span>이전: 에피소드 1 ({ep1.title})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('all')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-all cursor-pointer border border-blue-200"
                  >
                    <Layers size={14} />
                    <span>전체 대화 한눈에 보기</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

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
