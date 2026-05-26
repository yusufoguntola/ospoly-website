// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";

// export interface SidebarNavItem {
//   label: string;
//   href: string;
// }

// interface SidebarNavProps {
//   items: SidebarNavItem[];
// }

// export default function SidebarNav({ items }: SidebarNavProps) {
//   const pathname = usePathname();

//   return (
//     <nav aria-label="Section navigation" className="">
//       <ul className="space-y-1">
//         {items.map((item) => {
//           const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
//           return (
//             <li key={item.href} className="relative">
//               {isActive && (
//                 <motion.div
//                   layoutId="sidebar-active-indicator"
//                   className="absolute left-0 top-0 bottom-0 w-0.5 bg-ospoly-gold rounded-full"
//                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                 />
//               )}
//               <Link
//                 href={item.href}
//                 className={`
//                   block pl-4 pr-3 py-2.5 text-sm rounded-r-lg transition-all
//                   ${
//                     isActive
//                       ? "text-ospoly-gold font-semibold bg-ospoly-pale/60 border-l border-ospoly-deep"
//                       : "text-gray-500 hover:text-ospoly-navy hover:bg-gray-50 font-normal hover:border-l-2 hover:border-ospoly-deep"
//                   }
//                 `}
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 {item.label}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export interface SidebarNavItem {
  label: string;
  href: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export default function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Section navigation">
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href} className="relative">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Link
                href={item.href}
                className={`
                  block pl-4 pr-3 py-2.5 text-sm rounded-r-lg transition-all
                  ${
                    isActive
                      ? "text-ospoly-deep font-semibold border-l-2 border-ospoly-deep"
                      : "text-gray-500 hover:text-ospoly-navy hover:bg-gray-50 font-normal hover:border-l-2 hover:border-ospoly-deep"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}