import { notFound } from 'next/navigation'
import { getAboutPageQuery, getNewsArticlesQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import type {
  SanityBodyBlock,
  SanityStatGridBlock,
  SanityNewsArticle,
  SanityAboutPage,
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

const [pageDataRes, allArticlesRes] = await Promise.all([
    sanityFetch({ query: getAboutPageQuery, params: { identifier } }).catch(() => ({ data: null })),
    sanityFetch({ query: getNewsArticlesQuery, params: { limit: 60, category: null } }).catch(() => ({ data: [] })),
  ])

  const pageData = pageDataRes.data as SanityAboutPage | null
  const allArticles = (allArticlesRes.data ?? []) as SanityNewsArticle[]

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

  // ── News tab: category === 'news' OR 'blog' ─────────────────────────────────
  const newsItems: NewsItem[] = allArticles
    .filter((a) => a.category === 'news' || a.category === 'blog')
    .map((a) => ({
      id:       a._id,
      title:    a.title,
      excerpt:  a.excerpt ?? '',
      imageUrl: a.featuredImage?.url ?? '',
      category: a.category === 'blog' ? 'Blog' : 'News',
      date:     a.publishDate
        ? new Date(a.publishDate).toLocaleDateString('en-NG', {
            day: 'numeric', month: 'long', year: 'numeric',
          })
        : undefined,
      slug: a.category === 'news'
        ? (a.externalLink ?? '')
        : (a.slug?.current ?? ''),
    }))

  // ── Events tab: category === 'events' ───────────────────────────────────────
  const eventItems: NewsItem[] = allArticles
    .filter((a) => a.category === 'events')
    .map((a) => ({
      id:       a._id,
      title:    a.title,
      excerpt:  a.excerpt ?? '',
      imageUrl: a.featuredImage?.url ?? '',
      category: 'Events',
      date:     a.publishDate
        ? new Date(a.publishDate).toLocaleDateString('en-NG', {
            day: 'numeric', month: 'long', year: 'numeric',
          })
        : undefined,
      slug: a.slug?.current ?? '',
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