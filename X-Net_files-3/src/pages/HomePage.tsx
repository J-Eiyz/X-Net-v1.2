import  { useNavigate } from 'react-router-dom';
import { Globe, Shield, Zap, Database, Bot } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1734623046892-4a0afc9a95ad?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxiZXlibGFkZSUyMHglMjBidXJzdCUyMGJhdHRsZSUyMGFyZW5hfGVufDB8fHx8MTc0OTIxNDEyOHww&ixlib=rb-4.1.0')`,
            opacity: 0.5
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 rounded-full bg-xblue-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold">X</span>
              </div>
              <h1 className="text-xblue-500 text-2xl font-bold">X-Net</h1>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Ultimate Beyblade X Social Hub
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              Connect with bladers, share battles, log your combos, and level up your game. The revolution in Beyblade social networking is here.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {!isAuthenticated ? (
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-xblue-600 hover:bg-xblue-700 text-white font-medium rounded-md flex items-center transition-colors"
                >
                  Join X-Net
                </button>
              ) : (
                <button
                  onClick={() => navigate('/community')}
                  className="px-6 py-3 bg-xblue-600 hover:bg-xblue-700 text-white font-medium rounded-md flex items-center transition-colors"
                >
                  Explore Community
                </button>
              )}
              
              <button
                onClick={() => navigate('/chat')}
                className="px-6 py-3 border border-gray-700 hover:bg-gray-900 text-white font-medium rounded-md transition-colors"
              >
                Enter Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              The Complete Beyblade X Experience
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              X-Net brings everything the modern blader needs in one place, from strategy discussions to tournament coordination.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 rounded-md bg-xblue-600/20 text-xblue-500 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Community</h3>
              <p className="text-gray-400">
                Connect with bladers from around the world and share your latest battles and strategies.
              </p>
            </div>
            
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 rounded-md bg-xblue-600/20 text-xblue-500 flex items-center justify-center mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Combo Logger</h3>
              <p className="text-gray-400">
                Track your Beyblade combinations, win rates, and performance statistics to refine your strategy.
              </p>
            </div>
            
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 rounded-md bg-xblue-600/20 text-xblue-500 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Live Battles</h3>
              <p className="text-gray-400">
                Upload and share your battle videos, discuss techniques, and get feedback from pros.
              </p>
            </div>
            
            <div className="bg-black p-6 rounded-lg border border-gray-800">
              <div className="h-12 w-12 rounded-md bg-xblue-600/20 text-xblue-500 flex items-center justify-center mb-4">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Assistant</h3>
              <p className="text-gray-400">
                Get personalized recommendations, combo analysis, and strategy tips from our Beyblade X AI.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg overflow-hidden">
            <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
              <div className="md:max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Spin? Join X-Net Today!
                </h2>
                <p className="text-gray-300 mb-6 md:mb-0">
                  Sign up now to track combos, connect with the community, and take your Beyblade X game to the next level.
                </p>
              </div>
              
              <div className="flex flex-shrink-0">
                <button
                  onClick={() => navigate(isAuthenticated ? '/community' : '/login')}
                  className="px-6 py-3 bg-xblue-600 hover:bg-xblue-700 text-white font-medium rounded-md flex items-center transition-colors"
                >
                  {isAuthenticated ? 'Explore Now' : 'Join X-Net'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Licenses</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full bg-xblue-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold">X</span>
              </div>
              <span className="text-white font-bold">X-Net</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} X-Net. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
 