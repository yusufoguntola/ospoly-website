import { AnnouncementItem, NavItem, NewsArticle, StatItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Vision & Mission", href: "/about/vision" },
      { label: "Leadership", href: "/about/leadership" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Schools & Departments", href: "/academics/departments" },
      { label: "Undergraduate Programmes", href: "/academics/undergraduate" },
      { label: "Graduate Programmes", href: "/academics/graduate" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "How to Apply", href: "/admissions/apply" },
      { label: "Requirements", href: "/admissions/requirements" },
      { label: "Fees & Scholarships", href: "/admissions/fees" },
    ],
  },
  { label: "Research", href: "/research" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Contact", href: "/contact" },
];

export const STATS: StatItem[] = [
  { value: "95%", label: "Quality Assurance" },
  { value: "1,000+", label: "Number of Staff" },
  { value: "4,000+", label: "Students" },
  { value: "150+", label: "Quality Infrastructure Facilities" },
];

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "1",
    title: "OSPOLY Unveils New Ultra-Modern Innovation & Skills Development Center",
    type: "news",
  },
  {
    id: "2",
    title: "Faculty of ICT Student Emerges Winner in National Hackathon",
    type: "news",
  },
  {
    id: "3",
    title: "State Government Affirms Support, Releases Funds for Campus Road Network",
    type: "announcement",
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    title: "Engineering Faculty Secures National NBTE Accreditation for All HND Programmes",
    excerpt:
      "The National Board for Technical Education (NBTE) has officially renewed full accreditations for all Higher National Diploma (HND) programmes in the Faculty of Engineering, affirming the institution's state-of-the-art workshops and qualified faculty. This achievement underscores OSPOLY's commitment to quality technical learning.",
    category: "Academics",
    date: "May 10, 2025",
    imageUrl: "/images/news-1.jpg",
    slug: "engineering-faculty-nbte-accreditation",
  },
  {
    id: "2",
    title: "Engineering Faculty Secures National NBTE Accreditation for All HND Programmes",
    excerpt:
      "The National Board for Technical Education (NBTE) has officially renewed full accreditations for all Higher National Diploma (HND) programmes in the Faculty of Engineering, affirming the institution's state-of-the-art workshops and qualified faculty. This achievement underscores OSPOLY's commitment to quality technical learning.",
    category: "Academics",
    date: "April 28, 2025",
    imageUrl: "/images/news-2.jpg",
    slug: "engineering-faculty-nbte-accreditation-2",
  },
  {
    id: "3",
    title: "Engineering Faculty Secures National NBTE Accreditation for All HND Programmes",
    excerpt:
      "The National Board for Technical Education (NBTE) has officially renewed full accreditations for all Higher National Diploma (HND) programmes in the Faculty of Engineering, affirming the institution's state-of-the-art workshops and qualified faculty. This achievement underscores OSPOLY's commitment to quality technical learning.",
    category: "Research",
    date: "April 15, 2025",
    imageUrl: "/images/news-3.jpg",
    slug: "engineering-faculty-nbte-accreditation-3",
  },
];

export const QUICK_LINKS = [
  { label: "Certificate Application", href: "/portal/certificate" },
  { label: "E-Library", href: "/portal/elibrary" },
  { label: "Transcript Portal", href: "/portal/transcript" },
  { label: "E-Learning Portal", href: "/portal/elearning" },
];

export const FOOTER_LINKS = {
  academics: [
    { label: "Academic Programmes", href: "/academics" },
    { label: "Undergraduate Admissions", href: "/admissions/undergraduate" },
    { label: "Library", href: "/library" },
    { label: "Career Services", href: "/careers" },
    { label: "eLearning", href: "/elearning" },
    { label: "Campus Map", href: "/campus-map" },
  ],
  administration: [
    { label: "School Administration", href: "/admin" },
    { label: "Staff Directory", href: "/staff" },
    { label: "Research & Publications", href: "/research" },
    { label: "Student Insurance", href: "/student-insurance" },
    { label: "Blog / OSPOLY", href: "/blog" },
    { label: "Faculties & Schools", href: "/faculties" },
  ],
};