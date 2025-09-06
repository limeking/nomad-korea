'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '@/types/auth';

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Simple check for existing user data in localStorage
        if (typeof window !== 'undefined') {
          const userData = localStorage.getItem('nomad_korea_user');
          const token = localStorage.getItem('nomad_korea_auth_token');
          
          if (userData && token) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Import mock validation function
      const { validateCredentials } = await import('@/lib/mockData/users');
      const user = validateCredentials(email, password);
      
      if (!user) {
        return { success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다.' };
      }

      // Store auth data
      if (typeof window !== 'undefined') {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('nomad_korea_user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('nomad_korea_auth_token', btoa(JSON.stringify({ 
          userId: user.id, 
          email: user.email, 
          exp: Date.now() + 24 * 60 * 60 * 1000 
        })));
      }
      
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Validate input
      if (!data.name || !data.email || !data.password || !data.confirmPassword) {
        return { success: false, error: '모든 필수 필드를 입력해주세요.' };
      }

      if (data.password !== data.confirmPassword) {
        return { success: false, error: '비밀번호가 일치하지 않습니다.' };
      }

      if (data.password.length < 8) {
        return { success: false, error: '비밀번호는 8자 이상이어야 합니다.' };
      }

      // Import mock functions
      const { getUserByEmail, createMockUser } = await import('@/lib/mockData/users');
      
      // Check if user exists
      const existingUser = getUserByEmail(data.email);
      if (existingUser) {
        return { success: false, error: '이미 존재하는 이메일 주소입니다.' };
      }

      // Create new user
      const newUser = createMockUser({
        email: data.email,
        password: data.password,
        name: data.name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=3b82f6&color=fff`,
        preferences: data.preferences || {
          budget: 2500000,
          workStyle: 'cafe',
          preferredRegions: ['한국'],
          priorities: []
        }
      });

      // Store auth data
      if (typeof window !== 'undefined') {
        const { password: _, ...userWithoutPassword } = newUser;
        localStorage.setItem('nomad_korea_user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('nomad_korea_auth_token', btoa(JSON.stringify({ 
          userId: newUser.id, 
          email: newUser.email, 
          exp: Date.now() + 24 * 60 * 60 * 1000 
        })));
      }

      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nomad_korea_user');
      localStorage.removeItem('nomad_korea_auth_token');
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: '사용자가 로그인되어 있지 않습니다.' };
    }

    try {
      const updatedUser = { ...user, ...data };
      
      // Store updated data
      if (typeof window !== 'undefined') {
        const { password: _, ...userWithoutPassword } = updatedUser;
        localStorage.setItem('nomad_korea_user', JSON.stringify(userWithoutPassword));
      }
      
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: '프로필 업데이트 중 오류가 발생했습니다.' 
      };
    }
  };

  // Update preferences function
  const updatePreferences = async (preferences: Partial<User['preferences']>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      return { success: false, error: '사용자가 로그인되어 있지 않습니다.' };
    }

    const updatedPreferences = {
      ...user.preferences,
      ...preferences
    };

    return updateProfile({ preferences: updatedPreferences });
  };

  // Context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    updatePreferences
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h2>
            <p className="text-gray-600">이 페이지를 보려면 로그인해주세요.</p>
          </div>
        </div>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
};

export default AuthContext;