// UserFeatures.jsx
// Extracted from ProductApp.jsx
import React from "react";
import { Signal, Newspaper } from "lucide-react";

const UserFeatures = () => (
  <div className="bg-white/90 dark:bg-forest-green-800/80 backdrop-blur-luxury rounded-luxury shadow-luxury p-8 border border-champagne-200 dark:border-forest-green-700 hover:shadow-gold transition-all duration-300">
    <h3 className="text-2xl font-bold text-charcoal dark:text-champagne-100 mb-6 font-heading">Your Features</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-gradient-to-br from-forest-green-500 to-forest-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-forest">
          <Signal className="text-white" size={28} />
        </div>
        <h4 className="font-semibold text-charcoal dark:text-champagne-100 mb-2 font-heading">Trading Signals</h4>
        <p className="text-sm text-charcoal/70 dark:text-champagne-400 font-body">Access real-time trading signals and market opportunities</p>
      </div>
      <div className="text-center p-4">
        <div className="w-16 h-16 bg-gradient-to-br from-rich-gold-500 to-rich-gold-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-gold">
          <Newspaper className="text-charcoal" size={28} />
        </div>
        <h4 className="font-semibold text-charcoal dark:text-champagne-100 mb-2 font-heading">Market Analysis</h4>
        <p className="text-sm text-charcoal/70 dark:text-champagne-400 font-body">Read expert insights and market analysis</p>
      </div>
    </div>
  </div>
);

export default UserFeatures;
