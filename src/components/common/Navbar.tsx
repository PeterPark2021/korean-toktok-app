import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, BarChart3, Flame, Volume2 } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';

export const Navbar: React.FC = () => {
  const { stats } = useProgress();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
      isActive
        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-rose-500/30 group-hover:scale-105 transition-transform">
            톡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">한국어 톡톡</span>
              <span className="text-[10px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600">
                TokTok
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">생생 회화 & 인터랙티브 퀴즈</p>
          </div>
        </NavLink>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 md:gap-2">
          <NavLink to="/" className={navLinkClass} end>
            <BookOpen size={17} />
            <span>회화·학습</span>
          </NavLink>

          <NavLink to="/quiz" className={navLinkClass}>
            <HelpCircle size={17} />
            <span>퀴즈 풀기</span>
          </NavLink>

          <NavLink to="/progress" className={navLinkClass}>
            <BarChart3 size={17} />
            <span className="hidden sm:inline">학습 현황</span>
          </NavLink>
        </nav>

        {/* User Badge / Streak */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 border border-orange-200/80 rounded-full font-bold text-xs shadow-xs">
            <Flame size={15} className="text-orange-500 fill-orange-500 animate-pulse" />
            <span>{stats.streakDays}일 연속</span>
          </div>
        </div>
      </div>
    </header>
  );
};
