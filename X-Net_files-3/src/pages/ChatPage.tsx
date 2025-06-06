import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import ChatRoom from '../components/ChatRoom';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { rooms, activeRoom, selectRoom } = useChat();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Login to access chat
            </h2>
            <p className="text-gray-400 mb-6">
              You need to be logged in to connect with other bladers.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-xblue-600 hover:bg-xblue-700 text-white px-5 py-2 rounded-md"
            >
              Login / Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Chat room sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 hidden md:block">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-xblue-500" />
                Chat Rooms
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {rooms.map(room => (
                <button
                  key={room.id}
                  className={`w-full flex items-start p-3 rounded-md mb-1 text-left ${
                    activeRoom?.id === room.id 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                  onClick={() => selectRoom(room.id)}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <MessageSquare className="h-4 w-4 text-xblue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{room.name}</p>
                    <div className="flex items-center text-xs mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{room.userCount || 0} online</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}
 