import React, { useState } from 'react';
import { ROLEPLAY_SCENARIOS } from '../data/roleplay/roleplayScenarios';
import { RoleplayScenario, RoleplayCategory } from '../types';
import { RoleplayCard } from '../components/roleplay/RoleplayCard';
import { RoleplayChatRoom } from '../components/roleplay/RoleplayChatRoom';
import { useRoleplay } from '../hooks/useRoleplay';
import {
  Sparkles,
  MessageSquare,
  Search,
  Bot,
  Flame,
  Filter,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';

export const RoleplayPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    scenario: activeScenario,
    messages,
    missions,
    userTurnCount,
    maxTurns,
    isAiThinking,
    isSessionFinished,
    latestCoachingTip,
    allCoachingTips,
    autoPlayTTS,
    isTTSPlaying,
    sessionResult,
    startScenario,
    sendMessage,
    toggleAutoPlayTTS,
    playMessageAudio,
    restartSession,
    exitSession
  } = useRoleplay();

  // Categories list
  const categories = [
    { id: 'all', label: '전체 상황' },
    { id: 'restaurant', label: '🍲 식당/맛집' },
    { id: 'hospital', label: '🩺 병원/약국' },
    { id: 'cafe', label: '☕ 카페' },
    { id: 'real_estate', label: '🏠 부동산/원룸' },
    { id: 'market', label: '🍓 전통시장' },
    { id: 'office', label: '💼 직장/업무' },
    { id: 'transport', label: '🚕 택시/교통' },
    { id: 'public', label: '🏛️ 주민센터' }
  ];

  const levels = [
    { id: 'all', label: '전체 레벨' },
    { id: '초급', label: '초급' },
    { id: '중급', label: '중급' },
    { id: '고급', label: '고급' }
  ];

  // Filtered scenarios
  const filteredScenarios = ROLEPLAY_SCENARIOS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSituation = item.situation.toLowerCase().includes(q);
      const matchPersona = item.aiPersona.name.toLowerCase().includes(q) || item.aiPersona.role.toLowerCase().includes(q);
      if (!matchTitle && !matchSituation && !matchPersona) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white relative overflow-hidden shadow-xl shadow-blue-500/15">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black">
            <Sparkles size={14} className="text-amber-300" />
            <span>실시간 프리토킹 AI 롤플레이 (Gemini Live)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
            교재를 넘어, <br className="hidden sm:inline" />
            진짜 한국인과 나누는 실전 회화 롤플레이
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed font-medium">
            "식당에서 반찬 더 달라고 하기", "병원에서 감기 증상 설명하기" 등 8개 실생활 상황에서
            음성 또는 채팅으로 자유롭게 대화하세요. 실시간 원어민식 표현 코칭과 미션 보상이 함께합니다!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-blue-200">
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
              <Clock size={14} />
              <span>화자별 최대 7턴 제한</span>
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
              <Bot size={14} />
              <span>실시간 원어민 표현 코칭</span>
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
              <Compass size={14} />
              <span>음성(STT/TTS) 완벽 지원</span>
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Level Filters & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Level Filter */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200/80 shadow-2xs self-start">
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-xs">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="상황, 장소, 역할 검색..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-2xl text-xs font-medium focus:outline-none focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      {filteredScenarios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredScenarios.map((scenario) => (
            <RoleplayCard
              key={scenario.id}
              scenario={scenario}
              onSelect={(sc) => startScenario(sc)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <MessageSquare size={24} />
          </div>
          <p className="text-sm font-bold text-slate-700">해당 조건에 맞는 시나리오가 없습니다.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            필터 초기화하기
          </button>
        </div>
      )}

      {/* Active Roleplay Chat Room Modal */}
      {activeScenario && (
        <RoleplayChatRoom
          scenario={activeScenario}
          messages={messages}
          missions={missions}
          userTurnCount={userTurnCount}
          maxTurns={maxTurns}
          isAiThinking={isAiThinking}
          isSessionFinished={isSessionFinished}
          latestCoachingTip={latestCoachingTip}
          allCoachingTips={allCoachingTips}
          autoPlayTTS={autoPlayTTS}
          isTTSPlaying={isTTSPlaying}
          sessionResult={sessionResult}
          onSendMessage={sendMessage}
          onToggleAutoPlayTTS={toggleAutoPlayTTS}
          onPlayAudio={playMessageAudio}
          onRestart={restartSession}
          onExit={exitSession}
        />
      )}
    </div>
  );
};
