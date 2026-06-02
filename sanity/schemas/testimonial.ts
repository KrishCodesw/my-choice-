import { defineField, defineType } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Customer Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'role', title: 'Role / Context', type: 'string', description: 'e.g. Homeowner, Andheri or Architect, Bandra' }),
    defineField({ name: 'quote', title: 'Testimonial', type: 'text', rows: 4, validation: R => R.required() }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number', initialValue: 5, validation: R => R.min(1).max(5) }),
    defineField({ name: 'projectPhoto', title: 'Project Proof Photo', type: 'image', options: { hotspot: true }, description: 'Photo of the actual project — proves authenticity' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' }
  }
})
