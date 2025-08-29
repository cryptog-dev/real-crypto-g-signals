// RecentSignals.jsx
import React from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

const RecentSignals = ({ signals, getStatusColor, formatDate }) => (
  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
        Recent Trading Signals
      </h3>
      <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </div>

    {/* Signals list */}
    <div className="space-y-3">
      {signals.slice(0, 5).map((signal) => (
        <div
          key={signal.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/70 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-md hover:-translate-y-1 transition-all"
        >
          {/* Coin & Direction */}
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-lg ${
                signal.direction === "long"
                  ? "bg-green-100 dark:bg-green-900/40"
                  : "bg-red-100 dark:bg-red-900/40"
              }`}
            >
              {signal.direction === "long" ? (
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {signal.coin}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Entry: ${signal.entry_price?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Status & Date */}
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                signal.status
              )}`}
            >
              {signal.status}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(signal.created_at)}
            </span>
          </div>
        </div>
      ))}

      {/* Empty state */}
      {signals.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
          No recent signals
        </p>
      )}
    </div>
  </div>
);

export default RecentSignals;