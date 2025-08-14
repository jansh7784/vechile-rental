import React from 'react';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl opacity-90">
            Your privacy is important to us at Car2go
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Information We Collect</h2>
              <p className="text-gray-700 mb-6">
                We collect various types of information depending on your interactions with our service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">For All Transactions:</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Name</li>
                <li>• Address</li>
                <li>• Phone numbers</li>
                <li>• Email addresses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">When Renting</h3>
              
              <h4 className="text-lg font-medium text-gray-900 mb-2">Driver Qualifications and Identity Verification:</h4>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Driver's license information, including date of birth and photographs</li>
                <li>• Insurance information</li>
                <li>• Passport</li>
                <li>• Proof of residence</li>
                <li>• Personal references</li>
              </ul>

              <h4 className="text-lg font-medium text-gray-900 mb-2">Transaction Information:</h4>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Vehicle rental details (locations, dates, vehicle preference)</li>
                <li>• Airline and flight number</li>
                <li>• Photos of receipts submitted via our app or website</li>
                <li>• Billing and payment information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Claims Information</h3>
              <p className="text-gray-700 mb-6">
                We collect information related to accidents involving our vehicles, including third-party details (e.g., witnesses, police reports).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Information</h3>
              <p className="text-gray-700 mb-6">
                We collect relevant health information that helps us provide adaptive driving devices or process injury-related claims.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Optional Information</h3>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>• Emergency contact information</li>
                <li>• Special preferences or requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">CCTV and Other Cameras</h3>
              <p className="text-gray-700 mb-6">
                Where applicable, we may use CCTV recordings or photographs in public areas of our rental locations.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sensitive Information</h3>
              <p className="text-gray-700 mb-6">
                Car2go collects data considered "sensitive personal information" under certain state laws. This data is only used or disclosed as allowed by law and does not require an opt-out opportunity.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
                <p className="text-blue-800">
                  <strong>Contact Information:</strong><br />
                  For questions about our privacy policy, please contact us at <a href="mailto:info@car2go.com" className="text-blue-600 hover:underline">info@car2go.com</a> or call +91 90981 03725.
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

export default PrivacyPolicy;