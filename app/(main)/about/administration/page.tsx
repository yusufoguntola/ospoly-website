"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AboutLayout from "@/app/components/sections/about/AboutLayout";

const BREADCRUMBS = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
  { label: "Administration" },
];

const NAV_ITEMS = [
  { label: "Ospoly Profile",   href: "/about/ospoly-profile" },
  { label: "Vision & Mission", href: "/about/vision" },
  { label: "Administration",   href: "/about/administration" },
];

const INTRO =
  "Osun State Polytechnic, Iree's leadership provides strategic direction and guidance to achieve the Polytechnic's long-term goals of fostering technical excellence, practical innovation, and an inclusive learning environment that directly contributes to the development of Osun State and Nigeria.";

interface AdminMember {
  role: string;
  name: string;
  imageUrl?: string;
}

const ADMIN_MEMBERS: AdminMember[] = [
  {
    role: "The Rector",
    name: "Dr. Kehinde Adeyemi Alabi,",
    imageUrl: "/assets/rector.png",
  },
  {
    role: "Registrar",
    name: "Abiodun Oyedele Oloyede,",
    imageUrl: "/assets/registrar.png",
  },
  {
    role: "Bursar",
    name: "Mr. Sunday Ademola Afolabi",
    imageUrl: "/assets/bursar.png",
  },
];

function AdminCard({ member, index }: { member: AdminMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-10 border-b border-gray-100 last:border-0"
    >
      {/* Text side */}
      <div className="flex-1 min-w-0 order-2 sm:order-1">
        <h3 className="font-display font-bold text-ospoly-navy text-xl sm:text-2xl mb-1">
          {member.role}
        </h3>
        <p className="text-gray-500 text-sm">{member.name}</p>
        <p className="text-gray-400 text-xs mt-0.5">
          {member.role === "The Rector"
            ? "Rector, Osun State Polytechnic, Iree"
            : member.role === "Registrar"
            ? "Registrar, Osun State Polytechnic, Iree"
            : "Bursar, Osun State Polytechnic, Iree"}
        </p>
      </div>

      {/* Portrait */}
      <div className="order-1 sm:order-2 shrink-0">
        <div className="relative w-[130px] h-[155px] rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-ospoly-pale">
          {member.imageUrl ? (
            <Image
              src={member.imageUrl}
              alt={`Portrait of ${member.name}`}
              fill
              className="object-cover object-top"
              sizes="130px"
            />
          ) : (
            /* Placeholder avatar */
            <div className="absolute inset-0 flex items-end justify-center pb-3">
              <svg viewBox="0 0 80 90" className="w-16 text-ospoly-navy/20" fill="currentColor">
                <ellipse cx="40" cy="32" rx="20" ry="22" />
                <path d="M0 90 C0 65 80 65 80 90Z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AdministrationPage() {
  return (
    <AboutLayout
      breadcrumbs={BREADCRUMBS}
      navItems={NAV_ITEMS}
      heroTitle="Administration"
      heroDescription=""
      showAtAGlance={false}
    >
      <article>
        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-gray-600 text-[15px] leading-[1.85] max-w-2xl mb-2"
        >
          {INTRO}
        </motion.p>

        {/* Admin cards */}
        <div className="mt-6">
          {ADMIN_MEMBERS.map((member, i) => (
            <AdminCard key={member.role} member={member} index={i} />
          ))}
        </div>
      </article>
    </AboutLayout>
  );
}
