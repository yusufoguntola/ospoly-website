import Link from "next/link";
import Image from "next/image";
import PageHero from "@/app/components/ui/PageHero";
import Breadcrumb from "@/app/components/ui/Breadcrumb";

const BREADCRUMBS = [
  { label: "Home",      href: "/" },
  { label: "Admission", href: "/admission" },
]

const PROGRAMMES = [
  {
    label:    "Undergraduate Program",
    href:     "/admission/undergraduate-studies",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=75&fit=crop",
  },
  {
    label:    "Post Graduate Program",
    href:     "/admission/postgraduate-studies",
    imageUrl: "https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&q=75&fit=crop",
  },
  {
    label:    "Distance Learning / Part-Time Studies",
    href:     "/admission/distance-learning",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=75&fit=crop",
  },
]

export default function AdmissionPage() {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title="Programmes"
        description="Discover a wide range of National Diploma (ND), Higher National Diploma (HND), and Part-Time programmes designed to equip you with practical, industry-ready skills."
        size="default"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        <Breadcrumb items={BREADCRUMBS} />

        <div className="mt-4 space-y-6">
          {PROGRAMMES.map((prog) => (
            <Link
              key={prog.href}
              href={prog.href}
              className="block group rounded-2xl overflow-hidden border border-ospoly-gold/70 shadow-sm hover:shadow-md transition-all p-2"
            >
              <div className="relative w-full h-50 md:h-80 overflow-hidden bg-ospoly-pale rounded-2xl">
                <Image
                  src={prog.imageUrl}
                  alt={prog.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 680px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ospoly-deep/25 to-transparent" />
              </div>
              <div className="px-4 py-3">
                <span className="text-[#456592] text-xl font-bold group-hover:underline">
                  {prog.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}