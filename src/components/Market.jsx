import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, BarChart2 } from "lucide-react";

const Market = () => {
  const marketInsights = [
    {
      title: "Market Trends",
      description: "Stay updated with the latest cryptocurrency market trends and predictions.",
      icon: <TrendingUp className="h-8 w-8 text-[var(--color-positive)]" />,
    },
    {
      title: "Risk Analysis",
      description: "Understand market risks with our advanced analytical tools.",
      icon: <AlertTriangle className="h-8 w-8 text-[var(--color-negative)]" />,
    },
    {
      title: "Performance Metrics",
      description: "Track your portfolio performance with real-time data.",
      icon: <BarChart2 className="h-8 w-8 text-[var(--color-primary)]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--color-accent1)] to-[var(--color-secondary)] bg-clip-text text-transparent font-[Outfit]">
            Market Insights
          </h1>
          <p className="text-contrast-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans">
            Explore the cryptocurrency market with our cutting-edge tools and insights.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="lego-card p-6 bg-[var(--color-card-bg)] border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">{insight.icon}</div>
              <h3 className="text-lg font-semibold text-contrast-high font-[Outfit] mb-2">{insight.title}</h3>
              <p className="text-contrast-medium text-sm font-sans">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;