import React, { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Header from './Header';
import Footer from './Footer';

const EmailJSTest = () => {
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('15jgcBKyziBJf1VXp');
  }, []);

  const testEmailJS = () => {
    console.log('Testing EmailJS...');
    
    const templateParams = {
      title: "Test Email - Car2go Contact Form",
      name: "Test User",
      email: "test@example.com", 
      phone: "+91 90981 03725",
      subject: "Testing EmailJS Integration",
      message: "This is a test message to verify EmailJS is working properly with Car2go contact form.",
      time: new Date().toLocaleString()
    };

    emailjs.send("service_xk40szb", "template_6rwcvb3", templateParams)
      .then(function(response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("✅ Test email sent successfully! Check your Gmail inbox.");
      }, function(error) {
          console.error("FAILED...", error);
          alert("❌ Failed to send test email: " + error.text);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            EmailJS Integration Test
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <div className="text-left">
              <h3 className="text-lg font-semibold mb-2">Test Configuration:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Service ID:</strong> service_xk40szb</li>
                <li><strong>Template ID:</strong> template_6rwcvb3</li>
                <li><strong>Public Key:</strong> 15jgcBKyziBJf1VXp</li>
              </ul>
            </div>
            
            <button
              onClick={testEmailJS}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Send Test Email
            </button>
            
            <div className="text-sm text-gray-500">
              <p>This will send a test email using your EmailJS template.</p>
              <p>Check your Gmail inbox after clicking the button.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmailJSTest;