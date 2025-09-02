import React from "react";
import { Signal, Newspaper, TrendingUp, BarChart3 } from "lucide-react";

const UserFeatures = ({ isPremium, isFree }) => {
  const features = [
    {
      title: "Trade Signals",
      description: "Real-time buy/sell signals for crypto markets",
      icon: Signal,
      color: "bg-[var(--color-primary)]",
      textColor: "text-white",
    },
    {
      title: "Market Insights",
      description: "In-depth analysis from crypto experts",
      icon: Newspaper,
      color: "bg-[var(--color-accent1)]",
      textColor: "text-white",
    },
    {
      title: "Performance Analytics",
      description: "Track your trading success with metrics",
      icon: TrendingUp,
      color: "bg-[var(--color-secondary)]",
      textColor: "text-white",
    },
    {
      title: "Live Price Charts",
      description: "Interactive charts with technical indicators",
      icon: BarChart3,
      color: "bg-[var(--color-accent2)]",
      textColor: "text-white",
    },
  ];

  return (
    <div className="lego-card rounded-xl p-6 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] relative overflow-hidden transition-all duration-300">
      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="lego-card p-4 rounded-lg border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all duration-200 group"
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg mb-3 ${feature.color}`}>
                <IconComponent className={`h-5 w-5 ${feature.textColor}`} />
              </div>

              {/* Content */}
              <div>
                <h4 className="font-medium text-contrast-high text-sm mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-200 font-sans">
                  {feature.title}
                </h4>
                <p className="text-xs text-contrast-medium leading-tight font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--color-primary)]/10 rounded-full blur-md"></div>
      <div className="absolute top-2 right-2 w-4 h-4 bg-[var(--color-primary)]/20 rounded-full border border-[var(--color-border-light)]"></div>
    </div>
  );
};

export default UserFeatures;