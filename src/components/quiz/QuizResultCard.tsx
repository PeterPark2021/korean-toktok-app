import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, Sparkles, BookOpen } from 'lucide-react';
import { QuizItem } from '../../types';

interface QuizResultCardProps {
  score: number;
  totalQuestions: number;
  quizList: QuizItem[];
  userAnswers: Record<string, any>;
  onRetry: () => void;
  onGoToStudy: () => void;
  unitNumber: number;
}

export const QuizResultCard: React.FC<QuizResultCardProps> = ({
  score,
  totalQuestions,
  quizList,
  userAnswers,
  onRetry,
  onGoToStudy,
  unitNumber
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 70;

  useEffect(() => {
    if (percentage >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Result Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-white via-rose-50/40 to-orange-50/50 border border-slate-200/90 shadow-xl text-center space-y-5">
        <div className="inline-flex p-4 bg-gradient-to-tr from-rose-500 to-orange-400 rounded-3xl text-white shadow-lg shadow-rose-500/30">
          <Trophy size={40} />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            {percentage === 100
              ? '🎉 완벽합니다! 만점 달성!'
              : isPassed
              ? '👏 축하합니다! 단원 테스트 통과!'
              : '💪 조금만 더 복습해 볼까요?'}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Unit {unitNumber} 퀴즈 풀이 결과 리포트
          </p>
        </div>

        {/* Score Ring / Badge */}
        <div className="flex items-center justify-center gap-6 py-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-[120px]">
            <div className="text-3xl font-black text-rose-600">{score} / {totalQuestions}</div>
            <div className="text-xs text-slate-500 font-bold mt-0.5">맞힌 문항 수</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs min-w-[120px]">
            <div
              className={`text-3xl font-black ${
                percentage >= 80
                  ? 'text-emerald-600'
                  : isPassed
                  ? 'text-sky-600'
                  : 'text-amber-600'
              }`}
            >
              {percentage}%
            </div>
            <div className="text-xs text-slate-500 font-bold mt-0.5">정답률</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw size={16} />
            <span>다시 풀기</span>
          </button>

          <button
            onClick={onGoToStudy}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <BookOpen size={16} />
            <span>단원 복습하기</span>
          </button>
        </div>
      </div>

      {/* Review Questions Breakdown */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 px-1">
          <Sparkles size={16} className="text-rose-500" />
          <span>문항별 채점 및 해설 복습</span>
        </h3>

        <div className="space-y-3">
          {quizList.map((quiz, idx) => {
            const userAns = userAnswers[quiz.quiz_id];
            let isCorrect = false;

            if (quiz.type === 'multiple_choice') {
              isCorrect = userAns === quiz.answer;
            } else if (quiz.type === 'fill_in_the_blank') {
              isCorrect = (userAns || '').trim().toLowerCase() === quiz.answer.trim().toLowerCase();
            } else if (quiz.type === 'sentence_reordering') {
              const cleanUser = ((userAns as string[]) || []).join('').replace(/[\s.,?!]/g, '');
              const cleanAns = quiz.answer.replace(/[\s.,?!]/g, '');
              isCorrect = cleanUser === cleanAns;
            }

            return (
              <div
                key={quiz.quiz_id}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="font-bold text-slate-900 text-sm md:text-base leading-snug whitespace-pre-line">
                      {quiz.question}
                    </div>
                  </div>
                  {isCorrect ? (
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-rose-500 shrink-0" />
                  )}
                </div>

                {/* Answers Comparison */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-semibold">정답:</span>
                    <span className="font-bold text-emerald-700">{quiz.answer}</span>
                  </div>
                  {!isCorrect && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">제출한 답:</span>
                      <span className="font-bold text-rose-600">
                        {Array.isArray(userAns) ? userAns.join(' ') : userAns || '(미입력)'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Grammar Explanation */}
                <div className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-2xl border border-amber-100 leading-relaxed">
                  <span className="font-bold text-amber-800">문법 해설: </span>
                  {quiz.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
