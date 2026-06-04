// Re-export Sanity types that are used across the app
export type {
  SanityNewsArticle,
  SanityKeyStatistic,
  SanityAnnouncement,
  SanityEvent,
  SanityFaculty,
  SanityProgramme,
  SanityStaffProfile,
} from '@/sanity/lib/sanity.types'

// ─── UI-layer types (not from Sanity directly) ────────────────────────────────

/** Mapped from SanityAnnouncement for HeroSection ticker */
export interface HeroAnnouncement {
  id: string
  title: string
  href: string
}

/** Mapped from SanityKeyStatistic for MissionSection stats bar */
export interface StatItem {
  value: string
  label: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface QuickLink {
  label: string
  href: string
  icon?: string
}