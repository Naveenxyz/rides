import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ChevronRight, Calendar, Clock, Loader as Road, Users, Check } from 'lucide-react';
import { DayTrip } from '../data/dayTrips';
import { useAuth } from '../context/AuthContext';

interface DayTripCardProps {
  trip: DayTrip;
}

const DayTripCard: React.FC<DayTripCardProps> = ({ trip }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === trip.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? trip.images.length - 1 : prevIndex - 1
    );
  };
  
  const goToDetailPage = () => {
    navigate(`/trip/${trip.id}`);
  };

  const markAsCompleted = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAuthenticated) {
      setIsCompleted(!isCompleted);
      // In a real app, we would send this to the server
    } else {
      alert("Please sign in to mark trips as completed");
    }
  };

  return (
    <div 
      className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-[1.02] transition-transform"
      onClick={goToDetailPage}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={trip.images[currentImageIndex]} 
          alt={trip.title} 
          className="w-full h-full object-cover"
        />
        
        {trip.images.length > 1 && (
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
          {trip.distance} km
        </div>
        
        <div className="absolute bottom-2 left-2 flex items-center bg-black/60 px-2 py-1 rounded-lg">
          <Clock className="h-3 w-3 text-indigo-300 mr-1" />
          <span className="text-xs font-medium text-white">{trip.estimatedDuration}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{trip.title}</h3>
          <div className="flex items-center bg-yellow-600/20 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
            <span className="text-sm font-medium text-yellow-100">{trip.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <img 
            src={trip.creator.avatar} 
            alt={trip.creator.name} 
            className="w-5 h-5 rounded-full mr-2"
          />
          <span className="text-sm text-gray-400">by {trip.creator.name}</span>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{trip.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {trip.tags.slice(0, 4).map((tag, index) => (
            <span 
              key={index} 
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {trip.tags.length > 4 && (
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
              +{trip.tags.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-indigo-400 mr-1" />
            <span>{trip.startLocation}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-indigo-400 mr-1" />
            <span>{trip.startTime}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={markAsCompleted}
            className={`flex-1 ${
              isCompleted 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-700 hover:bg-gray-600'
            } text-white py-2 rounded-lg flex items-center justify-center transition-colors`}
          >
            {isCompleted ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Completed
              </>
            ) : (
              <>
                <Road className="h-4 w-4 mr-2" />
                Mark as Done
              </>
            )}
          </button>
          <button 
            onClick={goToDetailPage}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
          >
            Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700 text-xs text-gray-400">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>{trip.ridesCompleted} riders completed</span>
          </div>
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
              trip.difficulty === 'Easy' ? 'bg-green-500' :
              trip.difficulty === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            <span>{trip.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayTripCard;