export const dynamic = 'force-static'
export const revalidate = 60

import { notFound } from 'next/navigation'
import { getAboutPage, getNewsArticles, getEvents } from '@/sanity/lib/queries'
import type {
  SanityBodyBlock,
  SanityStatGridBlock,
  SanityNewsArticle,
  SanityEvent,
} from '@/sanity/lib/sanity.types'
import AboutLayout from '@/app/components/sections/about/AboutLayout'
import BodyBlockRenderer from '@/app/components/sections/about/BodyBlockRenderer'
import type { NewsItem } from '@/app/components/sections/NewsUpdateSection'
import type { SanityStatItem } from '@/app/components/sections/about/AtAGlanceSection'

type AboutIdentifier = 'about-ospoly' | 'vision-mission' | 'administration'

const SLUG_MAP: Record<string, AboutIdentifier> = {
  'ospoly-profile': 'about-ospoly',
  'vision':         'vision-mission',
  'administration': 'administration',
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }))
}

const NAV_ITEMS = [
  { label: 'Ospoly Profile',   href: '/about/ospoly-profile' },
  { label: 'Vision & Mission', href: '/about/vision' },
  { label: 'Administration',   href: '/about/administration' },
]

const SLUG_CONFIG: Record<string, {
  breadcrumbLabel: string
  showAtAGlance: boolean
}> = {
  'ospoly-profile': { breadcrumbLabel: 'Ospoly Profile',   showAtAGlance: true  },
  'vision':         { breadcrumbLabel: 'Vision & Mission', showAtAGlance: false },
  'administration': { breadcrumbLabel: 'Administration',   showAtAGlance: false },
}

export default async function AboutSubPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const identifier = SLUG_MAP[slug]
  if (!identifier) notFound()

  const [pageData, rawNews, rawEvents] = await Promise.all([
    getAboutPage(identifier).catch(() => null),
    getNewsArticles(30).catch((): SanityNewsArticle[] => []),
    getEvents(30).catch((): SanityEvent[] => []),
  ])

  if (!pageData) notFound()

  const config = SLUG_CONFIG[slug]

  const breadcrumbs = [
    { label: 'Home',  href: '/' },
    { label: 'About', href: '/about' },
    { label: config.breadcrumbLabel },
  ]

  const statGridBlock = (pageData.bodyBlocks ?? []).find(
    (b): b is SanityStatGridBlock => b._type === 'statGridBlock'
  )
  const glanceStats: SanityStatItem[] | undefined = statGridBlock?.stats

  const newsItems: NewsItem[] = rawNews.map((a: SanityNewsArticle) => ({
    id:       a._id,
    title:    a.title,
    excerpt:  a.excerpt ?? '',
    imageUrl: a.featuredImage?.url ?? '',
    category: a.category === 'upcoming-events' ? 'Upcoming Events' : 'News',
    date:     a.publishDate
      ? new Date(a.publishDate).toLocaleDateString('en-NG', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : undefined,
    slug: a.slug.current,
  }))

  const eventItems: NewsItem[] = rawEvents.map((e: SanityEvent) => ({
    id:       e._id,
    title:    e.eventTitle,
    excerpt:  e.excerpt ?? '',
    imageUrl: e.featuredImage?.url ?? '',
    category: 'Events',
    date:     e.eventDate
      ? new Date(e.eventDate).toLocaleDateString('en-NG', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
      : undefined,
    slug: e.slug.current,
  }))

  const bodyBlocks: SanityBodyBlock[] = (pageData.bodyBlocks ?? []).filter(
    (b): b is SanityBodyBlock => b._type !== 'statGridBlock'
  )

  return (
    <AboutLayout
      breadcrumbs={breadcrumbs}
      navItems={NAV_ITEMS}
      heroTitle={pageData.hero?.pageTitle ?? pageData.pageTitle}
      heroDescription={pageData.hero?.subtitle ?? ''}
      showAtAGlance={config.showAtAGlance}
      glanceStats={glanceStats}
      newsItems={newsItems}
      eventItems={eventItems}
    >
      <article className="max-w-">
        <BodyBlockRenderer blocks={bodyBlocks} />
      </article>
    </AboutLayout>
  )
}