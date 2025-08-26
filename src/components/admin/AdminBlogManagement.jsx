import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

const AdminBlogManagement = ({ 
  blogs, 
  handleCreate, 
  handleEdit, 
  handleDelete, 
  formatDate 
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Blog Management
        </h2>
        <Button
          onClick={() => handleCreate("blog")}
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create Blog</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  By {blog.author?.username || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDate(blog.created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleEdit(blog, "blog")}
                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Edit Blog"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(blog.id, "blog")}
                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete Blog"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogManagement;