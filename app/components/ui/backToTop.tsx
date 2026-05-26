"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="
            fixed bottom-8 right-6 z-50
            flex flex-col items-center gap-1.5
            group focus-visible:outline-none
          "
          aria-label="Back to top"
        >
          <div className="
            w-11 h-11 rounded-lg
            bg-ospoly-navy border border-white/10
            flex items-center justify-center
            shadow-[0_8px_32px_rgba(0,0,0,0.45)]
            group-hover:border-ospoly-gold/60
            group-hover:bg-ospoly-deep
            transition-colors duration-200
          ">
            <ArrowUp
              size={18}
              strokeWidth={1.8}
              className="text-white group-hover:text-ospoly-gold transition-colors duration-200"
            />
          </div>
          <span className="
            text-white/40 text-[10px] tracking-widest uppercase
            group-hover:text-white/60 transition-colors duration-200
          ">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}