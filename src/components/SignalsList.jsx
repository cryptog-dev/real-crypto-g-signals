// SignalsList.jsx
// Extracted from ProductApp.jsx
import React from "react";

const SignalsList = ({ signals, isAdmin, isFree, handleCreate, handleEdit, handleDelete, getStatusColor, formatDate, isPremium }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Trading Signals</h2>
      {isAdmin() && (
        <button onClick={() => handleCreate("signal")} className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105">
          Create Signal
        </button>
      )}
    </div>
    {isFree() && (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <span className="text-yellow-600 dark:text-yellow-400 mr-3">★</span>
          <div>
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Upgrade to Premium</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">Get access to stop loss levels, target prices, and advanced trading features.</p>
          </div>
        </div>
      </div>
    )}
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {signals.map((signal) => (
        <div key={signal.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className={signal.direction === "long" ? "text-green-500" : "text-red-500"}>▲</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{signal.coin}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(signal.status)}`}>{signal.status}</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Entry Price:</span>
              <span className="font-semibold text-gray-900 dark:text-white">${signal.entry_price?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Leverage:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{signal.leverage}x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Stop Loss:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {isPremium() ? `$${signal.stop_loss?.toLocaleString()}` : <span className="flex items-center text-gray-500">★ 🔒 Premium</span>}
              </span>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 dark:text-gray-400">Targets:</span>
                {!isPremium() && <span className="text-xs text-gray-500 flex items-center">★ Premium</span>}
              </div>
              {isPremium() ? (
                <div className="space-y-1">
                  {signal.targets && Object.entries(JSON.parse(signal.targets)).map(([price, status]) => (
                    <div key={price} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-300">${parseFloat(price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${status === 'hit' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : status === 'fail' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 opacity-50"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <span>{formatDate(signal.created_at)}</span>
              </div>
            </div>
          </div>
          {isAdmin() && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
              <button onClick={() => handleEdit(signal, "signal")} className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Edit</button>
              <button onClick={() => handleDelete(signal.id, "signal")} className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default SignalsList;
