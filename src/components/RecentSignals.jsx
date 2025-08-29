import React from "react";
import { Link } from "react-router-dom";

const RecentSignals = ({ signals, getStatusColor, formatDate }) => (
  <div className="rounded-xl shadow-lg p-6 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 transition-all duration-300 font-sans">
    <h3 className="text-2xl font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-6 font-heading tracking-tight">
      Recent Trading Signals
    </h3>
    <div className="space-y-4">
      {signals.slice(0, 5).map((signal) => (
        <Link
          to={`/signal/${signal.id}`}
          key={signal.id}
          className="flex items-center justify-between p-4 rounded-lg border border-[#F7E7CE]/10 hover:border-[#FFD700]/30 hover:bg-[#F7E7CE]/10 dark:hover:bg-[#1B4332]/10 transition-all duration-300"
        >
          <div className="flex items-center space-x-4">
            <div
              className={`w-3 h-3 rounded-full ${
                signal.direction === "long" ? "bg-[#48BB78]" : "bg-[#F56565]"
              }`}
            ></div>
            <div>
              <p className="text-lg font-medium text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                {signal.coin}
              </p>
              <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-mono">
                ${signal.entry_price?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                signal.status
              )}`}
            >
              {signal.status}
            </span>
            <span className="text-sm text-[#2D3748]/60 dark:text-[#F7FAFC]/60 font-mono">
              {formatDate(signal.created_at || new Date().toISOString())}
            </span>
          </div>
        </Link>
      ))}
      {signals.length === 0 && (
        <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 text-center py-6">
          No recent signals available
        </p>
      )}
    </div>
  </div>
);

export default RecentSignals;