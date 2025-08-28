// CreateEditModal.jsx
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
    "flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2";
  const inputClass =
    "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-[100] p-4 overflow-y-auto pt-20">
      <div
        className={`relative w-full max-w-3xl ${
          darkMode ? "bg-gray-800/95" : "bg-white/95"
        } backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-6rem)] overflow-y-auto`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
            {editingItem ? <FaSave /> : <FaPlusCircle />}
            {editingItem ? "Edit" : "Create"}{" "}
            {modalType === "blog" ? "Blog" : "Signal"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {editingItem ? "Update the details below" : "Fill in the details below"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {modalType === "blog" ? (
            <>
              <div>
                <label className={labelClass}>
                  <FaHeading /> Title
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
                  <FaAlignLeft /> Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  className={inputClass}
                  required
                />
              </div>
              <div>
  <label className={labelClass}>
    <FaImage /> Upload Image
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        // convert to Base64 for preview / backend upload
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    }}
    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/20 dark:file:text-green-400"
  />

  {/* Preview */}
  {formData.image && (
    <div className="mt-3">
      <img
        src={formData.image}
        alt="Preview"
        className="w-full max-h-48 object-contain rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
      />
    </div>
  )}
</div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>
                  <FaCoins /> Coin
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
                  {formData.direction === "buy" ? <FaArrowUp /> : <FaArrowDown />}{" "}
                  Direction
                </label>
                <select
                  value={formData.direction}
                  onChange={(e) =>
                    setFormData({ ...formData, direction: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>
                  <FaMoneyBillWave /> Entry Price
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
    <FaBolt /> Leverage
  </label>

  <div className="flex items-center gap-4">
    {/* Slider */}
    <input
      type="range"
      min="1"
      max="125"
      step="1"
      value={formData.leverage || 1}
      onChange={(e) =>
        setFormData({ ...formData, leverage: Number(e.target.value) })
      }
      className="w-full accent-green-500"
    />

    {/* Number Input */}
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
        className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
      />
      <span className="font-semibold text-gray-600 dark:text-gray-300">x</span>
    </div>
  </div>

  {/* Range hint */}
  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
    <span>1x</span>
    <span>125x</span>
  </div>
</div>              <div>
                <label className={labelClass}>
                  <FaShieldAlt /> Stop Loss
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
                  <FaBullseye /> Targets
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
                    <FaCheckCircle />
                  ) : formData.status === "fail" ? (
                    <FaTimesCircle />
                  ) : (
                    <FaClock />
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
                  <option value="fail">Fail</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-medium transition-all hover:shadow-lg transform hover:scale-105"
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