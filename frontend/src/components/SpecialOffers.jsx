import React from 'react';
import { Button } from './ui/button';
import { specialOffers } from '../data/mockData';
import { Clock, Zap } from 'lucide-react';

const SpecialOffers = ({ onBookNowClick }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specialOffers.map((offer, index) => (
            <div
              key={offer.id}
              className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-yellow-50" />
              
              {/* Content */}
              <div className="relative p-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Offer Badge */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-red-500 rounded-lg flex items-center justify-center transform rotate-3 shadow-lg">
                      <span className="text-white font-bold text-sm text-center leading-tight">
                        {offer.title}
                      </span>
                    </div>
                    {/* Lightning bolt for limited offers */}
                    {offer.type === 'limited' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Zap className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Discount Text */}
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold text-red-600 mb-2">
                      {offer.discount}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">{offer.validUntil}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    onClick={onBookNowClick}
                    className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full text-sm transform hover:scale-105 transition-all duration-200"
                  >
                    BOOK NOW
                  </Button>
                  
                  {/* Limited Offer Badge */}
                  {offer.type === 'limited' && (
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      LIMITED OFFER
                    </div>
                  )}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 border-4 border-yellow-400 rounded-full opacity-20" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-4 border-red-400 rounded-full opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;