import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, BarChart3, Flame, GraduationCap, Layers, User, LogIn, Settings, Bot } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../contexts/AuthContext';
import { getActiveEdition } from '../../data';
import { EditionType } from '../../types';
import { getSpeakerAvatar } from '../../utils/characterAvatar';

export const Sidebar: React.FC = () => {
  const { streakDays, completedUnitsCount } = useProgress();
  const { user, isAuthenticated, isGuest, openAuthModal, openProfileModal } = useAuth();
  const [edition, setEdition] = useState<EditionType>(getActiveEdition());
  const avatarInfo = getSpeakerAvatar(user.avatarId || 'minho');

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
    <aside className="hidden md:flex md:w-64 lg:w-72 fixed inset-y-0 left-0 z-40 flex-col bg-white/90 backdrop-blur-xl border-r border-slate-200/80 p-6 justify-between overflow-y-auto">
      {/* Top: Logo & Main Navigation */}
      <div className="space-y-6">
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

        {/* User Profile / Auth Card */}
        {isAuthenticated ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/60 border border-blue-200/70 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={avatarInfo.avatarUrl}
                alt={user.name}
                className="w-10 h-10 rounded-xl object-cover border border-blue-300 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs text-slate-900 truncate">{user.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-blue-200/70 text-blue-800 font-bold shrink-0">
                    {user.targetLevel || '초급'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={openProfileModal}
              className="p-1.5 rounded-xl hover:bg-white text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shrink-0"
              title="프로필 설정"
            >
              <Settings size={16} />
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">게스트 모드</span>
              <span className="text-[10px] font-semibold text-slate-400">비로그인</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              로그인하면 학습 진도와 뱃지를 클라우드에 안전하게 보관할 수 있어요.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn size={13} />
                <span>로그인</span>
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className="flex-1 py-2 rounded-xl bg-white hover:bg-slate-100 active:scale-95 text-slate-700 font-bold text-xs border border-slate-200 transition-all shadow-2xs flex items-center justify-center cursor-pointer"
              >
                <span>회원가입</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Menu Links */}
        <nav className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
            학습 메뉴
          </div>

          <NavLink to="/" className={navLinkClass} end>
            <BookOpen size={19} />
            <span>회화·어휘 학습</span>
          </NavLink>

          <NavLink to="/roleplay" className={navLinkClass}>
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <Bot size={19} />
                <span>AI 롤플레이</span>
              </div>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900 shadow-2xs animate-pulse">
                Live
              </span>
            </div>
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
      <div className="space-y-3 pt-4">
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
