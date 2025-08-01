import React from 'react';

export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      {...props}
    />
  );
};

export const VehicleCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="h-56 w-full" />
      
      {/* Content skeleton */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>
        
        <Skeleton className="h-4 w-full mb-4" />
        
        {/* Specs grid skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
        
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-6" />
        
        {/* Pricing section skeleton */}
        <div className="border-t pt-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        
        {/* Button skeleton */}
        <Skeleton className="h-12 w-full rounded-xl" />
        
        {/* Rating skeleton */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
            <Skeleton className="h-4 w-12 ml-2" />
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
};

export const HeroSkeleton = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-200">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <Skeleton className="h-16 md:h-24 lg:h-32 w-full max-w-4xl mx-auto mb-6" />
        <Skeleton className="h-8 md:h-12 w-full max-w-3xl mx-auto mb-10" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Skeleton className="h-14 w-48" />
          <Skeleton className="h-14 w-40" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
