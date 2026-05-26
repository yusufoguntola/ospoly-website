import { defineField, defineType } from 'sanity'

export const staffProfile = defineType({
  name: 'staffProfile',
  title: 'Staff / Leadership Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: "e.g. 'Dr. Fatimot Adewumi Alabi'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleRole',
      title: 'Title / Role',
      type: 'string',
      description: "e.g. 'The Rector'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      description: 'Headshot; min 400×400px; JPG/PNG',
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
      name: 'bio',
      title: 'Bio',
      type: 'array',
      description: 'Full biography text',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      description: 'Displayed as a contact link',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls display order on page',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Senior Management', value: 'senior-management' },
          { title: 'Academic', value: 'academic' },
          { title: 'Administrative', value: 'administrative' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
    { title: 'Category', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'titleRole',
      media: 'photo',
      category: 'category',
    },
    prepare({ title, subtitle, media, category }) {
      const categoryLabel: Record<string, string> = {
        'senior-management': '⭐ Senior Mgmt',
        academic: '🎓 Academic',
        administrative: '🗂 Administrative',
      }
      return {
        title,
        subtitle: `${categoryLabel[category] ?? category} · ${subtitle}`,
        media,
      }
    },
  },
})