// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Sparkles } from 'lucide-react';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('Tentative de connexion avec:', firstName, birthDate);
      
      // Validation des entrées
      if (!firstName.trim()) {
        throw new Error('Le prénom est requis');
      }
      
      if (!birthDate) {
        throw new Error('La date de naissance est requise');
      }

      const birthDateObj = new Date(birthDate);
      if (isNaN(birthDateObj.getTime())) {
        throw new Error('Date de naissance invalide');
      }

      await login(firstName.trim(), birthDateObj);
      console.log('Connexion réussie');
      navigate('/welcome');
      
    } catch (err) {
      console.error('Erreur lors de la connexion:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Heart className="w-16 h-16 text-primary-500 animate-pulse" />
              <Sparkles className="w-6 h-6 text-primary-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4">
              Bienvenue sur UrSmile
            </h1>
            <p className="text-gray-600 mt-2">
              Commençons cette belle aventure ensemble
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment t'appelles-tu ?
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ton prénom"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quelle est ta date de naissance ?
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-500 text-sm text-center">
                    {error}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary-500 hover:bg-primary-600 transition-colors'}
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Connexion en cours...
                  </div>
                ) : (
                  'Commencer'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;