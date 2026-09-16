import React, { useState, useEffect } from 'react';
import { X, User, Mail, Globe, Sparkles, LogOut, CheckCircle, ShieldCheck, Flame, GraduationCap, Edit3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProgress } from '../../hooks/useProgress';
import { getSpeakerAvatar } from '../../utils/characterAvatar';

const AVATAR_OPTIONS = ['minho', 'lihong', 'doanning', 'suyeon', 'teacher', 'friend'];

const NATIVE_LANGUAGES = [
  { code: 'ko', label: '한국어 (Korean)' },
  { code: 'en', label: 'English (영어)' },
  { code: 'vi', label: 'Tiếng Việt (베트남어)' },
  { code: 'zh', label: '中文 (중국어)' },
  { code: 'ja', label: '日本語 (일본어)' },
  { code: 'ru', label: 'Русский (러시아어)' },
  { code: 'es', label: 'Español (스페인어)' }
];

export const UserProfileModal: React.FC = () => {
  const {
    user,
    isAuthenticated,
    isGuest,
    isProfileModalOpen,
    closeProfileModal,
    updateProfile,
    logout,
    openAuthModal
  } = useAuth();

  const { streakDays, completedUnitsCount } = useProgress();

  const [name, setName] = useState(user.name);
  const [avatarId, setAvatarId] = useState(user.avatarId || 'minho');
  const [nativeLanguage, setNativeLanguage] = useState(user.nativeLanguage || 'English (영어)');
  const [targetLevel, setTargetLevel] = useState<'초급' | '중급' | '고급'>(user.targetLevel || '초급');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setName(user.name);
    setAvatarId(user.avatarId || 'minho');
    setNativeLanguage(user.nativeLanguage || 'English (영어)');
    setTargetLevel(user.targetLevel || '초급');
    setSaveSuccess(false);
  }, [user, isProfileModalOpen]);

  if (!isProfileModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user.name,
      avatarId,
      nativeLanguage,
      targetLevel
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      closeProfileModal();
    }, 900);
  };

  const currentAvatarInfo = getSpeakerAvatar(avatarId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentAvatarInfo.avatarUrl}
              alt={currentAvatarInfo.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-blue-600 shadow-md shadow-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-slate-900 text-lg">{user.name}</h2>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isAuthenticated
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {isAuthenticated ? '정식 회원' : '게스트 모드'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={closeProfileModal}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Learning Stats Banner */}
        <div className="grid grid-cols-2 gap-3 p-4 mx-6 mt-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <Flame size={18} className="fill-orange-500" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">연속 학습일</div>
              <div className="text-sm font-black text-slate-900">{streakDays}일차 달성</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <GraduationCap size={18} />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">학습 완주</div>
              <div className="text-sm font-black text-slate-900">{completedUnitsCount} / 45 단원</div>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
          {/* Guest Conversion Notice */}
          {isGuest && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white space-y-2 shadow-md">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Sparkles size={16} className="text-amber-300" />
                <span>회원가입으로 학습 진도를 안전하게 저장하세요!</span>
              </div>
              <p className="text-xs text-blue-100">
                게스트 상태에서는 브라우저 캐시 삭제 시 진도가 유실될 수 있습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeProfileModal();
                  openAuthModal('signup');
                }}
                className="mt-1 px-4 py-2 rounded-xl bg-white text-blue-700 font-black text-xs hover:bg-blue-50 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                10초 회원가입 하기
              </button>
            </div>
          )}

          {/* Nickname Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Edit3 size={13} className="text-slate-400" />
              <span>학습자 닉네임</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-medium"
            />
          </div>

          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">대표 아바타 변경</label>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((id) => {
                const avatar = getSpeakerAvatar(id);
                const isSelected = avatarId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setAvatarId(id)}
                    className={`p-1 rounded-2xl flex flex-col items-center gap-1 transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 scale-105 shadow-sm'
                        : 'border-transparent hover:border-slate-200 bg-slate-50'
                    }`}
                  >
                    <img
                      src={avatar.avatarUrl}
                      alt={avatar.name}
                      className="w-9 h-9 rounded-xl object-cover"
                    />
                    <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                      {avatar.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Native Language */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Globe size={13} className="text-indigo-500" />
              <span>모국어 설정</span>
            </label>
            <select
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 font-medium bg-white"
            >
              {NATIVE_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.label}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Target Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">목표 한국어 레벨</label>
            <div className="grid grid-cols-3 gap-2">
              {(['초급', '중급', '고급'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setTargetLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    targetLevel === lvl
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lvl} 과정
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-black text-sm transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle size={16} />
                  <span>변경 완료!</span>
                </>
              ) : (
                <span>프로필 변경사항 저장</span>
              )}
            </button>

            <button
              type="button"
              onClick={logout}
              className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 active:scale-95 text-xs font-bold text-slate-600 transition-all cursor-pointer flex items-center gap-1.5"
              title="로그아웃"
            >
              <LogOut size={15} />
              <span>로그아웃</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
