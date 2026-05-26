"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category?: string;
  date?: string;
  slug: string;
}

export interface NewsTab {
  /** Label shown on the tab button */
  label: string;
  /** Unique key for this tab */
  key: string;
  /** Articles/items for this tab */
  items: NewsItem[];
}

export interface NewsUpdateSectionProps {
  /** Section heading — e.g. "News & Update" */
  heading?: string;
  /** Subheading text on the right */
  subheading?: string;
  /** Array of tabs. First tab is active by default. */
  // tabs: NewsTab[];
  /** How many items per page (default: 3) */
  itemsPerPage?: number;
  /** Background colour class (default: "bg-white") */
  bgClass?: string;
  /** Optional className forwarded to the outer section */
  className?: string;
}

// ─── Decorative shapes (top-right, matching the screenshot) ──────────────────


function DecorativeShapes() {
  return (
    <div
      className="pointer-events-none absolute top-0 right-0 w-48 h-56 overflow-hidden"
      aria-hidden
    >
      {/* Large rotated square */}
      <div
        className="absolute -top-6 -right-7 w-36 h-36 border border-ospoly-pale rounded-sm"
        style={{ transform: "rotate(18deg)" }}
      />
      {/* Smaller rotated square */}
      <div
        className="absolute top-14 -right-2.5 w-20 h-20 border border-ospoly-light/40 rounded-sm"
        style={{ transform: "rotate(12deg)" }}
      />
      {/* Tiny accent */}
      <div
        className="absolute top-2 right-24 w-10 h-10 border border-ospoly-sky/20 rounded-sm"
        style={{ transform: "rotate(30deg)" }}
      />
            {/* <Image src={"/assets/logo-vector.png"} alt={""} width={500} height={500} /> */}

    </div>
  );
}

// ─── Single article row ───────────────────────────────────────────────────────

interface ArticleRowProps {
  item: NewsItem;
  index: number;
  isInView: boolean;
}

function ArticleRow({ item, index, isInView }: ArticleRowProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Top divider (except first item) */}
      {index > 0 && <div className="h-px bg-gray-100 mb-8" />}

      <Link
        href={`/news/${item.slug}`}
        className="group grid grid-cols-[140px_1fr_1fr] gap-6 items-start mb-8
                   sm:grid-cols-[160px_1fr_1fr]
                   hover:[&_h3]:text-ospoly-gold transition-all"
      >
        {/* Image */}
        <div className="relative w-35 sm:w-40 aspect-4/3 rounded-lg overflow-hidden bg-ospoly-pale shrink-0">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="160px"
            />
          ) : (
            // Placeholder when no image
            <div className="absolute inset-0 bg-linear-to-br from-ospoly-pale to-ospoly-light/40 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-ospoly-sky/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col justify-center">
          {item.category && (
            <span className="text-ospoly-gold text-xs font-semibold tracking-widest uppercase mb-2">
              {item.category}
            </span>
          )}
          <h3 className="font-display font-bold text-ospoly-navy text-base sm:text-lg leading-snug transition-colors duration-200">
            {item.title}
          </h3>
          {item.date && (
            <p className="text-gray-400 text-xs mt-2">{item.date}</p>
          )}
        </div>

        {/* Excerpt */}
        <div className="hidden sm:block">
          {/* Decorative quote-like left border on first item */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-5">
            {item.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-100">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-ospoly-navy hover:bg-ospoly-pale/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-full text-sm font-semibold transition-all ${
            page === currentPage
              ? "bg-ospoly-navy text-white shadow-md shadow-ospoly-navy/20"
              : "text-gray-500 hover:text-ospoly-navy hover:bg-ospoly-pale/60"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-ospoly-navy hover:bg-ospoly-pale/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function NewsUpdateSection({
  heading = "News & Update",
  subheading = "The hub for institutional announcements, academic achievements, and official communiqués from Osun State Polytechnic, Iree.",
  // tabs,
  itemsPerPage = 3,
  bgClass = "bg-white",
  className = "",
}: NewsUpdateSectionProps) {

  const newsItems = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    title:
      "Engineering Faculty Secures National NBTE Accreditation for All HND Programmes",
    excerpt:
      "The National Board for Technical Education (NBTE) has officially renewed full accreditation for all Higher National Diploma (HND) programmes in the Faculty of Engineering, citing the Polytechnic's state-of-the-art workshops and qualified faculty. This achievement underscores OSPOLY's commitment to quality technical training…",
    imageUrl: ["/assets/news.png", "/assets/news.png", "/assets/news.png"][
      i % 3
    ],
    category: ["Academics", "Research", "Campus"][i % 3],
    date: `May ${10 - i}, 2025`,
    slug: `engineering-faculty-nbte-${i + 1}`,
  }));

  const eventsItems = Array.from({ length: 4 }, (_, i) => ({
    id: String(i + 1),
    title:
      "Annual Inter-Faculty Sports & Cultural Festival — Registration Open",
    excerpt:
      "Students and staff are invited to participate in the annual Sports and Cultural Festival scheduled for the last week of June. Events include football, athletics, debate, and traditional dance competitions.",
    imageUrl: "/assets/news.png",
    category: "Events",
    date: `June ${20 + i}, 2025`,
    slug: `annual-festival-${i + 1}`,
  }));

  const TABS: NewsTab[] = [
    { key: "news", label: "News", items: newsItems },
    { key: "events", label: "Upcoming Events", items: eventsItems },
  ];

  const [activeTabKey, setActiveTabKey] = useState(TABS[0]?.key ?? "");
  const [currentPage, setCurrentPage] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Derived data
  const activeTab = TABS.find((t) => t.key === activeTabKey) ?? TABS[0];
  const totalPages = Math.ceil((activeTab?.items.length ?? 0) / itemsPerPage);
  const pagedItems = (activeTab?.items ?? []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    setCurrentPage(1);
  };

  

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${bgClass} ${className}`}
    >
      {/* Decorative background shapes — top right */}
      <DecorativeShapes />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* ── Tab Bar ─────────────────────────────────────── */}
        <div className="inline-flex rounded-lg overflow-hidden border border-gray-200 mb-12">
          {TABS.map((tab) => {
            const isActive = tab.key === activeTabKey;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`p-5 w-40 text-sm font-semibold transition-all relative cursor-pointer ${
                  isActive
                    ? "bg-ospoly-navy text-white"
                    : " text-gray-500 hover:text-ospoly-gold hover:underline bg-ospoly-pale/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Section Header ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-ospoly-navy text-4xl sm:text-5xl leading-tight"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base leading-relaxed"
          >
            {subheading}
          </motion.p>
        </div>

        {/* ── Article List ────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTabKey}-page-${currentPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {pagedItems.length > 0 ? (
              pagedItems.map((item, i) => (
                <ArticleRow
                  key={item.id}
                  item={item}
                  index={i}
                  isInView={isInView}
                />
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 text-sm">
                No items to display.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Pagination ──────────────────────────────────── */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
        <Image
    src="/assets/logo-vector.png"
    alt="watermark"
    width={300}
    height={300}
    className="absolute opacity-90 pointer-events-none"
  />
    </section>
  );
}
