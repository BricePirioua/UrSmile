// src/components/modals/PetModal.tsx
import { useState } from 'react';
import { Dog, Cat } from 'lucide-react';

interface PetModalProps {
  onComplete: (petInfo: { has: boolean; type?: 'dog' | 'cat'; name?: string } | null) => void;
}

const PetModal = ({ onComplete }: PetModalProps) => {
  const [step, setStep] = useState(1);
  const [hasPet, setHasPet] = useState<boolean | null>(null);
  const [petType, setPetType] = useState<'dog' | 'cat' | null>(null);
  const [petName, setPetName] = useState('');

  const handleFirstStep = (has: boolean) => {
    setHasPet(has);
    if (!has) {
      onComplete({ has: false });
    } else {
      setStep(2);
    }
  };

  const handleSecondStep = (type: 'dog' | 'cat') => {
    setPetType(type);
    setStep(3);
  };

  const handleFinalStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (petName.trim() && petType) {
      onComplete({ has: true, type: petType, name: petName.trim() });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl">
        {step === 1 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              As-tu un animal de compagnie ?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleFirstStep(true)}
                className="px-6 py-3 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
              >
                Oui
              </button>
              <button
                onClick={() => handleFirstStep(false)}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Non
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Est-ce un chien ou un chat ?
            </h2>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => handleSecondStep('dog')}
                className="p-6 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors group"
              >
                <Dog className="w-12 h-12 text-primary-600 mb-2" />
                <span className="text-primary-600 font-medium">Chien</span>
              </button>
              <button
                onClick={() => handleSecondStep('cat')}
                className="p-6 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors group"
              >
                <Cat className="w-12 h-12 text-primary-600 mb-2" />
                <span className="text-primary-600 font-medium">Chat</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleFinalStep} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Comment s'appelle-t-il/elle ?
            </h2>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Nom de ton compagnon"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Continuer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PetModal;