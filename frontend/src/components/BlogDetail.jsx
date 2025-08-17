import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import Header from './Header';
import Footer from './Footer';
import { blogs } from '../data/mockData';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Find blog by slug
    const foundBlog = blogs.find(b => b.slug === slug);
    setBlog(foundBlog);
    setLoading(false);
  }, [slug]);

  const handleBookNow = () => {
    const phoneNumber = "917400941274";
    const message = `Hello, I'm interested in visiting ${blog?.title} and want to book a car from Car2go.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const goBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={goBack}
          variant="outline"
          className="mb-6 border-gray-300 text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>

        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary" className="bg-blue-600 text-white">
              {blog.category}
            </Badge>
            <span className="text-gray-500">•</span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              5 min read
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <span>{blog.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{blog.date}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={handleLike}
                variant="outline"
                size="sm"
                className={`${liked ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200'}`}
              >
                <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                {liked ? 'Liked' : 'Like'}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="border-gray-200"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {blog.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg";
            }}
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div 
            className="blog-content text-gray-700 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              lineHeight: '1.8',
              fontSize: '1.125rem'
            }}
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm border-gray-200 text-gray-600 hover:bg-gray-100">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Visit {blog.title}?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Book a comfortable self-drive car with Car2go and explore this amazing destination at your own pace. Enjoy the freedom of travel with our premium vehicle fleet.
            </p>
            <Button 
              onClick={handleBookNow}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              Book Your Car Now
            </Button>
          </CardContent>
        </Card>
      </article>

      {/* Related Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            More Travel Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs
              .filter(b => b.id !== blog.id)
              .slice(0, 3)
              .map((relatedBlog) => (
                <Card key={relatedBlog.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = `/blogs/${relatedBlog.slug}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-blue-600 text-white">
                        {relatedBlog.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedBlog.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {relatedBlog.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;