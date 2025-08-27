import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Loader2, Share2, Bookmark, MessageSquare, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { blogsAPI } from '../utils/api';

// Helper function to generate table of contents from HTML content
const generateTOC = (html) => {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = Array.from(doc.querySelectorAll('h2, h3'));
  return headings.map((heading, index) => ({
    id: `heading-${index}`,
    text: heading.textContent,
    level: parseInt(heading.tagName.substring(1)),
  }));
};

// Format date to a more readable format
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Calculate reading time
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text?.split(/\s+/).length || 0;
  return Math.ceil(wordCount / wordsPerMinute);
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTOC, setShowTOC] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef(null);
  
  // Generate TOC and reading time will be calculated after blog is loaded

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // First try with authentication
        try {
          const response = await blogsAPI.getById(id);
          setBlog(response.data);
          return;
        } catch {
          // Auth not required or failed, will try public endpoint
          console.log('Trying public endpoint...');
        }
        
        // If auth fails, try public endpoint
        const publicResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/public/${id}`);
        setBlog(publicResponse.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        if (err.response?.status === 404) {
          // Handle not found case
          setBlog(null);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
      </motion.div>
    );
  }

  if (!blog) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          Back to Home
        </motion.button>
      </motion.div>
    );
  }

  // Get TOC and reading time from blog content
  const toc = blog ? generateTOC(blog.content) : [];
  const readingTime = blog ? calculateReadingTime(blog.content) : 0;

  const handleShare = async () => {
    const url = window.location.href;
    const title = blog.title;
    const text = blog.content?.substring(0, 200) + '...';

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `${title}\n\n${text}\n\n${url}`;
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      {blog.image && (
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <img
            src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ x: -4 }}
                className="mb-6 flex items-center text-white hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </motion.button>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {formatDate(blog.created_at)}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {readingTime} min read
                </span>
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Bookmark 
                    className={`w-4 h-4 mr-1.5 ${isBookmarked ? 'fill-current' : ''}`} 
                  />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          {toc.length > 0 && (
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <button 
                  onClick={() => setShowTOC(!showTOC)}
                  className="lg:hidden flex items-center text-gray-700 dark:text-gray-300 mb-4 font-medium"
                >
                  {showTOC ? 'Hide' : 'Show'} Table of Contents
                </button>
                <div className={`${showTOC ? 'block' : 'hidden lg:block'}`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm ${
                          item.level === 2 
                            ? 'text-gray-700 dark:text-gray-300 pl-2' 
                            : 'text-gray-500 dark:text-gray-400 pl-4'
                        } hover:text-green-600 dark:hover:text-green-400 transition-colors`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6 md:p-10">
                <div 
                  ref={contentRef}
                  className="prose prose-lg dark:prose-invert max-w-none"
                >
                  <div 
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: blog.content?.replace(/\n/g, '<br />') || 'No content available.' 
                    }} 
                  />
                </div>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      TAGS
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    SHARE THIS POST
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter size={18} />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={18} />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 text-blue-700 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin size={18} />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isCopied 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      } transition-colors`}
                      aria-label={isCopied ? 'Link copied!' : 'Copy link'}
                    >
                      {isCopied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                      <img 
                        src="/logo.png" 
                        alt="therealcryptog"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        TheRealCryptoG
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Crypto Market Analyst
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
