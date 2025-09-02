import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Zap, Shield, TrendingUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <BarChart2 className="h-8 w-8 text-[var(--color-positive)]" />,
      title: "Real-Time Analytics",
      description: "Access live market data and insights to make informed trading decisions.",
    },
    {
      icon: <Zap className="h-8 w-8 text-[var(--color-accent1)]" />,
      title: "Fast Signals",
      description: "Receive instant trading signals with high accuracy and low latency.",
    },
    {
      icon: <Shield className="h-8 w-8 text-[var(--color-primary)]" />,
      title: "Secure Platform",
      description: "Trade with confidence using our encrypted and secure infrastructure.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[var(--color-secondary)]" />,
      title: "Community Insights",
      description: "Join a thriving community to share strategies and learn from experts.",
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
            Our Features
          </h1>
          <p className="text-contrast-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans">
            Discover the tools and services that make CryptoG Signals the ultimate trading platform.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="lego-card p-6 bg-[var(--color-card-bg)] border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-contrast-high font-[Outfit] mb-2">{feature.title}</h3>
              <p className="text-contrast-medium text-sm font-sans">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;