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

export const getKeyStatisticsQuery = `
  *[
    _type == "keyStatistic" &&
    (!defined($page) || page == $page || page == "both")
  ]
  | order(sortOrder asc) {
    _id,
    statValue,
    label,
    sortOrder,
    page
  }
`;

export const getNewsletterCtaQuery = `
  *[_type == "newsletterCta"][0] {
    headingText,
    subtext,
    ctaButtonLabel,
    ctaButtonUrl,
    socialLinks[] { platform, url }
  }
`;

export const getQuickLinksQuery = `
  *[
    _type == "quickLink" &&
    active == true
  ]
  | order(sortOrder asc)[0...6] {
    _id,
    label,
    linkUrl,
    sortOrder,
    icon { ${imageFields} }
  }
`;

// ─────────────────────────────────────────────────────────────
// News
// ─────────────────────────────────────────────────────────────

export const getNewsArticlesQuery = `
  *[
    _type == "newsArticle" &&
    status == "published" &&
    (!defined($category) || category == $category)
  ]
  | order(publishDate desc)[0...$limit] {
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
`;

export const getNewsArticleBySlugQuery = `
  *[
    _type == "newsArticle" &&
    slug.current == $slug &&
    status == "published"
  ][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishDate,
    author,
    tags,
    externalLink,
    body,
    featuredImage { ${imageFields} }
  }
`;

export const getHomepageArticlesQuery = `
  *[
    _type == "newsArticle" &&
    status == "published" &&
    showOnHomepage == true
  ]
  | order(publishDate desc)[0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    publishDate,
    featuredImage { ${imageFields} }
  }
`;

// ─────────────────────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────────────────────

export const getEventsQuery = `
  *[
    _type == "event" &&
    status == "published" &&
    (!defined($includePast) || $includePast == true || status != "past")
  ]
  | order(eventDate asc)[0...$limit] {
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
`;

export const getEventBySlugQuery = `
  *[
    _type == "event" &&
    slug.current == $slug
  ][0] {
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
`;

// ─────────────────────────────────────────────────────────────
// Academics
// ─────────────────────────────────────────────────────────────

export const getFacultiesQuery = `
  *[_type == "faculty"]
  | order(sortOrder asc) {
    _id,
    facultyName,
    slug,
    deanName,
    featuredImage { ${imageFields} }
  }
`;

export const getProgrammesQuery = `
  *[
    _type == "programme" &&
    status == "active" &&
    (!defined($facultyId) || faculty._ref == $facultyId) &&
    (!defined($level) || $level in level)
  ]
  | order(programmeName asc) {
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
`;

export const getProgrammeBySlugQuery = `
  *[
    _type == "programme" &&
    slug.current == $slug
  ][0] {
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
`;

// ─────────────────────────────────────────────────────────────
// Staff
// ─────────────────────────────────────────────────────────────

export const getStaffProfilesQuery = `
  *[
    _type == "staffProfile" &&
    (!defined($category) || category == $category)
  ]
  | order(sortOrder asc) {
    _id,
    fullName,
    titleRole,
    email,
    category,
    sortOrder,
    photo { ${imageFields} }
  }
`;

// ─────────────────────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────────────────────

export const getAdmissionPageQuery = `
  *[
    _type == "admissionPage" &&
    admissionType == $type
  ][0] {
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
`;

export const getAboutPageQuery = `
  *[
    _type == "aboutPage" &&
    pageIdentifier == $identifier
  ][0] {
    _id,
    pageTitle,
    pageIdentifier,
    hero { ${heroBannerFields} },
    bodyBlocks[] {
      _type,
      _key,
      content,
      image { ${imageFields} },
      quote,
      attribution,
      stats[] { value, label },
      heading,
      staff[]->{
        _id,
        fullName,
        titleRole,
        category,
        photo { ${imageFields} }
      }
    }
  }
`;