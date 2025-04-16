import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ChevronRight, ExternalLink } from 'lucide-react';
import { BikeSpot } from '../data/bikeSpots';

interface SpotCardProps {
  spot: BikeSpot;
}

const SpotCard: React.FC<SpotCardProps> = ({ spot }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === spot.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? spot.images.length - 1 : prevIndex - 1
    );
  };
  
  const openInGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/search/?api=1&query=${spot.location.latitude},${spot.location.longitude}`;
    window.open(url, '_blank');
  };
  
  const goToDetailPage = () => {
    navigate(`/spot/${spot.id}`);
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-[1.02] transition-transform"
       onClick={goToDetailPage}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={spot.images[currentImageIndex]} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        
        {spot.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              aria-label="Previous image"
            >
              <ChevronRight className="h-5 w-5 transform rotate-180" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        
        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
          {spot.distance} km
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{spot.name}</h3>
          <div className="flex items-center bg-yellow-600/20 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
            <span className="text-sm font-medium text-yellow-100">{spot.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{spot.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {spot.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={openInGoogleMaps}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Map
          </button>
          <button 
            onClick={goToDetailPage}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;