import { defineField, defineType } from 'sanity'

export const quickLink = defineType({
  name: 'quickLink',
  title: 'Quick Link',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: "e.g. 'Undergraduate Programs'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'SVG or PNG icon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Internal or external link',
      validation: (Rule) =>
        Rule.required().uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls tile order (max 6 visible)',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show / hide this tile',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'label', media: 'icon', active: 'active' },
    prepare({ title, media, active }) {
      return { title, media, subtitle: active ? '🟢 Visible' : '🔴 Hidden' }
    },
  },
})