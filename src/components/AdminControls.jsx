// AdminControls.jsx
// Extracted from ProductApp.jsx
import React from "react";

const AdminControls = ({ handleCreate }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Admin Controls</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">You have full access to create, edit, and manage all content.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button onClick={() => handleCreate("blog")} className="flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all hover:shadow-md">
        <span>Create Blog</span>
      </button>
      <button onClick={() => handleCreate("signal")} className="flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg font-medium transition-all hover:shadow-md">
        <span>Create Signal</span>
      </button>
    </div>
  </div>
);

export default AdminControls;
