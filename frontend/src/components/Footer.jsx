import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const handleWhatsApp = () => {
    const phoneNumber = "917400941274";
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/logo-1.jpg" 
                alt="Car2go" 
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%232563eb'/%3E%3Ctext x='20' y='25' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3EC2G%3C/text%3E%3C/svg%3E";
                }}
              />
              <h3 className="text-xl font-bold">Car2go</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for self-drive car rentals in Indore. Experience comfort, reliability, and freedom with our premium fleet of vehicles.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={handleWhatsApp}
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-200"
                title="WhatsApp"
              >
                <img src="https://img.icons8.com/?size=100&id=BkugfgmBwtEI&format=png&color=000000" alt="WhatsApp" className="h-5 w-5 invert" />
              </button>
              <button 
                onClick={handleInstagram}
                className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors duration-200"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">{t('home')}</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">{t('about')}</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-white transition-colors duration-200">{t('services')}</a></li>
              <li><a href="/blogs" className="text-gray-300 hover:text-white transition-colors duration-200">{t('blogs')}</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">{t('contact')}</a></li>
              <li><a href="/faqs" className="text-gray-300 hover:text-white transition-colors duration-200">{t('faqs')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">Terms of Use</a></li>
              <li><a href="/policies" className="text-gray-300 hover:text-white transition-colors duration-200">Cancellation & Refund</a></li>
            </ul>
          </div>

          {/* Contact Info - Updated phone numbers */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('contactInfo')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <div>
                  <button 
                    onClick={() => handleCall('+917400941274')}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    +91 74009 41274
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@car2go.com</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Indore, Madhya Pradesh<br />
                  India
                </span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-sm mb-2">Operating Hours</h5>
              <p className="text-xs text-gray-300">24/7 Available</p>
              <p className="text-xs text-gray-300">Customer Support</p>
            </div>
          </div>
        </div>

       {/* Bottom Bar */}
<div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
  <div className="text-sm text-gray-400 mb-4 md:mb-0">
    © 2025 Car2go. All rights reserved. | Made by Ansh 
    <a 
      href="https://wa.me/917425980850" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="ml-2 text-green-500 hover:text-green-400 transition-colors duration-200"
    >
      WhatsApp
    </a>
  </div>
  <div className="flex space-x-6 text-sm">
    <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
    <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
    <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-200">Sitemap</a>
  </div>
</div>
</div>
</footer>
);
};
export default Footer;
