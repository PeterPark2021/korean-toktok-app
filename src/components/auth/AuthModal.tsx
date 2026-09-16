import React, { useState } from 'react';
import { X, Mail, Lock, User, Globe, Sparkles, Eye, EyeOff, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getSpeakerAvatar } from '../../utils/characterAvatar';

const AVATAR_OPTIONS = ['minho', 'lihong', 'doanning', 'suyeon', 'teacher', 'friend'];

const NATIVE_LANGUAGES = [
  { code: 'ko', label: '한국어 (Korean)' },
  { code: 'en', label: 'English (영어)' },
  { code: 'vi', label: 'Tiếng Việt (베트남어)' },
  { code: 'zh', label: '中文 (중국어)' },
  { code: 'ja', label: '日本語 (일본어)' },
  { code: 'mn', label: 'Монгол (몽골어)' },
  { code: 'th', label: 'ภาษาไทย (태국어)' },
  { code: 'ru', label: 'Русский (러시아어)' },
  { code: 'es', label: 'Español (스페인어)' }
];

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalTab,
    closeAuthModal,
    login,
    signup,
    loginAsGuest,
    socialLogin
  } = useAuth();

  const [tab, setTab] = useState<'login' | 'signup'>(authModalTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('English (영어)');
  const [avatarId, setAvatarId] = useState('minho');
  const [targetLevel, setTargetLevel] = useState<'초급' | '중급' | '고급'>('초급');

  // Sync tab state when modal tab changes from outside
  React.useEffect(() => {
    setTab(authModalTab);
    setErrorMessage(null);
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await signup({
      name,
      email,
      password,
      nativeLanguage,
      avatarId,
      targetLevel
    });
    setLoading(false);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleSocialClick = async (provider: 'google' | 'kakao') => {
    setLoading(true);
    setErrorMessage(null);
    await socialLogin(provider);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 via-indigo-50/40 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              톡
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">
                {tab === 'login' ? '한국어 톡톡 로그인' : '학습자 회원가입'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {tab === 'login'
                  ? '나만의 학습 진도와 뱃지를 이어서 학습하세요'
                  : '맞춤형 캐릭터와 모국어로 톡톡 학습을 시작하세요'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 mx-6 mt-5 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            로그인 (Sign In)
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setErrorMessage(null);
            }}
            className={`py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            회원가입 (Sign Up)
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <span className="shrink-0 font-bold">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {tab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">이메일 주소</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="learner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">비밀번호</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-black text-sm transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>로그인하기</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">학습자 닉네임 / 이름</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="홍길동 / Minho"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">이메일 주소</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="learner@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">비밀번호 (6자 이상)</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Native Language Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Globe size={14} className="text-indigo-500" />
                  <span>모국어 (Native Language)</span>
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

              {/* Character Avatar Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>나만의 대표 학습 아바타</span>
                </label>
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-black text-sm transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>회원가입 완료하고 시작하기</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              또는 간편 로그인
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialClick('google')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-95 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.2-2 .4-2.8L1.9 6.3C.7 8.7 0 11.3 0 14s.7 5.3 1.9 7.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span>Google 로그인</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick('kakao')}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FEE500] hover:bg-[#FDD835] active:scale-95 text-xs font-bold text-[#3C1E1E] transition-all cursor-pointer shadow-2xs"
            >
              <span className="font-black text-sm leading-none">💬</span>
              <span>카카오 로그인</span>
            </button>
          </div>

          {/* Quick Guest Access */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => loginAsGuest()}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline underline-offset-2 transition-colors cursor-pointer"
            >
              로그인 없이 게스트로 바로 둘러보기
            </button>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <Shield size={13} className="text-slate-400" />
          <span>학습 데이터는 브라우저 로컬 저장소와 안전하게 연동됩니다.</span>
        </div>
      </div>
    </div>
  );
};
