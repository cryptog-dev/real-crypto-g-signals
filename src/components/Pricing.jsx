import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic Signals", "Community Access", "Limited Analytics"],
      buttonText: "Get Started",
      color: "bg-[var(--color-neutral-dark)]/50",
    },
    {
      name: "Premium",
      price: "$29/month",
      features: ["All Signals", "Advanced Analytics", "Priority Support", "Exclusive Community"],
      buttonText: "Upgrade Now",
      color: "bg-[var(--color-positive)]/20",
    },
    {
      name: "Pro",
      price: "$99/month",
      features: ["All Premium Features", "Personalized Strategies", "Dedicated Coach", "API Access"],
      buttonText: "Go Pro",
      color: "bg-[var(--color-primary)]/20",
    },
  ];

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
            Pricing Plans
          </h1>
          <p className="text-contrast-medium text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans">
            Choose a plan that suits your trading needs. Upgrade anytime for more features.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`lego-card p-6 ${plan.color} border-[var(--color-border-light)] hover:border-[var(--color-border-hover)] rounded-lg transition-all duration-300 hover:shadow-lg`}
            >
              <h3 className="text-xl font-semibold text-contrast-high font-[Outfit] mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-[var(--color-primary)] mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-contrast-medium font-sans">
                    <Check className="h-4 w-4 text-[var(--color-positive)] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="lego-button w-full bg-[var(--color-primary)] text-white py-2 rounded-lg font-medium font-sans hover:bg-[var(--color-primary)]/90 transition-all duration-200">
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;