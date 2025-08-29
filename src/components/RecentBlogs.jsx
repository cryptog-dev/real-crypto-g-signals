// RecentBlogs.jsx
import React from "react";
import { Link } from "react-router-dom";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-6 border border-champagne-200 dark:border-forest-green-700 hover:shadow-gold transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-charcoal dark:text-champagne-100 font-heading">Recent Market Analysis</h3>
    </div>
    <div className="space-y-4">
      {blogs.slice(0, 3).map((blog) => (
        <Link 
          to={`/blog/${blog.id}`} 
          key={blog.id} 
          className="block hover:bg-champagne-50 dark:hover:bg-forest-green-700/50 transition-all duration-200 rounded-luxury"
        >
          <div className="flex items-center space-x-4 p-3 border border-transparent hover:border-champagne-200 dark:hover:border-forest-green-600/30 rounded-luxury">
            {blog.image && (
              <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-luxury shadow-sm">
                <img 
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/1a365d/ffffff?text=No+Image';
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-charcoal dark:text-champagne-50 line-clamp-1 font-heading">{blog.title}</p>
              <p className="text-sm text-charcoal/70 dark:text-champagne-400 line-clamp-1 font-body">
                {blog.content?.substring(0, 60) || 'No content available'}...
              </p>
            </div>
            <span className="text-xs text-charcoal/60 dark:text-champagne-400 whitespace-nowrap font-body">
              {formatDate(blog.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}
      {blogs.length === 0 && (
        <p className="text-sm text-charcoal/60 dark:text-champagne-400 font-body">No recent blogs</p>
      )}
    </div>
  </div>
);

export default RecentBlogs;
