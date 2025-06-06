import  { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, MessageSquare, Users, Bot, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine active link
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="x-net-logo">
                  <span className="x" style={{ color: "#38bdf8", fontSize: "1.75rem", fontWeight: "bold" }}>X</span>
                  <span style={{ color: "white", fontSize: "1.75rem", fontWeight: "normal" }}>-Net</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/community"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/community') 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Community
                </Link>

                {isAuthenticated && (
                  <>
                    <Link
                      to="/chat"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/chat') 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      Chat
                    </Link>

                    <Link
                      to="/combos"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/combos') 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      Combos
                    </Link>

                    <Link
                      to="/ai-assistant"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive('/ai-assistant') 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      AI Assistant
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <User className="h-5 w-5 mr-2" />
                    {user?.username || 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-3 flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-xblue-600 hover:bg-xblue-700 px-4 py-2 rounded-md text-sm font-medium text-white"
                >
                  Login / Sign up
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/community"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/community') 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Community
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/chat"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/chat') 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat
                </Link>

                <Link
                  to="/combos"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/combos') 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Combos
                </Link>

                <Link
                  to="/ai-assistant"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/ai-assistant') 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Bot className="h-5 w-5 mr-2" />
                  AI Assistant
                </Link>

                <Link
                  to="/profile"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/profile') 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-xblue-600 hover:bg-xblue-700 text-white text-center"
                onClick={() => setIsOpen(false)}
              >
                Login / Sign up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
 