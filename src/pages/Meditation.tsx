// src/pages/Meditation.tsx
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Clock, Heart, Moon, Sun, Wind } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  type: 'morning' | 'evening' | 'stress' | 'focus';
  description: string;
  imageUrl: string;
  audioUrl: string;
  favorite: boolean;
}

interface AmbianceSound {
  id: string;
  name: string;
  icon: typeof Wind;
  audioUrl: string;
  isPlaying: boolean;
}

const MeditationPage = () => {
  const { user } = useAuth();
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('all');
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [ambianceSounds, setAmbianceSounds] = useState<AmbianceSound[]>([
    { id: 'rain', name: 'Pluie', icon: Wind, audioUrl: '/sounds/rain.mp3', isPlaying: false },
    { id: 'waves', name: 'Vagues', icon: Wind, audioUrl: '/sounds/waves.mp3', isPlaying: false },
    { id: 'forest', name: 'Forêt', icon: Wind, audioUrl: '/sounds/forest.mp3', isPlaying: false },
  ]);

  const sessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Méditation du Matin',
      duration: '10 minutes',
      type: 'morning',
      description: 'Commencez votre journée avec calme et clarté',
      imageUrl: '/api/placeholder/400/300',
      audioUrl: '/meditations/morning.mp3',
      favorite: false,
    },
    {
      id: '2',
      title: 'Relaxation du Soir',
      duration: '15 minutes',
      type: 'evening',
      description: 'Préparez-vous pour une nuit reposante',
      imageUrl: '/api/placeholder/400/300',
      audioUrl: '/meditations/evening.mp3',
      favorite: true,
    },
    {
      id: '3',
      title: 'Anti-Stress Express',
      duration: '5 minutes',
      type: 'stress',
      description: 'Retrouvez votre calme rapidement',
      imageUrl: '/api/placeholder/400/300',
      audioUrl: '/meditations/stress.mp3',
      favorite: false,
    },
  ];

  const meditationTypes = [
    { id: 'all', label: 'Tout', icon: Heart },
    { id: 'morning', label: 'Matin', icon: Sun },
    { id: 'evening', label: 'Soir', icon: Moon },
    { id: 'stress', label: 'Anti-stress', icon: Wind },
  ];

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const toggleAmbianceSound = (soundId: string) => {
    setAmbianceSounds(sounds => 
      sounds.map(sound => 
        sound.id === soundId 
          ? { ...sound, isPlaying: !sound.isPlaying }
          : sound
      )
    );
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, [selectedSession]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Espace Méditation
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Prenez un moment pour vous reconnecter à vous-même
        </p>
      </div>

      {/* Types de méditation */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {meditationTypes.map(type => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              selectedType === type.id 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <type.icon className="w-4 h-4 mr-2" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Lecteur principal */}
      {selectedSession && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <div className="text-left">
                <h3 className="font-semibold">{selectedSession.title}</h3>
                <p className="text-sm text-gray-600">{formatTime(currentTime)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleMuteToggle}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-32"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sons d'ambiance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {ambianceSounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleAmbianceSound(sound.id)}
            className={`p-4 rounded-xl transition-colors ${
              sound.isPlaying 
                ? 'bg-primary-100 text-primary-600' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <sound.icon className="w-6 h-6 mb-2 mx-auto" />
            <span className="block text-sm">{sound.name}</span>
          </button>
        ))}
      </div>

      {/* Liste des sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions
          .filter(session => selectedType === 'all' || session.type === selectedType)
          .map((session) => (
            <div 
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold mb-1">{session.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{session.duration}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Logique pour ajouter/retirer des favoris
                  }}
                  className={`p-2 rounded-full ${
                    session.favorite ? 'text-red-500' : 'text-gray-400'
                  } hover:bg-gray-100`}
                >
                  <Heart className="w-5 h-5" fill={session.favorite ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="text-gray-600 text-sm">{session.description}</p>
            </div>
        ))}
      </div>

      {/* Audio elements */}
      {selectedSession && (
        <audio
          ref={audioRef}
          src={selectedSession.audioUrl}
          preload="metadata"
        />
      )}
    </div>
  );
};

export default MeditationPage;