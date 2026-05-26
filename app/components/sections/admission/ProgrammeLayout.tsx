import Breadcrumb, { BreadcrumbItem } from "../../ui/Breadcrumb";
import PageHero from "../../ui/PageHero";


interface ProgrammeLayoutProps {
  heroTitle: string;
  heroDescription?: string;
  heroImageUrl?: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  applyCard: React.ReactNode;
}

export default function ProgrammeLayout({
  heroTitle,
  heroDescription,
  heroImageUrl,
  breadcrumbs,
  children,
  applyCard,
}: ProgrammeLayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={heroTitle}
        description={heroDescription}
        imageUrl={heroImageUrl}
        size="default"
      />

      {/* Decorative shapes left */}
      <div className="pointer-events-none fixed left-0 top-1/3 w-48 h-64 overflow-hidden z-0" aria-hidden>
        <div className="absolute -left-10 top-0 w-28 h-28 border border-ospoly-pale rounded-sm" style={{ transform: "rotate(-18deg)" }} />
        <div className="absolute left-2 top-24 w-16 h-16 border border-ospoly-light/40 rounded-sm" style={{ transform: "rotate(-10deg)" }} />
        <div className="absolute -left-4 top-44 w-10 h-10 border border-ospoly-sky/20 rounded-sm" style={{ transform: "rotate(-25deg)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-24">
        <Breadcrumb items={breadcrumbs} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          <main className="min-w-0">{children}</main>
          <aside className="lg:sticky lg:top-24">{applyCard}</aside>
        </div>
      </div>
    </div>
  );
}
