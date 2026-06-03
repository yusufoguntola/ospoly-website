"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export interface CtaButton {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface CtaBannerProps {
  headline: string;
  subtext?: string;
  buttons?: CtaButton[];
  imageUrl?: string;
  overlayOpacity?: number;
  size?: "default" | "tall";
  className?: string;
}

function parseHeadline(text: string): string[][] {
  return text.split("\n").map((line) => line.trim().split(" "));
}

const lineVariants = {
  hidden: {},
  visible: (lineIndex: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: lineIndex * 0.18 },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CtaBanner({
  headline = "READY TO\nLEARN, CREATE, AND\nCONTRIBUTE TO A\nSKILLED FUTURE.",
  subtext,
  buttons,
  imageUrl = "/assets/lab-cta.png",
  // "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80&fit=crop",
  overlayOpacity = 0.45,
  size = "default",
  className = "",
}: CtaBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const lines = parseHeadline(headline);
  const minH = size === "tall" ? "min-h-[90vh]" : "min-h-[60vh] sm:min-h-[75vh]";

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden flex items-center ${minH} ${className}`}
      aria-label="Call to action"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-[-15%] bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')`, y: bgY }}
        aria-hidden
      />

      {/* Overlay */}
      {/* <div
        className="absolute inset-0 bg-ospoly-deep"
        style={{ opacity: overlayOpacity }}
        aria-hidden
      /> */}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, transparent 40%, rgba(9,27,52,0.55) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-12 py-14 sm:py-20">
        {/* Staggered headline */}
        <h2 className="font-display font-black text-white uppercase leading-[0.95] tracking-tight">
          {lines.map((words, lineIdx) => (
            <motion.div
              key={lineIdx}
              custom={lineIdx}
              variants={lineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap gap-x-[0.28em] overflow-hidden"
              style={{
                fontSize: "clamp(1.8rem, 6vw, 4rem)",
                lineHeight: 1.0,
                marginBottom: "0.05em",
              }}
            >
              {words.map((word, wordIdx) => (
                <motion.span
                  key={wordIdx}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          ))}
        </h2>

        {/* Optional subtext */}
        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: lines.length * 0.18 + 0.2 }}
            className="text-white/70 text-base sm:text-lg mt-6 sm:mt-8 max-w-xs sm:max-w-xl leading-relaxed"
          >
            {subtext}
          </motion.p>
        )}

        {/* Optional CTA buttons */}
        {buttons && buttons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: lines.length * 0.18 + (subtext ? 0.4 : 0.25),
            }}
            className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            {buttons.map((btn) =>
              btn.variant === "secondary" ? (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="inline-flex items-center px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border-2 border-white/60 text-white text-sm font-semibold hover:bg-white/10 hover:border-white transition-all"
                >
                  {btn.label}
                </Link>
              ) : (
                <Link
                  key={btn.label}
                  href={btn.href}
                  className="inline-flex items-center px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-ospoly-gold text-white text-sm font-semibold hover:bg-ospoly-gold/90 transition-all shadow-lg shadow-ospoly-gold/20 hover:shadow-ospoly-gold/40 hover:-translate-y-0.5"
                >
                  {btn.label}
                </Link>
              )
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}