// DashboardStats.jsx
// Extracted from ProductApp.jsx
import React from "react";
import { BarChart3, TrendingUp, FileText } from "lucide-react";

const DashboardStats = ({ signals, blogs }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
    {/* Active Signals Card */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.02] sm:hover:scale-[1.03]">
      <div className="flex items-center">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
          <BarChart3 className="text-white h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Active Signals</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {signals.filter((s) => s.status === "pending").length}
          </p>
        </div>
      </div>
    </div>

    {/* Market Analysis Card */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.02] sm:hover:scale-[1.03]">
      <div className="flex items-center">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
          <FileText className="text-white h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Market Analysis</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {blogs.length}
          </p>
        </div>
      </div>
    </div>

    {/* Success Rate Card */}
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-[1.02] sm:hover:scale-[1.03] sm:col-span-2 lg:col-span-1">
      <div className="flex items-center">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
          <TrendingUp className="text-white h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div className="ml-3 sm:ml-4">
          <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">Success Rate</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {signals.length > 0 ? Math.round((signals.filter((s) => s.status === "success").length / signals.length) * 100) : 0}%
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardStats;
