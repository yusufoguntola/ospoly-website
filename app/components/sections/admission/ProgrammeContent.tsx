"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export interface ContentSection {
  heading: string;
  /** Paragraphs of body text */
  paragraphs?: string[];
  /** Bulleted list items */
  bullets?: string[];
}

export interface QuickInfo {
  label: string;
  value: string;
}

export interface ProgrammeButton {
  label: string;
  href: string;
  variant?: "outline" | "filled";
}

export interface ProgrammeContentProps {
  /** Page-level heading — e.g. "Undergraduate Studies (Full-Time ND-HND)" */
  title: string;
  /** Intro paragraph(s) shown before sections */
  intro?: string[];
  /** Collapsible content sections */
  sections: ContentSection[];
  /** Optional quick-info row (Duration, Requirements…) */
  quickInfo?: QuickInfo[];
  /** Bottom CTA buttons */
  buttons?: ProgrammeButton[];
}

export default function ProgrammeContent({
  title,
  intro,
  sections,
  quickInfo,
  buttons,
}: ProgrammeContentProps) {
  return (
    <article>
      {/* Page title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-ospoly-navy text-xl sm:text-2xl mb-4"
      >
        {title}
      </motion.h2>

      {/* Intro paragraphs */}
      {intro?.map((para, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 * i }}
          className="text-gray-600 text-[15px] leading-[1.85] mb-4 max-w-2xl"
        >
          {para}
        </motion.p>
      ))}

      {/* Sections */}
      <div className="mt-6 space-y-8">
        {sections.map((section, si) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + si * 0.1 }}
          >
            <h3 className="font-display font-bold text-ospoly-navy text-base sm:text-lg mb-3">
              {section.heading}
            </h3>

            {section.paragraphs?.map((para, pi) => (
              <p
                key={pi}
                className="text-gray-600 text-[15px] leading-[1.85] mb-3 max-w-2xl"
              >
                {para}
              </p>
            ))}

            {section.bullets && (
              <ul className="space-y-2 mt-2">
                {section.bullets.map((item, bi) => (
                  <li
                    key={bi}
                    className="flex items-start gap-2.5 text-gray-600 text-[15px] leading-relaxed"
                  >
                    <span className="mt-1.75 w-1.5 h-1.5 rounded-full bg-ospoly-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      {/* Quick Info */}
      {quickInfo && quickInfo.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-4 bg-ospoly-pale/40 rounded-xl border border-ospoly-light/40"
        >
          <p className="text-xs font-semibold text-ospoly-navy uppercase tracking-widest mb-3">
            Quick Info
          </p>
          <div className="space-y-1.5">
            {quickInfo.map((item) => (
              <div key={item.label} className="flex gap-2 text-sm">
                <span className="text-ospoly-navy font-semibold min-w-25">
                  {item.label}:
                </span>
                <span className="text-gray-600">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA Buttons */}
      {buttons && buttons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          {buttons.map((btn) => (
            <Link
              key={btn.label}
              href={btn.href}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                btn.variant === "filled"
                  ? "bg-ospoly-navy text-white border-ospoly-navy hover:bg-ospoly-deep"
                  : "bg-white text-ospoly-navy border-ospoly-navy/30 hover:bg-ospoly-pale/40"
              }`}
            >
              {btn.label}
            </Link>
          ))}
        </motion.div>
      )}
    </article>
  );
}
