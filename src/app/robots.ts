import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Protect the Sanity Studio from crawlers
    },
    sitemap: 'https://mychoice-mumbai.com/sitemap.xml',
  }
}
