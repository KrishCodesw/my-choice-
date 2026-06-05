import { groq } from 'next-sanity'

// ─── Products ─────────────────────────────────────────────────
export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id, name, slug, sector, category, spec, isNew, isFeatured,
    image { asset->{ _id, url } },
    brand->{ _id, name, logo { asset->{ _id, url } } }
  }
`

export const PRODUCTS_BY_SECTOR_QUERY = groq`
  *[_type == "product" && sector == $sector] | order(isFeatured desc, _createdAt desc) {
    _id, name, slug, sector, category, spec, isNew, isFeatured,
    image { asset->{ _id, url } },
    brand->{ _id, name, logo { asset->{ _id, url } } }
  }
`

export const FEATURED_PRODUCTS_QUERY = groq`
  *[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...8] {
    _id, name, slug, sector, category, spec, isNew,
    image { asset->{ _id, url } },
    brand->{ _id, name }
  }
`

export const NEW_ARRIVALS_QUERY = groq`
  *[_type == "product" && isNew == true] | order(_createdAt desc) [0...6] {
    _id, name, slug, sector, category, spec,
    image { asset->{ _id, url } },
    brand->{ _id, name }
  }
`

// ─── Brands ───────────────────────────────────────────────────
export const ALL_BRANDS_QUERY = groq`
  *[_type == "brand"] | order(order asc) {
    _id, name, sector, tagline,
    logo { asset->{ _id, url } }
  }
`

// ─── Workers ──────────────────────────────────────────────────
export const ALL_WORKERS_QUERY = groq`
  *[_type == "worker" && isActive == true] | order(rating desc) {
    _id, name, specialty, experience, rating, bio,
    photo { asset->{ _id, url } }
  }
`

// ─── Testimonials ─────────────────────────────────────────────
export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id, name, role, quote, rating,
    projectPhoto { asset->{ _id, url } }
  }
`

// ─── FAQs ─────────────────────────────────────────────────────
export const ALL_FAQS_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id, question, answer, category
  }
`

// ─── Site Settings ────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    storeName, tagline, address, phone, whatsapp, email,
    instagramHandle, googleMapsUrl,
    mondayToSaturday, sunday,
    stats { yearsInBusiness, brandsStocked, projectsSupplied },
    ownerName, ownerBio, ownerTitle,
    ownerPhoto { asset->{ _id, url } }
  }
`

// ─── Jobs ─────────────────────────────────────────────────────
export const ALL_JOBS_QUERY = groq`
  *[_type == "job"] | order(_createdAt desc) {
    _id, _createdAt,
    customerName, customerPhone, customerArea,
    jobType, description, preferredDate,
    scheduledDate, scheduledTime,
    status, ownerNotes, rating, ratingNote,
    requestedAt, completedAt,
    assignedWorker->{ _id, name, specialty, phone, rating }
  }
`

export const PENDING_JOBS_QUERY = groq`
  *[_type == "job" && status == "pending"] | order(_createdAt desc) {
    _id, _createdAt,
    customerName, customerPhone, customerArea,
    jobType, description, preferredDate, status
  }
`

export const JOB_BY_ID_QUERY = groq`
  *[_type == "job" && _id == $id][0] {
    _id, _createdAt,
    customerName, customerPhone, customerArea,
    jobType, description, preferredDate,
    scheduledDate, scheduledTime,
    status, ownerNotes, rating, ratingNote,
    requestedAt, completedAt,
    assignedWorker->{ _id, name, specialty, phone, rating }
  }
`
