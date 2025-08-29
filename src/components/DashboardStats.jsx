import React from "react";
import { FaChartLine, FaClock, FaCheckCircle, FaDollarSign, FaHourglassHalf, FaTrophy } from "react-icons/fa";

const DashboardStats = ({ stats = {} }) => {
  const {
    totalSignals = 0,
    activeSignals = 0,
    successRate = 0,
    totalProfitLoss = 0,
    avgTradeDuration = 0,
    winningTrades = 0,
  } = stats;

  const statCards = [
    {
      title: "Total Signals",
      value: totalSignals,
      icon: <FaChartLine className="text-[#FFD700]" />,
      color: "text-[#F7FAFC]",
      subColor: "text-[#F7FAFC]/60",
    },
    {
      title: "Active Signals",
      value: activeSignals,
      icon: <FaClock className="text-[#48BB78]" />,
      color: "text-[#F7FAFC]",
      subColor: "text-[#F7FAFC]/60",
    },
    {
      title: "Success Rate",
      value: `${successRate.toFixed(1)}%`,
      icon: <FaCheckCircle className="text-[#48BB78]" />,
      color: "text-[#F7FAFC]",
      subColor: "text-[#F7FAFC]/60",
    },
    {
      title: "Total P/L",
      value: totalProfitLoss >= 0
        ? `+$${totalProfitLoss.toLocaleString()}`
        : `-$${Math.abs(totalProfitLoss).toLocaleString()}`,
      icon: <FaDollarSign className={totalProfitLoss >= 0 ? "text-[#48BB78]" : "text-[#F56565]"} />,
      color: totalProfitLoss >= 0 ? "text-[#48BB78]" : "text-[#F56565]",
      subColor: totalProfitLoss >= 0 ? "text-[#48BB78]/60" : "text-[#F56565]/60",
    },
    {
      title: "Avg Duration",
      value: `${avgTradeDuration.toFixed(1)}h`,
      icon: <FaHourglassHalf className="text-[#FFD700]" />,
      color: "text-[#F7FAFC]",
      subColor: "text-[#F7FAFC]/60",
    },
    {
      title: "Winning Trades",
      value: winningTrades,
      icon: <FaTrophy className="text-[#48BB78]" />,
      color: "text-[#F7FAFC]",
      subColor: "text-[#F7FAFC]/60",
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="group rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[#2D3748]/95 dark:bg-[#466658]/95 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                {stat.icon}
                <h3 className="text-sm font-semibold text-[#F7FAFC] font-heading truncate">
                  {stat.title}
                </h3>
              </div>
            </div>
            <p className={`text-lg font-bold ${stat.color} font-mono`}>
              {stat.value}
            </p>
            <p className={`text-xs ${stat.subColor} mt-1 font-sans truncate`}>
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;