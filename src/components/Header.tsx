'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, MessageCircle, User } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xl font-bold text-gray-900">한국노마드</span>
            </div>

            <div className="hidden md:flex items-center max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="검색..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>커뮤니티</span>
            </Button>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>로그인</span>
            </Button>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="검색..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <Button variant="ghost" className="flex items-center space-x-2 justify-start">
                <MessageCircle className="h-4 w-4" />
                <span>커뮤니티</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 justify-start">
                <User className="h-4 w-4" />
                <span>로그인</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}