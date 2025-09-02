
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

// Helper: format date
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const SignalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [signal, setSignal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/signals/${id}`
        );
        setSignal(response.data);
      } catch (err) {
        console.error("Error fetching signal:", err);
        setSignal(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSignal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-neutral-light)]">
        <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
      </div>
    );
  }

  if (!signal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-[var(--color-neutral-light)]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-contrast-high mb-2">
          Signal Not Found
        </h1>
        <p className="text-contrast-medium mb-6">
          The trading signal you’re looking for doesn’t exist or was removed.
        </p>
        <button
          onClick={() => navigate("/signals")}
          className="lego-button px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          Back to Signals
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-neutral-light)]">
      {/* Hero Section */}
      <div className="relative bg-[var(--color-primary)] text-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-[var(--color-neutral-light)] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {signal.pair} Signal
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {formatDate(signal.created_at)}
            </span>
            <span className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              {signal.type?.toUpperCase() || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="lego-card p-6 md:p-10"
        >
          <h2 className="text-xl font-semibold text-contrast-high mb-6">
            Trade Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-contrast-medium">Pair</p>
              <p className="text-lg font-medium text-contrast-high">
                {signal.pair}
              </p>
            </div>
            <div>
              <p className="text-sm text-contrast-medium">Type</p>
              <p
                className={`text-lg font-medium ${
                  signal.type === "buy"
                    ? "text-green-600"
                    : signal.type === "sell"
                    ? "text-red-600"
                    : "text-contrast-high"
                }`}
              >
                {signal.type}
              </p>
            </div>
            <div>
              <p className="text-sm text-contrast-medium">Entry Price</p>
              <p className="text-lg font-medium text-contrast-high">
                {signal.entry}
              </p>
            </div>
            <div>
              <p className="text-sm text-contrast-medium">Stop Loss</p>
              <p className="text-lg font-medium text-red-600">
                {signal.stop_loss}
              </p>
            </div>
            <div>
              <p className="text-sm text-contrast-medium">Target</p>
              <p className="text-lg font-medium text-green-600">
                {signal.target}
              </p>
            </div>
            <div>
              <p className="text-sm text-contrast-medium">Risk/Reward</p>
              <p className="text-lg font-medium text-contrast-high">
                {signal.risk_reward || "—"}
              </p>
            </div>
          </div>

          {/* Notes */}
          {signal.notes && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-contrast-high mb-2">
                Notes
              </h3>
              <p className="text-contrast-medium leading-relaxed">
                {signal.notes}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignalDetail;
