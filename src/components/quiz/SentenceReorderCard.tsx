import React, { useState, useEffect, useMemo } from 'react';
import { QuizItem } from '../../types';
import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

interface SentenceReorderCardProps {
  quiz: QuizItem;
  currentArrangement: string[];
  onChangeArrangement: (tokens: string[]) => void;
  isSubmitted: boolean;
}

export const SentenceReorderCard: React.FC<SentenceReorderCardProps> = ({
  quiz,
  currentArrangement,
  onChangeArrangement,
  isSubmitted
}) => {
  // Extract token words from options or question text: [ token1 / token2 / ... ] or fallback
  const initialTokens = useMemo(() => {
    if (Array.isArray(quiz.options) && quiz.options.length > 0) {
      return [...quiz.options];
    }
    const match = quiz.question.match(/\[\s*(.+?)\s*\]/);
    if (match && match[1]) {
      return match[1].split('/').map((t) => t.trim()).filter(Boolean);
    }
    if (quiz.answer) {
      const words = quiz.answer.trim().split(/\s+/).filter(Boolean);
      return [...words].sort(() => 0.5 - Math.random());
    }
    return [];
  }, [quiz.question, quiz.options, quiz.answer]);

  const [availableTokens, setAvailableTokens] = useState<string[]>(initialTokens);

  useEffect(() => {
    // Reset available tokens based on currentArrangement
    const remaining = [...initialTokens];
    currentArrangement.forEach((item) => {
      const idx = remaining.indexOf(item);
      if (idx !== -1) {
        remaining.splice(idx, 1);
      }
    });
    setAvailableTokens(remaining);
  }, [initialTokens, currentArrangement]);

  const handlePickToken = (token: string, indexInAvailable: number) => {
    if (isSubmitted) return;
    const newArrangement = [...currentArrangement, token];
    onChangeArrangement(newArrangement);
  };

  const handleRemoveToken = (token: string, indexInArrangement: number) => {
    if (isSubmitted) return;
    const newArrangement = [...currentArrangement];
    newArrangement.splice(indexInArrangement, 1);
    onChangeArrangement(newArrangement);
  };

  const handleReset = () => {
    if (isSubmitted) return;
    onChangeArrangement([]);
    setAvailableTokens(initialTokens);
  };

  const assembledSentence = currentArrangement
    .join(' ')
    .replace(/\s+\./g, '.')
    .replace(/\s+\?/g, '?')
    .replace(/\s+\!/g, '!');

  const cleanAssembled = assembledSentence.replace(/\s+/g, '');
  const cleanAnswer = quiz.answer.replace(/\s+/g, '');
  const isCorrect = cleanAssembled === cleanAnswer;

  return (
    <div className="space-y-4 pt-2">
      {/* Target Assembly Slot */}
      <div
        className={`min-h-[90px] p-4 rounded-2xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
          isSubmitted
            ? isCorrect
              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-900'
              : 'bg-rose-50/80 border-rose-400 text-rose-900'
            : currentArrangement.length > 0
            ? 'bg-white border-rose-300 shadow-xs'
            : 'bg-slate-50/80 border-slate-300 text-slate-400'
        }`}
      >
        {currentArrangement.length === 0 ? (
          <span className="text-xs md:text-sm font-medium text-slate-400 select-none">
            아래 단어 카드를 클릭하여 문장을 순서대로 완성하세요
          </span>
        ) : (
          currentArrangement.map((token, idx) => (
            <button
              key={`placed-${token}-${idx}`}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleRemoveToken(token, idx)}
              className={`px-3 py-1.5 rounded-xl font-bold text-sm shadow-xs transition-transform active:scale-95 cursor-pointer ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                    : 'bg-rose-200 text-rose-900 border border-rose-300'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`}
            >
              {token}
            </button>
          ))
        )}
      </div>

      {/* Available Token Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>제시된 단어 목록</span>
          {!isSubmitted && currentArrangement.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>다시 배치</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 min-h-[56px] items-center">
          {availableTokens.length === 0 ? (
            <span className="text-xs text-slate-400 font-medium italic">
              모든 단어가 문장에 배치되었습니다
            </span>
          ) : (
            availableTokens.map((token, idx) => (
              <button
                key={`avail-${token}-${idx}`}
                type="button"
                disabled={isSubmitted}
                onClick={() => handlePickToken(token, idx)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:border-rose-300 hover:bg-rose-50 text-slate-800 font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                {token}
              </button>
            ))
          )}
        </div>
      </div>

      {isSubmitted && !isCorrect && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-start gap-2">
          <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
          <div>
            <div>정답 문장:</div>
            <div className="font-bold text-sm text-rose-800 mt-0.5">{quiz.answer}</div>
          </div>
        </div>
      )}
    </div>
  );
};
