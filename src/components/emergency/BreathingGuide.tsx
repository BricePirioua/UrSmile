// src/components/emergency/BreathingGuide.tsx
import { useState, useEffect } from 'react';

const BreathingGuide = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 1) {
          setPhase(current => {
            switch (current) {
              case 'inhale': return 'hold';
              case 'hold': return 'exhale';
              case 'exhale': return 'inhale';
            }
          });
          return phase === 'hold' ? 7 : 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-center">Respiration Calme</h3>
      
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <div 
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              phase === 'inhale' ? 'bg-blue-100 scale-100' :
              phase === 'hold' ? 'bg-purple-100 scale-90' :
              'bg-green-100 scale-75'
            }`}
          />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold">{seconds}</span>
            <span className="text-sm text-gray-600">
              {phase === 'inhale' ? 'Inspirez' :
               phase === 'hold' ? 'Retenez' :
               'Expirez'}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className={`w-full py-2 rounded-lg transition-colors ${
          isActive 
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
        }`}
      >
        {isActive ? 'Arrêter' : 'Commencer'}
      </button>
    </div>
  );
};

export default BreathingGuide;