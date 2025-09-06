import { User, RegisterData, LoginData } from '@/types';

const AUTH_STORAGE_KEY = 'nomad-korea-auth';
const USERS_STORAGE_KEY = 'nomad-korea-users';

// Mock users database (in real app, this would be API calls)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'test@example.com',
    name: '테스트 사용자',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-01-01T00:00:00Z',
    preferences: {
      budget: 2000000,
      preferredRegions: ['서울'],
      lifestyle: '활발한',
      occupation: '개발자',
      transportation: '대중교통',
      priorities: ['카페', '인터넷']
    }
  }
];

// Initialize mock users in localStorage
const initializeMockUsers = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
    }
  }
};

const getMockUsers = (): User[] => {
  if (typeof window === 'undefined') return mockUsers;
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockUsers;
};

const saveMockUsers = (users: User[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const authService = {
  async login(data: LoginData): Promise<User> {
    initializeMockUsers();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getMockUsers();
    const user = users.find(u => u.email === data.email);
    
    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    
    // In real app, verify password hash
    if (data.password !== 'password') {
      throw new Error('비밀번호가 올바르지 않습니다.');
    }
    
    // Update last login
    user.lastLoginAt = new Date().toISOString();
    saveMockUsers(users);
    
    // Store auth token (in real app, this would be JWT)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ userId: user.id, token: 'mock-token' }));
    
    return user;
  },

  async register(data: RegisterData): Promise<User> {
    initializeMockUsers();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.password !== data.confirmPassword) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    
    const users = getMockUsers();
    const existingUser = users.find(u => u.email === data.email);
    
    if (existingUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    saveMockUsers(users);
    
    // Store auth token
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ userId: newUser.id, token: 'mock-token' }));
    
    return newUser;
  },

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === 'undefined') return null;
    
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!authData) return null;
    
    try {
      const { userId } = JSON.parse(authData);
      const users = getMockUsers();
      return users.find(u => u.id === userId) || null;
    } catch {
      return null;
    }
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getMockUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    
    users[userIndex] = { ...users[userIndex], ...data };
    saveMockUsers(users);
    
    return users[userIndex];
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      // Remove authentication data
      localStorage.removeItem(AUTH_STORAGE_KEY);
      
      // Remove only personal activity data (not community-wide data)
      const personalDataKeys = [
        'nomad-korea-likes',
        'nomad-korea-bookmarks', 
        'nomad-korea-follows'
      ];
      
      personalDataKeys.forEach(key => {
        localStorage.removeItem(key);
      });
    }
  },

  // Social login simulation
  async loginWithGoogle(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockGoogleUser: User = {
      id: Date.now().toString(),
      email: 'google@example.com',
      name: 'Google 사용자',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ userId: mockGoogleUser.id, token: 'mock-google-token' }));
    
    const users = getMockUsers();
    users.push(mockGoogleUser);
    saveMockUsers(users);
    
    return mockGoogleUser;
  },

  async loginWithKakao(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockKakaoUser: User = {
      id: Date.now().toString(),
      email: 'kakao@example.com',
      name: '카카오 사용자',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ userId: mockKakaoUser.id, token: 'mock-kakao-token' }));
    
    const users = getMockUsers();
    users.push(mockKakaoUser);
    saveMockUsers(users);
    
    return mockKakaoUser;
  }
};