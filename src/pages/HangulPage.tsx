import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  ArrowRight,
  GraduationCap,
  MessageSquare,
  Zap,
  Grid
} from 'lucide-react';
import { HangulVowelExplorer } from '../components/hangul/HangulVowelExplorer';
import { HangulConsonantExplorer } from '../components/hangul/HangulConsonantExplorer';
import { HangulMatrixBuilder } from '../components/hangul/HangulMatrixBuilder';
import { BatchimRulesExplorer } from '../components/hangul/BatchimRulesExplorer';
import { KoreanPrimerViewer } from '../components/hangul/KoreanPrimerViewer';
import { HangulQuizViewer } from '../components/hangul/HangulQuizViewer';

export type HangulTab = 'vowels' | 'consonants' | 'builder' | 'batchim' | 'primer' | 'quiz';

export const HangulPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = searchParams.get('tab') as HangulTab;
  const activeTab: HangulTab =
    tabParam && ['vowels', 'consonants', 'builder', 'batchim', 'primer', 'quiz'].includes(tabParam)
      ? tabParam
      : 'vowels';

  const handleSelectTab = (tab: HangulTab) => {
    setSearchParams({ tab }, { replace: true });
  };

  const tabs = [
    {
      id: 'vowels' as const,
      label: '모음 학습 (21자)',
      icon: BookOpen,
      desc: '기본 모음 10자 & 복합 모음 11자'
    },
    {
      id: 'consonants' as const,
      label: '자음 학습 (19자)',
      icon: Layers,
      desc: '기본 14자 + 쌍자음 5자 & 3분 대립'
    },
    {
      id: 'builder' as const,
      label: '자모 결합기 & 음절표',
      icon: Grid,
      desc: '실시간 글자 합성 & 19x21 사운드보드'
    },
    {
      id: 'batchim' as const,
      label: '받침 & 겹받침',
      icon: Sparkles,
      desc: '7대 대표음 & 11개 겹받침 공식'
    },
    {
      id: 'primer' as const,
      label: '수업에 앞서서',
      icon: MessageSquare,
      desc: '교실 한국어 15선 & SOV 어순 비교'
    },
    {
      id: 'quiz' as const,
      label: '자모 청취 퀴즈',
      icon: HelpCircle,
      desc: '예비편 수록 발음 변별 평가'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-white/[0.04] font-black text-9xl select-none pointer-events-none font-serif">
          한글
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                KBS 한국어 톡톡 초급 예비편
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <span>🌱 왕초보 필수 코스</span>
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                한글 익히기 & 기초 다지기 🇰🇷
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                세종대왕의 한글 창제 원리부터 자음·모음 40자, 실시간 자모 결합기, 받침 7대 대표음, 그리고 수업 전 꼭 알아야 할 기초 문법과 교실 표현을 마스터하세요.
              </p>
            </div>
          </div>

          {/* Quick Jump to Unit 1 */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => navigate('/?unit=1')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>본문 Unit 1 학습으로 이동</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub-Tab Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectTab(tab.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[82px] ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <Icon size={18} className={isActive ? 'text-white' : 'text-blue-600'} />
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </div>
              <div>
                <div className="font-extrabold text-xs tracking-tight">{tab.label}</div>
                <div className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                  {tab.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Active Tab Content Pane */}
      <div className="pt-2">
        {activeTab === 'vowels' && <HangulVowelExplorer />}
        {activeTab === 'consonants' && <HangulConsonantExplorer />}
        {activeTab === 'builder' && <HangulMatrixBuilder />}
        {activeTab === 'batchim' && <BatchimRulesExplorer />}
        {activeTab === 'primer' && <KoreanPrimerViewer />}
        {activeTab === 'quiz' && <HangulQuizViewer />}
      </div>
    </div>
  );
};
