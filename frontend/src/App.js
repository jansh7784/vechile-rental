import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import SpecialOffers from "./components/SpecialOffers";
import VehiclesCatalog from "./components/VehiclesCatalog";
import Footer from "./components/Footer";
import BlogsPage from "./components/BlogsPage";
import ContactPage from "./components/ContactPage";
import FAQsPage from "./components/FAQsPage";
import AboutPage from "./components/AboutPage";
import ServicesPage from "./components/ServicesPage";
import ImportantPoints from "./components/ImportantPoints";
import TravelBlogs from "./components/TravelBlogs";
import WhyChooseUs from "./components/WhyChooseUs";
import CustomerReviews from "./components/CustomerReviews";
import FAQSection from "./components/FAQSection";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy";
import TermsOfUse from "./components/TermsOfUse";
import Policies from "./components/Policies";
import EmailJSTest from "./components/EmailJSTest";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookNow = (vehicle = null) => {
    const phoneNumber = "917400941274"; // Updated primary number
    let message = "Hello, I want to book a car from Car2go.";
    
    if (vehicle) {
      message = `Hello, I want to book ${vehicle.name} from Car2go.`;
    }
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const vehiclesSection = document.getElementById('vehicles-section');
    if (vehiclesSection) {
      vehiclesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <Header onSearchClick={handleSearch} />

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

      {/* Important Points */}
      <ImportantPoints />

      {/* Travel Blogs */}
      <TravelBlogs />

      {/* Why Choose Us */}
      <WhyChooseUs onBookNowClick={handleBookNow} />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <Footer />

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
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/bookcar" element={<ServicesPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/test-email" element={<EmailJSTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;