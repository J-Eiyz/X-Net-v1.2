import  { Post, ChatRoom, BeybladeCombo } from '../types';

// Initial chat rooms
export const initialChatRooms: ChatRoom[] = [
  {
    id: 'global',
    name: 'Global Arena',
    description: 'Public chat for all bladers worldwide',
    isPrivate: false,
    userCount: 124,
    iconName: 'Globe'
  },
  {
    id: 'combos',
    name: 'Combo Exchange',
    description: 'Share and discuss powerful Beyblade builds',
    isPrivate: false,
    userCount: 57,
    iconName: 'Settings'
  },
  {
    id: 'events',
    name: 'Tournament Zone',
    description: 'Find battles and organized events',
    isPrivate: false,
    userCount: 36,
    iconName: 'Trophy'
  }
];

// Sample posts for the community feed
export const samplePosts: Post[] = [
  {
    id: 'post-1',
    content: 'Just won my first regional tournament with my Wizard Arrow 3-80 Point combo! The attack power is insane. 🏆',
    mediaUrl: 'https://images.unsplash.com/photo-1567346953362-1bb30e3c10ed?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxiZXlibGFkZSUyMHglMjBidXJzdCUyMGJhdHRsZSUyMGFyZW5hfGVufDB8fHx8MTc0OTIxNDEyOHww&ixlib=rb-4.1.0',
    mediaType: 'image',
    likes: 42,
    comments: 15,
    author: {
      id: 'user-1',
      username: 'SpinMaster99',
    },
    createdAt: '2023-09-15T14:23:00Z',
    hasLiked: false
  },
  {
    id: 'post-2',
    content: 'Check out this new Beyblade X arena at the mall! They have weekly tournaments every Saturday. Who wants to join?',
    mediaUrl: 'https://images.unsplash.com/photo-1693765928037-fc20daa4c26f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxiZXlibGFkZSUyMHglMjBidXJzdCUyMGJhdHRsZSUyMGFyZW5hfGVufDB8fHx8MTc0OTIxNDEyOHww&ixlib=rb-4.1.0',
    mediaType: 'image',
    likes: 78,
    comments: 23,
    author: {
      id: 'user-2',
      username: 'BladeQueen',
    },
    createdAt: '2023-09-12T09:14:30Z',
    hasLiked: true
  },
  {
    id: 'post-3',
    content: 'Testing out my new Knight Shield defense build. Almost unbeatable in endurance battles!',
    likes: 24,
    comments: 7,
    author: {
      id: 'user-3',
      username: 'DefenseKing',
      avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop',
    },
    createdAt: '2023-09-10T21:45:12Z',
    hasLiked: false
  }
];

// Sample Beyblade combos
export const sampleCombos: BeybladeCombo[] = [
  {
    id: 'combo-1',
    name: 'Phoenix Destroyer',
    blade: 'Dranzer Spiral',
    ratchet: '3-80',
    bit: 'Point (P)',
    tags: ['Attack', 'Balance'],
    wins: 24,
    losses: 7,
    creator: {
      id: 'user-1',
      username: 'SpinMaster99'
    },
    createdAt: '2023-09-05T12:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1734623046892-4a0afc9a95ad?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxiZXlibGFkZSUyMHglMjBidXJzdCUyMGJhdHRsZSUyMGFyZW5hfGVufDB8fHx8MTc0OTIxNDEyOHww&ixlib=rb-4.1.0'
  },
  {
    id: 'combo-2',
    name: 'Endurance King',
    blade: 'Knight Shield',
    ratchet: '4-80',
    bit: 'Ball (B)',
    tags: ['Defense', 'Stamina'],
    wins: 18,
    losses: 4,
    creator: {
      id: 'user-3',
      username: 'DefenseKing',
      avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop',
    },
    createdAt: '2023-09-03T15:20:45Z'
  },
  {
    id: 'combo-3',
    name: 'Burst Wizard',
    blade: 'Wizard Arrow',
    ratchet: '3-60',
    bit: 'Needle (N)',
    tags: ['Attack'],
    creator: {
      id: 'user-2',
      username: 'BladeQueen'
    },
    createdAt: '2023-08-29T18:11:32Z'
  }
];
 