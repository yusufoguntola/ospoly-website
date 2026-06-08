import { defineField, defineType } from 'sanity'

export const keyStatistic = defineType({
  name: 'keyStatistic',
  title: 'Home Statistic',
  type: 'document',
  fields: [
    defineField({
      name: 'statValue',
      title: 'Stat Value',
      type: 'string',
      description: "e.g. '10,000+' — include symbol",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: "e.g. 'Student Population'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Controls display order',
      validation: (Rule) => Rule.required().integer(),
    }),
    // defineField({
    //   name: 'page',
    //   title: 'Page',
    //   type: 'string',
    //   description: 'Where this stat appears',
    //   options: {
    //     list: [
    //       { title: 'Home', value: 'home' },
    //       { title: 'About', value: 'about' },
    //       { title: 'Both', value: 'both' },
    //     ],
    //     layout: 'radio',
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'statValue', subtitle: 'label' },
  },
})