// AdminControls.jsx
import React from "react";
import { Shield, FileText, Activity } from "lucide-react";

const AdminControls = ({ handleCreate }) => (
  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700">
    {/* Header */}
    <div className="flex items-center space-x-2 mb-4">
      <Shield className="h-4 w-4 text-amber-500" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Admin Controls
      </h3>
    </div>

    {/* Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={() => handleCreate("blog")}
        className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm rounded-lg border border-gray-200/60 dark:border-gray-600/50 bg-gray-50 text-gray-800 dark:bg-gray-700/50 dark:text-gray-100 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:text-white transition-all font-medium"
      >
        <FileText className="h-4 w-4" />
        <span>Create Blog</span>
      </button>

      <button
        onClick={() => handleCreate("signal")}
        className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm rounded-lg border border-gray-200/60 dark:border-gray-600/50 bg-gray-50 text-gray-800 dark:bg-gray-700/50 dark:text-gray-100 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-600 hover:text-white transition-all font-medium"
      >
        <Activity className="h-4 w-4" />
        <span>Create Signal</span>
      </button>
    </div>
  </div>
);

export default AdminControls;