import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Select 8 best reviews for the auto-scroll carousel
  const reviews = [
    {
      id: 1,
      name: "Alok Mishra",
      rating: 5.0,
      comment: "Car was new and clean. Excellent service from Car2go!",
      date: "7/1/2025"
    },
    {
      id: 2,
      name: "Somil Jain", 
      rating: 5.0,
      comment: "Ride was good ..go for it. Highly recommend Car2go.",
      date: "7/1/2025"
    },
    {
      id: 3,
      name: "Adarsh Thakur",
      rating: 5.0,
      comment: "Best.. and bestest self drive company.. Car2go rocks!",
      date: "7/1/2025"
    },
    {
      id: 4,
      name: "Priyanshu Pathak",
      rating: 5.0,
      comment: "My experience is best with Car2go. Service is outstanding!",
      date: "7/1/2025"
    },
    {
      id: 5,
      name: "Vivek Nanda",
      rating: 5.0,
      comment: "Nice journey with Car2go. Well maintained cars.",
      date: "7/1/2025"
    },
    {
      id: 6,
      name: "Akhilesh Birla",
      rating: 5.0,
      comment: "Best car rental in Indore. Car2go is amazing!",
      date: "7/1/2025"
    },
    {
      id: 7,
      name: "Mohit Sharma",
      rating: 5.0,
      comment: "Long drives are always best. Very convenient and satisfied 😊",
      date: "7/1/2025"
    },
    {
      id: 8,
      name: "Deepak Taneja",
      rating: 5.0,
      comment: "They give good service and cheap price. Thank you Car2go!",
      date: "7/1/2025"
    }
  ];

  // Auto scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Customer Reviews</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say About{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Car2go
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Real experiences from people who have traveled with Car2go.
          </p>
        </div>

        {/* Auto-scrolling Reviews Carousel */}
        <div className="relative overflow-hidden">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-10 h-10 bg-white/80 hover:bg-white shadow-lg border-gray-200 hover:border-blue-500"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-10 h-10 bg-white/80 hover:bg-white shadow-lg border-gray-200 hover:border-blue-500"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Reviews Container */}
          <div className="mx-8">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 mx-auto max-w-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-4 space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-lg font-bold text-gray-900">{review.rating}</span>
                      <span className="text-gray-500">/ 5</span>
                    </div>
                    
                    {/* Customer Info */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                        <p className="text-gray-500 text-sm">Verified Customer</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{review.date}</p>
                        <div className="text-xs text-blue-600 font-medium">Car2go Customer</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-scroll Progress Bar */}
          <div className="mt-6 max-w-xs mx-auto">
            <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-2000 ease-linear"
                style={{ 
                  width: `${((currentSlide + 1) / reviews.length) * 100}%`,
                  animation: 'progress 2s linear infinite'
                }}
              />
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              {currentSlide + 1} of {reviews.length} reviews
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied customers who trust Car2go
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Book Your Car Now
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default CustomerReviews;