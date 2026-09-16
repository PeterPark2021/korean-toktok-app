import React from 'react';
import { QuizItem } from '../../types';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface FillInBlankCardProps {
  quiz: QuizItem;
  inputAnswer: string;
  onChangeInput: (val: string) => void;
  isSubmitted: boolean;
}

export const FillInBlankCard: React.FC<FillInBlankCardProps> = ({
  quiz,
  inputAnswer,
  onChangeInput,
  isSubmitted
}) => {
  const isCorrect = inputAnswer.trim().toLowerCase() === quiz.answer.trim().toLowerCase();

  return (
    <div className="space-y-4 pt-2">
      <div className="relative">
        <input
          type="text"
          value={inputAnswer}
          disabled={isSubmitted}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder="빈칸에 들어갈 정답을 입력하세요"
          className={`w-full p-4 rounded-2xl border text-base md:text-lg font-bold transition-all focus:outline-none ${
            isSubmitted
              ? isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300'
                : 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300'
              : 'bg-white border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
          }`}
        />

        {isSubmitted && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isCorrect ? (
              <CheckCircle2 size={24} className="text-emerald-500" />
            ) : (
              <XCircle size={24} className="text-rose-500" />
            )}
          </div>
        )}
      </div>

      {isSubmitted && !isCorrect && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold flex items-center gap-2">
          <span>정답:</span>
          <span className="font-bold text-sm text-rose-700 bg-white px-2.5 py-0.5 rounded-lg border border-rose-200">
            {quiz.answer}
          </span>
        </div>
      )}
    </div>
  );
};
