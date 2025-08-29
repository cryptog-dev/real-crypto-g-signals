import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsList = ({ blogs, isAdmin, handleCreate, handleEdit, handleDelete, formatDate }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#2D3748] dark:text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight">
            Market Analysis
          </h2>
          <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mt-2">
            {blogs.length} article{blogs.length !== 1 ? "s" : ""} available
          </p>
        </div>
        {isAdmin() && (
          <button
            onClick={() => handleCreate("blog")}
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-xl font-medium font-heading transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Blog
          </button>
        )}
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group rounded-2xl shadow-lg border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden"
          >
            {blog.image && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x400/1B4332/F7FAFC?text=No+Image";
                  }}
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center text-sm text-[#2D3748]/60 dark:text-[#F7FAFC]/60 mb-3 font-mono">
                <span>{blog.author?.username || "Anonymous"}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(blog.created_at || new Date().toISOString())}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-3 line-clamp-2 font-heading">
                {blog.title}
              </h3>
              <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mb-4 line-clamp-3 leading-relaxed">
                {blog.content.length > 200 ? `${blog.content.substring(0, 200)}...` : blog.content}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="text-[#1B4332] hover:text-[#FFD700] dark:text-[#FFD700] dark:hover:text-[#F7E7CE] font-medium flex items-center group font-heading"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {isAdmin() && (
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(blog, "blog");
                      }}
                      className="p-2 text-[#2D3748]/80 hover:text-[#1B4332] dark:text-[#F7FAFC]/80 dark:hover:text-[#FFD700] hover:bg-[#F7E7CE]/20 dark:hover:bg-[#1B4332]/20 rounded-lg transition-colors"
                      title="Edit Blog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog.id, "blog");
                      }}
                      className="p-2 text-[#2D3748]/80 hover:text-[#F56565] dark:text-[#F7FAFC]/80 dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-lg transition-colors"
                      title="Delete Blog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
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
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border border-[#F7E7CE]/20">
            <svg
              className="w-12 h-12 text-[#2D3748]/80 dark:text-[#F7FAFC]/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 006 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-2 font-heading">
            No blogs yet
          </h3>
          <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mb-6 leading-relaxed">
            Market analysis articles will appear here once created.
          </p>
          {isAdmin() && (
            <button
              onClick={() => handleCreate("blog")}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-xl font-medium font-heading transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Create Your First Blog
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsList;