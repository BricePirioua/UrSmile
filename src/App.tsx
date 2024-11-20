// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import ArtGallery from './pages/ArtGallery';
import MeditationPage from './pages/Meditation';
import PetCompanion from './pages/PetCompanion';
import PetModal from './components/modals/PetModal';

interface PetInfo {
  has: boolean;
  type?: 'dog' | 'cat';
  name?: string;
}

const FirstTimeSetup = () => {
  const { user, updateUser } = useAuth();
  const [showPetModal, setShowPetModal] = useState(
    user && typeof user.pet === 'undefined'
  );

  const handlePetSetup = async (petInfo: PetInfo | null) => {
    if (!user || !petInfo) return;

    try {
      console.log('Updating user with pet info:', petInfo);
      
      const updatedUser = {
        ...user,
        pet: {
          has: petInfo.has,
          type: petInfo.type || null,
          name: petInfo.name || null
        }
      };

      await updateUser(updatedUser);
      console.log('User updated successfully with pet info');
      setShowPetModal(false);
    } catch (error) {
      console.error('Error updating user with pet info:', error);
    }
  };

  if (!showPetModal) return null;

  return <PetModal onComplete={handlePetSetup} />;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <FirstTimeSetup />
      <Layout>{children}</Layout>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/art-gallery" element={<PrivateRoute><ArtGallery /></PrivateRoute>} />
          <Route path="/meditation" element={<PrivateRoute><MeditationPage /></PrivateRoute>} />
          <Route path="/pet-companion" element={<PrivateRoute><PetCompanion /></PrivateRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;