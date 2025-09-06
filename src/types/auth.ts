// Auth types - Mock data based authentication system

export interface User {
  id: string;
  email: string;
  password: string; // For mock data verification (would be hashed in real system)
  name: string;
  avatar?: string;
  preferences: {
    favoriteCity?: string;
    budget?: number;
    workStyle?: 'cafe' | 'coworking' | 'home';
    preferredRegions?: string[];
    lifestyle?: string;
    occupation?: string;
    transportation?: string;
    priorities?: string[];
  };
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<{ success: boolean; error?: string }>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  preferences?: {
    favoriteCity?: string;
    budget?: number;
    workStyle?: 'cafe' | 'coworking' | 'home';
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Mock data types
export interface MockAuthToken {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

export interface AuthError {
  type: 'validation' | 'authentication' | 'authorization' | 'network';
  message: string;
  field?: string;
}