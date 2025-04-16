import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Recycle as Motorcycle, Menu, X, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();
  const location = useLocation();

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-20 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Motorcycle className="h-7 w-7 text-indigo-500" />
            <h1 className="text-xl font-bold text-white">BangaRide</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`${
                location.pathname === '/' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              } transition-colors`}
            >
              Spots
            </Link>
            <Link 
              to="/trips" 
              className={`${
                location.pathname === '/trips' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              } transition-colors`}
            >
              Day Trips
            </Link>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
            ) : isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"} 
                    alt={user?.name || "User"} 
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <span>{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">My Rides</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Saved Spots</a>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`${
                  location.pathname === '/' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Spots
              </Link>
              <Link 
                to="/trips" 
                className={`${
                  location.pathname === '/trips' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                } transition-colors py-2`}
                onClick={() => setIsMenuOpen(false)}
              >
                Day Trips
              </Link>
              <a 
                href="#about" 
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
              ) : isAuthenticated ? (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"} 
                      alt={user?.name || "User"} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <span className="text-white">{user?.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="text-gray-300 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </header>
  );
};

export default Header;