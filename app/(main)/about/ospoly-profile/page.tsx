"use client";

import AboutLayout from "@/app/components/sections/about/AboutLayout";
import RectorQuote from "@/app/components/sections/about/RectorQuote";
import { motion } from "framer-motion";


const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ospoly profile" },
];

const NAV_ITEMS = [
  { label: "Ospoly Profile",   href: "/about/ospoly-profile" },
  { label: "Vision & Mission", href: "/about/vision" },
  { label: "Administration",   href: "/about/administration" },
];

const PARAGRAPHS = [
  `Osun State Polytechnic, Iree (OSPOLY) is a leading state-owned tertiary institution committed to providing high-quality, relevant, and contemporary vocational, technical, and professional education. Strategically located in Iree, Osun State, Nigeria, OSPOLY serves as a crucial hub for developing skilled manpower, fostering innovation, and driving economic growth within the region and the nation at large.`,
  `Established by Edict No. 9 of The Polytechnic Iree Law (Cap 119) Laws of Osun State 1992, Osun State Polytechnic, Iree, officially commenced operations in 1992. Born out of a vision to bridge the critical skills gap in various sectors of the Nigerian economy, the Polytechnic has steadily grown from its humble beginnings to become a reputable institution renowned for its practical-oriented approach to learning. Over the decades, OSPOLY has consistently adapted its curriculum and expanded its facilities to meet the dynamic demands of industry and technology.`,
];

export default function OspolyProfilePage() {
  return (
    <AboutLayout
      breadcrumbs={BREADCRUMBS}
      navItems={NAV_ITEMS}
      heroTitle="About OSPOLY"
      heroDescription="At OSPOLY, you become part of a supportive and ambitious community. We empower you with the practical skills, entrepreneurial mindset, and deep knowledge needed to grow, lead, and create a better world from right here in Osun State."
    >
      <article>
        <div className="space-y-6 mb-4">
          {PARAGRAPHS.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="text-gray-600 text-[15px] leading-[1.85] max-w-2xl"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <RectorQuote
          quote="At OSPOLY, we don't just teach; we build. We don't just learn; we create. Welcome to a place where your skills are forged for success."
          name="Dr. Kehinde Adeyemi Alabi,"
          title="Rector, Osun State Polytechnic, Iree"
          imageUrl="/assets/rector.png"
        />
      </article>
    </AboutLayout>
  );
}
