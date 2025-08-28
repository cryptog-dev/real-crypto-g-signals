// SignalsList.jsx
// Enhanced version with improved UI and admin target visibility
import React from "react";

const SignalsList = ({ signals, isAdmin, isFree, handleCreate, handleEdit, handleDelete, getStatusColor, formatDate, isPremium }) => {
  // Check if user should see targets (premium users or admins)
  const canViewTargets = () => isPremium() || isAdmin();
  
  // Safe targets parsing function - handles both JSON and comma-separated formats
  const parseTargets = (targetsString) => {
    if (!targetsString) return {};
    
    try {
      // If it's already an object, return as is
      if (typeof targetsString === 'object') return targetsString;
      
      // Try JSON parsing first
      try {
        return JSON.parse(targetsString);
      } catch (jsonError) {
        // If JSON parsing fails, try comma-separated format
        if (typeof targetsString === 'string' && targetsString.includes(',')) {
          const targets = {};
          const prices = targetsString.split(',').map(price => price.trim()).filter(price => price);
          
          prices.forEach((price, index) => {
            // Convert to number and back to string to normalize format
            const normalizedPrice = parseFloat(price);
            if (!isNaN(normalizedPrice)) {
              targets[normalizedPrice.toString()] = 'pending';
            }
          });
          
          return targets;
        }
        
        // If it's a single price
        const singlePrice = parseFloat(targetsString);
        if (!isNaN(singlePrice)) {
          return { [singlePrice.toString()]: 'pending' };
        }
        
        throw jsonError; // Re-throw if none of the above work
      }
    } catch (error) {
      console.warn('Failed to parse targets:', targetsString, error);
      return {};
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-yellow-500 to-green-700 bg-clip-text text-transparent">
            Trading Signals
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {signals.length} signal{signals.length !== 1 ? 's' : ''} available
          </p>
        </div>
        {isAdmin() && (
          <button 
            onClick={() => handleCreate("signal")} 
            className="group flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Signal
          </button>
        )}
      </div>

      {/* Premium Upgrade Banner */}
      {isFree() && (
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-yellow-200/30 dark:bg-yellow-700/30 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-12 h-12 bg-orange-200/30 dark:bg-orange-700/30 rounded-full"></div>
          <div className="relative flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                Unlock Premium Features
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                Get access to stop loss levels, detailed target prices, risk management tools, and advanced trading insights.
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg font-medium transition-all transform hover:scale-105">
                Upgrade Now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <div 
            key={signal.id} 
            className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            {/* Signal Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${signal.direction === "buy" ? "bg-green-500" : "bg-red-500"} animate-pulse`}></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{signal.coin}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      signal.direction === "buy" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {signal.direction.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(signal.status)} shadow-sm`}>
                  {signal.status}
                </span>
              </div>

              {/* Signal Details */}
              <div className="space-y-4">
                {/* Entry Price & Leverage */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Entry Price</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ${signal.entry_price?.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Leverage</div>
                    <div className="text-lg font-bold text-transparent bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text">
                      {signal.leverage}x
                    </div>
                  </div>
                </div>

                {/* Stop Loss */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">Stop Loss</div>
                      <div className="font-bold text-red-700 dark:text-red-300">
                        {canViewTargets() ? (
                          signal.stop_loss ? `${signal.stop_loss.toLocaleString()}` : 'N/A'
                        ) : (
                          <span className="flex items-center text-gray-500">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Premium
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-red-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Targets */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs text-green-600 dark:text-green-400 uppercase tracking-wide">Profit Targets</div>
                    {!canViewTargets() && (
                      <span className="flex items-center text-xs text-gray-500">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                              No targets set
                            </div>
                          );
                        }
                        
                        return targetEntries.map(([price, status], index) => (
                          <div key={`${price}-${index}`} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">T{index + 1}</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                ${parseFloat(price || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                              </span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              status === 'hit' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : status === 'fail' 
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {status === 'hit' && '✓'} {status === 'fail' && '✗'} {status === 'pending' && '○'}
                              {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
                            </span>
                          </div>
                        ));
                      })()}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">T{index + 1}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatDate(signal.created_at)}</span>
                </div>
                
                {isAdmin() && (
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(signal, "signal")} 
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Edit Signal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(signal.id, "signal")} 
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete Signal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {signals.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No signals yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Trading signals will appear here once created.</p>
          {isAdmin() && (
            <button 
              onClick={() => handleCreate("signal")} 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105"
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