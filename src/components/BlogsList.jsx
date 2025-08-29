// BlogsList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogsList = ({ blogs, isAdmin, handleCreate, handleEdit, handleDelete, formatDate }) => {
  const navigate = useNavigate();
  
  return (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-charcoal dark:text-champagne-100 font-heading">Market Analysis</h2>
      {isAdmin() && (
        <button onClick={() => handleCreate("blog")} className="flex items-center px-6 py-3 bg-gradient-to-r from-forest-green-500 to-forest-green-600 hover:from-forest-green-600 hover:to-forest-green-700 text-champagne-50 rounded-luxury font-medium transition-all duration-300 hover:shadow-forest transform hover:scale-105 border border-rich-gold-400/20 font-heading">
          Create Blog
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <article key={blog.id} className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-gold border border-champagne-200 dark:border-forest-green-700">
          {blog.image && (
            <div className="aspect-w-16 aspect-h-9">
              <img src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}  alt={blog.title} className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110" />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center text-sm text-charcoal/60 dark:text-champagne-400 mb-3 font-body">
              <span>{blog.author?.username || "Anonymous"}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal dark:text-champagne-50 mb-3 line-clamp-2 font-heading">{blog.title}</h3>
            <p className="text-charcoal/70 dark:text-champagne-400 mb-4 line-clamp-3 font-body">{blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}</p>
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="text-forest-green-600 hover:text-forest-green-700 dark:text-rich-gold-400 dark:hover:text-rich-gold-300 font-medium flex items-center group transition-all duration-200 font-heading"
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
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEdit(blog, "blog")} className="p-1 text-charcoal/50 hover:text-forest-green-600 dark:hover:text-rich-gold-400 transition-colors duration-200 font-body">Edit</button>
                  <button onClick={() => handleDelete(blog.id, "blog")} className="p-1 text-charcoal/50 hover:text-warning-red dark:hover:text-warning-red transition-colors duration-200 font-body">Delete</button>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
  );
};

export default BlogsList;
