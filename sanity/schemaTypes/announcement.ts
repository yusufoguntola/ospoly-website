import { defineField, defineType } from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'messageText',
      title: 'Message Text',
      type: 'string',
      description: 'Max 200 characters',
      validation: (Rule) => Rule.required().max(200),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'News' },
          { title: 'Events', value: 'Events' },
          { title: 'Announcements', value: 'Announcements' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link attached to the announcement',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),

    defineField({
      name: 'linkLabel',
      title: 'Link Label',
      type: 'string',
      description: "e.g. 'Visit'",
    }),

    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle to show/hide without deleting',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'expiryDate',
      title: 'Expiry Date',
      type: 'date',
      description: 'Auto-hides after this date',
    }),
  ],

  preview: {
    select: {
      title: 'messageText',
      category: 'category',
      active: 'active',
      expiryDate: 'expiryDate',
    },
    prepare({ title, category, active, expiryDate }) {
      const status = active ? '🟢 Active' : '🔴 Inactive'

      return {
        title,
        subtitle: `${category} · ${status}${
          expiryDate ? ` · Expires ${expiryDate}` : ''
        }`,
      }
    },
  },
})