import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Car, 
  Users, 
  Gauge, 
  Fuel, 
  Wind, 
  MapPin,
  Clock,
  Star
} from 'lucide-react';

const VehicleCard = ({ vehicle, onBookNow }) => {
  const formatPrice = (pricing) => {
    if (pricing.daily) {
      return `₹${pricing.daily}/Day`;
    }
    if (pricing.halfDay && pricing.fullDay) {
      return `₹${pricing.halfDay}/12hour & ₹${pricing.fullDay}/24 hours`;
    }
    return 'Contact for Price';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {vehicle.discount && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              {vehicle.discount}
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black text-white">
            {vehicle.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Vehicle Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {vehicle.name}
        </h3>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Gauge className="h-4 w-4 text-blue-600" />
            <span>{vehicle.transmission}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Fuel className="h-4 w-4 text-blue-600" />
            <span>{vehicle.fuelType}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{vehicle.seating}</span>
          </div>
          
          {vehicle.ac && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Wind className="h-4 w-4 text-blue-600" />
              <span>AC</span>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">{vehicle.features}</p>
        </div>

        {/* Location & Pricing */}
        <div className="border-t pt-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{vehicle.location}</span>
            </div>
            <div className="text-sm text-gray-500">
              Extra km fare: {vehicle.extraKmRate}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-blue-600">
              {formatPrice(vehicle.pricing)}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>15km</span>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <Button
          onClick={() => onBookNow(vehicle)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          disabled={!vehicle.available}
        >
          {vehicle.available ? 'Book Now' : 'Not Available'}
        </Button>

        {/* Rating Display (Mock) */}
        <div className="flex items-center justify-center mt-3 space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">(4.2)</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;