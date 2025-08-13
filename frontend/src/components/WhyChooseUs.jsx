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
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Why Choose{' '}
            <span className="text-yellow-500">CAR2GO</span>{' '}
            for Taxi Hires
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Car2go operates <strong>24/7</strong>, providing Airport, Railway, and Bus station pickup & drop services. We have a large fleet of cabs, equipped with all modern amenities, ensuring a <strong>safe and comfortable journey at an affordable price</strong>.
            </p>
            
            <p>
              Trusted in Indore for over <strong>3 years</strong>, we offer premium transport solutions. Our latest vehicles ensure <strong>world-class comfort and luxury</strong>, making us the <strong>top choice for cab services</strong>.
            </p>
          </div>
          
          <div className="mt-10">
            <Button
              size="lg"
              onClick={onBookNowClick}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all duration-300"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;