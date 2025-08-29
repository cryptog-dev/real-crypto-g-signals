import React from "react";
import {
  FaTimes,
  FaHeading,
  FaAlignLeft,
  FaImage,
  FaCoins,
  FaArrowUp,
  FaArrowDown,
  FaMoneyBillWave,
  FaBolt,
  FaShieldAlt,
  FaBullseye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSave,
  FaPlusCircle,
} from "react-icons/fa";

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
  if (!show) return null;

  const labelClass =
    "flex items-center gap-2 text-sm font-semibold text-[#2D3748]/80 dark:text-[#F7FAFC]/80 mb-2 font-sans";
  const inputClass =
    "w-full px-4 py-3 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 font-mono";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-[100] p-4 overflow-y-auto pt-20">
      <div
        className="relative w-full max-w-3xl bg-[#2D3748]/95 dark:bg-[#1B4332]/95 rounded-2xl shadow-lg border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 p-8 max-h-[calc(100vh-6rem)] overflow-y-auto transition-all duration-300 font-sans"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#F7FAFC]/80 hover:text-[#F56565] dark:text-[#F7FAFC]/80 dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-full transition-all duration-200"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#F7FAFC] bg-gradient-to-r from-[#1B4332] via-[#FFD700] to-[#1B4332] bg-clip-text text-transparent font-heading tracking-tight flex items-center justify-center gap-2">
            {editingItem ? <FaSave /> : <FaPlusCircle />}
            {editingItem ? "Edit" : "Create"} {modalType === "blog" ? "Blog" : "Signal"}
          </h2>
          <p className="text-base text-[#F7FAFC]/80 mt-2 leading-relaxed">
            {editingItem ? "Update the details below" : "Fill in the details below"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {modalType === "blog" ? (
            <>
              <div>
                <label className={labelClass}>
                  <FaHeading className="text-[#FFD700]" /> Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  <FaAlignLeft className="text-[#FFD700]" /> Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  <FaImage className="text-[#FFD700]" /> Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({ ...formData, image: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-2 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B4332] focus:border-transparent dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1B4332]/20 file:text-[#FFD700] hover:file:bg-[#1B4332]/30 dark:file:bg-[#FFD700]/20 dark:file:text-[#1B4332] dark:hover:file:bg-[#FFD700]/30"
                />
                {/* Preview */}
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full max-h-48 object-contain rounded-lg shadow-md border border-[#F7E7CE]/20"
                    />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  <FaCoins className="text-[#FFD700]" /> Coin
                </label>
                <input
                  type="text"
                  value={formData.coin}
                  onChange={(e) => setFormData({ ...formData, coin: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  {formData.direction === "buy" ? (
                    <FaArrowUp className="text-[#48BB78]" />
                  ) : (
                    <FaArrowDown className="text-[#F56565]" />
                  )}
                  Direction
                </label>
                <select
                  value={formData.direction}
                  onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                  className={inputClass}
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  <FaMoneyBillWave className="text-[#FFD700]" /> Entry Price
                </label>
                <input
                  type="number"
                  value={formData.entry_price}
                  onChange={(e) =>
                    setFormData({ ...formData, entry_price: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  <FaBolt className="text-[#FFD700]" /> Leverage
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="125"
                    step="1"
                    value={formData.leverage || 1}
                    onChange={(e) =>
                      setFormData({ ...formData, leverage: Number(e.target.value) })
                    }
                    className="w-full accent-[#1B4332] dark:accent-[#FFD700]"
                  />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="125"
                      value={formData.leverage || 1}
                      onChange={(e) => {
                        let val = Math.max(1, Math.min(125, Number(e.target.value) || 1));
                        setFormData({ ...formData, leverage: val });
                      }}
                      className="w-20 px-3 py-2 border border-[#F7E7CE]/20 hover:border-[#FFD700]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332] dark:bg-[#2D3748]/20 dark:text-[#F7FAFC] font-mono"
                    />
                    <span className="font-semibold text-[#F7FAFC]/80">
                      x
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-[#F7FAFC]/60 mt-1 font-mono">
                  <span>1x</span>
                  <span>125x</span>
                </div>
              </div>
              <div>
                <label className={labelClass}>
                  <FaShieldAlt className="text-[#F56565]" /> Stop Loss
                </label>
                <input
                  type="number"
                  value={formData.stop_loss}
                  onChange={(e) =>
                    setFormData({ ...formData, stop_loss: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  <FaBullseye className="text-[#48BB78]" /> Targets
                </label>
                <input
                  type="text"
                  value={formData.targets}
                  onChange={(e) =>
                    setFormData({ ...formData, targets: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>
                  {formData.status === "success" ? (
                    <FaCheckCircle className="text-[#48BB78]" />
                  ) : formData.status === "fail" ? (
                    <FaTimesCircle className="text-[#F56565]" />
                  ) : (
                    <FaClock className="text-[#FFD700]" />
                  )}
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={inputClass}
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-[#F7FAFC]/80 hover:text-[#F56565] dark:hover:text-[#F56565] hover:bg-[#F56565]/10 dark:hover:bg-[#F56565]/10 rounded-xl font-medium font-heading transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1B4332] to-[#1B4332]/80 hover:from-[#1B4332] hover:to-[#FFD700]/50 text-[#F7FAFC] rounded-xl font-medium font-heading transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              {editingItem ? <FaSave /> : <FaPlusCircle />}
              {editingItem ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditModal;