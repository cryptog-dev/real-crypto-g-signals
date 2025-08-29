import React from "react";
import { FaPlusCircle, FaChartLine, FaBookOpen } from "react-icons/fa";

const AdminControls = ({ handleCreate }) => (
  <div className="rounded-xl shadow-md border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-6 transition-all duration-300 font-sans">
    <h3 className="text-2xl font-bold text-[#2D3748] dark:text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight mb-4">
      Admin Controls
    </h3>
    <p className="text-sm text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mb-4 leading-relaxed">
      You have full access to create, edit, and manage all content.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => handleCreate("blog")}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
      >
        <FaBookOpen className="h-4 w-4" />
        <span>Create Blog</span>
      </button>
      <button
        onClick={() => handleCreate("signal")}
        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-lg font-medium font-heading text-sm transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
      >
        <FaChartLine className="h-4 w-4" />
        <span>Create Signal</span>
      </button>
    </div>
  </div>
);

export default AdminControls;