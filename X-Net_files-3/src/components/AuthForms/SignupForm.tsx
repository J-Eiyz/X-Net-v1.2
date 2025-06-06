import  { useState } from 'react';
import { Mail, User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { signup, error, isLoading, clearError } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    signup(username, email, password);
  };
  
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearError();
              setFormError('');
            }}
            className="bg-gray-800 border border-gray-700 text-white sm:text-sm rounded-lg focus:ring-xblue-500 focus:border-xblue-500 block w-full pl-10 p-2.5"
            placeholder="username"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
              setFormError('');
            }}
            className="bg-gray-800 border border-gray-700 text-white sm:text-sm rounded-lg focus:ring-xblue-500 focus:border-xblue-500 block w-full pl-10 p-2.5"
            placeholder="name@example.com"
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
              setFormError('');
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
      
      <div>
        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearError();
              setFormError('');
            }}
            placeholder="••••••••"
            className="bg-gray-800 border border-gray-700 text-white sm:text-sm rounded-lg focus:ring-xblue-500 focus:border-xblue-500 block w-full pl-10 p-2.5"
            required
          />
        </div>
      </div>
      
      {(error || formError) && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-400 border border-red-900 rounded-lg bg-gray-800">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error || formError}</span>
        </div>
      )}
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-700 rounded bg-gray-800 focus:ring-3 focus:ring-xblue-500"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-gray-400">
            I accept the <a className="text-xblue-500 hover:underline" href="#">Terms and Conditions</a>
          </label>
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full text-white bg-xblue-600 hover:bg-xblue-700 focus:ring-4 focus:outline-none focus:ring-xblue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
      >
        {isLoading ? 'Creating account...' : 'Create an account'}
      </button>
      
      <p className="text-sm font-light text-gray-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-xblue-500 hover:underline"
        >
          Login here
        </button>
      </p>
    </form>
  );
}
 