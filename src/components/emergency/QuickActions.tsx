// src/components/emergency/QuickActions.tsx
import { Heart, Music, Phone, MessageCircle, Sun } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Heart,
      title: "Je t'aime",
      description: "Rappelle-toi que tu es aimée",
      color: "text-red-500",
      bgColor: "bg-red-100"
    },
    {
      icon: Music,
      title: "Musique apaisante",
      description: "Écoute une mélodie relaxante",
      color: "text-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      icon: Sun,
      title: "Visualisation positive",
      description: "Imagine un endroit apaisant",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100"
    },
    {
      icon: MessageCircle,
      title: "Messages positifs",
      description: "Lis des messages réconfortants",
      color: "text-green-500",
      bgColor: "bg-green-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.title}
          className={`p-4 rounded-xl ${action.bgColor} hover:opacity-90 transition-opacity text-left`}
        >
          <action.icon className={`w-8 h-8 ${action.color} mb-2`} />
          <h3 className="font-semibold text-gray-800">{action.title}</h3>
          <p className="text-sm text-gray-600">{action.description}</p>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;