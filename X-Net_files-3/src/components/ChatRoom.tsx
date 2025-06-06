import  { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { Message } from '../types';
import OnlineOfflineToggle from './OnlineOfflineToggle';

export default function ChatRoom() {
  const [inputValue, setInputValue] = useState('');
  const { 
    messages, 
    sendMessage, 
    activeRoom, 
    isOnline, 
    setOnlineStatus 
  } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    sendMessage(inputValue);
    setInputValue('');
  };
  
  // Filter messages for active room (in a real app, this would be done by the backend)
  const roomMessages = messages;
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="bg-gray-900 border-b border-gray-800 p-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {activeRoom?.name || 'Chat Room'}
          </h2>
          {activeRoom && (
            <p className="text-sm text-gray-400">
              {activeRoom.description}
            </p>
          )}
        </div>
        
        <OnlineOfflineToggle isOnline={isOnline} onChange={setOnlineStatus} />
      </div>
      
      {/* Network status banner */}
      {!isOnline && (
        <div className="bg-yellow-900/30 border-b border-yellow-900 px-4 py-2 flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <p className="text-sm text-yellow-500">
            You're in offline mode. Messages will be simulated by the app.
          </p>
        </div>
      )}
      
      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-black">
        <div className="space-y-4">
          {roomMessages.map((message: Message) => (
            <div 
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs sm:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                  message.isUser 
                    ? 'bg-xblue-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
              >
                {!message.isUser && (
                  <div className="font-medium text-xs text-gray-400 mb-1">
                    {message.senderName}
                  </div>
                )}
                <p>{message.text}</p>
                <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-200' : 'text-gray-400'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="bg-gray-900 border-t border-gray-800 p-3">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
          />
          <button
            type="submit"
            className="bg-xblue-600 hover:bg-xblue-700 rounded-r-md px-4 py-2 text-white flex items-center"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
 