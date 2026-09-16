import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, MessageSquare, ArrowRight } from 'lucide-react';
import {
  PARTS_OF_SPEECH,
  WORD_ORDER_COMPARISONS,
  KOREAN_PARTICLES_GUIDE,
  CLASSROOM_EXPRESSIONS
} from '../../data/hangul';
import { useTTS } from '../../hooks/useTTS';

export const KoreanPrimerViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classroom' | 'word_order' | 'particles' | 'pos'>('classroom');
  const { speak } = useTTS();

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('classroom')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'classroom'
                ? 'bg-white text-blue-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare size={14} />
            <span>교실 한국어 15선</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('word_order')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'word_order'
                ? 'bg-white text-indigo-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={14} />
            <span>문장 어순 비교 (SOV vs SVO)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('particles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'particles'
                ? 'bg-white text-purple-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={14} />
            <span>한국어 조사의 개념</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pos'
                ? 'bg-white text-slate-900 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen size={14} />
            <span>기초 품사 (명·동·형)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          본격적인 1단원 대화 학습 전 꼭 알아두어야 할 기본 문법 상식입니다.
        </div>
      </div>

      {activeTab === 'classroom' && (
        /* 1. Classroom Expressions */
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-md space-y-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-400" />
              <span>선생님과 수업할 때 가장 많이 쓰는 필수 교실 표현 15선</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              수업 중 질문하거나 선생님의 안내를 들을 때 사용하는 기초 회화 표현입니다. 카드를 눌러 발음을 듣고 따라 해보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {CLASSROOM_EXPRESSIONS.map((expr) => (
              <div
                key={expr.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-blue-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                      {expr.id}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {expr.situation}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {expr.korean}
                    </h4>
                    <p className="text-[11px] text-blue-600 font-semibold">
                      {expr.romanization}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      {expr.translation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => speak(expr.audioText)}
                  className="w-full py-2.5 px-3 rounded-2xl bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group"
                >
                  <Volume2 size={15} className="group-hover:scale-110 transition-transform" />
                  <span>발음 듣기</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'word_order' && (
        /* 2. Word Order Comparison */
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 text-white shadow-md space-y-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Layers size={20} className="text-indigo-400" />
              <span>한국어 어순의 특징: 동사가 맨 뒤에 오는 SOV 구조</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              영어와 베트남어는 **[주어 + 동사 + 목적어(SVO)]** 순서이지만, 한국어는 **[주어 + 목적어 + 동사(SOV)]** 순서입니다.
            </p>
          </div>

          <div className="space-y-5">
            {WORD_ORDER_COMPARISONS.map((comp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="text-base font-black text-slate-900">
                    {comp.title}
                  </h4>
                  <button
                    type="button"
                    onClick={() => speak(comp.sentences[0].fullSentence)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-blue-200"
                  >
                    <Volume2 size={14} />
                    <span>한국어 듣기</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {comp.sentences.map((s) => (
                    <div
                      key={s.language}
                      className={`p-4 rounded-2xl border transition-all ${
                        s.language === 'korean'
                          ? 'bg-blue-50/60 border-blue-200 shadow-2xs'
                          : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{s.flag}</span>
                          <span className="text-xs font-black text-slate-800">{s.langName}</span>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            s.language === 'korean'
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {s.pattern}
                        </span>
                      </div>

                      {/* Visual Syntax Blocks */}
                      <div className="flex flex-wrap items-center gap-2">
                        {s.elements.map((elem, eIdx) => (
                          <div
                            key={eIdx}
                            className={`px-3.5 py-2 rounded-xl font-bold text-sm flex flex-col items-center border ${
                              elem.role === 'S'
                                ? 'bg-sky-100 border-sky-300 text-sky-900'
                                : elem.role === 'O'
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                                : 'bg-amber-100 border-amber-300 text-amber-900'
                            }`}
                          >
                            <span>{elem.text}</span>
                            <span className="text-[9px] font-semibold opacity-70">
                              [{elem.role}] {elem.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'particles' && (
        /* 3. Particles Guide */
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white shadow-md space-y-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Sparkles size={20} className="text-purple-400" />
              <span>한국어의 마법 열쇠: 조사(Postposition)란?</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              한국어는 단어 뒤에 '조사'를 붙여서 그 단어가 주어인지, 목적어인지, 장소인지를 명확하게 결정합니다. 단어에 받침이 있는지 없는지에 따라 짝꿍 조사가 달라집니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KOREAN_PARTICLES_GUIDE.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h4 className="text-base font-black text-purple-900">
                    {p.title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                    {p.category}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-700">
                  {p.summary}
                </p>

                <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-200/70 text-xs text-purple-950 leading-relaxed">
                  💡 {p.explanation}
                </div>

                {/* Examples */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-slate-400">교재 예문:</div>
                  {p.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-extrabold text-slate-900">{ex.korean}</div>
                        <div className="text-[10px] text-slate-500">{ex.translation}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => speak(ex.korean)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-100 cursor-pointer"
                        title="예문 듣기"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pos' && (
        /* 4. Parts of Speech */
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-md space-y-2">
            <h3 className="text-lg font-black flex items-center gap-2">
              <BookOpen size={20} className="text-blue-400" />
              <span>한국어의 3대 핵심 품사: 명사, 동사, 형용사</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              교재에 자주 등장하는 품사 약어(명, 동, 형)의 의미와 기본 형태를 알아봅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARTS_OF_SPEECH.map((pos) => (
              <div
                key={pos.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3.5 hover:border-blue-300 transition-colors"
              >
                <div className="border-b border-slate-100 pb-2.5">
                  <h4 className="text-base font-black text-slate-900">
                    {pos.title}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold mt-0.5">
                    {pos.summary}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pos.explanation}
                </p>

                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-bold text-slate-400">교재 수록 단어:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {pos.examples.map((ex, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => speak(ex.korean)}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all cursor-pointer group"
                      >
                        <div className="font-extrabold text-xs text-slate-900 group-hover:text-blue-600">
                          {ex.korean}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {ex.translation}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
