'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { City, SearchFilters, SearchContextType } from '@/types';
import { mockCities, getFilteredCities } from './mockData';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const initialFilters: SearchFilters = {
  region: 'all',
  budget: 'all',
  lifestyle: 'all',
  transportation: 'all',
  occupation: 'all'
};

interface SearchProviderProps {
  children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCities = useMemo(() => {
    // 검색이 있을 때 로딩 시뮬레이션
    if (searchQuery || Object.values(filters).some(value => value && value !== '' && value !== 'all')) {
      setIsLoading(true);
      // 실제로는 API 호출, 여기서는 시뮬레이션
      setTimeout(() => setIsLoading(false), 300);
    }
    return getFilteredCities(mockCities, searchQuery, filters);
  }, [searchQuery, filters]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    console.log('SearchContext: Updating filters:', newFilters);
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };
      console.log('SearchContext: New filter state:', updated);
      return updated;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchQuery('');
  }, []);

  const contextValue = useMemo<SearchContextType>(() => ({
    searchQuery,
    filters,
    filteredCities,
    isLoading,
    setSearchQuery,
    setFilters: updateFilters,
    resetFilters
  }), [searchQuery, filters, filteredCities, isLoading, updateFilters, resetFilters]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}