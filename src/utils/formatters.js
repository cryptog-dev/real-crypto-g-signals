export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  
  return new Date(dateString).toLocaleDateString("en-US", {
    ...defaultOptions,
    ...options
  });
};

export const formatPrice = (price, currency = 'USD') => {
  if (!price) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

export const formatPercentage = (value) => {
  if (!value) return '0%';
  return `${Math.round(value)}%`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};