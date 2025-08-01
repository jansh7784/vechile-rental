import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { specialOffers } from '../data/mockData';
import { Clock, Zap, Gift, ArrowRight, Sparkles } from 'lucide-react';

const SpecialOffers = ({ onBookNowClick }) => {
  const [visibleOffers, setVisibleOffers] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleOffers(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-offer-card]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getOfferIcon = (type) => {
    switch(type) {
      case 'limited': return <Zap className="h-5 w-5" />;
      case 'weekend': return <Gift className="h-5 w-5" />;
      case 'new_user': return <Sparkles className="h-5 w-5" />;
      default: return <Gift className="h-5 w-5" />;
    }
  };

  const getOfferGradient = (type) => {
    switch(type) {
      case 'limited': return 'from-red-500 via-pink-500 to-orange-500';
      case 'weekend': return 'from-purple-500 via-blue-500 to-indigo-500';
      case 'new_user': return 'from-green-500 via-teal-500 to-cyan-500';
      default: return 'from-red-500 via-pink-500 to-orange-500';
    }
  };

  const getCardBg = (type) => {
    switch(type) {
      case 'limited': return 'from-red-50 via-pink-50 to-orange-50';
      case 'weekend': return 'from-purple-50 via-blue-50 to-indigo-50';
      case 'new_user': return 'from-green-50 via-teal-50 to-cyan-50';
      default: return 'from-red-50 via-pink-50 to-orange-50';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-tr from-yellow-100 to-red-100 rounded-full opacity-30 blur-3xl animate-pulse animation-delay-300"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Special Offers
            </span>
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-300">
            Exclusive deals and discounts just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialOffers.map((offer, index) => (
            <div
              key={offer.id}
              data-offer-card
              data-index={index}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                visibleOffers.has(index.toString()) ? 'animate-fade-in-scale' : 'opacity-0'
              } card-hover group`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Offer Image Background */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${getCardBg(offer.type)} opacity-90`} />
                
                {/* Floating animation elements */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full floating"
                      style={{
                        left: `${20 + (i * 10)}%`,
                        top: `${10 + (i * 8)}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Offer Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getOfferGradient(offer.type)} text-white shadow-lg`}>
                    {getOfferIcon(offer.type)}
                    <span className="font-bold text-sm uppercase tracking-wide">
                      {offer.title}
                    </span>
                  </div>
                  
                  {offer.type === 'limited' && (
                    <div className="animate-pulse">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                    </div>
                  )}
                </div>

                {/* Discount Display */}
                <div className="text-center mb-6">
                  <div className={`text-6xl font-black bg-gradient-to-r ${getOfferGradient(offer.type)} bg-clip-text text-transparent mb-2`}>
                    {offer.discount}
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="font-medium">{offer.validUntil}</span>
                  </div>
                </div>

                {/* Special offer benefits */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Valid on all vehicles</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Instant discount applied</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No hidden charges</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={onBookNowClick}
                  className={`w-full bg-gradient-to-r ${getOfferGradient(offer.type)} hover:shadow-xl hover:shadow-${offer.type === 'limited' ? 'red' : offer.type === 'weekend' ? 'blue' : 'green'}-500/25 text-white font-bold py-4 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 group/btn relative overflow-hidden`}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>BOOK NOW</span>
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </span>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </Button>

                {/* Offer Type Badge */}
                <div className="flex justify-center mt-4">
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${
                    offer.type === 'limited' ? 'bg-red-100 text-red-600' :
                    offer.type === 'weekend' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      offer.type === 'limited' ? 'bg-red-500' :
                      offer.type === 'weekend' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}></div>
                    <span className="uppercase tracking-wide">
                      {offer.type === 'limited' ? 'Limited Time' :
                       offer.type === 'weekend' ? 'Weekend Special' :
                       'New User Offer'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-4 border-white/20 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Don't miss out on these amazing deals!
          </p>
          <Button
            onClick={onBookNowClick}
            variant="outline"
            size="lg"
            className="border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 font-semibold px-8 py-3 rounded-full transition-all duration-300 group"
          >
            <span className="mr-2">View All Vehicles</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;