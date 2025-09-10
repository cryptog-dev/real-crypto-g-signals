import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Edit3, Trash2, Clock, TrendingUp, Lock, Target, Filter, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as htmlToImage from "html-to-image";

const SignalsList = ({ signals, isAdmin, isFree, handleCreate, handleEdit, handleDelete, getStatusColor, formatDate, isPremium }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    status: searchParams.get("status")?.toLowerCase() || "all",
    direction: "all",
    coin: "all",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // NEW: refs map for cards
  const cardRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const currentStatus = searchParams.get("status")?.toLowerCase() || "all";
    if (currentStatus !== filters.status) {
      setFilters((prev) => ({ ...prev, status: currentStatus }));
    }
  }, [searchParams]);

  const filteredSignals = signals.filter((signal) => {
    const matchesStatus = filters.status === "all" || signal.status.toLowerCase() === filters.status.toLowerCase();
    const matchesDirection = filters.direction === "all" || signal.direction.toLowerCase() === filters.direction.toLowerCase();
    const matchesCoin = filters.coin === "all" || signal.coin.toLowerCase() === filters.coin.toLowerCase();
    return matchesStatus && matchesDirection && matchesCoin;
  });

  const uniqueCoins = [...new Set(signals.map((signal) => signal.coin))].sort();

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [type]: value };
      if (type === "status") {
        if (value === "all") {
          setSearchParams({});
        } else {
          setSearchParams({ status: value });
        }
      }
      return newFilters;
    });
    setIsDropdownOpen(false);
  };

  const clearFilters = () => {
    setFilters({ status: "all", direction: "all", coin: "all" });
    setSearchParams({});
  };

  const activeFilterCount = Object.values(filters).filter((value) => value !== "all").length;
  const canViewTargets = () => isPremium() || isAdmin();

  /* ---------- Parsing / ROI helpers (unchanged) ---------- */
  const parseTargets = (targetsString, direction = 'buy') => {
    if (!targetsString) return [];
    try {
      let targets = [];
      if (typeof targetsString === "object" && targetsString !== null) {
        targets = Object.entries(targetsString).map(([price, status], index) => ({
          label: `T${index + 1}`,
          price: price,
          status: status || "pending",
          numericPrice: parseFloat(price) || 0
        }));
      } else if (typeof targetsString === "string") {
        try {
          const parsed = JSON.parse(targetsString);
          if (typeof parsed === "object" && !Array.isArray(parsed) && parsed !== null) {
            targets = Object.entries(parsed).map(([price, status], index) => ({
              label: `T${index + 1}`,
              price: price,
              status: status || "pending",
              numericPrice: parseFloat(price) || 0
            }));
          }
        } catch (jsonError) {
          if (targetsString.includes(",")) {
            targets = targetsString
              .split(",")
              .map(price => price.trim())
              .filter(price => price)
              .map((price, index) => ({
                label: `T${index + 1}`,
                price: price,
                status: "pending",
                numericPrice: parseFloat(price) || 0
              }));
          } else if (targetsString.trim()) {
            targets = [{
              label: "T1",
              price: targetsString.trim(),
              status: "pending",
              numericPrice: parseFloat(targetsString.trim()) || 0
            }];
          }
        }
      }
      const sortedTargets = [...targets].sort((a, b) => {
        return direction === 'buy' 
          ? a.numericPrice - b.numericPrice
          : b.numericPrice - a.numericPrice;
      });
      return sortedTargets.map((target, index) => ({ ...target, label: `T${index + 1}`}));
    } catch (error) {
      console.warn("Failed to parse targets:", targetsString, error);
      return [];
    }
  };

  const getResultText = (signal) => {
    const targets = parseTargets(signal.targets);
    const hitTargets = targets.filter((t) => t.status === "hit");
    const failedTargets = targets.filter((t) => t.status === "fail");
    const allHit = targets.length > 0 && hitTargets.length === targets.length;
    const hasStopLoss = signal.stop_loss && parseFloat(signal.stop_loss) > 0;

    if (signal.status === "success" && allHit) {
      return { text: "All Targets Hit", color: "text-[var(--color-accent1)]" };
    } else if (signal.status === "success" && hitTargets.length > 0) {
      const hitTargetLabels = targets.filter((t) => t.status === "hit").map((t) => t.label);
      return { text: `${hitTargetLabels.join(", ")} Hit`, color: "text-[var(--color-accent1)]" };
    } else if (signal.status === "fail" && hasStopLoss) {
      return { text: "Stop Loss Hit", color: "text-[var(--color-secondary)]" };
    } else if (hitTargets.length > 0 && signal.status === "pending") {
      const hitTargetLabels = targets.filter((t) => t.status === "hit").map((t) => t.label);
      return { text: `${hitTargetLabels.join(", ")} Hit`, color: "text-[var(--color-accent1)]" };
    } else {
      return { text: "Awaiting Result", color: "text-[var(--color-text-secondary)]" };
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

  /* ---------- NEW: download logic ---------- */
  const handleDownload = async (id) => {
    const node = cardRefs.current[id];
    if (node) {
      try {
        // detect background color of the card
        const computedStyle = getComputedStyle(node);
        const bgColor = computedStyle.backgroundColor || "#000000"; // fallback for dark mode
  
        const dataUrl = await htmlToImage.toPng(node, {
          quality: 1,
          cacheBust: true,
          useCORS: true,
          backgroundColor: bgColor, // match card’s actual background
        });
  
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `signal-${id}.png`;
        link.click();
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading">
            Trading Signals
          </h2>
          <p className="text-contrast-medium text-xs sm:text-sm mt-1">
            {filteredSignals.length} signal{filteredSignals.length !== 1 ? "s" : ""} available
            {activeFilterCount > 0 && ` (filtered by ${activeFilterCount} ${activeFilterCount === 1 ? "filter" : "filters"})`}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Custom Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="lego-button flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-light hover:border-hover bg-[var(--color-card-bg)] rounded-lg text-xs sm:text-sm text-contrast-high focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              aria-label="Filter signals"
              aria-expanded={isDropdownOpen}
              aria-controls="filter-dropdown"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-primary)]" />
              <span>Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}</span>
            </motion.button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  id="filter-dropdown"
                  className="absolute top-full left-0 sm:right-0 mt-2 w-full max-w-[90vw] sm:w-64 min-w-[200px] bg-[var(--color-card-bg)] lego-card border border-light rounded-lg shadow-lg z-60 p-3 sm:p-4 overflow-x-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-4">
                    {/* Status Filter */}
                    <div>
                      <label className="text-xs font-medium text-contrast-high font-sans mb-1 block">
                        Status
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["all", "pending", "success", "fail"].map((status) => (
                          <motion.button
                            key={status}
                            onClick={() => handleFilterChange("status", status)}
                            className={`lego-button py-1.5 px-2 text-xs rounded-md text-contrast-high ${
                              filters.status === status
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-[var(--color-card-bg)] hover:bg-[var(--color-card-hover)] border border-light"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    {/* Direction Filter */}
                    <div>
                      <label className="text-xs font-medium text-contrast-high font-sans mb-1 block">
                        Direction
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["all", "buy", "sell"].map((dir) => (
                          <motion.button
                            key={dir}
                            onClick={() => handleFilterChange("direction", dir)}
                            className={`lego-button py-1.5 px-2 text-xs rounded-md text-contrast-high ${
                              filters.direction === dir
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-[var(--color-card-bg)] hover:bg-[var(--color-card-hover)] border border-light"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {dir.charAt(0).toUpperCase() + dir.slice(1)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    {/* Coin Filter */}
                    <div>
                      <label className="text-xs font-medium text-contrast-high font-sans mb-1 block">
                        Coin
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["all", ...uniqueCoins].slice(0, 6).map((coin) => (
                          <motion.button
                            key={coin}
                            onClick={() => handleFilterChange("coin", coin)}
                            className={`lego-button py-1.5 px-2 text-xs rounded-md text-contrast-high ${
                              filters.coin === coin
                                ? "bg-[var(--color-primary)] text-white"
                                : "bg-[var(--color-card-bg)] hover:bg-[var(--color-card-hover)] border border-light"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {coin.charAt(0).toUpperCase() + coin.slice(1)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    {/* Clear Filters */}
                    {activeFilterCount > 0 && (
                      <motion.button
                        onClick={clearFilters}
                        className="lego-button w-full py-1.5 px-3 text-xs sm:text-sm bg-[var(--color-secondary)] text-white rounded-md hover:bg-[var(--color-secondary)]/90"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="h-4 w-4 inline mr-1" />
                        Clear Filters
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isAdmin() && (
            <motion.button
              onClick={() => handleCreate("signal")}
              className="lego-button flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium whitespace-nowrap text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Create Signal</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {Object.entries(filters).map(([key, value]) =>
            value !== "all" ? (
              <span
                key={key}
                className="flex items-center px-2 py-1 text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value.charAt(0).toUpperCase() + value.slice(1)}
                <button
                  onClick={() => handleFilterChange(key, "all")}
                  className="ml-1.5 focus:outline-none"
                  aria-label={`Remove ${key} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ) : null
          )}
        </motion.div>
      )}

      {/* Premium Upgrade Banner */}
      {isFree() && (
        <div className="lego-card border-dark bg-[var(--color-primary)]/10 p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--color-primary)]/20 rounded-lg border-light">
              <Lock className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--color-primary)] text-xs sm:text-sm font-heading">
                Unlock Premium Features
              </h3>
              <p className="text-contrast-medium text-xs mt-1">
                Get access to ROI calculations, stop loss levels, and target prices.
              </p>
            </div>
            <motion.button
              className="lego-button px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-lg text-xs font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upgrade
            </motion.button>
          </div>
        </div>
      )}

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredSignals.map((signal) => {
          const stopLossROI = calculateStopLossROI(
            signal.stop_loss,
            signal.entry_price,
            signal.leverage,
            signal.direction
          );
          const result = getResultText(signal);

          return (
            <div
              key={signal.id}
              id={`signal-card-${signal.id}`}
              ref={(el) => (cardRefs.current[signal.id] = el)} // store ref
              className="lego-card group"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${signal.direction === "buy" ? "bg-[var(--color-accent1)]" : "bg-[var(--color-secondary)]"}`}
                    />
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[var(--color-border-light)] shadow-sm">
                      <img
                        src={`/assets/${signal.coin.toLowerCase()}.svg`}
                        alt={`${signal.coin} icon`}
                        className="w-5 h-5 object-contain"
                        onError={(e) => { e.currentTarget.src = "/assets/default.png"; }}
                        crossOrigin="anonymous" // <--- important for html-to-image
                      />
                    </div>
                    <span className="text-lg font-bold text-contrast-high">{signal.coin}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${signal.direction === "buy" ? "bg-[var(--color-accent1)]/20 text-[var(--color-accent1)] border-light" : "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] border-light"}`}>
                      {signal.direction.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(signal.status)}`}>
                      {signal.status.toUpperCase()}
                    </span>
                    <motion.span className={`text-xs font-sans ${result.color}`} aria-label={`Result: ${result.text}`} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                      {result.text}
                    </motion.span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {/* Entry + Leverage */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="lego-card border-light p-3 shadow-sm">
                      <div className="text-xs text-contrast-medium uppercase mb-1">Entry Price</div>
                      <div className="text-sm font-bold text-contrast-high">${signal.entry_price?.toLocaleString()}</div>
                    </div>
                    <div className="lego-card border-light p-3 shadow-sm">
                      <div className="text-xs text-contrast-medium uppercase mb-1">Leverage</div>
                      <div className="text-sm font-bold text-[var(--color-primary)]">{signal.leverage}x</div>
                    </div>
                  </div>

                  {/* Stop Loss */}
                  <div className="lego-card border-dark p-3 bg-[var(--color-secondary)]/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-[var(--color-secondary)] uppercase">Stop Loss</div>
                      {stopLossROI && <span className="text-xs text-[var(--color-secondary)] font-medium">{stopLossROI}% ROI</span>}
                    </div>
                    <div className="text-sm font-bold text-[var(--color-secondary)]">
                      {canViewTargets() ? (signal.stop_loss ? `$${signal.stop_loss.toLocaleString()}` : "N/A") : (<span className="flex items-center text-contrast-medium text-xs"><Lock className="w-3 h-3 mr-1" />Premium</span>)}
                    </div>
                  </div>

                  {/* Profit Targets */}
                  <div className="lego-card border-dark p-3 bg-[var(--color-accent1)]/10">
                    <div className="flex justify-between items-center mb-3">
                      <div className="text-xs text-[var(--color-accent1)] uppercase flex items-center"><Target className="w-3 h-3 mr-1" />Profit Targets</div>
                      {!canViewTargets() && (<span className="flex items-center text-xs text-contrast-medium"><Lock className="w-3 h-3 mr-1" />Premium</span>)}
                    </div>

                    {canViewTargets() ? (
                      <div className="space-y-2">
                        {(() => {
                          const targets = parseTargets(signal.targets, signal.direction);
                          if (targets.length === 0) {
                            return (<div className="text-xs text-contrast-medium italic">No targets set</div>);
                          }
                          return targets.slice(0, 3).map(({ label, price, status }, i) => {
                            const targetROI = calculateROI(price, signal.entry_price, signal.leverage, signal.direction);
                            return (
                              <div key={`${price}-${i}`} className="flex justify-between items-center p-2 lego-card border-light text-xs">
                                <div className="flex items-center space-x-2">
                                  <span className="text-contrast-medium">{label}</span>
                                  <span className="font-semibold text-contrast-high">${parseFloat(price || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {targetROI && (<span className={`px-1.5 py-0.5 rounded text-xs ${parseFloat(targetROI) > 0 ? "bg-[var(--color-accent1)]/20 text-[var(--color-accent1)]" : "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]"}`}>{parseFloat(targetROI) > 0 ? "+" : ""}{targetROI}%</span>)}
                                  <span className={`px-1.5 py-0.5 rounded text-xs ${status === "hit" ? "bg-[var(--color-accent1)]/20 text-[var(--color-accent1)]" : status === "fail" ? "bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]" : "bg-[var(--color-neutral-dark)]/20 text-contrast-medium"}`}>
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
                          <div key={i} className="h-6 lego-card bg-gradient-to-r from-[var(--color-card-bg)] via-[var(--color-card-hover)] to-[var(--color-card-bg)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-contrast-medium">T{i + 1}</div>
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
                      {/* DOWNLOAD */}
                      <motion.button
                        onClick={() => handleDownload(signal.id, `signal-${signal.coin}-${signal.id}.png`)}
                        className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded"
                        title="Download Signal Card as image"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="h-3 w-3" />
                      </motion.button>

                      <motion.button onClick={() => handleEdit(signal, "signal")} className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded" title="Edit Signal" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Edit3 className="h-3 w-3" />
                      </motion.button>
                      <motion.button onClick={() => handleDelete(signal.id, "signal")} className="lego-button p-1.5 text-contrast-medium hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 rounded" title="Delete Signal" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Trash2 className="h-3 w-3" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSignals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 lego-card rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-contrast-medium" />
          </div>
          <h3 className="text-lg font-semibold text-contrast-high mb-2 font-heading">No signals yet</h3>
          <p className="text-contrast-medium text-xs sm:text-sm mb-4">Trading signals will appear here once created.</p>
          {isAdmin() && (
            <motion.button onClick={() => handleCreate("signal")} className="lego-button flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium mx-auto text-xs sm:text-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Create First Signal</span>
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignalsList;
