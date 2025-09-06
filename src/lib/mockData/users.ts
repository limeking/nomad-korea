import { User } from '@/types/auth';

// Mock users for testing authentication
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    password: 'password123', // In real app, this would be hashed
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    preferences: {
      favoriteCity: '서울',
      budget: 3000000,
      workStyle: 'coworking',
      preferredRegions: ['한국', '일본'],
      lifestyle: '도시형',
      occupation: '개발자',
      transportation: '대중교통',
      priorities: ['인터넷 속도', '카페', '교통편의']
    },
    createdAt: new Date('2024-01-15'),
    lastLoginAt: new Date('2025-09-05')
  },
  {
    id: '2',
    email: 'sarah.kim@example.com',
    password: 'securepass456',
    name: 'Sarah Kim',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face',
    preferences: {
      favoriteCity: '제주',
      budget: 2500000,
      workStyle: 'cafe',
      preferredRegions: ['한국'],
      lifestyle: '자연친화',
      occupation: '디자이너',
      transportation: '자전거',
      priorities: ['자연환경', '카페', '안전']
    },
    createdAt: new Date('2024-02-20'),
    lastLoginAt: new Date('2025-09-04')
  },
  {
    id: '3',
    email: 'alex.park@example.com',
    password: 'mypassword789',
    name: 'Alex Park',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    preferences: {
      favoriteCity: '부산',
      budget: 2800000,
      workStyle: 'home',
      preferredRegions: ['한국', '태국'],
      lifestyle: '균형잡힌',
      occupation: '마케터',
      transportation: '도보',
      priorities: ['생활비', '해변접근', '문화생활']
    },
    createdAt: new Date('2024-03-10'),
    lastLoginAt: new Date('2025-09-03')
  },
  {
    id: '4',
    email: 'emily.lee@example.com',
    password: 'password2024',
    name: 'Emily Lee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    preferences: {
      favoriteCity: '대구',
      budget: 3200000,
      workStyle: 'coworking',
      preferredRegions: ['한국', '싱가포르'],
      lifestyle: '도시형',
      occupation: '컨설턴트',
      transportation: '대중교통',
      priorities: ['네트워킹', '인터넷 속도', '교통편의']
    },
    createdAt: new Date('2024-04-05'),
    lastLoginAt: new Date('2025-09-02')
  },
  {
    id: '5',
    email: 'michael.choi@example.com',
    password: 'choimichael123',
    name: 'Michael Choi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    preferences: {
      favoriteCity: '인천',
      budget: 2700000,
      workStyle: 'cafe',
      preferredRegions: ['한국', '베트남'],
      lifestyle: '미니멀',
      occupation: '작가',
      transportation: '대중교통',
      priorities: ['조용한 환경', '카페', '문화생활']
    },
    createdAt: new Date('2024-05-12'),
    lastLoginAt: new Date('2025-09-01')
  }
];

// Demo credentials for easy testing
export const demoCredentials = [
  { email: 'john.doe@example.com', password: 'password123' },
  { email: 'sarah.kim@example.com', password: 'securepass456' },
  { email: 'alex.park@example.com', password: 'mypassword789' },
  { email: 'emily.lee@example.com', password: 'password2024' },
  { email: 'michael.choi@example.com', password: 'choimichael123' }
];

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Helper function to get user by id
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to create new user (for registration)
export const createMockUser = (userData: Omit<User, 'id' | 'createdAt' | 'lastLoginAt'>): User => {
  const newUser: User = {
    ...userData,
    id: Date.now().toString(), // Simple ID generation for mock data
    createdAt: new Date(),
    lastLoginAt: new Date()
  };
  
  // In a real app, you'd save to database
  mockUsers.push(newUser);
  
  return newUser;
};

// Helper function to validate credentials
export const validateCredentials = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    return { ...user, lastLoginAt: new Date() };
  }
  return null;
};