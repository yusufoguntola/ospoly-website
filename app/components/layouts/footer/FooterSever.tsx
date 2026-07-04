"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Phone, Mail } from "lucide-react";
import { SanityFooterDoc, SanityFooterLink } from "@/types";
// adjust path to match your project

// ─── Fallback data (used if Sanity has no footer doc yet) ──
const DEFAULT_LEFT_LINKS: SanityFooterLink[] = [
  { _key: "l1", label: "Academic Programs", url: "/academics" },
  { _key: "l2", label: "Undergraduate Admission", url: "/admission/undergraduate-studies" },
  { _key: "l3", label: "Student Portals", url: "https://portal.ospoly.edu.ng/" },
  { _key: "l4", label: "Library", url: "#" },
  { _key: "l5", label: "Career Services", url: "#" },
  { _key: "l6", label: "Latest News", url: "/news-events" },
  { _key: "l7", label: "Campus Map", url: "#" },
];

const DEFAULT_RIGHT_LINKS: SanityFooterLink[] = [
  { _key: "r1", label: "Alumni Association", url: "#" },
  { _key: "r2", label: "Staff Directory", url: "#" },
  { _key: "r3", label: "Research & Publications", url: "#" },
  { _key: "r4", label: "Student Handbook", url: "#" },
  { _key: "r5", label: "Why OSPOLY", url: "/about/ospoly-profile" },
  { _key: "r6", label: "Faculties & Schools", url: "/academics" },
];

const DEFAULT_ADDRESS_LINES = [
  "Osun State Polytechnic, Iree,",
  "P.M.B. 301, Iree, Osun State, Nigeria.",
];

const DEFAULT_PHONE = "+2348070580088";
const DEFAULT_EMAIL = "info@ospoly.edu.ng";

// Social links stay hardcoded — not in your Sanity schema
const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
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
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function DiagonalPattern() {
  return (
    <Image
      src={"/assets/logo-vector.svg"}
      alt="Ospoly Logo"
      width={2000}
      height={500}
      className="w-[70vh] object-contain absolute -bottom-30 -left-20"
      priority
    />
  );
}

// ─── Main Component ───────────────────────────────────────
interface OspolyFooterProps {
  footerData?: SanityFooterDoc | null;
}

export default function OspolyFooter({ footerData }: OspolyFooterProps) {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // Resolve Sanity data with safe fallbacks so a missing/partial
  // document never breaks the render or the build.
  const content = footerData?.content;

  const leftLinks: SanityFooterLink[] =
    content?.leftLinks && content.leftLinks.length > 0
      ? content.leftLinks
      : DEFAULT_LEFT_LINKS;

  const rightLinks: SanityFooterLink[] =
    content?.rightLinks && content.rightLinks.length > 0
      ? content.rightLinks
      : DEFAULT_RIGHT_LINKS;

  const addressLines: string[] =
    content?.address?.lines && content.address.lines.length > 0
      ? content.address.lines
      : DEFAULT_ADDRESS_LINES;

  const phone = content?.contact?.phone || DEFAULT_PHONE;
  const email = content?.contact?.email || DEFAULT_EMAIL;
  const phoneHref = `tel:${phone.replace(/[\s()]/g, "")}`;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Search:", searchValue);
    }
  }

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
      id="footer"
      className="relative overflow-hidden font-(family-name:--font-barlow,'Barlow',sans-serif)"
      style={{
        background:
          "linear-gradient(170deg, #0d1b2e 0%, #091B34 60%, #071628 100%)",
      }}
    >
      <DiagonalPattern />

      <div className="max-w-7xl mx-auto">
        {/* ── CTA BANNER (unchanged, not in schema) ──────── */}
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
          <div
            className="absolute right-6 top-0 translate-y-1/2 opacity-[0.4] pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src={"/assets/logo-vector.png"}
              alt="Ospoly Logo"
              width={100}
              height={100}
              className="w-full h-full object-contain"
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
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-1">
                Let&apos;s stay in touch!
              </h2>
              <p className="text-white/70 text-sm md:text-base">
                Join our mailing list to learn more about Ospoly
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto min-w-70">
              <Link
                target="_blank"
                href="https://portal.ospoly.edu.ng/apply"
                className="block text-center bg-white text-ospoly-deep text-[13px] font-semibold tracking-[0.06em] py-3.5 px-8 rounded-sm hover:bg-ospoly-pale transition-colors"
              >
                Apply Now
              </Link>
              <Link
                target="_blank"
                href="#"
                className="block text-center border border-white text-white text-[13px] font-semibold tracking-[0.06em] py-3.5 px-8 rounded-sm hover:bg-white/10 transition-colors"
              >
                Connect with an admission counselor
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ svg, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {svg}
                </Link>
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
              className="flex-1 bg-transparent border-none outline-none text-white text-[14px] placeholder:text-white/30 [&::-webkit-search-cancel-button]:hidden"
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

        {/* ── NAV LINKS + CONTACT (from Sanity) ──────────── */}
        <div className="relative px-4 sm:px-8 md:px-12 mt-12 pb-8">
          <div className="border-t border-white/8 pt-10 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-6">
            {/* Left links */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-0 list-none"
            >
              {leftLinks.map((link, i) => (
                <motion.li
                  key={link._key ?? link.label}
                  custom={i}
                  variants={fadeUp}
                  className="border-b border-white/7 w-45 md:w-55"
                >
                  <Link
                    target="_blank"
                    href={link.url || "#"}
                    className="block py-3 text-white/60 text-[13.5px] font-light hover:text-white transition-colors"
                  >
                    {link.label}
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
              {rightLinks.map((link, i) => (
                <motion.li
                  key={link._key ?? link.label}
                  custom={i}
                  variants={fadeUp}
                  className="border-b border-white/7 w-45 md:w-55"
                >
                  <Link
                    target="_blank"
                    href={link.url || "#"}
                    className="block py-3 text-white/60 text-[13.5px] font-light hover:text-white transition-colors"
                  >
                    {link.label}
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
                target="_blank"
                href="/"
                className="flex items-center gap-2.5 shrink-0 mr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
                aria-label="OSPOLY home"
              >
                <Image
                  src={"/assets/logo.svg"}
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
                    {addressLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < addressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-white/55 text-[13px]">
                  <Phone
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-ospoly-gold"
                  />
                  <a href={phoneHref} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/55 text-[13px]">
                  <Mail
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-ospoly-gold"
                  />
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                    {email}
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
              Copyright &copy; {new Date().getFullYear()} Osun State
              Polytechnic, Iree. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                target="_blank"
                href="/terms"
                className="text-white/35 text-[12px] hover:text-white/60 transition-colors underline underline-offset-2"
              >
                Terms of Use
              </Link>
              <Link
                target="_blank"
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