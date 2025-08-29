// BlogsList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiEdit2, 
  FiTrash2, 
  FiUser, 
  FiClock, 
  FiArrowRight, 
  FiPlus, 
  FiTrendingUp,
  FiEye,
  FiBookOpen 
} from "react-icons/fi";
import { 
  BiTrendingUp, 
  BiAnalyse 
} from "react-icons/bi";
import { 
  HiOutlineSparkles 
} from "react-icons/hi";

const BlogsList = ({ blogs, isAdmin, handleCreate, handleEdit, handleDelete, formatDate }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <BiAnalyse className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Market Analysis
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center">
              <HiOutlineSparkles className="mr-2 text-yellow-500" />
              {blogs.length} insightful article{blogs.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>
        {isAdmin() && (
          <button 
            onClick={() => handleCreate("blog")} 
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <FiPlus className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Create Blog
          </button>
        )}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <article 
            key={blog.id} 
            className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            {/* Image Section */}
            {blog.image ? (
              <div className="relative overflow-hidden">
                <img 
                  src={`https://res.cloudinary.com/dnswcgxwm/${blog.image}`}  
                  alt={blog.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <FiEye className="text-gray-700 dark:text-gray-300 text-sm" />
                </div>
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
                <FiBookOpen className="text-6xl text-green-500/30 dark:text-green-400/30" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-200/20 dark:bg-green-500/10 rounded-full"></div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Meta Information */}
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center space-x-1">
                  <FiUser className="text-xs" />
                  <span>{blog.author?.username || "Anonymous"}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiClock className="text-xs" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {blog.title}
              </h3>

              {/* Content Preview */}
              <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {blog.content.length > 150 ? `${blog.content.substring(0, 150)}...` : blog.content}
              </p>

              {/* Tags/Category (if you have them) */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                  <BiTrendingUp className="mr-1 text-xs" />
                  Market Analysis
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="group/btn flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold text-sm transition-all hover:gap-2"
                >
                  <span>Read More</span>
                  <FiArrowRight className="ml-1 transition-transform group-hover/btn:translate-x-1" />
                </button>

                {isAdmin() && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(blog, "blog")} 
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                      title="Edit Blog"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id, "blog")} 
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                      title="Delete Blog"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-500/20 transition-colors pointer-events-none"></div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center">
            <FiBookOpen className="text-3xl text-green-500 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No articles yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Market analysis articles will appear here. Stay tuned for insightful content about trading strategies and market trends.
          </p>
          {isAdmin() && (
            <button 
              onClick={() => handleCreate("blog")} 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105"
            >
              <FiPlus className="mr-2" />
              Create Your First Article
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsList;