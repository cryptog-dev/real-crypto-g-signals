import React from "react";
import { Link } from "react-router-dom";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="rounded-xl shadow-lg p-6 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 transition-all duration-300 font-sans">
    <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-6 font-heading tracking-tight">
      Recent Market Analysis
    </h3>
    <div className="space-y-4">
      {blogs.slice(0, 3).map((blog) => (
        <Link
          to={`/blog/${blog.id}`}
          key={blog.id}
          className="block rounded-lg border border-[#F7E7CE]/10 hover:border-[#FFD700]/30 hover:bg-[#F7E7CE]/10 dark:hover:bg-[#1B4332]/10 transition-all duration-300"
        >
          <div className="flex items-center space-x-4 p-4">
            {blog.image && (
              <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border border-[#F7E7CE]/20 shadow-sm">
                <img
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/1B4332/F7FAFC?text=No+Image';
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-[#2D3748] dark:text-[#F7FAFC] line-clamp-1 font-heading">
                {blog.title}
              </p>
              <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 line-clamp-2 leading-relaxed">
                {blog.content?.substring(0, 100) || 'No content available'}...
              </p>
            </div>
            <span className="text-sm text-[#2D3748]/60 dark:text-[#F7FAFC]/60 whitespace-nowrap font-mono">
              {formatDate(blog.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}
      {blogs.length === 0 && (
        <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 text-center py-6">
          No recent blogs available
        </p>
      )}
    </div>
  </div>
);

export default RecentBlogs;