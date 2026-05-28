"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ANNOUNCEMENTS } from "@/lib/data";
import Image from "next/image";

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
            // backgroundPosition: "center 30%",
          }}
        />
        {/* Fallback gradient when image is absent */}
        {/* <div
          className="absolute inset-0 bg-linear-to-b 
  from-ospoly-deep/70 
  via-ospoly-navy/50 
  to-ospoly-deep/90"
        /> */}
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
            <div className="block group-hover:hidden md:space-y-4">
              <p className="text-white font-display font-bold text-lg md:text-xl leading-tight ">
                SKILLED <br /> FOR IMPACT
              </p>
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-ospoly-gold ">Since 1992</p>
                <svg
                  width="18"
                  height="9"
                  viewBox="0 0 18 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                >
                  <g clip-path="url(#clip0_2191_198)">
                    <g clip-path="url(#clip1_2191_198)">
                      <path
                        d="M8.79958 8.52004L4.76758 5.13204L5.57958 4.04004L8.79958 6.72804L12.0196 4.04004L12.8316 5.13204L8.79958 8.52004Z"
                        fill="#B48B3C"
                      />
                      <path
                        d="M8.79958 4.73977L4.76758 1.32377L5.57958 0.259766L8.79958 2.94777L12.0196 0.259766L12.8316 1.32377L8.79958 4.73977Z"
                        fill="#B48B3C"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2191_198">
                      <rect width="17.6" height="8.8" fill="white" />
                    </clipPath>
                    <clipPath id="clip1_2191_198">
                      <rect
                        width="16.8"
                        height="8.4"
                        fill="white"
                        transform="translate(0.399902 0.120117)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="hidden group-hover:block  space-y-3">
              <p className="text-white font-display font-bold text-lg md:text-xl leading-tight">
                WHAT SETS <br /> US APART
              </p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-center mx-auto"
              >
                <path
                  d="M12.0001 21.2501C11.8101 21.2501 11.6201 21.1801 11.4701 21.0301L5.40012 14.9601C5.11012 14.6701 5.11012 14.1901 5.40012 13.9001C5.69012 13.6101 6.17012 13.6101 6.46012 13.9001L12.0001 19.4401L17.5401 13.9001C17.8301 13.6101 18.3101 13.6101 18.6001 13.9001C18.8901 14.1901 18.8901 14.6701 18.6001 14.9601L12.5301 21.0301C12.3801 21.1801 12.1901 21.2501 12.0001 21.2501Z"
                  fill="#B48B3C"
                />
                <path
                  d="M12 21.08C11.59 21.08 11.25 20.74 11.25 20.33V3.5C11.25 3.09 11.59 2.75 12 2.75C12.41 2.75 12.75 3.09 12.75 3.5V20.33C12.75 20.74 12.41 21.08 12 21.08Z"
                  fill="#B48B3C"
                />
              </svg>
            </div>
          </div>

          {/* Spinning Gear Image */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 scale-150 flex items-center justify-center pointer-events-none"
          >
            <Image
              src="/assets/vector.png"
              alt=""
              className="w-full h-full object-contain opacity-"
              height={100}
              width={100}
            />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-50"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#98BCEE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1F324D" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 Q720,320 1440,0 L1440,160 L0,160 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-50"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#88ABD3" />
              <stop offset="100%" stopColor="#1F324D" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 Q720,320 1440,0 L1440,160 L0,160 Z"
            fill="url(#waveGradient)"
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
          <div className="overflow-hidden">
            {/* Tabs */}
            <div className="flex gap-3 mb-4">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-center font-bold cursor-pointer transition-all relative ${
                    activeTab === tab
                      ? "bg-ospoly-deep text-white rounded"
                      : "text-gray-400 hover:bg-ospoly-pale rounded"
                  }`}
                >
                  {tab}
              
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
                  className={`px-5 py-4 text-sm text-ospoly-navy  hover:bg-ospoly-pale/30 transition-colors cursor-pointer ${
                    activeItem === i ? "bg-ospoly-pale/20" : ""
                  }`}
                >
                  <span className="block font-bold leading-snug line-clamp-2">
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
