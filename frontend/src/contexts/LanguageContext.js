import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations object
const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services", 
    faqs: "FAQs",
    blogs: "Blogs",
    contact: "Contact",
    
    // Header
    searchPlaceholder: "Search cars...",
    bookNow: "Book Now",
    
    // Hero Section
    heroTitle: "Your Ride, Your Way",
    heroSubtitle: "Book a car easily with just a few clicks – anytime, anywhere.",
    watchTour: "Watch Tour",
    
    // Common
    learnMore: "Learn More",
    getStarted: "Get Started",
    readMore: "Read More",
    viewAll: "View All",
    
    // Footer
    quickLinks: "Quick Links",
    legal: "Legal",
    contactInfo: "Contact Info",
    operatingHours: "Operating Hours",
    available247: "24/7 Available",
    customerSupport: "Customer Support",
    copyright: "© 2025 Car2go. All rights reserved.",
    
    // Vehicle Section
    ourVehicles: "Our Premium Vehicle Fleet",
    vehicleSubtitle: "Choose from our wide range of well-maintained, premium vehicles",
    
    // Why Choose Us
    whyChooseUs: "Why Choose CAR2GO",
    
    // Reviews
    customerReviews: "What Our Customers Say",
    
    // Contact Page
    getInTouch: "Get in touch with Car2go team",
    contactSubtitle: "Have questions? Need help with booking? We're here to assist you 24/7.",
    
    // Blogs
    travelStories: "Travel Stories & Destination Guide",
    blogSubtitle: "Discover amazing destinations around Indore, get expert travel advice, and explore the best places to visit with Car2go's self-drive car rentals."
  },
  
  hi: {
    // Navigation  
    home: "होम",
    about: "हमारे बारे में",
    services: "सेवाएं",
    faqs: "सवाल-जवाब", 
    blogs: "ब्लॉग",
    contact: "संपर्क",
    
    // Header
    searchPlaceholder: "कार खोजें...",
    bookNow: "बुक करें",
    
    // Hero Section
    heroTitle: "आपकी सवारी, आपका तरीका",
    heroSubtitle: "कुछ ही क्लिक में आसानी से कार बुक करें - कभी भी, कहीं भी।",
    watchTour: "टूर देखें",
    
    // Common
    learnMore: "और जानें",
    getStarted: "शुरू करें", 
    readMore: "पूरा पढ़ें",
    viewAll: "सभी देखें",
    
    // Footer
    quickLinks: "त्वरित लिंक",
    legal: "कानूनी",
    contactInfo: "संपर्क जानकारी", 
    operatingHours: "सेवा समय",
    available247: "24/7 उपलब्ध",
    customerSupport: "ग्राहक सहायता",
    copyright: "© 2025 कार2गो। सभी अधिकार सुरक्षित।",
    
    // Vehicle Section
    ourVehicles: "हमारे प्रीमियम वाहन",
    vehicleSubtitle: "हमारे अच्छी तरह से रखरखाव किए गए, प्रीमियम वाहनों की विस्तृत श्रृंखला से चुनें",
    
    // Why Choose Us
    whyChooseUs: "कार2गो क्यों चुनें",
    
    // Reviews
    customerReviews: "हमारे ग्राहक क्या कहते हैं",
    
    // Contact Page
    getInTouch: "कार2गो टीम से संपर्क करें",
    contactSubtitle: "कोई प्रश्न हैं? बुकिंग में मदद चाहिए? हम आपकी 24/7 सहायता के लिए यहाँ हैं।",
    
    // Blogs
    travelStories: "यात्रा कहानियां और गंतव्य गाइड",
    blogSubtitle: "इंदौर के आसपास अद्भुत गंतव्यों की खोज करें, विशेषज्ञ यात्रा सलाह प्राप्त करें, और कार2गो के स्व-चालित कार रेंटल के साथ घूमने की बेहतरीन जगहों का पता लगाएं।"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('car2go-language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Save language preference
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('car2go-language', newLanguage);
  };

  // Translation function
  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    isHindi: language === 'hi'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};