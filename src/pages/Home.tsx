// src/pages/Home.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Heart, Music, Book, Sun, Camera, Dog, Cat, Moon, Star } from 'lucide-react';

interface Suggestion {
  title: string;
  description: string;
  icon: typeof Heart;
  link?: string;
  action?: string;
  requiresPet?: boolean;
}

interface Mood {
  emoji: string;
  label: string;
  color: string;
  suggestions: Suggestion[];
}

const moods: Mood[] = [
  {
    emoji: '😊',
    label: 'Joyeux',
    color: 'bg-green-100 text-green-600',
    suggestions: [
      {
        title: 'Capture ce moment',
        description: 'Pourquoi ne pas immortaliser ce beau moment ?',
        icon: Camera,
        link: '/meditation',
        action: 'Capturer'
      },
      {
        title: 'Méditation de gratitude',
        description: 'Profite de cette belle énergie pour une séance de méditation positive',
        icon: Sun,
        link: '/meditation',
        action: 'Méditer'
      },
      {
        title: 'Partage ta joie',
        description: 'Passe un moment avec [petName] !',
        icon: Dog,
        requiresPet: true,
        link: '/meditation',
        action: 'Jouer'
      }
    ]
  },
  {
    emoji: '😌',
    label: 'Calme',
    color: 'bg-blue-100 text-blue-600',
    suggestions: [
      {
        title: 'Moment créatif',
        description: 'C\'est le moment parfait pour dessiner ou peindre',
        icon: Camera,
        link: '/meditation',
        action: 'Créer'
      },
      {
        title: 'Méditation douce',
        description: 'Prolonge cet état de calme avec une séance de méditation',
        icon: Moon,
        link: '/meditation',
        action: 'Méditer'
      },
      {
        title: 'Câlins apaisants',
        description: 'Profite de ce moment calme avec [petName]',
        icon: Heart,
        requiresPet: true,
        link: '/meditation',
        action: 'Câliner'
      }
    ]
  },
  {
    emoji: '😔',
    label: 'Triste',
    color: 'bg-indigo-100 text-indigo-600',
    suggestions: [
      {
        title: 'Méditation guidée',
        description: 'Une séance de méditation peut t\'aider à te sentir mieux',
        icon: Heart,
        link: '/meditation',
        action: 'Commencer'
      },
      {
        title: 'Musique réconfortante',
        description: 'Écoute des musiques qui te font du bien',
        icon: Music,
        link: '/meditation',
        action: 'Écouter'
      },
      {
        title: 'Câlins réconfortants',
        description: '[petName] sait toujours comment te réconforter',
        icon: Dog,
        requiresPet: true,
        link: '/meditation',
        action: 'Retrouver'
      }
    ]
  },
  {
    emoji: '😤',
    label: 'Frustré',
    color: 'bg-red-100 text-red-600',
    suggestions: [
      {
        title: 'Respiration apaisante',
        description: 'Prends un moment pour te recentrer',
        icon: Sun,
        link: '/meditation',
        action: 'Respirer'
      },
      {
        title: 'Expression créative',
        description: 'Exprime tes émotions à travers l\'art',
        icon: Camera,
        link: '/meditation',
        action: 'Créer'
      },
      {
        title: 'Balade détente',
        description: 'Une promenade avec [petName] peut t\'aider à décompresser',
        icon: Dog,
        requiresPet: true,
        link: '/meditation',
        action: 'Sortir'
      }
    ]
  },
  {
    emoji: '🤗',
    label: 'Reconnaissant',
    color: 'bg-yellow-100 text-yellow-600',
    suggestions: [
      {
        title: 'Méditation de gratitude',
        description: 'Ancre ce sentiment avec une méditation positive',
        icon: Sun,
        link: '/meditation',
        action: 'Méditer'
      },
      {
        title: 'Expression artistique',
        description: 'Transforme cette gratitude en création',
        icon: Star,
        link: '/meditation',
        action: 'Créer'
      },
      {
        title: 'Moment de partage',
        description: 'Profite d\'un moment spécial avec [petName]',
        icon: Heart,
        requiresPet: true,
        link: '/meditation',
        action: 'Partager'
      }
    ]
  }
];

const Home = () => {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  if (!user) {
    return null;
  }

  const getFilteredSuggestions = (suggestions: Suggestion[]) => {
    if (!user.pet?.has) {
      return suggestions.filter(s => !s.requiresPet);
    }

    return suggestions.map(s => ({
      ...s,
      description: s.description.replace('[petName]', user.pet?.name || '')
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Bonjour {user.firstName} !
        </h1>
        <p className="text-xl text-gray-600">
          Comment te sens-tu aujourd'hui ?
        </p>
        
        {/* Sélecteur d'humeur */}
        <div className="flex flex-wrap justify-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.emoji}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl text-2xl transition-all duration-300 
                ${selectedMood?.label === mood.label 
                  ? mood.color + ' scale-110' 
                  : 'bg-white hover:bg-gray-50'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <span>{mood.emoji}</span>
                <span className="text-sm text-gray-600">{mood.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Suggestions basées sur l'humeur */}
        {selectedMood && (
          <div className="mt-12 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">
              Suggestions pour toi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getFilteredSuggestions(selectedMood.suggestions).map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <suggestion.icon className={`w-8 h-8 mb-4 ${
                    selectedMood.color.replace('bg-', 'text-').replace('-100', '-500')
                  }`} />
                  <h3 className="font-semibold mb-2">{suggestion.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
                  {suggestion.link && (
                    <Link
                      to={suggestion.link}
                      className={`inline-flex items-center text-sm font-medium ${
                        selectedMood.color.replace('bg-', 'text-').replace('-100', '-600')
                      }`}
                    >
                      {suggestion.action} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;