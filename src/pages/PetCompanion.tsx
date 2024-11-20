// src/pages/PetCompanion.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Heart, Calendar, Camera, Book, Dog, Cat, Award, Plus, Paw, Star } from 'lucide-react';

interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'moment' | 'achievement' | 'routine';
}

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  mood: '😊' | '😴' | '🎾' | '🦮' | '🤗';
  completed?: boolean;
}

const PetCompanion = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'memories' | 'activities' | 'achievements'>('memories');
  const [showAddMemory, setShowAddMemory] = useState(false);

  // Si l'utilisateur n'a pas d'animal, rediriger ou afficher un message
  if (!user?.pet?.has) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Cette section est réservée aux propriétaires d'animaux
        </h1>
      </div>
    );
  }

  const memories: Memory[] = [
    {
      id: '1',
      date: '2024-02-19',
      title: 'Notre première promenade du printemps',
      description: 'Une belle balade au parc avec plein de jeux',
      imageUrl: '/api/placeholder/400/300',
      type: 'moment'
    },
    {
      id: '2',
      date: '2024-02-18',
      title: 'Nouveau jouet préféré',
      description: user.pet.type === 'dog' ? 
        'La nouvelle balle est un véritable succès !' : 
        'Le nouveau jouet à plumes est un véritable succès !',
      imageUrl: '/api/placeholder/400/300',
      type: 'moment'
    }
  ];

  const activities: Activity[] = [
    {
      id: '1',
      title: user.pet.type === 'dog' ? 'Promenade matinale' : 'Session de jeu',
      description: user.pet.type === 'dog' ? 
        'Un petit tour énergique pour bien commencer la journée' : 
        'Une session de jeu pour se dépenser',
      duration: '30 min',
      mood: '🎾',
      completed: false
    },
    {
      id: '2',
      title: 'Séance de câlins',
      description: 'Moment de détente et d\'affection',
      duration: '15 min',
      mood: '🤗',
      completed: true
    },
    {
      id: '3',
      title: user.pet.type === 'dog' ? 'Exercices d\'obéissance' : 'Toilettage',
      description: user.pet.type === 'dog' ? 
        'Révision des commandes de base' : 
        'Brossage et soins',
      duration: '20 min',
      mood: '🦮',
      completed: false
    }
  ];

  const achievements = [
    {
      title: 'Meilleur ami',
      description: '100 jours de bonheur partagé',
      progress: 85,
      icon: Heart
    },
    {
      title: user.pet.type === 'dog' ? 'Explorateur' : 'Acrobate',
      description: user.pet.type === 'dog' ? 
        '10 nouveaux endroits visités' : 
        '10 parcours d\'agilité réussis',
      progress: 60,
      icon: Star
    },
    {
      title: 'Star des réseaux',
      description: '50 photos partagées',
      progress: 30,
      icon: Camera
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* En-tête avec photo de profil */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center">
            {user.pet.type === 'dog' ? 
              <Dog className="w-16 h-16 text-primary-500" /> : 
              <Cat className="w-16 h-16 text-primary-500" />
            }
          </div>
          <span className="absolute bottom-0 right-0 bg-primary-100 text-primary-600 rounded-full p-2">
            <Camera className="w-5 h-5" />
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.pet.name}</h1>
        <p className="text-gray-600">
          {user.pet.type === 'dog' ? 'Mon fidèle compagnon' : 'Mon félin adoré'}
        </p>
      </div>

      {/* Navigation des onglets */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('memories')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'memories'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Book className="w-5 h-5 mr-2" />
          Souvenirs
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'activities'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-5 h-5 mr-2" />
          Activités
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-lg flex items-center ${
            activeTab === 'achievements'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Award className="w-5 h-5 mr-2" />
          Réussites
        </button>
      </div>

      {/* Contenu principal */}
      {activeTab === 'memories' && (
        <div>
          {/* Bouton Ajouter */}
          <button
            onClick={() => setShowAddMemory(true)}
            className="mb-6 w-full md:w-auto px-4 py-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un souvenir
          </button>

          {/* Grille de souvenirs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory) => (
              <div key={memory.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{memory.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{memory.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{memory.date}</span>
                    <Heart className="w-5 h-5 text-primary-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{activity.mood}</span>
                  <div>
                    <h3 className="font-semibold">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{activity.duration}</span>
                  <input
                    type="checkbox"
                    checked={activity.completed}
                    onChange={() => {}}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <achievement.icon className="w-8 h-8 text-primary-500" />
                <span className="text-lg font-bold text-primary-600">
                  {achievement.progress}%
                </span>
              </div>
              <h3 className="font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetCompanion;