import { defineField, defineType } from 'sanity'

export const newsletterCta = defineType({
  name: 'newsletterCta',
  title: 'Newsletter / CTA Section',
  type: 'document',

  fields: [
    defineField({
      name: 'headingText',
      title: 'Heading Text',
      type: 'string',
      description: "e.g. 'Let's stay in touch!'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      description: 'Supporting tagline',
    }),

    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: "e.g. 'Apply Now'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: true,
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',

      of: [
        {
          type: 'object',
          name: 'socialLink',

          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',

              options: {
                list: [
                  'Facebook',
                  'Twitter',
                  'Instagram',
                  'LinkedIn',
                  'YouTube',
                ],
              },

              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',

              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],

          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'headingText',
    },
  },
})