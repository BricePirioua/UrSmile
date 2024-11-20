// src/components/intro/Intro.tsx
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

const Intro = ({ onComplete }: IntroProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
      } else {
        onComplete();
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-primary-50 to-primary-100 flex items-center justify-center z-50">
      <div className="text-center p-6">
        {step === 0 && (
          <div className="animate-fade-in">
            <Heart className="w-24 h-24 text-primary-500 mx-auto animate-pulse" />
          </div>
        )}
        
        {step === 1 && (
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">UrSmile</h1>
            <p className="text-xl text-primary-400">Un moment rien que pour toi</p>
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fade-in text-center space-y-4">
            <p className="text-2xl text-primary-500">
              Prête pour commencer ?
            </p>
            <div className="animate-bounce">
              <Heart className="w-12 h-12 text-primary-400 mx-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Intro;