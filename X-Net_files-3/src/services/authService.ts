import  { User, AuthCredentials } from '../types';

// This would connect to your backend API in a real application
export const authService = {
  login: async (credentials: AuthCredentials): Promise<User> => {
    // Simulating API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, this would validate with your backend
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          resolve({
            id: '1',
            username: credentials.email.split('@')[0],
            email: credentials.email,
            isVerified: true,
            authProvider: 'email'
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },
  
  signup: async (credentials: AuthCredentials, username: string): Promise<User> => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          username,
          email: credentials.email,
          isVerified: true,
          authProvider: 'email'
        });
      }, 1000);
    });
  },
  
  loginWithGoogle: async (): Promise<User> => {
    // In a real app, this would redirect to Google OAuth flow
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          username: 'google_user',
          email: 'google_user@gmail.com',
          avatarUrl: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=100&auto=format&fit=crop',
          isVerified: true,
          authProvider: 'google'
        });
      }, 1000);
    });
  },
  
  loginWithFacebook: async (): Promise<User> => {
    // In a real app, this would redirect to Facebook OAuth flow
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          username: 'facebook_user',
          email: 'facebook_user@example.com',
          avatarUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=100&auto=format&fit=crop',
          isVerified: true,
          authProvider: 'facebook'
        });
      }, 1000);
    });
  },
  
  getGuestUser: (username?: string): User => {
    const guestName = username || `Guest_${Math.floor(Math.random() * 10000)}`;
    return {
      id: Math.random().toString(36).substring(2, 9),
      username: guestName,
      isVerified: true,
      authProvider: 'guest'
    };
  }
};
 