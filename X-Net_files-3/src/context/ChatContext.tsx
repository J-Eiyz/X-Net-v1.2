import  { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Message, ChatRoom, User } from '../types';

// Mock data for initial chat rooms
const initialRooms: ChatRoom[] = [
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

// Mock bot messages for offline mode
const botMessages = [
  "Have you tried the new Dranzer Spiral combo? It's been dominating tournaments!",
  "Did you see the championship match yesterday? That comeback was incredible!",
  "What's your favorite bit? I've been using Needle (N) with great results.",
  "The 3-60 ratchet seems to be the most balanced option for most blades.",
  "Anyone else having trouble with the Viper Tail defense setup?",
  "Just achieved a perfect launch with my new grip technique!",
  "Looking for battle partners in the Tokyo area. DM me if interested.",
  "The new stadium has really changed the meta. More stamina types are winning now.",
  "Wizard Arrow with 7-60 and Point bit is surprisingly effective!",
  "Remember when burst finishes were rare? Now they happen all the time!",
  "What's your launch technique? I'm trying to perfect the wrist snap."
];

// Bot usernames
const botUsernames = [
  "SpinMaster99", "BurstLegend", "BladeKing", "DranzerFan", 
  "VortexBlader", "StadiumPro", "MetalSoul", "RightSpinElite",
  "ChampionBlader", "TornadoLauncher", "SpeedGear"
];

interface ChatContextType {
  messages: Message[];
  rooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  isOnline: boolean;
  sendMessage: (text: string) => void;
  selectRoom: (roomId: string) => void;
  setOnlineStatus: (status: boolean) => void;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  rooms: [],
  activeRoom: null,
  isOnline: true,
  sendMessage: () => {},
  selectRoom: () => {},
  setOnlineStatus: () => {}
});

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<ChatRoom[]>(initialRooms);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(initialRooms[0]);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [botMessageInterval, setBotMessageInterval] = useState<number | null>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('x-net-messages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error('Failed to parse stored messages', e);
      }
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('x-net-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Handle bot messages in offline mode
  useEffect(() => {
    if (!isOnline && !botMessageInterval) {
      // Start sending bot messages in offline mode
      const intervalId = window.setInterval(() => {
        if (activeRoom) {
          // Get random message and username
          const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
          const randomUsername = botUsernames[Math.floor(Math.random() * botUsernames.length)];
          
          // Add message to state
          const newMessage: Message = {
            id: `bot-${Date.now()}`,
            text: randomMessage,
            senderName: randomUsername,
            timestamp: new Date().toISOString()
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
      }, randomInterval());
      
      setBotMessageInterval(intervalId);
    } else if (isOnline && botMessageInterval !== null) {
      // Stop bot messages when going back online
      clearInterval(botMessageInterval);
      setBotMessageInterval(null);
    }
    
    return () => {
      if (botMessageInterval !== null) {
        clearInterval(botMessageInterval);
      }
    };
  }, [isOnline, activeRoom]);

  // Random interval helper
  const randomInterval = () => Math.floor(Math.random() * 15000) + 5000; // 5-20 seconds

  // Send a message
  const sendMessage = (text: string) => {
    if (!activeRoom) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      senderName: 'You',
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);

    // In online mode, we would send to server
    // For now just simulate a response in offline mode
    if (!isOnline) {
      // Get random bot response after delay
      setTimeout(() => {
        const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
        const randomUsername = botUsernames[Math.floor(Math.random() * botUsernames.length)];
        
        const botResponse: Message = {
          id: `bot-${Date.now()}`,
          text: randomMessage,
          senderName: randomUsername,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, botResponse]);
      }, 1000 + Math.random() * 2000);
    }
  };

  // Select a chat room
  const selectRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId) || null;
    setActiveRoom(room);
  };

  // Set online status
  const setOnlineStatus = (status: boolean) => {
    setIsOnline(status);
  };

  const value = {
    messages,
    rooms,
    activeRoom,
    isOnline,
    sendMessage,
    selectRoom,
    setOnlineStatus
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}
 