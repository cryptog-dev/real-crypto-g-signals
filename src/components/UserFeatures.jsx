// UserFeatures.jsx (compact mono-color)
import React from "react";
import { 
  Signal, Newspaper, BarChart3, Bell,
  Target, Shield, Zap, Star, ArrowRight, CheckCircle
} from "lucide-react";

const UserFeatures = () => {
  const features = [
    {
      id: "signals",
      title: "Trading Signals",
      subtitle: "Real-time Opportunities",
      description: "Premium signals with entry, stop loss, and targets.",
      icon: Signal,
      benefits: ["Real-time alerts", "Entry & exit points", "Expert analysis"],
      stats: "250+",
    },
    {
      id: "analysis",
      title: "Market Analysis",
      subtitle: "Expert Insights",
      description: "Daily updates, trend analysis, and strategies.",
      icon: Newspaper,
      benefits: ["Daily updates", "Trend analysis", "Guides"],
      stats: "50+",
    },
    {
      id: "analytics",
      title: "Portfolio Analytics",
      subtitle: "Performance Tracking",
      description: "Track profits, losses, and success metrics.",
      icon: BarChart3,
      benefits: ["Profit tracking", "Reports", "Success rates"],
      stats: "Live",
    },
    {
      id: "alerts",
      title: "Smart Alerts",
      subtitle: "Stay Notified",
      description: "Get instant alerts for movements and updates.",
      icon: Bell,
      benefits: ["Instant alerts", "Custom triggers", "Updates"],
      stats: "24/7",
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-green-600 rounded-md mb-1">
          <Star className="text-white h-4 w-4" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Premium Features
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Unlock tools and insights to improve your trading.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
                  <feature.icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{feature.subtitle}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded">
                {feature.stats}
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
              {feature.description}
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-1 mb-3">
              {feature.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                  {benefit}
                </div>
              ))}
            </div>

            {/* Action */}
            <button className="w-full flex items-center justify-center py-1.5 px-3 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold transition">
              <span>Explore</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-green-600 rounded-lg p-5 text-center text-white shadow-md space-y-2">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-md mb-1">
          <Zap className="h-4 w-4" />
        </div>
        <h3 className="text-lg font-semibold">Ready to Start?</h3>
        <p className="text-xs text-green-100">
          Join thousands of traders making smarter decisions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
          <button className="flex items-center justify-center space-x-1 bg-white text-green-700 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-100">
            <Shield className="h-3 w-3" />
            <span>Get Premium</span>
          </button>
          <button className="flex items-center justify-center space-x-1 border border-white/40 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-white/10">
            <Target className="h-3 w-3" />
            <span>View Signals</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeatures;