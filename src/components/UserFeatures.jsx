import React from "react";
import { Signal, Newspaper, TrendingUp, BarChart3 } from "lucide-react";

const UserFeatures = () => {
  const features = [
    {
      title: "Trading Signals",
      description: "Real-time signals with precise entry/exit points",
      icon: Signal,
      color: "bg-[var(--color-primary)]",
      borderColor: "var(--color-primary-dark)",
      textColor: "text-white"
    },
    {
      title: "Market Analysis",
      description: "Expert insights and comprehensive analysis",
      icon: Newspaper,
      color: "bg-[var(--color-accent1)]",
      borderColor: "var(--color-accent1-dark)",
      textColor: "text-white"
    },
    {
      title: "Performance Tracking",
      description: "Detailed analytics and success metrics",
      icon: TrendingUp,
      color: "bg-[var(--color-secondary)]",
      borderColor: "var(--color-secondary-dark)",
      textColor: "text-white"
    },
    {
      title: "Live Charts",
      description: "Real-time charts with technical indicators",
      icon: BarChart3,
      color: "bg-[var(--color-accent2)]",
      borderColor: "var(--color-accent2-dark)",
      textColor: "text-white"
    }
  ];

  return (
    <div className="bg-[var(--color-card-bg)] rounded-xl p-5 border-4 border-[var(--color-primary)]/30 relative overflow-hidden shadow-lg">
      {/* Header */}
      <div className="text-center mb-5">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] font-heading">
          Premium Features
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1 font-sans">
          Exclusive platform benefits
        </p>
      </div>

      {/* Features Grid - 4 in a row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index}
              className="lego-button group p-4 rounded-lg border-b-4 bg-[var(--color-card-bg)] hover:bg-[var(--color-card-hover)] transition-all duration-200 shadow-md"
              style={{ borderColor: "var(--color-border-dark)" }}
            >
              {/* Icon */}
              <div 
                className={`p-2 rounded-lg mb-3 border-b-4 ${feature.color}`}
                style={{ borderColor: feature.borderColor }}
              >
                <IconComponent className={`h-5 w-5 ${feature.textColor}`} />
              </div>
              
              {/* Content */}
              <div>
                <h4 className="font-medium text-[var(--color-text-primary)] text-sm mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-200 font-sans">
                  {feature.title}
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] leading-tight font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
      <div className="absolute -top-3 -left-3 w-12 h-12 bg-[var(--color-primary)]/10 rounded-full blur-md"></div>
      <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-primary)]/20 rounded-full border border-[var(--color-primary)]/30"></div>
    </div>
  );
};

export default UserFeatures;