import React, { useState } from 'react';
import { Search, LogIn, Moon, Sun, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { LoginModal } from './LoginModal';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const submitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchTerm.trim();
    navigate(q ? `/courses?q=${encodeURIComponent(q)}` : '/courses');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'COURSES', to: '/courses' },
    { label: 'RESOURCES', to: '/resources' },
    { label: 'DASHBOARD & ATTENDANCE', to: '/dashboard-attendance' },
    { label: 'COMMUNITY/TEAM', to: '/community' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent hover:scale-105 transition-smooth"
            >
              EdTech
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={submitSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses, resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 bg-secondary/50 border-border/50 focus:bg-background transition-colors"
              />
              <button type="submit" className="hidden" aria-hidden="true" />
            </form>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-9 w-9 p-0 hover:bg-secondary"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-9 w-9 p-0 hover:bg-secondary"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>

            {/* Auth Area */}
            {!user ? (
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-accent text-white border-0 hover:scale-105 hover:shadow-glow transition-smooth"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="h-9 w-9 rounded-full bg-gradient-accent text-white flex items-center justify-center font-semibold">
                  {user.name?.[0]?.toUpperCase() ?? user.email[0].toUpperCase()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="hover:scale-105"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search - Shown when menu is open */}
        {isMenuOpen && (
          <div className="border-t bg-background/95 backdrop-blur md:hidden">
            <div className="container py-4 space-y-4">
              <form onSubmit={submitSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses, resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 bg-secondary/50 border-border/50"
                />
                <button type="submit" className="hidden" aria-hidden="true" />
              </form>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        {isMenuOpen && (
          <nav className="border-t bg-gradient-subtle">
            <div className="container py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="group p-4 rounded-lg bg-card border hover:shadow-card transition-smooth hover-lift"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <h3 className="font-semibold text-sm mb-2 text-foreground group-hover:bg-gradient-accent group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {item.label === 'COURSES' && 'Explore our comprehensive course library'}
                      {item.label === 'RESOURCES' && 'Access learning materials and tools'}
                      {item.label === 'DASHBOARD & ATTENDANCE' && 'Track your progress and attendance'}
                      {item.label === 'COMMUNITY/TEAM' && 'Connect with peers and instructors'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};