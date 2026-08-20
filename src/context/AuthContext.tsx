import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ExperienceLevel, LearningGoal, TimeCommitment } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogleDemo: () => Promise<void>;
  logout: () => void;
  updateOnboarding: (data: {
    experienceLevel: ExperienceLevel;
    learningGoals: LearningGoal[];
    dailyTimeMinutes: TimeCommitment;
    startingPathId: string;
  }) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetPassword: (email: string) => Promise<boolean>;
}

const DEFAULT_USER: UserProfile = {
  id: 'user-demo-atlas',
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  role: 'user',
  subscriptionTier: 'free',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  experienceLevel: 'know_basics',
  learningGoals: ['better_at_job', 'build_products'],
  dailyTimeMinutes: 10,
  startingPathId: 'path-2',
  onboardingCompleted: true,
  fluencyScore: 48,
  currentStreak: 3,
  longestStreak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalMinutesLearned: 64,
  completedLessonsCount: 4,
  passedQuizzesCount: 4,
  createdAt: '2026-08-01',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'ai_atlas_user_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const loggedInUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      name: email.split('@')[0].replace('.', ' '),
    };
    setUser(loggedInUser);
    setIsLoading(false);
    return true;
  };

  const signup = async (name: string, email: string, _pass: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
      subscriptionTier: 'free',
      experienceLevel: 'completely_new',
      learningGoals: ['understand_revolution'],
      dailyTimeMinutes: 10,
      startingPathId: 'path-1',
      onboardingCompleted: false, // will trigger onboarding
      fluencyScore: 0,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalMinutesLearned: 0,
      completedLessonsCount: 0,
      passedQuizzesCount: 0,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const loginWithGoogleDemo = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setUser({
      ...DEFAULT_USER,
      name: 'Google Learner',
      email: 'learner@gmail.com',
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const updateOnboarding = (data: {
    experienceLevel: ExperienceLevel;
    learningGoals: LearningGoal[];
    dailyTimeMinutes: TimeCommitment;
    startingPathId: string;
  }) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      ...data,
      onboardingCompleted: true,
      fluencyScore: Math.max(user.fluencyScore, 15),
    };
    setUser(updated);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  const resetPassword = async (_email: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogleDemo,
        logout,
        updateOnboarding,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
