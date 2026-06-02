import { defineField, defineType } from 'sanity'

export const brandSchema = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Brand Name', type: 'string', validation: R => R.required() }),
    defineField({
      name: 'sector', title: 'Sector', type: 'string',
      options: { list: [
        { title: '⚡ Electrical', value: 'electrical' },
        { title: '🔧 Hardware', value: 'hardware' },
        { title: '🚿 Sanitary Ware', value: 'sanitary' },
        { title: 'Multiple', value: 'multiple' },
      ]}
    }),
    defineField({ name: 'tagline', title: 'Why we stock this brand', type: 'string' }),
    defineField({ name: 'logo', title: 'Brand Logo', type: 'image' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 99 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'sector', media: 'logo' }
  }
})
