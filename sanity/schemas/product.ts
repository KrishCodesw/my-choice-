import { defineField, defineType } from 'sanity'

export const productSchema = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string', validation: R => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() }),
    defineField({
      name: 'brand', title: 'Brand', type: 'reference', to: [{ type: 'brand' }], validation: R => R.required()
    }),
    defineField({
      name: 'sector', title: 'Sector', type: 'string',
      options: { list: [
        { title: '⚡ Electrical', value: 'electrical' },
        { title: '🔧 Hardware', value: 'hardware' },
        { title: '🚿 Sanitary Ware', value: 'sanitary' },
      ]}, validation: R => R.required()
    }),
    defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. Switches, MCBs, Faucets, Hinges' }),
    defineField({ name: 'spec', title: 'Short Spec / Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isNew', title: 'New Arrival?', type: 'boolean', initialValue: false }),
    defineField({ name: 'isFeatured', title: 'Featured / Top Product?', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'brand.name', media: 'image' }
  }
})
