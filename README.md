# MyChoice — Website

> Electric · Hardware · Sanitary Ware · Mumbai

## Tech Stack

| Layer       | Tool              | Cost       |
|-------------|-------------------|------------|
| Framework   | Next.js 14 (App Router) | Free |
| CMS         | Sanity v3         | Free tier  |
| Hosting     | Vercel            | Free tier  |
| WhatsApp    | wa.me links       | Free forever |
| Maps        | Google Maps embed | Free       |
| Domain      | mychoice.in       | ~₹800/year |

**Monthly running cost: ₹0**

---

## Local Setup (Step by Step)

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Sanity project (free)
1. Go to https://sanity.io/manage
2. Click "New project"
3. Name it "mychoice"
4. Copy your **Project ID**

### 3. Set environment variables
Copy `.env.example` to `.env.local` and fill in:
```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX   # your number, no +
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the dev server
```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

### 5. Add content in Studio
Open http://localhost:3000/studio and:
1. Go to **🏠 Site Settings** → fill in store name, address, owner details, WhatsApp number
2. Go to **🏷️ Brands** → add your brands (Havells, Jaquar, Anchor etc.)
3. Go to **🛍️ Products** → add products linked to brands
4. Go to **👷 Workers** → add verified workers
5. Go to **⭐ Testimonials** → add customer reviews
6. Go to **❓ FAQs** → add your questions and answers

---

## Deployment to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, then add env vars in Vercel dashboard:
# vercel.com → your project → Settings → Environment Variables
```

Add the same variables from `.env.local` in the Vercel dashboard.

---

## Project Structure

```
mychoice/
├── sanity/
│   ├── schemas/            ← CMS content types
│   │   ├── product.ts      ← Products (name, brand, sector, spec, image)
│   │   ├── brand.ts        ← Brands (name, logo, tagline)
│   │   ├── worker.ts       ← Workers (name, specialty, rating, photo)
│   │   ├── testimonial.ts  ← Testimonials (quote, proof photo)
│   │   ├── faq.ts          ← FAQs (question, answer, category)
│   │   └── siteSettings.ts ← Store info, owner, hours, stats
│   └── lib/
│       ├── client.ts       ← Sanity client
│       ├── queries.ts      ← All GROQ queries
│       └── image.ts        ← Image URL builder
│
├── src/
│   ├── app/
│   │   ├── (site)/         ← Main website
│   │   │   ├── layout.tsx  ← Nav + Footer + Cart + WhatsApp
│   │   │   └── page.tsx    ← Home page (all data fetched server-side)
│   │   └── studio/         ← Sanity Studio at /studio
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        ← Full-screen hero, animated
│   │   │   ├── ProductsSection.tsx    ← Sector tabs + quote cart
│   │   │   ├── NewArrivalsSection.tsx ← New/featured products
│   │   │   ├── TrustSection.tsx       ← Stats + testimonials + brands
│   │   │   ├── WorkersSection.tsx     ← Worker cards + request form
│   │   │   ├── BookingSection.tsx     ← 1:1 booking → WhatsApp
│   │   │   ├── OwnerSection.tsx       ← Owner photo + bio
│   │   │   ├── FaqSection.tsx         ← Accordion + category filter
│   │   │   └── FindUsSection.tsx      ← Map + contact details
│   │   └── shared/
│   │       ├── CartProvider.tsx       ← Cart state (Context)
│   │       ├── CartDrawer.tsx         ← Slide-out cart → WhatsApp
│   │       ├── WhatsAppButton.tsx     ← Sticky WhatsApp button
│   │       ├── RevealOnScroll.tsx     ← Scroll animation wrapper
│   │       └── SmoothScroll.tsx      ← Lenis smooth scroll
│   │
│   ├── hooks/
│   │   ├── useCart.ts      ← Cart logic + localStorage persistence
│   │   └── useLenis.ts     ← Smooth scroll hook
│   │
│   ├── lib/
│   │   └── utils.ts        ← cn(), WhatsApp URL builders, sector meta
│   │
│   └── types/
│       └── index.ts        ← All TypeScript interfaces
```

---

## WhatsApp Integration

All WhatsApp flows use `wa.me` — completely free, no API needed.

| Feature           | Triggered by           | Message sent          |
|-------------------|------------------------|-----------------------|
| Quote cart        | Cart drawer → "Get Quote" | Full product list with quantities |
| Book 1:1          | Booking form           | Name, date, time, meeting type, requirements |
| Worker request    | Worker form            | Job type, area, date, description |
| General enquiry   | WhatsApp sticky button | Hi MyChoice! |
| Directions        | Find Us section        | Directions request |

---

## Content Management (Owner Guide)

The owner manages everything at **/studio** — no developer needed.

**To add a new product:**
1. Studio → Products → New
2. Fill name, select brand, select sector
3. Add category (e.g. "MCBs", "Faucets")
4. Write short spec
5. Upload image
6. Toggle "New Arrival" or "Top Product" if applicable
7. Publish

**To update store hours / address:**
Studio → Site Settings → edit → Publish

**To add a worker:**
Studio → Workers → New → fill details → Publish

The website automatically updates within 60 seconds (ISR revalidation).

---

## Phase Roadmap

- [x] Phase 1 — Core site (Hero, Products, Trust, Owner, Find Us)
- [x] Phase 2 — Convert (Quote cart, Booking, New Arrivals)  
- [x] Phase 3 — Workers Network
- [ ] Phase 4 — Google Reviews feed
- [ ] Phase 4 — Instagram sync for New Arrivals
- [ ] Phase 4 — SEO brand pages + FAQ pages
