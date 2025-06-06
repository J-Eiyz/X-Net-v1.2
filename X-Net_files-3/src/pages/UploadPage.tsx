import  Navbar from '../components/Navbar';
import UploadForm from '../components/UploadForm';
import { AlertOctagon } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 p-4 rounded-md bg-gray-900 border border-gray-800 flex items-start">
          <AlertOctagon className="h-6 w-6 text-xblue-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-white">Upload Guidelines</h3>
            <ul className="mt-2 text-sm text-gray-300 list-disc pl-5 space-y-1">
              <li>Be respectful to other bladers</li>
              <li>No inappropriate content</li>
              <li>Keep videos under 50MB</li>
              <li>Supported formats: JPG, PNG, MP4, WebM</li>
              <li>Content may be moderated</li>
            </ul>
          </div>
        </div>
        
        <UploadForm />
      </div>
    </div>
  );
}
 