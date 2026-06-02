import { serverClient } from '@/../sanity/lib/client'
import {
  ALL_PRODUCTS_QUERY,
  ALL_BRANDS_QUERY,
  ALL_WORKERS_QUERY,
  ALL_TESTIMONIALS_QUERY,
  ALL_FAQS_QUERY,
  SITE_SETTINGS_QUERY,
  NEW_ARRIVALS_QUERY,
} from '@/../sanity/lib/queries'

import { HeroSection }        from '@/components/sections/HeroSection'
import { ProductsSection }    from '@/components/sections/ProductsSection'
import { NewArrivalsSection } from '@/components/sections/NewArrivalsSection'
import { TrustSection }       from '@/components/sections/TrustSection'
import { WorkersSection }     from '@/components/sections/WorkersSection'
import { BookingSection }     from '@/components/sections/BookingSection'
import { OwnerSection }       from '@/components/sections/OwnerSection'
import { FaqSection }         from '@/components/sections/FaqSection'
import { FindUsSection }      from '@/components/sections/FindUsSection'

export const revalidate = 60 // ISR — revalidate every 60 seconds

export default async function HomePage() {
  // All data fetched server-side — fast, SEO-friendly, zero client fetching
  const [products, brands, workers, testimonials, faqs, settings, newArrivals] =
    await Promise.all([
      serverClient.fetch(ALL_PRODUCTS_QUERY),
      serverClient.fetch(ALL_BRANDS_QUERY),
      serverClient.fetch(ALL_WORKERS_QUERY),
      serverClient.fetch(ALL_TESTIMONIALS_QUERY),
      serverClient.fetch(ALL_FAQS_QUERY),
      serverClient.fetch(SITE_SETTINGS_QUERY),
      serverClient.fetch(NEW_ARRIVALS_QUERY),
    ])

  return (
    <>
      <HeroSection settings={settings} />
      <ProductsSection products={products} />
      <NewArrivalsSection arrivals={newArrivals} />
      <TrustSection testimonials={testimonials} brands={brands} settings={settings} />
      <WorkersSection workers={workers} />
      <BookingSection />
      <OwnerSection settings={settings} />
      <FaqSection faqs={faqs} />
      <FindUsSection settings={settings} />
    </>
  )
}
