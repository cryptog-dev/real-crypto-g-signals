// RecentBlogs.jsx
import React from "react";
import { Link } from "react-router-dom";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Market Analysis</h3>
    </div>
    <div className="space-y-4">
      {blogs.slice(0, 3).map((blog) => (
        <Link 
          to={`/blog/${blog.id}`} 
          key={blog.id} 
          className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg"
        >
          <div className="flex items-center space-x-4 p-3">
            {blog.image && (
              <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
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
              <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{blog.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {blog.content?.substring(0, 60) || 'No content available'}...
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {formatDate(blog.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}
      {blogs.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">No recent blogs</p>
      )}
    </div>
  </div>
);

export default RecentBlogs;
