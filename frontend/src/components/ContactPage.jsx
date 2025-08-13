import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "919098103725";
    const message = `Hello, I'm ${formData.name}. ${formData.message}. You can reach me at ${formData.email} or ${formData.phone}.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleWhatsApp = () => {
    const phoneNumber = "919098103725";
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, '_blank');
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleInstagram = () => {
    window.open('https://www.instagram.com/car2go_mp09?igsh=aTM3cXpyYjZ3azg3', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Get in touch with The Comfort Journey team
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're here to help you with all your car rental needs. Reach out to us through any of the following methods.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Numbers</h3>
                    <button 
                      onClick={() => handleCall('+919098103725')}
                      className="block text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-1"
                    >
                      +91 90981 03725 (Primary)
                    </button>
                    <button 
                      onClick={() => handleCall('+917225960702')}
                      className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      +91 7225960702 (Backup)
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                    <button 
                      onClick={handleWhatsApp}
                      className="text-green-600 hover:text-green-800 transition-colors duration-200"
                    >
                      +91 90981 03725
                    </button>
                    <p className="text-sm text-gray-600 mt-1">Quick responses available</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instagram</h3>
                    <button 
                      onClick={handleInstagram}
                      className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
                    >
                      @car2go_mp09
                    </button>
                    <p className="text-sm text-gray-600 mt-1">Follow us for updates</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600">
                      Indore, Madhya Pradesh<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Operating Hours</h3>
                    <p className="text-gray-600">
                      24/7 Available<br />
                      <span className="text-sm">Customer support always ready</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your car rental needs..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message via WhatsApp
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Your message will be sent directly to our WhatsApp for faster response
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Need Immediate Assistance?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={handleWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Now
            </Button>
            <Button
              onClick={() => handleCall('+919098103725')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;