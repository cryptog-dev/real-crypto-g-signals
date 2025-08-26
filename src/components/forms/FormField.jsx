import React from 'react';

const FormField = ({
  label,
  error,
  required = false,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {error && <span className="text-red-500 ml-2">- {error}</span>}
        </label>
      )}
      {children}
    </div>
  );
};

export default FormField;