// src/components/emergency/EmergencyContacts.tsx
import { Phone, MessageSquare, Heart } from 'lucide-react';

const EmergencyContacts = () => {
  const contacts = [
    {
      name: "Meilleure amie",
      phone: "0123456789",
      type: "friend",
      icon: Heart
    },
    {
      name: "Famille",
      phone: "0987654321",
      type: "family",
      icon: Heart
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Contacts de Confiance</h3>
      
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div 
            key={contact.name}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <contact.icon className="w-5 h-5 text-primary-500" />
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.phone}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;