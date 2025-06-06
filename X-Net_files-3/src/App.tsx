import  { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import CombosPage from './pages/CombosPage';
import CommunityPage from './pages/CommunityPage';
import UploadPage from './pages/UploadPage';
import AIAssistantPage from './pages/AIAssistantPage';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import CrossTunes from './components/CrossTunes';

function App() {
  // Load theme or set defaults
  useEffect(() => {
    document.body.classList.add('bg-black');
  }, []);

  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/combos" element={<CombosPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
          </Routes>
          <CrossTunes />
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
 