import { defineField, defineType } from 'sanity'

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'document',
  fields: [
    defineField({
      name: 'columnHeading',
      title: 'Column Heading',
      type: 'string',
      description: "e.g. 'Student Programs'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      description: 'Ordered list; supports internal and external links',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls column display order',
      validation: (Rule) => Rule.required().integer(),
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'columnHeading', subtitle: 'sortOrder' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Sort order: ${subtitle}` }
    },
  },
})