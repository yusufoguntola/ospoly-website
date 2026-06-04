import { client } from "./client";
import {
  SanityFooterColumn,
  SanityAnnouncement,
  SanityKeyStatistic,
  SanityNewsletterCta,
  SanityQuickLink,
  SanityNewsArticle,
  SanityNewsArticleDetail,
  SanityHomepageArticle,
  SanityEvent,
  SanityEventDetail,
  SanityFaculty,
  SanityProgramme,
  SanityProgrammeDetail,
  SanityStaffProfile,
  SanityAdmissionPage,
  SanityAboutPage,
} from "./sanity.types";

// ─── Image projection helper ─────────────────────────────
const imageFields = `
  asset->{ url, metadata { dimensions } },
  alt,
  "url": asset->url
`;

// ─── Hero Banner projection ───────────────────────────────
const heroBannerFields = `
  pageTitle,
  subtitle,
  overlayOpacity,
  backgroundImage { ${imageFields} }
`;

// ─── Global / Shared ─────────────────────────────────────

export async function getFooterColumns(): Promise<SanityFooterColumn[]> {
  return client.fetch(`
    *[_type == "footerColumn"] | order(sortOrder asc) {
      _id,
      columnHeading,
      sortOrder,
      links[] { label, url }
    }
  `);
}

export async function getActiveAnnouncements(): Promise<SanityAnnouncement[]> {
  const today = new Date().toISOString().split("T")[0];
  return client.fetch(
    `
    *[_type == "announcement" && active == true && (expiryDate == null || expiryDate >= $today)] {
      _id,
      messageText,
      category,
      linkUrl,
      linkLabel,
      expiryDate
    }
  `,
    { today },
  );
}

export async function getKeyStatistics(
  page?: "home" | "about" | "both",
): Promise<SanityKeyStatistic[]> {
  const filter = page ? `&& (page == $page || page == "both")` : "";
  return client.fetch(
    `
    *[_type == "keyStatistic" ${filter}] | order(sortOrder asc) {
      _id,
      statValue,
      label,
      sortOrder,
      page
    }
  `,
    { page },
  );
}

export async function getNewsletterCta(): Promise<SanityNewsletterCta | null> {
  return client.fetch(`
    *[_type == "newsletterCta"][0] {
      headingText,
      subtext,
      ctaButtonLabel,
      ctaButtonUrl,
      socialLinks[] { platform, url }
    }
  `);
}

export async function getQuickLinks(): Promise<SanityQuickLink[]> {
  return client.fetch(`
    *[_type == "quickLink" && active == true] | order(sortOrder asc)[0...6] {
      _id,
      label,
      linkUrl,
      sortOrder,
      icon { ${imageFields} }
    }
  `);
}

// ─── News & Events ────────────────────────────────────────

export async function getNewsArticles(
  limit = 10,
  category?: string,
): Promise<SanityNewsArticle[]> {
  const filter = category ? `&& category == $category` : "";

  return client.fetch(
    `
    *[
      _type == "newsArticle" &&
      status == "published"
      ${filter}
    ] | order(publishDate desc)[0...$limit] {
      _id,
      title,
      slug,
      category,
      excerpt,
      publishDate,
      author,
      tags,
      externalLink,
      featuredImage { ${imageFields} }
    }
  `,
    { limit, category },
  );
}

export async function getNewsArticleBySlug(
  slug: string,
): Promise<SanityNewsArticleDetail | null> {
  return client.fetch(
    `
    *[_type == "newsArticle" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      excerpt,
      body,
      publishDate,
      author,
      tags,
      featuredImage { ${imageFields} }
    }
  `,
    { slug },
  );
}

export async function getHomepageArticles(
  limit = 3,
): Promise<SanityHomepageArticle[]> {
  return client.fetch(
    `
    *[_type == "newsArticle" && status == "published" && showOnHomepage == true] | order(publishDate desc)[0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      publishDate,
      featuredImage { ${imageFields} }
    }
  `,
    { limit: limit - 1 },
  );
}

