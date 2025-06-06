import  { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, error, isLoading, clearError } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };
  
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError();
            }}
            className="bg-gray-800 border border-gray-700 text-white sm:text-sm rounded-lg focus:ring-xblue-500 focus:border-xblue-500 block w-full pl-10 p-2.5"
            placeholder="username"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
            }}
            placeholder="••••••••"
            className="bg-gray-800 border border-gray-700 text-white sm:text-sm rounded-lg focus:ring-xblue-500 focus:border-xblue-500 block w-full pl-10 p-2.5"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 
              <EyeOff className="w-5 h-5 text-gray-500" /> : 
              <Eye className="w-5 h-5 text-gray-500" />
            }
          </button>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-400 border border-red-900 rounded-lg bg-gray-800">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-700 rounded bg-gray-800 focus:ring-3 focus:ring-xblue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-400">Remember me</label>
          </div>
        </div>
        <a href="#" className="text-sm font-medium text-xblue-500 hover:underline">Forgot password?</a>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white bg-xblue-600 hover:bg-xblue-700 focus:ring-4 focus:outline-none focus:ring-xblue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
      
      <p className="text-sm font-light text-gray-400">
        Don't have an account yet?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-medium text-xblue-500 hover:underline"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
 