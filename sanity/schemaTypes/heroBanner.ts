import { defineField, defineType } from 'sanity'

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Min 1440×600px, JPG/PNG, max 2MB',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Displayed as H1 over the image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Displayed below the title',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Dark gradient opacity (0–100). Default: 40',
      initialValue: 40,
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
  preview: {
    select: { title: 'pageTitle', media: 'backgroundImage' },
  },
})