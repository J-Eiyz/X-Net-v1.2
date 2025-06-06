import  { useAuth } from '../../context/AuthContext';

export default function SocialLogins() {
  const { loginWithGoogle, loginWithFacebook, continueAsGuest, isLoading } = useAuth();
  
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={loginWithGoogle}
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300 transition-colors"
      >
        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
      
      <button
        type="button"
        onClick={loginWithFacebook}
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-[#1877f2] hover:bg-[#166fe5] text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"
          />
        </svg>
        Continue with Facebook
      </button>
      
      <div className="relative py-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-gray-900 text-gray-500 text-sm">Or</span>
        </div>
      </div>
      
      <button
        type="button"
        onClick={continueAsGuest}
        disabled={isLoading}
        className="w-full text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Continue as Guest
      </button>
    </div>
  );
}
 