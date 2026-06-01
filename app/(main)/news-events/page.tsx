import { getNewsArticles, getEvents } from '@/sanity/lib/queries'
import NewsUpdateSection from '@/app/components/sections/NewsUpdateSection'
import PageHero from '@/app/components/ui/PageHero'
import type { NewsItem } from '@/app/components/sections/NewsUpdateSection'

export default async function NewsEventsPage() {
  // Fetch in parallel
  const [rawNews, rawEvents] = await Promise.all([
    getNewsArticles(30),
    getEvents(30),
  ])

  // ── Map Sanity newsArticle → NewsItem ──────────────────────────────────────
  const newsItems: NewsItem[] = (rawNews ?? []).map((article: any) => ({
    id: article._id,
    title: article.title,
    excerpt: article.excerpt ?? '',
    imageUrl: article.featuredImage?.url ?? '',
    category: article.category === 'upcoming-events' ? 'Upcoming Events' : 'News',
    date: article.publishDate
      ? new Date(article.publishDate).toLocaleDateString('en-NG', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : undefined,
    slug: article.slug?.current ?? article.slug ?? '',
  }))

  // ── Map Sanity event → NewsItem ────────────────────────────────────────────
  const eventItems: NewsItem[] = (rawEvents ?? []).map((ev: any) => ({
    id: ev._id,
    title: ev.eventTitle,
    excerpt: ev.excerpt ?? '',
    imageUrl: ev.featuredImage?.url ?? '',
    category: 'Events',
    date: ev.eventDate
      ? new Date(ev.eventDate).toLocaleDateString('en-NG', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : undefined,
    slug: ev.slug?.current ?? ev.slug ?? '',
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