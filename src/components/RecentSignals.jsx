import React from "react";
import { TrendingUp, Clock } from "lucide-react";

const RecentSignals = ({ signals, getStatusColor, formatDate }) => (
  <div className="lego-card rounded-xl p-6 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] relative overflow-hidden transition-all duration-300">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[var(--color-primary)]/10 rounded-lg border border-[var(--color-border-light)]">
          <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h3 className="text-xl font-semibold text-contrast-high font-[Outfit]">
          Latest Market Signals
        </h3>
      </div>
      <div className="flex items-center text-xs text-contrast-medium font-sans">
        <Clock className="h-3 w-3 mr-1" />
        Real-Time
      </div>
    </div>

    {/* Signals List */}
    <div className="space-y-3">
      {signals.slice(0, 5).map((signal) => (
        <div
          key={signal.id}
          className="lego-card flex items-center justify-between p-4 rounded-lg border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all duration-200 group"
        >
          <div className="flex items-center space-x-4">
            {/* Direction Indicator */}
            <div
              className={`w-3 h-3 rounded-full ${
                signal.direction === "buy" ? "bg-[var(--color-accent1)]" : "bg-[var(--color-secondary)]"
              } shadow-md`}
            ></div>

            {/* Coin and Price */}
            <div>
              <p className="font-medium text-contrast-high text-sm font-sans">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[var(--color-border-light)] shadow-sm">
<img
      src={`/assets/${signal.coin.toLowerCase()}.svg`}
      alt={`${signal.coin} icon`}
      className="w-5 h-5 object-contain"
      onError={(e) => {
        e.currentTarget.src = "/assets/default.png";
      }}
    />
  </div>{signal.coin}</p>
              <p className="text-xs text-contrast-medium mt-1 font-sans">
                Entry: <span className="text-[var(--color-primary)] font-medium">${signal.entry_price?.toLocaleString() || "N/A"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Badge */}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signal.status)} font-sans`}>
              {signal.status.toUpperCase()}
            </span>

            {/* Date */}
            <span className="text-xs text-contrast-medium font-sans">
              {formatDate(signal.created_at)}
            </span>
          </div>
        </div>
      ))}

      {signals.length === 0 && (
        <div className="text-center py-6">
          <TrendingUp className="h-8 w-8 text-contrast-medium/30 mx-auto mb-2" />
          <p className="text-sm text-contrast-medium font-sans">No Market Signals Yet</p>
          <p className="text-xs text-contrast-medium/70 mt-1 font-sans">Stay tuned for new trading opportunities</p>
        </div>
      )}
    </div>

    {/* Stats Summary */}
    {signals.length > 0 && (
      <div className="mt-5 pt-4 border-t border-[var(--color-border-light)]">
        <div className="flex justify-between text-xs text-contrast-medium font-sans">
          <span>Total: {signals.length}</span>
          <span>Active: {signals.filter((s) => s.status === "pending").length}</span>
          <span>Success: {signals.filter((s) => s.status === "success").length}</span>
        </div>
      </div>
    )}

    {/* Decorative elements */}
    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
    <div className="absolute top-2 right-2 w-4 h-4 bg-[var(--color-primary)]/20 rounded-full border border-[var(--color-border-light)]"></div>
  </div>
);

export default RecentSignals;