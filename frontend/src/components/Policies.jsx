import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Policies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xl opacity-90">
            Understanding Car2go's payment and cancellation terms
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Refunds, Charges and Payments</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700">
                  All refunds shall be initiated to the original payment account/mode. All refund initiation shall be processed immediately after the cancellation request is received. However, all such refunds may take 5-15 days to reflect in the Guest's accounts.
                </p>

                <p className="text-gray-700">
                  Payments owed by Guests under this Fee Policy or other applicable policies will be deducted from the security deposit, if any deposited with Car2go. If the security deposit does not cover such payments, the balance must be paid by the Guest electronically within 24 hours of the booking end time, as per Car2go's payment instructions.
                </p>

                <p className="text-gray-700">
                  The Guest shall ensure that the account from which the amounts are to be collected have sufficient funds or credit available to cover any charges and/or amount payable to Car2go. Guests are solely responsible for any associated bank or credit card charges or fees. Guests may be charged a processing fee for a declined credit or debit card payment.
                </p>

                <p className="text-gray-700">
                  In the event the Guest defaults on any payments, Car2go is entitled to charge reminder fees and default interest in accordance with the provisions of the law. In addition, Car2go may designate third parties to collect amounts owed to Car2go by a Guest.
                </p>

                <p className="text-gray-700">
                  Car2go reserves the right to prohibit a Guest from making a subsequent booking on the Platform until all outstanding fees in the Guest's account have been paid in full. In the event a fee is incurred, the Guest will receive an email invoice from Car2go that will have detailed payment instructions.
                </p>

                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <p className="text-red-800 font-semibold">
                    <strong>Note:</strong> The Guest should not make any direct payments to the Host or to any Car2go executive in any mode.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation Policy</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold min-w-fit">
                      0-6 hrs before
                    </div>
                    <p className="text-gray-700">
                      <strong>100% of the Lease Rental</strong> paid in advance shall be deducted.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold min-w-fit">
                      6-24 hrs before
                    </div>
                    <p className="text-gray-700">
                      Flat cancellation fee of <strong>50% of the Lease Rental</strong> paid in advance. Refund of the remaining portion of Lease Rental after deduction of Platform Fee.
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold min-w-fit">
                      After start time
                    </div>
                    <p className="text-gray-700">
                      <strong>No refund</strong> of Lease Rental paid in advance.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-6">
                  <p className="text-yellow-800">
                    Notwithstanding anything contrary stated herein, Car2go reserves the right to withhold any refunds due to cancellations, if Car2go, at its sole discretion, perceives any credit card frauds by a user or where cancellations are made by a user with an intention to defraud Car2go.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Early Returns Policy</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-blue-800">
                    Early returns will be accommodated but the reservation cannot be prorated and no credit for unused time will be given.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h2>
                <p className="text-red-800">
                  For questions about our policies, please contact us at <a href="mailto:info@car2go.com" className="text-red-600 hover:underline font-semibold">info@car2go.com</a> or call +91 90981 03725.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Policies;