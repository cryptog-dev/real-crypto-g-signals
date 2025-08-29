// AdminControls.jsx
// Extracted from ProductApp.jsx
import React from "react";

const AdminControls = ({ handleCreate }) => (
  <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-8 border border-champagne-200 dark:border-forest-green-700 hover:shadow-gold transition-all duration-300">
    <h3 className="text-2xl font-bold text-charcoal dark:text-champagne-100 mb-6 font-heading">Admin Controls</h3>
    <p className="text-sm text-charcoal/70 dark:text-champagne-400 mb-4 font-body">You have full access to create, edit, and manage all content.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button onClick={() => handleCreate("blog")} className="flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-gradient-to-r from-forest-green-500 to-forest-green-600 hover:from-forest-green-600 hover:to-forest-green-700 text-champagne-50 rounded-luxury font-medium transition-all duration-300 hover:shadow-forest transform hover:scale-105 border border-rich-gold-400/20 font-heading">
        <span>Create Blog</span>
      </button>
      <button onClick={() => handleCreate("signal")} className="flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-gradient-to-r from-rich-gold-500 to-rich-gold-600 hover:from-rich-gold-600 hover:to-rich-gold-700 text-charcoal rounded-luxury font-medium transition-all duration-300 hover:shadow-gold transform hover:scale-105 border border-forest-green-400/20 font-heading">
        <span>Create Signal</span>
      </button>
    </div>
  </div>
);

export default AdminControls;
