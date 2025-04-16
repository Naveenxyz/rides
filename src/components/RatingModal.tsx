import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

interface RatingModalProps {
  spotName: string;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ spotName, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit(rating);
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-bold text-white mb-4">Rate this spot</h2>
        <p className="text-gray-300 mb-6">How was your experience at {spotName}?</p>
        
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="p-1"
              >
                <Star 
                  className={`h-8 w-8 ${
                    (hover || rating) >= star 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-500'
                  } transition-colors`} 
                />
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <label htmlFor="feedback" className="block text-white mb-2">Share your experience (optional)</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              placeholder="Tell us what you liked or didn't like about this spot..."
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className={`px-4 py-2 rounded-lg ${
                rating === 0 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
            >
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;