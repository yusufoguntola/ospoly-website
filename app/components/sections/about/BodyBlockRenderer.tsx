"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import RectorQuote from "./RectorQuote";
import type { SanityPortableTextContent } from "@/sanity/lib/sanity.types";

// ─── Types ───────────────────────────────────────────────

interface SanityImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface RichTextBlockType {
  _type: "richTextBlock";
  _key: string;
  content: SanityPortableTextContent[];
}

interface ImageBlockType {
  _type: "imageBlock";
  _key: string;
  image: SanityImage;
}

interface PullQuoteBlock {
  _type: "pullQuoteBlock";
  _key: string;
  quote: string;
  attribution?: string;
}

interface StatGridBlockType {
  _type: "statGridBlock";
  _key: string;
  stats: { value: string; label: string }[];
}

interface StaffMember {
  _id: string;
  fullName: string;
  titleRole: string;
  category: string;
  photo?: SanityImage;
}

interface StaffGridBlockType {
  _type: "staffGridBlock";
  _key: string;
  heading?: string;
  staff: StaffMember[];
}

type BodyBlock =
  | RichTextBlockType
  | ImageBlockType
  | PullQuoteBlock
  | StatGridBlockType
  | StaffGridBlockType;

// ─── PortableText Custom Components (PRECISION CONTROL) ───

const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="font-display text-3xl font-bold text-ospoly-navy mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-display text-2xl font-bold text-ospoly-navy mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-display text-xl font-bold text-ospoly-navy mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-[1.9] mb-4 text-[15px]">
        {children}
      </p>
    ),
  }, list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="space-y-1 mb-4">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="items-start gap-2  leading-relaxed list-item">
        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" />
        {children}
      </li>
    ),
  },
};

// ─── Rich Text Block ──────────────────────────────────────

function RichTextBlock({ content }: { content: SanityPortableTextContent[] }) {
  return (
    <div
      className="
        prose max-w-3xl

        /* Base text */
        text-gray-700

        /* Headings */
        prose-headings:font-display
        prose-headings:text-ospoly-navy
        prose-headings:font-bold

        /* Paragraph spacing */
        prose-p:mb-4

        /* Strong text */
        prose-strong:text-ospoly-navy
        prose-strong:font-semibold

        /* Links */
        prose-a:text-ospoly-gold
        prose-a:no-underline
        hover:prose-a:underline

        /* Lists */
        prose-li:marker:text-ospoly-gold
      "
    >
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
}

// ─── Image Block ──────────────────────────────────────────

function ImageBlock({ image }: { image: SanityImage }) {
  return (
    <figure className="my-6 max-w-2xl">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-ospoly-pale">
        <Image
          src={image.url}
          alt={image.alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-2 text-xs text-gray-400 text-center">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Stat Grid Block ──────────────────────────────────────

function StatGridBlock({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden my-8 max-w-2xl">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.07 }}
          className="bg-white px-6 py-7 flex flex-col items-center text-center"
        >
          <p className="font-display font-bold text-ospoly-navy text-2xl sm:text-3xl leading-none">
            {stat.value}
          </p>
          <p className="text-gray-500 text-xs mt-2 leading-snug max-w-28">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Staff Grid Block ─────────────────────────────────────

function StaffCard({ member, index }: { member: StaffMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.1 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-10 border-b border-gray-100 last:border-0"
    >
      {/* Text */}
      <div className="flex-1 min-w-0 order-2 sm:order-1">
        <p className="text-sm font-bold">{member.fullName}</p>
        <p className="text-gray-400 text-xs mt-0.5">
          {member.titleRole}
        </p>
      </div>

      {/* Image */}
      <div className="order-1 sm:order-2 shrink-0">
        <div className="relative w-32.5 h-38.75 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-ospoly-pale">
          {member.photo?.url ? (
            <Image
              src={member.photo.url}
              alt={member.photo.alt ?? member.fullName}
              fill
              className="object-cover object-top"
              sizes="130px"
            />
          ) : (
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

function StaffGridBlock({ heading, staff }: { heading?: string; staff: StaffMember[] }) {
  return (
    <div className="my-8">
      {heading && (
        <h3 className="font-display font-bold text-ospoly-navy text-lg mb-6">
          {heading}
        </h3>
      )}
      {staff.map((member, i) => (
        <StaffCard key={member._id} member={member} index={i} />
      ))}
    </div>
  );
}

// ─── Main Renderer ───────────────────────────────────────

export default function BodyBlockRenderer({ blocks }: { blocks: BodyBlock[] }) {
  if (!blocks?.length) return null;

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        switch (block._type) {
          case "richTextBlock":
            return <RichTextBlock key={block._key} content={block.content} />;

          case "imageBlock":
            return <ImageBlock key={block._key} image={block.image} />;

          case "pullQuoteBlock":
            const [name = "", ...rest] = (block.attribution ?? "").split(",");
            const attrTitle = rest.join(",").trim();

            return (
              <RectorQuote
                key={block._key}
                quote={block.quote}
                name={name.trim()}
                title={attrTitle || "OSPOLY"}
              />
            );

          case "statGridBlock":
            return <StatGridBlock key={block._key} stats={block.stats} />;

          case "staffGridBlock":
            return (
              <StaffGridBlock
                key={block._key}
                heading={block.heading}
                staff={block.staff}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}