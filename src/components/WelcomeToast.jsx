import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeToast = ({ username, onClose, isVisible, duration = 5000 }) => {
  const { themeName } = useTheme();
  const [progress, setProgress] = useState(100);

  // Auto-dismiss + progress
  useEffect(() => {
    if (!isVisible) return;

    setProgress(100);
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(percent);

      if (elapsed >= duration) {
        clearInterval(timer);
        onClose();
      }
    }, 50);

    return () => clearInterval(timer);
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-[100] w-80"
        >
          <div className="relative lego-card rounded-xl p-5 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] shadow-lg transition-all duration-300">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 text-contrast-medium hover:text-[var(--color-secondary)] rounded transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div>
              <h1 className="text-lg font-bold mb-2 font-[Outfit]">
                <span className="text-contrast-high">Welcome, </span>
                <span className="text-[var(--color-primary)]">
                  {username || "Trader"}
                </span>
                <span className="text-[var(--color-secondary)]">!</span>
              </h1>
              <p className="text-contrast-medium text-sm mb-4 font-sans">
                Launch your trading journey with{" "}
                <span className="text-[var(--color-primary)] font-medium">
                  real-time signals
                </span>{" "}
                and expert market insights in{" "}
                <span className="capitalize">{themeName}</span> mode.
              </p>
              <button
                onClick={onClose}
                className="lego-button px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium font-sans hover:bg-[var(--color-primary)]/90 transition-colors duration-200"
              >
                Start Trading Now
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-border-light)] overflow-hidden rounded-b-lg">
              <motion.div
                className="h-full bg-[var(--color-primary)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Decorative Glow */}
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[var(--color-accent1)]/20 rounded-full blur-md"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeToast;
