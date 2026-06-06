// "use client";

// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface PageHeroProps {
//   /**
//    * Large bold heading — e.g. "About OSPOLY", "Admissions", "Academics"
//    */
//   title: string;

//   /**
//    * Optional supporting paragraph shown bottom-right.
//    * If omitted the right column is empty (title spans more visual weight).
//    */
//   description?: string;

//   /**
//    * Background image URL. Defaults to the campus building photo.
//    * Pass a local path like "/images/admissions-hero.jpg" or any URL.
//    */
//   imageUrl?: string;

//   /**
//    * Controls the hero height.
//    * - "default" → 480px  (inner pages, matches the screenshot)
//    * - "tall"    → 620px  (feature pages)
//    * - "short"   → 320px  (utility pages, breadcrumb-only pages)
//    */
//   size?: "short" | "default" | "tall";

//   /**
//    * Overlay opacity — 0 (transparent) to 1 (fully dark).
//    * Defaults to 0.62 which matches the screenshot.
//    */
//   overlayOpacity?: number;

//   /**
//    * Optional className forwarded to the outer <section>.
//    */
//   className?: string;
// }

// // ─── Height map ───────────────────────────────────────────────────────────────

// const SIZE_CLASS: Record<NonNullable<PageHeroProps["size"]>, string> = {
//   short:   "min-h-[320px]",
//   default: "min-h-[480px]",
//   tall:    "min-h-[620px]",
// };

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function PageHero({
//   title,
//   description,
//   imageUrl = "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&fit=crop",
//   size = "default",
//   overlayOpacity = 0.62,
//   className = "",
// }: PageHeroProps) {
//   const ref = useRef<HTMLElement>(null);

//   // Subtle parallax — background moves at half the scroll speed
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });
//   const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

//   return (
//     <section
//       ref={ref}
//       className={`relative w-full overflow-hidden flex items-end ${SIZE_CLASS[size]} ${className}`}
//       aria-label={`${title} page banner`}
//     >
//       {/* ── Background image with parallax ─────────────── */}
//       <motion.div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('${imageUrl}')`,
//           y: bgY,
//           scale: 1.1,
//         }}
//         aria-hidden
//       />

//       {/* ── Dark navy overlay ────────────────────────────── */}
//       <div
//         className="absolute inset-0 bg-ospoly-deep"
//         style={{ opacity: overlayOpacity }}
//         aria-hidden
//       />

//       {/* ── Subtle grid texture ──────────────────────────── */}
//       <div
//         className="absolute inset-0 opacity-[0.035]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(180,207,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(180,207,246,0.5) 1px,transparent 1px)",
//           backgroundSize: "52px 52px",
//         }}
//         aria-hidden
//       />

//       {/* ── Content ─────────────────────────────────────── */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-14 py-20">

//           {/* Left — page title + gold underline */}
//           <div>
//             <motion.h1
//               initial={{ opacity: 0, y: 28 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//               className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-2xl mt-10"
//             >
//               {title}
//             </motion.h1>

//             {/* Gold rule — animates width from 0 */}
//             <motion.div
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
//               style={{ originX: 0 }}
//               className="mt-5 h-0.75 w-52 bg-ospoly-gold rounded-full"
//               aria-hidden
//             />
//           </div>

//           {/* Right — description paragraph */}
//           {description && (
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
//               className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl lg:justify-self-end"
//             >
//               {description}
//             </motion.p>
//           )}
//         </div>

//     </section>
//   );
// }

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PageHeroProps {
  title: string;
  description?: string;
  imageUrl?: string;
  size?: "short" | "default" | "tall";
  overlayOpacity?: number;
  className?: string;
  /**
   * When true, renders the Programmes Finder search bar + filter dropdowns
   * inside the hero banner. Filter state is fully controlled internally.
   * Listen for changes via onFilterChange.
   */
  showFinder?: boolean;
  onFilterChange?: (filters: HeroFilters) => void;
  /** Real faculty names from Sanity. Falls back to hardcoded list when omitted. */
  facultyOptions?: string[];
   levelOptions?: string[];
  modeOptions?: string[];
}

export interface HeroFilters {
  query: string;
  faculty: string | null;
  level: string | null;
  mode: string | null;
}



// ─── Height map ───────────────────────────────────────────────────────────────

const SIZE_CLASS: Record<NonNullable<PageHeroProps["size"]>, string> = {
  short: "min-h-[320px]",
  default: "min-h-[480px]",
  tall: "min-h-[620px]",
};

// ─── Single dropdown ──────────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (v: string | null) => void;
}

