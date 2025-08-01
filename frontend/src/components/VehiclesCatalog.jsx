import React, { useState, useMemo, useEffect } from 'react';
import VehicleCard from './VehicleCard';
import { VehicleCardSkeleton } from './ui/skeleton';
import { vehicles } from '../data/mockData';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Search, Filter, SlidersHorizontal, Grid, List, MapPin, Star, ArrowRight } from 'lucide-react';

const VehiclesCatalog = ({ onBookNow, searchQuery = '' }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTransmission, setFilterTransmission] = useState('all');
  const [filterFuelType, setFilterFuelType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(new Set());

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.cardId]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-vehicle-card]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

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
        vehicle.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.features.toLowerCase().includes(searchQuery.toLowerCase())
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
        case 'popular':
          return b.id - a.id; // Simulate popularity
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

  const activeFiltersCount = [filterCategory, filterTransmission, filterFuelType].filter(f => f !== 'all').length;

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded-lg max-w-2xl mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg max-w-lg mx-auto animate-pulse"></div>
          </div>
          
          {/* Filter skeleton */}
          <div className="mb-8">
            <div className="h-12 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <VehicleCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-yellow-100 to-red-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Premium Car Rental</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            SELECT AND BOOK A CAR RENTAL WITH{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              THE COMFORT JOURNEY
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
            Pick a self-drive car rental in Indore from The Comfort Journey. Experience premium comfort and reliability.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center animate-fade-in-up animation-delay-600">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{vehicles.length}+</span>
              </div>
              <span className="text-gray-600">Vehicles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-gray-600">All Indore</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-gray-600">4.8 Rating</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Results and Filter Toggle */}
            <div className="flex items-center space-x-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden flex items-center space-x-2 ${activeFiltersCount > 0 ? 'border-blue-500 text-blue-600' : ''}`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredVehicles.length}</span> vehicles found
                {searchQuery && (
                  <span className="ml-1">for <span className="font-medium text-blue-600">"{searchQuery}"</span></span>
                )}
              </div>
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3 py-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3 py-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Enhanced Filter Controls */}
          <div className={`mt-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Category
                  </label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
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
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Transmission
                  </label>
                  <Select value={filterTransmission} onValueChange={setFilterTransmission}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
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
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Fuel Type
                  </label>
                  <Select value={filterFuelType} onValueChange={setFilterFuelType}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
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
                    className="w-full border-gray-300 hover:border-red-500 hover:text-red-600 transition-colors duration-200"
                    disabled={activeFiltersCount === 0}
                  >
                    Clear All ({activeFiltersCount})
                  </Button>
                </div>
              </div>
              
              {/* Active filters display */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600 mr-2">Active filters:</span>
                    {filterCategory !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Category: {filterCategory}
                      </span>
                    )}
                    {filterTransmission !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Transmission: {filterTransmission}
                      </span>
                    )}
                    {filterFuelType !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Fuel: {filterFuelType}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {filteredVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                data-vehicle-card
                data-card-id={vehicle.id}
                className={`${
                  visibleCards.has(vehicle.id.toString()) 
                    ? 'animate-fade-in-scale' 
                    : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  onBookNow={onBookNow}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No vehicles found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any vehicles matching your search criteria. 
              Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={clearFilters} variant="outline" size="lg">
                Clear all filters
              </Button>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <span className="mr-2">View All Vehicles</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        {filteredVehicles.length > 0 && (
          <div className="text-center mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to start your journey?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose from our premium fleet and experience the comfort and convenience 
              of self-drive car rentals in Indore.
            </p>
            <Button 
              onClick={() => onBookNow()}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="mr-2">Book Any Vehicle Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VehiclesCatalog;