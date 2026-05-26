"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Mail } from "lucide-react";

// ─── Data ────────────────────────────────────────────────
const LEFT_LINKS = [
  { text: "Academic Programs", href: "/academics/programs" },
  { text: "Undergraduate Admission", href: "/admission/undergraduate" },
  { text: "Student Portals", href: "/portals" },
  { text: "Library", href: "/library" },
  { text: "Career Services", href: "/careers" },
  { text: "Latest News", href: "/news" },
  { text: "Campus Map", href: "/campus-map" },
];

const RIGHT_LINKS = [
  { text: "Alumni Association", href: "/alumni" },
  { text: "Staff Directory", href: "/staff" },
  { text: "Research & Publications", href: "/research" },
  { text: "Student Handbook", href: "/handbook" },
  { text: "Why OSPOLY", href: "/about/why-ospoly" },
  { text: "Faculties & Schools", href: "/academics/faculties" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

// ─── Diagonal gear / hex pattern (SVG bg) ────────────────
function DiagonalPattern() {
  return (
   <Image
              src={"/assets/logo-vector.png"}
              alt="Ospoly Logo"
              width={3000}
              height={1000}
              className="w-[80vh] object-contain absolute -bottom-30 -left-20 opacity-[0.4]"
              priority
            />
  );
}

// // ─── Gear crest SVG (inline, no Image dependency) ────────
// function GearCrest() {
//   return (
//     <svg
//       viewBox="0 0 120 120"
//       className="w-[90px] h-[90px] opacity-90"
//       aria-hidden="true"
//     >
//       {/* Outer ring */}
//       <circle
//         cx="60"
//         cy="60"
//         r="52"
//         fill="none"
//         stroke="#A06C00"
//         strokeWidth="2.5"
//       />
//       {/* Gear teeth */}
//       {Array.from({ length: 12 }).map((_, i) => {
//         const angle = (i * 30 * Math.PI) / 180;
//         const x = 60 + 50 * Math.sin(angle);
//         const y = 60 - 50 * Math.cos(angle);
//         return (
//           <rect
//             key={i}
//             x={x - 4}
//             y={y - 8}
//             width="8"
//             height="14"
//             rx="1.5"
//             fill="#A06C00"
//             transform={`rotate(${i * 30} ${x} ${y})`}
//           />
//         );
//       })}
//       {/* Inner filled circle */}
//       <circle
//         cx="60"
//         cy="60"
//         r="36"
//         fill="#091B34"
//         stroke="#A06C00"
//         strokeWidth="1.5"
//       />
//       {/* Torch vertical */}
//       <line
//         x1="60"
//         y1="38"
//         x2="60"
//         y2="82"
//         stroke="#A06C00"
//         strokeWidth="3.5"
//         strokeLinecap="round"
//       />
//       {/* Cross bars */}
//       <line
//         x1="46"
//         y1="50"
//         x2="74"
//         y2="50"
//         stroke="#A06C00"
//         strokeWidth="2.5"
//         strokeLinecap="round"
//       />
//       <line
//         x1="50"
//         y1="58"
//         x2="70"
//         y2="58"
//         stroke="#A06C00"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//       {/* Flame */}
//       <ellipse cx="60" cy="35" rx="6" ry="8" fill="#A06C00" />
//       <ellipse cx="60" cy="33" rx="3.5" ry="4.5" fill="#c9a227" />
//     </svg>
//   );
// }

// ─── Main Component ───────────────────────────────────────
export default function OspolyFooter() {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Search:", searchValue);
    }
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <footer
      className="relative overflow-hidden font-(family-name:--font-barlow,'Barlow',sans-serif)"
      style={{
        background:
          "linear-gradient(170deg, #0d1b2e 0%, #091B34 60%, #071628 100%)",
      }}
    >
      <DiagonalPattern />

     <div className="max-w-7xl mx-auto">
         {/* ── CTA BANNER ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-4 sm:mx-8 md:mx-12 mt-10 mb-0 rounded-xl overflow-hidden "
        style={{
          background:
            "linear-gradient(130deg, #8B5C00 0%, #A06C00 50%, #7a5000 100%)",
        }}
      >
        {/* subtle gear watermark */}
        <div
          className="absolute right-6 top-0 translate-y-1/2 opacity-[0.4] pointer-events-none"
          aria-hidden="true"
        >
        
          <Image
              src={"/assets/logo-vector.png"}
              alt="Ospoly Logo"
              width={120}
              height={60}
              className="w-50 object-contain"
              priority
            />
        </div>
         <div
          className="absolute top-0 translate-y-1/2 opacity-[0.4] pointer-events-none"
          aria-hidden="true"
        >
        
          <Image
              src={"/assets/logo-vector.png"}
              alt="Ospoly Logo"
              width={120}
              height={60}
              className="w-50 object-contain hidden md:block"
              priority
            />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 md:px-12">
          {/* Text */}
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-1">
              Let&apos;s stay in touch!
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Join our mailing list to learn more about Ospoly
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 w-full sm:w-auto min-w-70">
            <Link
              href="/apply"
              className="
                block text-center bg-white text-ospoly-deep text-[13px] font-semibold
                tracking-[0.06em] py-3.5 px-8 rounded-sm
                hover:bg-ospoly-pale transition-colors
              "
            >
              Apply Now
            </Link>
            <Link
              href="/admission/counselor"
              className="
                block text-center border border-white text-white text-[13px] font-semibold
                tracking-[0.06em] py-3.5 px-8 rounded-sm
                hover:bg-white/10 transition-colors
              "
            >
              Connect with an admission counselor
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ svg, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/70 hover:text-white transition-colors"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── SEARCH BAR ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="relative px-4 sm:px-8 md:px-12 mt-8"
      >
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/5 border border-white/10 rounded-full px-6 h-14.5 gap-4 max-w-full"
          role="search"
        >
          <input
            ref={searchRef}
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search people, place, or things"
            className="
              flex-1 bg-transparent border-none outline-none
              text-white text-[14px] placeholder:text-white/30
              [&::-webkit-search-cancel-button]:hidden
            "
            aria-label="Search OSPOLY"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className="text-white/40 hover:text-white transition-colors shrink-0"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
        </form>
      </motion.div>

      {/* ── NAV LINKS + CONTACT ────────────────────────── */}
      <div className="relative px-4 sm:px-8 md:px-12 mt-12 pb-8">
        <div className="border-t border-white/8 pt-10 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-6">
          {/* Left links */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-0 list-none"
          >
            {LEFT_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                custom={i}
                variants={fadeUp}
                className="border-b border-white/7 w-45 md:w-55"
              >
                <Link
                  href={link.href}
                  className="
                    block py-3 text-white/60 text-[13.5px] font-light
                    hover:text-white transition-colors
                  "
                >
                  {link.text}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right links */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-0 list-none"
          >
            {RIGHT_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                custom={i}
                variants={fadeUp}
                className="border-b border-white/7 w-45 md:w-55"
              >
                <Link
                  href={link.href}
                  className="
                    block py-3 text-white/60 text-[13.5px] font-light
                    hover:text-white transition-colors
                  "
                >
                  {link.text}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Crest + Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-start gap-6 col-span-2 md:col-span-1"
          >
            <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 mr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            aria-label="OSPOLY home"
          >
            <Image
              src={"/assets/logo.png"}
              alt="Ospoly Logo"
              width={120}
              height={60}
              className="w-20 h-auto sm:w-25 md:w-30 object-contain grayscale opacity-60"
              priority
            />
          </Link>

            <address className="not-italic flex flex-col gap-4">
              <div className="flex items-start gap-3 text-white/55 text-[13px]">
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 mt-0.5 text-ospoly-gold"
                />
                <span className="leading-relaxed">
                  Osun State Polytechnic, Iree,
                  <br />
                  P.M.B. 301, Iree, Osun State, Nigeria.
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/55 text-[13px]">
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-ospoly-gold"
                />
                <a
                  href="tel:+2348000000000"
                  className="hover:text-white transition-colors"
                >
                  +234 (0)80X XXX XXXX
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/55 text-[13px]">
                <Mail
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-ospoly-gold"
                />
                <a
                  href="mailto:info@ospoly.edu.ng"
                  className="hover:text-white transition-colors"
                >
                  info@ospoly.edu.ng
                </a>
              </div>
            </address>
          </motion.div>
        </div>
      </div>

      {/* ── COPYRIGHT BAR ──────────────────────────────── */}
      <div className="relative border-t border-white/8 px-4 sm:px-8 md:px-12 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/35 text-[12px]">
            Copyright &copy; 2025 Osun State Polytechnic, Iree. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-white/35 text-[12px] hover:text-white/60 transition-colors underline underline-offset-2"
            >
              Terms of Use
            </Link>
            <Link
              href="/privacy"
              className="text-white/35 text-[12px] hover:text-white/60 transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
     </div>
    </footer>
  );
}
