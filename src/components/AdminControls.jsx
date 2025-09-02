import React from "react";
import { Plus, Settings } from "lucide-react";

const AdminControls = ({ handleCreate }) => (
  <div className="lego-card rounded-xl p-6 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] relative overflow-hidden transition-all duration-300">
    {/* Decorative corner accents */}
    <div className="absolute top-2 right-2 w-5 h-5 bg-[var(--color-primary)]/20 rounded-full border border-[var(--color-border-light)]"></div>
    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-secondary)]/20 rounded-full border border-[var(--color-border-light)]"></div>

    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-border-light)]">
          <Settings className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h3 className="text-xl font-semibold text-contrast-high font-[Outfit]">
          Control Your Market
        </h3>
      </div>
      <span className="text-xs px-3 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full border border-[var(--color-border-light)] font-medium font-sans">
        Admin Panel
      </span>
    </div>

    <p className="text-sm text-contrast-medium mb-6 font-sans">
      Shape the market. Create signals and insights now.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={() => handleCreate("blog")}
        className="lego-button flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-[var(--color-accent1)] text-white rounded-lg font-medium font-sans"
      >
        <Plus className="h-4 w-4" />
        <span>New Market Insight</span>
      </button>

      <button
        onClick={() => handleCreate("signal")}
        className="lego-button flex items-center justify-center space-x-2 px-4 py-3 text-sm bg-[var(--color-secondary)] text-white rounded-lg font-medium font-sans"
      >
        <Plus className="h-4 w-4" />
        <span>New Trade Signal</span>
      </button>
    </div>

    {/* Decorative background elements */}
    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
    <div className="absolute -top-4 -left-4 w-14 h-14 bg-[var(--color-secondary)]/10 rounded-full blur-md"></div>
  </div>
);

export default AdminControls;