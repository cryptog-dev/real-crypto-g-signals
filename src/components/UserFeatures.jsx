// UserFeatures.jsx
// Extracted from ProductApp.jsx
import React from "react";
import { Signal, Newspaper } from "lucide-react";

const UserFeatures = () => (
  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Signal className="text-white" size={28} />
        </div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Trading Signals</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">Access real-time trading signals and market opportunities</p>
      </div>
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Newspaper className="text-white" size={28} />
        </div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Market Analysis</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">Read expert insights and market analysis</p>
      </div>
    </div>
  </div>
);

export default UserFeatures;
