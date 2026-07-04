import { defineField, defineType } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',

  fields: [
    defineField({
      name: 'content',
      title: 'Footer Content',
      type: 'footerContent',
    }),
  ],
})