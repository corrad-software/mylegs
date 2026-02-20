
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { useData } from './DataContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  loginAsAdmin: () => void;
  loginAsGuest: () => void;
  logout: () => void;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { users } = useData();

  const login = (email: string, pass: string) => {
    // Check against dynamic users list in DataContext
    const foundUser = users.find(u => u.email === email && u.password === pass && u.status === 'Active');
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const loginAsAdmin = () => {
    // Helper for direct admin access
    const adminUser = users.find(u => u.role === 'admin');
    if (adminUser) {
      setUser(adminUser);
    } else {
       // Fallback if no admin in DB (shouldn't happen with init data)
       setUser({
        id: 'admin-temp',
        email: 'admin@mylegs.app',
        name: 'System Admin',
        tierId: 'premium',
        role: 'admin',
        joined: new Date().toISOString(),
        status: 'Active'
      });
    }
  };

  const loginAsGuest = () => {
    // Log in as the default free user (John Doe) or create a guest session
    const guestUser = users.find(u => u.email === 'john@gmail.com') || users.find(u => u.tierId === 'free');
    
    if (guestUser) {
      setUser(guestUser);
    } else {
       setUser({
        id: 'guest',
        email: 'student@mylegs.app',
        name: 'Student Guest',
        tierId: 'free',
        role: 'user',
        joined: new Date().toISOString(),
        status: 'Active'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, tierId: 'premium' });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPremium, loginAsAdmin, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
