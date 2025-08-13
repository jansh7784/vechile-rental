import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "What is The Comfort Journey?",
      answer: "The Comfort Journey is a self drive car rental service that provides you with all the privacy, fun and convenience of your own car, without the hassles of owning and maintaining one. We drop and pick-up cars from your doorstep, so that you can spend time on the more important thing - your drive! The doorstep drop and pick-up of cars is our standard way of serving you, and is available throughout the areas served by us."
    },
    {
      id: 2,
      question: "Am I eligible to use The Comfort Journey's services?",
      answer: "To avail The Comfort Journey's services, you must be at least 21 years old, and your driving license for 'Light Motor Vehicles' must be at least 1 year old (at the time of starting the trip). Driving license printed on A4 sheet of paper (original or otherwise), driving license on Digilocker or M-Parivaahan app and commercial driving licenses will not be accepted."
    },
    {
      id: 3,
      question: "Which are the areas where I can avail The Comfort Journey's services?",
      answer: "We are currently serving in Indore, Madhya Pradesh, India"
    },
    {
      id: 4,
      question: "Is there a 'Kilometres limit' to how much I can drive?",
      answer: "This depends on the pricing plan that you select. If you go for the \"Unlimited kms\" pricing plans (available only without fuel, and only for bookings whose duration is more than 72 hours), there is absolutely no limit to the kilometres that you can drive, and you have complete flexibility of driving the car as much as you want. The Comfort Journey it up! Other pricing plans have a 'Kilometres limit', which varies based on the plan selected. You can still drive beyond the kilometres limit, but the additional kilometres clocked will attract an additional charge."
    },
    {
      id: 5,
      question: "Are there restrictions on where I can travel?",
      answer: "All of our cars are equipped with an All India Tourist Permit, so you are free to drive anywhere in the country. All India Tourist Permit means that the car is legally permitted to ply in any state in the country, after paying the inter-state taxes at the state borders. However, we do not permit taking The Comfort Journey vehicles to Leh/Ladakh region, Kaza/Nako region and spiti valley. We also advise you to avoid bad terrains (especially in non- SUV cars) and areas affected by civil unrest.Please note: Interstate taxes at the state borders are to be paid and borne by the customer. Our cars are equipped with Fast tag devices for your convenience. The toll charges incurred during your trip will be billed to you in your invoice."
    },
    {
      id: 6,
      question: "Can I book for any duration of time?",
      answer: "For rentals, the minimum booking duration is 8 hours, and the maximum is upto 90 days.If you need a car for longer period of time, please try The Comfort Journey subscriptions, wherein you can subscribe to a car for minimum of 1 month and maximum of 36 months. Check out our subscriptions page for more details."
    },
    {
      id: 7,
      question: "What is Peak Season? Are the prices different during Peak Season?",
      answer: "Peak season refers to festive periods of very high demand. Our hourly rental tariffs are different for weekdays (Mon-Fri), weekends (Sat-Sun) and the Peak Season. The dates and prices for the Peak Season are dynamically decided based on the demand."
    },
    {
      id: 8,
      question: "What kind of cars can I choose from?",
      answer: "We have a curated selection of cars, which includes block-buster models across segments such as SUVs, ultra-luxury cars, hatchbacks and sedans. We are constantly increasing our portfolio; so keep a close watch for your favourite car, just in case we don't have it already."
    },
    {
      id: 9,
      question: "Is The Comfort Journey 24/7?",
      answer: "Yes, we are accessible 24x7."
    },
    {
      id: 10,
      question: "Can I take a pet along with me?",
      answer: "While we love pets, some of our customers might be allergic to them so we can't allow pets in cars."
    },
    {
      id: 11,
      question: "Is there any speed limit?",
      answer: "110 Kms/Hr is the speed limit. Exceeding it will attract a penalty for over-speeding. In some states (e.g., Karnataka, Maharashtra, Delhi-NCR), some cars might be equipped with speed governors, which will automatically restrict the speed to 80Kms/Hr. This is as per government directives."
    },
    {
      id: 12,
      question: "Cancellation",
      answer: "Cancellation made between 24 hrs before booking start time - Flat cancellation fee of 100% of the Lease Rental paid in advance. Refund of the remaining portion of Lease Rental after deduction of Platform Fee. Cancellation made after booking start time - No refund of Lease Rental paid in advance. Notwithstanding anything contrary stated herein, The Comfort Journey reserves the right to withhold any refunds due to cancellations, if The Comfort Journey, at its sole discretion, perceives any credit card frauds by a user or where cancellations are made by a user with an intention to defraud The Comfort Journey. Reschedule before start: No modification is allowed to the schedule booking between 0- 4 hours before booking start time."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="font-semibold text-gray-900">
                  {faq.question}
                </span>
                {openFAQ === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;