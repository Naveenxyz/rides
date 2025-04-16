import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { bikeSpots } from '../data/bikeSpots';
import LocationSelector from '../components/LocationSelector';
import SpotCard from '../components/SpotCard';
import FilterBar from '../components/FilterBar';

const HomePage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredSpots, setFilteredSpots] = useState(bikeSpots);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let result = bikeSpots;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(spot => 
        spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spot.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by location proximity if selected
    if (selectedLocation) {
      // In a real app, we would calculate actual distances
      // For now, we'll use the predefined "distance" property
      result = result.sort((a, b) => a.distance - b.distance);
    }
    
    // Apply category filters
    if (activeFilter === 'nearby') {
      result = result.filter(spot => spot.distance < 30);
    } else if (activeFilter === 'popular') {
      result = result.sort((a, b) => b.popularity - a.popularity);
    } else if (activeFilter === 'highest-rated') {
      result = result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredSpots(result);
  }, [selectedLocation, activeFilter, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Discover Epic Motorcycle Routes in Bangalore</h2>
            <p className="text-xl text-indigo-100 mb-8 drop-shadow">Find the perfect roads for your next two-wheeled adventure</p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-indigo-200"
                placeholder="Search for motorcycle spots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Selector */}
      <section className="py-6 bg-gray-800 shadow-md border-t border-b border-gray-700">
        <div className="container mx-auto px-4">
          <LocationSelector 
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 bg-gray-900 sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <FilterBar 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
      </section>

      {/* Spots Grid */}
      <section id="spots" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="bg-indigo-600 w-2 h-8 mr-3 rounded-sm"></span>
            {filteredSpots.length} Motorcycle Spots {selectedLocation ? `near ${selectedLocation}` : 'in Bangalore'}
          </h2>
          
          {filteredSpots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No spots found matching your criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <span className="bg-indigo-600 w-2 h-8 mr-3 rounded-sm"></span>
              About BangaRide
            </h2>
            <p className="text-gray-300 mb-4">
              BangaRide is your ultimate companion for discovering the most scenic and exciting motorcycle routes around Bangalore.
              Whether you're a casual rider looking for a peaceful weekend ride or an adventure enthusiast seeking challenging terrains,
              we've got you covered.
            </p>
            <p className="text-gray-300 mb-4">
              Our curated list of motorcycle spots includes detailed information about the location, distance, difficulty level,
              and user ratings to help you make the best choice for your next ride.
            </p>
            <p className="text-gray-300">
              Explore the beautiful outskirts of Bangalore, discover hidden gems, and create memorable experiences on two wheels!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;