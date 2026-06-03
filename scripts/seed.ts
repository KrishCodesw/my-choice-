import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

const log  = (msg: string) => console.log(`  ✓ ${msg}`)
const warn = (msg: string) => console.warn(`  ⚠ ${msg}`)

async function deleteExisting(type: string) {
  const docs = await client.fetch(`*[_type == "${type}"]{ _id }`)
  if (docs.length === 0) return
  const tx = client.transaction()
  docs.forEach((d: { _id: string }) => tx.delete(d._id))
  await tx.commit()
  warn(`Cleared existing "${type}" docs`)
}


async function uploadImageFromUrl(url: string, filename: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`)
    
    const buffer = Buffer.from(await response.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, { filename })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    warn(`Could not upload image for ${filename}. Proceeding without image.`)
    return undefined
  }
}

// ─── SITE SETTINGS ────────────────────────────────────────────
async function seedSiteSettings() {
  await deleteExisting('siteSettings')
  await client.createOrReplace({
    _id:   'siteSettings',
    _type: 'siteSettings',
    storeName:        'MyChoice',
    tagline:          "Mumbai's Exclusive Electric, Hardware & Sanitary Ware Showroom",
    address:          'Shop No. XX, [Your Street]\n[Your Area], Mumbai — 400 0XX',
    phone:            '+91 XXXXX XXXXX',
    whatsapp:         '91XXXXXXXXXX',
    email:            'hello@mychoice.in',
    instagramHandle:  'mychoice.mumbai',
    mondayToSaturday: '10:00 AM – 8:00 PM',
    sunday:           '11:00 AM – 6:00 PM',
    stats: {
      yearsInBusiness:  '15+',
      brandsStocked:    '50+',
      projectsSupplied: '500+',
    },
    ownerName:  'Owner Name',
    ownerTitle: 'Founder · MyChoice Electric & Hardware',
    ownerBio:   "With over 15 years of experience in electrical, hardware and sanitary ware, MyChoice was built on one principle — deep product knowledge and honest guidance. Whether you're a homeowner doing your first renovation or a contractor sourcing for 50 sites, you'll get the same attention.",
  })
  log('Site Settings')
}

// ─── BRANDS ───────────────────────────────────────────────────
const brandsData = [
  { name: 'Havells',   sector: 'electrical', tagline: 'ISI certified, 20-year warranty',        order: 1  },
  { name: 'Anchor',    sector: 'electrical', tagline: 'Trusted modular switches & wiring',       order: 2  },
  { name: 'Legrand',   sector: 'electrical', tagline: 'Premium French engineering',              order: 3  },
  { name: 'Finolex',   sector: 'electrical', tagline: 'ISI mark copper conductors',              order: 4  },
  { name: 'Schneider', sector: 'electrical', tagline: 'Global leader in energy management',      order: 5  },
  { name: 'Jaquar',    sector: 'sanitary',   tagline: "India's finest bath fittings",            order: 6  },
  { name: 'Kohler',    sector: 'sanitary',   tagline: 'Luxury sanitaryware',                     order: 7  },
  { name: 'Hindware',  sector: 'sanitary',   tagline: 'Trusted Indian sanitaryware brand',       order: 8  },
  { name: 'Parryware', sector: 'sanitary',   tagline: 'Quality bath solutions',                  order: 9  },
  { name: 'Hettich',   sector: 'hardware',   tagline: 'Premium German hardware',                 order: 10 },
  { name: 'Dorset',    sector: 'hardware',   tagline: 'Locks, handles & access hardware',        order: 11 },
  { name: 'Hafele',    sector: 'hardware',   tagline: 'Architectural hardware solutions',         order: 12 },
]

async function seedBrands() {
  await deleteExisting('brand')
  const ids: Record<string, string> = {}
  for (const b of brandsData) {
    const doc = await client.create({ _type: 'brand', ...b })
    ids[b.name] = doc._id
  }
  log(`Brands (${brandsData.length})`)
  return ids
}

// ─── PRODUCTS ─────────────────────────────────────────────────
const rawProducts = [
  // ⚡ Electrical
  { name: 'Modular Switch 16A',         brand: 'Havells',   sector: 'electrical', category: 'Switches',         spec: 'ISI certified · 5 year warranty · 4 colour options',                isNew: false, isFeatured: true  },
  { name: 'Roma Switch Plate 6M',       brand: 'Anchor',    sector: 'electrical', category: 'Switches',         spec: 'Modular · Premium white finish · Anti-bacterial surface',            isNew: false, isFeatured: false },
  { name: 'Arteor Socket 6A',           brand: 'Legrand',   sector: 'electrical', category: 'Sockets',          spec: 'Child-safe shutters · Brushed steel finish · 2 pin + earth',        isNew: true,  isFeatured: true  },
  { name: 'Arteor Modular Switches',    brand: 'Legrand',   sector: 'electrical', category: 'Switches',         spec: '4 finishes: white, champagne, graphite, mirror',                    isNew: true,  isFeatured: true  },
  { name: 'MCB 32A Double Pole',        brand: 'Havells',   sector: 'electrical', category: 'MCBs',             spec: 'C-curve · 10kA breaking capacity · DIN rail mount',                 isNew: false, isFeatured: true  },
  { name: 'MCB 6A Single Pole',         brand: 'Schneider', sector: 'electrical', category: 'MCBs',             spec: 'B-curve · 6kA · Ideal for lighting circuits',                       isNew: false, isFeatured: false },
  { name: 'RCCB 40A 30mA',              brand: 'Havells',   sector: 'electrical', category: 'RCCBs',            spec: 'Double pole · Type A · Earth leakage protection',                   isNew: false, isFeatured: false },
  { name: '2.5mm FR Wire 90m',          brand: 'Finolex',   sector: 'electrical', category: 'Wires & Cables',   spec: 'Fire-retardant · ISI mark · 100% copper conductor',                 isNew: false, isFeatured: true  },
  { name: '4mm FR Wire 90m',            brand: 'Finolex',   sector: 'electrical', category: 'Wires & Cables',   spec: 'Fire-retardant · ISI mark · For AC & heavy appliance circuits',     isNew: false, isFeatured: false },
  { name: 'LED Panel 18W',              brand: 'Havells',   sector: 'electrical', category: 'Lighting',         spec: 'Cool white 6500K · Flush mount · 5 year warranty',                  isNew: true,  isFeatured: false },
  // 🔧 Hardware
  { name: 'Soft-Close Hinge Full',      brand: 'Hettich',   sector: 'hardware',   category: 'Hinges',           spec: 'Full overlay · 110° opening · Soft-close · Pair',                   isNew: false, isFeatured: true  },
  { name: 'Soft-Close Hinge Half',      brand: 'Hettich',   sector: 'hardware',   category: 'Hinges',           spec: 'Half overlay · 110° opening · Soft-close · Pair',                   isNew: false, isFeatured: false },
  { name: 'Drawer Channel 450mm',       brand: 'Hettich',   sector: 'hardware',   category: 'Drawer Systems',   spec: 'Full extension · Ball bearing · 30kg load · Pair',                  isNew: false, isFeatured: true  },
  { name: 'Mortise Lock Set',           brand: 'Dorset',    sector: 'hardware',   category: 'Locks',            spec: 'SS 304 · Reversible latch · 3 keys included',                       isNew: false, isFeatured: false },
  { name: 'Main Door Handle SS',        brand: 'Hafele',    sector: 'hardware',   category: 'Handles',          spec: 'SS 304 · Matt finish · 600mm · Heavy duty',                         isNew: true,  isFeatured: false },
  { name: 'Cabinet Handle 160mm',       brand: 'Hettich',   sector: 'hardware',   category: 'Handles',          spec: 'Brushed nickel · Zinc alloy · Pack of 10',                          isNew: false, isFeatured: false },
  { name: 'Concealed Door Closer',      brand: 'Hafele',    sector: 'hardware',   category: 'Door Accessories', spec: 'Adjustable closing speed · Fire rated · Up to 80kg doors',          isNew: true,  isFeatured: true  },
  { name: 'Tower Bolt 8 inch',          brand: 'Dorset',    sector: 'hardware',   category: 'Bolts',            spec: 'Stainless steel · Heavy duty · For main doors & gates',              isNew: false, isFeatured: false },
  // 🚿 Sanitary
  { name: 'Overhead Shower 250mm',      brand: 'Jaquar',    sector: 'sanitary',   category: 'Showers',          spec: 'Chrome finish · Round · Single function · Ceiling mount',            isNew: false, isFeatured: true  },
  { name: 'Basin Mixer Wall Mount',     brand: 'Jaquar',    sector: 'sanitary',   category: 'Faucets',          spec: 'CP finish · Ceramic disc cartridge · ½" inlet · With drain',        isNew: false, isFeatured: true  },
  { name: 'Opal Shower System',         brand: 'Jaquar',    sector: 'sanitary',   category: 'Showers',          spec: 'Overhead + handheld + thermostatic control · Complete set',          isNew: true,  isFeatured: true  },
  { name: 'Vessel Basin 480mm',         brand: 'Kohler',    sector: 'sanitary',   category: 'Basins',           spec: 'Vitreous china · White · Counter-top · 480×380mm',                  isNew: false, isFeatured: false },
  { name: 'Wall-Hung WC',               brand: 'Hindware',  sector: 'sanitary',   category: 'WCs',              spec: 'S-trap · Rimless · White · Soft-close seat included',               isNew: false, isFeatured: true  },
  { name: 'Health Faucet Set',          brand: 'Jaquar',    sector: 'sanitary',   category: 'Accessories',      spec: 'Hand shower + 1.2m braided hose + wall hook · Chrome',              isNew: false, isFeatured: false },
  { name: 'CPVC Pipe 25mm 3m',          brand: 'Hindware',  sector: 'sanitary',   category: 'Pipes',            spec: 'Hot & cold · ISI mark · 25kg/cm² rated',                            isNew: false, isFeatured: false },
  { name: 'Towel Ring SS304',           brand: 'Parryware', sector: 'sanitary',   category: 'Accessories',      spec: 'Wall mount · Matt black finish · Modern design',                    isNew: true,  isFeatured: false },
  { name: 'Kitchen Mixer Single Lever', brand: 'Jaquar',    sector: 'sanitary',   category: 'Faucets',          spec: 'Swivel spout · Chrome · Ceramic cartridge · With shower',           isNew: true,  isFeatured: false },
]

async function seedProducts(brandIds: Record<string, string>) {
  await deleteExisting('product')
  let count = 0
  for (const p of rawProducts) {
    const brandRef = brandIds[p.brand]
    if (!brandRef) { warn(`Brand "${p.brand}" not found — skipping "${p.name}"`); continue }
    const { brand, ...rest } = p
    await client.create({
      _type: 'product',
      ...rest,
      slug: {
        _type: 'slug',
        current: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
      },
      brand: { _type: 'reference', _ref: brandRef },
    })
    count++
  }
  log(`Products (${count})`)
}

// ─── WORKERS ──────────────────────────────────────────────────
const workersData = [
  { name: 'Ramesh Sharma',   specialty: 'electrician', experience: 12, rating: 5, bio: 'Specialist in residential and commercial electrical work. 12+ years in Mumbai.',  isActive: true },
  { name: 'Anil Patil',      specialty: 'plumber',     experience: 8,  rating: 5, bio: 'Expert in sanitary installations, pipe fitting and complete bathroom work.',       isActive: true },
  { name: 'Vijay Carpenter', specialty: 'carpenter',   experience: 10, rating: 4, bio: 'Experienced in doors, modular cabinets and all hardware fitting.',                 isActive: true },
  { name: 'Suresh Kumar',    specialty: 'electrician', experience: 6,  rating: 4, bio: 'Skilled in wiring, panel work and AC installation.',                               isActive: true },
  { name: 'Dinesh Tiler',    specialty: 'tiler',       experience: 9,  rating: 5, bio: 'Expert tiler for floors and bathrooms. Precise work, clean finish.',               isActive: true },
  { name: 'Manoj Plumber',   specialty: 'plumber',     experience: 5,  rating: 4, bio: 'Reliable plumber for kitchen and bathroom fixtures.',                               isActive: true },
]

async function seedWorkers() {
  await deleteExisting('worker')
  for (const w of workersData) {
    await client.create({ _type: 'worker', ...w })
  }
  log(`Workers (${workersData.length})`)
}

// ─── TESTIMONIALS ─────────────────────────────────────────────
const testimonialsData = [
  { name: 'Rahul Mehta',        role: 'Homeowner, Andheri West',  rating: 5, quote: "Sourced all electrical fittings for our 4BHK renovation from MyChoice. The owner personally guided us through every product. Exceptional quality and knowledge — we wouldn't go anywhere else."    },
  { name: 'Priya Kapoor',       role: 'Architect, Bandra',        rating: 5, quote: "As an architect I've tried every hardware store in Mumbai. MyChoice is the only one that stocks what I need — and the Jaquar range here is unmatched. My go-to for every project."               },
  { name: 'Suresh Electricals', role: 'Contractor, Borivali',     rating: 5, quote: "We source all bulk electrical materials from here for every project. Trade pricing, fast availability, and they know their products inside out. Reliable every single time."                     },
  { name: 'Neha Joshi',         role: 'Interior Designer, Juhu',  rating: 5, quote: "The sanitary ware collection is stunning. Found exactly the fittings I needed for a luxury bathroom project. The owner's expertise saved me hours of sourcing time."                            },
  { name: 'Vikram Singh',       role: 'Homeowner, Powai',         rating: 5, quote: "Used the WhatsApp quote system — sent my entire list and got pricing within the hour. So convenient. Products were exactly as described and quality was excellent."                             },
]

async function seedTestimonials() {
  await deleteExisting('testimonial')
  for (const t of testimonialsData) {
    await client.create({ _type: 'testimonial', ...t })
  }
  log(`Testimonials (${testimonialsData.length})`)
}

// ─── FAQs ─────────────────────────────────────────────────────
const faqsData = [
  { order: 1,  category: 'electrical', question: 'What wire size should I use for a 1.5 ton AC?',               answer: "For a 1.5 ton AC (typically 1500W), you need minimum 2.5mm² copper wire. We recommend Havells or Finolex 2.5mm² FR wire. Come to MyChoice and we'll show you the right options."                                         },
  { order: 2,  category: 'electrical', question: 'Which MCB rating is right for my home?',                      answer: "For a standard 2-3BHK, you need a 32A or 40A main MCB with 6A–16A branch MCBs for individual circuits. The exact rating depends on your total load. Walk in and we'll calculate it free."                              },
  { order: 3,  category: 'electrical', question: 'What is the difference between FR and FRLS wire?',            answer: "FR (Fire Retardant) wire self-extinguishes. FRLS (Fire Retardant Low Smoke) also produces minimal smoke — important in enclosed Mumbai flats. We recommend FRLS for residential use. We stock both."                   },
  { order: 4,  category: 'sanitary',   question: 'What is the difference between CP and SS bathroom fittings?', answer: "CP (Chrome Plated) looks great but can tarnish in humid Mumbai conditions. SS (Stainless Steel) is more durable and corrosion-resistant. For long-term use in Mumbai we recommend SS. Visit to compare both."        },
  { order: 5,  category: 'sanitary',   question: 'Wall-mount vs floor-mount faucets — which is better?',       answer: "Wall-mount saves counter space and looks cleaner but needs pipes in the wall — best planned during construction. Floor-mount is easier to retrofit. If doing a full bathroom, wall-mount is worth the extra effort."    },
  { order: 6,  category: 'hardware',   question: 'What hinge should I use for kitchen cabinets?',               answer: "Concealed soft-close hinges (Hettich Sensys range) are the gold standard — hidden when closed, silent, built to last decades. The overlay type depends on your cabinet. Bring dimensions and we'll advise."             },
  { order: 7,  category: 'general',    question: 'Do I need to buy from MyChoice to use the Workers Network?',  answer: "No — the Workers Network is open to everyone. Submit a request and we'll assign the right verified professional. All coordination goes through MyChoice so you always have accountability."                             },
  { order: 8,  category: 'general',    question: 'How does the WhatsApp quote system work?',                    answer: "Browse products, add to your Quote List, click 'Get Quote on WhatsApp.' It opens WhatsApp with a pre-filled message. Hit Send — the owner replies with pricing directly. No forms, no waiting."                        },
  { order: 9,  category: 'general',    question: 'Do you offer trade pricing for contractors?',                 answer: "Yes — contractors and architects who source regularly get preferential pricing. Walk in or WhatsApp us mentioning you're a trade buyer and we'll set you up. We work with contractors across Mumbai."                   },
  { order: 10, category: 'general',    question: 'Can I see products before buying?',                           answer: "Absolutely — that's what the showroom is for. We have working displays of switches, sanitary fittings and hardware so you can see, touch and compare. Walk in any day during store hours, no appointment needed."     },
]

async function seedFaqs() {
  await deleteExisting('faq')
  for (const f of faqsData) {
    await client.create({ _type: 'faq', ...f })
  }
  log(`FAQs (${faqsData.length})`)
}

// ─── MAIN ─────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱 Seeding MyChoice Sanity dataset...\n')

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID not set in .env.local')
    process.exit(1)
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌  SANITY_API_WRITE_TOKEN not set in .env.local')
    console.error('    Get it → sanity.io/manage → your project → API → Tokens → Add token (Editor role)')
    process.exit(1)
  }

  try {
    await seedSiteSettings()
    const brandIds = await seedBrands()
    await seedProducts(brandIds)
    await seedWorkers()
    await seedTestimonials()
    await seedFaqs()
    console.log('\n✅ Done! Open localhost:3000 — everything is live.\n')
  } catch (err) {
    console.error('\n❌ Failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

main()