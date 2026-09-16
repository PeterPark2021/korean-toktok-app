import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, BarChart3, Bot } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
      isActive
        ? 'text-blue-600 font-extrabold scale-105'
        : 'text-slate-500 hover:text-slate-900 font-medium'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around shadow-lg">
      <NavLink to="/" className={navLinkClass} end>
        <BookOpen size={19} />
        <span className="text-[10px]">회화·학습</span>
      </NavLink>

      <NavLink to="/roleplay" className={navLinkClass}>
        <div className="relative">
          <Bot size={19} />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>
        <span className="text-[10px]">롤플레이</span>
      </NavLink>

      <NavLink to="/quiz" className={navLinkClass}>
        <HelpCircle size={19} />
        <span className="text-[10px]">퀴즈 풀기</span>
      </NavLink>

      <NavLink to="/progress" className={navLinkClass}>
        <BarChart3 size={19} />
        <span className="text-[10px]">학습 현황</span>
      </NavLink>
    </nav>
  );
};