export async function getEvents(
  limit = 10,
  includePast = false,
): Promise<SanityEvent[]> {
  const filter = includePast ? "" : `&& status != "past"`;
  return client.fetch(
    `
    *[_type == "event" && status == "published" ${filter}] | order(eventDate asc)[0...$limit] {
      _id,
      eventTitle,
      slug,
      excerpt,
      eventDate,
      endDate,
      location,
      status,
      featuredImage { ${imageFields} }
    }
  `,
    { limit: limit - 1 },
  );
}

export async function getEventBySlug(
  slug: string,
): Promise<SanityEventDetail | null> {
  return client.fetch(
    `
    *[_type == "event" && slug.current == $slug][0] {
      _id,
      eventTitle,
      slug,
      excerpt,
      body,
      eventDate,
      endDate,
      location,
      status,
      featuredImage { ${imageFields} }
    }
  `,
    { slug },
  );
}

// ─── Academics ────────────────────────────────────────────

export async function getFaculties(): Promise<SanityFaculty[]> {
  return client.fetch(`
    *[_type == "faculty"] | order(sortOrder asc) {
      _id,
      facultyName,
      slug,
      deanName,
      featuredImage { ${imageFields} }
    }
  `);
}

export async function getProgrammes(
  facultyId?: string,
  level?: string, // 👈 add this
): Promise<SanityProgramme[]> {
  const facultyFilter = facultyId ? `&& faculty._ref == $facultyId` : "";
  const levelFilter = level ? `&& $level in level` : "";

  return client.fetch(
    `
    *[
      _type == "programme" &&
      status == "active"
      ${facultyFilter}
      ${levelFilter}
    ] | order(programmeName asc) {
      _id,
      programmeName,
      slug,
      level,
      duration,
      accreditation,
      faculty->{ _id, facultyName, slug },
      icon { ${imageFields} },
      featuredImage { ${imageFields} }
    }
  `,
    { facultyId, level },
  );
}

export async function getProgrammeBySlug(
  slug: string,
): Promise<SanityProgrammeDetail | null> {
  return client.fetch(
    `
    *[_type == "programme" && slug.current == $slug][0] {
      _id,
      programmeName,
      slug,
      level,
      duration,
      accreditation,
      description,
      entryRequirements,
      status,
      faculty->{ _id, facultyName, slug },
      icon { ${imageFields} },
      featuredImage { ${imageFields} }
    }
  `,
    { slug },
  );
}

// ─── Staff & Leadership ───────────────────────────────────

export async function getStaffProfiles(
  category?: string,
): Promise<SanityStaffProfile[]> {
  const filter = category ? `&& category == $category` : "";
  return client.fetch(
    `
    *[_type == "staffProfile" ${filter}] | order(sortOrder asc) {
      _id,
      fullName,
      titleRole,
      email,
      category,
      sortOrder,
      photo { ${imageFields} }
    }
  `,
    { category },
  );
}

// ─── Pages ────────────────────────────────────────────────

export async function getAdmissionPage(
  type: "undergraduate" | "postgraduate" | "distance-learning",
): Promise<SanityAdmissionPage | null> {
  return client.fetch(
    `
    *[_type == "admissionPage" && admissionType == $type][0] {
      _id,
      pageTitle,
      admissionType,
      hero { ${heroBannerFields} },
      introText,
      requirements,
      howToApply,
      keyDates[] { label, date },
      ctaButtonLabel,
      ctaButtonUrl
    }
  `,
    { type },
  );
}

export async function getAboutPage(
  identifier: "about-ospoly" | "vision-mission" | "administration",
): Promise<SanityAboutPage | null> {
  return client.fetch(
    `
    *[_type == "aboutPage" && pageIdentifier == $identifier][0] {
      _id,
      pageTitle,
      pageIdentifier,
      hero { ${heroBannerFields} },
      bodyBlocks[] {
        _type,
        _key,
        // richTextBlock
        content,
        // imageBlock
        image { ${imageFields} },
        // pullQuoteBlock
        quote,
        attribution,
        // statGridBlock
        stats[] { value, label },
        // staffGridBlock
        heading,
        staff[]->{ _id, fullName, titleRole, category, photo { ${imageFields} } }
      }
    }
  `,
    { identifier },
  );
}
