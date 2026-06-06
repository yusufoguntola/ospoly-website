// ─────────────────────────────────────────────────────────────────────────────
// Sanity return types — derived directly from GROQ projections in queries.ts
// Import these wherever you consume Sanity data instead of using `any`.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Primitives ───────────────────────────────────────────────────────────────

export interface SanitySlug {
  current: string
}

export interface SanityImageAsset {
  url: string
  metadata: {
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
  }
}

export interface SanityImage {
  asset: SanityImageAsset
  alt?: string
  url: string
  caption?: string
}

/** Portable Text block — a single block node from Sanity's block content */
export interface SanityPortableTextSpan {
  _type: 'span'
  _key: string
  marks: string[]
  text: string
}

export interface SanityPortableTextBlock {
  _type: 'block'
  _key: string
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
  listItem?: 'bullet' | 'number'
  markDefs: { _type: string; _key: string; href?: string }[]
  children: SanityPortableTextSpan[]
}

export interface SanityPortableTextImage {
  _type: 'image'
  _key: string
  asset: SanityImageAsset
  alt?: string
}

export type SanityPortableTextContent = SanityPortableTextBlock | SanityPortableTextImage

/** Hero banner object returned by heroBannerFields projection */
export interface SanityHeroBanner {
  pageTitle: string
  subtitle?: string
  overlayOpacity?: number
  backgroundImage?: SanityImage
}

// ─── Global / Shared ─────────────────────────────────────────────────────────

export interface SanityFooterLink {
  label: string
  url: string
}

export interface SanityFooterColumn {
  _id: string
  columnHeading: string
  sortOrder: number
  links: SanityFooterLink[]
}

export interface SanityAnnouncement {
  _id: string
  messageText: string
  linkUrl?: string
  linkLabel?: string
  category?: "News" | "Events" | "Announcements";
}

export interface SanityKeyStatistic {
  _id: string
  statValue: string
  label: string
  sortOrder: number
  page: 'home' | 'about' | 'both'
}

export interface SanitySocialLink {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'YouTube'
  url: string
}

export interface SanityNewsletterCta {
  headingText: string
  subtext?: string
  ctaButtonLabel: string
  ctaButtonUrl: string
  socialLinks?: SanitySocialLink[]
}

export interface SanityQuickLink {
  _id: string
  label: string
  linkUrl: string
  sortOrder: number
  icon?: SanityImage
}

// ─── News & Events ────────────────────────────────────────────────────────────

export interface SanityNewsArticle {
  _id: string
  title: string
  slug: SanitySlug
  category: 'news' | 'events' | 'blog'
  excerpt: string
  publishDate: string
  author?: string
  tags?: string[]
  externalLink?: string          // only populated when category === 'news'
  featuredImage?: SanityImage
}

export interface SanityNewsArticleDetail extends SanityNewsArticle {
  body: SanityPortableTextContent[]
}

export interface SanityHomepageArticle {
  _id: string
  title: string
  slug: SanitySlug
  excerpt: string
  publishDate: string
  featuredImage?: SanityImage
}

export type SanityEventStatus = 'draft' | 'published' | 'past'

export interface SanityEvent {
  _id: string
  eventTitle: string
  slug: SanitySlug
  excerpt: string
  eventDate: string
  endDate?: string
  location?: string
  status: SanityEventStatus
  featuredImage?: SanityImage
}

export interface SanityEventDetail extends SanityEvent {
  body: SanityPortableTextContent[]
}

// ─── Academics ────────────────────────────────────────────────────────────────

export interface SanityFaculty {
  _id: string
  facultyName: string
  slug: SanitySlug
  deanName?: string
  featuredImage?: SanityImage
}

export type SanityProgrammeLevel = 'ond' | 'hnd' | 'bachelor' | 'master' | 'certificate'

export interface SanityFacultyRef {
  _id: string
  facultyName: string
  slug: SanitySlug
}

export interface SanityProgramme {
  _id: string
  programmeName: string
  slug: SanitySlug
  level: SanityProgrammeLevel[]
  studyMode: ('full-time' | 'part-time')[]
  duration?: string
  accreditation?: string
  faculty: SanityFacultyRef
  icon?: SanityImage
  featuredImage?: SanityImage
}

export interface SanityProgrammeDetail extends SanityProgramme {
  description: SanityPortableTextContent[]
  entryRequirements?: SanityPortableTextContent[]
  status: 'active' | 'suspended'
}

// ─── Staff ────────────────────────────────────────────────────────────────────

export type SanityStaffCategory = 'senior-management' | 'academic' | 'administrative'

export interface SanityStaffProfile {
  _id: string
  fullName: string
  titleRole: string
  email?: string
  category: SanityStaffCategory
  sortOrder: number
  photo?: SanityImage
}

// ─── Pages ────────────────────────────────────────────────────────────────────

export interface SanityKeyDate {
  label: string
  date: string
}

export interface SanityAdmissionPage {
  _id: string
  pageTitle: string
  admissionType: 'undergraduate' | 'postgraduate' | 'distance-learning'
  hero: SanityHeroBanner
  introText: SanityPortableTextContent[]
  requirements: SanityPortableTextContent[]
  howToApply?: SanityPortableTextContent[]
  keyDates?: SanityKeyDate[]
  ctaButtonLabel?: string
  ctaButtonUrl?: string
}

// ─── About Page body blocks ───────────────────────────────────────────────────

export interface SanityRichTextBlock {
  _type: 'richTextBlock'
  _key: string
  content: SanityPortableTextContent[]
}

export interface SanityImageBlock {
  _type: 'imageBlock'
  _key: string
  image: SanityImage
}

export interface SanityPullQuoteBlock {
  _type: 'pullQuoteBlock'
  _key: string
  quote: string
  attribution?: string
}

export interface SanityInlineStat {
  value: string
  label: string
}

export interface SanityStatGridBlock {
  _type: 'statGridBlock'
  _key: string
  stats: SanityInlineStat[]
}

export interface SanityStaffGridBlock {
  _type: 'staffGridBlock'
  _key: string
  heading?: string
  staff: SanityStaffProfile[]
}

export type SanityBodyBlock =
  | SanityRichTextBlock
  | SanityImageBlock
  | SanityPullQuoteBlock
  | SanityStatGridBlock
  | SanityStaffGridBlock

export interface SanityAboutPage {
  _id: string
  pageTitle: string
  pageIdentifier: 'about-ospoly' | 'vision-mission' | 'administration'
  hero: SanityHeroBanner
  bodyBlocks: SanityBodyBlock[]
}

export interface SanityAdmissionCard {
  _id: string
  pageTitle: string
  admissionType: 'undergraduate' | 'postgraduate' | 'distance-learning'
  hero?: {
    backgroundImage?: SanityImage
  }
}