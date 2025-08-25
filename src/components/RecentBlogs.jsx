// RecentBlogs.jsx
// Extracted from ProductApp.jsx
import React from "react";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Market Analysis</h3>
    </div>
    <div className="space-y-4">
      {blogs.slice(0, 3).map((blog) => (
        <div key={blog.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {blog.image && <img src={blog.image} alt={blog.title} className="w-16 h-16 object-cover rounded-lg" />}
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{blog.title}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{blog.content.substring(0, 60)}...</p>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">{formatDate(blog.created_at)}</span>
        </div>
      ))}
      {blogs.length === 0 && <p className="text-sm text-gray-600 dark:text-gray-400">No recent blogs</p>}
    </div>
  </div>
);

export default RecentBlogs;
