import React from 'react';
import { Button } from './ui/button';

const WhyChooseUs = ({ onBookNowClick }) => {
  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://thecomfortjourney.com/assets/whycar-X5sF3GMw.jpg')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="lg:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose{' '}
              <span className="text-yellow-500">CAR2GO</span>{' '}
              for Taxi Hires
            </h2>
            
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Car2go operates <strong>24/7</strong>, providing Airport, Railway, and Bus station pickup & drop services. We have a large fleet of cabs, equipped with all modern amenities, ensuring a <strong>safe and comfortable journey at an affordable price</strong>.
              </p>
              
              <p>
                Trusted in Indore for over <strong>3 years</strong>, we offer premium transport solutions. Our latest vehicles ensure <strong>world-class comfort and luxury</strong>, making us the <strong>top choice for cab services</strong>.
              </p>
            </div>
            
            <div className="mt-8">
              <Button
                size="lg"
                onClick={onBookNowClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
              >
                Book Now
              </Button>
            </div>
          </div>
          
          {/* Logo - Right Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-48 lg:w-64 lg:h-64 bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
              <img 
                src="/assets/logo-1.jpg" 
                alt="Car2go Logo" 
                className="w-full h-full object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23fbbf24'/%3E%3Ctext x='100' y='110' font-family='Arial' font-size='40' font-weight='bold' text-anchor='middle' fill='black'%3ECAR2GO%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;