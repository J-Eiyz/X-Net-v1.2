import  { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, AlertCircle } from 'lucide-react';
import { AIMessage } from '../types';
import { useAuth } from '../context/AuthContext';

export default function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  // Auto scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Load initial welcome message on first render
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: `ai-welcome-${Date.now()}`,
          text: "Hi there! I'm X-Net AI, your Beyblade X assistant. I can help with combo recommendations, strategy tips, and answer questions about Beyblade X. What would you like to know?",
          timestamp: new Date().toISOString(),
          isUser: false
        }
      ]);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      timestamp: new Date().toISOString(),
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Determine response based on user's input
    const userInput = inputValue.toLowerCase();
    let responseText = "";
    
    // Check for specific keywords to give contextual responses
    if (userInput.includes('combo') || userInput.includes('build') || userInput.includes('setup')) {
      responseText = "Based on current tournament data, some top performing combos include Wizard Arrow 7-60 Point (P) for attack, Dranzer Spiral 4-80 Needle (N) for stamina, and Knight Shield 3-60 Ball (B) for defense. Would you like more specific recommendations?";
    } else if (userInput.includes('tournament') || userInput.includes('event') || userInput.includes('competition')) {
      responseText = "The next major X-Net sanctioned tournament is scheduled for next weekend. Check the Events tab for registration details. Regional qualifiers are starting soon too!";
    } else if (userInput.includes('launch') || userInput.includes('launcher') || userInput.includes('technique')) {
      responseText = "For maximum spin speed, try the 45-degree angled launch with a quick wrist snap at release. This gives your Beyblade both rotational and lateral momentum for better performance.";
    } else if (userInput.includes('tip') || userInput.includes('advice') || userInput.includes('help')) {
      responseText = "A key tip many players miss: the weight distribution of your Beyblade matters as much as the parts selection. Heavier blades with center-weighted mass tend to have better stability against attack types.";
    } else if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
      responseText = `Hello${user ? ' ' + user.username : ''}! How can I help with your Beyblade X journey today?`;
    } else {
      // Generic responses if no keywords match
      const genericResponses = [
        "That's an interesting question about Beyblade X. The current meta favors balanced types with good stamina retention. Would you like to know more about specific part combinations?",
        "Based on recent tournament data, attack types are making a comeback. Have you experimented with the new Hells Scythe blade?",
        "Beyblade X strategy involves understanding the stadium dynamics too. The new hex-pattern stadiums tend to favor stamina types, while classic bowls benefit attack types.",
        "I'd recommend trying out different bit configurations. The Point (P) bit works surprisingly well with defense types despite being categorized as attack.",
        "Many bladers overlook the importance of the ratchet selection. The difference between a 3-60 and a 4-60 can be game-changing depending on your blade."
      ];
      responseText = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
    
    // Add AI response after delay
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: `ai-${Date.now()}`,
        text: responseText,
        timestamp: new Date().toISOString(),
        isUser: false
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      {/* AI header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-xblue-600 flex items-center justify-center mr-3">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">X-Net AI Assistant</h2>
            <p className="text-sm text-gray-400">
              Your Beyblade X expert powered by advanced AI
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-black">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="h-8 w-8 rounded-full bg-xblue-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
              )}
              
              <div 
                className={`max-w-sm sm:max-w-md rounded-lg px-4 py-2 ${
                  message.isUser 
                    ? 'bg-xblue-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
              >
                <p>{message.text}</p>
                <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-200' : 'text-gray-400'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.isUser && (
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="h-8 w-8 rounded-full bg-xblue-600 flex items-center justify-center mr-2 mt-1">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gray-800 rounded-lg px-4 py-2 text-gray-200 rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message to X-Net AI..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
          />
          <button
            type="submit"
            className="bg-xblue-600 hover:bg-xblue-700 rounded-r-md px-4 py-2 text-white flex items-center"
            disabled={isTyping}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
        <div className="max-w-3xl mx-auto mt-2 text-xs text-gray-500 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          Beyblade X expertise is offline-enabled. All responses are generated locally.
        </div>
      </div>
    </div>
  );
}
 