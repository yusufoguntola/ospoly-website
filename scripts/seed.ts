/**
 * OSPOLY Sanity Seed Script
 * ─────────────────────────────────────────────────────────────────
 * Populates your Sanity dataset with content extracted from the
 * design screenshots. Run once with:
 *
 *   npx tsx scripts/seed.ts
 *
 * Requirements:
 *   npm install --save-dev tsx @sanity/client
 *
 * Set SANITY_TOKEN in your .env.local — needs Editor or above rights.
 * Get it from: https://sanity.io/manage → your project → API → Tokens
 * ─────────────────────────────────────────────────────────────────
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
type BaseDoc = {
  _id: string
  _type: string
}

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2026-05-21',
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toPlainText(text: string) {
  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).slice(2),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text }],
    },
  ]
}

function key() {
  return Math.random().toString(36).slice(2, 10)
}

async function upsert<T extends BaseDoc>(doc: T) {
  const result = await client.createOrReplace(doc)
  console.log(`✓ ${doc._type}: ${doc._id}`)
  return result
}

// ─── 1. Footer Columns ────────────────────────────────────────────────────────

async function seedFooterColumns() {
  console.log('\n── Footer Columns ──')

  const columns = [
    {
      _id: 'footerColumn-academic-programs',
      _type: 'footerColumn',
      columnHeading: 'Academic Programs',
      sortOrder: 1,
      links: [
        { _key: key(), label: 'Available Programs',     url: '/academics' },
        { _key: key(), label: 'Visiting Exchange Programs', url: '/academics' },
        { _key: key(), label: 'Student Portals',        url: '/student-portals' },
        { _key: key(), label: 'Library',                url: '/library' },
        { _key: key(), label: 'Career Services',        url: '/career-services' },
        { _key: key(), label: 'Latest News',            url: '/news-events' },
        { _key: key(), label: 'Campus Map',             url: '/campus-map' },
      ],
    },
    {
      _id: 'footerColumn-alumni',
      _type: 'footerColumn',
      columnHeading: 'Alumni Association',
      sortOrder: 2,
      links: [
        { _key: key(), label: 'Staff Directory',        url: '/staff-directory' },
        { _key: key(), label: 'Research & Publications', url: '/research' },
        { _key: key(), label: 'Student Handbook',       url: '/student-handbook' },
        { _key: key(), label: 'Why OSPOLY',             url: '/about/ospoly-profile' },
        { _key: key(), label: 'Faculties & Schools',    url: '/academics' },
      ],
    },
    {
      _id: 'footerColumn-contact',
      _type: 'footerColumn',
      columnHeading: 'Contact',
      sortOrder: 3,
      links: [
        { _key: key(), label: 'Osun State Polytechnic, Iree, P.M.B. 301, Iree, Osun State, Nigeria.', url: '/contact' },
        { _key: key(), label: '+234 (0)800 XXX XXXX', url: 'tel:+2348001234567' },
        { _key: key(), label: 'info@ospoly.edu.ng',   url: 'mailto:info@ospoly.edu.ng' },
      ],
    },
  ]

  for (const col of columns) await upsert(col)
}

// ─── 2. Newsletter CTA ────────────────────────────────────────────────────────

async function seedNewsletterCta() {
  console.log('\n── Newsletter CTA ──')
  await upsert({
    _id:           'newsletterCta-main',
    _type:         'newsletterCta',
    headingText:   "Let's stay in touch!",
    subtext:       'Join our mailing list to learn more about Ospoly.',
    ctaButtonLabel: 'Apply Now',
    ctaButtonUrl:   '/admission/undergraduate-studies',
    socialLinks: [
      { _key: key(), platform: 'Facebook',  url: 'https://facebook.com/ospoly' },
      { _key: key(), platform: 'Twitter',   url: 'https://twitter.com/ospoly' },
      { _key: key(), platform: 'Instagram', url: 'https://instagram.com/ospoly' },
      { _key: key(), platform: 'YouTube',   url: 'https://youtube.com/ospoly' },
      { _key: key(), platform: 'LinkedIn',  url: 'https://linkedin.com/school/ospoly' },
    ],
  })
}

// ─── 3. Announcements ─────────────────────────────────────────────────────────

async function seedAnnouncements() {
  console.log('\n── Announcements ──')
  await upsert({
    _id:         'announcement-admission-2025',
    _type:       'announcement',
    messageText: '2025/2026 Admission is now open. Apply before the deadline.',
    linkUrl:     '/admission/undergraduate-studies',
    linkLabel:   'Apply Now',
    active:      true,
  })
}

// ─── 4. Key Statistics ────────────────────────────────────────────────────────

async function seedKeyStatistics() {
  console.log('\n── Key Statistics ──')

  const stats = [
    // Home page stats (from homepage design)
    { _id: 'stat-grad-rate',    label: 'Graduate Rate',   statValue: '98%',    sortOrder: 1, page: 'home' },
    { _id: 'stat-students',     label: 'Students',        statValue: '1,000+', sortOrder: 2, page: 'home' },
    { _id: 'stat-faculty',      label: 'Faculty',         statValue: '4,000+', sortOrder: 3, page: 'home' },
    { _id: 'stat-programs-h',   label: 'No. of Programs', statValue: '150+',   sortOrder: 4, page: 'home' },

    // About page / At A Glance stats
    { _id: 'stat-years',        label: 'Years of Excellence',                          statValue: '40+',     sortOrder: 1, page: 'about' },
    { _id: 'stat-programs-a',   label: 'Academic Programs',                            statValue: '50+',     sortOrder: 2, page: 'about' },
    { _id: 'stat-decades',      label: 'Decades of Institutional Heritage',           statValue: '5+',      sortOrder: 3, page: 'about' },
    { _id: 'stat-population',   label: 'Student Population',                          statValue: '10,000+', sortOrder: 4, page: 'about' },
    { _id: 'stat-partners',     label: 'Partner Universities',                        statValue: '2',       sortOrder: 5, page: 'about' },
    { _id: 'stat-faculties',    label: 'Faculties & Schools',                         statValue: '9',       sortOrder: 6, page: 'about' },
    { _id: 'stat-community',    label: 'Vibrant Community',                           statValue: '30,000+', sortOrder: 7, page: 'about' },
    { _id: 'stat-alumni',       label: 'Alumni Network',                              statValue: '30,000+', sortOrder: 8, page: 'about' },
    { _id: 'stat-staff',        label: 'Staff & Faculty',                             statValue: '500+',    sortOrder: 9, page: 'about' },
  ]

  for (const stat of stats) {
    await upsert({ ...stat, _type: 'keyStatistic' })
  }
}

// ─── 5. Staff / Leadership Profiles ──────────────────────────────────────────

async function seedStaffProfiles() {
  console.log('\n── Staff Profiles ──')

  const staff = [
    {
      _id:       'staff-rector',
      fullName:  'Dr. Kehinde Adeyemi Alabi',
      titleRole: 'The Rector',
      email:     'rector@ospoly.edu.ng',
      category:  'senior-management',
      sortOrder: 1,
      bio: toPlainText('Dr. Kehinde Adeyemi Alabi serves as the Rector of Osun State Polytechnic, Iree, providing strategic leadership and direction for the institution.'),
    },
    {
      _id:       'staff-registrar',
      fullName:  'Abiodun Oyedele Oloyede',
      titleRole: 'Registrar',
      email:     'registrar@ospoly.edu.ng',
      category:  'senior-management',
      sortOrder: 2,
      bio: toPlainText('The Registrar oversees the administrative functions of the Polytechnic, ensuring efficient management of student records and institutional documentation.'),
    },
    {
      _id:       'staff-bursar',
      fullName:  'Mr. Sunday Ademola Afolabi',
      titleRole: 'Bursar',
      email:     'bursar@ospoly.edu.ng',
      category:  'senior-management',
      sortOrder: 3,
      bio: toPlainText('The Bursar manages the financial affairs of Osun State Polytechnic, Iree, ensuring fiscal responsibility and transparent resource allocation.'),
    },
  ]

  for (const member of staff) {
    await upsert({ ...member, _type: 'staffProfile' })
  }
}

// ─── 6. Faculties ─────────────────────────────────────────────────────────────

async function seedFaculties() {
  console.log('\n── Faculties ──')

  const faculties = [
    {
      _id: 'faculty-engineering',
      facultyName: 'Faculty of Engineering (FE)',
      slug: { _type: 'slug', current: 'faculty-of-engineering' },
      deanName: '',
      sortOrder: 1,
      description: toPlainText('The Faculty of Engineering offers cutting-edge programmes in various engineering disciplines, equipping students with practical skills for the modern world.'),
    },
    {
      _id: 'faculty-ict',
      facultyName: 'Faculty of Information and Communication Technology (FICT)',
      slug: { _type: 'slug', current: 'faculty-of-ict' },
      deanName: '',
      sortOrder: 2,
      description: toPlainText('The Faculty of ICT provides training in computing, telecommunications, and information systems to meet the growing demands of the digital economy.'),
    },
    {
      _id: 'faculty-environmental',
      facultyName: 'Faculty of Environmental Studies (FES)',
      slug: { _type: 'slug', current: 'faculty-of-environmental-studies' },
      deanName: '',
      sortOrder: 3,
      description: toPlainText('The Faculty of Environmental Studies trains professionals in urban planning, building technology, and environmental management.'),
    },
    {
      _id: 'faculty-science',
      facultyName: 'Faculty of Science (FS)',
      slug: { _type: 'slug', current: 'faculty-of-science' },
      deanName: '',
      sortOrder: 4,
      description: toPlainText('The Faculty of Science offers programmes in pure and applied sciences, providing a solid foundation for further academic and professional pursuits.'),
    },
    {
      _id: 'faculty-management',
      facultyName: 'Faculty of Management Studies (FMS)',
      slug: { _type: 'slug', current: 'faculty-of-management-studies' },
      deanName: '',
      sortOrder: 5,
      description: toPlainText('The Faculty of Management Studies prepares students for careers in business administration, accounting, marketing, and public administration.'),
    },
    {
      _id: 'faculty-business',
      facultyName: 'Faculty of Management Studies (FMD)',
      slug: { _type: 'slug', current: 'faculty-of-management-studies-fmd' },
      deanName: '',
      sortOrder: 6,
      description: toPlainText('Offering programmes in business and entrepreneurship to develop future business leaders.'),
    },
    {
      _id: 'faculty-art-industrial',
      facultyName: 'Faculty of Art and Industrial Design (FAID)',
      slug: { _type: 'slug', current: 'faculty-of-art-and-industrial-design' },
      deanName: '',
      sortOrder: 7,
      description: toPlainText('The Faculty of Art and Industrial Design nurtures creativity and technical skills in graphic design, fine arts, and industrial design.'),
    },
    {
      _id: 'faculty-technical-education',
      facultyName: 'School of Technical and Technical Education',
      slug: { _type: 'slug', current: 'school-of-technical-education' },
      deanName: '',
      sortOrder: 8,
      description: toPlainText('Dedicated to producing qualified technical instructors and vocational education professionals.'),
    },
  ]

  for (const faculty of faculties) {
    await upsert({ ...faculty, _type: 'faculty' })
  }
}

// ─── 7. Programmes ────────────────────────────────────────────────────────────

async function seedProgrammes() {
  console.log('\n── Programmes ──')

  const programmes = [
    // Engineering
    { _id: 'prog-civil-eng',         programmeName: 'Civil Engineering',                     level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-engineering' } },
    { _id: 'prog-mechanical-eng',    programmeName: 'Mechanical Engineering',                 level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-engineering' } },
    { _id: 'prog-electrical-eng',    programmeName: 'Electrical/Electronics Engineering',    level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-engineering' } },
    { _id: 'prog-computer-eng',      programmeName: 'Computer Engineering',                   level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-engineering' } },
    // ICT
    { _id: 'prog-computer-sci',      programmeName: 'Computer Science',                       level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-ict' } },
    { _id: 'prog-information-tech',  programmeName: 'Information Technology',                 level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-ict' } },
    // Management
    { _id: 'prog-accountancy',       programmeName: 'Accountancy',                            level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-management' } },
    { _id: 'prog-business-admin',    programmeName: 'Business Administration',                level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-management' } },
    { _id: 'prog-marketing',         programmeName: 'Marketing',                              level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-management' } },
    { _id: 'prog-public-admin',      programmeName: 'Public Administration',                  level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-management' } },
    // Environmental
    { _id: 'prog-architecture',      programmeName: 'Architecture',                           level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-environmental' } },
    { _id: 'prog-building-tech',     programmeName: 'Building Technology',                    level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-environmental' } },
    { _id: 'prog-urban-planning',    programmeName: 'Urban & Regional Planning',              level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-environmental' } },
    // Science
    { _id: 'prog-statistics',        programmeName: 'Statistics',                             level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-science' } },
    { _id: 'prog-mathematics',       programmeName: 'Mathematics',                            level: 'hnd', faculty: { _type: 'reference', _ref: 'faculty-science' } },
  ]

  for (const prog of programmes) {
    await upsert({
      ...prog,
      _type: 'programme',
      slug: { _type: 'slug', current: prog._id.replace('prog-', '') },
      status: 'active',
      duration: '2 Years',
      description: toPlainText(`${prog.programmeName} programme at Osun State Polytechnic, Iree, provides students with practical and theoretical knowledge in the field.`),
    })
  }
}

// ─── 8. About Pages ───────────────────────────────────────────────────────────

async function seedAboutPages() {
  console.log('\n── About Pages ──')

  // ── Ospoly Profile ──────────────────────────────────────────────────────────
  await upsert({
    _id:            'aboutPage-ospoly-profile',
    _type:          'aboutPage',
    pageTitle:      'About OSPOLY',
    pageIdentifier: 'about-ospoly',
    hero: {
      _type:           'heroBanner',
      pageTitle:       'About OSPOLY',
      subtitle:        'At OSPOLY, you become part of a supportive and ambitious community. We empower you with the practical skills, entrepreneurial mindset, and deep knowledge needed to grow, lead, and create a better world from right here in Osun State.',
      overlayOpacity:  50,
    },
    bodyBlocks: [
      {
        _type: 'richTextBlock',
        _key:  key(),
        content: [
          {
            _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'Osun State Polytechnic, Iree (OSPOLY) is a leading state-owned tertiary institution committed to providing high-quality, relevant, and contemporary vocational, technical, and professional education. Strategically located in Iree, Osun State, Nigeria, OSPOLY serves as a crucial hub for developing skilled manpower, fostering innovation, and driving economic growth within the region and the nation at large.' }],
          },
          {
            _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'Established by Edict No. 9 of The Polytechnic Iree Law (Cap 119) Laws of Osun State 1992, Osun State Polytechnic, Iree, officially commenced operations in 1992. Born out of a vision to bridge the critical skills gap in various sectors of the Nigerian economy, the Polytechnic has steadily grown from its humble beginnings to become a reputable institution renowned for its practical-oriented approach to learning. Over the decades, OSPOLY has consistently adapted its curriculum and expanded its facilities to meet the dynamic demands of industry and technology.' }],
          },
        ],
      },
      {
        _type:       'pullQuoteBlock',
        _key:        key(),
        quote:       "At OSPOLY, we don't just teach; we build. We don't just learn; we create. Welcome to a place where your skills are forged for success.",
        attribution: 'Dr. Kehinde Adeyemi Alabi, Rector, Osun State Polytechnic, Iree',
      },
      {
        _type: 'statGridBlock',
        _key:  key(),
        stats: [
          { _key: key(), value: '40+',     label: 'Years of Excellence' },
          { _key: key(), value: '50+',     label: 'Academic Programs' },
          { _key: key(), value: '5+',      label: 'Decades of Institutional Heritage' },
          { _key: key(), value: '10,000+', label: 'Student Population' },
          { _key: key(), value: '2',       label: 'Partner Universities' },
          { _key: key(), value: '9',       label: 'Faculties & Schools' },
          { _key: key(), value: '30,000+', label: 'Vibrant Community' },
          { _key: key(), value: '30,000+', label: 'Alumni Network' },
          { _key: key(), value: '500+',    label: 'Staff & Faculty' },
        ],
      },
    ],
  })

  // ── Vision & Mission ────────────────────────────────────────────────────────
  await upsert({
    _id:            'aboutPage-vision-mission',
    _type:          'aboutPage',
    pageTitle:      'Our Vision & Mission',
    pageIdentifier: 'vision-mission',
    hero: {
      _type:          'heroBanner',
      pageTitle:      'Our Vision & Mission',
      subtitle:       '',
      overlayOpacity: 50,
    },
    bodyBlocks: [
      {
        _type: 'richTextBlock',
        _key:  key(),
        content: [
          {
            _type: 'block', _key: key(), style: 'h2', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'Vision Statement' }],
          },
          {
            _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'To be recognized as a leading Center of Excellence in Nigeria and West Africa for innovative vocational and technical education, fostering a tradition of academic distinction, research, and skill-based training that significantly contributes to national economic development and technological advancement.' }],
          },
          {
            _type: 'block', _key: key(), style: 'h2', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'Mission Statement' }],
          },
          {
            _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'The Mission of Osun State Polytechnic, Iree, is to produce highly motivated, technically proficient, and efficient manpower in the fields of Science, Engineering, Environmental Studies, Information and Communication Technology, Management, and Financial Studies.' }],
          },
          {
            _type: 'block', _key: key(), style: 'normal', markDefs: [],
            children: [{ _type: 'span', _key: key(), marks: [], text: 'This is achieved by providing relevant, practical, and industry-focused training that instills entrepreneurial skills, moral uprightness, and self-reliance, thereby meeting the present and future middle-level manpower needs of Osun State and Nigeria.' }],
          },
        ],
      },
    ],
  })

  // ── Administration ──────────────────────────────────────────────────────────
  await upsert({
    _id:            'aboutPage-administration',
    _type:          'aboutPage',
    pageTitle:      'Administration',
    pageIdentifier: 'administration',
    hero: {
      _type:          'heroBanner',
      pageTitle:      'Administration',
      subtitle:       "Osun State Polytechnic, Iree's leadership provides strategic direction and guidance to achieve the Polytechnic's long-term goals of fostering technical excellence, practical innovation, and an inclusive learning environment.",
      overlayOpacity: 50,
    },
    bodyBlocks: [
      {
        _type:   'staffGridBlock',
        _key:    key(),
        heading: 'Senior Leadership',
        staff: [
          { _type: 'reference', _ref: 'staff-rector',    _key: key() },
          { _type: 'reference', _ref: 'staff-registrar', _key: key() },
          { _type: 'reference', _ref: 'staff-bursar',    _key: key() },
        ],
      },
    ],
  })
}

// ─── 9. Admission Pages ───────────────────────────────────────────────────────

async function seedAdmissionPages() {
  console.log('\n── Admission Pages ──')

  // ── Undergraduate ───────────────────────────────────────────────────────────
  await upsert({
    _id:           'admissionPage-undergraduate',
    _type:         'admissionPage',
    pageTitle:     'Undergraduate Admission',
    admissionType: 'undergraduate',
    hero: {
      _type:          'heroBanner',
      pageTitle:      'Find Your Path. Shape Your Future.',
      subtitle:       'Welcome to the Admission Hub of Osun State Polytechnic, Iree. Whether you are starting your right-here journey into a technical career, or balancing education with work, OSPOLY offers programmes designed for you. Explore our programmes and find the right fit for your ambitions.',
      overlayOpacity: 55,
    },
    introText: toPlainText('Our undergraduate programmes focus on hands-on learning and industry-relevant training that prepares students for employment in practical and professional learning.'),
    requirements: [
      {
        _type: 'block', _key: key(), style: 'h3', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: 'National Diploma (ND)' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: 'Five (5) credits in WAEC/NECO including English Language and Mathematics at not more than two sittings.' }],
      },
      {
        _type: 'block', _key: key(), style: 'h3', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: 'Higher National Diploma (HND)' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: 'ND (lower credit and above) in a relevant field from a recognised institution. NYSC discharge or exemption certificate.' }],
      },
    ],
    howToApply: [
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '1. Complete an account at myospoly.edu.ng.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '2. Complete key application form.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '3. Upload required documents.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '4. Pay the application fee.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '5. Submit your application.' }],
      },
    ],
    keyDates: [
      { _key: key(), label: 'Application Opens',  date: '2025-09-01' },
      { _key: key(), label: 'Application Closes', date: '2025-11-30' },
      { _key: key(), label: 'Screening Date',     date: '2025-12-15' },
      { _key: key(), label: 'Resumption',         date: '2026-01-20' },
    ],
    ctaButtonLabel: 'Launch Undergraduate Offer',
    ctaButtonUrl:   'https://myospoly.edu.ng',
  })

  // ── Postgraduate ────────────────────────────────────────────────────────────
  await upsert({
    _id:           'admissionPage-postgraduate',
    _type:         'admissionPage',
    pageTitle:     'Postgraduate Admission',
    admissionType: 'postgraduate',
    hero: {
      _type:          'heroBanner',
      pageTitle:      'Find Your Path. Shape Your Future.',
      subtitle:       'Welcome to the Admission Hub of Osun State Polytechnic, Iree. Whether you are building on your HND or seeking advanced professional qualifications, OSPOLY offers postgraduate programmes designed for career advancement.',
      overlayOpacity: 55,
    },
    introText: toPlainText("OSPOLY's postgraduate programmes provide opportunities for advanced academic and professional development for individuals who hold HND or first degree qualifications."),
    requirements: [
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: 'A minimum of HND (lower credit) or Bachelor\'s degree in relevant field. A minimum of one year post-qualification experience (where applicable). Valid NYSC discharge or exemption certificate.' }],
      },
    ],
    howToApply: [
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '1. Complete key application form online.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '2. Upload required documents and certificates.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '3. Pay the application fee and submit.' }],
      },
    ],
    keyDates: [
      { _key: key(), label: 'Application Opens',  date: '2025-09-01' },
      { _key: key(), label: 'Application Closes', date: '2025-11-30' },
    ],
    ctaButtonLabel: 'Contact Graduate Office',
    ctaButtonUrl:   'mailto:postgraduate@ospoly.edu.ng',
  })

  // ── Distance Learning ───────────────────────────────────────────────────────
  await upsert({
    _id:           'admissionPage-distance-learning',
    _type:         'admissionPage',
    pageTitle:     'Distance Learning / Part-Time Studies',
    admissionType: 'distance-learning',
    hero: {
      _type:          'heroBanner',
      pageTitle:      'Find Your Path. Shape Your Future.',
      subtitle:       'Welcome to the Admission Hub of Osun State Polytechnic, Iree. The Distance Learning / Part-Time programme at OSPOLY provides flexible, world-class opportunities for professionals and individuals who wish to grow their careers while managing their day-to-day responsibilities.',
      overlayOpacity: 55,
    },
    introText: toPlainText('The Distance / Part-Time (DPT) distance course for professionals. Weekend Programmes for working professionals. Distance learning (Online / On Campus) for remote learners.'),
    requirements: [
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: 'A minimum of five (5) credits including English and Mathematics. ND Certificate for HND applicants (where applicable). Work experience is advantageous but not mandatory.' }],
      },
    ],
    howToApply: [
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '1. Visit the OSPOLY Distance Learning portal.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '2. Select your preferred programme and mode of study.' }],
      },
      {
        _type: 'block', _key: key(), style: 'normal', markDefs: [],
        children: [{ _type: 'span', _key: key(), marks: [], text: '3. Complete and submit the online application form with required documents.' }],
      },
    ],
    keyDates: [
      { _key: key(), label: 'Application Opens',  date: '2025-09-01' },
      { _key: key(), label: 'Application Closes', date: '2025-12-15' },
    ],
    ctaButtonLabel: 'Launch Part-Time Offer',
    ctaButtonUrl:   'https://myospoly.edu.ng',
  })
}

// ─── 10. News Articles (sample) ───────────────────────────────────────────────

async function seedNewsArticles() {
  console.log('\n── News Articles ──')

  const articles = [
    {
      _id:    'news-nbte-accreditation',
      title:  'Engineering Faculty Secures National NBTE Accreditation for All HND Programmes',
      slug:   { _type: 'slug', current: 'engineering-faculty-nbte-accreditation' },
      category: 'news',
      excerpt: 'The National Board for Technical Education (NBTE) has officially renewed full accreditation for all Higher National Diploma (HND) programmes in the Faculty of Engineering, citing the Polytechnic\'s state-of-the-art workshops and qualified faculty.',
      publishDate: '2025-05-10T09:00:00Z',
      author: 'OSPOLY Communications',
      status: 'published',
      showOnHomepage: true,
      tags: ['accreditation', 'engineering', 'NBTE'],
    },
    {
      _id:    'news-nbte-accreditation-2',
      title:  'OSPOLY Graduates Record High Employment Rate in 2025',
      slug:   { _type: 'slug', current: 'ospoly-graduates-employment-rate-2025' },
      category: 'news',
      excerpt: 'Osun State Polytechnic, Iree, has recorded an impressive graduate employment rate, with over 90% of the 2024 graduating class securing employment or furthering their education within six months of graduation.',
      publishDate: '2025-04-22T09:00:00Z',
      author: 'OSPOLY Communications',
      status: 'published',
      showOnHomepage: true,
      tags: ['graduates', 'employment', 'achievements'],
    },
    {
      _id:    'news-nbte-accreditation-3',
      title:  'New ICT Laboratory Commissioned at OSPOLY',
      slug:   { _type: 'slug', current: 'new-ict-laboratory-commissioned' },
      category: 'news',
      excerpt: 'Osun State Polytechnic, Iree, has commissioned a state-of-the-art ICT laboratory equipped with the latest computers and networking infrastructure to enhance the learning experience of students in technology-related programmes.',
      publishDate: '2025-03-15T09:00:00Z',
      author: 'OSPOLY Communications',
      status: 'published',
      showOnHomepage: true,
      tags: ['ICT', 'infrastructure', 'laboratory'],
    },
  ]

  for (const article of articles) {
    await upsert({
      ...article,
      _type: 'newsArticle',
      body: toPlainText(article.excerpt + ' This achievement underscores OSPOLY\'s commitment to quality technical training and its dedication to maintaining the highest standards of education.'),
    })
  }
}

// ─── 11. Events (sample) ──────────────────────────────────────────────────────

async function seedEvents() {
  console.log('\n── Events ──')

  const events = [
    {
      _id:       'event-sports-festival',
      eventTitle: 'Annual Inter-Faculty Sports & Cultural Festival',
      slug:      { _type: 'slug', current: 'annual-sports-cultural-festival-2025' },
      excerpt:   'Students and staff are invited to participate in the annual Sports and Cultural Festival. Events include football, athletics, debate, and traditional dance competitions.',
      eventDate: '2025-06-20T09:00:00Z',
      endDate:   '2025-06-25T18:00:00Z',
      location:  'OSPOLY Main Campus Sports Complex',
      status:    'published',
    },
    {
      _id:       'event-matriculation',
      eventTitle: '2025/2026 Matriculation Ceremony',
      slug:      { _type: 'slug', current: 'matriculation-ceremony-2025-2026' },
      excerpt:   'The formal induction of the new intake of students into Osun State Polytechnic, Iree. All newly admitted students are required to attend.',
      eventDate: '2026-01-28T10:00:00Z',
      location:  'OSPOLY Main Auditorium',
      status:    'published',
    },
    {
      _id:       'event-convocation',
      eventTitle: '2025 Convocation Ceremony',
      slug:      { _type: 'slug', current: 'convocation-ceremony-2025' },
      excerpt:   'The 2025 Convocation Ceremony celebrating the graduating class. Family members and guests are warmly invited to share in this milestone.',
      eventDate: '2025-11-15T10:00:00Z',
      location:  'OSPOLY Main Auditorium',
      status:    'published',
    },
  ]

  for (const event of events) {
    await upsert({
      ...event,
      _type: 'event',
      body: toPlainText(event.excerpt),
    })
  }
}

// ─── 12. Quick Links ──────────────────────────────────────────────────────────

async function seedQuickLinks() {
  console.log('\n── Quick Links ──')

  const links = [
    { _id: 'quicklink-undergraduate', label: 'Undergraduate Programs',   linkUrl: '/admission/undergraduate-studies',  sortOrder: 1 },
    { _id: 'quicklink-postgraduate',  label: 'Postgraduate Programs',    linkUrl: '/admission/postgraduate-studies',   sortOrder: 2 },
    { _id: 'quicklink-distance',      label: 'Distance Learning',        linkUrl: '/admission/distance-learning',      sortOrder: 3 },
    { _id: 'quicklink-portal',        label: 'Student Portal',           linkUrl: 'https://myospoly.edu.ng',           sortOrder: 4 },
    { _id: 'quicklink-news',          label: 'Latest News',              linkUrl: '/news-events',                      sortOrder: 5 },
    { _id: 'quicklink-contact',       label: 'Contact Us',               linkUrl: '/contact',                         sortOrder: 6 },
  ]

  for (const link of links) {
    await upsert({
      ...link,
      _type:  'quickLink',
      active: true,
    })
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting OSPOLY Sanity seed...')
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'}\n`)

  if (!process.env.SANITY_TOKEN) {
    console.error('❌  SANITY_TOKEN is not set in .env.local')
    console.error('   Get it from: https://sanity.io/manage → your project → API → Tokens')
    console.error('   The token needs Editor or Administrator permissions.')
    process.exit(1)
  }

  try {
    await seedFooterColumns()
    await seedNewsletterCta()
    await seedAnnouncements()
    await seedKeyStatistics()
    await seedStaffProfiles()
    await seedFaculties()
    await seedProgrammes()
    await seedAboutPages()
    await seedAdmissionPages()
    await seedNewsArticles()
    await seedEvents()
    await seedQuickLinks()

    console.log('\n✅  Seed complete! All documents created in Sanity.')
    console.log('   Visit your Studio to review: http://localhost:3000/studio')
  } catch (err) {
    console.error('\n❌  Seed failed:', err)
    process.exit(1)
  }
}

main()