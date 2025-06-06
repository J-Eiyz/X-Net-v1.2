import  { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Upload, Download, Save } from 'lucide-react';
import { Song } from '../types';

// Sample songs for initial state
const sampleSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Beyblade X Theme',
    artist: 'CrossNet Studios',
    // Using a free audio sample from SoundHelix
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    savedOffline: true
  },
  {
    id: 'song-2',
    title: 'Battle Arena',
    artist: 'Spin Masters',
    // Using a different free audio sample
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    savedOffline: false
  }
];

export default function CrossTunes() {
  const [isOpen, setIsOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load songs from localStorage
  useEffect(() => {
    const savedSongs = localStorage.getItem('x-net-songs');
    if (savedSongs) {
      try {
        const parsedSongs = JSON.parse(savedSongs);
        setSongs(parsedSongs);
      } catch (e) {
        console.error('Failed to parse stored songs', e);
        setSongs(sampleSongs);
      }
    } else {
      setSongs(sampleSongs);
    }
  }, []);

  // Save songs to localStorage when they change
  useEffect(() => {
    if (songs.length > 0) {
      localStorage.setItem('x-net-songs', JSON.stringify(songs));
    }
  }, [songs]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnd = () => {
      setIsPlaying(false);
      playNextSong();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [currentSong]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentSong) {
      if (songs.length > 0) {
        playSong(songs[0]);
      }
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Play a specific song
  const playSong = (song: Song) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Create a new audio element to avoid browser audio context limitations
    const audio = new Audio(song.url);
    
    // Set properties
    audio.volume = volume;
    audio.muted = isMuted;
    
    // Replace the ref
    audioRef.current = audio;
    
    // Play with error handling
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      alert('Could not play this track. It may be corrupted or in an unsupported format.');
      setIsPlaying(false);
    });
    
    // Setup event listeners
    audio.addEventListener('timeupdate', () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      playNextSong();
    });
  };

  // Play next song
  const playNextSong = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  // Play previous song
  const playPrevSong = () => {
    if (!currentSong || songs.length === 0) return;
    
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Change volume
  const changeVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  // Format time for display
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Seek to position in song
  const seekTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // Upload a song
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingFile(file);
    setIsLoading(true);

    try {
      // Create a new audio context to ensure proper audio loading
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create FileReader to read the file
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        if (!event.target?.result) {
          throw new Error("Failed to read file");
        }
        
        // Decode the audio data to validate it's a proper audio file
        try {
          const arrayBuffer = event.target.result as ArrayBuffer;
          await audioContext.decodeAudioData(arrayBuffer);
          
          // If decoding succeeds, it's a valid audio file
          // Create object URL for playback
          const objectUrl = URL.createObjectURL(file);
          
          // Extract file name without extension for title
          const title = file.name.replace(/\.[^/.]+$/, "");
          
          // Create new song object
          const newSong: Song = {
            id: `song-${Date.now()}`,
            title,
            url: objectUrl,
            savedOffline: true
          };
          
          // Add to songs list
          setSongs(prev => [...prev, newSong]);
          
          // Auto-play the newly added song
          setTimeout(() => {
            playSong(newSong);
          }, 500);
        } catch (decodeError) {
          console.error("Invalid audio file:", decodeError);
          alert("The file you selected is not a valid audio file or is corrupted.");
        }
      };
      
      reader.onerror = () => {
        throw new Error("Error reading file");
      };
      
      // Read the file as ArrayBuffer for audio processing
      reader.readAsArrayBuffer(file);
      
    } catch (error) {
      console.error("Error processing audio file:", error);
      alert("There was a problem processing your audio file. Please try another file.");
    } finally {
      setIsLoading(false);
      setUploadingFile(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Toggle save for offline
  const toggleSaveOffline = (songId: string) => {
    setSongs(prev => prev.map(song => 
      song.id === songId 
        ? { ...song, savedOffline: !song.savedOffline } 
        : song
    ));
  };

  // Delete a song
  const deleteSong = (songId: string) => {
    if (currentSong?.id === songId) {
      setIsPlaying(false);
      setCurrentSong(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    }
    
    setSongs(prev => prev.filter(song => song.id !== songId));
  };

  if (!isOpen) {
    return (
      <button 
        className="fixed bottom-4 left-4 z-50 bg-xblue-600 hover:bg-xblue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        aria-label="Open CrossTunes"
      >
        <Music className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full md:w-96 bg-gray-900 border-t border-gray-800 shadow-lg rounded-t-lg md:rounded-tr-lg overflow-hidden">
      {/* Header */}
      <div className="bg-black p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Music className="h-5 w-5 text-xblue-500 mr-2" />
          <h3 className="text-lg font-bold text-white">CrossTunes</h3>
        </div>
        <button 
          className="text-gray-400 hover:text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Close CrossTunes"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Now Playing */}
      <div 
        className="relative h-48 bg-cover bg-center flex items-end p-4"
        style={{ 
          backgroundImage: `url('https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/c40891ef-16a6-41c3-ed22-fc2f1e6b2600/public')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative z-10 w-full">
          <h4 className="text-white font-bold text-xl truncate">
            {currentSong?.title || 'No song playing'}
          </h4>
          <p className="text-gray-300 text-sm">
            {currentSong?.artist || 'Select a song to play'}
          </p>
          
          {/* Progress bar */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">{formatTime(progress)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 100}
              value={progress}
              onChange={seekTo}
              className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              aria-label="Seek position"
            />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
          
          {/* Controls */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="text-gray-400 hover:text-white"
                onClick={playPrevSong}
                aria-label="Previous song"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button 
                className="bg-xblue-600 hover:bg-xblue-700 text-white p-2 rounded-full"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button 
                className="text-gray-400 hover:text-white"
                onClick={playNextSong}
                aria-label="Next song"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                className="text-gray-400 hover:text-white"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              <input 
                type="range" 
                min="0" 
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                aria-label="Volume control"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Song List */}
      <div className="max-h-64 overflow-y-auto bg-black">
        {songs.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <p>No songs yet. Upload your first track!</p>
            <button 
              className="mt-2 bg-xblue-600 hover:bg-xblue-700 text-white px-4 py-2 rounded-md flex items-center justify-center mx-auto"
              onClick={handleUpload}
            >
              <Upload className="h-4 w-4 mr-1" />
              Upload Music
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {songs.map(song => (
              <li 
                key={song.id} 
                className={`p-3 flex items-center justify-between hover:bg-gray-800 cursor-pointer ${
                  currentSong?.id === song.id ? 'bg-gray-800' : ''
                }`}
                onClick={() => playSong(song)}
              >
                <div className="flex items-center">
                  {currentSong?.id === song.id && isPlaying ? (
                    <div className="w-4 h-4 mr-3 flex items-center justify-center">
                      <div className="flex space-x-1">
                        <div className="music-bar"></div>
                        <div className="music-bar"></div>
                        <div className="music-bar"></div>
                      </div>
                    </div>
                  ) : (
                    <Music className="h-4 w-4 text-gray-400 mr-3" />
                  )}
                  <div className="truncate">
                    <p className="text-sm font-medium text-white truncate">{song.title}</p>
                    <p className="text-xs text-gray-400 truncate">{song.artist || 'Unknown artist'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    className={`text-sm p-1 rounded-md ${
                      song.savedOffline 
                        ? 'text-green-400 hover:text-green-300' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveOffline(song.id);
                    }}
                    title={song.savedOffline ? "Saved for offline" : "Save for offline"}
                    aria-label={song.savedOffline ? "Saved for offline" : "Save for offline"}
                  >
                    {song.savedOffline ? <Save className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                  </button>
                  
                  <button 
                    className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSong(song.id);
                    }}
                    title="Delete song"
                    aria-label="Delete song"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Upload button */}
      <div className="p-3 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
        <div className="text-xs text-gray-400">
          {songs.filter(s => s.savedOffline).length} songs available offline
        </div>
        
        <button 
          className="bg-xblue-600 hover:bg-xblue-700 text-white px-3 py-2 rounded-md text-sm flex items-center"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Uploading...
            </span>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-1" />
              Add Music
            </>
          )}
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
        />
      </div>
      
      {/* Audio Element (hidden) */}
      <audio 
        ref={audioRef} 
        className="hidden"
      />
    </div>
  );
}
 