import { notFound } from "next/navigation";
import { getNewsArticleBySlugQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import type { SanityNewsArticleDetail } from "@/sanity/lib/sanity.types";
import PageHero from "@/app/components/ui/PageHero";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ChevronLeft, CalendarDays, User, Tag } from "lucide-react";
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: getNewsArticleBySlugQuery,
    params: { slug },
  }).catch(() => ({ data: null }));
  const article = data as SanityNewsArticleDetail | null;

  if (!article) notFound();

  const isEvent = article.category === "events";
  const isBlog = article.category === "blog";

  const categoryLabel = isEvent ? "Events" : isBlog ? "Blog" : "News";
  const backLabel = isEvent ? "Back to Events" : "Back to News & Blog";

  const formattedDate = article.publishDate
    ? new Date(article.publishDate).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={article.title}
        size="default"
        description={article.excerpt ?? ""}
        imageUrl={article.featuredImage?.url ?? ""}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Back link */}
        <Link
          target="_blank"
          href="/news-events"
          className="inline-flex items-center gap-2 text-sm text-ospoly-gold font-semibold hover:text-ospoly-navy transition-colors mb-10 group"
        >
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          {backLabel}
        </Link>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="px-3 py-1 rounded-full bg-ospoly-deep text-white text-xs font-bold tracking-widest uppercase">
            {categoryLabel}
          </span>

          {formattedDate && (
            <span className="flex items-center gap-1.5 text-gray-400 text-sm">
              <CalendarDays size={14} />
              {formattedDate}
            </span>
          )}

          {article.author && (
            <span className="flex items-center gap-1.5 text-gray-400 text-sm">
              <User size={14} />
              {article.author}
            </span>
          )}
        </div>

        {/* Featured image */}
        {/* {article.featuredImage?.url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt ?? article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )} */}

        {/* Body */}
        {article.body?.length ? (
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-ospoly-navy prose-a:text-ospoly-gold prose-strong:text-ospoly-navy max-w-none">
            <PortableText value={article.body} />
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">No content available.</p>
        )}

        {/* Tags */}
        {article.tags?.length ? (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            <Tag size={14} className="text-gray-400 mt-1" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-ospoly-pale text-ospoly-navy text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
