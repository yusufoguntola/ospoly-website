import { getFaculties, getProgrammes } from '@/sanity/lib/queries'
import type { SanityFaculty, SanityProgramme } from '@/sanity/lib/sanity.types'
import FacultiesClient from './FacultiesClient'

export const dynamic    = 'force-static'
export const revalidate = 60

const LEVEL_LABEL: Record<string, string> = {
  ond:         'National Diploma (ND)',
  hnd:         'Higher National Diploma (HND)',
  bachelor:    'Bachelor',
  master:      'Master',
  certificate: 'Certificate',
}

function deriveAbbreviation(name: string): string {
  const cleaned = name
    .replace(/^(faculty|school|department|institute)\s+of\s+/i, '')
    .trim()
  const initials = cleaned
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
  return initials || name.slice(0, 3).toUpperCase()
}

export default async function FacultiesPage() {
  const [rawFaculties, rawProgrammes] = await Promise.all([
    getFaculties().catch((): SanityFaculty[] => []),
    getProgrammes().catch((): SanityProgramme[] => []),
  ])

  // Group programmes by faculty _id
  const programmesByFaculty = rawProgrammes.reduce<Record<string, SanityProgramme[]>>(
    (acc, prog) => {
      const fid = prog.faculty?._id
      if (!fid) return acc
      if (!acc[fid]) acc[fid] = []
      acc[fid].push(prog)
      return acc
    },
    {}
  )

  const faculties = rawFaculties.map((f: SanityFaculty) => {
    const progs = programmesByFaculty[f._id] ?? []

    const levels = [...new Set(
      progs.map((p) => LEVEL_LABEL[p.level] ?? p.level).filter(Boolean)
    )]

    const departments = progs.map((p: SanityProgramme) => ({
      name:  p.programmeName,
      slug:  p.slug.current,
      level: LEVEL_LABEL[p.level] ?? p.level,
    }))

    return {
      id:           f._id,
      name:         f.facultyName,
      abbreviation: deriveAbbreviation(f.facultyName),
      deanName:     f.deanName ?? null,
      departments,
      levels,
    }
  })

  return <FacultiesClient faculties={faculties} />
}