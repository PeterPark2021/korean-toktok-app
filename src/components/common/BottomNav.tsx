import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, BookOpen, HelpCircle, BarChart3, Bot, Trophy } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all cursor-pointer ${
      isActive
        ? 'text-blue-600 font-extrabold scale-105'
        : 'text-slate-500 hover:text-slate-900 font-medium'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-1 py-1 flex items-center justify-around shadow-lg">
      <NavLink to="/hangul" className={navLinkClass}>
        <Sparkles size={17} className="text-amber-500" />
        <span className="text-[8px] font-bold">한글익히기</span>
      </NavLink>

      <NavLink to="/" className={navLinkClass} end>
        <BookOpen size={17} />
        <span className="text-[8px]">회화·학습</span>
      </NavLink>

      <NavLink to="/roleplay" className={navLinkClass}>
        <div className="relative">
          <Bot size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>
        <span className="text-[9px]">롤플레이</span>
      </NavLink>

      <NavLink to="/quiz" className={navLinkClass}>
        <HelpCircle size={18} />
        <span className="text-[9px]">단원 퀴즈</span>
      </NavLink>

      <NavLink to="/leaderboard" className={navLinkClass}>
        <Trophy size={18} />
        <span className="text-[9px]">랭킹·오답</span>
      </NavLink>

      <NavLink to="/progress" className={navLinkClass}>
        <BarChart3 size={18} />
        <span className="text-[9px]">학습 현황</span>
      </NavLink>
    </nav>
  );
};


