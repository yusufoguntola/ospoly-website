import { defineField, defineType } from 'sanity'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(150),
    }),

    // ✅ CATEGORY (Updated)
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Events', value: 'events' },
          { title: 'Blog', value: 'blog' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    // ✅ INTERNAL SLUG (ONLY for events & blog)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      hidden: ({ document }) => document?.category === 'news',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.category !== 'news' && !value) {
            return 'Slug is required for blog/events'
          }
          return true
        }),
    }),

    // ✅ EXTERNAL LINK (ONLY for news)
    defineField({
      name: 'externalLink',
      title: 'External News Link',
      type: 'url',
      hidden: ({ document }) => document?.category !== 'news',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.category === 'news' && !value) {
            return 'External link is required for news'
          }
          return true
        }),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),

    // ✅ BODY (ONLY for blog & events)
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
      hidden: ({ document }) => document?.category === 'news',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.category !== 'news' && !value) {
            return 'Body is required for blog/events'
          }
          return true
        }),
    }),

    defineField({
  name: 'tags',
  title: 'Tags',
  type: 'array',
  of: [{ type: 'string' }],
  options: { layout: 'tags' },
  description: 'For filtering and grouping content',
}),

    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
  ],
})