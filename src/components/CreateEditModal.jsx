import React, { useState } from "react";
import { 
  X, Save, Plus, Type, AlignLeft, Image, 
  ArrowUp, ArrowDown, DollarSign, Zap, Shield, 
  Target, CheckCircle, Clock, AlertCircle, 
  Upload, Trash2, HelpCircle, TrendingUp 
} from "lucide-react";

const CreateEditModal = ({
  show,
  onClose,
  modalType,
  editingItem,
  formData,
  setFormData,
  handleSubmit,
  darkMode,
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [showTargetHelper, setShowTargetHelper] = useState(false);

  if (!show) return null;

  const labelClass = "flex items-center gap-2 text-sm text-[var(--color-text-primary)] mb-2 font-sans";
  const inputClass = "w-full px-3 py-2.5 border-2 border-[var(--color-neutral-dark)]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-card-bg)] text-[var(--color-text-primary)] transition-all duration-200";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: "" });
  };

  const addTarget = () => {
    const currentTargets = formData.targets ? formData.targets.split(',') : [];
    const newTarget = (parseFloat(formData.entry_price || 0) * 1.05).toFixed(2);
    const updatedTargets = [...currentTargets, newTarget].join(',');
    setFormData({ ...formData, targets: updatedTargets });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="relative w-full max-w-lg bg-[var(--color-card-bg)] rounded-xl shadow-xl p-6 border-4 border-[var(--color-primary)]/20 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 rounded transition-colors z-10"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] flex items-center justify-center gap-2 font-heading">
            {editingItem ? <Save size={20} className="text-[var(--color-primary)]" /> : <Plus size={20} className="text-[var(--color-accent1)]" />}
            {editingItem ? "Edit" : "Create"} {modalType === "blog" ? "Analysis" : "Signal"}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1 font-sans">
            {editingItem ? "Update your content" : "Create new trading insight"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {modalType === "blog" ? (
            <>
              <div>
                <label className={labelClass}>
                  <Type size={16} className="text-[var(--color-primary)]" /> Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                  placeholder="Enter analysis title"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <AlignLeft size={16} className="text-[var(--color-primary)]" /> Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={5}
                  className={inputClass}
                  placeholder="Write your market analysis content..."
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Image size={16} className="text-[var(--color-primary)]" /> Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Paste image URL here"
                />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {/* Trading Pair */}
              <div>
                <label className={labelClass}>
                  <TrendingUp size={16} className="text-[var(--color-primary)]" /> Trading Pair
                </label>
                <select
                  value={formData.coin}
                  onChange={(e) => setFormData({ ...formData, coin: e.target.value })}
                  className={inputClass}
                  required
                >
                  <option value="">Select trading pair</option>
                  <option value="BTC/USDT">BTC/USDT</option>
                  <option value="ETH/USDT">ETH/USDT</option>
                  <option value="ADA/USDT">ADA/USDT</option>
                  <option value="SOL/USDT">SOL/USDT</option>
                  <option value="DOT/USDT">DOT/USDT</option>
                  <option value="BNB/USDT">BNB/USDT</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Direction */}
                <div>
                  <label className={labelClass}>
                    {formData.direction === "buy" ? 
                      <ArrowUp size={16} className="text-[var(--color-accent1)]" /> : 
                      <ArrowDown size={16} className="text-[var(--color-secondary)]" />
                    }
                    Direction
                  </label>
                  <select
                    value={formData.direction}
                    onChange={(e) =>
                      setFormData({ ...formData, direction: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="buy">Buy/Long</option>
                    <option value="sell">Sell/Short</option>
                  </select>
                </div>

                {/* Leverage */}
                <div>
                  <label className={labelClass}>
                    <Zap size={16} className="text-[var(--color-primary)]" /> Leverage
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="125"
                    value={formData.leverage}
                    onChange={(e) =>
                      setFormData({ ...formData, leverage: e.target.value })
                    }
                    className={inputClass}
                    placeholder="10x"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Entry Price */}
                <div>
                  <label className={labelClass}>
                    <DollarSign size={16} className="text-[var(--color-primary)]" /> Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.entry_price}
                    onChange={(e) =>
                      setFormData({ ...formData, entry_price: e.target.value })
                    }
                    className={inputClass}
                    placeholder="0.00"
                    required
                  />
                </div>

                {/* Stop Loss */}
                <div>
                  <label className={labelClass}>
                    <Shield size={16} className="text-[var(--color-secondary)]" /> Stop Loss
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.stop_loss}
                    onChange={(e) =>
                      setFormData({ ...formData, stop_loss: e.target.value })
                    }
                    className={inputClass}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Targets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass}>
                    <Target size={16} className="text-[var(--color-accent1)]" /> Targets
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowTargetHelper(!showTargetHelper)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    <HelpCircle size={16} />
                  </button>
                </div>

                {showTargetHelper && (
                  <div className="bg-[var(--color-primary)]/10 border-2 border-[var(--color-primary)]/20 rounded-lg p-3 mb-2 text-sm text-[var(--color-primary)] font-sans">
                    Enter comma-separated target prices (e.g., 45000,47000,49000)
                  </div>
                )}

                <input
                  type="text"
                  value={formData.targets}
                  onChange={(e) =>
                    setFormData({ ...formData, targets: e.target.value })
                  }
                  className={inputClass}
                  placeholder="45000,47000,49000"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>
                  {formData.status === "success" ? (
                    <CheckCircle size={16} className="text-[var(--color-accent1)]" />
                  ) : formData.status === "fail" ? (
                    <AlertCircle size={16} className="text-[var(--color-secondary)]" />
                  ) : (
                    <Clock size={16} className="text-[var(--color-primary)]" />
                  )}
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="fail">Failed</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-[var(--color-neutral-dark)]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border-2 border-[var(--color-neutral-dark)]/20 hover:border-[var(--color-primary)]/30 rounded-lg transition-colors font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="lego-button flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium transition-all duration-200 border-b-4 border-[var(--color-primary-dark)] hover:border-b-2 hover:mt-0.5 font-sans"
            >
              {editingItem ? <Save size={16} /> : <Plus size={16} />}
              {editingItem ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditModal;