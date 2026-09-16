import React, { useEffect } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { DialogueItem } from '../../types';

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
    startListening,
    stopListening,
    resetRecognition,
    feedbackMessage
  } = useSpeechRecognition();

  useEffect(() => {
    resetRecognition();
  }, [dialogue, resetRecognition]);

  if (!dialogue) return null;

  const handleToggleRecord = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(dialogue.korean_text);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-rose-50 via-orange-50/50 to-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500 text-white rounded-xl shadow-md shadow-rose-500/20">
              <Mic size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">한국어 발음 따라 읽기 (Shadowing)</h3>
              <p className="text-xs text-slate-500">원어민 발음을 듣고 마이크로 직접 말해보세요</p>
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
        <div className="p-6 space-y-6">
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
            <div className="space-y-4 text-center">
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

              {/* Transcript & Accuracy Feedback */}
              {transcript && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2">
                  <div className="text-xs font-semibold text-slate-500">인식된 발음:</div>
                  <div className="text-sm font-bold text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200/80">
                    "{transcript}"
                  </div>

                  {accuracy !== null && (
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-700">일치도:</span>
                        <span
                          className={`text-sm font-black ${
                            accuracy >= 80
                              ? 'text-emerald-600'
                              : accuracy >= 50
                              ? 'text-amber-600'
                              : 'text-rose-600'
                          }`}
                        >
                          {accuracy}%
                        </span>
                      </div>
                      <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            accuracy >= 80
                              ? 'bg-emerald-500'
                              : accuracy >= 50
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {feedbackMessage && (
                    <div className="text-xs font-bold text-slate-700 pt-1 flex items-center gap-1">
                      <span>{feedbackMessage}</span>
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
            onClick={resetRecognition}
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
