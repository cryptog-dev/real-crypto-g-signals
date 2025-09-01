import React from "react";
import { BarChart3, TrendingUp, FileText, DollarSign, Activity, PieChart } from "lucide-react";

const DashboardStats = ({ signals, blogs }) => {
  const totalSignals = signals.length;
  const activeSignals = signals.filter((s) => s.status === "pending").length;
  const successfulSignals = signals.filter((s) => s.status === "success").length;
  const successRate = totalSignals > 0 ? Math.round((successfulSignals / totalSignals) * 100) : 0;
  
  // Calculate average leverage
  const avgLeverage = signals.length > 0 
    ? (signals.reduce((sum, signal) => sum + (signal.leverage || 0), 0) / signals.length).toFixed(1)
    : "0.0";
  
  // Calculate active ratio
  const activeRatio = totalSignals > 0 ? Math.round((activeSignals / totalSignals) * 100) : 0;

  const stats = [
    {
      title: "Active Signals",
      value: activeSignals,
      icon: Activity,
      color: "bg-[var(--color-primary)]",
      borderColor: "var(--color-primary-dark)",
      textColor: "text-white"
    },
    {
      title: "Total Analysis",
      value: blogs.length,
      icon: FileText,
      color: "bg-[var(--color-accent1)]",
      borderColor: "var(--color-accent1-dark)",
      textColor: "text-white"
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      icon: TrendingUp,
      color: "bg-[var(--color-secondary)]",
      borderColor: "var(--color-secondary-dark)",
      textColor: "text-white"
    },
    {
      title: "Total Signals",
      value: totalSignals,
      icon: BarChart3,
      color: "bg-[var(--color-accent2)]",
      borderColor: "var(--color-accent2-dark)",
      textColor: "text-white"
    },
    {
      title: "Avg Leverage",
      value: `${avgLeverage}x`,
      icon: DollarSign,
      color: "bg-[var(--color-primary)]",
      borderColor: "var(--color-primary-dark)",
      textColor: "text-white"
    },
    {
      title: "Active Ratio",
      value: `${activeRatio}%`,
      icon: PieChart,
      color: "bg-[var(--color-accent1)]",
      borderColor: "var(--color-accent1-dark)",
      textColor: "text-white"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={index}
            className="lego-button bg-[var(--color-card-bg)] rounded-lg p-4 border-b-4 transform transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group border-dark"
            style={{ 
              boxShadow: 'var(--card-shadow)'
            }}
          >
            {/* Hover effect gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-card-bg)]/50 to-[var(--color-card-hover)]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div 
                className={`p-2 rounded-lg mb-3 border-b-4 ${stat.color}`}
                style={{ borderColor: stat.borderColor }}
              >
                <IconComponent className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <p className="text-2xl font-bold text-[var(--color-text-primary)] font-sans mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide font-sans">
                {stat.title}
              </p>
            </div>
            
            {/* Decorative corner accent */}
            <div 
              className={`absolute bottom-1 right-1 w-4 h-4 ${stat.color} rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300 border`}
              style={{ borderColor: stat.borderColor }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;