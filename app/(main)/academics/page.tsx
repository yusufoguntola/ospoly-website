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
    };
  });

  return <FacultiesClient faculties={faculties} />;
}
