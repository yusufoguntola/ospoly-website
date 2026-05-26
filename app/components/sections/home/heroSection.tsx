"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ANNOUNCEMENTS } from "@/lib/data";

const TABS = ["News", "Events", "Announcements"] as const;

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("News");
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setActiveItem((p) => (p + 1) % ANNOUNCEMENTS.length),
      4000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidde">
      {/* Background — campus aerial photo placeholder */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/hero-section.png')`,
            backgroundPosition: "center 30%",
          }}
        />
        {/* Fallback gradient when image is absent */}
        <div
          className="absolute inset-0 bg-linear-to-b 
  from-ospoly-deep/70 
  via-ospoly-navy/50 
  to-ospoly-deep/90"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        {/* <div className="absolute inset-0 backdrop-blur-[2px]" /> */}
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(152,188,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(152,188,238,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-40">
        {/* Circular Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "backOut", delay: 0.3 }}
          className="relative mb-6 group cursor-pointer"
        >
          <div className="w-36 h-36 lg:w-50 lg:h-50 rounded-full bg-ospoly-deep backdrop-blur-sm border-4 border-ospoly-gold/30 flex flex-col items-center justify-center gap-4 text-center shadow-2xl shadow-ospoly-gold/20 ">
            <span className="text-white font-display font-bold text-xl leading-tight block group-hover:hidden">
              SKILLED <br/> FOR IMPACT
            </span>
            <span className="text-ospoly-gold block group-hover:hidden">Since 1992</span>
             <span className="text-white font-display font-bold text-xl leading-tight hidden group-hover:block">
              WHAT SETS <br/> US APART
            </span>
          </div>

          {/* Orbit ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-ospoly-sky/20 scale-125"
          />
        </motion.div>

        {/* <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-center px-4 max-w-4xl leading-tight"
        >
          Osun State Polytechnic,{" "}
          <span className="text-ospoly-sky">Iree</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-ospoly-light/80 text-base sm:text-lg mt-4 text-center px-4 max-w-xl"
        >
          Producing highly-motivated, technically proficient, and efficient
          manpower for Nigeria and the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex flex-wrap gap-3 mt-8 justify-center"
        >
          <a
            href="/admissions/apply"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ospoly-gold text-white font-semibold rounded-xl hover:bg-ospoly-gold/90 transition-all shadow-lg shadow-ospoly-gold/20 hover:shadow-ospoly-gold/40 hover:-translate-y-0.5"
          >
            Apply Now <ChevronRight size={16} />
          </a>
          <a
            href="/academics"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
          >
            Explore Programmes
          </a>
        </motion.div> */}
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-40"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,140 1140,20 1440,80 L1440,160 L0,160 Z"
            fill="#0b2a4a"
          />
        </svg>
      </div>

      {/* News Ticker Card — overlapping the hero bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="absolute -bottom-20 left-0 right-0 z-20 p-5 bg-white max-w-7xl mx-auto rounded-2xl"
      >
        <div className="px-4 sm:px-6">
          <div className="overflow-hidde">
            {/* Tabs */}
            <div className="flex gap-3 mb-4">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-center text-sm font-semibold cursor-pointer transition-all relative ${
                    activeTab === tab
                      ? "bg-ospoly-deep text-white rounded"
                      : "text-ospoly-deep hover:bg-ospoly-pale rounded"
                  }`}
                >
                  {tab}
                  {/* {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-ospoly-navy"
                    />
                  )} */}
                </button>
              ))}
              {/* Play button */}
              <div className="ml-auto flex items-center pr-4">
                <button className="w-7 h-7 rounded-full bg-ospoly-deep flex items-center justify-center">
                  <ChevronRight size={12} className="text-white ml-0.5" />
                </button>
              </div>
            </div>

            {/* Ticker Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {ANNOUNCEMENTS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`/news/${item.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className={`px-5 py-4 text-sm text-ospoly-navy hover:bg-ospoly-pale/30 transition-colors cursor-pointer ${
                    activeItem === i ? "bg-ospoly-pale/20" : ""
                  }`}
                >
                  <span className="block font-medium leading-snug line-clamp-2">
                    {item.title}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 py-2">
              {ANNOUNCEMENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveItem(i)}
                  className={`rounded-full transition-all ${
                    activeItem === i
                      ? "w-4 h-1.5 bg-ospoly-navy"
                      : "w-1.5 h-1.5 bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
