import  { useState } from 'react';
import { ThumbsUp, MessageSquare, Share } from 'lucide-react';
import { Post } from '../types';

interface FeedPostProps {
  post: Post;
}

export default function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(post.hasLiked || false);
  const [likesCount, setLikesCount] = useState(post.likes);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {/* Post header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
            {post.author.avatarUrl ? (
              <img 
                src={post.author.avatarUrl}
                alt={post.author.username}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-white">
                {post.author.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">
              {post.author.username}
            </h3>
            <div className="text-sm text-gray-400">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Post content */}
      <div>
        {post.content && (
          <div className="p-4">
            <p className="text-gray-200">{post.content}</p>
          </div>
        )}
        
        {post.mediaUrl && (
          <div className="bg-gray-800">
            {post.mediaType === 'image' ? (
              <img 
                src={post.mediaUrl} 
                alt="Post content"
                className="w-full h-auto max-h-[500px] object-contain"
              />
            ) : (
              <video 
                src={post.mediaUrl}
                controls
                className="w-full h-auto max-h-[500px]"
              />
            )}
          </div>
        )}
      </div>
      
      {/* Post actions */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-400">
            {likesCount > 0 && (
              <span className="flex items-center">
                <ThumbsUp className="h-4 w-4 text-xblue-500 mr-1" />
                {likesCount}
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            {post.comments > 0 && (
              <span>{post.comments} comments</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-800 pt-3">
          <button 
            className={`flex items-center text-sm font-medium ${
              liked ? 'text-xblue-500' : 'text-gray-400 hover:text-white'
            }`}
            onClick={handleLike}
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
 