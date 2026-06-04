import { serverClient } from "@/../sanity/lib/client";
import {
  ALL_PRODUCTS_QUERY,
  ALL_BRANDS_QUERY,
  ALL_WORKERS_QUERY,
  ALL_TESTIMONIALS_QUERY,
  ALL_FAQS_QUERY,
  SITE_SETTINGS_QUERY,
  NEW_ARRIVALS_QUERY,
} from "@/../sanity/lib/queries";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { NewArrivalsSection } from "@/components/sections/NewArrivalsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { WorkersSection } from "@/components/sections/WorkersSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { OwnerSection } from "@/components/sections/OwnerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FindUsSection } from "@/components/sections/FindUsSection";

export const revalidate = 60; // ISR — revalidate every 60 seconds

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
    ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "MyChoice Electric & Hardware",
            image: "https://mychoiceindia.vercel.app/showroom2.jpg",
            description:
              "Mumbai's premier showroom for luxury electrical, hardware, and sanitary systems. Authorized dealer for Jaquar, Havells, Kohler, and Hettich.",
            address: {
              "@type": "PostalAddress",
              streetAddress: settings?.address ?? "Andheri",
              addressLocality: "Mumbai",
              addressRegion: "MH",
              postalCode: "400099",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "19.0760",
              longitude: "72.8777",
            },
            url: "https://mychoiceindia.vercel.app/",
            telephone: settings?.phone ?? "+91 99206 70029",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "21:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "09:00",
                closes: "15:00",
              },
            ],
            sameAs: [
              `https://instagram.com/${settings?.instagramHandle ?? ""}`,
              "https://mychoiceindia.vercel.app/",
            ],
          }),
        }}
      />
      <HeroSection settings={settings} />
      <NewArrivalsSection arrivals={newArrivals} />
      <ProductsSection products={products} />
      <TrustSection
        testimonials={testimonials}
        brands={brands}
        settings={settings}
      />
      <WorkersSection workers={workers} />
      <BookingSection />
      <OwnerSection settings={settings} />
      <FaqSection faqs={faqs} />
      <FindUsSection settings={settings} />
    </>
  );
}
