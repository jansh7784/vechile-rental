import React, { useState, useEffect } from 'react';
import { specialOffers } from '../data/mockData';

const SpecialOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality with smoother animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % specialOffers.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Scrolling Offers Container */}
        <div className="relative">
          <div 
            className="flex transition-all duration-700 ease-in-out gap-6"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / specialOffers.length)}%)`,
              width: `${specialOffers.length * 100}%`
            }}
          >
            {/* Main offers display */}
            {specialOffers.map((offer, index) => (
              <div
                key={`main-${offer.id}`}
                className="relative flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group cursor-pointer"
                style={{ width: `${100 / specialOffers.length}%` }}
              >
                {/* Background Image with Enhanced Overlay */}
                <div className="relative h-48 sm:h-56 md:h-64">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg";
                    }}
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" />
                  
                  {/* Animated Sparkle Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${1 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Enhanced Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white transform transition-transform duration-300 group-hover:scale-110">
                    {/* Discount Badge */}
                    <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full text-2xl sm:text-3xl font-black mb-3 shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                      {offer.discount}
                    </div>
                    
                    {/* Title */}
                    <div className="text-lg sm:text-xl font-bold text-white drop-shadow-lg mb-2">
                      {offer.title}
                    </div>
                    
                    {/* Validity */}
                    <div className="text-sm text-yellow-200 font-medium">
                      {offer.validUntil}
                    </div>
                    
                    {/* Call to Action */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30 hover:bg-white/30 transition-colors duration-200">
                        Claim Now →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-yellow-400 border-dashed rounded-full animate-spin-slow opacity-70"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Offer Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {specialOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full'
                  : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400 hover:scale-125'
              }`}
              aria-label={`Go to offer ${index + 1}`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default SpecialOffers;