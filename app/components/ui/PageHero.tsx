"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageHeroProps {
  /**
   * Large bold heading — e.g. "About OSPOLY", "Admissions", "Academics"
   */
  title: string;

  /**
   * Optional supporting paragraph shown bottom-right.
   * If omitted the right column is empty (title spans more visual weight).
   */
  description?: string;

  /**
   * Background image URL. Defaults to the campus building photo.
   * Pass a local path like "/images/admissions-hero.jpg" or any URL.
   */
  imageUrl?: string;

  /**
   * Controls the hero height.
   * - "default" → 480px  (inner pages, matches the screenshot)
   * - "tall"    → 620px  (feature pages)
   * - "short"   → 320px  (utility pages, breadcrumb-only pages)
   */
  size?: "short" | "default" | "tall";

  /**
   * Overlay opacity — 0 (transparent) to 1 (fully dark).
   * Defaults to 0.62 which matches the screenshot.
   */
  overlayOpacity?: number;

  /**
   * Optional className forwarded to the outer <section>.
   */
  className?: string;
}

// ─── Height map ───────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<NonNullable<PageHeroProps["size"]>, string> = {
  short:   "min-h-[320px]",
  default: "min-h-[480px]",
  tall:    "min-h-[620px]",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PageHero({
  title,
  description,
  imageUrl = "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&fit=crop",
  size = "default",
  overlayOpacity = 0.62,
  className = "",
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  // Subtle parallax — background moves at half the scroll speed
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden flex items-end ${SIZE_CLASS[size]} ${className}`}
      aria-label={`${title} page banner`}
    >
      {/* ── Background image with parallax ─────────────── */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          y: bgY,
          scale: 1.1,
        }}
        aria-hidden
      />

      {/* ── Dark navy overlay ────────────────────────────── */}
      <div
        className="absolute inset-0 bg-ospoly-deep"
        style={{ opacity: overlayOpacity }}
        aria-hidden
      />

      {/* ── Subtle grid texture ──────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,207,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(180,207,246,0.5) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-14 py-20">
      

          {/* Left — page title + gold underline */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-2xl mt-10"
            >
              {title}
            </motion.h1>

            {/* Gold rule — animates width from 0 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="mt-5 h-0.75 w-52 bg-ospoly-gold rounded-full"
              aria-hidden
            />
          </div>

          {/* Right — description paragraph */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl lg:justify-self-end"
            >
              {description}
            </motion.p>
          )}
        </div>
      
    </section>
  );
}
