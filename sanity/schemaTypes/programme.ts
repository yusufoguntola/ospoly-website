import { defineField, defineType } from "sanity";

export const programme = defineType({
  name: "programme",
  title: "Academic Programme",
  type: "document",
  fields: [
    defineField({
      name: "programmeName",
      title: "Programme Name",
      type: "string",
      description: "e.g. 'Computational Science'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "programmeName", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "OND", value: "ond" },
          { title: "HND", value: "hnd" },
          { title: "Bachelor", value: "bachelor" },
          { title: "Master", value: "master" },
          { title: "Certificate", value: "certificate" },
        ],
        layout: "grid", // or 'tags' or default dropdown
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "faculty",
      title: "Faculty",
      type: "reference",
      to: [{ type: "faculty" }],
      description: "The faculty this programme belongs to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "Programme icon shown in portal cards",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      description: "Programme overview; shown on card expand and detail page",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. '4 Years'",
    }),
    defineField({
      name: "entryRequirements",
      title: "Entry Requirements",
      type: "array",
      description: "Used on admission pages",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "accreditation",
      title: "Accreditation",
      type: "string",
      description: "e.g. 'NBTE Accredited'",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      description: "Optional; used on Programmes listing page",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Suspended", value: "suspended" },
        ],
        layout: "radio",
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "programmeName", direction: "asc" }],
    },
    {
      title: "Level",
      name: "levelAsc",
      by: [{ field: "level", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "programmeName",
      faculty: "faculty.facultyName",
      level: "level",
      media: "featuredImage",
      status: "status",
    },
    prepare({ title, faculty, level, media, status }) {
      const levelText = Array.isArray(level)
        ? level.map((l) => l.toUpperCase()).join(", ")
        : level?.toUpperCase();

      return {
        title,
        subtitle: `${levelText} · ${faculty ?? "No faculty"} · ${status}`,
        media,
      };
    },
  },
});
