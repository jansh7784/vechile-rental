import React, { useState, useEffect } from 'react';
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
  Star,
  Zap,
  Shield,
  ArrowRight
} from 'lucide-react';

const VehicleCard = ({ vehicle, onBookNow }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (pricing) => {
    if (pricing.daily) {
      return `₹${pricing.daily}/Day`;
    }
    if (pricing.halfDay && pricing.fullDay) {
      return `₹${pricing.halfDay}/12hour & ₹${pricing.fullDay}/24 hours`;
    }
    return 'Contact for Price';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getDiscountColor = (discount) => {
    if (!discount) return 'bg-blue-500';
    const value = parseInt(discount);
    if (value >= 15) return 'bg-red-500';
    if (value >= 10) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Enhanced Effects */}
      <div className="relative h-56 overflow-hidden bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer bg-gray-300 animate-pulse"></div>
        )}
        
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Discount Badge */}
        {vehicle.discount && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className={`${getDiscountColor(vehicle.discount)} hover:scale-110 text-white font-bold px-3 py-1 text-sm transition-transform duration-200 shadow-lg`}>
              {vehicle.discount}
            </Badge>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="bg-black/80 text-white backdrop-blur-sm hover:bg-black transition-colors duration-200">
            {vehicle.category}
          </Badge>
        </div>

        {/* Available/Unavailable Indicator */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            vehicle.available 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              vehicle.available ? 'bg-green-200 animate-pulse' : 'bg-red-200'
            }`} />
            {vehicle.available ? 'Available' : 'Not Available'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Vehicle Name */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {vehicle.name}
          </h3>
          {vehicle.selfDrive && (
            <Badge variant="outline" className="text-xs">
              <Car className="h-3 w-3 mr-1" />
              Self Drive
            </Badge>
          )}
        </div>

        {/* Description */}
        {vehicle.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {vehicle.description}
          </p>
        )}

        {/* Enhanced Specifications Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-blue-50 group/spec">
            <div className="p-2 bg-blue-100 rounded-full group-hover/spec:bg-blue-200 transition-colors duration-200">
              <Gauge className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">Transmission</div>
              <div className="text-sm font-semibold text-gray-900">{vehicle.transmission}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-green-50 group/spec">
            <div className="p-2 bg-green-100 rounded-full group-hover/spec:bg-green-200 transition-colors duration-200">
              <Fuel className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">Fuel</div>
              <div className="text-sm font-semibold text-gray-900">{vehicle.fuelType}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-purple-50 group/spec">
            <div className="p-2 bg-purple-100 rounded-full group-hover/spec:bg-purple-200 transition-colors duration-200">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">Seating</div>
              <div className="text-sm font-semibold text-gray-900">{vehicle.seating}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-cyan-50 group/spec">
            <div className="p-2 bg-cyan-100 rounded-full group-hover/spec:bg-cyan-200 transition-colors duration-200">
              <Zap className="h-4 w-4 text-cyan-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase font-medium">Efficiency</div>
              <div className="text-sm font-semibold text-gray-900">{vehicle.fuelEfficiency}</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Features</span>
          </div>
          <p className="text-sm text-gray-600">{vehicle.features}</p>
          
          {vehicle.ac && (
            <div className="flex items-center space-x-2 mt-2">
              <Wind className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">Air Conditioned</span>
            </div>
          )}
        </div>

        {/* Location & Pricing */}
        <div className="border-t pt-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-medium">{vehicle.location}</span>
            </div>
            <div className="text-sm text-gray-500">
              Extra: {vehicle.extraKmRate}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(vehicle.pricing)}
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Quick Booking</span>
            </div>
          </div>
        </div>

        {/* Enhanced Book Now Button */}
        <Button
          onClick={() => onBookNow(vehicle)}
          className={`w-full font-bold py-4 rounded-xl transition-all duration-300 group/btn relative overflow-hidden ${
            vehicle.available 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!vehicle.available}
        >
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>{vehicle.available ? 'Book Now' : 'Not Available'}</span>
            {vehicle.available && (
              <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
            )}
          </span>
          
          {vehicle.available && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300" />
          )}
        </Button>

        {/* Enhanced Rating Display */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors duration-200 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2 font-medium">(4.2)</span>
          </div>
          
          <div className="text-xs text-gray-500">
            50+ trips completed
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;