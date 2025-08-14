import React from 'react';
import Header from './Header';
import Footer from './Footer';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Use
          </h1>
          <p className="text-xl opacity-90">
            Please read these terms carefully before using Car2go services
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg mb-8">
                Car2go service (or We) provides this Website (Site) or Mobile App for your use, subject to these Terms of Use and all applicable laws and regulations. By accessing and/or using the Site or Mobile App, you fully and unconditionally accept and agree to be bound by these Terms of Use.
              </p>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of the Site or Mobile App</h2>
                  <p className="text-gray-700 mb-4">
                    Car2go maintains the Site or Mobile App for your non-commercial personal use. You may not:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Use it commercially without written consent</li>
                    <li>• Interfere with others' use</li>
                    <li>• Disrupt its operation or servers</li>
                    <li>• Violate intellectual property rights</li>
                    <li>• Frame or co-brand content</li>
                    <li>• Deep-link or use for illegal purposes</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Scrapers and Bots</h2>
                  <p className="text-gray-700">
                    Use of robots, scrapers, or any automated tools to extract content without written permission is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
                  <p className="text-gray-700">
                    We reserve the right to modify or discontinue the Site or Mobile App at any time without notice or liability.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy</h2>
                  <p className="text-gray-700">
                    Any information submitted is governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Links to Other Sites</h2>
                  <p className="text-gray-700">
                    We are not responsible for content or privacy practices of third-party links.
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reservations & Transactions</h2>
                  <p className="text-gray-700">
                    All bookings are subject to our acceptance. We reserve the right to cancel any reservation at our discretion.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Coupons</h2>
                  <p className="text-gray-700">
                    Unauthorized use or duplication of entity-specific discount coupons is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Electronic Communications</h2>
                  <p className="text-gray-700">
                    By using the platform, you consent to receive electronic communications.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                  <p className="text-gray-700">
                    All content is protected by copyright laws. Unauthorized use is strictly prohibited.
                  </p>
                </div>

                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Copyright Infringement</h2>
                  <p className="text-gray-700">
                    To report violations, email <strong>info@car2go.com</strong> with necessary details and a signed statement.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Submitted Information</h2>
                  <p className="text-gray-700">
                    You agree that any comments or suggestions may be used by us without compensation.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">No Warranty</h2>
                  <p className="text-gray-700">
                    The Site is provided "as is" without warranties. We do not guarantee it will always be error-free.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700">
                    We are not liable for any damages arising from your use of the Site or Mobile App.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnity</h2>
                  <p className="text-gray-700">
                    You agree to hold us harmless from any claims arising from your use or violation of these Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">General</h2>
                  <p className="text-gray-700">
                    If any part of these Terms is found unenforceable, the remaining parts remain in full effect.
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h2>
                <p className="text-purple-800">
                  For questions, email us at <a href="mailto:info@car2go.com" className="text-purple-600 hover:underline font-semibold">info@car2go.com</a> or call +91 90981 03725.
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

export default TermsOfUse;