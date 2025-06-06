import  { useState } from 'react';
import { ThumbsUp, MessageSquare, Share } from 'lucide-react';
import { BeybladeCombo } from '../types';

interface ComboCardProps {
  combo: BeybladeCombo;
}

export default function ComboCard({ combo }: ComboCardProps) {
  const [liked, setLiked] = useState(false);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {/* Combo header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            {combo.creator.avatarUrl ? (
              <img 
                src={combo.creator.avatarUrl}
                alt={combo.creator.username}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-white">
                {combo.creator.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              {combo.name}
            </h3>
            <div className="flex items-center text-sm text-gray-400">
              <span>by {combo.creator.username}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(combo.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Combo details */}
      <div className="p-4">
        {combo.imageUrl && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img 
              src={combo.imageUrl} 
              alt={combo.name}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-800 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Blade</p>
            <p className="text-sm font-medium text-white">{combo.blade}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Ratchet</p>
            <p className="text-sm font-medium text-white">{combo.ratchet}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Bit</p>
            <p className="text-sm font-medium text-white">{combo.bit}</p>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {combo.tags.map(tag => (
            <span 
              key={tag}
              className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Stats if available */}
        {(combo.wins !== undefined || combo.losses !== undefined) && (
          <div className="flex items-center gap-4 mb-4 text-sm">
            {combo.wins !== undefined && (
              <div className="flex items-center">
                <span className="text-green-500 font-medium">{combo.wins}</span>
                <span className="text-gray-400 ml-1">Wins</span>
              </div>
            )}
            {combo.losses !== undefined && (
              <div className="flex items-center">
                <span className="text-red-500 font-medium">{combo.losses}</span>
                <span className="text-gray-400 ml-1">Losses</span>
              </div>
            )}
            {combo.wins !== undefined && combo.losses !== undefined && (
              <div className="flex items-center">
                <span className="text-xblue-500 font-medium">
                  {((combo.wins / (combo.wins + combo.losses)) * 100).toFixed(1)}%
                </span>
                <span className="text-gray-400 ml-1">Win Rate</span>
              </div>
            )}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-3">
          <button 
            className={`flex items-center text-sm font-medium ${
              liked ? 'text-xblue-500' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Like
          </button>
          
          <button className="flex items-center text-sm font-medium text-gray-400 hover:text-white">
            <MessageSquare className="h-4 w-4 mr-1" />
            Comment
          </button>
          
          <button className="flex items-center text-sm font-medium text-gray-400 hover:text-white">
            <Share className="h-4 w-4 mr-1" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
 