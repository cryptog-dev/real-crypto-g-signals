import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';

const AdminQuickActions = ({ handleCreate }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button
          onClick={() => handleCreate("blog")}
          className="flex items-center justify-center space-x-2"
        >
          <Plus size={18} />
          <span>Create New Blog</span>
        </Button>
        <Button
          onClick={() => handleCreate("signal")}
          variant="secondary"
          className="flex items-center justify-center space-x-2"
        >
          <Plus size={18} />
          <span>Create New Signal</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminQuickActions;