import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AppUser, Role } from '../types';
import { users } from '../data/mockData';
import { can, type Permission } from '../lib/rbac';

/**
 * Authentication + RBAC context.
 *
 * Mock login resolves an email to a seeded user (or a chosen demo role). To use
 * real auth, swap `login`/`logout` for Firebase Auth:
 *
 *   import { auth } from '@/src/lib/firebase';
 *   import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
 *
 * and resolve the user's role from a `users/{uid}` Firestore document.
 */

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, roleOverride?: Role) => Promise<AppUser>;
  logout: () => void;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'acc:v1:auth-user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const login = async (email: string, roleOverride?: Role): Promise<AppUser> => {
    // Simulate a network round-trip.
    await new Promise((r) => setTimeout(r, 400));
    const matched = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    const resolved: AppUser = matched
      ?? {
        ...users[0],
        id: 'u_demo',
        name: email.split('@')[0] || 'Demo gebruiker',
        email,
        role: roleOverride ?? 'super_admin',
      };
    const finalUser = roleOverride ? { ...resolved, role: roleOverride } : resolved;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalUser));
    setUser(finalUser);
    return finalUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    login,
    logout,
    can: (permission: Permission) => can(user?.role, permission),
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
