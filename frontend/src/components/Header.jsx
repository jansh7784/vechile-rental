import React, { useState } from 'react';
import { Search, Menu, X, MessageCircle, Phone, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { navigationLinks } from '../data/mockData';

const Header = ({ onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchClick) {
      onSearchClick(searchQuery);
    }
  };

  const handleBookNow = () => {
    const phoneNumber = "917400941274";
    const message = "Hello, I want to book a car from Car2go.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleWhatsApp = () => {
    const phoneNumber = "917400941274";
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+917400941274', '_self');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/car2go_mp09?igsh=aTM3cXpyYjZ3azg3', '_blank');
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/assets/logo-1.jpg" 
                    alt="Car2go" 
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%232563eb'/%3E%3Ctext x='20' y='25' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3EC2G%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-gray-900">Car2go</h1>
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:block ml-10">
                <ul className="flex space-x-8">
                  {navigationLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <Search className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Button */}
              <button className="lg:hidden p-2 text-gray-400 hover:text-blue-600">
                <Search className="h-5 w-5" />
              </button>

              {/* Book Now Button - Changed to blackish */}
              <Button 
                onClick={handleBookNow} 
                size="sm" 
                className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-bold"
              >
                Book Now
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigationLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search cars..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10"
                      />
                      <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        <Search className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Contact Buttons - Fixed on right side - Updated phone numbers */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-40">
        <button 
          onClick={handleCall}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          title="Call +91 74009 41274"
        >
          <Phone className="h-6 w-6 text-white" />
        </button>
        <button 
          onClick={handleWhatsApp}
          className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          title="WhatsApp +91 74009 41274"
        >
          <img src="https://img.icons8.com/?size=100&id=QkXeKixybttw&format=png&color=000000" alt="WhatsApp" className="h-6 w-6 invert" />
        </button>
        <button 
          onClick={handleInstagram}
          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          title="Follow us on Instagram"
        >
          <Instagram className="h-6 w-6 text-white" />
        </button>
      </div>
    </>
  );
};

export default Header;