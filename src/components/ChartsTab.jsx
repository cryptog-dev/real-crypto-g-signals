import React from "react";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const chartVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
  },
};

const ChartsTab = () => {
  return (
    <motion.div
      className="space-y-6 sm:space-y-8 px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center" variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl font-bold font-[Outfit] bg-gradient-to-r from-[var(--color-accent1)] to-[var(--color-secondary)] bg-clip-text text-transparent mb-3 sm:mb-4">
          Advanced Charts
        </h2>
        <p className="text-sm sm:text-lg text-[var(--color-contrast-medium)] max-w-xl mx-auto font-sans">
          Professional trading charts and technical analysis tools coming soon.
        </p>
      </motion.div>

      {/* Chart Placeholder */}
      <motion.div
        className="lego-card bg-[var(--color-card-bg)]/95 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 md:p-12 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] transition-all duration-300 hover:scale-[1.01]"
        variants={itemVariants}
      >
        <motion.div
          className="flex flex-col items-center justify-center"
          variants={chartVariants}
          initial="initial"
          animate="animate"
        >
          {/* Static SVG Chart */}
          <svg
            className="w-full h-32 sm:h-48 md:h-64 text-[var(--color-primary)]"
            viewBox="0 0 200 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M10 80 L50 50 L90 70 L130 30 L170 60"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 80 L50 60 L90 80 L130 40 L170 70"
              stroke="var(--color-accent1)"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
          </svg>
          <BarChart2
            className="h-10 w-10 sm:h-12 sm:w-12 text-[var(--color-accent2)] mt-4"
            aria-label="Chart placeholder icon"
          />
          <p className="text-[var(--color-contrast-medium)] text-sm sm:text-base font-sans mt-4">
            Advanced charting features coming soon...
          </p>
          <motion.button
            className="lego-button mt-6 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-[var(--color-primary)] text-white rounded-lg font-medium font-sans hover:bg-[var(--color-primary)]/90 transition-all duration-200 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChartsTab;