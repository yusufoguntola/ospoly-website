import { defineField, defineType } from 'sanity'

export const faculty = defineType({
  name: 'faculty',
  title: 'Faculty / Department',
  type: 'document',
  fields: [
    defineField({
      name: 'facultyName',
      title: 'Faculty Name',
      type: 'string',
      description: "e.g. 'Faculty of Engineering'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'facultyName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      description: 'Overview of the faculty',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deanName',
      title: 'Dean / Head Name',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Used as faculty card thumbnail',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
    { title: 'Name A–Z', name: 'nameAsc', by: [{ field: 'facultyName', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'facultyName', media: 'featuredImage', subtitle: 'deanName' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? `Dean: ${subtitle}` : undefined }
    },
  },
})