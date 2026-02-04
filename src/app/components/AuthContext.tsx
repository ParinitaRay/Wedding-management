import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'client' | 'admin') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'client' | 'admin'): Promise<boolean> => {
    // Mock authentication - in a real app, this would be an API call
    // Demo credentials: admin@wedding.com / admin123 for admin
    // Any other email with password123 for client
    
    if (role === 'admin' && email === 'admin@wedding.com' && password === 'admin123') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin'
      });
      return true;
    } else if (role === 'client' && password === 'password123') {
      setUser({
        id: '2',
        name: email.split('@')[0],
        email: email,
        role: 'client'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
