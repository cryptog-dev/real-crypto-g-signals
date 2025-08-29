// RecentBlogs.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Newspaper } from "lucide-react";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
        Recent Market Analysis
      </h3>
      <Newspaper className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>

    {/* Blogs list */}
    <div className="space-y-4">
      {blogs.slice(0, 3).map((blog) => (
        <Link
          to={`/blog/${blog.id}`}
          key={blog.id}
          className="block group"
        >
          <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200/50 dark:border-gray-600/50 bg-gray-50 dark:bg-gray-700/50 hover:shadow-md hover:-translate-y-1 transition-all">
            {/* Image */}
            {blog.image && (
              <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg shadow-sm group-hover:scale-105 transform transition-transform duration-300">
                <img
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/400x400/1a365d/ffffff?text=No+Image";
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {blog.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {blog.content?.substring(0, 80) || "No content available"}...
              </p>
            </div>

            {/* Date */}
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 whitespace-nowrap">
              {formatDate(blog.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}

      {/* Empty state */}
      {blogs.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
          No recent blogs
        </p>
      )}
    </div>
  </div>
);

export default RecentBlogs;