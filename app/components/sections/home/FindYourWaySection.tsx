"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronRightCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuickLink {
  key: string;
  label: string;
  href: string;
  // Icon: React.ElementType;
  /**
   * Background image for this link's hover state.
   * Defaults to Unsplash stock photos — swap with local /images/* paths.
   */
  imageUrl: string;
  // description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEFAULT_IMAGE =
  "/assets/students.png";

const QUICK_LINKS: QuickLink[] = [
  {
    key: "certificate",
    label: "Certificate Application",
    href: "/portal/certificate",
   
    imageUrl:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1400&q=80&fit=crop",
    },
  {
    key: "elibrary",
    label: "E-Library",
    href: "/portal/elibrary",
 
    imageUrl:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=80&fit=crop",
    
  },
  {
    key: "transcript",
    label: "Transcript Portal",
    href: "/portal/transcript",
    
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&fit=crop",
    
  },
  {
    key: "elearning",
    label: "E-Learning Portal",
    href: "/portal/elearning",
  
    imageUrl:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1400&q=80&fit=crop",
    
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LinkCellProps {
  link: QuickLink;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}

function LinkCell({ link, isHovered, onEnter, onLeave }: LinkCellProps) {
  return (
    <Link
      href={link.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        relative flex flex-col items-center gap-3 p-5 min-h-30 transition-colors duration-300 group justify-center even:border-l first:border-b last:border-t border-ospoly-sky
        ${isHovered && "bg-ospoly-overlay"}
      `}
    >
    
      <div>
        {/* Label */}
        <p
          className={`text-sm font-semibold leading-snug transition-colors duration-200 ${
            isHovered ? "text-white" : "text-ospoly-light/75"
          }`}
        >
          {link.label}
        </p>

        
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -6 }}
        transition={{ duration: 0.25 }}
        className="mt-aut"
        aria-hidden
      >
        <ChevronRightCircle size={28} className="text-white" />
      </motion.div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FindYourWaySection() {
  const [hovered, setHovered] = useState<string | null>(null);

  const activeLink = QUICK_LINKS.find((l) => l.key === hovered);
  const activeBg = activeLink?.imageUrl ?? DEFAULT_IMAGE;

  return (
    <section className="relative w-full overflow-hidden">

      {/* ── Background crossfade ─────────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${activeBg}')` }}
          aria-hidden
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <motion.div
        animate={{ opacity: hovered ? 0.72 : 0.82 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-ospoly-deep"
        aria-hidden
      />

      {/* Grid texture */}
      {/* <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,207,246,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(180,207,246,0.6) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      /> */}

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-42 min-h-120 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — heading + programme pills */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >

            <h2 className="font-display font-bold text-white text-3xl sm:text-5xl leading-tight mb-3">
              Find Your Way
            </h2>

            <p className="text-ospoly-light/65 leading-relaxed mb-8 max-w-55">
              Explore the courses, paths, and opportunities that Osun State
              Polytechnic has to offer.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { label: "Undergraduate programmes", href: "/academics/undergraduate" },
                { label: "Graduate Programmes", href: "/academics/graduate" },
              ].map((prog) => (
                <Link
                  key={prog.label}
                  href={prog.href}
                  className="inline-flex items-center gap-2 self-start p-5 rounded-full border border-ospoly-sky/35 text-ospoly-sky font-medium hover:bg-ospoly-sky/10 hover:border-ospoly-sky transition-all group w-70 justify-center"
                >
                  {prog.label}
                 
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right — 2×2 quick-link grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 rounded-2xl overflow-hidden "
          >
            {QUICK_LINKS.map((link) => (
              <LinkCell
                key={link.key}
                link={link}
                isHovered={hovered === link.key}
                onEnter={() => setHovered(link.key)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
