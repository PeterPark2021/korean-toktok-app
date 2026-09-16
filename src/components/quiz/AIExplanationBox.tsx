import React, { useState } from 'react';
import { Sparkles, Bot, Loader2, Key, Check, ChevronDown } from 'lucide-react';
import { QuizItem } from '../../types';
import { fetchAIExplanation } from '../../services/aiExplanation';

interface AIExplanationBoxProps {
  quiz: QuizItem;
  userAnswer?: string | string[];
}

export const AIExplanationBox: React.FC<AIExplanationBoxProps> = ({
  quiz,
  userAnswer
}) => {
  const [aiText, setAiText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => {
    return (
      (typeof window !== 'undefined' && localStorage.getItem('gemini_api_key')) ||
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      ''
    );
  });

  const handleRequestAI = async () => {
    setLoading(true);
    try {
      const explanation = await fetchAIExplanation({ quiz, userAnswer });
      setAiText(explanation);
    } catch (e) {
      setAiText('AI 설명을 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', apiKeyInput.trim());
      setShowKeyModal(false);
    }
  };

  return (
    <div className="space-y-3 pt-1">
      {!aiText ? (
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleRequestAI}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Gemini AI가 쉬운 비유로 설명 준비 중...</span>
              </>
            ) : (
              <>
                <Bot size={16} />
                <span>🤖 더 쉽게 설명해줘 (Gemini AI 비유 해설)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors text-xs font-medium cursor-pointer"
            title="Gemini API 키 설정 (선택)"
          >
            <Key size={14} />
          </button>
        </div>
      ) : (
        <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-teal-50/80 border border-blue-200/80 text-slate-900 shadow-sm space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-xl shadow-xs">
                <Bot size={16} />
              </div>
              <span className="font-extrabold text-xs text-blue-900">
                Google Gemini AI 문법 튜터의 쉬운 비유 해설
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAiText(null)}
              className="text-[11px] text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              접기
            </button>
          </div>

          <div className="text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium bg-white/80 p-4 rounded-2xl border border-blue-100/80 shadow-xs">
            {aiText}
          </div>
        </div>
      )}

      {/* Optional Gemini API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Key size={18} />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Google Gemini API 키 설정 (선택)</h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              API 키가 없어도 내장된 인텔리전트 AI 튜터가 즉시 쉬운 비유를 제공합니다. 직접 Google
              AI Studio의 최신 Gemini 모델(Gemini 1.5/2.0 Flash)로 실시간 생성하려면 개인 API 키(<code>AIzaSy...</code>)를 입력하세요.
            </p>

            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-3 bg-slate-50 rounded-xl text-xs font-mono border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveKey}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
