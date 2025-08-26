import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { getStatusColor } from '../../utils/statusHelpers';

const AdminSignalManagement = ({ 
  signals, 
  handleCreate, 
  handleEdit, 
  handleDelete, 
  formatDate 
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Signal Management
        </h2>
        <Button
          onClick={() => handleCreate("signal")}
          variant="secondary"
          className="flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Create Signal</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transform transition-all hover:scale-105"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {signal.coin}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      signal.direction === "long"
                        ? "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                        : "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {signal.direction}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Entry Price:
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        ${signal.entry_price?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Leverage:
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {signal.leverage || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          signal.status
                        )}`}
                      >
                        {signal.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatDate(signal.created_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleEdit(signal, "signal")}
                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Edit Signal"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(signal.id, "signal")}
                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete Signal"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSignalManagement;