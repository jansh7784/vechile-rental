import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Header from './Header';
import Footer from './Footer';
import { faqData } from '../data/mockData';

const FAQsPage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Convert faqData to match the existing structure with categories
  const faqs = faqData.map(faq => {
    let category = 'General';
    if (faq.question.toLowerCase().includes('document') || faq.question.toLowerCase().includes('eligible')) {
      category = 'Documentation';
    } else if (faq.question.toLowerCase().includes('price') || faq.question.toLowerCase().includes('cost')) {
      category = 'Pricing';
    } else if (faq.question.toLowerCase().includes('cancel')) {
      category = 'Cancellation Policy';
    } else if (faq.question.toLowerCase().includes('extend')) {
      category = 'Rental Extensions';
    } else if (faq.question.toLowerCase().includes('travel') || faq.question.toLowerCase().includes('kilomet')) {
      category = 'Travel Policy';
    } else if (faq.question.toLowerCase().includes('booking') || faq.question.toLowerCase().includes('duration')) {
      category = 'Booking';
    } else if (faq.question.toLowerCase().includes('car') || faq.question.toLowerCase().includes('vehicle')) {
      category = 'Vehicles';
    } else if (faq.question.toLowerCase().includes('speed') || faq.question.toLowerCase().includes('pet')) {
      category = 'Policies';
    } else if (faq.question.toLowerCase().includes('pickup') || faq.question.toLowerCase().includes('delivery')) {
      category = 'Delivery Services';
    }

    return {
      ...faq,
      category,
      popular: faq.id <= 6 // First 6 FAQs are popular
    };
  });

  const categories = [...new Set(faqs.map(faq => faq.category))];
  const popularFAQs = faqs.filter(faq => faq.popular);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleWhatsApp = () => {
    const phoneNumber = "917400941274";
    const message = "Hello, I have a question about Car2go services.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCall = () => {
    window.open('tel:+917400941274', '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={() => {}}
        onSearchClick={() => {}}
        user={user}
        onLogout={() => {}}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Find quick answers to common questions about Car2go rental services, policies, and procedures.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg border-2 border-gray-200 focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <section className="py-12 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Most Popular Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularFAQs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                      Popular
                    </Badge>
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {faq.answer.substring(0, 150)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-blue-600 text-white' : ''}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-blue-600 text-white' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow border hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                        {faq.popular && (
                          <Badge variant="secondary" className="bg-yellow-500 text-white text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{faq.category}</p>
                    </div>
                    <div className="ml-4">
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="border-t pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or browse different categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-lg opacity-90 mb-8">
            Can't find what you're looking for? Our customer support team is here to help you 24/7.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Button 
              onClick={handleWhatsApp}
              className="bg-white text-blue-600 hover:bg-gray-100 p-6 h-auto flex items-center space-x-3"
            >
              <img src="https://img.icons8.com/?size=100&id=QkXeKixybttw&format=png&color=000000" alt="WhatsApp" className="h-6 w-6 invert" />
              <div className="text-left">
                <div className="font-semibold">WhatsApp Chat</div>
                <div className="text-sm opacity-80">Get instant answers</div>
              </div>
            </Button>
            <Button 
              onClick={handleCall}
              className="bg-white text-blue-600 hover:bg-gray-100 p-6 h-auto flex items-center space-x-3"
            >
              <Phone className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Call Support</div>
                <div className="text-sm opacity-80">+91 74009 41274</div>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Tips for First-Time Renters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Book in Advance</h4>
              <p className="text-gray-600 text-sm">
                Booking early ensures better vehicle availability and often better rates.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Check Documents</h4>
              <p className="text-gray-600 text-sm">
                Ensure all required documents are valid and ready before pickup.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Inspect Vehicle</h4>
              <p className="text-gray-600 text-sm">
                Check the vehicle condition and report any existing damages before driving.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQsPage;