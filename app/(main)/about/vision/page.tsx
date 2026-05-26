"use client";

import AboutLayout from "@/app/components/sections/about/AboutLayout";
import { motion } from "framer-motion";

const BREADCRUMBS = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
  { label: "Vision & Mission" },
];

const NAV_ITEMS = [
  { label: "Ospoly Profile",   href: "/about/ospoly-profile" },
  { label: "Vision & Mission", href: "/about/vision" },
  { label: "Administration",   href: "/about/administration" },
];

const SECTIONS = [
  {
    heading: "Vision Statement",
    body: `To be recognized as a leading Center of Excellence in Nigeria and West Africa for innovative vocational and technical education, fostering a tradition of academic distinction, research, and skill-based training that significantly contributes to national economic development and technological advancement.`,
  },
  {
    heading: "Mission Statement",
    body: `The Mission of Osun State Polytechnic, Iree, is to produce highly motivated, technically proficient, and efficient manpower in the fields of Science, Engineering, Environmental Studies, Information and Communication Technology, Management, and Financial Studies.\nThis is achieved by providing relevant, practical, and industry-focused training that instills entrepreneurial skills, moral uprightness, and self-reliance, thereby meeting the present and future middle-level manpower needs of Osun State and Nigeria.`,
  },
];

export default function VisionMissionPage() {
  return (
    <AboutLayout
      breadcrumbs={BREADCRUMBS}
      navItems={NAV_ITEMS}
      heroTitle="Our Vision & Mission"
      heroDescription=""
      showAtAGlance={false}
    >
      <article className="max-w-2xl space-y-12">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.15 }}
          >
            <h2 className="font-display font-bold text-ospoly-navy text-xl sm:text-2xl mb-4">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.body.split("\n").map((para, j) => (
                <p key={j} className="text-gray-600 text-[15px] leading-[1.85]">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </article>
    </AboutLayout>
  );
}
