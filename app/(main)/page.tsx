import {
  getKeyStatistics,
  getNewsArticles,
} from '@/sanity/lib/queries'
import type {
  SanityKeyStatistic,
  SanityNewsArticle,
} from '@/sanity/lib/sanity.types'
import HeroSection from '../components/sections/home/heroSection'
import MissionSection from '../components/sections/home/missionSection'
import FindYourWaySection from '../components/sections/home/FindYourWaySection'
import NewsUpdateSection from '../components/sections/NewsUpdateSection'
import CtaBanner from '../components/sections/home/CtaBanner'
import type { NewsItem } from '../components/sections/NewsUpdateSection'
import type { HeroAnnouncement } from '../components/sections/home/heroSection'


export default async function Home() {
  const [rawStats, allArticles] = await Promise.all([
    getKeyStatistics('home').catch((): SanityKeyStatistic[] => []),
    getNewsArticles(30).catch((): SanityNewsArticle[]       => []),
  ])

  const stats = rawStats.map((s: SanityKeyStatistic) => ({
    value: s.statValue,
    label: s.label,
  }))

  // ── Hero ticker ────────────────────────────────────────────────────────────
  const announcements: HeroAnnouncement[] = allArticles.map((a) => ({
    id:    a._id,
    title: a.title,
    href:  a.category === 'news'
      ? (a.externalLink ?? '/news-events')
      : '/news-events',
    category: a.category === 'blog'
      ? 'Blog'
      : a.category === 'events'
        ? 'Events'
        : 'News',
  }))

  // ── News tab: news + blog ──────────────────────────────────────────────────
  const newsItems: NewsItem[] = allArticles
    .filter((a) => a.category === 'news' || a.category === 'blog')
    .slice(0, 6)
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

  // ── Events tab: events only ────────────────────────────────────────────────
  const eventItems: NewsItem[] = allArticles
    .filter((a) => a.category === 'events')
    .slice(0, 6)
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