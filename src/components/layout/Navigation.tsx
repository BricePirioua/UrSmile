// src/components/layout/Navigation.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Palette, Headphones, Heart, Dog, Cat, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseNavItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/art-gallery', icon: Palette, label: 'Galerie' },
    { to: '/meditation', icon: Headphones, label: 'Méditation' }
  ];

  const navItems = [...baseNavItems];
  if (user?.pet?.has) {
    navItems.push({
      to: '/pet-companion',
      icon: user.pet.type === 'dog' ? Dog : Cat,
      label: user.pet.name || 'Mon compagnon'
    });
  }

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo et nom */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Heart className="h-8 w-8 text-primary-500" />
              <Sparkles className="w-4 h-4 text-primary-400 absolute -top-1 -right-1" />
            </div>
            <span className="font-bold text-xl text-primary-500">UrSmile</span>
            <span className="ml-2 text-sm text-gray-600 hidden sm:inline">| {user?.firstName}</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 ml-4 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span>Déconnexion</span>
            </button>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Déroulant */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  isActive(item.to)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Déconnexion</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;