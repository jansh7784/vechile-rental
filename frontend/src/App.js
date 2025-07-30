import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpecialOffers from "./components/SpecialOffers";
import VehiclesCatalog from "./components/VehiclesCatalog";
import LoginModal from "./components/LoginModal";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (userData) => {
    setUser(userData);
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleBookNow = (vehicle = null) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    setIsBookingModalOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Scroll to vehicles section
    const vehiclesSection = document.getElementById('vehicles-section');
    if (vehiclesSection) {
      vehiclesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check for stored user on component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <Header
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSearchClick={handleSearch}
        user={user}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <HeroSection onBookNowClick={handleBookNow} />

      {/* Special Offers */}
      <SpecialOffers onBookNowClick={handleBookNow} />

      {/* Vehicles Catalog */}
      <div id="vehicles-section">
        <VehiclesCatalog 
          onBookNow={handleBookNow}
          searchQuery={searchQuery}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        vehicle={selectedVehicle}
        user={user}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About The Comfort Journey</h1>
          <p className="text-xl text-gray-600">Your trusted partner for comfortable car rentals</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              The Comfort Journey was founded with a simple mission: to provide reliable, comfortable, 
              and affordable car rental services to travelers and locals alike. Since our inception, 
              we've been committed to making your journey as smooth and comfortable as possible.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Wide selection of well-maintained vehicles</li>
              <li>Competitive pricing with transparent costs</li>
              <li>24/7 customer support</li>
              <li>Flexible rental options</li>
              <li>Easy online booking process</li>
              <li>Professional and friendly service</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-600">
              We're committed to providing exceptional service and ensuring that every journey 
              with us is comfortable, safe, and memorable. Our team works tirelessly to maintain 
              our fleet and provide the best possible experience for our customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Services Page Component  
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">Comprehensive car rental solutions for every need</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Self Drive Cars",
              description: "Drive yourself with our well-maintained fleet of cars",
              features: ["No driver needed", "Flexible timings", "Multiple pickup locations"]
            },
            {
              title: "Outstation Trips", 
              description: "Long distance travel made comfortable",
              features: ["Inter-city travel", "Well-planned routes", "24/7 roadside assistance"]
            },
            {
              title: "Airport Transfers",
              description: "Hassle-free airport pickup and drop services",
              features: ["Flight tracking", "Meet & greet service", "Luggage assistance"]
            },
            {
              title: "Corporate Rentals",
              description: "Business travel solutions for companies",
              features: ["Bulk booking discounts", "Invoice billing", "Dedicated support"]
            },
            {
              title: "Wedding Cars",
              description: "Special occasion vehicles for your big day",
              features: ["Luxury vehicles", "Decoration options", "Professional chauffeur"]
            },
            {
              title: "Luxury Vehicles",
              description: "Premium cars for special occasions",
              features: ["High-end models", "VIP treatment", "Concierge service"]
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/faqs" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">FAQs - Coming Soon</h1></div>} />
          <Route path="/blogs" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Blogs - Coming Soon</h1></div>} />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl">Contact - Coming Soon</h1></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;