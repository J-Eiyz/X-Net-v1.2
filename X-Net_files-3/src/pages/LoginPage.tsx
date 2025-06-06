import  { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/AuthForms/LoginForm';
import SignupForm from '../components/AuthForms/SignupForm';
import SocialLogins from '../components/AuthForms/SocialLogins';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [formError, setFormError] = useState('');
  
  const { isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/community" />;
  }
  
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side - form */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8 flex items-center">
            <div className="h-10 w-10 rounded-full bg-xblue-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">X</span>
            </div>
            <h1 className="text-xblue-500 text-3xl font-bold">X-Net</h1>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 sm:p-8 shadow-lg border border-gray-800">
            <div className="flex border-b border-gray-700">
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${
                  activeTab === 'login' 
                    ? 'text-xblue-500 border-b-2 border-xblue-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => {
                  setActiveTab('login');
                  clearError();
                  setFormError('');
                }}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${
                  activeTab === 'signup' 
                    ? 'text-xblue-500 border-b-2 border-xblue-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => {
                  setActiveTab('signup');
                  clearError();
                  setFormError('');
                }}
              >
                Sign Up
              </button>
            </div>
            
            <div className="mt-6">
              {activeTab === 'login' ? (
                <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
              ) : (
                <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
              )}
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <SocialLogins />
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-400 hover:text-white"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
      
      {/* Right side - image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full object-cover">
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1693765928037-fc20daa4c26f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxiZXlibGFkZSUyMHglMjBidXJzdCUyMGJhdHRsZSUyMGFyZW5hfGVufDB8fHx8MTc0OTIxNDEyOHww&ixlib=rb-4.1.0')`, 
              filter: 'brightness(0.7)' 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <blockquote className="max-w-lg">
              <p className="text-xl font-medium text-white">
                "X-Net has revolutionized how I connect with other bladers. The combo tracking system is incredibly useful!"
              </p>
              <footer className="mt-4">
                <p className="text-base font-semibold text-xblue-400">SpinMaster99</p>
                <p className="text-sm text-gray-300">Regional Champion 2023</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
 