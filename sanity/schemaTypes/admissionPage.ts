import { defineField, defineType } from 'sanity'

export const admissionPage = defineType({
  name: 'admissionPage',
  title: 'Admission Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: "e.g. 'Undergraduate Admissions'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'admissionType',
      title: 'Admission Type',
      type: 'string',
      description: 'Identifies which admission page this is',
      options: {
        list: [
          { title: 'Undergraduate', value: 'undergraduate' },
          { title: 'Postgraduate', value: 'postgraduate' },
          { title: 'Distance Learning', value: 'distance-learning' },
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
      name: 'introText',
      title: 'Intro Text',
      type: 'array',
      description: 'Overview paragraph(s)',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      description: 'Eligibility, documents, entry requirements',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'howToApply',
      title: 'How to Apply',
      type: 'array',
      description: 'Step-by-step application instructions',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'keyDates',
      title: 'Key Dates',
      type: 'array',
      description: 'e.g. Application Open, Closing Date',
      of: [
        {
          type: 'object',
          name: 'keyDate',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: "e.g. 'Application Open'",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'date',
              title: 'Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'date' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: "e.g. 'Apply Now'",
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'pageTitle', type: 'admissionType' },
    prepare({ title, type }) {
      return { title, subtitle: type }
    },
  },
})