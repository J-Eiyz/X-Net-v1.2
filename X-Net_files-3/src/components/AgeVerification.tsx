import  { useState } from 'react';
import LoginForm from './AuthForms/LoginForm';
import SignupForm from './AuthForms/SignupForm';
import SocialLogins from './AuthForms/SocialLogins';

type AuthTab = 'login' | 'signup';

export default function AgeVerification() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black">
      <div className="flex flex-col items-center mb-6">
        <img 
          src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/8f1e8cac-d6b5-4348-5c93-e55413477700/public" 
          alt="X-Net Logo" 
          className="w-32 h-32 mb-6"
        />
        <h2 className="text-center text-3xl font-extrabold text-white">X-Net</h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          The ultimate Beyblade X social platform
        </p>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900 shadow rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-800">
            <button
              className={`w-1/2 py-4 text-center ${
                activeTab === 'login'
                  ? 'text-white border-b-2 border-xblue-600 font-medium'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-4 text-center ${
                activeTab === 'signup'
                  ? 'text-white border-b-2 border-xblue-600 font-medium'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign up
            </button>
          </div>
          
          {activeTab === 'login' ? (
            <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
          
          <SocialLogins />
        </div>
      </div>
    </div>
  );
}
 