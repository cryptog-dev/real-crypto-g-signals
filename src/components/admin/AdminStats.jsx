import React from 'react';
import { BarChart3, FileText, TrendingUp, Users } from 'lucide-react';

const AdminStats = ({ blogs, signals }) => {
  const stats = [
    {
      title: 'Total Blogs',
      value: blogs.length,
      icon: FileText,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Signals',
      value: signals.length,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Active Signals',
      value: signals.filter(s => s.status === 'pending').length,
      icon: BarChart3,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Success Rate',
      value: signals.length > 0 
        ? `${Math.round((signals.filter(s => s.status === 'success').length / signals.length) * 100)}%`
        : '0%',
      icon: Users,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105"
        >
          <div className="flex items-center">
            <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-xl`}>
              <stat.icon className="text-white" size={28} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;