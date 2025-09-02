import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--color-accent1)] to-[var(--color-secondary)] bg-clip-text text-transparent font-[Outfit]">
            About CryptoG Signals
          </h1>
          <p className="text-contrast-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans">
            Learn about our mission to empower traders with cutting-edge tools and a supportive community.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lego-card p-6 bg-[var(--color-card-bg)] border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300"
          >
            <Users className="h-8 w-8 text-[var(--color-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-contrast-high font-[Outfit] mb-2">Our Team</h3>
            <p className="text-contrast-medium text-sm font-sans">
              A dedicated group of traders, developers, and analysts passionate about crypto.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lego-card p-6 bg-[var(--color-card-bg)] border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300"
          >
            <Target className="h-8 w-8 text-[var(--color-positive)] mb-4" />
            <h3 className="text-lg font-semibold text-contrast-high font-[Outfit] mb-2">Our Mission</h3>
            <p className="text-contrast-medium text-sm font-sans">
              To provide traders with accurate signals and tools to succeed in the crypto market.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lego-card p-6 bg-[var(--color-card-bg)] border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300"
          >
            <Rocket className="h-8 w-8 text-[var(--color-accent1)] mb-4" />
            <h3 className="text-lg font-semibold text-contrast-high font-[Outfit] mb-2">Our Vision</h3>
            <p className="text-contrast-medium text-sm font-sans">
              To revolutionize crypto trading with transparency and innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;