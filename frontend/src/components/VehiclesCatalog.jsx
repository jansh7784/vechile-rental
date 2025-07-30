import React, { useState, useMemo } from 'react';
import VehicleCard from './VehicleCard';
import { vehicles } from '../data/mockData';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const VehiclesCatalog = ({ onBookNow, searchQuery = '' }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTransmission, setFilterTransmission] = useState('all');
  const [filterFuelType, setFilterFuelType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories, transmissions, and fuel types
  const categories = [...new Set(vehicles.map(v => v.category))];
  const transmissions = [...new Set(vehicles.map(v => v.transmission))];
  const fuelTypes = [...new Set(vehicles.map(v => v.fuelType))];

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = searchQuery ? 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
      const matchesTransmission = filterTransmission === 'all' || vehicle.transmission === filterTransmission;
      const matchesFuelType = filterFuelType === 'all' || vehicle.fuelType === filterFuelType;

      return matchesSearch && matchesCategory && matchesTransmission && matchesFuelType;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = a.pricing.daily || a.pricing.fullDay || 0;
          const priceB = b.pricing.daily || b.pricing.fullDay || 0;
          return priceA - priceB;
        case 'price-high':
          const priceA2 = a.pricing.daily || a.pricing.fullDay || 0;
          const priceB2 = b.pricing.daily || b.pricing.fullDay || 0;
          return priceB2 - priceA2;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, filterCategory, filterTransmission, filterFuelType, sortBy]);

  const clearFilters = () => {
    setFilterCategory('all');
    setFilterTransmission('all');
    setFilterFuelType('all');
    setSortBy('name');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SELECT AND BOOK A CAR RENTAL WITH{' '}
            <span className="text-blue-600">THE COMFORT JOURNEY</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick a self-drive car rental in Indore from The Comfort Journey.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Toggle (Mobile) */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              
              <span className="text-sm text-gray-600">
                {filteredVehicles.length} vehicles found
                {searchQuery && ` for "${searchQuery}"`}
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Controls */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <Select value={filterTransmission} onValueChange={setFilterTransmission}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {transmissions.map(transmission => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <Select value={filterFuelType} onValueChange={setFilterFuelType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fuels</SelectItem>
                    {fuelTypes.map(fuelType => (
                      <SelectItem key={fuelType} value={fuelType}>
                        {fuelType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehiclesCatalog;