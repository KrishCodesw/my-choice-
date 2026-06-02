import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'mychoice',
  title: 'MyChoice Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('MyChoice')
          .items([
            S.listItem().title('🛍️ Products').child(
              S.documentTypeList('product').title('Products')
            ),
            S.listItem().title('🏷️ Brands').child(
              S.documentTypeList('brand').title('Brands')
            ),
            S.listItem().title('👷 Workers').child(
              S.documentTypeList('worker').title('Workers')
            ),
            S.listItem().title('⭐ Testimonials').child(
              S.documentTypeList('testimonial').title('Testimonials')
            ),
            S.listItem().title('❓ FAQs').child(
              S.documentTypeList('faq').title('FAQs')
            ),
            S.listItem().title('🏠 Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')
            ),
          ])
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
