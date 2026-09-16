import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { HANGUL_QUIZ_QUESTIONS } from '../../data/hangul';
import { useTTS } from '../../hooks/useTTS';

export const HangulQuizViewer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const { speak, speaking } = useTTS();
  const currentQuestion = HANGUL_QUIZ_QUESTIONS[currentIndex];

  const handlePlayPrompt = () => {
    if (currentQuestion) {
      speak(currentQuestion.audioPrompt);
    }
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < HANGUL_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  if (isQuizCompleted) {
    const percentage = Math.round((score / HANGUL_QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Award size={40} />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">
            한글 자모 & 받침 퀴즈 완료! 🎉
          </h3>
          <p className="text-xs text-slate-500">
            교재 예비편의 모든 소리 구별 문제를 풀었습니다.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 space-y-2">
          <div className="text-sm font-bold text-slate-600">최종 득점</div>
          <div className="text-5xl font-black text-blue-600">
            {score} <span className="text-2xl font-bold text-slate-400">/ {HANGUL_QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="text-xs font-extrabold text-blue-800">
            정답률: {percentage}% ({percentage >= 80 ? '🏆 훌륭합니다! 한글 완벽 마스터!' : '💪 조금만 더 연습해 보세요!'})
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestartQuiz}
          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw size={16} />
          <span>퀴즈 다시 풀기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Bar & Counter */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
        <span className="flex items-center gap-1.5">
          <HelpCircle size={15} className="text-blue-600" />
          <span>문제 {currentIndex + 1} / {HANGUL_QUIZ_QUESTIONS.length}</span>
        </span>
        <span className="text-blue-600">현재 점수: {score}점</span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / HANGUL_QUIZ_QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
        {/* Question Header & Audio Trigger */}
        <div className="space-y-4 text-center">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
            {currentQuestion.type === 'sound_discrimination' ? '👂 발음 구별 훈련' : '🧱 받침 소리 찾기'}
          </span>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Big Audio Play Button */}
          <div className="py-2">
            <button
              type="button"
              onClick={handlePlayPrompt}
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <Volume2 size={22} className={speaking ? 'animate-bounce' : ''} />
              <span>음성 듣기 (다시 듣기)</span>
            </button>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQuestion.answer;

            let btnStyle =
              'bg-slate-50 hover:bg-blue-50/50 border-slate-200 text-slate-800 hover:border-blue-300';

            if (isSelected && !isAnswerSubmitted) {
              btnStyle = 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]';
            } else if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/25 scale-[1.02]';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25';
              } else {
                btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswerSubmitted}
                className={`py-5 px-4 rounded-2xl border text-xl font-black font-serif transition-all flex items-center justify-center gap-2 cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswerSubmitted && isCorrect && <CheckCircle2 size={18} className="text-white" />}
                {isAnswerSubmitted && isSelected && !isCorrect && <XCircle size={18} className="text-white" />}
              </button>
            );
          })}
        </div>

        {/* Action Button: Submit or Next */}
        {!isAnswerSubmitted ? (
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
            className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all cursor-pointer ${
              selectedOption
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            정답 확인하기
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Explanation Box */}
            <div
              className={`p-4 rounded-2xl border leading-relaxed text-xs space-y-1 ${
                selectedOption === currentQuestion.answer
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/80 border-rose-200 text-rose-900'
              }`}
            >
              <div className="font-black flex items-center gap-1.5 text-sm">
                {selectedOption === currentQuestion.answer ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>정답입니다! 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} className="text-rose-600" />
                    <span>아쉽네요! 정답은 [{currentQuestion.answer}]입니다.</span>
                  </>
                )}
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>

            <button
              type="button"
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-sm shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIndex < HANGUL_QUIZ_QUESTIONS.length - 1 ? '다음 문제 풀기' : '결과 확인하기'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
