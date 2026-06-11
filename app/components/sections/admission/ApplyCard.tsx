"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface ApplyCardProps {
  /** Card heading — e.g. "How to Apply For Undergraduate Programme" */
  heading: string;
  /** Numbered steps */
  steps: string[];
  /** CTA button label */
  ctaLabel: string;
  /** CTA button href */
  ctaHref: string;
  /** Optional card accent colour — "gold" | "navy" (default: "navy") */
  accent?: "gold" | "navy";
}

export default function ApplyCard({
  heading,
  steps,
  ctaLabel,
  ctaHref,
  accent = "navy",
}: ApplyCardProps) {
  const isGold = accent === "gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`rounded-2xl p-6 shadow-lg ${
        isGold ? "bg-ospoly-gold text-white" : "bg-ospoly-navy text-white"
      }`}
    >
      <h3 className="font-display font-bold text-sm sm:text-base leading-snug mb-5">
        {heading}
      </h3>

      <ol className="space-y-3 mb-6">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                isGold ? "bg-white/20 text-white" : "bg-white/15 text-white"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-xs leading-relaxed ${
                isGold ? "text-white/85" : "text-white/75"
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>

      <Link
        target="_blank"
        href={ctaHref}
        className={`block w-full text-center text-xs font-semibold px-4 py-2.5 rounded-xl transition-all ${
          isGold
            ? "bg-white text-ospoly-gold hover:bg-white/90"
            : "bg-ospoly-sky/20 text-white border border-white/20 hover:bg-white/10"
        }`}
      >
        {ctaLabel}
      </Link>
    </motion.div>
  );
}
