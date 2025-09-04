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
  author: string;
  avatar: string;
  location: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
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