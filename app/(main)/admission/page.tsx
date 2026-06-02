"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "../../components/ui/PageHero";
import Breadcrumb from "../../components/ui/Breadcrumb";


const BREADCRUMBS = [
  { label: "Home",      href: "/" },
  { label: "Academics", href: "/academics" },
  { label: "Faculties" },
];

const PROGRAMMES = [
  {
    label: "Undergraduate Program",
    href: "/admission/undergraduate-studies",
    imageUrl:
      // "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=75&fit=crop",
      "/assets/ug.jpg",
  },
  {
    label: "Post Graduate Program",
    href: "/admission/postgraduate-studies",
    imageUrl:
      // "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&q=75&fit=crop",
      "/assets/pgd.jpg",
  },
  {
    label: "Distance Learning / Part-Time Studies",
    href: "/admission/distance-learning",
    imageUrl:
      // "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=75&fit=crop",
      "/assets/dsl.jpg",
  },
];

export default function ProgrammesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="Programmes"
        description="Discover a wide range of National Diploma (ND), Higher National Diploma (HND), and Part-Time programmes designed to equip you with practical, industry-ready skills."
        size="default"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        <Breadcrumb items={BREADCRUMBS} />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          {PROGRAMMES.map((prog, i) => (
            <motion.div
              key={prog.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className=""
            >
              <Link href={prog.href} >
              <div
                className="group rounded-2xl overflow-hidde border border-ospoly-gold/70 shadow-sm hover:shadow-md transition-all p-2"
              >
                <div className="relative w-full h-50 md:h-80 overflow-hidden bg-ospoly-pale rounded-2xl">
                  <Image
                    src={prog.imageUrl}
                    alt={prog.label}
                    fill
                    className="object-cover object-top-right transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                    sizes="680px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ospoly-deep/25 to-transparent" />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-[#456592] text-lg font-bold group-hover:underline">
                    {prog.label}
                  </span>
                  {/* <svg className="w-4 h-4 text-ospoly-gold transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg> */}
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
