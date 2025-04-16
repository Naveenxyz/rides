import React from 'react';
import { Recycle as Motorcycle, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Motorcycle className="h-7 w-7 text-indigo-500" />
              <span className="text-xl font-bold">BangaRide</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the best motorcycle routes around Bangalore with our curated collection of scenic spots and rider recommendations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#spots" className="text-gray-400 hover:text-white transition-colors">Explore Spots</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Popular Spots</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nandi Hills</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Savandurga</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Skandagiri</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shivanasamudra Falls</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ramanagara</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Ride Street, Bangalore, Karnataka 560001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-500 mr-2" />
                <span className="text-gray-400">info@bangaride.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BangaRide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;