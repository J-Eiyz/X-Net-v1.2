//  User types
export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  role: string;
  isVerified?: boolean;
  authProvider?: string;
  createdAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

// Chat and messages
export interface Message {
  id: string;
  text: string;
  senderId?: string;
  senderName: string;
  timestamp: string;
  isUser?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  userCount?: number;
  lastActivity?: string;
  iconName?: string;
}

// AI Assistant
export interface AIMessage {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

// Beyblade combos
export interface BeybladeCombo {
  id: string;
  name: string;
  blade: string;
  ratchet: string;
  bit: string;
  tags: string[];
  wins?: number;
  losses?: number;
  creator: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
  imageUrl?: string;
}

// Community posts
export interface Post {
  id: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  likes: number;
  comments: number;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
  hasLiked?: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: string;
}

// Music player
export interface Song {
  id: string;
  title: string;
  artist?: string;
  url: string;
  savedOffline: boolean;
}
 