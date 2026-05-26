"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import PageHero, { HeroFilters } from "@/app/components/ui/PageHero";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Academics", href: "/academics" },
  { label: "Faculties" },
];

type Level = "National Diploma (ND)" | "Higher National Diploma (HND)";
type Mode = "Full-Time" | "Part-Time / Distance Learning";

interface Faculty {
  id: string;
  name: string;
  abbreviation: string;
  departments: string[];
  levels: Level[];
  modes: Mode[];
}

const FACULTIES: Faculty[] = [
  {
    id: "fet",
    name: "Faculty of Engineering Technology",
    abbreviation: "FET",
    departments: [
      "Electrical and Electronics Engineering Technology",
      "Computer Engineering Technology",
      "Civil Engineering Technology",
      "Mechanical Engineering Technology",
      "Agricultural and Bio-Environmental Engineering / Technology",
      "Welding and Fabrication Technology",
    ],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time"],
  },
  {
    id: "fict",
    name: "Faculty of Information and Communication Technology",
    abbreviation: "FICT",
    departments: [
      "Mass Communication",
      "Computer Science",
      "Library and Information Sciences",
      "Office Technology Management (OTM)",
    ],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time", "Part-Time / Distance Learning"],
  },
  {
    id: "fes",
    name: "Faculty of Environmental Studies",
    abbreviation: "FES",
    departments: [
      "Urban and Regional Planning (Town Planning)",
      "Quantity Surveying",
      "Architectural Technology",
      "Estate Management and Valuation",
      "Building Technology",
      "Surveying & Geo-informatics (ND level accredited)",
    ],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time"],
  },
  {
    id: "fos",
    name: "Faculty of Science",
    abbreviation: "FOS",
    departments: [
      "Science Laboratory Technology (SLT)",
      "Statistics",
      "Food Science and Technology",
      "Applied Sciences Department",
    ],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time", "Part-Time / Distance Learning"],
  },
  {
    id: "ffs",
    name: "Faculty of Financial Studies",
    abbreviation: "FFS",
    departments: ["Accountancy", "Banking and Finance"],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time", "Part-Time / Distance Learning"],
  },
  {
    id: "fms",
    name: "Faculty of Management Studies",
    abbreviation: "FMS",
    departments: [
      "Business Administration and Management",
      "Marketing",
      "Procurement and Supply Chain Management",
      "Public Administration",
    ],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time", "Part-Time / Distance Learning"],
  },
  {
    id: "faid",
    name: "Faculty of Art and Industrial Design",
    abbreviation: "FAID",
    departments: [
      "Arts and Design",
      "Ceramic Technology",
      "Textile Technology",
      "Fashion Design and Clothing Technology",
    ],
    levels: ["National Diploma (ND)", "Higher National Diploma (HND)"],
    modes: ["Full-Time"],
  },
  {
    id: "svte",
    name: "School of Vocational and Technical Education",
    abbreviation: "SVTE",
    departments: [
      "General Studies in Education",
      "Science Education",
      "General Education",
      "Business Education",
      "Technical Education",
    ],
    levels: ["Higher National Diploma (HND)"],
    modes: ["Full-Time", "Part-Time / Distance Learning"],
  },
];

// ─── Faculty card ─────────────────────────────────────────────────────────────

function FacultyCard({ faculty, index }: { faculty: Faculty; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="bg-ospoly-pale/90 rounded-2xl transition-shadow overflow-hidden p-3"
    >
      <div className="p-3 ">
        <p className="font-display font-bold text-ospoly-navy text-sm leading-snug">
          {faculty.name}{" "}
          <span className="">({faculty.abbreviation})</span>
        </p>
      </div>
      <div className="px-5 py-4 bg-ospoly-light/60 rounded-xl h-[75%]">
        <ul className="space-y-4">
          {faculty.departments.map((dept) => (
            <Link
              href={`/departments/${dept.toLowerCase().replace(/\s+/g, "-")}`}
              key={dept}
              className="underline"
            >
              <li className="flex items-start gap-2.5 text-[13px] leading-snug mb-3">
                <span className="mt-1.25 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                {dept}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FacultiesPage() {
  const [filters, setFilters] = useState<HeroFilters>({
    query: "",
    faculty: null,
    level: null,
    mode: null,
  });

  const handleFilterChange = useCallback((f: HeroFilters) => {
    setFilters(f);
  }, []);

  // Active chips derived from filter state
  const activeChips = [
    filters.faculty && {
      key: "faculty",
      label: filters.faculty,
      clear: () => setFilters((p) => ({ ...p, faculty: null })),
    },
    filters.level && {
      key: "level",
      label: filters.level,
      clear: () => setFilters((p) => ({ ...p, level: null })),
    },
    filters.mode && {
      key: "mode",
      label: filters.mode,
      clear: () => setFilters((p) => ({ ...p, mode: null })),
    },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const filtered = useMemo(() => {
    return FACULTIES.filter((f) => {
      if (filters.faculty && f.name !== filters.faculty) return false;
      if (filters.level && !f.levels.includes(filters.level as Level))
        return false;
      if (filters.mode && !f.modes.includes(filters.mode as Mode)) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const inName = f.name.toLowerCase().includes(q);
        const inAbbr = f.abbreviation.toLowerCase().includes(q);
        const inDepts = f.departments.some((d) => d.toLowerCase().includes(q));
        if (!inName && !inAbbr && !inDepts) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="Programmes"
        size="default"
        showFinder
        onFilterChange={handleFilterChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        <Breadcrumb items={BREADCRUMBS} />

        {/* Active filter chips */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.clear}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-ospoly-pale rounded-full text-xs text-ospoly-navy font-medium hover:bg-ospoly-light/40 transition-colors"
              >
                {chip.label.length > 24
                  ? chip.label.slice(0, 24) + "…"
                  : chip.label}
                <X size={11} />
              </button>
            ))}
            <button
              onClick={() =>
                setFilters({
                  query: "",
                  faculty: null,
                  level: null,
                  mode: null,
                })
              }
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-5">
          {filtered.length === FACULTIES.length
            ? `Showing all ${FACULTIES.length} faculties`
            : `${filtered.length} of ${FACULTIES.length} ${filtered.length === 1 ? "faculty" : "faculties"}`}
        </p>

        {/* Faculty grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((faculty, i) => (
                <FacultyCard key={faculty.id} faculty={faculty} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-base font-semibold text-gray-500 mb-1">
                No results found
              </p>
              <p className="text-sm text-gray-400">
                Try adjusting your filters or search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
