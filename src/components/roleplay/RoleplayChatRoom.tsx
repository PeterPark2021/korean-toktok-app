import React, { useState, useEffect, useRef } from 'react';
import {
  RoleplayScenario,
  RoleplayMission,
  RoleplayMessage,
  RoleplaySessionResult
} from '../../types';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Target,
  Trophy,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Award
} from 'lucide-react';
import { getSpeakerAvatar } from '../../utils/characterAvatar';
import { useAuth } from '../../contexts/AuthContext';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface RoleplayChatRoomProps {
  scenario: RoleplayScenario;
  messages: RoleplayMessage[];
  missions: RoleplayMission[];
  userTurnCount: number;
  maxTurns: number;
  isAiThinking: boolean;
  isSessionFinished: boolean;
  latestCoachingTip: string | null;
  allCoachingTips: string[];
  autoPlayTTS: boolean;
  isTTSPlaying: boolean;
  sessionResult: RoleplaySessionResult | null;
  onSendMessage: (text: string) => Promise<void>;
  onToggleAutoPlayTTS: () => void;
  onPlayAudio: (text: string) => void;
  onRestart: () => void;
  onExit: () => void;
}

export const RoleplayChatRoom: React.FC<RoleplayChatRoomProps> = ({
  scenario,
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
  onSendMessage,
  onToggleAutoPlayTTS,
  onPlayAudio,
  onRestart,
  onExit
}) => {
  const { user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aiAvatar = getSpeakerAvatar(scenario.aiPersona.avatarId || scenario.aiPersona.name);
  const userAvatar = getSpeakerAvatar(scenario.userRole || user.avatarId || 'minho');

  // Speech Recognition for STT input
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    supported: sttSupported
  } = useSpeechRecognition();

  // Sync STT transcript into input text in real-time
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking, latestCoachingTip]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isAiThinking || isSessionFinished) return;

    if (isListening) {
      stopListening();
    }

    const textToSend = inputText.trim();
    setInputText('');
    await onSendMessage(textToSend);
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening('');
    }
  };

  const handleSelectExpression = (koreanText: string) => {
    setInputText(koreanText);
    inputRef.current?.focus();
  };

  const completedMissionsCount = missions.filter((m) => m.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl h-full max-h-[92vh] rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-blue-50/40 to-white flex items-center justify-between shrink-0">
          {/* Persona Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <img
                src={aiAvatar.avatarUrl}
                alt={scenario.aiPersona.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-blue-400 shadow-sm"
              />
              {isTTSPlaying && (
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-600" />
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-sm truncate">
                  {scenario.aiPersona.name} ({scenario.aiPersona.role})
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-700 shrink-0">
                  {scenario.categoryName}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate font-medium">
                {scenario.situation}
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio Auto-play Toggle */}
            <button
              type="button"
              onClick={onToggleAutoPlayTTS}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                autoPlayTTS
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
              title={autoPlayTTS ? '음성 자동 듣기 켜짐' : '음성 자동 듣기 꺼짐'}
            >
              {autoPlayTTS ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Restart Session Button */}
            <button
              type="button"
              onClick={onRestart}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition-all cursor-pointer"
              title="대화 처음부터 다시 시작"
            >
              <RotateCcw size={16} />
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onExit}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              title="종료하기"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Turn Progress & Missions Bar */}
        <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shrink-0">
          {/* Turn Counter with Pills */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 text-[11px]">
              대화 턴: <span className="text-blue-600 font-black">{userTurnCount}</span> / {maxTurns}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: maxTurns }).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx < userTurnCount
                      ? 'w-4 bg-blue-600'
                      : idx === userTurnCount
                      ? 'w-4 bg-blue-300 animate-pulse'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Missions Collapsible Trigger */}
          <button
            type="button"
            onClick={() => setIsMissionsOpen((prev) => !prev)}
            className="flex items-center gap-1.5 font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Target size={14} className="text-rose-500" />
            <span>
              미션 달성 ({completedMissionsCount}/{missions.length})
            </span>
            {isMissionsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Collapsible Mission Checklist Tray */}
        {isMissionsOpen && (
          <div className="p-3.5 bg-gradient-to-br from-slate-50 to-blue-50/40 border-b border-slate-200 text-xs space-y-2 animate-in slide-in-from-top-2 duration-200 shrink-0">
            <div className="font-bold text-slate-700 flex items-center justify-between">
              <span>🎯 이번 롤플레이 미션 목록</span>
              <span className="text-[11px] text-blue-600 font-medium">
                대화 중 자연스럽게 표현을 사용해 보세요!
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={`p-2 rounded-xl border flex items-start gap-2 transition-all ${
                    m.completed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <CheckCircle2
                    size={15}
                    className={`shrink-0 mt-0.5 ${
                      m.completed ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className={`font-bold text-[11px] ${m.completed ? 'line-through text-emerald-800' : ''}`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-slate-50/30 via-white to-slate-50/30">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 items-end ${isAi ? 'justify-start' : 'justify-end'} animate-in fade-in duration-200`}
              >
                {/* AI Avatar */}
                {isAi && (
                  <img
                    src={aiAvatar.avatarUrl}
                    alt={scenario.aiPersona.name}
                    className="w-8 h-8 rounded-full object-cover border border-blue-200 shrink-0 mb-1"
                  />
                )}

                {/* Bubble Container */}
                <div className={`max-w-[82%] sm:max-w-[75%] space-y-1.5 ${isAi ? 'items-start' : 'items-end'}`}>
                  {/* Sender Name */}
                  <div className={`text-[10px] font-bold text-slate-400 px-1 ${isAi ? 'text-left' : 'text-right'}`}>
                    {isAi ? `${scenario.aiPersona.name} (${scenario.aiPersona.role})` : `${scenario.userRole} (${user.name || '나'})`}
                  </div>

                  {/* Speech Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-xs relative group ${
                      isAi
                        ? 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-blue-500/20'
                    }`}
                  >
                    <div>{msg.text}</div>

                    {/* Translation if available */}
                    {msg.translation && (
                      <div className="text-[11px] text-slate-400 font-normal pt-1 border-t border-slate-100 mt-1">
                        {msg.translation}
                      </div>
                    )}

                    {/* AI TTS Audio Button */}
                    {isAi && (
                      <button
                        type="button"
                        onClick={() => onPlayAudio(msg.text)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                        title="원음 다시 듣기"
                      >
                        <Volume2 size={12} />
                        <span>듣기</span>
                      </button>
                    )}
                  </div>

                  {/* Real-time Coaching Tip if attached */}
                  {msg.coachingTip && (
                    <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-900 space-y-0.5 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1 text-amber-800">
                        <Lightbulb size={13} className="text-amber-600" />
                        <span>원어민 표현 코칭:</span>
                      </div>
                      <p className="font-medium leading-normal">{msg.coachingTip}</p>
                    </div>
                  )}
                </div>

                {/* User Avatar */}
                {!isAi && (
                  <img
                    src={userAvatar.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-blue-300 shrink-0 mb-1"
                  />
                )}
              </div>
            );
          })}

          {/* AI Thinking Animation */}
          {isAiThinking && (
            <div className="flex gap-2.5 items-end justify-start animate-in fade-in">
              <img
                src={aiAvatar.avatarUrl}
                alt={scenario.aiPersona.name}
                className="w-8 h-8 rounded-full object-cover border border-blue-200 shrink-0 mb-1"
              />
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 rounded-bl-xs shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[11px] font-bold text-slate-400 ml-1">생각하는 중...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Latest Real-Time Coaching Tip Flash */}
        {latestCoachingTip && (
          <div className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2 shrink-0 animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-1.5 min-w-0 font-medium">
              <Sparkles size={14} className="text-amber-600 shrink-0" />
              <span className="truncate">{latestCoachingTip}</span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-white px-1.5 py-0.5 rounded-md border border-amber-200 shrink-0">
              실시간 피드백
            </span>
          </div>
        )}

        {/* Suggested Quick Expression Chips */}
        {!isSessionFinished && scenario.suggestedExpressions.length > 0 && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[10px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Lightbulb size={12} />
              <span>추천 표현:</span>
            </span>
            {scenario.suggestedExpressions.map((expr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectExpression(expr.korean)}
                className="text-[11px] font-medium text-slate-700 hover:text-blue-600 bg-white hover:bg-blue-50/70 px-2.5 py-1 rounded-full border border-slate-200 hover:border-blue-200 transition-all shrink-0 cursor-pointer shadow-2xs"
                title={expr.meaning}
              >
                {expr.korean}
              </button>
            ))}
          </div>
        )}

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-white shrink-0">
          {isSessionFinished ? (
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
              <p className="text-xs font-bold text-blue-900">
                🎉 7턴 대화가 모두 완료되었습니다! 수고하셨습니다.
              </p>
              <button
                type="button"
                onClick={onRestart}
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                <RotateCcw size={13} />
                <span>처음부터 다시 연습하기</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex items-center gap-2">
              {/* STT Voice Input Button */}
              {sttSupported && (
                <button
                  type="button"
                  onClick={handleToggleMic}
                  className={`p-3 rounded-2xl transition-all cursor-pointer shrink-0 ${
                    isListening
                      ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  title={isListening ? '음성 듣는 중 (완료 시 클릭)' : '한국어로 말하기 (음성 입력)'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              )}

              {/* Text Input */}
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isListening
                    ? '한국어로 말씀하세요...'
                    : `한국어로 자연스럽게 대답해 보세요 (${userTurnCount + 1}/${maxTurns}턴)`
                }
                disabled={isAiThinking}
                className="flex-1 py-3 px-4 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none transition-all"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isAiThinking}
                className={`p-3 rounded-2xl transition-all shrink-0 cursor-pointer ${
                  inputText.trim() && !isAiThinking
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 active:scale-95'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          )}
        </div>

        {/* 7-Turn Completion Review Modal */}
        {sessionResult && isSessionFinished && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in zoom-in-95 duration-200">
            <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 text-center space-y-5 max-h-[85vh] overflow-y-auto">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <Trophy size={32} />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">롤플레이 완료! 🎉</h3>
                <p className="text-xs text-slate-500 mt-1">
                  7턴의 실전 대화를 성공적으로 마쳤습니다.
                </p>
              </div>

              {/* Score & XP Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
                  <div className="text-[11px] font-bold text-emerald-700">미션 달성</div>
                  <div className="text-lg font-black text-emerald-900 mt-0.5">
                    {sessionResult.completedMissionsCount} / {sessionResult.totalMissionsCount}개
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-left">
                  <div className="text-[11px] font-bold text-blue-700">획득 경험치</div>
                  <div className="text-lg font-black text-blue-900 mt-0.5">
                    +{sessionResult.xpEarned} XP
                  </div>
                </div>
              </div>

              {/* Collected Coaching Tips Summary */}
              {sessionResult.coachingTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Award size={14} className="text-amber-500" />
                    <span>오늘 학습한 원어민 표현 피드백:</span>
                  </div>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {sessionResult.coachingTips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200/80 leading-relaxed font-medium"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onRestart}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>다시 도전하기</span>
                </button>
                <button
                  type="button"
                  onClick={onExit}
                  className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  시나리오 목록으로
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
