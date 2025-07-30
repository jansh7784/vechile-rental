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
import BlogsPage from "./components/BlogsPage";
import ContactPage from "./components/ContactPage";
import FAQsPage from "./components/FAQsPage";
import AboutPage from "./components/AboutPage";
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

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<AboutPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;