import React from 'react';
import { QuizItem } from '../../types';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface MultipleChoiceCardProps {
  quiz: QuizItem;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  isSubmitted: boolean;
}

export const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({
  quiz,
  selectedOption,
  onSelectOption,
  isSubmitted
}) => {
  const options = quiz.options || [];

  return (
    <div className="space-y-3 pt-2">
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isCorrect = option === quiz.answer;

        let styleClass = 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs';

        if (isSubmitted) {
          if (isCorrect) {
            styleClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 ring-2 ring-emerald-400/60 shadow-md';
          } else if (isSelected && !isCorrect) {
            styleClass = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/60 shadow-md';
          } else {
            styleClass = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
          }
        } else if (isSelected) {
          styleClass = 'bg-rose-50/80 border-rose-500 text-rose-950 ring-2 ring-rose-400/50 shadow-md';
        }

        return (
          <button
            key={index}
            type="button"
            disabled={isSubmitted}
            onClick={() => onSelectOption(option)}
            className={`w-full p-4 md:p-4.5 rounded-2xl border text-left font-bold text-sm md:text-base transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer group ${styleClass}`}
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`w-7 h-7 rounded-xl font-mono text-xs font-black flex items-center justify-center border transition-all ${
                  isSelected && !isSubmitted
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs scale-105'
                    : isSubmitted && isCorrect
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-slate-100 text-slate-600 border-slate-200 group-hover:bg-slate-200'
                }`}
              >
                {index + 1}
              </span>
              <span className="leading-snug">{option}</span>
            </div>

            {isSubmitted && (
              <div className="shrink-0 animate-in zoom-in duration-200">
                {isCorrect ? (
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-black">
                    <span>정답!</span>
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  </div>
                ) : isSelected && !isCorrect ? (
                  <div className="flex items-center gap-1 text-rose-600 text-xs font-black">
                    <span>오답</span>
                    <XCircle size={20} className="text-rose-500" />
                  </div>
                ) : null}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
