// DashboardStats.jsx
// Extracted from ProductApp.jsx
import React from "react";
import { BarChart3, TrendingUp, FileText } from "lucide-react";

const DashboardStats = ({ signals, blogs }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
      <div className="flex items-center">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
          {/* Icon should be passed as prop or imported */}
          <BarChart3 className="text-white" size={28} />

        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Signals</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{signals.filter((s) => s.status === "pending").length}</p>
        </div>
      </div>
    </div>
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
      <div className="flex items-center">
        <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
          <FileText className="text-white" size={28} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Market Analysis</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{blogs.length}</p>
        </div>
      </div>
    </div>
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
      <div className="flex items-center">
        <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
          <TrendingUp className="text-white" size={28} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{signals.length > 0 ? Math.round((signals.filter((s) => s.status === "success").length / signals.length) * 100) : 0}%</p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardStats;
