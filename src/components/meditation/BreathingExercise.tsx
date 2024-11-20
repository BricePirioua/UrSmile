// src/components/meditation/BreathingExercise.tsx
import { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  onComplete?: () => void;
}

const BreathingExercise = ({ onComplete }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(false);

  const phases = {
    inhale: { duration: 4, text: 'Inspirez', color: 'bg-blue-500' },
    hold: { duration: 7, text: 'Retenez', color: 'bg-purple-500' },
    exhale: { duration: 8, text: 'Expirez', color: 'bg-green-500' },
    rest: { duration: 4, text: 'Repos', color: 'bg-gray-500' }
  };

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case 'inhale': return 'hold';
              case 'hold': return 'exhale';
              case 'exhale': return 'rest';
              case 'rest': return 'inhale';
            }
          });
          return phases[phase].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setCounter(4);
    }
  };

  const currentPhase = phases[phase];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-center">Exercice de Respiration 4-7-8</h3>
      
      {/* Cercle animé */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <div
            className={`absolute inset-0 rounded-full ${currentPhase.color} opacity-20 transition-transform duration-1000
              ${isActive ? 'scale-100' : 'scale-90'}`}
          />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold">{counter}</span>
            <span className="text-sm text-gray-600">{currentPhase.text}</span>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleExercise}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isActive 
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
          }`}
        >
          {isActive ? 'Arrêter' : 'Commencer'}
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600">
        <p className="text-center">Inspirez par le nez pendant 4 secondes,</p>
        <p className="text-center">Retenez pendant 7 secondes,</p>
        <p className="text-center">Expirez par la bouche pendant 8 secondes.</p>
      </div>
    </div>
  );
};

export default BreathingExercise;