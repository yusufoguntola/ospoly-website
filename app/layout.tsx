import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ospoly.edu.ng"), // 🔥 change this

  title: {
    default: "Osun State Polytechnic, Iree",
    template: "%s | Osun State Polytechnic, Iree",
  },

  description:
    "Official website of Osun State Polytechnic, Iree. Explore admissions, courses, news, and campus life.",

  keywords: [
    "Osun State Polytechnic",
    "Iree Polytechnic",
    "OSPOLY",
    "Polytechnic in Nigeria",
    "Osun State School",
  ],

  authors: [{ name: "Osun State Polytechnic" }],
  creator: "Osun State Polytechnic",

  openGraph: {
    title: "Osun State Polytechnic, Iree",
    description:
      "Official website of Osun State Polytechnic, Iree. Explore admissions, courses, news, and campus life.",
    url: "https://ospoly.edu.ng", // 🔥 change this
    siteName: "Osun State Polytechnic",
    images: [
      {
        url: "/og-image.jpg", // 🔥 add this image in /public
        width: 1200,
        height: 630,
        alt: "Osun State Polytechnic",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Osun State Polytechnic, Iree",
    description:
      "Official website of Osun State Polytechnic, Iree.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <SanityLive />
      </body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            name: "Osun State Polytechnic, Iree",
            url: "https://ospoly.edu.ng",
            logo: "https://ospoly.edu.ng/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Iree Town",
              addressLocality: "Iree",
              addressRegion: "Osun State",
              addressCountry: "NG",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+234-XXX-XXX-XXXX",
              contactType: "customer service",
            },
          }),
        }}
      />
    </html>
  );
}
