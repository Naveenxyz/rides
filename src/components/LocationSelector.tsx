import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const popularLocations = [
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "Electronic City",
  "Jayanagar",
  "MG Road",
  "HSR Layout",
  "Marathahalli"
];

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  selectedLocation, 
  setSelectedLocation 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };
  
  const handleUseCurrentLocation = () => {
    // In a real app, we would use the Geolocation API
    // For demo purposes, we'll just set a default location
    setSelectedLocation("Your Current Location");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <MapPin className="h-5 w-5 text-indigo-400 mr-2" />
          <h3 className="text-lg font-medium text-white">Your Location</h3>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full md:w-auto px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-left flex items-center justify-between hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="text-gray-300">
              {selectedLocation || "Select your location"}
            </span>
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 shadow-xl">
              <div className="p-2">
                <button
                  onClick={handleUseCurrentLocation}
                  className="w-full text-left px-4 py-2 text-sm text-indigo-400 hover:bg-gray-700 rounded flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Use current location
                </button>
                
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <p className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Popular Locations
                  </p>
                  {popularLocations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded"
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;