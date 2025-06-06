import  { useState, useRef } from 'react';
import { Upload, Image, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UploadForm() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulate uploading
    setTimeout(() => {
      // Store in localStorage for demo
      const posts = JSON.parse(localStorage.getItem('x-net-posts') || '[]');
      
      const newPost = {
        id: `post-${Date.now()}`,
        content,
        mediaUrl: previewUrl,
        mediaType,
        likes: 0,
        comments: 0,
        author: {
          id: user.id,
          username: user.username,
        },
        createdAt: new Date().toISOString(),
      };
      
      posts.unshift(newPost);
      localStorage.setItem('x-net-posts', JSON.stringify(posts));
      
      // Reset form
      setContent('');
      setMediaType(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsLoading(false);
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };
  
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Upload className="h-5 w-5 mr-2 text-xblue-500" />
        Share with the Community
      </h2>
      
      {success && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-900 rounded-md text-green-400">
          Your post has been shared successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            What's on your mind?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
            placeholder="Share your thoughts, battles, or new combos..."
          />
        </div>
        
        <div className="mb-4">
          <div className="flex space-x-4 mb-3">
            <button
              type="button"
              onClick={() => {
                setMediaType('image');
                setTimeout(() => fileInputRef.current?.click(), 100);
              }}
              className={`flex items-center px-3 py-2 rounded-md ${
                mediaType === 'image' 
                  ? 'bg-xblue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              <Image className="h-5 w-5 mr-2" />
              Image
            </button>
            
            <button
              type="button"
              onClick={() => {
                setMediaType('video');
                setTimeout(() => fileInputRef.current?.click(), 100);
              }}
              className={`flex items-center px-3 py-2 rounded-md ${
                mediaType === 'video' 
                  ? 'bg-xblue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              <Video className="h-5 w-5 mr-2" />
              Video
            </button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
            onChange={handleFileChange}
            className="hidden"
          />
          
          {previewUrl && (
            <div className="mt-4 rounded-md overflow-hidden bg-gray-800 p-2">
              {mediaType === 'image' ? (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-48 max-w-full mx-auto"
                />
              ) : (
                <video 
                  src={previewUrl} 
                  controls 
                  className="max-h-48 max-w-full mx-auto"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="mt-2 text-sm text-red-400 hover:text-red-300"
              >
                Remove {mediaType}
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || (!content && !previewUrl)}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-xblue-600 hover:bg-xblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-xblue-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Sharing...
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 mr-2" />
              Share
            </>
          )}
        </button>
      </form>
    </div>
  );
}
 