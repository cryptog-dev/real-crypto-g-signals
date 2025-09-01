import React from "react";
import { TrendingUp, Clock } from "lucide-react";

const RecentSignals = ({ signals, getStatusColor, formatDate }) => (
  <div className="bg-[var(--color-card-bg)] rounded-xl p-6 border-4 border-[var(--color-primary)]/20 relative overflow-hidden shadow-md">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg border-2 border-[var(--color-primary)]/20">
          <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)] font-heading">Recent Trading Signals</h3>
      </div>
      <div className="flex items-center text-xs text-[var(--color-text-secondary)] font-sans">
        <Clock className="h-3 w-3 mr-1" />
        Live updates
      </div>
    </div>

    {/* Signals List */}
    <div className="space-y-3">
      {signals.slice(0, 5).map((signal) => (
        <div 
          key={signal.id} 
          className="lego-button flex items-center justify-between p-4 bg-[var(--color-card-bg)] rounded-lg border-b-4 border-[var(--color-neutral-dark)]/10 hover:border-b-2 hover:mt-0.5 transition-all duration-200 group shadow-sm"
        >
          <div className="flex items-center space-x-4">
            {/* Direction Indicator */}
            <div className={`w-3 h-3 rounded-full ${signal.direction === "long" ? "bg-[var(--color-accent1)]" : "bg-[var(--color-secondary)]"} shadow-lg`}></div>
            
            {/* Coin and Price */}
            <div>
              <p className="font-medium text-[var(--color-text-primary)] text-sm font-sans">{signal.coin}</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-sans">
                Entry: <span className="text-[var(--color-primary)] font-medium">${signal.entry_price?.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Badge */}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signal.status)} font-sans`}>
              {signal.status.toUpperCase()}
            </span>
            
            {/* Date */}
            <span className="text-xs text-[var(--color-text-secondary)] font-sans">
              {formatDate(signal.created_at)}
            </span>
          </div>
        </div>
      ))}
      
      {signals.length === 0 && (
        <div className="text-center py-6">
          <TrendingUp className="h-8 w-8 text-[var(--color-text-secondary)]/30 mx-auto mb-2" />
          <p className="text-sm text-[var(--color-text-secondary)] font-sans">No trading signals available</p>
          <p className="text-xs text-[var(--color-text-secondary)]/70 mt-1 font-sans">New signals will appear here</p>
        </div>
      )}
    </div>

    {/* Stats Summary */}
    {signals.length > 0 && (
      <div className="mt-5 pt-4 border-t border-[var(--color-neutral-dark)]/10">
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] font-sans">
          <span>Total: {signals.length}</span>
          <span>Active: {signals.filter(s => s.status === 'pending').length}</span>
          <span>Success: {signals.filter(s => s.status === 'success').length}</span>
        </div>
      </div>
    )}

    {/* Decorative elements */}
    <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-[var(--color-primary)]/10 rounded-full blur-md"></div>
    <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-accent1)]/20 rounded-full border border-[var(--color-accent1)]/30"></div>
  </div>
);

export default RecentSignals;