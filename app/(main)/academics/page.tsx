"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import PageHero from "../../components/ui/PageHero";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BREADCRUMBS = [
  { label: "Home",      href: "/" },
  { label: "Academics", href: "/academics" },
  { label: "Faculties" },
];

type Level = "National Diploma (ND)" | "Higher National Diploma (HND)";
type Mode  = "Full-Time" | "Part-Time / Distance Learning";

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
    departments: [
      "Accountancy",
      "Banking and Finance",
    ],
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

const ALL_FACULTIES = FACULTIES.map((f) => f.name);
const ALL_LEVELS: Level[] = ["National Diploma (ND)", "Higher National Diploma (HND)"];
const ALL_MODES: Mode[]   = ["Full-Time", "Part-Time / Distance Learning"];

// ─── Dropdown component ───────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

function Dropdown({ label, options, selected, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
          selected
            ? "bg-ospoly-navy text-white border-ospoly-navy"
            : "bg-white/15 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
        }`}
      >
        {selected ? selected.split(" ")[0] + "..." : label}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden z-50"
          >
            <button
              onClick={() => { onSelect(null); setOpen(false); }}
              className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-gray-50 ${
                !selected
                  ? "text-ospoly-gold font-semibold bg-ospoly-pale/40"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              All {label.replace("By ", "")}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onSelect(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  selected === opt
                    ? "text-ospoly-navy font-semibold bg-ospoly-pale/60"
                    : "text-gray-600 hover:bg-gray-50 hover:text-ospoly-navy"
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Faculty card ─────────────────────────────────────────────────────────────

function FacultyCard({ faculty, index }: { faculty: Faculty; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-50">
        <p className="font-display font-bold text-ospoly-navy text-sm leading-snug">
          {faculty.name}{" "}
          <span className="text-ospoly-sky/80">({faculty.abbreviation})</span>
        </p>
      </div>

      {/* Departments list */}
      <div className="px-5 py-4 bg-ospoly-pale/20">
        <ul className="space-y-2">
          {faculty.departments.map((dept) => (
            <li key={dept} className="flex items-start gap-2.5 text-[13px] text-gray-600 leading-snug">
              <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-ospoly-sky/60 shrink-0" />
              {dept}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Search + filter slot (injected into PageHero) ────────────────────────────

interface HeroSlotProps {
  query: string;
  setQuery: (v: string) => void;
  faculty: string | null;
  setFaculty: (v: string | null) => void;
  level: string | null;
  setLevel: (v: string | null) => void;
  mode: string | null;
  setMode: (v: string | null) => void;
}

function HeroSlot({
  query, setQuery,
  faculty, setFaculty,
  level, setLevel,
  mode, setMode,
}: HeroSlotProps) {
  return (
    <div className="space-y-3">
      <p className="text-white/70 text-xs font-semibold tracking-widest uppercase">
        Programmes finder
      </p>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 max-w-2xl shadow-lg">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search Programs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
        <button className="w-8 h-8 bg-ospoly-navy rounded-lg flex items-center justify-center shrink-0 hover:bg-ospoly-deep transition-colors">
          <Search size={14} className="text-white" />
        </button>
      </div>

      {/* Filter dropdowns */}
      <div className="flex flex-wrap gap-2">
        <Dropdown
          label="By Faculties"
          options={ALL_FACULTIES}
          selected={faculty}
          onSelect={setFaculty}
        />
        <Dropdown
          label="By Level"
          options={ALL_LEVELS}
          selected={level}
          onSelect={setLevel}
        />
        <Dropdown
          label="By Modes"
          options={ALL_MODES}
          selected={mode}
          onSelect={setMode}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FacultiesPage() {
  const [query,   setQuery]   = useState("");
  const [faculty, setFaculty] = useState<string | null>(null);
  const [level,   setLevel]   = useState<string | null>(null);
  const [mode,    setMode]    = useState<string | null>(null);

  // Active filter chips
  const activeFilters = [
    faculty && { key: "faculty", label: faculty.split(" ").slice(0, 2).join(" "), clear: () => setFaculty(null) },
    level   && { key: "level",   label: level,   clear: () => setLevel(null)   },
    mode    && { key: "mode",    label: mode,     clear: () => setMode(null)    },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const filtered = useMemo(() => {
    return FACULTIES.filter((f) => {
      if (faculty && f.name !== faculty) return false;
      if (level   && !f.levels.includes(level as Level)) return false;
      if (mode    && !f.modes.includes(mode as Mode))    return false;
      if (query) {
        const q = query.toLowerCase();
        const inName  = f.name.toLowerCase().includes(q);
        const inDepts = f.departments.some((d) => d.toLowerCase().includes(q));
        if (!inName && !inDepts) return false;
      }
      return true;
    });
  }, [query, faculty, level, mode]);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="Programmes"
        size="tall"
        slot={
          <HeroSlot
            query={query}   setQuery={setQuery}
            faculty={faculty} setFaculty={setFaculty}
            level={level}   setLevel={setLevel}
            mode={mode}     setMode={setMode}
          />
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        <Breadcrumb items={BREADCRUMBS} />

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilters.map((f) => (
              <button
                key={f.key}
                onClick={f.clear}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-ospoly-pale rounded-full text-xs text-ospoly-navy font-medium hover:bg-ospoly-light/40 transition-colors"
              >
                {f.label}
                <X size={11} />
              </button>
            ))}
            <button
              onClick={() => { setFaculty(null); setLevel(null); setMode(null); setQuery(""); }}
              className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-5">
          {filtered.length === FACULTIES.length
            ? `Showing all ${FACULTIES.length} faculties`
            : `${filtered.length} of ${FACULTIES.length} faculties`}
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
              className="text-center py-20 text-gray-400"
            >
              <p className="text-base font-medium mb-1">No faculties match your search</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
