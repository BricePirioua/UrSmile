// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseService, UserData } from '../services/firebase';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (firstName: string, birthDate: Date) => Promise<void>;
  logout: () => void;
  updateUser: (userData: UserData) => Promise<void>;
  updateUserMood: (mood: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (firstName: string, birthDate: Date) => {
    try {
      const userData = await firebaseService.loginUser(firstName, birthDate);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = async (userData: UserData) => {
    try {
      await firebaseService.updateUser(userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const updateUserMood = async (mood: string) => {
    if (!user?.id) return;
    try {
      await firebaseService.updateMood(user.id, mood);
      setUser(prev => prev ? {
        ...prev,
        lastMood: {
          mood,
          timestamp: new Date()
        }
      } : null);
    } catch (error) {
      console.error('Error updating mood:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      logout,
      updateUser,
      updateUserMood 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};