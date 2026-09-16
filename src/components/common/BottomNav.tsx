import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, BarChart3 } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-2xl transition-all cursor-pointer ${
      isActive
        ? 'text-rose-600 font-extrabold scale-105'
        : 'text-slate-500 hover:text-slate-900 font-medium'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-4 py-1.5 flex items-center justify-around shadow-lg">
      <NavLink to="/" className={navLinkClass} end>
        <BookOpen size={20} />
        <span className="text-[11px]">회화·학습</span>
      </NavLink>

      <NavLink to="/quiz" className={navLinkClass}>
        <HelpCircle size={20} />
        <span className="text-[11px]">퀴즈 풀기</span>
      </NavLink>

      <NavLink to="/progress" className={navLinkClass}>
        <BarChart3 size={20} />
        <span className="text-[11px]">학습 현황</span>
      </NavLink>
    </nav>
  );
};
