export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface QuickLink {
  label: string;
  href: string;
  icon?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  type: "news" | "event" | "announcement";
  date?: string;
}