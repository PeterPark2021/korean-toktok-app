// src/components/dashboard/BadgeCollection.tsx
// Rich, visual Korean TokTok Achievement & Milestone Badge Collection

import React, { useState } from 'react';
import { Trophy, Sparkles, Lock, CheckCircle2, Award, Flame, BookOpen, Layers, Filter } from 'lucide-react';
import { BadgeItem, BadgeCategory, computeUserBadges } from '../../data/badges/badgeData';
import { EditionType } from '../../types';

interface BadgeCollectionProps {
  progressData: Record<string, { studied: boolean; vocabMastered: string[] }>;
  quizScoresData: Record<string, { attempts: number; bestScore: number; totalQuestions: number }>;
  streakDays: number;
  edition: EditionType;
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({
  progressData,
  quizScoresData,
  streakDays,
  edition
}) => {
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'unlocked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);

  const badges = computeUserBadges(progressData, quizScoresData, streakDays, edition);

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const totalCount = badges.length;
  const overallPercentage = Math.round((unlockedCount / totalCount) * 100);

  const filteredBadges = badges.filter((b) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'unlocked') return b.isUnlocked;
    return b.category === activeCategory;
  });

  const categories: { id: BadgeCategory | 'unlocked'; label: string; icon: any }[] = [
    { id: 'all', label: '전체 뱃지', icon: Layers },
    { id: 'unlocked', label: `획득 뱃지 (${unlockedCount})`, icon: Trophy },
    { id: 'unit', label: '단원 완주', icon: BookOpen },
    { id: 'quiz', label: '퀴즈 만점', icon: Award },
    { id: 'vocab', label: '어휘 마스터', icon: Sparkles },
    { id: 'streak', label: '연속 출석', icon: Flame }
  ];

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-6">
      {/* 1. Badge Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20">
              <Trophy size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              {edition.toUpperCase()} 완주 뱃지 컬렉션 (Badge Collection)
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            단원 완강, 어휘 마스터, 퀴즈 100점, 연속 출석을 달성하여 특별한 영예 뱃지를 수집하세요!
          </p>
        </div>

        {/* Global Badge Progress Counter */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700/80 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-slate-400 font-semibold">뱃지 획득률</div>
            <div className="text-lg font-black text-amber-400">
              {unlockedCount} <span className="text-xs text-slate-400 font-normal">/ {totalCount}개</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-400 flex items-center justify-center font-mono text-xs font-black text-amber-300 bg-amber-400/10">
            {overallPercentage}%
          </div>
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25 font-black scale-[1.02]'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700/80'
              }`}
            >
              <Icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = badge.isUnlocked;

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden group ${
                isUnlocked
                  ? `bg-gradient-to-br ${badge.gradient} ${badge.borderGlow} shadow-lg hover:scale-[1.02]`
                  : 'bg-slate-950/60 border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
              }`}
            >
              {/* Background Glow for Unlocked */}
              {isUnlocked && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none transform translate-x-10 -translate-y-10" />
              )}

              {/* Card Top */}
              <div className="flex items-start justify-between gap-3 relative z-10">
                {/* 3D Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border transition-transform duration-300 group-hover:scale-110 ${
                    isUnlocked
                      ? 'bg-white/20 border-white/30 backdrop-blur-md shadow-lg shadow-black/20'
                      : 'bg-slate-800 border-slate-700 grayscale contrast-50'
                  }`}
                >
                  {badge.icon}
                </div>

                {/* Status Badge */}
                <div>
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-xs">
                      <Sparkles size={12} className="text-amber-300" />
                      <span>달성 완료</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      <Lock size={12} />
                      <span>{badge.unlockedPercentage}% 달성 중</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-1 relative z-10">
                <div className="text-[11px] font-bold text-amber-200 uppercase tracking-wide">
                  {badge.englishName}
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-amber-200 transition-colors">
                  {badge.name}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-normal">
                  {badge.description}
                </p>
              </div>

              {/* Card Bottom Progress Bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/10 relative z-10">
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className={isUnlocked ? 'text-white' : 'text-slate-400'}>
                    {badge.requirementText}
                  </span>
                  <span className={`font-mono font-bold ${isUnlocked ? 'text-amber-300' : 'text-slate-400'}`}>
                    {Math.min(badge.currentValue, badge.targetValue)} / {badge.targetValue}
                  </span>
                </div>

                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-amber-300 to-yellow-200 shadow-sm'
                        : 'bg-gradient-to-r from-slate-600 to-slate-500'
                    }`}
                    style={{ width: `${badge.unlockedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Interactive Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className={`relative w-full max-w-md p-6 md:p-8 rounded-3xl bg-slate-900 border text-white shadow-2xl space-y-6 ${
              selectedBadge.isUnlocked ? selectedBadge.borderGlow : 'border-slate-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Icon Hero */}
            <div className="text-center space-y-3">
              <div
                className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-5xl shadow-2xl border ${
                  selectedBadge.isUnlocked
                    ? `bg-gradient-to-br ${selectedBadge.gradient} border-white/30 shadow-amber-500/25 animate-bounce-slow`
                    : 'bg-slate-800 border-slate-700 grayscale'
                }`}
              >
                {selectedBadge.icon}
              </div>

              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {selectedBadge.englishName}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedBadge.name}
                </h3>
              </div>
            </div>

            {/* Description Card */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed font-medium space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" />
                <span>뱃지 획득 조건:</span>
              </div>
              <p>{selectedBadge.description}</p>
            </div>

            {/* Progress Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>달성도</span>
                <span className="font-mono text-amber-300 font-bold">
                  {Math.min(selectedBadge.currentValue, selectedBadge.targetValue)} / {selectedBadge.targetValue} ({selectedBadge.unlockedPercentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    selectedBadge.isUnlocked
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                      : 'bg-slate-600'
                  }`}
                  style={{ width: `${selectedBadge.unlockedPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
