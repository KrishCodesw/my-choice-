import { defineField, defineType } from 'sanity'

export const workerSchema = defineType({
  name: 'worker',
  title: 'Worker',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'specialty', title: 'Specialty', type: 'string',
      options: { list: [
        { title: 'Electrician', value: 'electrician' },
        { title: 'Plumber', value: 'plumber' },
        { title: 'Carpenter', value: 'carpenter' },
        { title: 'Tiler', value: 'tiler' },
        { title: 'General Worker', value: 'general' },
      ]}, validation: R => R.required()
    }),
    defineField({ name: 'experience', title: 'Years of Experience', type: 'number' }),
    defineField({
      name: 'rating', title: 'Rating (1–5)', type: 'number',
      validation: R => R.min(1).max(5)
    }),
    defineField({ name: 'bio', title: 'Short Bio', type: 'text', rows: 2 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isActive', title: 'Active / Listed?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'specialty', media: 'photo' }
  }
})
