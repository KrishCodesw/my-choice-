// ─── Sanity Image ─────────────────────────────────────────────
export interface SanityImage {
  asset: { _id: string; url: string }
}

// ─── Brand ────────────────────────────────────────────────────
export interface Brand {
  _id: string
  name: string
  sector: 'electrical' | 'hardware' | 'sanitary' | 'multiple'
  tagline?: string
  logo?: SanityImage
  order?: number
}

// ─── Product ──────────────────────────────────────────────────
export type Sector = 'electrical' | 'hardware' | 'sanitary'

export interface Product {
  _id: string
  name: string
  slug: { current: string }
  brand: Brand
  sector: Sector
  category?: string
  spec?: string
  image?: SanityImage
  isNew?: boolean
  isFeatured?: boolean
}

// ─── Worker ───────────────────────────────────────────────────
export type WorkerSpecialty = 'electrician' | 'plumber' | 'carpenter' | 'tiler' | 'general'

export interface Worker {
  _id: string
  name: string
  specialty: WorkerSpecialty
  experience?: number
  rating?: number
  bio?: string
  photo?: SanityImage
  isActive: boolean
}

// ─── Testimonial ──────────────────────────────────────────────
export interface Testimonial {
  _id: string
  name: string
  role?: string
  quote: string
  rating: number
  projectPhoto?: SanityImage
}

// ─── FAQ ──────────────────────────────────────────────────────
export interface FAQ {
  _id: string
  question: string
  answer: string
  category?: 'electrical' | 'hardware' | 'sanitary' | 'general'
  order?: number
}

// ─── Site Settings ────────────────────────────────────────────
export interface SiteSettings {
  storeName: string
  tagline?: string
  address?: string
  phone?: string
  whatsapp?: string
  email?: string
  instagramHandle?: string
  googleMapsUrl?: string
  mondayToSaturday?: string
  sunday?: string
  stats?: {
    yearsInBusiness: string
    brandsStocked: string
    projectsSupplied: string
  }
  ownerName?: string
  ownerTitle?: string
  ownerBio?: string
  ownerPhoto?: SanityImage
}

// ─── Cart (client-side only, no backend) ─────────────────────
export interface CartItem {
  productId: string
  name: string
  brand: string
  sector: Sector
  image?: string
  qty: number
}

// ─── Job ──────────────────────────────────────────────────────
export type JobStatus = 'pending' | 'assigned' | 'completed' | 'cancelled'
export type JobType   = 'electrical' | 'plumbing' | 'carpentry' | 'tiling' | 'general'

export interface Job {
  _id:           string
  _createdAt:    string
  customerName:  string
  customerPhone: string
  customerArea:  string
  jobType:       JobType
  description?:  string
  preferredDate?: string
  scheduledDate?: string
  scheduledTime?: string
  status:        JobStatus
  ownerNotes?:   string
  rating?:       number
  ratingNote?:   string
  requestedAt?:  string
  completedAt?:  string
  assignedWorker?: {
    _id:       string
    name:      string
    specialty: WorkerSpecialty
    phone?:    string
    rating?:   number
  }
}
