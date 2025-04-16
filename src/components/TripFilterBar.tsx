import React from 'react';
import { Calendar, Star, TrendingUp, Filter, Clock, Users, Compass } from 'lucide-react';

interface TripFilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const TripFilterBar: React.FC<TripFilterBarProps> = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'All Trips', icon: <Compass className="h-4 w-4" /> },
    { id: 'popular', label: 'Most Popular', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'highest-rated', label: 'Highest Rated', icon: <Star className="h-4 w-4" /> },
    { id: 'most-completed', label: 'Most Completed', icon: <Users className="h-4 w-4" /> },
    { id: 'shortest', label: 'Shortest Duration', icon: <Clock className="h-4 w-4" /> }
  ];

  return (
    <div className="flex overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TripFilterBar;