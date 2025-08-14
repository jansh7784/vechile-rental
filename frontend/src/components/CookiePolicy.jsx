import React from 'react';
import Header from './Header';
import Footer from './Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cookie Policy
          </h1>
          <p className="text-xl opacity-90">
            How Car2go uses cookies to enhance your experience
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg mb-6">
                The cookies we use allow our website to remember your preferences, improve the user experience, and tailor the advertisements you see to those that are most relevant to you. These cookies refresh upon each website visit or when navigating to another site that recognizes the cookie based on the categories described below.
              </p>

              <p className="text-gray-700 mb-8">
                We also use other forms of technology which serve a similar purpose to cookies, such as pixel tags, and which allow us to monitor and improve our sites and mobile apps. When we talk about cookies in this Policy, this term includes these similar technologies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Do We Use Cookies?</h2>

              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Strictly Necessary Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are essential for enabling you to navigate the website or mobile app and use its features, such as accessing secure areas or making a reservation. They are typically only set in response to actions you take like setting privacy preferences, logging in, or filling out forms. Blocking these cookies may prevent some parts of the site from functioning. These cookies do not store personally identifiable information and usually expire within one year from your last visit.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
                  <p className="text-gray-700">
                    These cookies help us measure site usage and improve performance and user experience. They may remember your choices (e.g., login, language, or region preferences). Some may expire seven days after your last visit, while others remain until manually deleted.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Advertising Cookies</h3>
                  <p className="text-gray-700">
                    These cookies help deliver relevant ads and prevent you from seeing the same ads repeatedly. Third-party ad providers use them to measure ad campaign effectiveness. Some may expire after 30 days, while others remain until deleted by you.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
                <p className="text-blue-800">
                  For more information on how we process your personal data and to exercise your rights, please refer to our <a href="/privacy-policy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-6">
                <p className="text-green-800">
                  <strong>Contact Information:</strong><br />
                  For questions about our cookie policy, please contact us at <a href="mailto:info@car2go.com" className="text-green-600 hover:underline">info@car2go.com</a> or call +91 90981 03725.
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

export default CookiePolicy;