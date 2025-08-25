// BlogsList.jsx
// Extracted from ProductApp.jsx
import React from "react";

const BlogsList = ({ blogs, isAdmin, handleCreate, handleEdit, handleDelete, formatDate }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Market Analysis</h2>
      {isAdmin() && (
        <button onClick={() => handleCreate("blog")} className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105">
          Create Blog
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <article key={blog.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-transform hover:scale-105 border border-gray-200 dark:border-gray-700">
          {blog.image && (
            <div className="aspect-w-16 aspect-h-9">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span>{blog.author?.username || "Anonymous"}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">{blog.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}</p>
            <div className="flex items-center justify-between">
              <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium flex items-center">Read More</button>
              {isAdmin() && (
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEdit(blog, "blog")} className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Edit</button>
                  <button onClick={() => handleDelete(blog.id, "blog")} className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">Delete</button>
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default BlogsList;
