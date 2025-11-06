import React, { useState } from "react";
import {
  X,
  Save,
  Plus,
  Type,
  AlignLeft,
  Image,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Zap,
  Shield,
  Target,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Trash2,
  HelpCircle,
  TrendingUp,
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
  const [imagePreview, setImagePreview] = useState(formData.image || null);
  const [showTargetHelper, setShowTargetHelper] = useState(false);

  if (!show) return null;

  const labelClass =
    "flex items-center gap-2 text-sm text-contrast-high font-sans";
  const inputClass =
    "w-full px-3 py-2.5 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-[var(--color-card-bg)] text-contrast-high transition-all duration-200";

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
    let currentTargetsObj = {};

    try {
      if (formData.targets) {
        // Try to parse as JSON first
        currentTargetsObj = JSON.parse(formData.targets);
      }
    } catch (e) {
      // If JSON parsing fails, try parsing as comma-separated values
      if (formData.targets) {
        const targetArray = formData.targets
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t);
        targetArray.forEach((target) => {
          currentTargetsObj[target] = "pending";
        });
      }
    }

    const entryPrice = parseFloat(formData.entry_price || 0);
    const newTarget = (entryPrice * 1.05).toFixed(2);
    currentTargetsObj[newTarget] = "pending";

    setFormData({ ...formData, targets: JSON.stringify(currentTargetsObj) });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="relative w-full max-w-lg lego-card rounded-xl p-6 border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] max-h-[90vh] overflow-y-auto transition-all duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-contrast-medium hover:text-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 rounded transition-colors duration-200 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-contrast-high flex items-center justify-center gap-2 font-[Outfit]">
            {editingItem ? (
              <Save className="h-5 w-5 text-[var(--color-primary)]" />
            ) : (
              <Plus className="h-5 w-5 text-[var(--color-accent1)]" />
            )}
            {editingItem ? "Update" : "Craft"}{" "}
            {modalType === "blog" ? "Market Insight" : "Trade Signal"}
          </h2>
          <p className="text-contrast-medium text-sm mt-1 font-sans">
            {editingItem
              ? "Refine your trading content"
              : "Create new market intelligence"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {modalType === "blog" ? (
            <>
              <div>
                <label className={labelClass}>
                  <Type className="h-4 w-4 text-[var(--color-primary)]" /> Title
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Enter market insight title"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <AlignLeft className="h-4 w-4 text-[var(--color-primary)]" />{" "}
                  Content
                </label>
                <textarea
                  value={formData.content || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={5}
                  className={inputClass}
                  placeholder="Write your market insights..."
                  required
                />
              </div>

              <div>
                <label className={labelClass}>
                  <Image className="h-4 w-4 text-[var(--color-primary)]" />{" "}
                  Image
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="lego-button flex items-center gap-2 px-3 py-2 text-sm bg-[var(--color-accent1)] text-white rounded-lg font-medium font-sans cursor-pointer"
                  >
                    <Upload className="h-4 w-4" /> Upload Image
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="text-contrast-medium hover:text-[var(--color-secondary)]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-[var(--color-border-light)]"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {/* Trading Pair */}
              <div>
                <label className={labelClass}>
                  <TrendingUp className="h-4 w-4 text-[var(--color-primary)]" />{" "}
                  Trading Pair
                </label>
                <input
                  type="text"
                  value={formData.coin || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, coin: e.target.value })
                  }
                  className={inputClass}
                  placeholder="e.g., BTC/USDT"
                  required
                />
              </div>

              {/* Access Type */}
              <div>
                <label className={labelClass}>
                  <Shield className="h-4 w-4 text-[var(--color-primary)]" />{" "}
                  Access Type
                </label>
                <select
                  value={formData.access_type}
                  onChange={(e) =>
                    setFormData({ ...formData, access_type: e.target.value })
                  }
                  className={inputClass}
                  required
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Direction */}
                <div>
                  <label className={labelClass}>
                    {formData.direction === "buy" ? (
                      <ArrowUp className="h-4 w-4 text-[var(--color-accent1)]" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-[var(--color-secondary)]" />
                    )}
                    Direction
                  </label>
                  <select
                    value={formData.direction || "buy"}
                    onChange={(e) =>
                      setFormData({ ...formData, direction: e.target.value })
                    }
                    className={inputClass}
                    required
                  >
                    <option value="buy">Buy/Long</option>
                    <option value="sell">Sell/Short</option>
                  </select>
                </div>

                {/* Leverage */}
                <div>
                  <label className={labelClass}>
                    <Zap className="h-4 w-4 text-[var(--color-primary)]" />{" "}
                    Leverage
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="125"
                    value={formData.leverage || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, leverage: e.target.value })
                    }
                    className={inputClass}
                    placeholder="10x"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Entry Price */}
                <div>
                  <label className={labelClass}>
                    <DollarSign className="h-4 w-4 text-[var(--color-primary)]" />{" "}
                    Entry Price
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.entry_price || ""}
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
                    <Shield className="h-4 w-4 text-[var(--color-secondary)]" />{" "}
                    Stop Loss
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.stop_loss || ""}
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
                    <Target className="h-4 w-4 text-[var(--color-accent1)]" />{" "}
                    Targets
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={addTarget}
                      className="lego-button p-1.5 bg-[var(--color-accent1)] text-white rounded-lg"
                      title="Add Target"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTargetHelper(!showTargetHelper)}
                      className="text-contrast-medium hover:text-[var(--color-primary)]"
                      title="Target Help"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {showTargetHelper && (
                  <div className="bg-[var(--color-primary)]/10 border border-[var(--color-border-light)] rounded-lg p-3 mb-2 text-sm text-[var(--color-primary)] font-sans">
                    <div className="space-y-2">
                      <div className="font-medium">
                        Enter targets in JSON format with price:status pairs:
                      </div>
                      <div className="text-xs opacity-80">
                        Example:{" "}
                        {
                          '{"45000": "pending", "47000": "hit", "49000": "pending"}'
                        }
                      </div>
                      <div className="text-xs opacity-80">
                        Status options: "pending", "hit", "fail"
                      </div>
                      <div className="text-xs opacity-80">
                        Legacy format (comma-separated) is also supported:
                        "45000, 47000, 49000"
                      </div>
                    </div>
                  </div>
                )}

                <textarea
                  rows={3}
                  value={formData.targets || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, targets: e.target.value })
                  }
                  className={inputClass}
                  placeholder='{"45000": "pending", "47000": "hit", "49000": "pending"}'
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className={labelClass}>
                  {formData.status === "success" ? (
                    <CheckCircle className="h-4 w-4 text-[var(--color-accent1)]" />
                  ) : formData.status === "fail" ? (
                    <AlertCircle className="h-4 w-4 text-[var(--color-secondary)]" />
                  ) : (
                    <Clock className="h-4 w-4 text-[var(--color-primary)]" />
                  )}
                  Status
                </label>
                <select
                  value={formData.status || "pending"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className={inputClass}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="fail">Failed</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border-light)]">
            <button
              type="button"
              onClick={onClose}
              className="lego-button px-4 py-2 text-sm text-contrast-medium hover:text-contrast-high border border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-colors font-sans"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="lego-button flex items-center gap-2 px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium font-sans"
            >
              {editingItem ? (
                <Save className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              {editingItem ? "Update" : "Create"}
            </button>
          </div>
        </form>

        {/* Decorative elements */}
        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[var(--color-accent1)]/10 rounded-full blur-md"></div>
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--color-primary)]/10 rounded-full blur-md"></div>
      </div>
    </div>
  );
};

export default CreateEditModal;
