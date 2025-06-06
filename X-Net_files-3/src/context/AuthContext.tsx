import  { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  continueAsGuest: () => void;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: () => {},
  signup: () => {},
  loginWithGoogle: () => {},
  loginWithFacebook: () => {},
  continueAsGuest: () => {},
  logout: () => {},
  clearError: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('x-net-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('x-net-user');
      }
    }
  }, []);

  // Login function
  const login = (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      if (password.length < 6) {
        setError('Invalid credentials. Please try again.');
        setIsLoading(false);
        return;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        role: 'user',
      };

      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  // Signup function
  const signup = (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        role: 'user',
      };

      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  // Google login simulation
  const loginWithGoogle = () => {
    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      const newUser: User = {
        id: `google-${Date.now()}`,
        username: 'Google User',
        email: 'user@gmail.com',
        role: 'user',
      };

      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  // Facebook login simulation
  const loginWithFacebook = () => {
    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      const newUser: User = {
        id: `fb-${Date.now()}`,
        username: 'Facebook User',
        role: 'user',
      };

      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  // Guest login
  const continueAsGuest = () => {
    setIsLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      const newUser: User = {
        id: `guest-${Date.now()}`,
        username: `Guest-${Math.floor(Math.random() * 10000)}`,
        role: 'guest',
      };

      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 500);
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('x-net-user');
  };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    error,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    continueAsGuest,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
 