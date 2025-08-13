import React from 'react';
import { Car, Users, Wind, MapPin, Fuel, Settings } from 'lucide-react';
import { Button } from './ui/button';

const VehicleCard = ({ vehicle, onBookNow }) => {
  const handleBookNow = () => {
    onBookNow(vehicle);
  };

  const getTransmissionIcon = () => <Settings className="h-4 w-4" />;
  const getFuelIcon = () => <Fuel className="h-4 w-4" />;
  const getACIcon = () => <Wind className="h-4 w-4" />;
  const getPersonsIcon = () => <Users className="h-4 w-4" />;
  const getLocationIcon = () => <MapPin className="h-4 w-4" />;

  const formatPricing = () => {
    if (vehicle.pricing.halfDay && vehicle.pricing.fullDay) {
      return `₹${vehicle.pricing.halfDay}/12hour & ${vehicle.pricing.fullDay}/24 hours`;
    } else if (vehicle.pricing.daily) {
      return `₹${vehicle.pricing.daily}/Day`;
    }
    return 'Contact for pricing';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg";
          }}
        />
        
        {/* Discount Badge */}
        {vehicle.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {vehicle.discount}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{vehicle.name}</h3>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            {getTransmissionIcon()}
            <span className="ml-2">{vehicle.transmission}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="ml-2">{vehicle.fuelEfficiency}</span>
          </div>

          <div className="flex items-center text-gray-600">
            {getFuelIcon()}
            <span className="ml-2">{vehicle.fuelType}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
            <span className="ml-2">{vehicle.features}</span>
          </div>

          <div className="flex items-center text-gray-600">
            {getPersonsIcon()}
            <span className="ml-2">{vehicle.seating}</span>
          </div>

          <div className="flex items-center text-gray-600">
            {getACIcon()}
            <span className="ml-2">AC</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-700 mb-4">
          {getLocationIcon()}
          <span className="ml-2 font-medium">{vehicle.location}</span>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {formatPricing()}
          </div>
          <div className="text-sm text-gray-600">
            Extra km fare: {vehicle.extraKmRate}
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          onClick={handleBookNow}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;