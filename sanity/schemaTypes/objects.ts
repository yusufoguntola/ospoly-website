import { defineField, defineType } from 'sanity'

export const footerContent = defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'object',

  fields: [
    // ─── LEFT LINKS ─────────────────────────────
    defineField({
      name: 'leftLinks',
      title: 'First Column Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ─── RIGHT LINKS ────────────────────────────
    defineField({
      name: 'rightLinks',
      title: 'Second Column Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ─── ADDRESS ────────────────────────────────
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'lines',
          title: 'Address Lines',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),

    // ─── CONTACT ────────────────────────────────
    defineField({
      name: 'contact',
      title: 'Contact Info',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          type: 'string',
        }),
        defineField({
          name: 'email',
          type: 'string',
        }),
      ],
    }),
  ],
})