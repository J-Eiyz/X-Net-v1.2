import  { Wifi, WifiOff } from 'lucide-react';

interface OnlineOfflineToggleProps {
  isOnline: boolean;
  onChange: (isOnline: boolean) => void;
}

export default function OnlineOfflineToggle({ isOnline, onChange }: OnlineOfflineToggleProps) {
  return (
    <button 
      onClick={() => onChange(!isOnline)}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isOnline 
          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
          : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/50'
      }`}
      aria-label={isOnline ? "Switch to offline mode" : "Switch to online mode"}
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4 mr-2" />
          Online
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 mr-2" />
          Offline
        </>
      )}
    </button>
  );
}
 