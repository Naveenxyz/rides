import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Clock, Loader as Road } from 'lucide-react';
import { dayTrips } from '../data/dayTrips';
import LocationSelector from '../components/LocationSelector';
import DayTripCard from '../components/DayTripCard';
import TripFilterBar from '../components/TripFilterBar';

const DayTripsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredTrips, setFilteredTrips] = useState(dayTrips);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let result = dayTrips;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(trip => 
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by location proximity if selected
    if (selectedLocation) {
      // In a real app, we would calculate actual distances based on the starting point
      result = result.filter(trip => 
        trip.startLocation.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    
    // Apply category filters
    if (activeFilter === 'popular') {
      result = [...result].sort((a, b) => b.rating * b.ridesCompleted - a.rating * a.ridesCompleted);
    } else if (activeFilter === 'highest-rated') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (activeFilter === 'most-completed') {
      result = [...result].sort((a, b) => b.ridesCompleted - a.ridesCompleted);
    } else if (activeFilter === 'shortest') {
      result = [...result].sort((a, b) => {
        const durationA = parseInt(a.estimatedDuration.split(' ')[0]);
        const durationB = parseInt(b.estimatedDuration.split(' ')[0]);
        return durationA - durationB;
      });
    }
    
    setFilteredTrips(result);
  }, [selectedLocation, activeFilter, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Curated Day Trip Plans</h2>
            <p className="text-xl text-indigo-100 mb-8 drop-shadow">Discover complete motorcycle adventures planned by fellow riders</p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-lg bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-indigo-200"
                placeholder="Search for day trips, activities, or locations..."
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
          <TripFilterBar 
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
      </section>

      {/* Day Trip Stats */}
      <section className="py-8 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Calendar className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dayTrips.length}</p>
              <p className="text-gray-300 text-sm">Curated Trips</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <MapPin className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-gray-300 text-sm">Starting Points</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Clock className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">4-10</p>
              <p className="text-gray-300 text-sm">Hours Duration</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 text-center">
              <Road className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">50-240</p>
              <p className="text-gray-300 text-sm">Kilometers Range</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section id="trips" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="bg-indigo-600 w-2 h-8 mr-3 rounded-sm"></span>
            {filteredTrips.length} Day Trip Plans {selectedLocation ? `from ${selectedLocation}` : ''}
          </h2>
          
          {filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No trips found matching your criteria. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <DayTripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Create Your Own Trip CTA */}
      <section className="py-12 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Great Route to Share?</h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Create and share your own day trip plan with the BangaRide community. Help fellow riders discover amazing experiences!
          </p>
          <button className="bg-white text-indigo-900 hover:bg-indigo-100 font-bold py-3 px-8 rounded-lg transition-colors">
            Create a Trip Plan
          </button>
        </div>
      </section>
    </>
  );
};

export default DayTripsPage;