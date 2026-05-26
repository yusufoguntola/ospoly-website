import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from './aboutPage'
import { admissionPage } from './admissionPage'
import { announcement } from './announcement'
import { faculty } from './faculty'
import { footerColumn } from './footerColumn'
import { heroBanner } from './heroBanner'
import { keyStatistic } from './keyStatistic'
import { newsArticle } from './newsArticle'
import { newsletterCta } from './newsletterCta'
import { programme } from './programme'
import { quickLink } from './quickLink'
import { staffProfile } from './staffProfile'
import { event } from "./event";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects first — referenced by documents
  heroBanner,
 
  // Global / Shared
  footerColumn,
  announcement,
  keyStatistic,
  newsletterCta,
  quickLink,
 
  // News & Events
  newsArticle,
  event,
 
  // Academics
  faculty,
  programme,
 
  // People
  staffProfile,
 
  // Pages
  admissionPage,
  aboutPage,
  ],
}
