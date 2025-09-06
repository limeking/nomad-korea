export interface City {
  id: string;
  name: string;
  region: string;
  rating: number;
  monthlyBudget: number;
  nomadCount: number;
  growthRate: number;
  livingCost: number;
  housingCost: number;
  transportation: number;
  internet: number;
  safety: number;
  weather: number;
  coworking: number;
  image?: string;
  tags: string[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  author: string;
  avatar: string;
  location: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string[];
  isLiked?: boolean;
  isBookmarked?: boolean;
  commentsData?: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  isLiked?: boolean;
}

export interface CreatePostData {
  content: string;
  category?: string;
  tags?: string[];
  location?: string;
}

export interface UpdatePostData {
  content?: string;
  category?: string;
  tags?: string[];
  location?: string;
}

export interface UserFollow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface Statistic {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface PersonalizationFeature {
  icon: string;
  title: string;
  description: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface SearchFilters {
  region: string;
  budget: string;
  lifestyle: string;
  transportation: string;
  occupation: string;
}

export interface SearchContextType {
  searchQuery: string;
  filters: SearchFilters;
  filteredCities: City[];
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: UserPreferences;
  createdAt: string;
  lastLoginAt: string;
}

export interface UserPreferences {
  budget: number;
  preferredRegions: string[];
  lifestyle: string;
  occupation: string;
  transportation: string;
  priorities: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}