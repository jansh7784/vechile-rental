import React, { useState } from 'react';
import { Shield, Users, Award, Clock, Car, Globe, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import Header from './Header';
import Footer from './Footer';

const AboutPage = () => {
  const [user, setUser] = useState(null);

  const stats = [
    { icon: Car, value: '500+', label: 'Vehicles in Fleet', color: 'text-blue-600' },
    { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'text-green-600' },
    { icon: Globe, value: '50+', label: 'Pickup Locations', color: 'text-purple-600' },
    { icon: Clock, value: '24/7', label: 'Customer Support', color: 'text-orange-600' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'All our vehicles undergo regular safety checks and maintenance. We prioritize your safety with comprehensive insurance coverage and 24/7 roadside assistance.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'Award-winning customer service with transparent pricing, no hidden costs, and professional staff committed to exceeding your expectations.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      title: 'Always Available',
      description: 'Round-the-clock booking and customer support. Whether it\'s an emergency or a planned trip, we\'re here to serve you anytime, anywhere.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go the extra mile to ensure every journey with us is comfortable, memorable, and hassle-free.',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: '15+ years in the automotive industry. Passionate about making travel accessible and comfortable for everyone.'
    },
    {
      name: 'Priya Sharma',
      position: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b5?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in fleet management and operations. Ensures every vehicle meets our high standards of quality and safety.'
    },
    {
      name: 'Amit Patel',
      position: 'Customer Experience Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Dedicated to creating exceptional customer experiences. Leads our 24/7 support team with passion and expertise.'
    },
    {
      name: 'Sneha Agarwal',
      position: 'Technology Head',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech innovator driving digital transformation. Develops cutting-edge solutions for seamless booking experiences.'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with 5 vehicles and a vision to revolutionize car rentals in Madhya Pradesh' },
    { year: '2019', title: 'First 100 Customers', description: 'Reached our first milestone of serving 100 happy customers with excellent service' },
    { year: '2020', title: 'Digital Platform Launch', description: 'Launched our online booking platform and mobile app for enhanced customer experience' },
    { year: '2021', title: 'Fleet Expansion', description: 'Expanded our fleet to 100+ vehicles across multiple categories and price ranges' },
    { year: '2022', title: 'Interstate Operations', description: 'Extended services to interstate travel with proper permits and documentation' },
    { year: '2023', title: 'Premium Services', description: 'Introduced luxury vehicle category and premium customer service offerings' },
    { year: '2024', title: '10,000 Customers', description: 'Celebrated serving over 10,000 customers with continued excellence and growth' },
    { year: '2025', title: 'Future Forward', description: 'Expanding to new cities and introducing electric vehicles to our fleet' }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Car2go has been my go-to car rental service for the past 3 years. Exceptional service every time!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Priya Patel',
      location: 'Delhi',
      rating: 5,
      comment: 'Professional staff, well-maintained vehicles, and transparent pricing. Highly recommend for anyone visiting Indore.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5b5?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Amit Kumar',
      location: 'Bangalore',
      rating: 5,
      comment: 'Great experience with their team. The booking process is smooth and customer support is always helpful.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Car2go
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Your trusted partner for comfortable, reliable, and affordable car rental services since 2018.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-4">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-white" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Car2go began in 2018 with a simple vision: to make car rentals accessible, 
                  affordable, and reliable for everyone. What started as a small business with just 5 vehicles 
                  has grown into one of Madhya Pradesh's most trusted car rental services.
                </p>
                <p>
                  Founded by a team of automotive enthusiasts and customer service professionals, we understood 
                  the challenges travelers faced when looking for reliable transportation. High costs, hidden 
                  fees, poor vehicle conditions, and unreliable service were common issues we set out to solve.
                </p>
                <p>
                  Today, with over 500 vehicles in our fleet and 10,000+ satisfied customers, we continue to 
                  uphold our founding principles: transparency, reliability, and exceptional customer service. 
                  Every journey with us is designed to be comfortable, safe, and memorable.
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book Your Journey Today
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85"
                alt="Our journey"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a car rental service. We're your travel partners committed to making every journey exceptional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600">
              From humble beginnings to industry leadership - here's our story of growth and success.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center md:text-left`}>
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex items-center justify-center md:justify-start mb-2">
                        <Badge className="bg-blue-600 text-white">{milestone.year}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind Car2go, dedicated to making your travel dreams a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of satisfied customers who trust Car2go for their travel needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Book Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;