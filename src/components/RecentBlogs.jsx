import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="bg-[var(--color-card-bg)] rounded-xl p-6 border-4 border-[var(--color-accent1)]/20 relative overflow-hidden shadow-md">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[var(--color-accent1)]/10 rounded-lg border-2 border-[var(--color-accent1)]/20">
          <FileText className="h-5 w-5 text-[var(--color-accent1)]" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] font-heading">Recent Market Analysis</h3>
      </div>
    </div>

    {/* Blog List */}
    <div className="space-y-3">
      {blogs.slice(0, 3).map((blog) => (
        <Link 
          to={`/blog/${blog.id}`} 
          key={blog.id} 
          className="block lego-button group rounded-lg border-b-4 border-[var(--color-neutral-dark)]/10 hover:border-b-2 hover:mt-0.5 transition-all duration-200 bg-[var(--color-card-bg)] shadow-sm"
        >
          <div className="flex items-center space-x-4 p-4">
            {blog.image && (
              <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg border-2 border-[var(--color-neutral-dark)]/10">
                <img 
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x400/4A4B68/F8F6F2?text=No+Image';
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent1)] transition-colors line-clamp-1 text-sm font-sans">
                {blog.title}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1 mt-1 font-sans">
                {blog.content?.substring(0, 50) || 'No content available'}...
              </p>
            </div>
            <span className="text-xs text-[var(--color-text-secondary)] whitespace-nowrap text-right font-sans">
              {formatDate(blog.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}
      
      {blogs.length === 0 && (
        <div className="text-center py-6">
          <FileText className="h-8 w-8 text-[var(--color-text-secondary)]/30 mx-auto mb-2" />
          <p className="text-sm text-[var(--color-text-secondary)] font-sans">No market analysis available</p>
          <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1 font-sans">Check back later for updates</p>
        </div>
      )}
    </div>

    {/* Decorative elements */}
    <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
    <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-accent1)]/20 rounded-full border border-[var(--color-accent1)]/30"></div>
  </div>
);

export default RecentBlogs;