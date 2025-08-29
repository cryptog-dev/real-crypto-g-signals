// DashboardStats.jsx
// Extracted from ProductApp.jsx
import React from "react";
import { BarChart3, TrendingUp, FileText } from "lucide-react";

const DashboardStats = ({ signals, blogs }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
    {/* Active Signals Card */}
    <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-4 sm:p-5 border border-champagne-200 dark:border-forest-green-700 transform transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] hover:shadow-gold">
      <div className="flex items-center">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-forest-green-500 to-forest-green-600 rounded-luxury shadow-forest">
          <BarChart3 className="text-white h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm font-medium text-charcoal/70 dark:text-champagne-300 font-body">Active Signals</p>
          <p className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-champagne-50 font-heading">
            {signals.filter((s) => s.status === "pending").length}
          </p>
        </div>
      </div>
    </div>

    {/* Market Analysis Card */}
    <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-4 sm:p-5 border border-champagne-200 dark:border-forest-green-700 transform transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] hover:shadow-gold">
      <div className="flex items-center">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-rich-gold-500 to-rich-gold-600 rounded-luxury shadow-gold">
          <FileText className="text-charcoal h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm font-medium text-charcoal/70 dark:text-champagne-300 font-body">Market Analysis</p>
          <p className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-champagne-50 font-heading">
            {blogs.length}
          </p>
        </div>
      </div>
    </div>

    {/* Success Rate Card */}
    <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-4 sm:p-5 border border-champagne-200 dark:border-forest-green-700 transform transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] hover:shadow-gold sm:col-span-2 lg:col-span-1">
      <div className="flex items-center">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-success-green to-forest-green-500 rounded-luxury shadow-forest">
          <TrendingUp className="text-white h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm font-medium text-charcoal/70 dark:text-champagne-300 font-body">Success Rate</p>
          <p className="text-2xl sm:text-3xl font-bold text-charcoal dark:text-champagne-50 font-heading">
            {signals.length > 0 ? Math.round((signals.filter((s) => s.status === "success").length / signals.length) * 100) : 0}%
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardStats;
