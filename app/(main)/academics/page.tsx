import { getFacultiesQuery, getProgrammesQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import type { SanityFaculty, SanityProgramme } from "@/sanity/lib/sanity.types";
import FacultiesClient from "./FacultiesClient";



const LEVEL_LABEL: Record<string, string> = {
  ond: "National Diploma (ND)",
  hnd: "Higher National Diploma (HND)",
  bachelor: "Bachelor",
  master: "Master",
  certificate: "Certificate",
};


  // Mode comes from programme level — part-time maps to distance-learning type
  // Add a modeOptions field to your Sanity schema later; for now derive from levels
  const MODE_LABEL: Record<string, string> = {
    'full-time': 'Full-Time',
    'part-time': 'Part-Time / Distance Learning',
  }

function deriveAbbreviation(name: string): string {
  const cleaned = name
    .replace(/^(faculty|school|department|institute)\s+of\s+/i, "")
    .trim();
  const initials = cleaned
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return initials || name.slice(0, 3).toUpperCase();
}

export default async function FacultiesPage() {
const [facultiesRes, programmesRes] = await Promise.all([
    sanityFetch({ query: getFacultiesQuery }).catch(() => ({ data: [] })),
    sanityFetch({ query: getProgrammesQuery, params: { facultyId: null, level: null } }).catch(() => ({ data: [] })),
  ]);

  const rawFaculties = (facultiesRes.data ?? []) as SanityFaculty[];
  const rawProgrammes = (programmesRes.data ?? []) as SanityProgramme[];

  // Group programmes by faculty _id
  const programmesByFaculty = rawProgrammes.reduce<
    Record<string, SanityProgramme[]>
  >((acc, prog) => {
    const fid = prog.faculty?._id;
    if (!fid) return acc;
    if (!acc[fid]) acc[fid] = [];
    acc[fid].push(prog);
    return acc;
  }, {});

  const faculties = rawFaculties.map((f: SanityFaculty) => {
    const progs = programmesByFaculty[f._id] ?? [];

    const levels = [
      ...new Set(
        progs
          .flatMap((p) => {
            if (Array.isArray(p.level)) return p.level;
            if (p.level) return [p.level];
            return [];
          })
          .map((lvl) => LEVEL_LABEL[lvl] ?? lvl),
      ),
    ];

    const modes = [
      ...new Set(
        progs
          .flatMap((p) => Array.isArray(p.studyMode) ? p.studyMode : [])
          .map((m) => MODE_LABEL[m] ?? m)
      ),
    ]

    const departments = progs.map((p: SanityProgramme) => {
      const normalizedLevels = Array.isArray(p.level)
        ? p.level
        : p.level
          ? [p.level]
          : [];

      return {
        name: p.programmeName,
        slug: p.slug.current,
        level: normalizedLevels.map((lvl) => LEVEL_LABEL[lvl] ?? lvl),
      };
    });

    return {
      id: f._id,
      name: f.facultyName,
      abbreviation: deriveAbbreviation(f.facultyName),
      deanName: f.deanName ?? null,
      departments,
      levels,
      modes,
    };
  });

  const facultyNames = rawFaculties.map((f) => f.facultyName);

  const levelOptions = [
    ...new Set(
      rawProgrammes.flatMap((p) =>
        Array.isArray(p.level) ? p.level : p.level ? [p.level] : []
      ).map((lvl) => LEVEL_LABEL[lvl] ?? lvl)
    ),
  ];


  const modeOptions = [
    ...new Set(
      rawProgrammes
        .flatMap((p) => Array.isArray(p.studyMode) ? p.studyMode : [])
        .map((m) => MODE_LABEL[m] ?? m)
    ),
  ]

  return <FacultiesClient faculties={faculties} facultyNames={facultyNames} levelOptions={levelOptions} modeOptions={modeOptions} />;
}
