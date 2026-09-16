import React, { useState } from 'react';
import { QuizItem, EditionType } from '../../types';
import { MultipleChoiceCard } from './MultipleChoiceCard';
import { FillInBlankCard } from './FillInBlankCard';
import { SentenceReorderCard } from './SentenceReorderCard';
import { QuizResultCard } from './QuizResultCard';
import { AIExplanationBox } from './AIExplanationBox';
import { Sparkles, ArrowRight, CheckCircle2, HelpCircle, Lightbulb, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { getQuizVisualStimulus } from '../../utils/visualQuizHelper';

interface QuizEngineProps {
  quizList: QuizItem[];
  unitNumber: number;
  onGoToStudy: () => void;
  edition?: EditionType;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quizList,
  unitNumber,
  onGoToStudy,
  edition = 'kbs'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const { recordQuizAttempt, recordMistake } = useProgress();

  const currentQuiz = quizList[currentIndex] || quizList[0];
  const currentAnswer = userAnswers[currentQuiz.quiz_id];
  const visualStimulus = getQuizVisualStimulus(currentQuiz, unitNumber);

  const handleSelectOption = (option: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuiz.quiz_id]: option
    }));
  };

  const handleChangeInput = (val: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuiz.quiz_id]: val
    }));
  };

  const handleChangeArrangement = (tokens: string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuiz.quiz_id]: tokens
    }));
  };

  // Check if current question is correctly answered
  const checkCurrentCorrect = (): boolean => {
    const ans = userAnswers[currentQuiz.quiz_id];
    if (!ans) return false;

    if (currentQuiz.type === 'multiple_choice') {
      return ans === currentQuiz.answer;
    } else if (currentQuiz.type === 'fill_in_the_blank') {
      return (ans as string).trim().toLowerCase() === currentQuiz.answer.trim().toLowerCase();
    } else if (currentQuiz.type === 'sentence_reordering') {
      const cleanUser = ((ans as string[]) || []).join('').replace(/[\s.,?!]/g, '');
      const cleanAns = currentQuiz.answer.replace(/[\s.,?!]/g, '');
      return cleanUser === cleanAns;
    }
    return false;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowExplanation(true);

    const isAnsCorrect = checkCurrentCorrect();
    if (!isAnsCorrect) {
      // Record wrong answer to mistake notes
      const ansText = Array.isArray(currentAnswer) ? currentAnswer.join(' ') : String(currentAnswer || '');
      recordMistake({
        unitNumber,
        edition,
        quizId: currentQuiz.quiz_id,
        question: currentQuiz.question,
        options: currentQuiz.options,
        userAnswer: ansText,
        correctAnswer: currentQuiz.answer,
        explanation: currentQuiz.explanation
      });
    }
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    setShowExplanation(false);

    if (currentIndex < quizList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Complete Quiz
      let totalScore = 0;
      quizList.forEach((q) => {
        const a = userAnswers[q.quiz_id];
        if (!a) return;
        if (q.type === 'multiple_choice' && a === q.answer) totalScore++;
        else if (
          q.type === 'fill_in_the_blank' &&
          (a as string).trim().toLowerCase() === q.answer.trim().toLowerCase()
        )
          totalScore++;
        else if (q.type === 'sentence_reordering') {
          const u = ((a as string[]) || []).join('').replace(/[\s.,?!]/g, '');
          const correct = q.answer.replace(/[\s.,?!]/g, '');
          if (u === correct) totalScore++;
        }
      });

      // Record Quiz Attempt in LocalStorage with Edition
      recordQuizAttempt(unitNumber, totalScore, quizList.length, edition);
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setIsCompleted(false);
    setShowExplanation(false);
  };

  if (isCompleted) {
    let finalScore = 0;
    quizList.forEach((q) => {
      const a = userAnswers[q.quiz_id];
      if (!a) return;
      if (q.type === 'multiple_choice' && a === q.answer) finalScore++;
      else if (
        q.type === 'fill_in_the_blank' &&
        (a as string).trim().toLowerCase() === q.answer.trim().toLowerCase()
      )
        finalScore++;
      else if (q.type === 'sentence_reordering') {
        const u = ((a as string[]) || []).join('').replace(/[\s.,?!]/g, '');
        const correct = q.answer.replace(/[\s.,?!]/g, '');
        if (u === correct) finalScore++;
      }
    });

    return (
      <QuizResultCard
        score={finalScore}
        totalQuestions={quizList.length}
        quizList={quizList}
        userAnswers={userAnswers}
        onRetry={handleRetry}
        onGoToStudy={onGoToStudy}
        unitNumber={unitNumber}
      />
    );
  }

  const isCurrentAnswered =
    currentQuiz.type === 'sentence_reordering'
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : !!currentAnswer && (currentAnswer as string).trim().length > 0;

  const isCorrect = isSubmitted && checkCurrentCorrect();

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple_choice':
        return visualStimulus.hasVisual ? '그림/사진 기반 객관식' : '객관식 선택형';
      case 'fill_in_the_blank':
        return '빈칸 채우기';
      case 'sentence_reordering':
        return '문장 어순 배열';
      default:
        return '연습 문제';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Progress Bar & Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full font-bold ${visualStimulus.hasVisual ? 'bg-rose-100 text-rose-700 border border-rose-200' : 'bg-slate-100 text-slate-700'}`}>
              {getTypeLabel(currentQuiz.type)}
            </span>
            <span>Unit {unitNumber} 퀴즈</span>
          </span>
          <span>
            문제 <strong className="text-slate-900">{currentIndex + 1}</strong> / {quizList.length}
          </span>
        </div>

        {/* Bar */}
        <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-500 to-orange-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quizList.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6">
        {/* 1. Visual Picture Stimulus Card (If available or Multiple Choice) */}
        {visualStimulus.hasVisual && (
          <div className="rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 shadow-md relative group">
            <div className="relative aspect-video sm:aspect-[2.2/1] w-full overflow-hidden bg-slate-900">
              <img
                src={visualStimulus.imageUrl}
                alt={visualStimulus.imageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-black shadow-md flex items-center gap-1 ${visualStimulus.badgeColor}`}>
                  <ImageIcon size={12} />
                  <span>{visualStimulus.badge}</span>
                </span>
              </div>

              {/* Caption */}
              {visualStimulus.caption && (
                <div className="absolute bottom-2.5 left-3 right-3 z-10">
                  <p className="text-xs font-semibold text-slate-100 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 line-clamp-1">
                    💡 {visualStimulus.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-2xl bg-rose-500 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-rose-500/20">
              Q{currentIndex + 1}
            </span>
            <div className="font-bold text-slate-900 text-base md:text-lg leading-relaxed whitespace-pre-line pt-0.5">
              {currentQuiz.question}
            </div>
          </div>
        </div>

        {/* Dynamic Question Type Component */}
        <div>
          {currentQuiz.type === 'multiple_choice' && (
            <MultipleChoiceCard
              quiz={currentQuiz}
              selectedOption={currentAnswer || null}
              onSelectOption={handleSelectOption}
              isSubmitted={isSubmitted}
            />
          )}

          {currentQuiz.type === 'fill_in_the_blank' && (
            <FillInBlankCard
              quiz={currentQuiz}
              inputAnswer={currentAnswer || ''}
              onChangeInput={handleChangeInput}
              isSubmitted={isSubmitted}
            />
          )}

          {currentQuiz.type === 'sentence_reordering' && (
            <SentenceReorderCard
              quiz={currentQuiz}
              currentArrangement={currentAnswer || []}
              onChangeArrangement={handleChangeArrangement}
              isSubmitted={isSubmitted}
            />
          )}
        </div>

        {/* Explanation Card & AI Explanation upon submission */}
        {showExplanation && (
          <div className="space-y-3 pt-2">
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200 ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Lightbulb size={15} className={isCorrect ? 'text-emerald-600' : 'text-amber-600'} />
                <span>문법 해설 & 정답 근거:</span>
              </div>
              <p className="font-medium text-slate-700">{currentQuiz.explanation}</p>
            </div>

            {/* AI 기반 보충 설명 */}
            <AIExplanationBox
              key={`ai-box-${currentQuiz.quiz_id}`}
              quiz={currentQuiz}
              userAnswer={currentAnswer}
            />
          </div>
        )}

        {/* Action Button: Submit or Next */}
        <div className="pt-2">
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!isCurrentAnswered}
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm md:text-base shadow-md shadow-rose-500/25 transition-all active:scale-[0.99] cursor-pointer"
            >
              정답 확인하기
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm md:text-base shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {currentIndex < quizList.length - 1 ? '다음 문제 풀기' : '퀴즈 결과 보기'}
              </span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
