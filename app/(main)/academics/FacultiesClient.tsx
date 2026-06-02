"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import PageHero, { HeroFilters } from "@/app/components/ui/PageHero";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Department {
  name: string;
  slug: string;
  level: string;
}

export interface FacultyItem {
  id: string;
  name: string;
  abbreviation: string;
  deanName: string | null;
  departments: Department[];
  levels: string[];
}

interface FacultiesClientProps {
  faculties: FacultyItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BREADCRUMBS = [
  { label: "Home",      href: "/" },
  { label: "Academics", href: "/academics" },
  { label: "Faculties" },
]

// ─── Faculty Card ─────────────────────────────────────────────────────────────

function FacultyCard({ faculty, index }: { faculty: FacultyItem; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="bg-ospoly-pale/20 rounded-2xl overflow-hidden p-3"
    >
      {/* Faculty name header */}
      <div className="p-3">
        <p className="font-display font-bold text-ospoly-navy text-sm leading-snug">
          {faculty.name}{" "}
          <span className="font-normal">({`F${faculty.abbreviation}`})</span>
        </p>
        {/* {faculty.deanName && (
          <p className="text-gray-400 text-xs mt-0.5">Dean: {faculty.deanName}</p>
        )} */}
      </div>

      {/* Departments list */}
      <div className="px-5 py-4 bg-ospoly-light/20 rounded-xl">
        {faculty.departments.length > 0 ? (
          <ul className="space-y-4">
            {faculty.departments.map((dept) => (
              <li key={dept.slug || dept.name}>
                <Link
                  href={`/academics`}
                  className="flex items-start gap-2.5 text-[13px] leading-snug mb-1 hover:underline text-ospoly-navy group"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0 group-hover:bg-ospoly-gold transition-colors" />
                  <span>{dept.name}</span>
                </Link>
                {/* Level badge */}
                {/* <span className="ml-4 inline-block text-[10px] font-medium text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                  {dept.level}
                </span> */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-xs italic">
            No programmes listed yet.
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function FacultiesClient({ faculties }: FacultiesClientProps) {
  const [filters, setFilters] = useState<HeroFilters>({
    query:   "",
    faculty: null,
    level:   null,
    mode:    null,
  })

  const handleFilterChange = useCallback((f: HeroFilters) => {
    setFilters(f)
  }, [])

  // Active filter chips
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
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[]

  const filtered = useMemo(() => {
    return faculties.filter((f) => {
      // Faculty name filter
      if (filters.faculty && f.name !== filters.faculty) return false

      // Level filter — check if any department in this faculty matches
      if (filters.level && !f.levels.includes(filters.level)) return false

      // Search query — match faculty name, abbreviation, or any department name
      if (filters.query) {
        const q = filters.query.toLowerCase()
        const inName  = f.name.toLowerCase().includes(q)
        const inAbbr  = f.abbreviation.toLowerCase().includes(q)
        const inDepts = f.departments.some((d) => d.name.toLowerCase().includes(q))
        if (!inName && !inAbbr && !inDepts) return false
      }

      return true
    })
  }, [filters, faculties])

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
                {chip.label.length > 24 ? chip.label.slice(0, 24) + "…" : chip.label}
                <X size={11} />
              </button>
            ))}
            <button
              onClick={() => setFilters({ query: "", faculty: null, level: null, mode: null })}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-5">
          {filtered.length === faculties.length
            ? `Showing all ${faculties.length} faculties`
            : `${filtered.length} of ${faculties.length} ${filtered.length === 1 ? "faculty" : "faculties"}`}
        </p>

        {/* Faculty grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((faculty, i) => (
                <FacultyCard key={faculty.id} faculty={faculty} index={i} />
              ))}
            </motion.div>
          ) : faculties.length === 0 ? (
            // Sanity has no faculties yet
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-base font-semibold text-gray-500 mb-1">
                No faculties found
              </p>
              <p className="text-sm text-gray-400">
                Faculties will appear here once added in the Studio.
              </p>
            </motion.div>
          ) : (
            // Faculties exist but filters returned nothing
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
  )
}