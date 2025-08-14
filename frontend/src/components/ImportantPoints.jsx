import React from 'react';
import { FileText, Heart, DollarSign, Clock } from 'lucide-react';

const ImportantPoints = () => {
  const points = [
    {
      icon: FileText,
      title: "Document Required",
      subtitle: "Document Required", 
      description: "Original Driving License & Aadhar Card"
    },
    {
      icon: Heart,
      title: "Minimum Age",
      subtitle: "Minimum Age",
      description: "21 years"
    },
    {
      icon: DollarSign,
      title: "Security Deposit",
      subtitle: "Security Deposit", 
      description: "Bike"
    },
    {
      icon: Clock,
      title: "Minimum Booking Hours",
      subtitle: "Minimum Booking Hours",
      description: "12 Hours"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Important Points to Book a Car
            <br />
            <span className="text-blue-600">with Car2go</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <h4 className="text-sm font-medium text-gray-600 mb-3">
                  {point.subtitle}
                </h4>
                <p className="text-gray-700">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImportantPoints;