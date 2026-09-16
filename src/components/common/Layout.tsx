import React from 'react';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Flame, User } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { UserProfileModal } from '../auth/UserProfileModal';
import { getSpeakerAvatar } from '../../utils/characterAvatar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { streakDays } = useProgress();
  const { user, isAuthenticated, openAuthModal, openProfileModal } = useAuth();
  const avatarInfo = getSpeakerAvatar(user.avatarId || 'minho');

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-rose-50/20 to-orange-50/20 text-slate-900">
      {/* Fixed Left Sidebar (Tablet & Desktop) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 lg:pl-72 min-w-0 transition-all">
        {/* Mobile Top Header */}
        <header className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 h-14 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-black text-base shadow-sm">
              톡
            </div>
            <span className="font-extrabold text-base text-slate-900 tracking-tight">
              한국어 톡톡
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-200/80 rounded-full font-bold text-xs">
              <Flame size={14} className="text-orange-500 fill-orange-500 animate-pulse" />
              <span>{streakDays}일</span>
            </div>

            {/* User Profile / Auth Button (Mobile) */}
            <button
              type="button"
              onClick={() => (isAuthenticated ? openProfileModal() : openAuthModal('login'))}
              className="p-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
              title={isAuthenticated ? `${user.name} 프로필` : '로그인'}
            >
              {isAuthenticated ? (
                <img
                  src={avatarInfo.avatarUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <User size={15} />
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Page Main */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24 md:pb-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="hidden md:block border-t border-slate-200/60 py-6 text-center text-xs text-slate-400 font-medium bg-white/40">
          한국어 톡톡 (Korean TokTok) · 초급·중급·고급 90개 단원 맞춤형 회화 & 퀴즈
        </footer>
      </div>

      {/* Fixed Bottom Tab Bar (Mobile) */}
      <BottomNav />

      {/* Global Auth & Profile Modals */}
      <AuthModal />
      <UserProfileModal />
    </div>
  );
};
