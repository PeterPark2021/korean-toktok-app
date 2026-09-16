// src/components/study/CultureViewer.tsx
// Rich, interactive Korean Culture Photo Cards & Cultural Insight Viewer

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, Lightbulb, Volume2, Info, Compass, Share2, ArrowRight } from 'lucide-react';
import { getCultureForUnit, UnitCultureItem } from '../../data/culture/cultureData';
import { AudioButton } from '../common/AudioButton';

interface CultureViewerProps {
  unitNumber: number;
  unitTopic?: string;
  unitSituation?: string;
  onPlayTTS: (text: string) => void;
  speaking: boolean;
  currentSpeakingText: string | null;
}

export const CultureViewer: React.FC<CultureViewerProps> = ({
  unitNumber,
  unitTopic = '',
  unitSituation = '',
  onPlayTTS,
  speaking,
  currentSpeakingText
}) => {
  const cultureData: UnitCultureItem = getCultureForUnit(unitNumber, unitTopic, unitSituation);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* 1. Hero Photo Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 group">
        {/* Aspect Ratio Container for 16:9 Hero Image */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-slate-900">
          <img
            src={imgError ? '/images/culture/palace.jpg' : cultureData.imageUrl}
            alt={cultureData.imageAlt}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Premium Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-500/90 text-white shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-rose-400/40">
              <Sparkles size={14} className="text-amber-300" />
              <span>{cultureData.category}</span>
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/50 text-slate-200 backdrop-blur-md border border-white/20">
              Unit {unitNumber} 문화 톡톡
            </span>
          </div>

          {/* Hero Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 space-y-2">
            <div className="text-xs md:text-sm font-bold text-amber-300 tracking-wide uppercase">
              {cultureData.subtitle}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {cultureData.title}
            </h2>
            <p className="text-sm md:text-base text-slate-200 font-medium max-w-2xl line-clamp-2">
              "{cultureData.tagline}"
            </p>
          </div>
        </div>
      </div>

      {/* 2. Cultural Background & Story Narrative */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600">
              <Compass size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">문화 속 이야기 (Cultural Context)</h3>
              <p className="text-xs text-slate-500 font-medium">한국의 풍습과 소통 방식에 담긴 의미</p>
            </div>
          </div>

          <AudioButton
            text={cultureData.story.join(' ')}
            onPlay={onPlayTTS}
            isPlaying={speaking && currentSpeakingText === cultureData.story.join(' ')}
            size="md"
            label="해설 듣기"
          />
        </div>

        {/* Summary Callout Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-sm font-semibold text-amber-900 flex items-start gap-3">
          <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{cultureData.summary}</div>
        </div>

        {/* Story Paragraphs */}
        <div className="space-y-3.5 text-slate-700 leading-relaxed text-sm md:text-base">
          {cultureData.story.map((para, idx) => (
            <p key={idx} className="font-normal text-slate-700">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* 3. Practical Etiquette & Real-Life Tips (DOs & DONTs) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sparkles size={18} className="text-blue-600" />
          <h3 className="text-lg font-black text-slate-900">실전 에티켓 & 행동 요령 (Do & Don't)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cultureData.practicalTips.map((tip, idx) => {
            const isDo = tip.type === 'do';
            const isDont = tip.type === 'dont';

            const bgClass = isDo
              ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
              : isDont
              ? 'bg-rose-50/60 border-rose-200/80 text-rose-950'
              : 'bg-blue-50/60 border-blue-200/80 text-blue-950';

            const badgeClass = isDo
              ? 'bg-emerald-500 text-white'
              : isDont
              ? 'bg-rose-500 text-white'
              : 'bg-blue-500 text-white';

            const Icon = isDo ? CheckCircle2 : isDont ? XCircle : Lightbulb;

            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl border shadow-xs transition-all hover:shadow-md flex flex-col justify-between gap-3 ${bgClass}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeClass}`}>
                      {isDo ? 'DO (권장)' : isDont ? 'DON’T (주의)' : 'TIP (팁)'}
                    </span>
                    <Icon size={18} className={isDo ? 'text-emerald-600' : isDont ? 'text-rose-600' : 'text-blue-600'} />
                  </div>

                  <h4 className="text-base font-bold text-slate-900 pt-1">{tip.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Essential Real-Life Expressions with Audio */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">현지인 실전 표현 (Real-World Phrases)</h3>
            <p className="text-xs text-slate-500 font-medium">한국 문화 상황에서 자연스럽게 통하는 필수 문장</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cultureData.keyExpressions.map((expr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-blue-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-base md:text-lg font-black text-slate-900">
                    {expr.korean}
                  </div>
                  {expr.pronunciation && (
                    <div className="text-xs text-slate-400 font-medium font-mono">
                      {expr.pronunciation}
                    </div>
                  )}
                </div>

                <AudioButton
                  text={expr.korean}
                  onPlay={onPlayTTS}
                  isPlaying={speaking && currentSpeakingText === expr.korean}
                  size="sm"
                />
              </div>

              <div className="pt-2 border-t border-slate-200/60 space-y-1">
                <div className="text-xs font-bold text-rose-600">
                  {expr.meaning}
                </div>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">활용 팁</span>
                  <span className="truncate">{expr.situationTip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Fun Cultural Trivia Spotlight */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950 text-white shadow-xl border border-indigo-800/60 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 text-white/5 font-black text-8xl select-none pointer-events-none">
          톡톡
        </div>

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Lightbulb size={16} />
            </span>
            <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
              문화 톡톡 흥미로운 상식 (K-Culture Trivia)
            </span>
          </div>

          <h4 className="text-xl font-black text-white">
            {cultureData.funFact.title}
          </h4>

          <p className="text-sm text-slate-200 leading-relaxed max-w-2xl font-normal">
            {cultureData.funFact.description}
          </p>
        </div>
      </div>
    </div>
  );
};
