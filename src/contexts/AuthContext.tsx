import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // hydrate from localStorage
    try {
      const raw = localStorage.getItem('auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
        setToken(parsed.token ?? null);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    // persist to localStorage
    try {
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    } catch (e) {
      // ignore
    }
  }, [user, token]);

  const login = async (email: string, password: string, name?: string) => {
    // Mocked password handling; backend ignores it for now
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Login failed');
    }
    const data = await res.json();
    setUser(data.user as User);
    setToken(data.token as string);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem('auth');
    } catch (e) {
      // ignore
    }
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
