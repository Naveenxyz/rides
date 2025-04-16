import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, ChevronLeft, ChevronRight, Clock, Compass, Loader as Road, Mountain, ThumbsUp, MessageSquare, Share2, Bookmark, Send, Calendar, Users, Check } from 'lucide-react';
import { dayTrips } from '../data/dayTrips';
import { useAuth } from '../context/AuthContext';
import { comments } from '../data/comments';
import LoginModal from '../components/LoginModal';
import RatingModal from '../components/RatingModal';

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [trip, setTrip] = useState(dayTrips.find(t => t.id === Number(id)));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [tripComments, setTripComments] = useState(comments.filter(c => c.spotId === Number(id)));
  const [userRating, setUserRating] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  
  useEffect(() => {
    if (!trip) {
      navigate('/trips');
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [trip, navigate]);
  
  if (!trip) return null;
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === trip.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? trip.images.length - 1 : prevIndex - 1
    );
  };
  
  const openInGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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
      id: tripComments.length + 1,
      spotId: trip.id,
      userId: user?.id || 0,
      userName: user?.name || 'Anonymous',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      text: userComment,
      date: new Date().toISOString(),
      likes: 0
    };
    
    setTripComments([newComment, ...tripComments]);
    setUserComment('');
  };
  
  const handleSubmitRating = (rating: number) => {
    setUserRating(rating);
    setShowRatingModal(false);
    
    // In a real app, we would send this to the server
    // For now, we'll just show a success message
    alert(`Thank you for rating ${trip.title} ${rating} stars!`);
  };

  const markAsCompleted = () => {
    if (isAuthenticated) {
      setIsCompleted(!isCompleted);
      // In a real app, we would send this to the server
      if (!isCompleted) {
        alert("Congratulations on completing this trip! Your achievement has been recorded.");
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const nextStop = () => {
    setCurrentStopIndex((prevIndex) => 
      prevIndex === trip.stops.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevStop = () => {
    setCurrentStopIndex((prevIndex) => 
      prevIndex === 0 ? trip.stops.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="pb-16">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => navigate('/trips')}
          className="flex items-center text-indigo-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to all trips
        </button>
      </div>
      
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={trip.images[currentImageIndex]} 
          alt={trip.title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {trip.images.length > 1 && (
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
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{trip.title}</h1>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-indigo-300 mr-1" />
                  <span className="text-indigo-100">{trip.startLocation} • {trip.distance} km</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex items-center bg-indigo-600 px-3 py-1 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-400 mr-1 fill-current" />
                  <span className="text-white font-medium">{trip.rating.toFixed(1)}</span>
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
                onClick={markAsCompleted}
                className={`flex items-center ${
                  isCompleted 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white px-4 py-2 rounded-lg transition-colors`}
              >
                {isCompleted ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <Road className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </>
                )}
              </button>
              
              <button 
                onClick={handleRateClick}
                className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Star className="h-4 w-4 mr-2" />
                Rate this trip
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
            
            {/* Trip Creator */}
            <div className="flex items-center mb-6 bg-gray-800 p-4 rounded-lg">
              <img 
                src={trip.creator.avatar} 
                alt={trip.creator.name} 
                className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-500"
              />
              <div>
                <p className="text-white font-medium">Created by {trip.creator.name}</p>
                <p className="text-gray-400 text-sm">
                  Posted on {new Date(trip.createdAt).toLocaleDateString()} • 
                  <span className="ml-1 text-indigo-400">{trip.ridesCompleted} riders completed this trip</span>
                </p>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                About this trip
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {trip.description}
              </p>
            </div>
            
            {/* Trip Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Trip Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Clock className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Start Time</h3>
                  <p className="text-gray-400 text-sm">{trip.startTime}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Road className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Distance</h3>
                  <p className="text-gray-400 text-sm">{trip.distance} km</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Clock className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Duration</h3>
                  <p className="text-gray-400 text-sm">{trip.estimatedDuration}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Mountain className="h-6 w-6 text-indigo-400 mb-2" />
                  <h3 className="font-medium text-white">Difficulty</h3>
                  <p className="text-gray-400 text-sm">{trip.difficulty}</p>
                </div>
              </div>
            </div>
            
            {/* Itinerary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Itinerary
              </h2>
              
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                
                <div className="space-y-6 pl-12 relative">
                  {/* Starting Point */}
                  <div className="relative">
                    <div className="absolute -left-12 mt-1.5 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">Starting Point: {trip.startLocation}</h3>
                          <p className="text-indigo-400 text-sm">{trip.startTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stops */}
                  {trip.stops.map((stop, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-12 mt-1.5 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-xs text-white">{index + 1}</span>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-white">{stop.name}</h3>
                            <p className="text-indigo-400 text-sm">{stop.time}</p>
                            <p className="text-gray-300 mt-2">{stop.description}</p>
                          </div>
                          <button 
                            onClick={() => openInGoogleMaps(stop.location.latitude, stop.location.longitude)}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                          >
                            <MapPin className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Ending Point */}
                  <div className="relative">
                    <div className="absolute -left-12 mt-1.5 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">Ending Point: {trip.endLocation}</h3>
                          <p className="text-green-400 text-sm">Estimated arrival: {trip.startTime} + {trip.estimatedDuration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile-friendly Stop Carousel */}
            <div className="md:hidden mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Quick Stop View</h2>
              <div className="relative bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={prevStop}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-white">
                    Stop {currentStopIndex + 1} of {trip.stops.length}
                  </span>
                  <button 
                    onClick={nextStop}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                
                <div>
                  <h3 className="font-medium text-white text-lg">{trip.stops[currentStopIndex].name}</h3>
                  <p className="text-indigo-400 text-sm mb-2">{trip.stops[currentStopIndex].time}</p>
                  <p className="text-gray-300 mb-4">{trip.stops[currentStopIndex].description}</p>
                  
                  {trip.stops[currentStopIndex].imageUrl && (
                    <img 
                      src={trip.stops[currentStopIndex].imageUrl} 
                      alt={trip.stops[currentStopIndex].name} 
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <button 
                    onClick={() => openInGoogleMaps(
                      trip.stops[currentStopIndex].location.latitude, 
                      trip.stops[currentStopIndex].location.longitude
                    )}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Maps
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tips for Riders */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Tips for Riders
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Start early to avoid traffic and make the most of your day.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Carry enough water and snacks for the journey.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Check your motorcycle's fuel, tire pressure, and overall condition before starting.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Download offline maps as some areas might have poor network coverage.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-600 rounded-full p-1 mr-3 mt-1">
                    <span className="block h-2 w-2 rounded-full bg-white"></span>
                  </div>
                  <p>Wear appropriate riding gear for safety and comfort.</p>
                </li>
              </ul>
            </div>
            
            {/* Comments Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-indigo-600 w-2 h-6 mr-3 rounded-sm"></span>
                Rider Reviews
                <span className="ml-2 text-sm font-normal text-gray-400">({tripComments.length})</span>
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
                      placeholder="Share your experience about this trip..."
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
                {tripComments.map(comment => (
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
            {/* Trip Map Preview */}
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-medium text-white">Trip Route</h3>
              </div>
              <div className="relative h-64">
                <img 
                  src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=color:0x4338ca|weight:5|${trip.stops.map(stop => `${stop.location.latitude},${stop.location.longitude}`).join('|')}&markers=color:green|label:S|${trip.stops[0].location.latitude},${trip.stops[0].location.longitude}&markers=color:red|label:E|${trip.stops[trip.stops.length-1].location.latitude},${trip.stops[trip.stops.length-1].location.longitude}&key=YOUR_API_KEY`} 
                  alt="Trip route" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => openInGoogleMaps(trip.stops[0].location.latitude, trip.stops[0].location.longitude)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View Full Route
                  </button>
                </div>
              </div>
            </div>
            
            {/* Trip Stats */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-white mb-3">Trip Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-indigo-400 mr-2" />
                    <span className="text-gray-300">Riders Completed</span>
                  </div>
                  <span className="text-white font-medium">{trip.ridesCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-indigo-400 mr-2" />
                    <span className="text-gray-300">Average Rating</span>
                  </div>
                  <span className="text-white font-medium">{trip.rating.toFixed(1)}/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Road className="h-4 w-4 text-indigo-400 mr-2" />
                    <span className="text-gray-300">Total Distance</span>
                  </div>
                  <span className="text-white font-medium">{trip.distance} km</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-indigo-400 mr-2" />
                    <span className="text-gray-300">Duration</span>
                  </div>
                  <span className="text-white font-medium">{trip.estimatedDuration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Mountain className="h-4 w-4 text-indigo-400 mr-2" />
                    <span className="text-gray-300">Difficulty</span>
                  </div>
                  <span className={`text-white font-medium px-2 py-0.5 rounded ${
                    trip.difficulty === 'Easy' ? 'bg-green-800' :
                    trip.difficulty === 'Moderate' ? 'bg-yellow-800' : 'bg-red-800'
                  }`}>{trip.difficulty}</span>
                </div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {trip.tags.map((tag, index) => (
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
              <h3 className="font-medium text-white mb-3">Weather Forecast</h3>
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
            
            {/* Similar Trips */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-3">Similar Trips</h3>
              <div className="space-y-3">
                {dayTrips
                  .filter(t => t.id !== trip.id)
                  .filter(t => t.tags.some(tag => trip.tags.includes(tag)))
                  .slice(0, 3)
                  .map(similarTrip => (
                    <div 
                      key={similarTrip.id} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                      onClick={() => navigate(`/trip/${similarTrip.id}`)}
                    >
                      <img 
                        src={similarTrip.images[0]} 
                        alt={similarTrip.title} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="text-white font-medium">{similarTrip.title}</h4>
                        <p className="text-gray-400 text-sm">{similarTrip.distance} km • {similarTrip.estimatedDuration}</p>
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
          spotName={trip.title}
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

export default TripDetailPage;