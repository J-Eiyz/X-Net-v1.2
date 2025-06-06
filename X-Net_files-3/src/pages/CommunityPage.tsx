import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import FeedPost from '../components/FeedPost';
import UploadForm from '../components/UploadForm';
import { useAuth } from '../context/AuthContext';
import { Post } from '../types';
import { samplePosts } from '../data/mockData';

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Load posts
  useEffect(() => {
    // Try to get from localStorage, fall back to sample data
    try {
      const storedPosts = localStorage.getItem('x-net-posts');
      if (storedPosts) {
        const parsed = JSON.parse(storedPosts);
        if (parsed.length > 0) {
          setPosts(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to parse stored posts', e);
    }
    
    // Fall back to sample data
    setPosts(samplePosts);
  }, []);
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isAuthenticated ? (
          <>
            {/* Upload form */}
            <div className="mb-6">
              <UploadForm />
            </div>
            
            {/* Feed */}
            <div className="space-y-6">
              {posts.map(post => (
                <FeedPost key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Users className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Join the X-Net Community
            </h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Connect with Beyblade X fans, share your battles, and discover new strategies and combos.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-xblue-600 hover:bg-xblue-700 text-white px-5 py-2 rounded-md"
            >
              Login / Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
 