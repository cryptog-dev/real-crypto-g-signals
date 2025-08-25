import React, { useState, useEffect, useContext } from "react";
import {
  TrendingUp,
  TrendingDown,
  Lock,
  Calendar,
  User,
  Plus,
  Edit,
  Trash2,
  Crown,
} from "lucide-react";
import { signalsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const SignalsSection = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAdmin, isPremium, isFree } = useAuth();
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      setLoading(true);
      const response = await signalsAPI.getAll();
      setSignals(response.data);
    } catch (error) {
      setError("Failed to load signals");
      console.error("Error fetching signals:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
      case "fail":
        return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  const getDirectionIcon = (direction) => {
    return direction === "long" ? (
      <TrendingUp className="text-green-500" size={20} />
    ) : (
      <TrendingDown className="text-red-500" size={20} />
    );
  };

  const renderTargets = (targets, userRole) => {
    if (userRole === "free") {
      return (
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Lock size={16} className="mr-2" />
          <span className="text-sm">🔒 Upgrade to Premium</span>
        </div>
      );
    }

    if (typeof targets === "string") {
      try {
        targets = JSON.parse(targets);
      } catch (e) {
        return <span className="text-sm text-gray-500">Invalid targets</span>;
      }
    }

    return (
      <div className="space-y-1">
        {Object.entries(targets).map(([price, status]) => (
          <div
            key={price}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-600 dark:text-gray-400">${price}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading signals...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      id="signals"
    >
      <div className="absolute top-20 right-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trading Signals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get real-time trading signals from our expert analysts. Premium
            users get full access to all signal details.
          </p>

          {isFree() && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center justify-center">
                <Crown
                  size={20}
                  className="text-yellow-600 dark:text-yellow-400 mr-2"
                />
                <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                  Upgrade to Premium for full signal access
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {signals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <TrendingUp size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No signals available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {isAdmin()
                ? "Create your first trading signal to get started!"
                : "Check back soon for new trading opportunities."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                } transform transition-all hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getDirectionIcon(signal.direction)}
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {signal.coin}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      signal.status
                    )}`}
                  >
                    {signal.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Entry Price:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${signal.entry_price?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Leverage:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {signal.leverage}x
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Stop Loss:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isFree() ? (
                        <span className="flex items-center text-gray-500">
                          <Lock size={14} className="mr-1" />
                          🔒 Premium
                        </span>
                      ) : (
                        `$${signal.stop_loss?.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 block mb-2">
                      Targets:
                    </span>
                    {renderTargets(signal.targets, user?.role)}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{signal.created_by?.username || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(signal.created_at)}</span>
                    </div>
                  </div>
                </div>

                {isAdmin() && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {isAdmin() && (
          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all hover:shadow-lg">
              <Plus size={20} className="mr-2" />
              Create New Signal
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignalsSection;
