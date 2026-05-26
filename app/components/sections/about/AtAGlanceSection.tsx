"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatItem {
  /** Numeric value to count up to */
  value: number;
  /** Suffix appended after the number — e.g. "+", "%", "K+" */
  suffix?: string;
  /** Prefix before the number — e.g. "$" */
  prefix?: string;
  /** Label shown beneath the number */
  label: string;
}

export interface AtAGlanceSectionProps {
  /** Section eyebrow — defaults to "OSPOLY AT A GLANCE" */
  eyebrow?: string;
  /** Array of stats — renders in a 3-column grid, row by row */
  // stats: StatItem[];
  /**
   * Background image URL.
   * Defaults to a campus Unsplash photo — swap with /images/campus.jpg
   */
  imageUrl?: string;
  /** Overlay darkness 0–1. Default 0.68 */
  overlayOpacity?: number;
  /** Optional className on the outer <section> */
  className?: string;
}

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, start = false) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const from = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(from + (target - from) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return current;
}

// ─── Single stat cell ─────────────────────────────────────────────────────────

interface StatCellProps {
  stat: StatItem;
  index: number;
  animate: boolean;
  cols: number;
}

function StatCell({ stat, index, animate, cols }: StatCellProps) {
  const counted = useCountUp(stat.value, 1600 + index * 80, animate);

  // Determine border classes based on grid position
  const col = index % cols;
  const row = Math.floor(index / cols);
  const totalRows = Math.ceil(9 / cols); // safe upper bound

  const borderRight = col < cols - 1
    ? "border-r border-white/15"
    : "";
  const borderBottom = row < totalRows - 1
    ? "border-b border-white/15"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
      className={`
        flex flex-col items-center justify-center text-center
        px-6 py-10 sm:py-14
        ${borderRight} ${borderBottom}
      `}
    >
      <p className="font-display font-bold text-white leading-none tracking-tight
                    text-4xl sm:text-5xl lg:text-6xl">
        {stat.prefix ?? ""}
        {animate
          ? stat.value >= 1000
            ? counted.toLocaleString()
            : counted
          : 0}
        {stat.suffix ?? ""}
      </p>
      <p className="text-white/65 text-sm sm:text-base mt-3 max-w-40 leading-snug">
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AtAGlanceSection({
  eyebrow = "OSPOLY AT A GLANCE",
  // stats,
  imageUrl = "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&fit=crop",
  overlayOpacity = 0.68,
  className = "",
}: AtAGlanceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const COLS = 3;
  const STATS = [
  { value: 40,    suffix: "+", label: "Years of Excellence" },
  { value: 50,    suffix: "+", label: "Academic Programs" },
  { value: 5,     suffix: "+", label: "Decades of Combined Institutional Heritage" },
  { value: 10000, suffix: "+", label: "Student Population" },
  { value: 2,                  label: "Partner Universities" },
  { value: 9,                  label: "Faculties & Schools" },
  { value: 30000, suffix: "+", label: "Vibrant Community" },
  { value: 30000, suffix: "+", label: "Alumni Network" },
  { value: 500,   suffix: "+", label: "Staff & Faculty" },
];

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      aria-label="OSPOLY at a glance — key statistics"
    >
      {/* ── Background image ────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        aria-hidden
      />

      {/* ── Dark overlay ────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-ospoly-deep"
        style={{ opacity: overlayOpacity }}
        aria-hidden
      />

      {/* ── Subtle grid texture ──────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,207,246,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(180,207,246,.5) 1px,transparent 1px)",
          backgroundSize: "52px 52px",
        }}
        aria-hidden
      />

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-14">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="font-display font-bold italic text-white/90
                     text-base sm:text-lg tracking-widest uppercase mb-10 sm:mb-14"
        >
          {eyebrow}
        </motion.p>

        {/* Stats grid — 3 columns with dividers */}
        <div
          className="grid rounded-sm overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
        >
          {STATS.map((stat, i) => (
            <StatCell
              key={stat.label}
              stat={stat}
              index={i}
              animate={isInView}
              cols={COLS}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
