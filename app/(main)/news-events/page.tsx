import { getNewsArticles } from '@/sanity/lib/queries'
import NewsUpdateSection from '@/app/components/sections/NewsUpdateSection'
import PageHero from '@/app/components/ui/PageHero'
import type { NewsItem } from '@/app/components/sections/NewsUpdateSection'
import { SanityNewsArticle } from '@/types'

export default async function NewsEventsPage() {
  // Single source of truth — fetch all published articles (no category filter)
  const allArticles: SanityNewsArticle[] = await getNewsArticles(60)

  // ── News tab: category === 'news' OR 'blog' ────────────────────────────────
  const newsItems: NewsItem[] = allArticles
    .filter((a) => a.category === 'news' || a.category === 'blog')
    .map((article) => ({
      id: article._id,
      title: article.title,
      excerpt: article.excerpt ?? '',
      imageUrl: article.featuredImage?.url ?? '',
      category: article.category === 'blog' ? 'Blog' : 'News',
      date: article.publishDate
        ? new Date(article.publishDate).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : undefined,
      // News → external redirect; Blog → internal slug route
      slug:
        article.category === 'news'
          ? (article.externalLink ?? '')
          : (article.slug?.current ?? ''),
    }))

  // ── Events tab: category === 'events' ─────────────────────────────────────
  const eventItems: NewsItem[] = allArticles
    .filter((a) => a.category === 'events')
    .map((article) => ({
      id: article._id,
      title: article.title,
      excerpt: article.excerpt ?? '',
      imageUrl: article.featuredImage?.url ?? '',
      category: 'Events',
      date: article.publishDate
        ? new Date(article.publishDate).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : undefined,
      slug: article.slug?.current ?? '',
    }))

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="News & Events"
        size="default"
        description="Your source for the latest updates, achievements, and events from the OSPOLY community."
      />
      <NewsUpdateSection
        newsItems={newsItems}
        eventItems={eventItems}
      />
    </div>
  )
}