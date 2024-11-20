// src/pages/EmergencyMode.tsx
import { useState } from 'react';
import BreathingGuide from '../components/emergency/BreathingGuide';
import QuickActions from '../components/emergency/QuickActions';
import EmergencyContacts from '../components/emergency/EmergencyContacts';

const EmergencyMode = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Mode SOS
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tu n'es pas seule. Prenons un moment pour retrouver le calme ensemble.
        </p>
      </div>

      {/* Guide de respiration */}
      <div className="mb-8">
        <BreathingGuide />
      </div>

      {/* Actions rapides */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Actions Rapides</h2>
        <QuickActions />
      </div>

      {/* Contacts d'urgence */}
      <div className="mb-8">
        <EmergencyContacts />
      </div>

      {/* Message de soutien */}
      <div className="text-center mt-8 p-6 bg-primary-50 rounded-xl">
        <p className="text-lg text-primary-600">
          Rappelle-toi que chaque moment difficile est temporaire. 
          Tu es plus forte que tu ne le penses. 💪
        </p>
      </div>
    </div>
  );
};

export default EmergencyMode;