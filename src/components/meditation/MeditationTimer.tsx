// src/components/meditation/MeditationTimer.tsx
import { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

const MeditationTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(5);

  const durations = [
    { minutes: 5, label: '5 min' },
    { minutes: 10, label: '10 min' },
    { minutes: 15, label: '15 min' },
    { minutes: 20, label: '20 min' },
  ];

  useEffect(() => {
    setTimeLeft(selectedDuration * 60);
  }, [selectedDuration]);

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time === 1) {
          setIsActive(false);
          // Ici vous pourriez ajouter un son ou une notification
        }
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(selectedDuration * 60);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (selectedDuration * 60)) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-center">Timer Méditation</h3>

      {/* Sélecteur de durée */}
      <div className="flex justify-center space-x-2 mb-6">
        {durations.map(({ minutes, label }) => (
          <button
            key={minutes}
            onClick={() => {
              if (!isActive) {
                setSelectedDuration(minutes);
              }
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedDuration === minutes
                ? 'bg-primary-100 text-primary-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isActive}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Affichage du timer */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gray-100" />
        <div
          className="absolute inset-0 rounded-full bg-primary-100 origin-center"
          style={{
            transform: `rotate(${progress * 3.6}deg)`,
            clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)',
          }}
        />
        <div className="absolute inset-0 rounded-full bg-white m-2" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className={`p-3 rounded-full ${
            isActive
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
          }`}
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MeditationTimer;