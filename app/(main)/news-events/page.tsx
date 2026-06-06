import { getNewsArticlesQuery } from '@/sanity/lib/queries'
import NewsUpdateSection from '@/app/components/sections/NewsUpdateSection'
import PageHero from '@/app/components/ui/PageHero'
import type { NewsItem } from '@/app/components/sections/NewsUpdateSection'
import type { SanityNewsArticle } from '@/sanity/lib/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'

export default async function NewsEventsPage() {
const { data } = await sanityFetch({ query: getNewsArticlesQuery, params: { limit: 60, category: null } }).catch(() => ({ data: [] }))
  const allArticles = (data ?? []) as SanityNewsArticle[]

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
      slug:
        article.category === 'news'
          ? (article.externalLink ?? '')
          : (article.slug?.current ?? ''),
    }))

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