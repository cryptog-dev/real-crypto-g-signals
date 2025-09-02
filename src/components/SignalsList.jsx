import React from "react";
import { Plus, Edit3, Trash2, Clock, TrendingUp, Lock, Target } from "lucide-react";

const SignalsList = ({ signals, isAdmin, isFree, handleCreate, handleEdit, handleDelete, getStatusColor, formatDate, isPremium }) => {
  const canViewTargets = () => isPremium() || isAdmin();

  const parseTargets = (targetsString) => {
    if (!targetsString) return {};
    try {
      if (typeof targetsString === "object") return targetsString;
      try {
        return JSON.parse(targetsString);
      } catch (jsonError) {
        if (typeof targetsString === "string" && targetsString.includes(",")) {
          const targets = {};
          const prices = targetsString
            .split(",")
            .map((price) => price.trim())
            .filter((price) => price);
          prices.forEach((price, index) => {
            const normalizedPrice = parseFloat(price);
            if (!isNaN(normalizedPrice)) {
              targets[normalizedPrice.toString()] = "pending";
            }
          });
          return targets;
        }
        const singlePrice = parseFloat(targetsString);
        if (!isNaN(singlePrice)) {
          return { [singlePrice.toString()]: "pending" };
        }
        throw jsonError;
      }
    } catch (error) {
      console.warn("Failed to parse targets:", targetsString, error);
      return {};
    }
  };

  const calculateROI = (targetPrice, entryPrice, leverage, direction) => {
    if (!targetPrice || !entryPrice || !leverage) return null;
    const entry = parseFloat(entryPrice);
    const target = parseFloat(targetPrice);
    const lev = parseFloat(leverage);

    const priceChange =
      direction === "buy"
        ? ((target - entry) / entry) * 100
        : ((entry - target) / entry) * 100;

    return (priceChange * lev).toFixed(1);
  };

  const calculateStopLossROI = (stopLoss, entryPrice, leverage, direction) => {
    if (!stopLoss || !entryPrice || !leverage) return null;
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const lev = parseFloat(leverage);

    const priceChange =
      direction === "buy"
        ? ((sl - entry) / entry) * 100
        : ((entry - sl) / entry) * 100;

    return (priceChange * lev).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading">
            Trading Signals
          </h2>
          <p className="text-contrast-medium text-sm mt-1">
            {signals.length} signal{signals.length !== 1 ? "s" : ""} available
          </p>
        </div>
        {isAdmin() && (
          <button
            onClick={() => handleCreate("signal")}
            className="lego-button flex items-center space-x-2 px-4 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium"
          >
            <Plus className="h-4 w-4" />
            <span>Create Signal</span>
          </button>
        )}
      </div>

      {/* Premium Upgrade Banner */}
      {isFree() && (
        <div className="lego-card border-dark bg-[var(--color-primary)]/10 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--color-primary)]/20 rounded-lg border-light">
              <Lock className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--color-primary)] text-sm font-heading">
                Unlock Premium Features
              </h3>
              <p className="text-contrast-medium text-xs mt-1">
                Get access to ROI calculations, stop loss levels, and target
                prices.
              </p>
            </div>
            <button className="lego-button px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-lg text-xs font-medium">
              Upgrade
            </button>
          </div>
        </div>
      )}

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {signals.map((signal) => {
          const stopLossROI = calculateStopLossROI(
            signal.stop_loss,
            signal.entry_price,
            signal.leverage,
            signal.direction
          );

          return (
            <div key={signal.id} className="lego-card group">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        signal.direction === "buy"
                          ? "bg-[var(--color-accent1)]"
                          : "bg-[var(--color-secondary)]"
                      }`}
                    />
                    <span className="text-lg font-bold text-contrast-high">
                      {signal.coin}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        signal.direction === "buy"
                          ? "bg-[var(--color-accent1)]/20 text-[var(--color-accent1)] border-light"
                          : "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-light"
                      }`}
                    >
                      {signal.direction.toUpperCase()}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      signal.status
                    )}`}
                  >
                    {signal.status.toUpperCase()}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {/* Entry + Leverage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="lego-card border-light p-3 shadow-sm">
                      <div className="text-xs text-contrast-medium uppercase mb-1">
                        Entry Price
                      </div>
                      <div className="text-sm font-bold text-contrast-high">
                        ${signal.entry_price?.toLocaleString()}
                      </div>
                    </div>
                    <div className="lego-card border-light p-3 shadow-sm">
                      <div className="text-xs text-contrast-medium uppercase mb-1">
                        Leverage
                      </div>
                      <div className="text-sm font-bold text-[var(--color-primary)]">
                        {signal.leverage}x
                      </div>
                    </div>
                  </div>

                  {/* Stop Loss */}
                  <div className="lego-card border-dark p-3 bg-[var(--color-secondary)]/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-[var(--color-secondary)] uppercase">
                        Stop Loss
                      </div>
                      {stopLossROI && (
                        <span className="text-xs text-[var(--color-secondary)] font-medium">
                          {stopLossROI}% ROI
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-[var(--color-secondary)]">
                      {canViewTargets() ? (
                        signal.stop_loss
                          ? `$${signal.stop_loss.toLocaleString()}`
                          : "N/A"
                      ) : (
                        <span className="flex items-center text-contrast-medium text-sm">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Profit Targets */}
                  <div className="lego-card border-dark p-3 bg-[var(--color-accent1)]/10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xs text-[var(--color-accent1)] uppercase flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        Profit Targets
                      </div>
                      {!canViewTargets() && (
                        <span className="flex items-center text-xs text-contrast-medium">
                          <Lock className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>

                    {canViewTargets() ? (
                      <div className="space-y-2">
                        {(() => {
                          const targets = parseTargets(signal.targets);
                          const targetEntries = Object.entries(targets);

                          if (targetEntries.length === 0) {
                            return (
                              <div className="text-xs text-contrast-medium italic">
                                No targets set
                              </div>
                            );
                          }

                          return targetEntries.slice(0, 3).map(([price, status], i) => {
                            const targetROI = calculateROI(
                              price,
                              signal.entry_price,
                              signal.leverage,
                              signal.direction
                            );

                            return (
                              <div
                                key={`${price}-${i}`}
                                className="flex justify-between items-center p-2 lego-card border-light text-xs"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-contrast-medium">
                                    T{i + 1}
                                  </span>
                                  <span className="font-semibold text-contrast-high">
                                    ${parseFloat(price || 0).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {targetROI && (
                                    <span
                                      className={`px-1.5 py-0.5 rounded text-xs ${
                                        parseFloat(targetROI) > 0
                                          ? "bg-[var(--color-accent1)]/20 text-[var(--color-accent1)]"
                                          : "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]"
                                      }`}
                                    >
                                      {parseFloat(targetROI) > 0 ? "+" : ""}
                                      {targetROI}%
                                    </span>
                                  )}
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-xs ${
                                      status === "hit"
                                        ? "bg-[var(--color-accent1)]/20 text-[var(--color-accent1)]"
                                        : status === "fail"
                                        ? "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]"
                                        : "bg-[var(--color-neutral-dark)]/20 text-contrast-medium"
                                    }`}
                                  >
                                    {status === "hit" && "✓"}
                                    {status === "fail" && "✗"}
                                    {status === "pending" && "○"}
                                  </span>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {[1, 2, 3].map((_, i) => (
                          <div
                            key={i}
                            className="h-6 lego-card bg-gradient-to-r from-[var(--color-card-bg)] via-[var(--color-card-hover)] to-[var(--color-card-bg)] relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-contrast-medium">
                              T{i + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-light bg-[var(--color-card-bg)]/50 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-contrast-medium">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatDate(signal.created_at)}</span>
                  </div>

                  {isAdmin() && (
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(signal, "signal")}
                        className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded"
                        title="Edit Signal"
                      >
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(signal.id, "signal")}
                        className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 rounded"
                        title="Delete Signal"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {signals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 lego-card rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-contrast-medium" />
          </div>
          <h3 className="text-lg font-semibold text-contrast-high mb-2 font-heading">
            No signals yet
          </h3>
          <p className="text-contrast-medium text-sm mb-4">
            Trading signals will appear here once created.
          </p>
          {isAdmin() && (
            <button
              onClick={() => handleCreate("signal")}
              className="lego-button flex items-center space-x-2 px-4 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium mx-auto"
            >
              <Plus className="h-4 w-4" />
              <span>Create First Signal</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignalsList;
