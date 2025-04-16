import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, ChevronLeft, ChevronRight, Clock, Compass, Loader as Road, Mountain, ThumbsUp, MessageSquare, Share2, Bookmark, Send, Calendar } from 'lucide-react';
import { bikeSpots } from '../data/bikeSpots';
import { useAuth } from '../context/AuthContext';
import { comments } from '../data/comments';
import { routes } from '../data/routes';
import RatingModal from '../components/RatingModal';
import LoginModal from '../components/LoginModal';

const SpotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [spot, setSpot] = useState(bikeSpots.find(s => s.id === Number(id)));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [spotComments, setSpotComments] = useState(comments.filter(c => c.spotId === Number(id)));
  const [spotRoutes, setSpotRoutes] = useState(routes.filter(r => r.spotId === Number(id)));
  const [userRating, setUserRating] = useState(0);
  
  useEffect(() => {
    if (!spot) {
      navigate('/');
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [spot, navigate]);
  
  if (!spot) return null;
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === spot.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? spot.images.length - 1 : prevIndex - 1
    );
  };
  
  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${spot.location.latitude},${spot.location.longitude}`;
    window.open(url, '_blank');
  };
  
  const handleRateClick = () => {
    if (isAuthenticated) {
      setShowRatingModal(true);
    } else {
      setShowLoginModal(true);
    }
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userComment.trim()) return;
    
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    
    // Add new comment to the list
    const newComment = {
      id: spotComments.length + 1,
      spotId: spot.id,
      userId: user?.id || 0,
      userName: user?.name || 'Anonymous',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      text: userComment,
      date: new Date().toISOString(),
      likes: 0
    };
    
    setSpotComments([newComment, ...spotComments]);
    setUserComment('');
  };
  
  const handleSubmitRating = (rating: number) => {
    setUserRating(rating);
    setShowRatingModal(false);
    
    // In a real app, we would send this to the server
    // For now, we'll just show a success message
    alert(`Thank you for rating ${spot.name} ${rating} stars!`);
  };

  return (
    <div className="pb-16">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to all spots
        </button>
      </div>
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={spot.images[currentImageIndex]} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {spot.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{spot.name}</h1>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-indigo-300 mr-1" />
                  <span className="text-indigo-100">{spot.distance} km from Bangalore</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex items-center bg-indigo-600 px-3 py-1 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                  <span className="text-white font-medium">{spot.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button 
                onClick={openInGoogleMaps}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <MapPin className="h-4 w-4 mr-2" />
                View on Maps
              </button>
              
              <button 
                onClick={handleRateClick}
                className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Star className="h-4 w-4 mr-2" />
                Rate this spot
              </button>
              
              <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              
              <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                About this spot
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {spot.description}
              </p>
              <p className="text-gray-300 leading-relaxed">
                This is a popular destination among motorcycle enthusiasts in Bangalore. The roads leading to {spot.name} offer a perfect blend of curves, straights, and scenic views that make for an exhilarating ride. The journey is as rewarding as the destination itself, with plenty of opportunities to stop and take in the breathtaking landscapes.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Key Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Clock className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Best Time</h3>
                  <p className="text-gray-400 text-sm">Early Morning</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Road className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Road Condition</h3>
                  <p className="text-gray-400 text-sm">Good</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Compass className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Terrain</h3>
                  <p className="text-gray-400 text-sm">Mixed</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Mountain className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Difficulty</h3>
                  <p className="text-gray-400 text-sm">Moderate</p>
                </div>
              </div>
            </div>
            
            {/* Recommended Routes */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Recommended Routes
              </h2>
              <div className="space-y-4">
                {spotRoutes.map(route => (
                  <div key={route.id} className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium text-white text-lg mb-2">{route.name}</h3>
                    <p className="text-gray-300 text-sm mb-3">{route.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Road className="h-4 w-4 mr-1 text-indigo-400" />
                        <span>{route.distance} km</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-1 text-indigo-400" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Mountain className="h-4 w-4 mr-1 text-indigo-400" />
                        <span>{route.difficulty}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Things to Do */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Things to Do
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Enjoy the panoramic views of the surrounding landscapes from various viewpoints.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Take photographs of the scenic beauty and your motorcycle against the backdrop.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Stop at local eateries along the way to taste authentic regional cuisine.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Connect with fellow riders and share experiences at popular rest stops.</p>
                </li>
              </ul>
            </div>
            
            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Rider Reviews
                <span className="ml-2 text-sm font-normal text-gray-400">({spotComments.length})</span>
              </h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex items-start gap-3">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"} 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      placeholder="Share your experience about this spot..."
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              
              {/* Comments List */}
              <div className="space-y-6">
                {spotComments.map(comment => (
                  <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={comment.userAvatar} 
                        alt={comment.userName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white">{comment.userName}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(comment.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{comment.text}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <button className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-400 hover:text-indigo-400 transition-colors">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div>
            {/* Map Preview */}
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="relative h-48">
                <img 
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${spot.location.latitude},${spot.location.longitude}&zoom=12&size=600x300&maptype=roadmap&markers=color:red%7C${spot.location.latitude},${spot.location.longitude}&key=YOUR_API_KEY`} 
                  alt="Map location" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={openInGoogleMaps}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View Full Map
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {spot.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Weather Info */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-white mb-3">Weather Conditions</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="https://openweathermap.org/img/wn/01d@2x.png" 
                    alt="Weather" 
                    className="w-12 h-12"
                  />
                  <div>
                    <p className="text-white text-lg">28°C</p>
                    <p className="text-gray-400 text-sm">Clear Sky</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">Wind</p>
                  <p className="text-gray-400 text-sm">12 km/h</p>
                </div>
              </div>
            </div>
            
            {/* Nearby Spots */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-3">Nearby Spots</h3>
              <div className="space-y-3">
                {bikeSpots
                  .filter(s => s.id !== spot.id)
                  .sort((a, b) => Math.abs(a.distance - spot.distance) - Math.abs(b.distance - spot.distance))
                  .slice(0, 3)
                  .map(nearbySpot => (
                    <div 
                      key={nearbySpot.id} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate(`/spot/${nearbySpot.id}`)}
                    >
                      <img 
                        src={nearbySpot.images[0]} 
                        alt={nearbySpot.name} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="text-white font-medium">{nearbySpot.name}</h4>
                        <p className="text-gray-400 text-sm">{nearbySpot.distance} km away</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rating Modal */}
      {showRatingModal && (
        <RatingModal 
          spotName={spot.name}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleSubmitRating}
        />
      )}
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default SpotDetailPage;