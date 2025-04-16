import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpotDetailPage from './pages/SpotDetailPage';
import DayTripsPage from './pages/DayTripsPage';
import TripDetailPage from './pages/TripDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/spot/:id" element={<SpotDetailPage />} />
            <Route path="/trips" element={<DayTripsPage />} />
            <Route path="/trip/:id" element={<TripDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;