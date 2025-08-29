import { SIGNAL_STATUS } from '../constants';

export const getStatusColor = (status) => {
  switch (status) {
    case SIGNAL_STATUS.SUCCESS:
      return "text-success-green bg-success-green/10 dark:bg-success-green/20 dark:text-success-green border border-success-green/20";
    case SIGNAL_STATUS.FAIL:
      return "text-warning-red bg-warning-red/10 dark:bg-warning-red/20 dark:text-warning-red border border-warning-red/20";
    case SIGNAL_STATUS.PENDING:
      return "text-rich-gold-600 bg-rich-gold/10 dark:bg-rich-gold/20 dark:text-rich-gold-400 border border-rich-gold/20";
    default:
      return "text-charcoal/70 bg-champagne-100 dark:bg-forest-green-700 dark:text-champagne-400 border border-champagne-200 dark:border-forest-green-600";
  }
};

export const getDirectionColor = (direction) => {
  return direction === 'long' ? 'text-success-green' : 'text-warning-red';
};

export const getDirectionIcon = (direction) => {
  return direction === 'long' ? '▲' : '▼';
};