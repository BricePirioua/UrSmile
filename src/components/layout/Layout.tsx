// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="bg-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>UrSmile - Ton compagnon de bonne humeur 🌟</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;