import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Settings, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import ComboCard from '../components/ComboCard';
import { useAuth } from '../context/AuthContext';
import { sampleCombos } from '../data/mockData';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'combos' | 'posts' | 'settings'>('combos');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get combos from localStorage or use sample data
  const getUserCombos = () => {
    try {
      const combos = JSON.parse(localStorage.getItem('x-net-combos') || '[]');
      if (combos.length === 0) {
        return sampleCombos;
      }
      return combos;
    } catch (e) {
      return sampleCombos;
    }
  };
  
  const combos = getUserCombos();
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <User className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Login to view profile
            </h2>
            <p className="text-gray-400 mb-6">
              You need to be logged in to access your profile.
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
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center mr-6 mb-4 md:mb-0">
              {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {user?.username}
              </h1>
              
              <div className="mt-2 flex flex-wrap items-center text-sm text-gray-400">
                <span className="mr-4">{user?.email}</span>
                <span>Joined {new Date().toLocaleDateString()}</span>
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-white text-sm transition-colors">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Profile
                </button>
                
                <button 
                  className="flex items-center px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-white text-sm transition-colors"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="border-b border-gray-800">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('combos')}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'combos'
                  ? 'border-xblue-500 text-xblue-500'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              My Combos
            </button>
            
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'posts'
                  ? 'border-xblue-500 text-xblue-500'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              My Posts
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'settings'
                  ? 'border-xblue-500 text-xblue-500'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="py-6">
          {activeTab === 'combos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">My Combos</h2>
                <button 
                  onClick={() => navigate('/combos')}
                  className="px-4 py-2 bg-xblue-600 hover:bg-xblue-700 text-white rounded-md text-sm font-medium"
                >
                  Create New Combo
                </button>
              </div>
              
              {combos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {combos.map(combo => (
                    <ComboCard key={combo.id} combo={combo} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">You haven't created any combos yet.</p>
                  <button
                    onClick={() => navigate('/combos')}
                    className="px-4 py-2 bg-xblue-600 hover:bg-xblue-700 text-white rounded-md text-sm font-medium"
                  >
                    Create Your First Combo
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'posts' && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Your posts will appear here.</p>
              <button
                onClick={() => navigate('/upload')}
                className="px-4 py-2 bg-xblue-600 hover:bg-xblue-700 text-white rounded-md text-sm font-medium"
              >
                Create New Post
              </button>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-xblue-500" />
                Account Settings
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Profile Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={user?.username}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
                      />
                    </div>
                    
                    <button
                      className="mt-2 px-4 py-2 bg-xblue-600 hover:bg-xblue-700 text-white rounded-md text-sm font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Privacy Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Show my online status</p>
                        <p className="text-sm text-gray-400">Let others see when you're online</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="toggle-online" 
                          defaultChecked 
                          className="sr-only"
                        />
                        <label 
                          htmlFor="toggle-online"
                          className="block h-6 rounded-full bg-gray-700 cursor-pointer"
                        >
                          <span className="absolute left-0 inline-block w-6 h-6 transform translate-x-0 bg-white rounded-full transition-transform duration-200 ease-in-out" />
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Allow direct messages</p>
                        <p className="text-sm text-gray-400">Receive messages from other users</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="toggle-dm" 
                          defaultChecked 
                          className="sr-only"
                        />
                        <label 
                          htmlFor="toggle-dm"
                          className="block h-6 rounded-full bg-gray-700 cursor-pointer"
                        >
                          <span className="absolute left-0 inline-block w-6 h-6 transform translate-x-0 bg-white rounded-full transition-transform duration-200 ease-in-out" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 