"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatItem {
  value: string;
  label: string;
}

interface MissionSectionProps {
  stats?: StatItem[];
}

// ─── Fallback stats (used until Sanity is populated) ─────────────────────────

const FALLBACK_STATS: StatItem[] = [
  { value: "98%", label: "Graduate Rate" },
  { value: "10,000+", label: "Students" },
  { value: "4,000+", label: "Faculty" },
  { value: "150+", label: "No. of Programs" },
];

export default function MissionSection({ stats }: MissionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const STATS = stats?.length ? stats : FALLBACK_STATS;

  return (
    <section
      className="bg-linear-to-b from-ospoly-navy via-ospoly-deep to-ospoly-deep overflow-hidden pt-28 sm:pt-24 md:pt-28 pb-10 px-4 sm:px-8 md:px-16 lg:px-32"
      ref={ref}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Top: Mission text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center py-8 sm:py-12 lg:py-16">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Mission
            </h2>
            <p className="text-white text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl">
              The Mission of Osun State Polytechnic, Iree is to produce
              highly-motivated, technically proficient, and efficient manpower
              in the fields of Science, Engineering, Environmental Studies,
              Information and Communication Technology, Management, and
              Financial Studies.
            </p>
            <Link
              href="/about/vision"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-white rounded-full text-white text-sm font-semibold hover:bg-ospoly-navy transition-all group"
            >
              Read more
            </Link>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-ospoly-pale">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/pgd.jpg')" }}
              />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-ospoly-gold/20 rounded-tl-[40px]" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-8 sm:-bottom-10 md:-bottom-15 -left-4 sm:-left-8 md:-left-15 text-white rounded-2xl px-3 sm:px-5 py-3"
            >
              <Image
                src="/assets/logo-vector.png"
                alt=""
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 mt-6 sm:mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="text-center"
            >
              <p className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-1">
                {stat.value}
              </p>
              <p className="text-white text-xs tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
