import React from "react";
import { BarChart3, TrendingUp, FileText, DollarSign, Activity, PieChart } from "lucide-react";

const DashboardStats = ({ signals, blogs }) => {
  const totalSignals = signals.length;
  const activeSignals = signals.filter((s) => s.status === "pending").length;
  const successfulSignals = signals.filter((s) => s.status === "success").length;
  const successRate = totalSignals > 0 ? Math.round((successfulSignals / totalSignals) * 100) : 0;
  const avgLeverage = signals.length > 0 
    ? (signals.reduce((sum, signal) => sum + (signal.leverage || 0), 0) / signals.length).toFixed(1)
    : "0.0";
  const activeRatio = totalSignals > 0 ? Math.round((activeSignals / totalSignals) * 100) : 0;

  const stats = [
    {
      title: "Open Trades",
      value: activeSignals,
      icon: Activity,
      color: "bg-[var(--color-primary)]",
      textColor: "text-white",
      progress: activeRatio,
    },
    {
      title: "Market Insights",
      value: blogs.length,
      icon: FileText,
      color: "bg-[var(--color-accent1)]",
      textColor: "text-white",
      progress: null,
    },
    {
      title: "Win Rate",
      value: `${successRate}%`,
      icon: TrendingUp,
      color: "bg-[var(--color-secondary)]",
      textColor: "text-white",
      progress: successRate,
    },
    {
      title: "Total Trades",
      value: totalSignals,
      icon: BarChart3,
      color: "bg-[var(--color-accent2)]",
      textColor: "text-white",
      progress: null,
    },
    {
      title: "Avg Leverage",
      value: `${avgLeverage}x`,
      icon: DollarSign,
      color: "bg-[var(--color-primary)]",
      textColor: "text-white",
      progress: null,
    },
    {
      title: "Active Ratio",
      value: `${activeRatio}%`,
      icon: PieChart,
      color: "bg-[var(--color-accent1)]",
      textColor: "text-white",
      progress: activeRatio,
    },
  ];

  return (
<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2 sm:px-4">
{stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className="lego-card rounded-lg p-4 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all duration-300 relative overflow-hidden group"
          >
            {/* Hover effect gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-card-bg)]/50 to-[var(--color-card-hover)]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className={`p-2 rounded-lg mb-3 ${stat.color}`}
              >
                <IconComponent className={`h-5 w-5 ${stat.textColor}`} />
              </div>
              <p className="text-2xl font-bold text-contrast-high font-sans mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-contrast-medium uppercase tracking-wide font-sans">
                {stat.title}
              </p>
              {stat.progress !== null && (
                <div className="mt-2 w-full h-1 bg-[var(--color-border-light)] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat.title === "Win Rate" ? "bg-[var(--color-accent1)]" : "bg-[var(--color-primary)]"}`}
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Decorative corner accent */}
            <div
              className={`absolute bottom-1 right-1 w-3 h-3 ${stat.color} rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;