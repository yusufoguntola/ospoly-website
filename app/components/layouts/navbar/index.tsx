// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";

// // ─── Types ────────────────────────────────────────────────
// interface NavSection {
//   label: { name: string; href: string };
//   links: { text: string; href: string }[];
// }

// // ─── Data ─────────────────────────────────────────────────
// const NAV_SECTIONS: NavSection[] = [
//   {
//     label: { name: "About", href: "/about" },
//     links: [
//       { text: "Ospoly Profile", href: "/about/ospoly-profile" },
//       { text: "Administration", href: "/about/administration" },
//       { text: "Vision and Mission", href: "/about/vision" },
//     ],
//   },
//   {
//     label: { name: "Admission", href: "/admission" },
//     links: [
//       { text: "Undergraduate studies", href: "/admission/undergraduate-studies" },
//       { text: "Postgraduate studies", href: "/admission/postgraduate-studies" },
//       {
//         text: "Distance learning / Part-time studies",
//         href: "/admission/distance-learning",
//       },
//     ],
//   },
//   {
//     label: { name: "Academics", href: "/academics" },
//     links: [
//       { text: "Faculties", href: "/academics" },
//       { text: "Postgraduate school", href: "/academics" },
//     ],
//   },
//   {
//     label: { name: "News / Events", href: "/news-events" },
//     links: [
//       { text: "Latest News", href: "/news-events" },
//       { text: "Upcoming Events", href: "/news-events" },
//     ],
//   },
// ];

// const FOOTER_LINKS = [
//   { text: "Alumni", href: "/alumni" },
//   { text: "Contact Us", href: "/contact" },
//   { text: "Calendar", href: "/calendar" },
// ];

// // ─── Sub-components ───────────────────────────────────────
// function SearchIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <line x1="21" y1="21" x2="16.65" y2="16.65" />
//     </svg>
//   );
// }

// function OspolyCrest() {
//   return (
//     <Link
//       href="/"
//       className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
//       aria-label="OSPOLY home"
//     >
//       <Image
//         src={"/assets/logo.png"}
//         alt="Ospoly Logo"
//         width={120}
//         height={60}
//         className="w-20 h-auto sm:w-25 md:w-30 object-contain"
//         priority
//       />
//     </Link>
//   );
// }

// // ─── Main Component ───────────────────────────────────────
// export default function OspolyNavbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const searchRef = useRef<HTMLInputElement>(null);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // Focus search input when opened
//   useEffect(() => {
//     if (searchOpen) {
//       setTimeout(() => searchRef.current?.focus(), 40);
//     }
//   }, [searchOpen]);