function Dropdown({
  label,
  options,
  selected,
  isOpen,
  onToggle,
  onSelect,
}: DropdownProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  // Determine if the menu should open upward to avoid viewport overflow
  const [openUp, setOpenUp] = useState(false);
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setOpenUp(spaceBelow < 280);
  }, [isOpen]);
  

  const displayLabel = selected
    ? selected.length > 18
      ? selected.slice(0, 18) + "…"
      : selected
    : label;

  return (
    <div ref={triggerRef} className="relative cursor-pointer">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition-all ${
          selected
            ? "bg-white text-ospoly-navy border-white"
            : "bg-white/15 text-white border-white/30 hover:bg-white/25 backdrop-blur-sm"
        }`}
      >
        {displayLabel}
        <ChevronDown
          size={13}
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: openUp ? 6 : -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          className={`absolute z-200 w-64 bg-white rounded-xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden ${
            openUp ? "bottom-full mb-2" : "top-full mt-2"
          } left-0`}
          // prevent underflow off right edge
          style={{ maxHeight: "260px", overflowY: "auto" }}
        >
          {/* "All" option */}
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`w-full text-left px-4 py-3 text-sm border-b border-gray-50 transition-colors ${
              !selected
                ? "text-ospoly-gold font-semibold bg-ospoly-pale/50"
                : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            All {label.replace("By ", "")}
          </button>

          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                selected === opt
                  ? "text-ospoly-navy font-semibold bg-ospoly-pale/60"
                  : "text-gray-600 hover:bg-gray-50 hover:text-ospoly-navy"
              }`}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PageHero({
  title,
  description,
  imageUrl = "https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80&fit=crop",
  size = "default",
  overlayOpacity = 0.62,
  className = "",
  showFinder = false,
  onFilterChange,
  facultyOptions,
   levelOptions,
  modeOptions,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  // Parallax
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Finder state
  const [query, setQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState<Omit<HeroFilters, "query">>({
    faculty: null,
    level: null,
    mode: null,
  });

  // Build filter groups here so faculty options can come from props
  const FILTER_GROUPS = [
    { key: "faculty" as const, label: "By Faculties", options: facultyOptions ?? [] },
    { key: "level"   as const, label: "By Level",     options: levelOptions ?? [] },
    { key: "mode"    as const, label: "By Modes",     options: modeOptions ?? [] },
  ];

  // Notify parent on any change
  useEffect(() => {
    onFilterChange?.({ query, ...filters });
  }, [query, filters, onFilterChange]);

  // Close dropdowns when clicking outside
  const finderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (finderRef.current && !finderRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const setFilter = useCallback(
    (key: keyof typeof filters, value: string | null) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setOpenDropdown(null);
    },
    [],
  );

  return (
    <section
      ref={ref}
      className={`relative w-full flex items-center ${SIZE_CLASS[size]} ${className}`}
      aria-label={`${title} page banner`}
    >
      {/* Background layers wrapped in overflow-hidden so the scaled image
          is clipped to the section bounds, while content/dropdowns can still
          escape the section via z-index */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')`, y: bgY, scale: 1.1 }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-ospoly-deep"
          style={{ opacity: overlayOpacity }}
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(180,207,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(180,207,246,0.5) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-10 py-20">
        {/* Title row */}
        <div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-2xl mt-10"
            >
              {title}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originX: 0 }}
              className="mt-5 h-0.75 w-52 bg-ospoly-gold rounded-full"
              aria-hidden
            />
          </div>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl lg:justify-self-end"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* ── Programmes Finder slot ──────────────────────── */}
        {showFinder && (
          <motion.div
            ref={finderRef}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 space-y-4"
          >
            {/* Label */}
            <p className="text-white text-[11px] font-semibold tracking-[0.14em] uppercase mb-2">
              Programmes finder
            </p>

            {/* Search bar — full width of content column */}
            <div className="flex items-center">
              <div className="flex items-center gap-2 bg-white rounded-l-xl px-4 py-3 md:px-5 md:py-5 w-full shadow-lg">
                <Search
                  size={15}
                  className="text-gray-400 shrink-0"
                  aria-hidden
                />
                <input
                  type="text"
                  placeholder="Search Programs"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 min-w-0 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
                  aria-label="Search programmes"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-gray-400 hover:text-gray-600 shrink-0"
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="w-14 md:w-15 h-11.5 md:h-15 bg-ospoly-gold rounded-r-xl flex items-center justify-center shrink-0 hover:bg-ospoly-deep transition-colors"
                aria-label="Submit search"
              >
                <Search size={20} className="text-white" aria-hidden />
              </button>
            </div>

            {/* Filter dropdowns — only one open at a time */}
            <div className="flex flex-wrap gap-2 justify-center">
              {FILTER_GROUPS.map(({ key, label, options }) => (
                <Dropdown
                  key={key}
                  label={label}
                  options={options}
                  selected={filters[key]}
                  isOpen={openDropdown === key}
                  onToggle={() => toggleDropdown(key)}
                  onSelect={(v) => setFilter(key, v)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}