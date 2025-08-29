import React from "react";
import { Link } from "react-router-dom";

const SignalsList = ({ signals, isAdmin, isFree, handleCreate, handleEdit, handleDelete, getStatusColor, formatDate, isPremium }) => {
  // Check if user should see targets (premium users or admins)
  const canViewTargets = () => isPremium() || isAdmin();

  // Safe targets parsing function - handles both JSON and comma-separated formats
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

  return (
    <div className="space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#2D-boundary8] dark:text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight">
            Trading Signals
          </h2>
          <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mt-2">
            {signals.length} signal{signals.length !== 1 ? "s" : ""} available
          </p>
        </div>
        {isAdmin() && (
          <button
            onClick={() => handleCreate("signal")}
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-xl font-medium font-heading transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Signal
          </button>
        )}
      </div>

      {/* Premium Upgrade Banner */}
      {isFree() && (
        <div className="relative overflow-hidden border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl p-6 transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-[#FFD700]/20 dark:bg-[#FFD700]/10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-12 h-12 bg-[#F7E7CE]/20 dark:bg-[#F7E7CE]/10 rounded-full"></div>
          <div className="relative flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFD700] to-[#F7E7CE] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1B4332]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-1 font-heading">
                Unlock Premium Features
              </h3>
              <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mb-3 leading-relaxed">
                Get access to stop loss levels, detailed target prices, risk management tools, and advanced trading insights.
              </p>
              <Link
                to="/upgrade"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#F7E7CE] hover:from-[#FFD700]/90 hover:to-[#F7E7CE]/90 text-[#1B4332] rounded-lg font-medium font-heading transition-all duration-300 transform hover:scale-105"
              >
                Upgrade Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <Link
            to={`/signal/${signal.id}`}
            key={signal.id}
            className="group rounded-2xl shadow-lg border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Signal Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      signal.direction === "buy" ? "bg-[#48BB78]" : "bg-[#F56565]"
                    } animate-pulse`}
                  ></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-[#2D3748] dark:text-[#F7FAFC] font-heading">
                      {signal.coin}
                    </span>
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        signal.direction === "buy"
                          ? "bg-[#48BB78]/10 text-[#48BB78] dark:bg-[#48BB78]/20 dark:text-[#48BB78]"
                          : "bg-[#F56565]/10 text-[#F56565] dark:bg-[#F56565]/20 dark:text-[#F56565]"
                      }`}
                    >
                      {signal.direction.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
                    signal.status
                  )} shadow-sm`}
                >
                  {signal.status}
                </span>
              </div>

              {/* Signal Details */}
              <div className="space-y-4">
                {/* Entry Price & Leverage */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg p-3 border border-[#F7E7CE]/10 hover:bg-[#F7E7CE]/10 dark:hover:bg-[#1B4332]/10">
                    <div className="text-xs text-[#2D3748]/60 dark:text-[#F7FAFC]/60 uppercase tracking-wide mb-1 font-sans">
                      Entry Price
                    </div>
                    <div className="text-lg font-bold text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                      ${signal.entry_price?.toLocaleString() || "N/A"}
                    </div>
                  </div>
                  <div className="rounded-lg p-3 border border-[#F7E7CE]/10 hover:bg-[#F7E7CE]/10 dark:hover:bg-[#1B4332]/10">
                    <div className="text-xs text-[#2D3748]/60 dark:text-[#F7FAFC]/60 uppercase tracking-wide mb-1 font-sans">
                      Leverage
                    </div>
                    <div className="text-lg font-bold text-transparent bg-gradient-to-r from-[#FFD700] via-[#F7E7CE] to-[#FFD700] bg-clip-text font-mono">
                      {signal.leverage || 0}x
                    </div>
                  </div>
                </div>

                {/* Stop Loss */}
                <div className="rounded-lg p-3 border border-[#F56565]/20 hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-[#F56565] dark:text-[#F56565] uppercase tracking-wide mb-1 font-sans">
                        Stop Loss
                      </div>
                      <div className="text-base font-bold text-[#F56565] dark:text-[#F56565] font-mono">
                        {canViewTargets() ? (
                          signal.stop_loss ? `$${signal.stop_loss.toLocaleString()}` : "N/A"
                        ) : (
                          <span className="flex items-center text-[#2D3748]/80 dark:text-[#F7FAFC]/80">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-[#F56565]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Targets */}
                <div className="rounded-lg p-3 border border-[#48BB78]/20 hover:bg-[#48BB78]/10 dark:hover:bg-[#48BB78]/10">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs text-[#48BB78] dark:text-[#48BB78] uppercase tracking-wide font-sans">
                      Profit Targets
                    </div>
                    {!canViewTargets() && (
                      <span className="flex items-center text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
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
                            <div className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 italic">
                              No targets set
                            </div>
                          );
                        }

                        return targetEntries.map(([price, status], index) => (
                          <div
                            key={`${price}-${index}`}
                            className="flex justify-between items-center p-2 rounded-lg border border-[#F7E7CE]/10 hover:bg-[#F7E7CE]/10 dark:hover:bg-[#1B4332]/10"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-sans">
                                T{index + 1}
                              </span>
                              <span className="text-base font-semibold text-[#2D3748] dark:text-[#F7FAFC] font-mono">
                                ${parseFloat(price || 0).toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-sm font-medium ${
                                status === "hit"
                                  ? "bg-[#48BB78]/10 text-[#48BB78] dark:bg-[#48BB78]/20 dark:text-[#48BB78]"
                                  : status === "fail"
                                  ? "bg-[#F56565]/10 text-[#F56565] dark:bg-[#F56565]/20 dark:text-[#F56565]"
                                  : "bg-[#F7E7CE]/10 text-[#2D3748]/80 dark:bg-[#2D3748]/20 dark:text-[#F7FAFC]/80"
                              }`}
                            >
                              {status === "hit" && "✓"}
                              {status === "fail" && "✗"}
                              {status === "pending" && "○"}
                              {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {[1, 2, 3].map((_, index) => (
                        <div
                          key={index}
                          className="h-8 rounded-lg border border-[#F7E7CE]/10 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F7FAFC]/20 dark:via-[#2D3748]/20 to-transparent animate-pulse"></div>
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80">
                            T{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#F7E7CE]/20 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 font-mono">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{formatDate(signal.created_at || new Date().toISOString())}</span>
                </div>

                {isAdmin() && (
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(signal, "signal");
                      }}
                      className="p-2 text-[#2D3748]/80 hover:text-[#1B4332] dark:text-[#F7FAFC]/80 dark:hover:text-[#FFD700] hover:bg-[#F7E7CE]/20 dark:hover:bg-[#1B4332]/20 rounded-lg transition-colors"
                      title="Edit Signal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(signal.id, "signal");
                      }}
                      className="p-2 text-[#2D3748]/80 hover:text-[#F56565] dark:text-[#F7FAFC]/80 dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-lg transition-colors"
                      title="Delete Signal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {signals.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border border-[#F7E7CE]/20">
            <svg
              className="w-12 h-12 text-[#2D3748]/80 dark:text-[#F7FAFC]/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-2 font-heading">
            No signals yet
          </h3>
          <p className="text-base text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mb-6 leading-relaxed">
            Trading signals will appear here once created.
          </p>
          {isAdmin() && (
            <button
              onClick={() => handleCreate("signal")}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-xl font-medium font-heading transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Create Your First Signal
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignalsList;