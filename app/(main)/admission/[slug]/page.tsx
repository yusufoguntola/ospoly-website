import { notFound } from 'next/navigation'
import { getAdmissionPageQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import type {
  SanityPortableTextBlock,
  SanityPortableTextContent,
  SanityAdmissionPage,
  SanityKeyDate,
} from '@/sanity/lib/sanity.types'
import ProgrammeLayout from '@/app/components/sections/admission/ProgrammeLayout'
import ProgrammeContent from '@/app/components/sections/admission/ProgrammeContent'
import ApplyCard from '@/app/components/sections/admission/ApplyCard'

type AdmissionType = 'undergraduate' | 'postgraduate' | 'distance-learning'

const SLUG_MAP: Record<string, AdmissionType> = {
  'undergraduate-studies': 'undergraduate',
  'postgraduate-studies':  'postgraduate',
  'distance-learning':     'distance-learning',
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }))
}

const SLUG_CONFIG: Record<string, {
  breadcrumbLabel: string
  applyCardHeading: string
  applyCardAccent: 'navy' | 'gold'
  applyCardCtaLabel: string
}> = {
  'undergraduate-studies': {
    breadcrumbLabel:   'Undergraduate Studies',
    applyCardHeading:  'How to Apply For Undergraduate Programme',
    applyCardAccent:   'navy',
    applyCardCtaLabel: 'Contact Admissions Office',
  },
  'postgraduate-studies': {
    breadcrumbLabel:   'Postgraduate Studies',
    applyCardHeading:  'How to Apply For Post-Graduate Programme',
    applyCardAccent:   'navy',
    applyCardCtaLabel: 'Contact Postgraduate Office',
  },
  'distance-learning': {
    breadcrumbLabel:   'Distance Learning / Part-Time Studies',
    applyCardHeading:  'How to Apply For Part-Time / Distance Learning',
    applyCardAccent:   'gold',
    applyCardCtaLabel: 'Contact Part-Time Office',
  },
}

// ─── Portable Text helpers ────────────────────────────────────────────────────

function getBlockText(block: SanityPortableTextBlock): string {
  return block.children
    .filter((c) => c._type === 'span')
    .map((c) => c.text)
    .join('')
}

function portableTextToStrings(blocks: SanityPortableTextContent[]): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((b): b is SanityPortableTextBlock => b._type === 'block')
    .map(getBlockText)
    .filter(Boolean)
}

function portableTextToSections(
  blocks: SanityPortableTextContent[]
): { heading: string; paragraphs?: string[]; bullets?: string[] }[] {
  if (!blocks?.length) return []

  const sections: { heading: string; paragraphs: string[]; bullets: string[] }[] = []
  let current: { heading: string; paragraphs: string[]; bullets: string[] } | null = null

  for (const block of blocks) {
    if (block._type !== 'block') continue
    const text = getBlockText(block).trim()
    if (!text) continue

    const isHeading = ['h1', 'h2', 'h3', 'h4'].includes(block.style)
    const isBullet  = block.listItem === 'bullet'

    if (isHeading) {
      if (current) sections.push(current)
      current = { heading: text, paragraphs: [], bullets: [] }
    } else if (isBullet) {
      if (!current) current = { heading: '', paragraphs: [], bullets: [] }
      current.bullets.push(text)
    } else {
      if (!current) current = { heading: '', paragraphs: [], bullets: [] }
      current.paragraphs.push(text)
    }
  }

  if (current) sections.push(current)
  return sections.filter((s) => s.heading || s.paragraphs.length || s.bullets.length)
}

function portableTextToIntro(blocks: SanityPortableTextContent[]): string[] {
  if (!blocks?.length) return []
  return blocks
    .filter((b): b is SanityPortableTextBlock =>
      b._type === 'block' && b.style === 'normal' && !b.listItem
    )
    .map(getBlockText)
    .filter(Boolean)
    .slice(0, 2)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdmissionSubPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const admissionType = SLUG_MAP[slug]
  if (!admissionType) notFound()

  const { data } = await sanityFetch({ query: getAdmissionPageQuery, params: { type: admissionType } }).catch(() => ({ data: null }))
  const pageData = data as SanityAdmissionPage | null
  if (!pageData) notFound()

  const config = SLUG_CONFIG[slug]

  const breadcrumbs = [
    { label: 'Home',      href: '/' },
    { label: 'Admission', href: '/admission' },
    { label: config.breadcrumbLabel },
  ]

  const introParas = portableTextToIntro(pageData.introText ?? [])
  const sections   = portableTextToSections(pageData.requirements ?? [])
  const applySteps = portableTextToStrings(pageData.howToApply ?? [])

  const quickInfo = (pageData.keyDates ?? []).map((kd: SanityKeyDate) => ({
    label: kd.label,
    value: kd.date
      ? new Date(kd.date).toLocaleDateString('en-NG', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : '',
  }))

  const buttons = pageData.ctaButtonUrl
    ? [
        { label: 'Explore Programs', href: '/academics',          variant: 'outline' as const },
        { label: pageData.ctaButtonLabel ?? 'Apply Now', href: pageData.ctaButtonUrl, variant: 'filled' as const },
      ]
    : [{ label: 'Explore Programs', href: '/academics', variant: 'outline' as const }]

  return (
    <ProgrammeLayout
      heroTitle={pageData.hero?.pageTitle ?? pageData.pageTitle}
      heroDescription={pageData.hero?.subtitle ?? ''}
      breadcrumbs={breadcrumbs}
      applyCard={
        <ApplyCard
          heading={config.applyCardHeading}
          steps={applySteps.length ? applySteps : [
            'Visit the OSPOLY admissions portal.',
            'Create an account and complete the form.',
            'Upload required documents and pay online.',
            'Print your acknowledgment slip.',
          ]}
          ctaLabel={config.applyCardCtaLabel}
          ctaHref="/contact"
          accent={config.applyCardAccent}
        />
      }
    >
      <ProgrammeContent
        title={pageData.pageTitle}
        intro={introParas}
        sections={sections}
        quickInfo={quickInfo.length ? quickInfo : undefined}
        buttons={buttons}
      />
    </ProgrammeLayout>
  )
}