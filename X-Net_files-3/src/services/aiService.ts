import  { AIMessage } from '../types';

const AI_STORAGE_KEY = 'x-net-ai-messages';

// Beyblade knowledge base for offline responses
const beybladeInfo = {
  generalResponses: [
    "Beyblade X introduces revolutionary ratchet technology that gives battlers more control than ever before!",
    "In competitive Beyblade X, attack types generally beat stamina types, stamina beats defense, and defense beats attack - but combos can change everything!",
    "The most popular Beyblade X stadiums include the Hyper Vortex, Burst Zone, and the professional-grade Ultimate Tournament Set.",
    "Beyblade X allows for mixing different parts to create millions of possible combinations. Finding the right balance is key to victory!",
    "The Beyblade X World Championship takes place annually with qualifiers in over 30 countries. Last year's champion used a balanced combo with excellent LAD.",
    "The most durable Bit in Beyblade X is currently the Heavy Metal Core, while the Metal Fusion Disc provides the best weight distribution."
  ],
  comboResponses: [
    "For attack-focused combos, try pairing a Dran Sword blade with the 4-60F ratchet. The added friction gives you explosive power!",
    "A great defensive combo would be Shadow Blade with the 3-70B bit. This gives you excellent balance and stamina while maintaining knockback power.",
    "The best stamina setup I've seen is using the Galaxy Wheel with a 5-88S ratchet. It can outlast almost any opponent!",
    "For beginners, I recommend the Cyber Wing with a balanced 4-55B configuration. It's forgiving while you learn proper launch techniques.",
    "Tournament winners often use the Phoenix Blade with custom weight discs. The 3-75A setup is particularly effective against attack types."
  ],
  strategyResponses: [
    "When facing attack types, try to launch with maximum RPM to establish a strong defense before they make contact.",
    "Against stamina types, focus on quick, powerful hits rather than prolonged battles. Don't let them settle into their spin pattern!",
    "The 'Banking Shot' technique, where you launch at an angle to ride the stadium wall, can be devastating against center-spinning opponents.",
    "Practice your launch angle consistency. Even a 5-degree variation can dramatically change your Beyblade's performance.",
    "Study your opponent's launch style before choosing your combo. If they favor right launches, counter with a left-spin blade for maximum clash impact."
  ]
};

// Helper function to get a contextual offline response based on user query
function getOfflineResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  // Check if asking about combos
  if (lowerMsg.includes('combo') || lowerMsg.includes('build') || lowerMsg.includes('parts') || lowerMsg.includes('setup')) {
    return beybladeInfo.comboResponses[Math.floor(Math.random() * beybladeInfo.comboResponses.length)];
  }
  
  // Check if asking about strategy
  if (lowerMsg.includes('strategy') || lowerMsg.includes('technique') || lowerMsg.includes('beat') || lowerMsg.includes('win') || lowerMsg.includes('launch')) {
    return beybladeInfo.strategyResponses[Math.floor(Math.random() * beybladeInfo.strategyResponses.length)];
  }
  
  // Default to general responses
  return beybladeInfo.generalResponses[Math.floor(Math.random() * beybladeInfo.generalResponses.length)];
}

// Get default welcome message for new users
function getDefaultWelcomeMessage(): AIMessage[] {
  return [
    {
      id: `ai-welcome-${Date.now()}`,
      text: "Hi there! I'm X-Net AI, your Beyblade X assistant. I can help with combo recommendations, battle strategies, and answer any questions about the Beyblade X world. What would you like to know today?",
      timestamp: new Date().toISOString(),
      isUser: false
    }
  ];
}

export const aiService = {
  // Get initial messages from localStorage or return welcome message
  getInitialMessages: (): AIMessage[] => {
    const storedMessages = localStorage.getItem(AI_STORAGE_KEY);
    if (storedMessages) {
      try {
        return JSON.parse(storedMessages);
      } catch (e) {
        console.error('Failed to parse stored AI messages', e);
        return getDefaultWelcomeMessage();
      }
    }
    return getDefaultWelcomeMessage();
  },

  // Send message to AI assistant
  sendMessage: async (message: string, isOnline: boolean): Promise<AIMessage> => {
    // If offline, use the offline response system with Beyblade knowledge
    if (!isOnline) {
      return {
        id: `ai-offline-${Date.now()}`,
        text: getOfflineResponse(message),
        timestamp: new Date().toISOString(),
        isUser: false
      };
    }
    
    try {
      // For simulation, just return a simple response based on the message content
      // In a real app, you'd call an actual AI API
      const aiResponse = getOfflineResponse(message);
      
      return {
        id: `ai-online-${Date.now()}`,
        text: aiResponse,
        timestamp: new Date().toISOString(),
        isUser: false
      };
    } catch (error) {
      console.error('Error calling AI service:', error);
      // Fallback to offline response if API call fails
      return {
        id: `ai-fallback-${Date.now()}`,
        text: getOfflineResponse(message),
        timestamp: new Date().toISOString(),
        isUser: false
      };
    }
  },

  // Save messages to localStorage
  saveMessages: (messages: AIMessage[]): void => {
    localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(messages.slice(-50))); // Keep only last 50 messages
  },

  // Clear chat history
  clearMessages: (): void => {
    localStorage.removeItem(AI_STORAGE_KEY);
  }
};
 