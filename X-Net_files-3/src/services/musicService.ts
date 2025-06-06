import  { Track, TrackUploadData } from '../types';

const MUSIC_STORAGE_KEY = 'x-net-music-tracks';
const OFFLINE_TRACKS_STORAGE_KEY = 'x-net-offline-tracks';

// Initial demo tracks
const initialTracks: Track[] = [
  {
    id: '1',
    title: 'Beyblade X Theme',
    artist: 'CrossTunes',
    audioUrl: 'https://example.com/audio/beyblade-theme.mp3', // Placeholder
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXllciUyMGludGVyZmFjZSUyMGRhcmslMjB0aGVtZXxlbnwwfHx8fDE3NDkwNzE1Mzh8MA&ixlib=rb-4.1.0',
    duration: 180,
    userII'll add the CrossTunes music player feature using the provided image. Here's the implementation:

<doodleArtifact id="add-crosstunes-feature" title="Add CrossTunes Music Player">
<doodleAction type="file" filePath="package.json">
{
  "name": "minimal-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.244.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@eslint/js": "^8.41.0",
    "@types/react": "^18.0.37",
    "@types/react-dom": "^18.0.11",
    "@typescript-eslint/eslint-plugin": "^5.59.0",
    "@typescript-eslint/parser": "^5.59.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.38.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "globals": "^13.20.0",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.0.2",
    "typescript-eslint": "^0.0.1-alpha.0",
    "vite": "^4.3.9"
  }
}
 