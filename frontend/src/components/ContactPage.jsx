import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "123 Business Street",
        "Indore, Madhya Pradesh",
        "PIN: 452001, India"
      ],
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+91 98765 43210",
        "+91 87654 32109",
        "Toll-free: 1800-123-4567"
      ],
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@thecomfortjourney.com",
        "support@thecomfortjourney.com",
        "bookings@thecomfortjourney.com"
      ],
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Sunday: 24/7",
        "Customer Support: Always Available",
        "Office Hours: 9:00 AM - 9:00 PM"
      ],
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "WhatsApp Support",
      description: "Get instant help via WhatsApp",
      icon: MessageCircle,
      action: "Chat Now",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Call Support",
      description: "Speak directly with our team",
      icon: Phone,
      action: "Call Now",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Emergency Helpline",
      description: "24/7 roadside assistance",
      icon: Phone,
      action: "Emergency",
      color: "bg-red-500 hover:bg-red-600"
    }
  ];

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
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            We're here to help you with any questions, bookings, or support you need. Reach out to us anytime!
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div key={index} className="text-center">
                <Button
                  className={`w-full p-6 h-auto flex flex-col items-center space-y-3 ${action.color} text-white`}
                >
                  <action.icon className="h-8 w-8" />
                  <div>
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                  <span className="text-sm bg-white bg-opacity-20 px-4 py-1 rounded-full">
                    {action.action}
                  </span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-100 ${info.color}`}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">
                      123 Business Street, Indore, MP
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <Button variant="outline" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Quick Answers
                </h3>
                <p className="text-gray-600 mb-4">
                  Looking for immediate answers? Check our FAQ section for common questions about car rentals, pricing, and policies.
                </p>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Visit FAQ Section
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            We're Always Here for You
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">
                Emergency roadside assistance and customer support available round the clock.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Instant Response</h4>
              <p className="text-gray-600 text-sm">
                Our team responds to all queries within 2 hours during business hours.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Multiple Channels</h4>
              <p className="text-gray-600 text-sm">
                Reach us via phone, email, WhatsApp, or visit our office in person.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;