import React from 'react';
import Header from './Header';
import Footer from './Footer';
import VehiclesCatalog from './VehiclesCatalog';
import ImportantPoints from './ImportantPoints';

const ServicesPage = () => {
  const handleBookNow = (vehicle = null) => {
    const phoneNumber = "919098103725";
    let message = "Hello, I want to book a car from The Comfort Journey.";
    
    if (vehicle) {
      message = `Hello, I want to book ${vehicle.name} from The Comfort Journey.`;
    }
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleSearch = (query) => {
    const vehiclesSection = document.getElementById('vehicles-section');
    if (vehiclesSection) {
      vehiclesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchClick={handleSearch} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Select and book a car rental with The Comfort Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Pick a self-drive car rental in Indore from The Comfort Journey.
          </p>
        </div>
      </section>

      {/* Vehicles Catalog */}
      <div id="vehicles-section" className="py-16">
        <VehiclesCatalog onBookNow={handleBookNow} />
      </div>

      {/* Important Points */}
      <ImportantPoints />

      <Footer />
    </div>
  );
};

export default ServicesPage;