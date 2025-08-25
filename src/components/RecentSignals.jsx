// RecentSignals.jsx
// Extracted from ProductApp.jsx
import React from "react";

const RecentSignals = ({ signals, getStatusColor, formatDate }) => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Trading Signals</h3>
    </div>
    <div className="space-y-4">
      {signals.slice(0, 5).map((signal) => (
        <div key={signal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${signal.direction === "long" ? "bg-green-500" : "bg-red-500"}`}></div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{signal.coin}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">${signal.entry_price?.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signal.status)}`}>{signal.status}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{formatDate(signal.created_at)}</span>
          </div>
        </div>
      ))}
      {signals.length === 0 && <p className="text-sm text-gray-600 dark:text-gray-400">No recent signals</p>}
    </div>
  </div>
);

export default RecentSignals;
