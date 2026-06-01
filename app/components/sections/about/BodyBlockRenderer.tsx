"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import RectorQuote from "./RectorQuote";
import type { SanityPortableTextContent } from "@/sanity/lib/sanity.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SanityImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface RichTextBlock {
  _type: "richTextBlock";
  _key: string;
  content: SanityPortableTextContent[];
}

interface ImageBlock {
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

interface StatGridBlock {
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

interface StaffGridBlock {
  _type: "staffGridBlock";
  _key: string;
  heading?: string;
  staff: StaffMember[];
}

type BodyBlock =
  | RichTextBlock
  | ImageBlock
  | PullQuoteBlock
  | StatGridBlock
  | StaffGridBlock;

// ─── Rich Text ────────────────────────────────────────────────────────────────

function RichTextBlock({ content }: { content: SanityPortableTextContent[] }) {
  return (
    <div className="prose prose-gray max-w-2xl text-[15px] leading-[1.85]
                    prose-headings:font-display prose-headings:text-ospoly-navy
                    prose-a:text-ospoly-gold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-ospoly-navy">
      <PortableText value={content} />
    </div>
  );
}

// ─── Image Block ──────────────────────────────────────────────────────────────

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

// ─── Stat Grid Block ──────────────────────────────────────────────────────────

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

// ─── Staff Grid Block ─────────────────────────────────────────────────────────

function StaffCard({ member, index }: { member: StaffMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.1 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-10 border-b border-gray-100 last:border-0"
    >
     
      {/* Text side */}
      <div className="flex-1 min-w-0 order-2 sm:order-1">
        {/* <h3 className="font-display font-bold text-ospoly-navy text-xl sm:text-2xl mb-1">
          {member.role}
        </h3> */}
        <p className=" text-sm font-bold">{member.fullName}</p>
        <p className="text-gray-400 text-xs mt-0.5">
          {member.titleRole}
        </p>
      </div>

      {/* Portrait */}
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

function StaffGridBlock({ heading, staff }: { heading?: string; staff: StaffMember[] }) {
  return (
    <div className="my-8">
      {heading && (
        <h3 className="font-display font-bold text-ospoly-navy text-lg mb-6">
          {heading}
        </h3>
      )}
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-2xl"> */}
        {staff.map((member, i) => (
          <StaffCard key={member._id} member={member} index={i} />
        ))}
      {/* </div> */}
    </div>
  );
}

// ─── Main Renderer ────────────────────────────────────────────────────────────

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
            // Split attribution into name + title at the first comma
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