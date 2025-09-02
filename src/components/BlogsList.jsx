import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit3, Trash2, Calendar, User, ArrowRight, FileText } from "lucide-react";

const BlogsList = ({ blogs, isAdmin, handleCreate, handleEdit, handleDelete, formatDate }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[var(--color-accent1)]/10 rounded-lg border-light">
            <FileText className="h-6 w-6 text-[var(--color-accent1)]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-contrast-high font-heading">
              Market Analysis
            </h2>
            <p className="text-contrast-medium text-sm font-sans">
              Expert insights and market research
            </p>
          </div>
        </div>
        {isAdmin() && (
          <button
            onClick={() => handleCreate("blog")}
            className="lego-button flex items-center space-x-2 px-4 py-2.5 bg-[var(--color-accent1)] text-white rounded-lg font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>Create Analysis</span>
          </button>
        )}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="lego-card group overflow-hidden hover:border-hover"
          >
            {blog.image && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/4A4B68/F8F6F2?text=Market+Analysis";
                  }}
                />
              </div>
            )}

            <div className="p-5">
              {/* Meta */}
              <div className="flex items-center text-xs text-contrast-medium mb-3 space-x-3 font-sans">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>{blog.author?.username || "Analyst"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-contrast-high mb-3 line-clamp-2 group-hover:text-[var(--color-accent1)] transition-colors font-sans">
                {blog.title}
              </h3>

              {/* Content Preview */}
              <p className="text-contrast-medium text-sm mb-4 line-clamp-3 leading-relaxed font-sans">
                {blog.content.length > 120
                  ? `${blog.content.substring(0, 120)}...`
                  : blog.content}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-light">
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="flex items-center space-x-1 text-[var(--color-accent1)] hover:text-[var(--color-accent1)]/80 font-medium text-sm transition-colors group/readmore font-sans"
                >
                  <span>Read Analysis</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/readmore:translate-x-1" />
                </button>

                {isAdmin() && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(blog, "blog")}
                      className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded"
                      title="Edit Analysis"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id, "blog")}
                      className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 rounded"
                      title="Delete Analysis"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 lego-card rounded-full flex items-center justify-center">
            <FileText className="w-10 h-10 text-contrast-medium" />
          </div>
          <h3 className="text-lg font-medium text-contrast-high mb-2 font-heading">
            No market analysis yet
          </h3>
          <p className="text-contrast-medium text-sm mb-4 font-sans">
            Market insights will appear here once published
          </p>
          {isAdmin() && (
            <button
              onClick={() => handleCreate("blog")}
              className="lego-button flex items-center space-x-2 px-4 py-2.5 bg-[var(--color-accent1)] text-white rounded-lg font-medium mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Create First Analysis</span>
            </button>
          )}
        </div>
      )}

      {/* Decorative */}
      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[var(--color-accent1)]/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default BlogsList;
