import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, Tag, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import Header from './Header';
import Footer from './Footer';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState(null);

  // Mock blogs data
  const mockBlogs = [
    {
      id: 1,
      title: "Top 10 Road Trip Destinations Near Indore",
      slug: "top-10-road-trip-destinations-near-indore",
      excerpt: "Discover the most beautiful road trip destinations within driving distance from Indore. From spiritual sites to historical wonders, explore Madhya Pradesh like never before.",
      featuredImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85",
      author: "Travel Team",
      category: "Travel Guide",
      tags: ["road trip", "indore", "madhya pradesh", "travel", "destinations"],
      publishedAt: "2025-01-28",
      readTime: "5 min read",
      views: 1250
    },
    {
      id: 2,
      title: "Essential Car Rental Tips for First-Time Renters",
      slug: "essential-car-rental-tips-first-time-renters",
      excerpt: "New to car rentals? Learn essential tips and tricks to make your first car rental experience smooth and hassle-free.",
      featuredImage: "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85",
      author: "Customer Service Team",
      category: "Car Rental Tips",
      tags: ["car rental", "tips", "first time", "guide", "driving"],
      publishedAt: "2025-01-25",
      readTime: "4 min read",
      views: 890
    },
    {
      id: 3,
      title: "Why Self-Drive Car Rentals are Perfect for Family Vacations",
      slug: "self-drive-car-rentals-perfect-family-vacations",
      excerpt: "Discover why self-drive car rentals are the perfect choice for family vacations, offering freedom, comfort, and unforgettable experiences.",
      featuredImage: "https://images.pexels.com/photos/3369191/pexels-photo-3369191.jpeg",
      author: "Family Travel Expert",
      category: "Family Travel",
      tags: ["family vacation", "self drive", "road trip", "family travel", "car rental"],
      publishedAt: "2025-01-22",
      readTime: "6 min read",
      views: 1456
    },
    {
      id: 4,
      title: "Best Time to Visit Madhya Pradesh Tourist Destinations",
      slug: "best-time-visit-madhya-pradesh-tourist-destinations",
      excerpt: "Plan your perfect trip to Madhya Pradesh with our comprehensive guide on the best times to visit popular tourist destinations.",
      featuredImage: "https://images.unsplash.com/photo-1565043666747-69f6646db940?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWx8ZW58MHx8fHwxNzUzODk3NTgzfDA&ixlib=rb-4.1.0&q=85",
      author: "Local Expert",
      category: "Travel Guide",
      tags: ["madhya pradesh", "tourist destinations", "best time", "weather", "travel planning"],
      publishedAt: "2025-01-20",
      readTime: "7 min read",
      views: 2103
    },
    {
      id: 5,
      title: "Complete Guide to Car Insurance for Rental Vehicles",
      slug: "complete-guide-car-insurance-rental-vehicles",
      excerpt: "Understanding car insurance options for rental vehicles. Learn about coverage types, what's included, and how to make informed decisions.",
      featuredImage: "https://images.unsplash.com/photo-1529369623266-f5264b696110?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxjYXIlMjByZW50YWx8ZW58MHx8fHwxNzUzODk3NTgzfDA&ixlib=rb-4.1.0&q=85",
      author: "Insurance Expert",
      category: "Car Rental Tips",
      tags: ["insurance", "car rental", "coverage", "protection", "safety"],
      publishedAt: "2025-01-18",
      readTime: "8 min read",
      views: 756
    },
    {
      id: 6,
      title: "Eco-Friendly Travel: Sustainable Road Trip Tips",
      slug: "eco-friendly-travel-sustainable-road-trip-tips",
      excerpt: "Make your road trips more environmentally friendly with these practical tips for sustainable travel and responsible tourism.",
      featuredImage: "https://images.unsplash.com/photo-1668692753102-a9603d87a1a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxTVVYlMjBjYXJzfGVufDB8fHx8MTc1Mzg5NzU5MHww&ixlib=rb-4.1.0&q=85",
      author: "Sustainability Team",
      category: "Eco Travel",
      tags: ["eco friendly", "sustainable travel", "green tourism", "environment", "responsible travel"],
      publishedAt: "2025-01-15",
      readTime: "5 min read",
      views: 634
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [...new Set(mockBlogs.map(blog => blog.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={() => {}}
        onSearchClick={() => {}}
        user={user}
        onLogout={() => {}}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Travel Stories & Tips
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Discover amazing destinations, get expert travel advice, and learn everything about car rentals from our travel experts.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Category:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                    <div className="flex items-center space-x-4">
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                      <div className="h-3 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {blog.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(blog.publishedAt)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Read More
                      </Button>
                      <span className="text-xs text-gray-500">{blog.views} views</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse all categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Latest Stories
          </h3>
          <p className="text-lg opacity-90 mb-8">
            Get travel tips, destination guides, and car rental advice delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-900 border-0"
            />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogsPage;