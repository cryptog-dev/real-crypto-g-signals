import React from 'react';

const Input = ({
  type = 'text',
  error,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:text-white';
  const errorClasses = error 
    ? 'border-red-400 focus:ring-red-400' 
    : 'border-gray-300 dark:border-gray-600 focus:ring-green-500';

  return (
    <input
      type={type}
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  );
};

export default Input;