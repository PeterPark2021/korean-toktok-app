import React, { useEffect, useState } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle, AlertCircle, X, Sparkles, HelpCircle, Check, AlertTriangle } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { DialogueItem } from '../../types';
import { AlignedCharacter } from '../../utils/pronunciationAnalysis';

interface SpeechPracticeModalProps {
  dialogue: DialogueItem | null;
  onClose: () => void;
  onPlayTTS: (text: string) => void;
  isTTSPlaying: boolean;
}

export const SpeechPracticeModal: React.FC<SpeechPracticeModalProps> = ({
  dialogue,
  onClose,
  onPlayTTS,
  isTTSPlaying
}) => {
  const {
    isListening,
    transcript,
    accuracy,
    supported,
    analysis,
    startListening,
    stopListening,
    resetRecognition,
    feedbackMessage
  } = useSpeechRecognition();

  const [selectedCharToken, setSelectedCharToken] = useState<AlignedCharacter | null>(null);

  useEffect(() => {
    resetRecognition();
    setSelectedCharToken(null);
  }, [dialogue, resetRecognition]);

  if (!dialogue) return null;

  const handleToggleRecord = () => {
    setSelectedCharToken(null);
    if (isListening) {
      stopListening();
    } else {
      startListening(dialogue.korean_text);
    }
  };

  const handleCharClick = (token: AlignedCharacter) => {
    if (token.status === 'space' || token.status === 'punctuation') return;
    setSelectedCharToken(token);
    onPlayTTS(token.expectedChar);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-rose-50 via-orange-50/50 to-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500 text-white rounded-xl shadow-md shadow-rose-500/20">
              <Mic size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">한국어 발음 정밀 평가 (Shadowing)</h3>
              <p className="text-xs text-slate-500">음소 단위 실시간 발음 오류 분석 및 맞춤 교정</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Target Sentence Card */}
          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full">
                화자: {dialogue.speaker}
              </span>
              <button
                onClick={() => onPlayTTS(dialogue.korean_text)}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-white px-2.5 py-1 rounded-full border border-rose-200 shadow-xs cursor-pointer active:scale-95"
              >
                <Volume2 size={14} className={isTTSPlaying ? 'animate-bounce' : ''} />
                <span>원문 듣기</span>
              </button>
            </div>

            <div className="text-lg font-black text-slate-900 leading-snug">
              "{dialogue.korean_text}"
            </div>

            <div className="text-xs text-slate-500 font-medium">
              {dialogue.translation}
            </div>

            {dialogue.audio_hint && (
              <div className="text-xs text-amber-700 bg-amber-50/80 px-2.5 py-1.5 rounded-xl border border-amber-200/60 flex items-center gap-1.5">
                <Sparkles size={13} className="shrink-0" />
                <span>억양 팁: {dialogue.audio_hint}</span>
              </div>
            )}
          </div>

          {/* Speech Recognition Area */}
          {!supported ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                현재 브라우저에서는 음성 인식(Web Speech API)을 지원하지 않습니다. 
                Google Chrome 또는 Microsoft Edge 브라우저를 이용해 주세요.
              </div>
            </div>
          ) : (
            <div className="space-y-5 text-center">
              {/* Record Action Button */}
              <div className="flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleRecord}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 ring-8 ring-rose-300/60 animate-pulse scale-105'
                      : 'bg-gradient-to-tr from-rose-500 to-orange-400 hover:scale-105 active:scale-95 shadow-rose-500/30'
                  }`}
                >
                  {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
                <span className="text-xs font-bold text-slate-600">
                  {isListening ? '듣고 있는 중... (완료 후 버튼 클릭)' : '마이크를 누르고 한국어로 말하세요'}
                </span>
              </div>

              {/* 1. Character-by-Character Precision Error Highlighting */}
              {analysis && analysis.tokens.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Sparkles size={14} className="text-rose-500" />
                      <span>글자별 정밀 발음 교정</span>
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>정확 ({analysis.correctCount})</span>
                      </span>
                      <span className="flex items-center gap-1 text-rose-700">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>오류 ({analysis.incorrectCount})</span>
                      </span>
                      {analysis.missingCount > 0 && (
                        <span className="flex items-center gap-1 text-amber-700">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>누락 ({analysis.missingCount})</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Character Highlight Badges */}
                  <div className="flex flex-wrap gap-1.5 p-3 bg-white rounded-xl border border-slate-200">
                    {analysis.tokens.map((token, idx) => {
                      if (token.status === 'space') {
                        return <span key={idx} className="w-2" />;
                      }
                      if (token.status === 'punctuation') {
                        return (
                          <span key={idx} className="text-sm font-bold text-slate-400 self-center px-0.5">
                            {token.expectedChar}
                          </span>
                        );
                      }

                      const isSelected = selectedCharToken?.index === token.index;

                      if (token.status === 'correct') {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleCharClick(token)}
                            className={`flex flex-col items-center px-2 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 transition-all cursor-pointer ${
                              isSelected ? 'ring-2 ring-emerald-500 scale-105 shadow-xs' : 'hover:bg-emerald-100/70'
                            }`}
                            title="정확한 발음 (클릭 시 원음 듣기)"
                          >
                            <span className="text-base font-black">{token.expectedChar}</span>
                            <span className="text-[9px] font-bold text-emerald-600">✓</span>
                          </button>
                        );
                      }

                      if (token.status === 'incorrect') {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleCharClick(token)}
                            className={`flex flex-col items-center px-2 py-1 rounded-xl bg-rose-50 border-2 border-rose-400 text-rose-950 transition-all cursor-pointer animate-in fade-in ${
                              isSelected
                                ? 'ring-2 ring-rose-500 scale-105 shadow-md bg-rose-100'
                                : 'hover:bg-rose-100/80 shadow-xs'
                            }`}
                            title={`발음 오류: '${token.expectedChar}' ➡️ 인식: '${token.spokenChar || '?'}' (클릭 시 교정 팁)`}
                          >
                            <span className="text-base font-black text-rose-700">{token.expectedChar}</span>
                            <span className="text-[9px] font-bold text-rose-500 bg-rose-200/80 px-1 rounded-xs">
                              {token.spokenChar ? `→ ${token.spokenChar}` : '오류'}
                            </span>
                          </button>
                        );
                      }

                      // Missing
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleCharClick(token)}
                          className={`flex flex-col items-center px-2 py-1 rounded-xl bg-amber-50 border border-dashed border-amber-400 text-amber-900 transition-all cursor-pointer ${
                            isSelected ? 'ring-2 ring-amber-500 scale-105' : 'hover:bg-amber-100/70'
                          }`}
                          title={`누락된 발음: '${token.expectedChar}'`}
                        >
                          <span className="text-base font-black text-amber-700">{token.expectedChar}</span>
                          <span className="text-[9px] font-bold text-amber-600">누락</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Character Phoneme Correction Guide */}
                  {selectedCharToken && selectedCharToken.status !== 'correct' && (
                    <div className="p-3.5 rounded-xl bg-rose-50/90 border border-rose-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between font-bold text-rose-900">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle size={14} className="text-rose-500" />
                          <span>
                            '{selectedCharToken.expectedChar}' 글자 정밀 교정 (
                            {selectedCharToken.jamoDiff ? selectedCharToken.jamoDiff.part : '발음'})
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onPlayTTS(selectedCharToken.expectedChar)}
                          className="flex items-center gap-1 text-[11px] bg-white px-2 py-0.5 rounded-md border border-rose-200 shadow-2xs text-rose-700 cursor-pointer"
                        >
                          <Volume2 size={12} />
                          <span>단자 발음 듣기</span>
                        </button>
                      </div>
                      <p className="text-rose-800 leading-relaxed font-medium">
                        {selectedCharToken.phoneticTip}
                      </p>
                    </div>
                  )}

                  {/* Actionable Phonetic Tips List */}
                  {analysis.actionableTips.length > 0 && !selectedCharToken && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold text-slate-600">💡 주요 발음 교정 포인트:</div>
                      {analysis.actionableTips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="text-xs font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2"
                        >
                          <span className="text-rose-500 font-bold shrink-0">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Overall Accuracy Meter */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-1.5">
                      <span>종합 발음 일치도:</span>
                      <span
                        className={`text-sm font-black ${
                          analysis.score >= 80
                            ? 'text-emerald-600'
                            : analysis.score >= 50
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {analysis.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          analysis.score >= 80
                            ? 'bg-emerald-500'
                            : analysis.score >= 50
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${analysis.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Raw Recognized Transcript */}
              {transcript && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1">
                  <span className="font-semibold text-slate-500">실시간 인식 음성:</span>
                  <div className="font-bold text-slate-800">"{transcript}"</div>
                  {feedbackMessage && (
                    <div className="text-xs font-bold text-slate-700 pt-1">
                      {feedbackMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              resetRecognition();
              setSelectedCharToken(null);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>초기화</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

