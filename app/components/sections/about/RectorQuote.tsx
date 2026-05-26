"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RectorQuoteProps {
  quote: string;
  name: string;
  title: string;
  /** Path to the rector's portrait. Falls back to a placeholder. */
  imageUrl?: string;
}

export default function RectorQuote({
  quote,
  name,
  title,
  imageUrl,
}: RectorQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="flex flex-col sm:flex-row items-start gap-6 mt-12"
    >
      {/* Portrait */}
      <div className="shrink-0">
        <div className="relative w-32.5 h-38.75 sm:w-36.25 sm:h-42.5 rounded-lg overflow-hidden border-2 border-ospoly-gold/60 shadow-md shadow-ospoly-gold/10">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Portrait of ${name}`}
              fill
              className="object-cover object-top absolute inset-2"
              sizes="145px"
            />
          ) : (
            /* Placeholder avatar */
            <div className="absolute inset-0 bg-linear-to-b from-ospoly-pale to-ospoly-light/40 flex items-end justify-center pb-4">
              <svg
                viewBox="0 0 80 90"
                className="w-20 text-ospoly-navy/30"
                fill="currentColor"
              >
                <ellipse cx="40" cy="32" rx="20" ry="22" />
                <path d="M0 90 C0 65 80 65 80 90Z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Quote block */}
      <div className="flex-1 min-w-0">
        {/* Opening quotation marks */}
        <div className="flex gap-0.5 mb-2" aria-hidden>
          {[0, 1].map((i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="w-7 h-7 text-ospoly-gold fill-current"
            >
              <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003z" />
            </svg>
          ))}
        </div>

        {/* Quote text */}
        <blockquote className="font-display text-ospoly-navy text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-6">
          {quote}
        </blockquote>

        {/* Divider + attribution */}
        <div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="h-px bg-gray-200 mb-4 w-full max-w-xs"
            aria-hidden
          />
          <p className="text-ospoly-navy font-semibold text-sm">{name}</p>
          <p className="text-gray-400 text-sm mt-0.5">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
