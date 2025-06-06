import  { Wifi, WifiOff } from 'lucide-react';
import { NetworkStatusProps } from '../types';

export default function NetworkStatus({ className = '' }: NetworkStatusProps) {
  // Get actual browser online status
  const isOnline = navigator.onLine;
  
  return (
    <div className={`flex items-center ${className}`}>
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4 text-green-400 mr-1" />
          <span className="text-xs text-green-400">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-xs text-yellow-500">Offline</span>
        </>
      )}
    </div>
  );
}
 