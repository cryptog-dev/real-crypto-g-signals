import React from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const RecentBlogs = ({ blogs, formatDate }) => (
  <div className="lego-card rounded-xl p-6 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] relative overflow-hidden transition-all duration-300">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[var(--color-accent1)]/10 rounded-lg border border-[var(--color-border-light)]">
          <FileText className="h-5 w-5 text-[var(--color-accent1)]" />
        </div>
        <h3 className="text-xl font-semibold text-contrast-high font-[Outfit]">
          Latest Market Insights
        </h3>
      </div>
    </div>

    {/* Blog List */}
    <div className="space-y-3">
      {blogs.slice(0, 3).map((blog) => (
        <Link
          to={`/blog/${blog.id}`}
          key={blog.id}
          className="block lego-card rounded-lg border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4 p-4">
            {blog.image && (
              <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg border border-[var(--color-border-light)]">
                <img
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x400/4A4B68/F8F6F2?text=No+Image";
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-contrast-high group-hover:text-[var(--color-accent1)] transition-colors line-clamp-1 text-sm font-sans">
                {blog.title || "Untitled Analysis"}
              </p>
              <p className="text-xs text-contrast-medium line-clamp-1 mt-1 font-sans">
                {blog.content?.substring(0, 50) || "No content available"}...
              </p>
            </div>
            <span className="text-xs text-contrast-medium whitespace-nowrap text-right font-sans">
              {formatDate(blog.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}

      {blogs.length === 0 && (
        <div className="text-center py-6">
          <FileText className="h-8 w-8 text-contrast-medium/30 mx-auto mb-2" />
          <p className="text-sm text-contrast-medium font-sans">No Market Insights Yet</p>
          <p className="text-xs text-contrast-medium/70 mt-1 font-sans">New analysis will appear here soon</p>
        </div>
      )}
    </div>

    {/* Decorative elements */}
    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
    <div className="absolute top-2 right-2 w-4 h-4 bg-[var(--color-accent1)]/20 rounded-full border border-[var(--color-border-light)]"></div>
  </div>
);

export default RecentBlogs;