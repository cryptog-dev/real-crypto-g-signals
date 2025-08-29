import React from "react";
import { Signal, Newspaper } from "lucide-react";

const UserFeatures = () => (
  <div className="bg-[#F7FAFC]/80 dark:bg-[#2D3748]/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 transition-all duration-300 font-sans">
    <h3 className="text-2xl font-bold text-[#2D3748] dark:text-[#F7FAFC] mb-6 font-heading tracking-tight">
      Your Premium Features
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="text-center p-4 bg-[#F7FAFC]/50 dark:bg-[#2D3748]/50 rounded-lg border border-[#F7E7CE]/10 hover:border-[#FFD700]/30 transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-[#1B4332] to-[#1B4332]/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <Signal className="text-[#F7FAFC]" size={28} />
        </div>
        <h4 className="font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-2 font-heading">
          Trading Signals
        </h4>
        <p className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 leading-relaxed">
          Access real-time trading signals and market opportunities
        </p>
      </div>
      <div className="text-center p-4 bg-[#F7FAFC]/50 dark:bg-[#2D3748]/50 rounded-lg border border-[#F7E7CE]/10 hover:border-[#FFD700]/30 transition-all duration-300">
        <div className="w-16 h-16 bg-gradient-to-br from-[#1B4332] to-[#1B4332]/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <Newspaper className="text-[#F7FAFC]" size={28} />
        </div>
        <h4 className="font-semibold text-[#2D3748] dark:text-[#F7FAFC] mb-2 font-heading">
          Market Analysis
        </h4>
        <p className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 leading-relaxed">
          Read expert insights and market analysis
        </p>
      </div>
    </div>
  </div>
);

export default UserFeatures;