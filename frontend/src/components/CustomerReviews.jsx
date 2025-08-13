import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Alok mishra",
      rating: 5.0,
      comment: "Car was new and clean.",
      date: "7/1/2025"
    },
    {
      id: 2,
      name: "Somil jain", 
      rating: 5.0,
      comment: "Ride was good ..go for it",
      date: "7/1/2025"
    },
    {
      id: 3,
      name: "Adarsh Thakur",
      rating: 5.0,
      comment: "Best.. and bestest self drive company..",
      date: "7/1/2025"
    },
    {
      id: 4,
      name: "Priyanshu Pathak",
      rating: 5.0,
      comment: "My experience is best with comfort journey, Service is good",
      date: "7/1/2025"
    },
    {
      id: 5,
      name: "Vivek Nanda",
      rating: 5.0,
      comment: "Nice journey with comfort journey Well mentain car",
      date: "7/1/2025"
    },
    {
      id: 6,
      name: "AKHILESH BIRLA",
      rating: 5.0,
      comment: "Best car rental in indore",
      date: "7/1/2025"
    },
    {
      id: 7,
      name: "Mohit Sharma",
      rating: 5.0,
      comment: "Long drives are always best .very convenient and satisfied 😊",
      date: "7/1/2025"
    },
    {
      id: 8,
      name: "Ramlal Nigwale",
      rating: 5.0,
      comment: "Very good service",
      date: "7/1/2025"
    },
    {
      id: 9,
      name: "deepak taneja",
      rating: 5.0,
      comment: "They give good service and cheap price so I really appreciate you, Sepicialy thank you Abhishek for the your support.",
      date: "7/1/2025"
    },
    {
      id: 10,
      name: "Rajkumar patidar",
      rating: 5.0,
      comment: "Best car 🚗 ever Nice man Rented car very low budget",
      date: "7/1/2025"
    },
    {
      id: 11,
      name: "Sudeep raj",
      rating: 5.0,
      comment: "Well condition cars, best service, owner is friendly nd well mannered..",
      date: "7/1/2025"
    },
    {
      id: 12,
      name: "pawan gurjar",
      rating: 5.0,
      comment: "I tried this service many times, manager is well behaviour and loyal. I will refer you to try this service ones I'm So happy with comfort journey 🥳",
      date: "7/1/2025"
    },
    {
      id: 13,
      name: "GGN says",
      rating: 5.0,
      comment: "Got the swift dzire for a day and the car was new in a very good condition and the owner was very supportive and calm in nature",
      date: "7/1/2025"
    },
    {
      id: 14,
      name: "Kunal Susare",
      rating: 5.0,
      comment: "Awesome car service neat and clean cars available",
      date: "7/1/2025"
    },
    {
      id: 15,
      name: "Suresh Mali",
      rating: 5.0,
      comment: "Wonderfull car collection in indore for rental cars💯 well maintained cars💯",
      date: "7/1/2025"
    },
    {
      id: 16,
      name: "Tanmay Patidar",
      rating: 5.0,
      comment: "Best Cars available at affordable rate!Must recommended.",
      date: "7/1/2025"
    },
    {
      id: 17,
      name: "Vijay prajapat",
      rating: 5.0,
      comment: "Very nice car service they provide neet and clean cars and new cars and behavior is awesome I suggest to take cars and enjoy your rides",
      date: "7/1/2025"
    },
    {
      id: 18,
      name: "shubham singh pawar",
      rating: 5.0,
      comment: "Best cars available at affordable rate and staff is also corperative.Must recommended!",
      date: "7/1/2025"
    },
    {
      id: 19,
      name: "janish pawar",
      rating: 5.0,
      comment: "Nice service and all cars are well maintained",
      date: "7/1/2025"
    },
    {
      id: 20,
      name: "Dr Ritik sharma",
      rating: 5.0,
      comment: "Cars are neat and clean, Enjoy your ride with Comfort journey self driven cars. Choice Different types of cars models are available in Comfort journey self drive service...",
      date: "7/1/2025"
    },
    {
      id: 21,
      name: "sakhi",
      rating: 5.0,
      comment: "CAR REVIEWS I recently rented [XUV 700] and had an excellent experience! The car was in great condition—clean, well-maintained, and a pleasure to drive. It performed smoothly throughout my trip, with no issues at all. The [Dual 10.25-inch Screens,Voice Commands, fuel efficiency,Panoramic Sunroof,ADAS (Advanced Driver Assistance Systems), 5-Star Global NCAP Rating] were particularly impressive and made the journey even more enjoyable. I would highly recommend this car to anyone looking for a reliable rental",
      date: "7/1/2025"
    },
    {
      id: 22,
      name: "prkash",
      rating: 5.0,
      comment: "Very friendly behavior of owner Car is also in very good condition",
      date: "7/1/2025"
    },
    {
      id: 23,
      name: "Deepak",
      rating: 5.0,
      comment: "the comfort journey its service is awesome and provide neat cars at low price",
      date: "7/1/2025"
    }
  ];

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Real experiences from people who have traveled with us.
          </p>
          <Button variant="outline" className="mb-8">
            Write a Review
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-96 overflow-y-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-bold text-gray-900">{review.rating}</span>
              </div>
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-4">
                {review.comment}
              </p>
              
              <p className="text-xs text-gray-500">
                {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* Duplicate reviews for continuous scroll effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {reviews.slice(0, 8).map((review) => (
            <div key={`duplicate-${review.id}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="text-lg font-bold text-gray-900">{review.rating}</span>
              </div>
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-4">
                {review.comment}
              </p>
              
              <p className="text-xs text-gray-500">
                {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;