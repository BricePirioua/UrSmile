// src/pages/Welcome.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Star, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-secondary-50 flex items-center justify-center px-4">
      <div className={`text-center transition-opacity duration-1000 ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="relative inline-block mb-8">
          <Heart className="w-20 h-20 text-primary-500 animate-pulse" />
          <Star className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-spin-slow" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Ravie de te rencontrer, {user?.firstName} !
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Ensemble, nous allons créer de beaux moments de bonheur et cultiver 
          le sourire au quotidien.
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-primary-500 text-white px-8 py-3 rounded-lg 
            hover:bg-primary-600 transition-colors inline-flex items-center
            font-medium"
        >
          Commencer l'aventure
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;