import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, CloudSyncStatus } from '../types';
import { getSupabaseClient, isSupabaseConfigured } from '../services/supabaseClient';

interface StoredAccount extends UserProfile {
  passwordHash?: string;
}

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  isGuest: boolean;
  cloudSyncStatus: CloudSyncStatus;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  isProfileModalOpen: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (params: {
    name: string;
    email: string;
    password: string;
    nativeLanguage: string;
    avatarId: string;
    targetLevel: '초급' | '중급' | '고급';
  }) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: (name?: string, nativeLanguage?: string, avatarId?: string) => void;
  socialLogin: (provider: 'google' | 'kakao') => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  openAuthModal: (tab?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  setCloudSyncStatus: (status: CloudSyncStatus) => void;
}

const USERS_STORAGE_KEY = 'korean_toktok_users_v1';
const CURRENT_USER_KEY = 'korean_toktok_current_user_v1';

const defaultGuestUser: UserProfile = {
  id: 'guest',
  name: '게스트 학습자',
  email: 'guest@toktok.kr',
  avatarId: 'minho',
  nativeLanguage: '한국어',
  targetLevel: '초급',
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
  isGuest: true
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window === 'undefined') return defaultGuestUser;
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load user from localStorage:', e);
    }
    return defaultGuestUser;
  });

  const [cloudSyncStatus, setCloudSyncStatus] = useState<CloudSyncStatus>(() => {
    if (user.isGuest) return 'guest';
    return isSupabaseConfigured() ? 'synced' : 'offline';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync current user to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } catch (e) {
        console.error('Failed to save current user:', e);
      }
    }
    setCloudSyncStatus(user.isGuest ? 'guest' : isSupabaseConfigured() ? 'synced' : 'offline');
  }, [user]);

  // Listen to Supabase Auth State Changes for multi-device session sync
  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && event === 'SIGNED_IN') {
        const authUser = session.user;
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            avatarId: profile.avatar_id || 'minho',
            nativeLanguage: profile.native_language || '한국어',
            targetLevel: profile.target_level || '초급',
            createdAt: profile.created_at || new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            isGuest: false
          });
          setCloudSyncStatus('synced');
        }
      } else if (event === 'SIGNED_OUT') {
        // user signed out
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getStoredUsers = (): StoredAccount[] => {
    try {
      const list = localStorage.getItem(USERS_STORAGE_KEY);
      return list ? JSON.parse(list) : [];
    } catch {
      return [];
    }
  };

  const saveStoredUsers = (users: StoredAccount[]) => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users list:', e);
    }
  };

  // 1. Email/Password Login
  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const supabase = getSupabaseClient();

    // If Supabase is configured, attempt Supabase Auth first
    if (supabase) {
      try {
        setCloudSyncStatus('syncing');
        const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password
        });

        if (!authErr && authData.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

          const loadedUser: UserProfile = {
            id: authData.user.id,
            name: profile?.name || trimmedEmail.split('@')[0],
            email: trimmedEmail,
            avatarId: profile?.avatar_id || 'minho',
            nativeLanguage: profile?.native_language || '한국어',
            targetLevel: profile?.target_level || '초급',
            createdAt: profile?.created_at || new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            isGuest: false
          };

          setUser(loadedUser);
          setIsAuthModalOpen(false);
          setCloudSyncStatus('synced');
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase login failed, trying local fallback:', err);
      }
    }

    // Fallback to local accounts
    await new Promise((resolve) => setTimeout(resolve, 300));
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!found) {
      return { success: false, error: '등록되지 않은 이메일 주소입니다.' };
    }

    if (found.passwordHash && found.passwordHash !== password) {
      return { success: false, error: '비밀번호가 일치하지 않습니다.' };
    }

    const updatedUser: UserProfile = {
      id: found.id,
      name: found.name,
      email: found.email,
      avatarId: found.avatarId || 'minho',
      nativeLanguage: found.nativeLanguage || '한국어',
      targetLevel: found.targetLevel || '초급',
      createdAt: found.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isGuest: false
    };

    setUser(updatedUser);
    setIsAuthModalOpen(false);
    setCloudSyncStatus(isSupabaseConfigured() ? 'synced' : 'offline');
    return { success: true };
  }, []);

  // 2. Email/Password Sign Up
  const signup = useCallback(
    async (params: {
      name: string;
      email: string;
      password: string;
      nativeLanguage: string;
      avatarId: string;
      targetLevel: '초급' | '중급' | '고급';
    }): Promise<{ success: boolean; error?: string }> => {
      const trimmedEmail = params.email.trim().toLowerCase();
      const trimmedName = params.name.trim();

      if (!trimmedName) return { success: false, error: '이름(닉네임)을 입력해 주세요.' };
      if (!trimmedEmail || !trimmedEmail.includes('@')) return { success: false, error: '유효한 이메일을 입력해 주세요.' };
      if (!params.password || params.password.length < 6) return { success: false, error: '비밀번호는 최소 6자 이상이어야 합니다.' };

      const supabase = getSupabaseClient();

      // If Supabase is configured, attempt Supabase Auth Sign Up
      if (supabase) {
        try {
          setCloudSyncStatus('syncing');
          const { data: authData, error: authErr } = await supabase.auth.signUp({
            email: trimmedEmail,
            password: params.password,
            options: {
              data: {
                name: trimmedName,
                avatar_id: params.avatarId,
                native_language: params.nativeLanguage,
                target_level: params.targetLevel
              }
            }
          });

          if (authErr) {
            return { success: false, error: authErr.message };
          }

          if (authData.user) {
            // Upsert Profile
            await supabase.from('profiles').upsert({
              id: authData.user.id,
              email: trimmedEmail,
              name: trimmedName,
              avatar_id: params.avatarId || 'minho',
              native_language: params.nativeLanguage || '한국어',
              target_level: params.targetLevel || '초급',
              created_at: new Date().toISOString(),
              last_login_at: new Date().toISOString()
            });

            const newUser: UserProfile = {
              id: authData.user.id,
              name: trimmedName,
              email: trimmedEmail,
              avatarId: params.avatarId || 'minho',
              nativeLanguage: params.nativeLanguage || '한국어',
              targetLevel: params.targetLevel || '초급',
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString(),
              isGuest: false
            };

            setUser(newUser);
            setIsAuthModalOpen(false);
            setCloudSyncStatus('synced');
            return { success: true };
          }
        } catch (err: any) {
          console.warn('Supabase sign up error, fallback to local:', err);
        }
      }

      // Local Fallback Sign Up
      const users = getStoredUsers();
      if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
        return { success: false, error: '이미 가입된 이메일 주소입니다. 로그인해 주세요.' };
      }

      const newUser: StoredAccount = {
        id: `user_${Date.now()}`,
        name: trimmedName,
        email: trimmedEmail,
        passwordHash: params.password,
        avatarId: params.avatarId || 'minho',
        nativeLanguage: params.nativeLanguage || '한국어',
        targetLevel: params.targetLevel || '초급',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        isGuest: false
      };

      users.push(newUser);
      saveStoredUsers(users);

      setUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatarId: newUser.avatarId,
        nativeLanguage: newUser.nativeLanguage,
        targetLevel: newUser.targetLevel,
        createdAt: newUser.createdAt,
        lastLoginAt: newUser.lastLoginAt,
        isGuest: false
      });

      setIsAuthModalOpen(false);
      setCloudSyncStatus(isSupabaseConfigured() ? 'synced' : 'offline');
      return { success: true };
    },
    []
  );

  // 3. Guest Login
  const loginAsGuest = useCallback((name = '게스트 학습자', nativeLanguage = '한국어', avatarId = 'minho') => {
    setUser({
      id: `guest_${Date.now()}`,
      name,
      email: 'guest@toktok.kr',
      avatarId,
      nativeLanguage,
      targetLevel: '초급',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isGuest: true
    });
    setCloudSyncStatus('guest');
    setIsAuthModalOpen(false);
  }, []);

  // 4. Social Login (Google / Kakao)
  const socialLogin = useCallback(async (provider: 'google' | 'kakao'): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: provider === 'google' ? 'google' : 'kakao',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
        return { success: true };
      } catch (e: any) {
        console.warn('OAuth redirect error, using simulated social login:', e);
      }
    }

    // Local simulated social login
    await new Promise((resolve) => setTimeout(resolve, 400));
    const isGoogle = provider === 'google';
    const socialUser: UserProfile = {
      id: `${provider}_${Date.now()}`,
      name: isGoogle ? '구글 학습자' : '카카오 프렌즈',
      email: isGoogle ? 'google_user@gmail.com' : 'kakao_user@kakao.com',
      avatarId: isGoogle ? 'suyeon' : 'lihong',
      nativeLanguage: '한국어',
      targetLevel: '초급',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isGuest: false
    };

    setUser(socialUser);
    setIsAuthModalOpen(false);
    setCloudSyncStatus(isSupabaseConfigured() ? 'synced' : 'offline');
    return { success: true };
  }, []);

  // 5. Logout
  const logout = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase sign out error:', e);
      }
    }
    setUser(defaultGuestUser);
    setCloudSyncStatus('guest');
    setIsProfileModalOpen(false);
  }, []);

  // 6. Update Profile
  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      // Also update in stored accounts if not guest
      if (!prev.isGuest) {
        const users = getStoredUsers();
        const idx = users.findIndex((u) => u.id === prev.id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...updates };
          saveStoredUsers(users);
        }
      }
      return updated;
    });

    // Cloud update if logged in
    const supabase = getSupabaseClient();
    if (supabase && user.id && !user.isGuest) {
      try {
        await supabase.from('profiles').update({
          name: updates.name,
          avatar_id: updates.avatarId,
          native_language: updates.nativeLanguage,
          target_level: updates.targetLevel,
          updated_at: new Date().toISOString()
        }).eq('id', user.id);
      } catch (e) {
        console.warn('Failed to update profile in cloud:', e);
      }
    }
  }, [user]);

  const openAuthModal = useCallback((tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const openProfileModal = useCallback(() => {
    setIsProfileModalOpen(true);
  }, []);

  const closeProfileModal = useCallback(() => {
    setIsProfileModalOpen(false);
  }, []);

  const isAuthenticated = !user.isGuest;
  const isGuest = !!user.isGuest;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        cloudSyncStatus,
        isAuthModalOpen,
        authModalTab,
        isProfileModalOpen,
        login,
        signup,
        loginAsGuest,
        socialLogin,
        logout,
        updateProfile,
        openAuthModal,
        closeAuthModal,
        openProfileModal,
        closeProfileModal,
        setCloudSyncStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