//   // Escape key closes both
//   useEffect(() => {
//     function onKey(e: KeyboardEvent) {
//       if (e.key === "Escape") {
//         setMenuOpen(false);
//         setSearchOpen(false);
//         setSearchValue("");
//       }
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   // Lock body scroll when menu is open
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   function handleOpenSearch() {
//     setSearchOpen(true);
//     if (menuOpen) setMenuOpen(false);
//   }

//   function handleCloseSearch() {
//     setSearchOpen(false);
//     setSearchValue("");
//   }

//   function handleSearchSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (searchValue.trim()) {
//       // TODO: wire up to actual search route
//       console.log("Search:", searchValue);
//     }
//   }

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 font-(family-name:--font-barlow,'Barlow',sans-serif) bg-transparent p-4">
//       {/* ── NAVBAR ─────────────────────────────────────── */}
//       {!menuOpen && (
//         <nav
//           className="relative z-50 flex justify-between items-center h-17 px-4 md:px-8 fixed max-w-7xl mx-auto"
//           aria-label="Main navigation"
//         >
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-2.5 shrink-0 mr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
//             aria-label="OSPOLY home"
//           >
//             <Image
//               src={"/assets/logo.png"}
//               alt="Ospoly Logo"
//               width={120}
//               height={60}
//               className="w-20 h-auto sm:w-25 md:w-30 object-contain"
//               priority
//             />
//           </Link>

//           {/* ── SEARCH ACTIVE STATE
//              Wide white bar that fills the space between logo and MENU.
//              Matches screenshot: full-width input, search icon + X circle on right. */}
//           {searchOpen ? (
//             <form
//               onSubmit={handleSearchSubmit}
//               className="flex-1 flex items-center animate-[fadeSlideIn_0.2s_ease] w-50"
//               role="search"
//             >
//               <div className="flex-1 flex items-center bg-white h-12 md:h-17 rounded-bl-2xl px-4 gap-3 shadow-[0_4px_28px_rgba(0,0,0,0.28)]">
//                 <input
//                   ref={searchRef}
//                   type="search"
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
//                   placeholder="SEARCH OSPOLY"
//                   className="
//                   flex-1 bg-transparent py-2 outline-none
//                   text-ospoly-deep text-[13px] font-medium tracking-[0.07em]
//                   placeholder:text-ospoly-deep/35 border-b
//                   [&::-webkit-search-cancel-button]:hidden
//                 "
//                   aria-label="Search OSPOLY"
//                 />
//                 {/* Search icon */}
//                 <button
//                   type="submit"
//                   className="shrink-0 text-ospoly-navy/45 hover:text-ospoly-navy transition-colors p-0.5"
//                   aria-label="Submit search"
//                 >
//                   <SearchIcon />
//                 </button>
//                 {/* Circle X close */}
//                 <button
//                   type="button"
//                   onClick={handleCloseSearch}
//                   className="shrink-0 text-ospoly-navy/45 hover:text-ospoly-navy transition-colors p-0.5"
//                   aria-label="Close search"
//                 >
//                   <svg
//                     width="18"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   >
//                     <circle cx="12" cy="12" r="9" />
//                     <line x1="15" y1="9" x2="9" y2="15" />
//                     <line x1="9" y1="9" x2="15" y2="15" />
//                   </svg>
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="flex-1" />
//           )}

//           {/* ── RIGHT CONTROLS ────────────────────────────── */}
//           <div className="flex items-center shrink-0 ">
//             {/* SEARCH button — hidden while search is open */}
//             {!searchOpen && (
//               <button
//                 onClick={handleOpenSearch}
//                 className="
//                 flex items-center gap-2 text-white text-[11.5px] font-semibold
//                 tracking-[0.12em] px-4 sm:px-6 h-12 md:h-17
//                 hover:bg-ospoly-navy transition-colors
//                 border-r border-white/10 cursor-pointer
//                 bg-ospoly-deep rounded-bl-2xl
//                 focus-visible:outline-none focus-visible:bg-white/10
//               "
//                 aria-label="Open search"
//               >
//                 <span className="hidden sm:inline">SEARCH</span>
//                 <SearchIcon className="text-white w-4 h-4" />
//               </button>
//             )}

//             {/* MENU button — always visible */}
//             <button
//               onClick={() => setMenuOpen((prev) => !prev)}
//               className={`
//               flex items-center gap-2.5 text-white text-[11.5px] font-semibold
//               tracking-[0.12em] px-4 sm:px-6 h-12 md:h-17
//               bg-ospoly-deep rounded-br-2xl cursor-pointer
//               transition-colors focus-visible:outline-none focus-visible:bg-white/10
//               ${menuOpen ? "bg-ospoly-navy" : "hover:bg-ospoly-navy"}
//             `}
//               aria-expanded={menuOpen}
//               aria-controls="nav-menu"
//               aria-label={
//                 menuOpen ? "Close navigation menu" : "Open navigation menu"
//               }
//             >
//               <span className="hidden md:block">MENU</span>
//               {/* Hamburger → X morphing icon */}
//               <span
//                 className="flex flex-col gap-[4.5px] w-4.5"
//                 aria-hidden="true"
//               >
//                 <span
//                   className={`block w-full h-[1.5px] bg-white transition-transform duration-250 origin-center ${
//                     menuOpen ? "translate-y-1.5 rotate-45" : ""
//                   }`}
//                 />
//                 <span
//                   className={`block w-full h-[1.5px] bg-white transition-opacity duration-250 ${
//                     menuOpen ? "opacity-0" : "opacity-100"
//                   }`}
//                 />
//                 <span
//                   className={`block w-full h-[1.5px] bg-white transition-transform duration-250 origin-center ${
//                     menuOpen ? "-translate-y-1.5 -rotate-45" : ""
//                   }`}
//                 />
//               </span>
//             </button>
//           </div>
//         </nav>
//       )}

//       {/* ── MENU OVERLAY ───────────────────────────────── */}
//       <div
//         id="nav-menu"
//         ref={menuRef}
//         role="dialog"
//         aria-label="Navigation menu"
//         aria-modal="true"
//         aria-hidden={!menuOpen}
//         className={`
//           absolute top-0 left-0 right-0 z-40
//           overflow-hidden
//           transition-[max-height] duration-450 ease-in-out
//           ${menuOpen ? "max-h-150 shadow-[0_20px_60px_rgba(0,0,0,0.5)]" : "max-h-0"}
//         `}
//         style={{
//           background:
//             "linear-gradient(160deg, #0d1b2e 0%, #0f2040 65%, #091B34 100%)",
//         }}
//       >
//         {/* Diagonal grid pattern */}
//         <div
//           className="absolute inset-0 pointer-events-none opacity-[0.035]"
//           style={{
//             backgroundImage:
//               "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(255,255,255,0.6) 40px,rgba(255,255,255,0.6) 41px)",
//           }}
//           aria-hidden="true"
//         />

//         <div className="relative px-4 sm:px-8 md:px-12 pt-19 max-w-7xl mx-auto">
//           {/* ── Search + close row ── */}
//           <div className="flex items-center justify-between gap-3 sm:gap-4 mb-10">
//             <OspolyCrest />
//             <div className="md:flex-1 flex items-center bg-white/6 border border-white/10 rounded-full px-5 h-12.5 gap-3">
//               <input
//                 type="search"
//                 placeholder="Search people, place, or things"
//                 className="
//                   flex-1 bg-transparent border-none outline-none
//                   text-white text-[14px] placeholder:text-white/35
//                   [&::-webkit-search-cancel-button]:hidden
//                 "
//                 aria-label="Site search"
//               />
//               <SearchIcon className="text-white/40 shrink-0" />
//             </div>
//             <button
//               onClick={() => setMenuOpen(false)}
//               className="
//                 w-10.5 h-10.5 rounded-full border border-white/20 bg-transparent
//                 flex items-center justify-center text-white/70
//                 hover:text-white hover:border-white/40
//                 transition-colors shrink-0 cursor-pointer
//                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
//               "
//               aria-label="Close menu"
//             >
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18" />
//                 <line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>

//           {/* ── Nav columns ── */}
//           <div className="border-t border-white/7 pt-8 mb-7 grid grid-cols-2 lg:flex lg:justify-between gap-y-8">
//             {NAV_SECTIONS.map((section, i) => (
//               <div
//                 key={section.label.name}
//                 className={`pr-5 lg:pr-8 ${
//                   i % 2 !== 0 ? "pl-5 lg:pl-8 border-l border-white/6" : ""
//                 } ${
//                   // top border on rows 2+ on mobile 2-col grid
//                   i >= 2
//                     ? "border-t border-white/6 pt-8 lg:border-t-0 lg:pt-0"
//                     : ""
//                 } ${
//                   // left border on lg for cols 2,3,4
//                   i > 0
//                     ? "lg:pl-8 lg:border-l lg:border-white/6"
//                     : "lg:pl-0 lg:border-l-0"
//                 }`}
//               >
//                <Link href={section.label.href} onClick={() => setMenuOpen(false)}>
//  <h2 className="text-[11.5px] font-semibold text-ospoly-sky tracking-[0.08em] uppercase mb-4">
//                   {section.label.name}
//                 </h2>
//                </Link>
//                 <ul className="flex flex-col gap-3 list-none">
//                   {section.links.map((link, id) => (
//                     <li key={id}>
//                       <Link
//                         href={link.href}
//                         onClick={() => setMenuOpen(false)}
//                         className="
//                           text-white text-[13.5px] font-light leading-snug
//                           hover:text-ospoly-gold transition-colors block
//                           focus-visible:outline-none focus-visible:text-white
//                         "
//                       >
//                         {link.text}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* ── Footer links ── */}
//           <div className="border-t border-white/7 py-5 flex flex-wrap gap-6 sm:gap-10">
//             {FOOTER_LINKS.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="
//                   text-white/45 text-[12.5px]
//                   hover:text-white/80 transition-colors
//                   focus-visible:outline-none focus-visible:text-white/80
//                 "
//               >
//                 {link.text}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Animation keyframe — can move to globals.css */}
//       <style>{`
//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateX(6px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//       `}</style>
//     </header>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────
interface NavSection {
  label: { name: string; href: string };
  links: { text: string; href: string }[];
}

// ─── Data ─────────────────────────────────────────────────
const NAV_SECTIONS: NavSection[] = [
  {
    label: { name: "About", href: "/about" },
    links: [
      { text: "Ospoly Profile",     href: "/about/ospoly-profile" },
      { text: "Administration",     href: "/about/administration" },
      { text: "Vision and Mission", href: "/about/vision" },
    ],
  },
  {
    label: { name: "Admission", href: "/admission" },
    links: [
      { text: "Undergraduate studies",          href: "/admission/undergraduate-studies" },
      { text: "Postgraduate studies",           href: "/admission/postgraduate-studies" },
      { text: "Distance learning / Part-time",  href: "/admission/distance-learning" },
    ],
  },
  {
    label: { name: "Academics", href: "/academics" },
    links: [
      { text: "Faculties",          href: "/academics" },
      { text: "Postgraduate school", href: "/academics" },
    ],
  },
  {
    label: { name: "News / Events", href: "/news-events" },
    links: [
      { text: "Latest News",      href: "/news-events" },
      { text: "Upcoming Events",  href: "/news-events" },
    ],
  },
];

const FOOTER_LINKS = [
  { text: "Alumni",     href: "/alumni" },
  { text: "Contact Us", href: "/contact" },
  { text: "Calendar",   href: "/calendar" },
];

// ─── Sub-components ───────────────────────────────────────
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function OspolyCrest() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
      aria-label="OSPOLY home"
    >
      <Image
        src="/assets/logo.png"
        alt="Ospoly Logo"
        width={120}
        height={60}
        className="w-20 h-auto sm:w-25 md:w-30 object-contain"
        priority
      />
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function OspolyNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef   = useRef<HTMLDivElement>(null);

  // Helper — is this section or any of its links the current path?
  function isSectionActive(section: NavSection) {
    return (
      pathname === section.label.href ||
      pathname.startsWith(section.label.href + "/") ||
      section.links.some((l) => pathname === l.href || pathname.startsWith(l.href + "/"))
    );
  }

  function isLinkActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 40);
  }, [searchOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setSearchValue("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  function handleOpenSearch() {
    setSearchOpen(true);
    if (menuOpen) setMenuOpen(false);
  }

  function handleCloseSearch() {
    setSearchOpen(false);
    setSearchValue("");
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) console.log("Search:", searchValue);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-(family-name:--font-barlow,'Barlow',sans-serif) bg-transparent p-4">
      {/* ── NAVBAR ─────────────────────────────────────── */}
      {!menuOpen && (
        <nav
          className="relative z-50 flex justify-between items-center h-17 px-4 md:px-8 fixed max-w-7xl mx-auto"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 mr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            aria-label="OSPOLY home"
          >
            <Image
              src="/assets/logo.png"
              alt="Ospoly Logo"
              width={120}
              height={60}
              className="w-20 h-auto sm:w-25 md:w-30 object-contain"
              priority
            />
          </Link>

          {/* Search active state */}
          {searchOpen ? (
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 flex items-center animate-[fadeSlideIn_0.2s_ease] w-50"
              role="search"
            >
              <div className="flex-1 flex items-center bg-white h-12 md:h-17 rounded-bl-2xl px-4 gap-3 shadow-[0_4px_28px_rgba(0,0,0,0.28)]">
                <input
                  ref={searchRef}
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="SEARCH OSPOLY"
                  className="flex-1 bg-transparent py-2 outline-none text-ospoly-deep text-[13px] font-medium tracking-[0.07em] placeholder:text-ospoly-deep/35 border-b [&::-webkit-search-cancel-button]:hidden"
                  aria-label="Search OSPOLY"
                />
                <button type="submit" className="shrink-0 text-ospoly-navy/45 hover:text-ospoly-navy transition-colors p-0.5" aria-label="Submit search">
                  <SearchIcon />
                </button>
                <button type="button" onClick={handleCloseSearch} className="shrink-0 text-ospoly-navy/45 hover:text-ospoly-navy transition-colors p-0.5" aria-label="Close search">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <div className="flex-1" />
          )}

          {/* Right controls */}
          <div className="flex items-center shrink-0">
            {!searchOpen && (
              <button
                onClick={handleOpenSearch}
                className="flex items-center gap-2 text-white text-[11.5px] font-semibold tracking-[0.12em] px-4 sm:px-6 h-12 md:h-17 hover:bg-ospoly-navy transition-colors border-r border-white/10 cursor-pointer bg-ospoly-deep rounded-bl-2xl focus-visible:outline-none focus-visible:bg-white/10"
                aria-label="Open search"
              >
                <span className="hidden sm:inline">SEARCH</span>
                <SearchIcon className="text-white w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`flex items-center gap-2.5 text-white text-[11.5px] font-semibold tracking-[0.12em] px-4 sm:px-6 h-12 md:h-17 bg-ospoly-deep rounded-br-2xl cursor-pointer transition-colors focus-visible:outline-none focus-visible:bg-white/10 ${menuOpen ? "bg-ospoly-navy" : "hover:bg-ospoly-navy"}`}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="hidden md:block">MENU</span>
              <span className="flex flex-col gap-[4.5px] w-4.5" aria-hidden="true">
                <span className={`block w-full h-[1.5px] bg-white transition-transform duration-250 origin-center ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block w-full h-[1.5px] bg-white transition-opacity duration-250 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`block w-full h-[1.5px] bg-white transition-transform duration-250 origin-center ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>
      )}

      {/* ── MENU OVERLAY ───────────────────────────────── */}
      <div
        id="nav-menu"
        ref={menuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        aria-hidden={!menuOpen}
        className={`absolute top-0 left-0 right-0 z-40 overflow-hidden transition-[max-height] duration-450 ease-in-out ${menuOpen ? "max-h-150 shadow-[0_20px_60px_rgba(0,0,0,0.5)]" : "max-h-0"}`}
        style={{ background: "linear-gradient(160deg, #0d1b2e 0%, #0f2040 65%, #091B34 100%)" }}
      >
        {/* Diagonal grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(255,255,255,0.6) 40px,rgba(255,255,255,0.6) 41px)" }}
          aria-hidden="true"
        />

        <div className="relative px-4 sm:px-8 md:px-12 pt-19 max-w-7xl mx-auto">
          {/* Search + close row */}
          <div className="flex items-center justify-between gap-3 sm:gap-4 mb-10">
            <OspolyCrest />
            <div className="md:flex-1 flex items-center bg-white/6 border border-white/10 rounded-full px-5 h-12.5 gap-3">
              <input
                type="search"
                placeholder="Search people, place, or things"
                className="flex-1 bg-transparent border-none outline-none text-white text-[14px] placeholder:text-white/35 [&::-webkit-search-cancel-button]:hidden"
                aria-label="Site search"
              />
              <SearchIcon className="text-white/40 shrink-0" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10.5 h-10.5 rounded-full border border-white/20 bg-transparent flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Close menu"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav columns */}
          <div className="border-t border-white/7 pt-8 mb-7 grid grid-cols-2 lg:flex lg:justify-between gap-y-8">
            {NAV_SECTIONS.map((section, i) => {
              const sectionActive = isSectionActive(section);
              return (
                <div
                  key={section.label.name}
                  className={`pr-5 lg:pr-8 ${i % 2 !== 0 ? "pl-5 lg:pl-8 border-l border-white/6" : ""} ${i >= 2 ? "border-t border-white/6 pt-8 lg:border-t-0 lg:pt-0" : ""} ${i > 0 ? "lg:pl-8 lg:border-l lg:border-white/6" : "lg:pl-0 lg:border-l-0"}`}
                >
                  <Link href={section.label.href} onClick={() => setMenuOpen(false)}>
                    <h2 className={`text-[11.5px] font-semibold tracking-[0.08em] uppercase mb-4 transition-colors ${sectionActive ? "text-ospoly-gold" : "text-ospoly-sky hover:text-ospoly-gold"}`}>
                      {section.label.name}
                    </h2>
                  </Link>
                  <ul className="flex flex-col gap-3 list-none">
                    {section.links.map((link, id) => {
                      const linkActive = isLinkActive(link.href);
                      return (
                        <li key={id}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`text-[13.5px] font-light leading-snug transition-colors block focus-visible:outline-none ${linkActive ? "text-ospoly-gold font-medium" : "text-white hover:text-ospoly-gold"}`}
                            aria-current={linkActive ? "page" : undefined}
                          >
                            {/* Active dot indicator */}
                            {linkActive && (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-ospoly-gold mr-2 mb-0.5 align-middle" aria-hidden />
                            )}
                            {link.text}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Footer links */}
          <div className="border-t border-white/7 py-5 flex flex-wrap gap-6 sm:gap-10">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/45 text-[12.5px] hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:text-white/80"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </header>
  );
}