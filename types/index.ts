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

// types/footer.ts (or wherever your Sanity types live)

export interface SanityFooterLink {
  _key: string;
  label: string;
  url?: string;
}

export interface SanityFooterAddress {
  lines?: string[];
}

export interface SanityFooterContact {
  phone?: string;
  email?: string;
}

export interface SanityFooterContent {
  leftLinks?: SanityFooterLink[];
  rightLinks?: SanityFooterLink[];
  address?: SanityFooterAddress;
  contact?: SanityFooterContact;
}

export interface SanityFooterDoc {
  content?: SanityFooterContent;
}