import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageIdentifier',
      title: 'Page Identifier',
      type: 'string',
      description: 'Used to query this specific page in code',
      options: {
        list: [
          { title: 'About OSPOLY', value: 'about-ospoly' },
          { title: 'Vision & Mission', value: 'vision-mission' },
          { title: 'Administration', value: 'administration' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Banner',
      type: 'heroBanner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bodyBlocks',
      title: 'Body Blocks',
      type: 'array',
      description: 'Flexible content blocks for this page',
      of: [
        // Rich Text block
        {
          type: 'object',
          name: 'richTextBlock',
          title: 'Rich Text',
          fields: [
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'content' }, prepare: () => ({ title: '📝 Rich Text Block' }) },
        },
        // Image block
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                defineField({ name: 'caption', title: 'Caption', type: 'string' }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { media: 'image' },
            prepare: ({ media }) => ({ title: '🖼 Image Block', media }),
          },
        },
        // Pull Quote block
        {
          type: 'object',
          name: 'pullQuoteBlock',
          title: 'Pull Quote',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'attribution',
              title: 'Attribution',
              type: 'string',
              description: "e.g. 'The Rector, OSPOLY'",
            }),
          ],
          preview: {
            select: { title: 'quote', subtitle: 'attribution' },
            prepare: ({ title, subtitle }) => ({
              title: `💬 "${title}"`,
              subtitle,
            }),
          },
        },
        // Stat Grid block
        {
          type: 'object',
          name: 'statGridBlock',
          title: 'Stat Grid',
          fields: [
            defineField({
              name: 'stats',
              title: 'Statistics',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'inlineStat',
                  fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                  ],
                  preview: {
                    select: { title: 'value', subtitle: 'label' },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { stats: 'stats' },
            prepare: ({ stats }) => ({ title: `📊 Stat Grid (${stats?.length ?? 0} items)` }),
          },
        },
        // Staff Grid block — references Staff Profiles
        {
          type: 'object',
          name: 'staffGridBlock',
          title: 'Staff Grid',
          fields: [
            defineField({
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
            }),
            defineField({
              name: 'staff',
              title: 'Staff Members',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'staffProfile' }] }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: 'heading', staff: 'staff' },
            prepare: ({ title, staff }) => ({
              title: `👥 Staff Grid: ${title ?? 'Untitled'}`,
              subtitle: `${staff?.length ?? 0} members`,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'pageTitle', identifier: 'pageIdentifier' },
    prepare({ title, identifier }) {
      return { title, subtitle: identifier }
    },
  },
})