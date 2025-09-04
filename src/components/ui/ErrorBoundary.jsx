
import React, { useContext } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          className="min-h-screen flex items-center justify-center bg-[var(--color-background)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="lego-card w-full max-w-[90vw] sm:max-w-md p-6 sm:p-8 text-center border-light bg-[var(--color-card-bg)] shadow-lg rounded-lg z-60"
            role="alert"
            aria-live="assertive"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-[var(--color-secondary)] mb-4" />
              <h1 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] font-heading mb-2">
                Something Went Wrong
              </h1>
              <p className="text-xs text-[var(--color-text-secondary)] font-sans mb-6">
                We're sorry, but an unexpected error occurred. Please try reloading the page.
              </p>
              <motion.button
                onClick={() => window.location.reload()}
                className="lego-button inline-flex items-center px-4 sm:px-6 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white rounded-md text-xs sm:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                aria-label="Reload the page"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload Page
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;