// import Breadcrumb, { BreadcrumbItem } from "../../ui/Breadcrumb";
// import PageHero from "../../ui/PageHero";
// import NewsUpdateSection from "../NewsUpdateSection";
// import AtAGlanceSection from "./AtAGlanceSection";
// import SidebarNav, { SidebarNavItem } from "./SidebarNav";

import Breadcrumb, { BreadcrumbItem } from "../../ui/Breadcrumb";
import PageHero from "../../ui/PageHero";
import NewsUpdateSection from "../NewsUpdateSection";
import AtAGlanceSection from "./AtAGlanceSection";
import SidebarNav, { SidebarNavItem } from "./SidebarNav";

// interface AboutLayoutProps {
//   breadcrumbs: BreadcrumbItem[];
//   navItems: SidebarNavItem[];
//   children: React.ReactNode;
// }

// export default function AboutLayout({
//   breadcrumbs,
//   navItems,
//   children,
// }: AboutLayoutProps) {
//   return (
//     <div className="bg-white min-h-screen">
//       <PageHero
//         title={"About Ospoly"}
//         description="At OSPOLY, you become part of a supportive and ambitious community. We empower you with the practical skills, entrepreneurial mindset, and deep knowledge needed to grow, lead, and create a better world from right here in Osun State."
//       />
//       {/* Decorative shapes — left side, matching the screenshot */}
//       <div
//         className="pointer-events-none fixed left-0 top-1/3 w-48 h-64 overflow-hidden"
//         aria-hidden
//       >
//         <div
//           className="absolute -left-10 top-0 w-28 h-28 border border-ospoly-pale rounded-sm"
//           style={{ transform: "rotate(-18deg)" }}
//         />
//         <div
//           className="absolute left-2 top-24 w-16 h-16 border border-ospoly-light/40 rounded-sm"
//           style={{ transform: "rotate(-10deg)" }}
//         />
//         <div
//           className="absolute -left-4 top-44 w-10 h-10 border border-ospoly-sky/20 rounded-sm"
//           style={{ transform: "rotate(-25deg)" }}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
//         {/* Breadcrumb */}
//         <Breadcrumb items={breadcrumbs} />

//         <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
//           {/* Sidebar */}
//           <aside className="lg:pt-1 border-r ">
//             <SidebarNav items={navItems} />
//           </aside>

//           {/* Main content */}
//           <main className="min-w-0">{children}</main>
//         </div>
//       </div>
//         <AtAGlanceSection />
//         <NewsUpdateSection />
//     </div>
//   );
// }



interface AboutLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  navItems: SidebarNavItem[];
  /** Override the hero title — defaults to "About OSPOLY" */
  heroTitle?: string;
  /** Override the hero description */
  heroDescription?: string;
  children: React.ReactNode;
  /** Whether to show AtAGlance at the bottom (default: true) */
  showAtAGlance?: boolean;
}

const DEFAULT_NAV: SidebarNavItem[] = [
  { label: "Ospoly Profile",  href: "/about/ospoly-profile" },
  { label: "Vision & Mission", href: "/about/vision" },
  { label: "Administration",   href: "/about/administration" },
];

export default function AboutLayout({
  breadcrumbs,
  navItems = DEFAULT_NAV,
  heroTitle = "About OSPOLY",
  heroDescription = "At OSPOLY, you become part of a supportive and ambitious community. We empower you with the practical skills, entrepreneurial mindset, and deep knowledge needed to grow, lead, and create a better world from right here in Osun State.",
  children,
  showAtAGlance = true,
}: AboutLayoutProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero — title + description varies per sub-page */}
      <PageHero
        title={heroTitle}
        description={heroDescription}
      />

      {/* Decorative rotated squares — fixed left side */}
      <div
        className="pointer-events-none fixed left-0 top-1/3 w-48 h-64 overflow-hidden z-0"
        aria-hidden
      >
        <div
          className="absolute -left-10 top-0 w-28 h-28 border border-ospoly-pale rounded-sm"
          style={{ transform: "rotate(-18deg)" }}
        />
        <div
          className="absolute left-2 top-24 w-16 h-16 border border-ospoly-light/40 rounded-sm"
          style={{ transform: "rotate(-10deg)" }}
        />
        <div
          className="absolute -left-4 top-44 w-10 h-10 border border-ospoly-sky/20 rounded-sm"
          style={{ transform: "rotate(-25deg)" }}
        />
      </div>

      {/* Main layout: sidebar + content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-20">
        <Breadcrumb items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="lg:pt-1 border-r border-gray-100">
            <SidebarNav items={navItems} />
          </aside>

          {/* Page-specific content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>

      {/* Always-present bottom sections */}
      {showAtAGlance && <AtAGlanceSection />}
         <NewsUpdateSection />
    </div>
  );
}
