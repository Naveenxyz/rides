import React from 'react';
import { MapPin, Star, TrendingUp, Filter, Compass } from 'lucide-react';

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'All Spots', icon: <Compass className="h-4 w-4" /> },
    { id: 'nearby', label: 'Nearby', icon: <MapPin className="h-4 w-4" /> },
    { id: 'popular', label: 'Most Popular', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'highest-rated', label: 'Highest Rated', icon: <Star className="h-4 w-4" /> }
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

export default FilterBar;