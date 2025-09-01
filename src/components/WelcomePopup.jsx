import React from "react";
import { X } from "lucide-react";

const WelcomePopup = ({ username, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="relative bg-[var(--color-card-bg)] rounded-xl p-6 border-4 border-[var(--color-primary)]/20 max-w-md w-full shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-secondary)] rounded transition-colors"
        >
          <X size={18} />
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 font-heading">
            <span className="text-[var(--color-text-primary)]">Welcome, </span>
            <span className="text-[var(--color-primary)]">{username}</span>
            <span className="text-[var(--color-secondary)]">!</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] text-sm mb-4">
            Access your personalized crypto trading dashboard with real-time signals and market analysis.
          </p>
          <button
            onClick={onClose}
            className="lego-button px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium transition-all duration-200 border-b-4 border-[var(--color-primary-dark)] hover:border-b-2 hover:mt-0.5"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;