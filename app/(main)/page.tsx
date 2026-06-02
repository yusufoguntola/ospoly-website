import {
  getActiveAnnouncements,
  getKeyStatistics,
  getHomepageArticles,
  getEvents,
} from '@/sanity/lib/queries'
import type {
  SanityAnnouncement,
  SanityKeyStatistic,
  SanityHomepageArticle,
  SanityEvent,
} from '@/sanity/lib/sanity.types'
import HeroSection from '../components/sections/home/heroSection'
import MissionSection from '../components/sections/home/missionSection'
import FindYourWaySection from '../components/sections/home/FindYourWaySection'
import NewsUpdateSection from '../components/sections/NewsUpdateSection'
import CtaBanner from '../components/sections/home/CtaBanner'
import type { NewsItem } from '../components/sections/NewsUpdateSection'

export default async function Home() {
  const [rawAnnouncements, rawStats, rawNews, rawEvents] = await Promise.all([
    getActiveAnnouncements().catch((): SanityAnnouncement[]     => []),
    getKeyStatistics('home').catch((): SanityKeyStatistic[]     => []),
    getHomepageArticles(6).catch((): SanityHomepageArticle[]    => []),
    getEvents(6).catch((): SanityEvent[]                        => []),
  ])

  const announcements = rawAnnouncements.map((a: SanityAnnouncement) => ({
    id:    a._id,
    title: a.messageText,
    href:  a.linkUrl ?? '#',
    category: a.category ?? 'News',
  }))

  const stats = rawStats.map((s: SanityKeyStatistic) => ({
    value: s.statValue,
    label: s.label,
  }))

  const newsItems: NewsItem[] = rawNews.map((a: SanityHomepageArticle) => ({
    id:       a._id,
    title:    a.title,
    excerpt:  a.excerpt ?? '',
    imageUrl: a.featuredImage?.url ?? '',
    category: 'News',
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

  return (
    <>
      <HeroSection announcements={announcements} />
      <MissionSection stats={stats} />
      <FindYourWaySection />
      <NewsUpdateSection newsItems={newsItems} eventItems={eventItems} />
      <CtaBanner headline={"READY TO\nLEARN, CREATE, AND\nCONTRIBUTE TO A\nSKILLED FUTURE."} />
    </>
  )
}