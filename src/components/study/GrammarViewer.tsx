import React, { useState } from 'react';
import { ChevronDown, Sparkles, BookOpen, CheckCircle, Tag } from 'lucide-react';
import { GrammarItem } from '../../types';
import { AudioButton } from '../common/AudioButton';

interface GrammarViewerProps {
  grammarList: GrammarItem[];
  onPlayTTS: (text: string) => void;
  speaking: boolean;
  currentSpeakingText: string | null;
}

export const GrammarViewer: React.FC<GrammarViewerProps> = ({
  grammarList,
  onPlayTTS,
  speaking,
  currentSpeakingText
}) => {
  // By default, open the first grammar point
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
            <BookOpen size={18} />
          </div>
          <h3 className="font-bold text-slate-900 text-base">핵심 문법 포인트 해설</h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">총 {grammarList.length}개 문법</span>
      </div>

      {grammarList.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={item.grammar_point || index}
            className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200"
          >
            {/* Accordion Trigger */}
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="w-full p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center border border-rose-200 shrink-0">
                  {index + 1}
                </span>
                <span className="font-black text-lg md:text-xl text-slate-900 tracking-tight">
                  {item.grammar_point}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {isOpen ? '접기' : '자세히 보기'}
                </span>
                <div
                  className={`p-1.5 rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-rose-100 text-rose-600' : ''
                  }`}
                >
                  <ChevronDown size={16} />
                </div>
              </div>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="p-5 pt-0 border-t border-slate-100 space-y-5 animate-in fade-in duration-200">
                {/* Explanation Box */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-slate-800 text-sm leading-relaxed mt-4">
                  <div className="flex items-center gap-1.5 font-bold text-rose-700 text-xs mb-1.5">
                    <Sparkles size={14} />
                    <span>문법 설명 및 결합 규칙</span>
                  </div>
                  {item.explanation}
                </div>

                {/* Example Sentences */}
                {item.example_sentences && item.example_sentences.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      학습 예문
                    </div>
                    <div className="space-y-2">
                      {item.example_sentences.map((sentence, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span className="text-sm font-bold text-slate-900">{sentence}</span>
                          </div>
                          <AudioButton
                            text={sentence}
                            onPlay={onPlayTTS}
                            isPlaying={speaking && currentSpeakingText === sentence}
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Vocabularies */}
                {item.related_vocab && item.related_vocab.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                      <Tag size={13} />
                      <span>연관 어휘</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.related_vocab.map((vWord, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => onPlayTTS(vWord)}
                          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>{vWord}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
