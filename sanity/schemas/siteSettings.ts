import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'storeName', title: 'Store Name', type: 'string', initialValue: 'MyChoice' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'address', title: 'Full Address', type: 'text', rows: 3 }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (with country code, no +)', type: 'string', description: 'e.g. 919876543210' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'instagramHandle', title: 'Instagram Handle', type: 'string', description: 'Without @' }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({ name: 'mondayToSaturday', title: 'Mon–Sat Hours', type: 'string', initialValue: '10:00 AM – 8:00 PM' }),
    defineField({ name: 'sunday', title: 'Sunday Hours', type: 'string', initialValue: '11:00 AM – 6:00 PM' }),
    defineField({
      name: 'stats', title: 'Statistics', type: 'object',
      fields: [
        defineField({ name: 'yearsInBusiness', title: 'Years in Business', type: 'string', initialValue: '15+' }),
        defineField({ name: 'brandsStocked', title: 'Brands Stocked', type: 'string', initialValue: '50+' }),
        defineField({ name: 'projectsSupplied', title: 'Projects Supplied', type: 'string', initialValue: '500+' }),
      ]
    }),
    defineField({ name: 'ownerName', title: 'Owner Name', type: 'string' }),
    defineField({ name: 'ownerTitle', title: 'Owner Title', type: 'string', initialValue: 'Founder · MyChoice Electric & Hardware' }),
    defineField({ name: 'ownerBio', title: 'Owner Bio', type: 'text', rows: 4 }),
    defineField({ name: 'ownerPhoto', title: 'Owner Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' })
  }
})
