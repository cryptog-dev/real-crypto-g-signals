import React, { useState, useEffect, useContext } from "react";
import {
  Plus,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    totalSignals: 0,
    activeSignals: 0,
  });
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (isAdmin()) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // In a real app, you'd fetch these from your API
      setStats({
        totalUsers: 1250,
        totalBlogs: 45,
        totalSignals: 89,
        activeSignals: 12,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin()) {
    return null;
  }

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading dashboard...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      id="dashboard"
    >
      <div className="absolute top-20 right-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Admin Dashboard
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your platform content and monitor performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Users className="text-white" size={28} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <FileText className="text-white" size={28} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Blogs
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalBlogs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <TrendingUp className="text-white" size={28} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Signals
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalSignals}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl">
                <BarChart3 className="text-white" size={28} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Signals
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.activeSignals}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Content Management
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all hover:shadow-md">
                <Plus size={18} />
                <span>Create New Blog</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all hover:shadow-md">
                <TrendingUp size={18} />
                <span>Create New Signal</span>
              </button>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    New user registered
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  2 min ago
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Signal updated
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  5 min ago
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Blog published
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  10 min ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
