import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Header from './Header';
import Footer from './Footer';

const FAQsPage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What documents do I need to rent a car?",
      answer: "You need a valid driving license, government-issued ID proof (Aadhar/Passport), address proof, and a payment method. All documents should be original and valid. For international travelers, an International Driving Permit is required along with a passport.",
      category: "Documentation",
      popular: true
    },
    {
      id: 2,
      question: "What is the minimum age requirement for car rental?",
      answer: "The minimum age requirement is 21 years for most vehicles. For luxury and premium cars, the minimum age may be 25 years. You should also have a valid driving license for at least 1 year. Additional verification may be required for younger drivers.",
      category: "Age Requirements"
    },
    {
      id: 3,
      question: "How is the rental pricing calculated?",
      answer: "Rental pricing is based on the duration (hourly/daily), vehicle category, and distance covered. Additional charges may apply for extra kilometers beyond the included limit, fuel, tolls, and parking. We offer transparent pricing with no hidden costs.",
      category: "Pricing",
      popular: true
    },
    {
      id: 4,
      question: "Is fuel included in the rental price?",
      answer: "No, fuel is not included in the rental price. You will receive the vehicle with a certain fuel level and are expected to return it with the same level. Alternatively, you can opt for our fuel service at market rates. We also provide fuel cards for long-distance trips.",
      category: "Fuel Policy"
    },
    {
      id: 5,
      question: "Can I extend my rental period?",
      answer: "Yes, you can extend your rental period subject to vehicle availability. Please contact us at least 2 hours before your scheduled return time. Extension charges will apply as per our standard rates. Online extension is available through our app.",
      category: "Rental Extensions"
    },
    {
      id: 6,
      question: "What happens in case of an accident or breakdown?",
      answer: "In case of an accident, immediately contact the police and our 24/7 helpline. For breakdowns, call our roadside assistance. We provide 24/7 support to ensure your safety and minimize inconvenience. Emergency replacement vehicles are available when possible.",
      category: "Emergency Support",
      popular: true
    },
    {
      id: 7,
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking. Cancellation charges may apply based on the time of cancellation. Free cancellation is available if you cancel at least 24 hours before pickup time. Refunds are processed within 5-7 business days.",
      category: "Cancellation Policy"
    },
    {
      id: 8,
      question: "Do you provide delivery and pickup services?",
      answer: "Yes, we offer doorstep delivery and pickup services within the city limits. Additional charges may apply based on the location. Airport and railway station pickups are also available. We also offer valet parking services for return.",
      category: "Delivery Services"
    },
    {
      id: 9,
      question: "What insurance coverage is provided?",
      answer: "Basic insurance coverage is included in all rentals. This covers third-party liability and basic damage protection. Additional comprehensive insurance is available for complete peace of mind. Personal accident coverage can also be added.",
      category: "Insurance"
    },
    {
      id: 10,
      question: "Can I add an additional driver?",
      answer: "Yes, you can add additional drivers to your rental. The additional driver must meet the same age and documentation requirements as the primary driver. Additional charges may apply per extra driver. All drivers must be present during vehicle pickup.",
      category: "Additional Drivers"
    },
    {
      id: 11,
      question: "What payment methods do you accept?",
      answer: "We accept cash, credit/debit cards, UPI payments, and digital wallets. Online bookings can be paid via net banking, cards, or UPI. For corporate bookings, we also accept cheques and bank transfers. EMI options are available for long-term rentals.",
      category: "Payment Methods"
    },
    {
      id: 12,
      question: "Are there any mileage restrictions?",
      answer: "Our rental packages include a specific kilometer limit per day (usually 250-300 km). Extra kilometers are charged as per our tariff. For unlimited mileage, special packages are available. Highway tolls and parking charges are additional.",
      category: "Mileage Policy"
    },
    {
      id: 13,
      question: "Can I travel to other states?",
      answer: "Yes, interstate travel is allowed with proper documentation and prior notification. Additional permits may be required for certain states. Extra charges may apply for interstate travel. We provide all necessary documents for smooth travel.",
      category: "Interstate Travel"
    },
    {
      id: 14,
      question: "What if I return the car late?",
      answer: "Late returns are subject to additional charges calculated on an hourly basis. If you're running late, please inform us immediately. Grace period of 1 hour is provided for traffic or unforeseen delays. Repeated late returns may affect future bookings.",
      category: "Late Returns"
    },
    {
      id: 15,
      question: "Do you offer long-term rental discounts?",
      answer: "Yes, we offer attractive discounts for rentals of 7 days or more. Monthly packages are available with significant savings. Corporate rates are offered for bulk bookings. Contact our sales team for customized long-term packages.",
      category: "Discounts"
    }
  ];

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
            Find quick answers to common questions about our car rental services, policies, and procedures.
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
                    {faq.answer}
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
            <Button className="bg-white text-blue-600 hover:bg-gray-100 p-6 h-auto flex items-center space-x-3">
              <MessageCircle className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Live Chat</div>
                <div className="text-sm opacity-80">Get instant answers</div>
              </div>
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 p-6 h-auto flex items-center space-x-3">
              <Phone className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Call Support</div>
                <div className="text-sm opacity-80">+91 98765 43210</div>
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