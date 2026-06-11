import Link from "next/link";
import Image from "next/image";
import PageHero from "@/app/components/ui/PageHero";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { sanityFetch } from "@/sanity/lib/live";
import { getAdmissionPagesQuery } from "@/sanity/lib/queries";
import type { SanityAdmissionCard } from "@/sanity/lib/sanity.types";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Admission", href: "/admission" },
];

const ADMISSION_SLUG: Record<string, string> = {
  undergraduate: "undergraduate-studies",
  postgraduate: "postgraduate-studies",
  "distance-learning": "distance-learning",
};

export default async function AdmissionPage() {
  const { data } = await sanityFetch({ query: getAdmissionPagesQuery }).catch(
    () => ({ data: [] }),
  );
  const pages = (data ?? []) as SanityAdmissionCard[];

  const programmes = pages
    .map((page) => {
      const slug = ADMISSION_SLUG[page.admissionType];
      if (!slug || !page.hero?.backgroundImage?.url) return null;
      return {
        label: page.pageTitle,
        href: `/admission/${slug}`,
        imageUrl: page.hero.backgroundImage.url,
      };
    })
    .filter(Boolean) as { label: string; href: string; imageUrl: string }[];

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
          {programmes.map((prog) => (
            <div key={prog.href}>
              <Link target="_blank" href={prog.href}>
                <div className="group rounded-2xl overflow-hidde border border-ospoly-gold/70 shadow-sm hover:shadow-md transition-all p-2">
                  <div className="relative w-full h-50 md:h-80 overflow-hidden bg-ospoly-pale rounded-2xl">
                    <Image
                      src={prog.imageUrl}
                      alt={prog.label}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                      sizes="680px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ospoly-deep/25 to-transparent" />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-[#456592] text-lg font-bold group-hover:underline">
                      {prog.label}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
