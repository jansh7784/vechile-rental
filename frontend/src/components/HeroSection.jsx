import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { heroSlides } from '../data/mockData';

const HeroSection = ({ onBookNowClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Preload images for faster transitions
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroSlides.map((slide) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, slide.image]));
            resolve(slide.image);
          };
          img.onerror = reject;
          img.src = slide.image;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const getOverlayClass = (overlay) => {
    switch(overlay) {
      case 'gradient':
        return 'bg-gradient-to-r from-black/70 via-black/40 to-transparent';
      case 'dark':
        return 'bg-black/50';
      default:
        return 'bg-black/40';
    }
  };

  if (isLoading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading your journey...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Enhanced Transitions */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
            }}
          />
          {/* Dynamic Overlay */}
          <div className={`absolute inset-0 ${getOverlayClass(slide.overlay)}`} />
          
          {/* Animated Particles Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Enhanced Content with Animations */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="transform transition-all duration-1000 ease-out">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 opacity-90 max-w-4xl mx-auto font-light animate-fade-in-up animation-delay-300">
            {heroSlides[currentSlide].subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button
              size="lg"
              onClick={onBookNowClick}
              className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-bold px-10 py-5 text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gray-800/25 group"
            >
              <span className="mr-2">{heroSlides[currentSlide].ctaText}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-white hover:bg-white hover:text-black px-8 py-5 text-lg rounded-full backdrop-blur-sm transition-all duration-300 group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Watch Tour
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentSlide
                ? 'w-12 h-3 bg-yellow-500 rounded-full'
                : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75 hover:scale-125'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Quick Stats Overlay */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 text-white text-right">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 space-y-1">
          <div className="text-2xl font-bold">500+</div>
          <div className="text-sm opacity-80">Happy Customers</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;