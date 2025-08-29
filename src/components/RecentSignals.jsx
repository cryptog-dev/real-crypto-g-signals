// RecentSignals.jsx
// Extracted from ProductApp.jsx
import React from "react";

const RecentSignals = ({ signals, getStatusColor, formatDate }) => (
  <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-6 border border-champagne-200 dark:border-forest-green-700 hover:shadow-gold transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-charcoal dark:text-champagne-100 font-heading">Recent Trading Signals</h3>
    </div>
    <div className="space-y-4">
      {signals.slice(0, 5).map((signal) => (
        <div key={signal.id} className="flex items-center justify-between p-3 bg-champagne-50 dark:bg-forest-green-700/50 rounded-luxury border border-champagne-100 dark:border-forest-green-600/30 hover:bg-champagne-100 dark:hover:bg-forest-green-600/50 transition-all duration-200">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${signal.direction === "long" ? "bg-success-green" : "bg-warning-red"} animate-pulse`}></div>
            <div>
              <p className="font-medium text-charcoal dark:text-champagne-50 font-heading">{signal.coin}</p>
              <p className="text-sm text-charcoal/70 dark:text-champagne-400 font-mono">${signal.entry_price?.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signal.status)}`}>{signal.status}</span>
            <span className="text-sm text-charcoal/60 dark:text-champagne-400 font-body">{formatDate(signal.created_at)}</span>
          </div>
        </div>
      ))}
      {signals.length === 0 && <p className="text-sm text-charcoal/60 dark:text-champagne-400 font-body">No recent signals</p>}
    </div>
  </div>
);

export default RecentSignals;
