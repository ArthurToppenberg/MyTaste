import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthProviderProps {
  notAuthenticated: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode, authProviderProps: AuthProviderProps }> = ({ children, authProviderProps }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const login = (username: string, password: string) => {setIsAuthenticated(true); setEmail(username);};
  const logout = () => setIsAuthenticated(false);

  const { notAuthenticated } = authProviderProps;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, email }}>
      {isAuthenticated ? children : notAuthenticated}
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
