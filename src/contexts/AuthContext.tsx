'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType, RegisterData, LoginData } from '@/types';
import { authService } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.login({ email, password });
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(data);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) throw new Error('로그인이 필요합니다.');
    
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile(user.id, data);
      setUser(updatedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.loginWithGoogle();
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithKakao = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.loginWithKakao();
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};