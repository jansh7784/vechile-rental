import React from 'react';
import { X, Calendar, User, Tag } from 'lucide-react';
import { Button } from './ui/button';

const BlogModal = ({ blog, isOpen, onClose }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-16 text-white">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                {blog.category}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                {blog.title}
              </h1>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-[calc(90vh-20rem)] overflow-y-auto">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {blog.author}
              </div>
            </div>

            {/* Blog Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-2xl prose-h1:mb-4
                prose-h2:text-xl prose-h2:mb-3 prose-h2:mt-6
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:space-y-2 prose-li:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t bg-gradient-to-r from-blue-50 to-indigo-50 -mx-6 px-6 py-6 rounded-b-2xl">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Ready to Explore {blog.title.split(' ')[0]}?
                </h3>
                <p className="text-gray-600 mb-4">
                  Book a comfortable Car2go vehicle for your journey to this amazing destination!
                </p>
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    const phoneNumber = "917400941274";
                    const message = `Hello, I want to book a car from Car2go to visit ${blog.title.split(' ')[0]}.`;
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                  }}
                >
                  Book Your Car Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;