import { defineField, defineType } from 'sanity'

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: R => R.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 5, validation: R => R.required() }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: [
        { title: '⚡ Electrical', value: 'electrical' },
        { title: '🔧 Hardware', value: 'hardware' },
        { title: '🚿 Sanitary', value: 'sanitary' },
        { title: '🏪 Store / General', value: 'general' },
      ]}
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' }
  }
})
