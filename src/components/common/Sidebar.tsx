import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, BarChart3, Flame, GraduationCap, Layers } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { getActiveEdition } from '../../data';
import { EditionType } from '../../types';

export const Sidebar: React.FC = () => {
  const { streakDays, completedUnitsCount } = useProgress();
  const [edition, setEdition] = useState<EditionType>(getActiveEdition());

  useEffect(() => {
    const handleEditionChange = (e: any) => {
      setEdition(e.detail || getActiveEdition());
    };
    window.addEventListener('edition-changed', handleEditionChange);
    return () => window.removeEventListener('edition-changed', handleEditionChange);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 fixed inset-y-0 left-0 z-40 flex-col bg-white/90 backdrop-blur-xl border-r border-slate-200/80 p-6 justify-between">
      {/* Top: Logo & Main Navigation */}
      <div className="space-y-8">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
            톡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">한국어 톡톡</span>
              <span className="text-[10px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {edition === 'kbs' ? 'KBS' : 'Wiz'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">생생 회화 & 인터랙티브 학습</p>
          </div>
        </NavLink>

        {/* Navigation Menu Links */}
        <nav className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
            학습 메뉴
          </div>

          <NavLink to="/" className={navLinkClass} end>
            <BookOpen size={19} />
            <span>회화·어휘 학습</span>
          </NavLink>

          <NavLink to="/quiz" className={navLinkClass}>
            <HelpCircle size={19} />
            <span>단원 퀴즈 풀기</span>
          </NavLink>

          <NavLink to="/progress" className={navLinkClass}>
            <BarChart3 size={19} />
            <span>학습 현황 대시보드</span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom: Streak & Level Badge Widget */}
      <div className="space-y-3">
        {/* Active Edition Badge */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-blue-600" />
            <span className="text-xs font-bold text-slate-700">현재 교재</span>
          </div>
          <span className="text-xs font-black text-blue-600">
            {edition === 'kbs' ? 'KBS 공식 교재' : 'Wiz AI 에디션'}
          </span>
        </div>

        {/* Streak Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/70 border border-orange-200/80 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-800 flex items-center gap-1.5">
              <Flame size={16} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span>연속 학습</span>
            </span>
            <span className="text-xs font-black text-orange-600 bg-white px-2 py-0.5 rounded-full border border-orange-200">
              {streakDays}일차
            </span>
          </div>
          <p className="text-[11px] text-orange-700/80 font-medium">
            오늘도 꾸준히 학습을 이어가고 있어요!
          </p>
        </div>

        {/* Completed Units Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-blue-600" />
            <span className="text-xs font-bold text-slate-700">완료 단원</span>
          </div>
          <span className="text-xs font-black text-slate-900">{completedUnitsCount} / 45</span>
        </div>
      </div>
    </aside>
  );
};
