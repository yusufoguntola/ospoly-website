"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";
import Image from "next/image";

export default function MissionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-linear-to-b from-ospoly-navy via-ospoly-deep to-ospoly-deep p-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top: Mission text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-cente py-16">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-ospoly-gold" />
              <span className="text-ospoly-gold text-xs font-semibold tracking-widest uppercase">
                Our Purpose
              </span>
            </div> */}
            <h2 className="font-display text-white text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Mission
            </h2>
            <p className="text-white text-base leading-relaxed mb-8 max-w-xl">
              The Mission of Osun State Polytechnic, Iree is to produce
              highly-motivated, technically proficient, and efficient manpower in
              the fields of Science, Engineering, Environmental Studies, Information
              and Communication Technology, Management, and Financial Studies.
            </p>
            <a
              href="/about/vision"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white rounded-full text-white text-sm font-semibold hover:bg-ospoly-navy transition-all group"
            >
              Read more
             
            </a>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-ospoly-pale">
              {/* Placeholder image — will be replaced with actual campus photo */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/mission.png')" }}
              />
              {/* Fallback gradient */}
              {/* <div className="absolute inset-0 bg-linear-to-br from-ospoly-navy/60 to-ospoly-deep/80 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <svg
                    className="w-16 h-16 mx-auto mb-2 opacity-40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                    />
                  </svg>
                  <p className="text-sm opacity-60">Campus Photo</p>
                </div>
              </div> */}
              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-ospoly-gold/20 rounded-tl-[40px]" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-10 md:-bottom-15 -left-10 md:-left-15 text-white rounded-2xl px-5 py-3"
            >
              {/* <p className="text-2xl font-display font-bold">2025</p>
              <p className="text-xs text-white/80">Established 1979</p> */}
              <Image src={"/assets/logo-vector.png"} alt={""} width={100} height={100} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-display font-bold text-3xl lg:text-4xl text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-white text-xs tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}