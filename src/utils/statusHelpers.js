import { SIGNAL_STATUS } from '../constants';

export const getStatusColor = (status) => {
  switch (status) {
    case SIGNAL_STATUS.SUCCESS:
      return "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400";
    case SIGNAL_STATUS.FAIL:
      return "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400";
    case SIGNAL_STATUS.PENDING:
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400";
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400";
  }
};

export const getDirectionColor = (direction) => {
  return direction === 'long' ? 'text-green-500' : 'text-red-500';
};

export const getDirectionIcon = (direction) => {
  return direction === 'long' ? '▲' : '▼';
};