import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from './ui/button';

const TravelBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Mahakaleswar -Ujjain",
      excerpt: "Ujjain is an ancient city beside the Kshipra River in the central Indian state of Madhya Pradesh. An important Hindu pil...",
      image: "https://thecomfortjourney.com/uploads/1745410384060-UJJAIN.jpeg",
      date: "23 Apr 2025",
      slug: "mahakaleswar-ujjain"
    },
    {
      id: 2,
      title: "SANWARIYA SETH",
      excerpt: "Dark lord krishna is also known as Sanwaria Seth, we believe that all their desires are fulfilled when they visit Shri ...",
      image: "https://thecomfortjourney.com/uploads/1745410289184-SANWARIYA%20SETH.jpg",
      date: "23 Apr 2025",
      slug: "sanwariya-seth"
    },
    {
      id: 3,
      title: "Omkareswar",
      excerpt: "Omkareshwar Jyotirlinga is one of the 12 Jyotirlinga temples dedicated to Lord Shiva. Omkareshwar is a sacred Hindu pil...",
      image: "https://thecomfortjourney.com/uploads/1745410511771-omkareswar.jpeg",
      date: "22 Apr 2025",
      slug: "omkareswar"
    },
    {
      id: 4,
      title: "Maheswar",
      excerpt: "Maheshwar is a town, near Khargone city in Khargone district of Madhya Pradesh state, in central India. It is located on...",
      image: "https://thecomfortjourney.com/uploads/1745410580876-maheswar.jpeg",
      date: "22 Apr 2025",
      slug: "maheswar"
    },
    {
      id: 5,
      title: "Jam Gate",
      excerpt: "The Jam Gate is a picnic spot in Maheshwar Tehsil of Khargone District in the state of Madhya Pradesh, India. It is on M...",
      image: "https://thecomfortjourney.com/uploads/1745410694073-jaamgate.webp",
      date: "22 Apr 2025",
      slug: "jam-gate"
    },
    {
      id: 6,
      title: "Bhopal",
      excerpt: "Bhopal is a city in the central Indian state of Madhya Pradesh. It's one of India's greenest cities. There are two main ...",
      image: "https://thecomfortjourney.com/uploads/1745410808424-bhopal.jpeg",
      date: "22 Apr 2025",
      slug: "bhopal"
    },
    {
      id: 7,
      title: "Rajwada – Historicity And More",
      excerpt: "This seven-storeyed historic attraction is the royal residence of Holkar dynasty, built in 1747 AD by the founder of Hol...",
      image: "https://thecomfortjourney.com/uploads/1745307994990-rajwada_cover_1_700x367.webp",
      date: "22 Apr 2025",
      slug: "rajwada-historicity-and-more"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📰 Latest Travel Blogs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore travel guides, tips, destination highlights, and cab booking tips curated by Comfort Journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg";
                  }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {blog.date}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group"
                  onClick={() => window.open(`/blogs/${blog.slug}`, '_blank')}
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => window.location.href = '/blogs'}
          >
            View All Blogs
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TravelBlogs;