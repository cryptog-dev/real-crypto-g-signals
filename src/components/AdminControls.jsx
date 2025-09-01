import React from "react";
import { Plus, Settings } from "lucide-react";

const AdminControls = ({ handleCreate }) => (
  <div className="bg-[var(--color-card-bg)] rounded-xl p-5 border-4 border-[var(--color-primary)]/20 relative overflow-hidden lego-button"
       style={{ boxShadow: 'var(--card-shadow)' }}>
    {/* Decorative corner studs */}
    <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--color-primary)]/20 rounded-full border-2 border-[var(--color-primary)]/30"></div>
    <div className="absolute bottom-2 left-2 w-4 h-4 bg-[var(--color-secondary)]/20 rounded-full border-2 border-[var(--color-secondary)]/30"></div>
    
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 bg-[var(--color-primary)]/10 rounded-full border-2 border-[var(--color-primary)]/20">
          <Settings className="h-4 w-4 text-[var(--color-primary)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] font-heading">
          Admin Controls
        </h3>
      </div>
      <span className="text-xs px-2 py-1 bg-[var(--color-primary)]/20 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/30 font-medium">
        Admin
      </span>
    </div>
    
    <p className="text-sm text-[var(--color-text-secondary)] mb-5 font-sans">
      Create and manage platform content
    </p>
    
    <div className="grid grid-cols-2 gap-3">
      <button 
        onClick={() => handleCreate("blog")} 
        className="lego-button flex items-center justify-center space-x-2 px-3 py-3 text-sm bg-[var(--color-accent1)] text-white rounded-lg transition-all duration-200 border-b-4 border-[var(--color-accent1-dark)] hover:border-b-2 hover:mt-0.5 font-sans font-medium"
      >
        <Plus className="h-4 w-4" />
        <span>New Blog</span>
      </button>
      
      <button 
        onClick={() => handleCreate("signal")} 
        className="lego-button flex items-center justify-center space-x-2 px-3 py-3 text-sm bg-[var(--color-secondary)] text-white rounded-lg transition-all duration-200 border-b-4 border-[var(--color-secondary-dark)] hover:border-b-2 hover:mt-0.5 font-sans font-medium"
      >
        <Plus className="h-4 w-4" />
        <span>New Signal</span>
      </button>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
    <div className="absolute -top-4 -left-4 w-14 h-14 bg-[var(--color-secondary)]/10 rounded-full blur-md"></div>
  </div>
);

export default AdminControls;