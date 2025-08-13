import React, { useState, useEffect } from 'react';
import { specialOffers } from '../data/mockData';

const SpecialOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % specialOffers.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scrolling Offers Container */}
        <div className="relative">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ 
              transform: `translateX(-${currentSlide * 100}%)`,
              width: `${specialOffers.length * 100}%`
            }}
          >
            {/* Duplicate offers for seamless infinite scroll */}
            {[...specialOffers, ...specialOffers, ...specialOffers].map((offer, index) => (
              <div
                key={`${offer.id}-${index}`}
                className="flex-shrink-0 w-64 h-40 relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ width: `${100 / specialOffers.length}%` }}
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold mb-1">{offer.discount}</div>
                    <div className="text-sm">{offer.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offer indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {specialOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;