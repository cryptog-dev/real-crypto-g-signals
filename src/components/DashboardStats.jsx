// DashboardStats.jsx
// Enhanced version showing 4 key statistics
import React from "react";
import { 
  TrendingUp, 
  FileText, 
  Activity, 
  Target,
  Award,
  TrendingDown
} from "lucide-react";

const DashboardStats = ({ signals, blogs }) => {
  // Calculate key statistics
  const totalSignals = signals.length;
  const activeSignals = signals.filter(s => s.status === "pending").length;
  const successfulSignals = signals.filter(s => s.status === "success").length;
  const successRate = totalSignals > 0 ? Math.round((successfulSignals / totalSignals) * 100) : 0;
  
  // Calculate recent activity (last 7 days)
  const recentSignals = signals.filter(signal => {
    const signalDate = new Date(signal.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return signalDate > weekAgo;
  }).length;

  const statsData = [
    {
      title: "Total Signals",
      value: totalSignals,
      icon: Target,
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      textColor: "text-blue-700 dark:text-blue-300",
      change: `${successfulSignals} successful`,
      changeType: "neutral",
      iconBg: "bg-blue-500",
      sparkle: "bg-blue-200/50 dark:bg-blue-700/30"
    },
    {
      title: "Active Signals",
      value: activeSignals,
      icon: Activity,
      gradient: "from-green-500 via-emerald-500 to-green-600",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
      textColor: "text-green-700 dark:text-green-300",
      change: recentSignals > 0 ? `+${recentSignals} this week` : "No new signals",
      changeType: recentSignals > 0 ? "positive" : "neutral",
      iconBg: "bg-green-500",
      sparkle: "bg-green-200/50 dark:bg-green-700/30"
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: successRate > 60 ? TrendingUp : TrendingDown,
      gradient: successRate > 60 
        ? "from-emerald-500 via-green-500 to-teal-500" 
        : "from-yellow-500 via-orange-500 to-red-500",
      bgGradient: successRate > 60 
        ? "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20"
        : "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      textColor: successRate > 60 
        ? "text-emerald-700 dark:text-emerald-300"
        : "text-orange-700 dark:text-orange-300",
      change: successRate > 70 ? "Excellent" : successRate > 50 ? "Good" : "Needs work",
      changeType: successRate > 60 ? "positive" : successRate > 40 ? "neutral" : "negative",
      iconBg: successRate > 60 ? "bg-emerald-500" : "bg-orange-500",
      sparkle: successRate > 60 ? "bg-emerald-200/50 dark:bg-emerald-700/30" : "bg-orange-200/50 dark:bg-orange-700/30"
    },
    {
      title: "Market Analysis",
      value: blogs.length,
      icon: FileText,
      gradient: "from-purple-500 via-violet-500 to-purple-600",
      bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
      textColor: "text-purple-700 dark:text-purple-300",
      change: `${blogs.length} articles published`,
      changeType: "neutral",
      iconBg: "bg-purple-500",
      sparkle: "bg-purple-200/50 dark:bg-purple-700/30"
    }
  ];

  const getChangeIcon = (type) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "negative":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-200/30 to-emerald-300/30 dark:from-green-700/20 dark:to-emerald-700/20 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-tr from-blue-200/30 to-purple-300/30 dark:from-blue-700/20 dark:to-purple-700/20 rounded-full"></div>
        
        <div className="relative flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Award className="text-white text-xl" />
          </div>
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-white dark:via-green-400 dark:to-emerald-400">
              Dashboard Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Live Trading Performance</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div 
            key={stat.title}
            className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            style={{
              animationDelay: `${index * 0.15}s`,
              animation: 'fadeInUp 0.8s ease-out forwards'
            }}
          >
            {/* Background Pattern */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`}></div>
            <div className={`absolute -top-8 -right-8 w-24 h-24 ${stat.sparkle} rounded-full group-hover:scale-125 transition-transform duration-500`}></div>
            <div className={`absolute -bottom-6 -left-6 w-16 h-16 ${stat.sparkle} rounded-full group-hover:scale-110 transition-transform duration-500`}></div>
            
            {/* Content */}
            <div className="relative z-10 p-6 space-y-4">
              {/* Icon and Value */}
              <div className="flex items-start justify-between">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <stat.icon className="text-white h-6 w-6" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className={`text-sm font-bold ${stat.textColor} opacity-80`}>
                    {stat.title}
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-2">
                  {getChangeIcon(stat.changeType)}
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'positive' 
                      ? 'text-green-600 dark:text-green-400'
                      : stat.changeType === 'negative'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                
                {/* Pulse Indicator */}
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    stat.changeType === 'positive' ? 'bg-green-500' :
                    stat.changeType === 'negative' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${stat.gradient} p-0.5`}>
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary Bar */}
      <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/30">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Award className="text-white h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Overall Performance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {totalSignals > 0 ? `${successRate}% success rate with ${totalSignals} total signals` : 'No signals yet'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{successfulSignals}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Wins</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activeSignals}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Active</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{blogs.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Articles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add CSS keyframes for animations (add this to your global CSS)
// const styles = `
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// `;

export default DashboardStats;