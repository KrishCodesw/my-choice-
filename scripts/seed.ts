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
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    const asset  = await client.assets.upload('image', buffer, { filename })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch {
    warn(`Image upload failed for ${filename} — skipping`)
    return undefined
  }
}

// ─────────────────────────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// BRANDS
// Real brands stocked at MyChoice, sector-wise
// ─────────────────────────────────────────────────────────────
const brandsData = [

  // ── ELECTRICAL: Wires & Cables ───────────────────────────
  { name: 'Polycab',      sector: 'electrical', tagline: "India's No.1 wire & cable brand · ISI certified",           order: 1  },
  { name: 'Finolex',      sector: 'electrical', tagline: 'Premium copper conductors · FR & FRLS range',               order: 2  },
  { name: 'Havells',      sector: 'electrical', tagline: 'Trusted electrical brand · Wires, MCBs, Fans & more',       order: 3  },
  { name: 'KEI',          sector: 'electrical', tagline: 'Industrial & residential cables · ISI mark',                order: 4  },

  // ── ELECTRICAL: Switches & Sockets ──────────────────────
  { name: 'Legrand',      sector: 'electrical', tagline: 'Premium French electrical solutions · Arteor & Myrius',     order: 5  },
  { name: 'Roma',         sector: 'electrical', tagline: 'Anchor Roma — value modular switches for every home',       order: 6  },
  { name: 'Kolors',       sector: 'electrical', tagline: 'Stylish modular switches · Wide colour range',              order: 7  },
  { name: 'GM',           sector: 'electrical', tagline: 'Reliable switches & accessories · Budget-friendly',         order: 8  },
  { name: 'Anchor',       sector: 'electrical', tagline: 'Wipro Anchor — modular switches & wiring accessories',      order: 9  },

  // ── ELECTRICAL: MCBs, RCCBs, DBs ────────────────────────
  { name: 'Indoasian',    sector: 'electrical', tagline: 'MCBs, RCCBs & distribution boards · Trusted since 1968',   order: 10 },
  { name: 'Schneider',    sector: 'electrical', tagline: 'Global leader in energy management · Acti9 range',         order: 11 },
  { name: 'L&T',          sector: 'electrical', tagline: 'Heavy-duty MCBs & switchgear · Industrial grade',          order: 12 },
  { name: 'Siemens',      sector: 'electrical', tagline: 'German-engineered MCBs & protection devices',              order: 13 },

  // ── ELECTRICAL: LED Lights ───────────────────────────────
  { name: 'Hirays',       sector: 'electrical', tagline: 'Architectural LEDs & panel lights · Premium range',        order: 14 },
  { name: 'Ledvance',     sector: 'electrical', tagline: 'OSRAM legacy · High-performance LED solutions',            order: 15 },
  { name: 'Philips',      sector: 'electrical', tagline: 'World-trusted LED lighting · Domestic & commercial',       order: 16 },
  { name: 'Syska',        sector: 'electrical', tagline: 'Smart LEDs & smart home lighting · Great value',           order: 17 },

  // ── ELECTRICAL: Fans ─────────────────────────────────────
  { name: 'Orient',       sector: 'electrical', tagline: 'Energy-efficient ceiling fans · BEE 5-star rated',         order: 18 },
  { name: 'Crompton',     sector: 'electrical', tagline: 'Powerful fans · Anti-dust & inverter range',               order: 19 },
  { name: 'Usha',         sector: 'electrical', tagline: 'Premium fans · Designer & decorator collections',          order: 20 },

  // ── SANITARY WARE ────────────────────────────────────────
  { name: 'Jaquar',       sector: 'sanitary',   tagline: "India's finest bath fittings · Premium CP fittings",       order: 21 },
  { name: 'Cera',         sector: 'sanitary',   tagline: 'Complete bathroom solutions · Sanitaryware & faucets',     order: 22 },
  { name: 'Eagle',        sector: 'sanitary',   tagline: 'Durable CP fittings · Best value for money',               order: 23 },
  { name: 'Sanvo',        sector: 'sanitary',   tagline: 'Premium stainless steel & CP bathroom fittings',           order: 24 },
  { name: 'Goldline',     sector: 'sanitary',   tagline: 'Budget-friendly CP fittings · Wide accessory range',       order: 25 },
  { name: 'Kohler',       sector: 'sanitary',   tagline: 'Luxury sanitaryware · International design standards',     order: 26 },
  { name: 'Hindware',     sector: 'sanitary',   tagline: 'India\'s trusted sanitaryware brand · Complete range',     order: 27 },
  { name: 'Parryware',    sector: 'sanitary',   tagline: 'Roca Group · Innovative bath solutions',                   order: 28 },
  { name: 'Grohe',        sector: 'sanitary',   tagline: 'German precision · Premium showers & faucets',             order: 29 },

  // ── HARDWARE ─────────────────────────────────────────────
  { name: 'Hettich',      sector: 'hardware',   tagline: 'German precision furniture hardware · Soft-close systems', order: 30 },
  { name: 'Hafele',       sector: 'hardware',   tagline: 'Architectural hardware solutions · Locks & fittings',      order: 31 },
  { name: 'Dorset',       sector: 'hardware',   tagline: 'Locks, handles & door hardware · Trusted in India',        order: 32 },
  { name: 'Ebco',         sector: 'hardware',   tagline: 'Furniture fittings · Drawer systems & cabinet hardware',   order: 33 },
  { name: 'Godrej',       sector: 'hardware',   tagline: 'Security locks & door hardware · Made in India',           order: 34 },
  { name: 'Yale',         sector: 'hardware',   tagline: 'Smart locks & high-security cylinders · Global brand',     order: 35 },
  { name: 'Ozone',        sector: 'hardware',   tagline: 'Architectural hardware · Handles, hinges & accessories',   order: 36 },
  { name: 'Blum',         sector: 'hardware',   tagline: 'Austrian precision · Lift systems & Tandem drawers',       order: 37 },
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

// ─────────────────────────────────────────────────────────────
// PRODUCTS
// Real product catalogue — brand-wise, category-wise
// ─────────────────────────────────────────────────────────────
const rawProducts = [

  // ════════════════════════════════════════════════════════
  // ⚡ ELECTRICAL — WIRES & CABLES
  // ════════════════════════════════════════════════════════

  // Polycab Wires
  { brand: 'Polycab', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: true,
    name: 'Polycab Flame Shield 1.5mm FR Wire (90m)',
    spec: '1.5mm² · Fire-retardant · ISI IS:694 · 100% electrolytic copper · Ideal for lighting & fan circuits' },

  { brand: 'Polycab', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: true,
    name: 'Polycab Flame Shield 2.5mm FR Wire (90m)',
    spec: '2.5mm² · Fire-retardant · ISI IS:694 · For power points, geysers & ACs up to 1.5 ton' },

  { brand: 'Polycab', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Polycab Flame Shield 4mm FR Wire (90m)',
    spec: '4mm² · Fire-retardant · ISI mark · For 2-ton ACs, high-load circuits & submersible pumps' },

  { brand: 'Polycab', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Polycab Flame Shield 6mm FR Wire (90m)',
    spec: '6mm² · Heavy-duty · ISI mark · For main feeders, large motors & commercial installations' },

  { brand: 'Polycab', sector: 'electrical', category: 'Wires & Cables', isNew: true, isFeatured: true,
    name: 'Polycab FRLS 2.5mm Wire (90m)',
    spec: '2.5mm² · Fire-retardant low smoke · Ideal for residential flats · ISI IS:694 · PVC insulated' },

  { brand: 'Polycab', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Polycab 3 Core Flexible Cable 1.5mm (100m)',
    spec: '3 core · 1.5mm² · PVC sheathed · For appliances, extensions & portable equipment' },

  // Finolex Wires
  { brand: 'Finolex', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: true,
    name: 'Finolex FR 1.5mm Wire (90m)',
    spec: '1.5mm² · Fire-retardant · ISI mark · Silver finish PVC · Ideal for lighting circuits' },

  { brand: 'Finolex', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Finolex FR 2.5mm Wire (90m)',
    spec: '2.5mm² · Fire-retardant · ISI mark · 100% copper · For power outlets & ACs' },

  { brand: 'Finolex', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Finolex FRLS 4mm Wire (90m)',
    spec: '4mm² · FRLS rated · Low smoke emission · For high-load circuits & panel connections' },

  { brand: 'Finolex', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Finolex Coflame 1.5mm ZHFR Wire (90m)',
    spec: '1.5mm² · Zero halogen flame-retardant · Premium safety · Hospitals & public buildings' },

  // Havells Wires
  { brand: 'Havells', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Havells Life Line Plus 1.5mm FRLS Wire (90m)',
    spec: '1.5mm² · FRLS · ISI mark · Red/Blue/Green/Yellow available · For domestic wiring' },

  { brand: 'Havells', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'Havells Life Line Plus 2.5mm FRLS Wire (90m)',
    spec: '2.5mm² · FRLS · ISI mark · High thermal stability · For power circuits' },

  // KEI Wires
  { brand: 'KEI', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'KEI FR 2.5mm House Wire (90m)',
    spec: '2.5mm² · Fire-retardant · ISI IS:694 · Dual-layer insulation · Domestic & commercial' },

  { brand: 'KEI', sector: 'electrical', category: 'Wires & Cables', isNew: false, isFeatured: false,
    name: 'KEI 4 Core Armoured Cable 2.5mm (per metre)',
    spec: '4 core · 2.5mm² · Steel wire armoured · For underground & outdoor applications' },

  // ════════════════════════════════════════════════════════
  // ⚡ ELECTRICAL — SWITCHES & SOCKETS
  // ════════════════════════════════════════════════════════

  // Legrand
  { brand: 'Legrand', sector: 'electrical', category: 'Switches & Sockets', isNew: true, isFeatured: true,
    name: 'Legrand Arteor 6A 1-Way Switch',
    spec: 'Arteor range · White finish · Screwless terminals · Compatible with all plate styles' },

  { brand: 'Legrand', sector: 'electrical', category: 'Switches & Sockets', isNew: true, isFeatured: true,
    name: 'Legrand Arteor 16A 2-Way Switch',
    spec: 'Arteor range · 16A · For fans & heavy points · Available in white, champagne, graphite, mirror' },

  { brand: 'Legrand', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: true,
    name: 'Legrand Arteor 6A 3-Pin Socket',
    spec: 'Arteor · Child-safe shutters · Brass contacts · Matches Arteor switch plate' },

  { brand: 'Legrand', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Legrand Myrius 6A 1-Way Switch (Pack of 10)',
    spec: 'Myrius range · Classic white · Economy modular · ISI marked · Bulk value pack' },

  { brand: 'Legrand', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Legrand Myrius 16A Socket with Shutter',
    spec: 'Myrius · 16A · Safety shutters · Universal socket · For AC & heavy appliances' },

  { brand: 'Legrand', sector: 'electrical', category: 'Switches & Sockets', isNew: true, isFeatured: false,
    name: 'Legrand Arteor 2M USB Charger Socket',
    spec: 'Dual USB-A · 2.1A · 5V · Arteor frame · For bedroom & living room convenience' },

  // Roma (Anchor)
  { brand: 'Roma', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: true,
    name: 'Roma Classic 6A 1-Way Switch',
    spec: 'Roma Classic range · ISI IS:3854 · White · Standard modular · Widely used across India' },

  { brand: 'Roma', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Roma Classic 16A 2-Way Switch',
    spec: 'Roma Classic · 16A · For fans & heavy points · Tough polycarbonate body · ISI mark' },

  { brand: 'Roma', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Roma Classic 6A 3-Pin Socket',
    spec: 'Roma Classic · Standard 6A socket · Brass pin contacts · ISI marked' },

  { brand: 'Roma', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Roma 6M Grid Frame + Cover (White)',
    spec: '6-module grid frame · Roma modular · Flush mounting · Compatible with all Roma modules' },

  // Kolors
  { brand: 'Kolors', sector: 'electrical', category: 'Switches & Sockets', isNew: true, isFeatured: true,
    name: 'Kolors Amore 6A 1-Way Switch (Gold)',
    spec: 'Amore range · Champagne gold finish · Premium look · Screwless · Modular compatible' },

  { brand: 'Kolors', sector: 'electrical', category: 'Switches & Sockets', isNew: true, isFeatured: false,
    name: 'Kolors Amore 16A Switch (Graphite)',
    spec: 'Amore range · Graphite finish · Flat-plate design · Suitable for premium interiors' },

  { brand: 'Kolors', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Kolors 6M Cover Plate (Matt Black)',
    spec: '6-module · Matt black · Premium designer finish · Pairs with all Kolors modules' },

  // GM
  { brand: 'GM', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'GM Octave 6A 1-Way Switch',
    spec: 'Octave range · White · Budget-friendly · ISI mark · Standard modular size' },

  { brand: 'GM', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'GM Casablanca 16A Switch',
    spec: 'Casablanca range · Premium look · White gloss · Modular · For fans & heavy loads' },

  { brand: 'GM', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'GM 6A 5-Pin Socket with Safety Shutter',
    spec: '5-pin · 6A · Child safety shutters · GM standard modular · Widely available' },

  // Anchor
  { brand: 'Anchor', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Anchor Roma 6A Switch (White) — Pack of 20',
    spec: '6A · ISI mark · Economy pack · Widely used in new construction · White finish' },

  { brand: 'Anchor', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Anchor Panasonic Penta 6A Switch',
    spec: 'Penta range · Wipro Anchor · Slim profile · Modular · Easy installation' },

  // Havells Switches
  { brand: 'Havells', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Havells Oro 6A 1-Way Switch',
    spec: 'Oro range · White · Premium polycarbonate · ISI mark · For standard wiring' },

  { brand: 'Havells', sector: 'electrical', category: 'Switches & Sockets', isNew: false, isFeatured: false,
    name: 'Havells Crabtree Athena 16A Switch',
    spec: 'Athena range · Brushed steel finish · Premium design · For luxury interiors' },

  // ════════════════════════════════════════════════════════
  // ⚡ ELECTRICAL — MCBs, RCCBs & DISTRIBUTION BOARDS
  // ════════════════════════════════════════════════════════

  // Legrand MCBs
  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: true,
    name: 'Legrand 6A MCB Single Pole (B-Curve)',
    spec: 'B-curve · 6A · 6kA · For lighting & fan circuits · DX3 range · DIN rail mount' },

  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Legrand 16A MCB Single Pole (C-Curve)',
    spec: 'C-curve · 16A · 6kA · For power sockets & AC circuits · DX3 range · Compact size' },

  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: true,
    name: 'Legrand 32A MCB Double Pole (C-Curve)',
    spec: 'C-curve · 32A · 6kA · For main circuit protection · Double pole · DX3 range' },

  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Legrand 40A RCCB Double Pole (30mA)',
    spec: '40A · 30mA · Type AC · Double pole · Earth leakage protection · DX3 range' },

  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: true, isFeatured: false,
    name: 'Legrand 63A RCCB Double Pole (100mA)',
    spec: '63A · 100mA · Type A · For main DB · DX3 · Protection against fire & shock' },

  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: true,
    name: 'Legrand 8-Way Distribution Board (Surface)',
    spec: '8-way · Surface mounting · IP30 · With busbar · Accepts DX3 MCBs · White ABS enclosure' },

  { brand: 'Legrand', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Legrand 16-Way Distribution Board (Flush)',
    spec: '16-way · Flush mounting · IP40 · Pre-wired busbar · For larger homes & offices' },

  // Indoasian MCBs
  { brand: 'Indoasian', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: true,
    name: 'Indoasian 6A MCB Single Pole (B-Curve)',
    spec: 'B-curve · 6A · 6kA · ISI IS:8828 · Reliable & affordable · For lighting circuits' },

  { brand: 'Indoasian', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Indoasian 16A MCB Single Pole (C-Curve)',
    spec: 'C-curve · 16A · 10kA · ISI mark · For power outlets, geysers & AC circuits' },

  { brand: 'Indoasian', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Indoasian 32A MCB Double Pole',
    spec: '32A · 10kA · Double pole · C-curve · Main circuit breaker · DIN rail compatible' },

  { brand: 'Indoasian', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Indoasian 40A RCCB (30mA)',
    spec: '40A · 30mA · 4-pole · ISI mark · For household earth leakage protection' },

  { brand: 'Indoasian', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Indoasian 8-Way MCB Box (Metal)',
    spec: '8-way · Metal enclosure · Surface/flush · Pre-punched knockouts · Powder coated' },

  { brand: 'Indoasian', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Indoasian 12-Way Distribution Board',
    spec: '12-way · Double door · IP43 · Accepts standard MCBs · For medium-sized homes' },

  // Havells MCBs
  { brand: 'Havells', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Havells 6A MCB (B-Curve) Single Pole',
    spec: 'B-curve · 6A · 10kA · ISI mark · Vendorid range · Trip indicator window' },

  { brand: 'Havells', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Havells 32A RCCB Double Pole (30mA)',
    spec: '32A · 30mA · Type AC · Trip-free mechanism · DIN rail · For bathroom & kitchen' },

  // Schneider MCBs
  { brand: 'Schneider', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Schneider Acti9 16A MCB (C-Curve)',
    spec: 'Acti9 range · 16A · 10kA · C-curve · For commercial & residential applications' },

  { brand: 'Schneider', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Schneider Easy9 8-Way DB (Surface)',
    spec: 'Easy9 range · 8-way · IP30 · Transparent cover · For residential use' },

  // L&T MCBs
  { brand: 'L&T', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'L&T 6A MCB Single Pole (B-Curve)',
    spec: 'B-curve · 6A · 10kA · ISI mark · Robust construction · For industrial & domestic' },

  { brand: 'L&T', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'L&T 100A MCCB 3-Pole',
    spec: '100A · 3-pole · 25kA · Thermal-magnetic trip · For commercial main incomer' },

  // Siemens
  { brand: 'Siemens', sector: 'electrical', category: 'MCBs & Protection', isNew: false, isFeatured: false,
    name: 'Siemens 16A MCB Single Pole (C-Curve)',
    spec: 'Betagard range · 16A · 6kA · German engineering · For quality-conscious installations' },

  // ════════════════════════════════════════════════════════
  // ⚡ ELECTRICAL — LED LIGHTS
  // ════════════════════════════════════════════════════════

  // Hirays
  { brand: 'Hirays', sector: 'electrical', category: 'LED Lights', isNew: true, isFeatured: true,
    name: 'Hirays 18W LED Panel Light (Neutral White)',
    spec: '18W · 4000K neutral white · 1600 lm · 300×300mm · Recessed · 3-year warranty · Flicker-free' },

  { brand: 'Hirays', sector: 'electrical', category: 'LED Lights', isNew: true, isFeatured: true,
    name: 'Hirays 24W LED Panel Light (Cool White)',
    spec: '24W · 6500K cool white · 2200 lm · 300×600mm · For offices & showrooms' },

  { brand: 'Hirays', sector: 'electrical', category: 'LED Lights', isNew: true, isFeatured: false,
    name: 'Hirays 9W LED Downlight (Warm White)',
    spec: '9W · 3000K warm white · 700 lm · 90mm cut-out · Recessed · For living rooms & bedrooms' },

  { brand: 'Hirays', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Hirays 12W LED Downlight Round (Cool White)',
    spec: '12W · 6500K · 1000 lm · 100mm cut-out · Die-cast aluminium · IP44 bathroom rated' },

  { brand: 'Hirays', sector: 'electrical', category: 'LED Lights', isNew: true, isFeatured: true,
    name: 'Hirays COB Track Light 20W (Black)',
    spec: '20W COB · 4000K · Adjustable beam · Surface track system · For retail & accent lighting' },

  { brand: 'Hirays', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Hirays 36W LED Batten 4ft (Daylight)',
    spec: '36W · 6500K · 3200 lm · 4ft batten · Surface mount · Parking & utility areas' },

  // Ledvance
  { brand: 'Ledvance', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: true,
    name: 'Ledvance 9W LED Bulb (Warm White) — Pack of 10',
    spec: '9W · E27 · 3000K · 810 lm · 15,000 hrs life · 220-240V · OSRAM technology' },

  { brand: 'Ledvance', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Ledvance 18W LED Panel (600×600)',
    spec: '18W · 4000K · 1800 lm · 600×600mm · Surface/recessed · For offices · Uniform light' },

  { brand: 'Ledvance', sector: 'electrical', category: 'LED Lights', isNew: true, isFeatured: false,
    name: 'Ledvance 15W LED Spotlight PAR38',
    spec: '15W · E27 · 4000K · 36° beam · For accent & display lighting · OSRAM tech' },

  { brand: 'Ledvance', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Ledvance LED Street Light 50W',
    spec: '50W · 5700K · IP65 · For societies, parking & outdoor areas · 50,000 hrs life' },

  // Philips
  { brand: 'Philips', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Philips 9W LED Bulb Stellar Bright (Cool White)',
    spec: '9W · E27 · 6500K · 950 lm · Anti-glare · Widely used in Indian homes' },

  { brand: 'Philips', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Philips 14W LED Panel (225×225mm)',
    spec: '14W · 4000K · 1400 lm · Square flush · For kitchens & utility rooms' },

  { brand: 'Philips', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Philips 22W LED Circular Batten',
    spec: '22W · 3000K warm · 2100 lm · Round surface · For bedrooms & living rooms' },

  // Syska
  { brand: 'Syska', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Syska 12W LED Downlight',
    spec: '12W · 6500K · 1200 lm · Round recessed · 120mm cut-out · Budget-friendly' },

  { brand: 'Syska', sector: 'electrical', category: 'LED Lights', isNew: false, isFeatured: false,
    name: 'Syska 9W LED Candle Bulb (Warm White)',
    spec: '9W · E14 · 3000K · For chandeliers & decorative fixtures · Pack of 4' },

  // ════════════════════════════════════════════════════════
  // ⚡ ELECTRICAL — FANS
  // ════════════════════════════════════════════════════════

  { brand: 'Orient', sector: 'electrical', category: 'Ceiling Fans', isNew: false, isFeatured: true,
    name: 'Orient Aeroslim BLDC 1200mm (White)',
    spec: 'BLDC motor · 1200mm · 5-star BEE rated · 28W · Remote control · IoT ready · Anti-dust' },

  { brand: 'Orient', sector: 'electrical', category: 'Ceiling Fans', isNew: false, isFeatured: false,
    name: 'Orient Electric Marvel 1200mm (Brown)',
    spec: '1200mm · Standard motor · 75W · 3-speed regulator included · 5-year warranty' },

  { brand: 'Crompton', sector: 'electrical', category: 'Ceiling Fans', isNew: true, isFeatured: true,
    name: 'Crompton Avancer Prime BLDC 1200mm',
    spec: 'BLDC · 1200mm · 28W · 5-star · Remote with timer · Silent motor · 5-year warranty' },

  { brand: 'Crompton', sector: 'electrical', category: 'Ceiling Fans', isNew: false, isFeatured: false,
    name: 'Crompton Energion Cromair 1200mm (White)',
    spec: '1200mm · 75W · High airflow 245 CMM · Anti-dust technology · 2-year warranty' },

  { brand: 'Usha', sector: 'electrical', category: 'Ceiling Fans', isNew: false, isFeatured: false,
    name: 'Usha Ace Ex 1200mm (White)',
    spec: '1200mm · 73W · 210 CMM airflow · 3-speed · Budget-friendly · 2-year warranty' },

  { brand: 'Havells', sector: 'electrical', category: 'Ceiling Fans', isNew: true, isFeatured: false,
    name: 'Havells Efficiencia Neo BLDC 1200mm',
    spec: 'BLDC · 1200mm · 25W · 5-star BEE · Remote · Anti-dust blades · Wall charger included' },

  // ════════════════════════════════════════════════════════
  // 🚿 SANITARY WARE — FAUCETS & MIXERS
  // ════════════════════════════════════════════════════════

  // Jaquar Faucets
  { brand: 'Jaquar', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: true,
    name: 'Jaquar Solo Wall-Mount Basin Mixer',
    spec: 'Solo range · CP finish · Ceramic disc cartridge · ½" inlet · With popup waste · Flow: 8 L/min' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Jaquar Kubix Prime Single Lever Basin Mixer',
    spec: 'Kubix Prime · Square design · CP · Aerator with flow controller · With popup waste' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Jaquar Florentine Pillar Cock (Pair)',
    spec: 'Florentine range · 15mm · CP · ½" inlet · Hot & cold pillar cocks · Classic design' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Faucets & Mixers', isNew: true, isFeatured: true,
    name: 'Jaquar Kubix Single Lever Kitchen Mixer',
    spec: 'Kubix · 360° swivel spout · Pull-out spray · CP finish · 15mm · For kitchen sinks' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Jaquar Health Faucet with 1.5m Hose',
    spec: 'Chrome finish · ABS body · 1.5m flexible braided hose · Wall hook included · ISI mark' },

  // Cera Faucets
  { brand: 'Cera', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: true,
    name: 'Cera Clarion Single Lever Basin Mixer',
    spec: 'Clarion range · CP finish · Ceramic cartridge · ½" · With waste coupling · 5-year warranty' },

  { brand: 'Cera', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Cera Fountain Pillar Cock (Pair)',
    spec: 'Fountain range · 15mm · CP finish · Brass body · Standard pillar mount · Classic' },

  { brand: 'Cera', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Cera Single Lever Kitchen Sink Mixer',
    spec: 'Brass body · CP finish · Swivel spout · Aerator · Pull-out spray head · Budget-friendly' },

  // Eagle Faucets
  { brand: 'Eagle', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Eagle 15mm Pillar Cock (CP)',
    spec: '15mm · Chrome plated brass · Screw-down mechanism · ½" BSP · Budget value pack' },

  { brand: 'Eagle', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Eagle Single Lever Basin Mixer',
    spec: 'CP brass body · Ceramic cartridge · ½" inlet · Affordable · Good quality finish' },

  { brand: 'Eagle', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Eagle Quarter-Turn Bib Cock (CP)',
    spec: '15mm · Quarter-turn ceramic · CP finish · For utility areas, terraces & cleaning' },

  // Sanvo Faucets
  { brand: 'Sanvo', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Sanvo SS304 Pillar Cock (Pair)',
    spec: 'Grade 304 stainless steel · Matt finish · ½" inlet · Corrosion-proof · Long life' },

  { brand: 'Sanvo', sector: 'sanitary', category: 'Faucets & Mixers', isNew: true, isFeatured: false,
    name: 'Sanvo SS Single Lever Basin Mixer',
    spec: 'SS304 body · Matt finish · Ceramic cartridge · Ideal for Mumbai hard-water conditions' },

  // Goldline Faucets
  { brand: 'Goldline', sector: 'sanitary', category: 'Faucets & Mixers', isNew: false, isFeatured: false,
    name: 'Goldline Budget Pillar Cock (CP)',
    spec: 'CP brass · ½" BSP · Economy range · Suitable for second bathrooms & utility areas' },

  // Grohe
  { brand: 'Grohe', sector: 'sanitary', category: 'Faucets & Mixers', isNew: true, isFeatured: true,
    name: 'Grohe Eurostyle Single Lever Basin Mixer',
    spec: 'Eurostyle · StarLight CP finish · SilkMove cartridge · Laminar flow · German quality' },

  // ════════════════════════════════════════════════════════
  // 🚿 SANITARY WARE — SHOWERS
  // ════════════════════════════════════════════════════════

  { brand: 'Jaquar', sector: 'sanitary', category: 'Showers', isNew: false, isFeatured: true,
    name: 'Jaquar 200mm Overhead Shower (Round)',
    spec: 'ABS body · CP finish · 200mm · Single function · Ceiling arm included · 60 nozzles' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Showers', isNew: false, isFeatured: false,
    name: 'Jaquar 250mm Overhead Shower (Square)',
    spec: '250mm · Square · CP finish · Multi-function · Self-cleaning nozzles · Arm included' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Showers', isNew: true, isFeatured: true,
    name: 'Jaquar Opal+ Complete Shower System',
    spec: 'Overhead 250mm + handheld + 3-function diverter + exposed bar + arm · Complete set' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Showers', isNew: false, isFeatured: false,
    name: 'Jaquar Hand Shower with 1.5m Hose (3-Function)',
    spec: '3 spray functions · CP ABS body · Anti-calc nozzles · 1.5m hose · Wall hook' },

  { brand: 'Cera', sector: 'sanitary', category: 'Showers', isNew: false, isFeatured: false,
    name: 'Cera 200mm Overhead Shower',
    spec: 'ABS body · CP · Single function · 200mm round · Budget-friendly · Arm not included' },

  { brand: 'Grohe', sector: 'sanitary', category: 'Showers', isNew: true, isFeatured: false,
    name: 'Grohe Rainshower 310mm Overhead (Smart Control)',
    spec: '310mm · Multi-function · Smart Control diverter · Grohe DreamSpray · Premium' },

  // ════════════════════════════════════════════════════════
  // 🚿 SANITARY WARE — SANITARYWARE (WCs, Basins)
  // ════════════════════════════════════════════════════════

  { brand: 'Cera', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: true,
    name: 'Cera Marino Floor-Mounted WC (S-Trap)',
    spec: 'S-trap · 305mm · White · Dual flush 6/3L · Soft-close seat included · ISI mark' },

  { brand: 'Cera', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: false,
    name: 'Cera Aria Wall-Hung WC',
    spec: 'Rimless · Wall-hung · White vitreous china · Dual flush · Requires concealed cistern' },

  { brand: 'Cera', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: false,
    name: 'Cera Table-Top Basin 520mm (White)',
    spec: '520×420mm · White vitreous china · Counter-top mount · 1 tap hole · ISI mark' },

  { brand: 'Cera', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: false,
    name: 'Cera Wall-Hung Basin 590mm',
    spec: '590mm · White · Wall-mounted · Supports up to 150kg · No pedestal needed' },

  { brand: 'Hindware', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: true,
    name: 'Hindware Jade Floor-Mounted WC',
    spec: 'S-trap · White · Dual flush 3/6L · Soft-close PP seat · Anti-bacterial glaze · ISI' },

  { brand: 'Hindware', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: false,
    name: 'Hindware Rimless WC (Wall-Hung)',
    spec: 'Rimless · Easy clean · Wall-hung · White · For concealed cistern · Modern look' },

  { brand: 'Parryware', sector: 'sanitary', category: 'Sanitaryware', isNew: false, isFeatured: false,
    name: 'Parryware Rimless WC with Soft-Close Seat',
    spec: 'Rimless · S-trap · Dual flush 4.5/3L · Hygienic Easy Clean glaze · Roca Group' },

  { brand: 'Kohler', sector: 'sanitary', category: 'Sanitaryware', isNew: true, isFeatured: true,
    name: 'Kohler Veil Intelligent Toilet (Auto)',
    spec: 'Smart WC · Heated seat · Auto flush · Integrated bidet · Soft-close · Premium' },

  // ════════════════════════════════════════════════════════
  // 🚿 SANITARY WARE — BATHROOM ACCESSORIES
  // ════════════════════════════════════════════════════════

  { brand: 'Jaquar', sector: 'sanitary', category: 'Bathroom Accessories', isNew: false, isFeatured: false,
    name: 'Jaquar Continental Towel Ring (CP)',
    spec: 'Continental range · CP finish · Wall-mount · Solid brass · 300mm ring diameter' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Bathroom Accessories', isNew: false, isFeatured: false,
    name: 'Jaquar Continental Toilet Paper Holder',
    spec: 'Continental range · CP · Brass · Wall-mounted · Matches Continental accessories range' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Bathroom Accessories', isNew: false, isFeatured: false,
    name: 'Jaquar Towel Bar 600mm (CP)',
    spec: '600mm · Round bar · CP finish · Solid brass · 25mm bar diameter · Wall-mounted' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Bathroom Accessories', isNew: false, isFeatured: false,
    name: 'Jaquar Soap Dispenser (CP)',
    spec: 'CP brass mount · 300ml capacity · Wall-mount · Push-operated · Matching range' },

  { brand: 'Cera', sector: 'sanitary', category: 'Bathroom Accessories', isNew: false, isFeatured: false,
    name: 'Cera Towel Ring with Bracket (CP)',
    spec: 'CP brass · Wall-mount · Budget-friendly · Fits standard bracket spacing' },

  { brand: 'Goldline', sector: 'sanitary', category: 'Bathroom Accessories', isNew: false, isFeatured: false,
    name: 'Goldline 5-Piece Bathroom Accessory Set (CP)',
    spec: 'Towel ring + TP holder + soap dish + towel bar + robe hook · CP · Value set' },

  { brand: 'Sanvo', sector: 'sanitary', category: 'Bathroom Accessories', isNew: true, isFeatured: false,
    name: 'Sanvo SS304 Towel Bar 24 inch (Matt)',
    spec: 'Grade 304 SS · Matt finish · 24" / 600mm · Anti-corrosion · Ideal for Mumbai climate' },

  // ════════════════════════════════════════════════════════
  // 🚿 SANITARY WARE — PIPES & FITTINGS
  // ════════════════════════════════════════════════════════

  { brand: 'Jaquar', sector: 'sanitary', category: 'Pipes & Fittings', isNew: false, isFeatured: false,
    name: 'Jaquar CPVC Pipe 20mm (3m)',
    spec: '20mm OD · CPVC · Hot & cold water · ISI IS:15778 · Pressure rated 25 kg/cm²' },

  { brand: 'Jaquar', sector: 'sanitary', category: 'Pipes & Fittings', isNew: false, isFeatured: false,
    name: 'Jaquar CPVC Pipe 25mm (3m)',
    spec: '25mm OD · CPVC · For main supply lines · ISI mark · Solvent weld jointing' },

  { brand: 'Cera', sector: 'sanitary', category: 'Pipes & Fittings', isNew: false, isFeatured: false,
    name: 'Cera PVC-U SWR Pipe 75mm (3m)',
    spec: '75mm · Soil-waste-rain pipe · uPVC · For drainage · ISI IS:13592 · Heavy wall' },

  { brand: 'Cera', sector: 'sanitary', category: 'Pipes & Fittings', isNew: false, isFeatured: false,
    name: 'Cera uPVC Pipe 110mm (3m) SWR',
    spec: '110mm OD · Main drain · uPVC SWR · Orange colour · ISI mark · Ring-fit jointing' },

  // ════════════════════════════════════════════════════════
  // 🔧 HARDWARE — HINGES
  // ════════════════════════════════════════════════════════

  { brand: 'Hettich', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: true,
    name: 'Hettich Sensys 8645i Full-Overlay Hinge (Pair)',
    spec: 'Full overlay · 107° opening · Soft-close integrated · Press-in cup · Tool-free adjustment' },

  { brand: 'Hettich', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: false,
    name: 'Hettich Sensys 8645i Half-Overlay Hinge (Pair)',
    spec: 'Half overlay · 107° · Soft-close · Suitable for shared walls between two doors' },

  { brand: 'Hettich', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: false,
    name: 'Hettich Intermat 9943 Inset Hinge (Pair)',
    spec: 'Inset overlay · 100° · Soft-close · For inset cabinet doors · 3D adjustable' },

  { brand: 'Hettich', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: false,
    name: 'Hettich Wingline L Up-and-Over Door Lift (Pair)',
    spec: 'Wingline L · For flap-up doors · Integrated soft-close · Up to 9.5kg door weight' },

  { brand: 'Blum', sector: 'hardware', category: 'Hinges', isNew: true, isFeatured: true,
    name: 'Blum CLIP top BLUMOTION Full-Overlay Hinge (Pair)',
    spec: 'Full overlay · 110° · BLUMOTION soft-close · Self-closing · Clip-on mounting plate' },

  { brand: 'Blum', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: false,
    name: 'Blum CLIP top 110° Hinge without Soft-Close (Pair)',
    spec: 'Full overlay · 110° · Without damper · For budget installations · Clip-on plate' },

  { brand: 'Hafele', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: false,
    name: 'Hafele Duomatic Full-Overlay Hinge (Pair)',
    spec: 'Full overlay · 110° · Without soft-close · Economy range · Good quality finish' },

  { brand: 'Ozone', sector: 'hardware', category: 'Hinges', isNew: false, isFeatured: false,
    name: 'Ozone 4-inch Stainless Steel Butt Hinge (Pair)',
    spec: 'SS304 · 4 inch · For main/bedroom doors · Ball bearing · Heavy duty · 80kg capacity' },

  // ════════════════════════════════════════════════════════
  // 🔧 HARDWARE — DRAWER SYSTEMS
  // ════════════════════════════════════════════════════════

  { brand: 'Hettich', sector: 'hardware', category: 'Drawer Systems', isNew: false, isFeatured: true,
    name: 'Hettich Quadro V6 Full-Extension Drawer (450mm)',
    spec: '450mm · Full extension · 30kg load · Soft-close · White epoxy · Undermount · Pair' },

  { brand: 'Hettich', sector: 'hardware', category: 'Drawer Systems', isNew: false, isFeatured: false,
    name: 'Hettich Quadro V6 Full-Extension Drawer (500mm)',
    spec: '500mm · Full extension · 30kg · Soft-close · Undermount · For kitchen base units' },

  { brand: 'Hettich', sector: 'hardware', category: 'Drawer Systems', isNew: false, isFeatured: false,
    name: 'Hettich Antaro D Box Drawer System (450mm)',
    spec: 'Antaro · D-height · 450mm · 30kg · Soft-close Reling · For modular kitchens' },

  { brand: 'Blum', sector: 'hardware', category: 'Drawer Systems', isNew: true, isFeatured: true,
    name: 'Blum TANDEM BLUMOTION Full-Extension Slide (500mm)',
    spec: '500mm · Full extension · 30kg · BLUMOTION soft-close · Undermount · Premium Austrian quality' },

  { brand: 'Blum', sector: 'hardware', category: 'Drawer Systems', isNew: false, isFeatured: false,
    name: 'Blum LEGRABOX Pure Drawer System (450mm)',
    spec: '450mm · M-height · 40kg · TIP-ON optional · Stylish thin-wall design · Orion grey' },

  { brand: 'Ebco', sector: 'hardware', category: 'Drawer Systems', isNew: false, isFeatured: false,
    name: 'Ebco Soft-Close Drawer Channel 400mm (Pair)',
    spec: '400mm · Full extension · 25kg · Soft-close · Economy range · Easy installation' },

  { brand: 'Hafele', sector: 'hardware', category: 'Drawer Systems', isNew: false, isFeatured: false,
    name: 'Hafele Matrix Box Slim Drawer (450mm)',
    spec: '450mm · 35kg · Full extension · Soft-close · Slim side wall 12mm · For tight spaces' },

  // ════════════════════════════════════════════════════════
  // 🔧 HARDWARE — LOCKS & SECURITY
  // ════════════════════════════════════════════════════════

  { brand: 'Godrej', sector: 'hardware', category: 'Locks & Security', isNew: false, isFeatured: true,
    name: 'Godrej Ultra Locks 3C Mortise Lock (65mm)',
    spec: '65mm · SS 304 · 3 keys · Anti-pick · Drill-resistant · ISI mark · For main doors' },

  { brand: 'Godrej', sector: 'hardware', category: 'Locks & Security', isNew: false, isFeatured: false,
    name: 'Godrej Vector Plus Mortise Lock',
    spec: 'High-security · Hardened steel bolt · Anti-saw · Dimple key · 5-pin tumbler' },

  { brand: 'Godrej', sector: 'hardware', category: 'Locks & Security', isNew: false, isFeatured: false,
    name: 'Godrej Padlock 50mm (Hardened Steel)',
    spec: '50mm · Hardened shackle · 2 keys · ISI mark · Weatherproof · For gates & shutters' },

  { brand: 'Yale', sector: 'hardware', category: 'Locks & Security', isNew: true, isFeatured: true,
    name: 'Yale Digital Door Lock YDM3168 (Fingerprint)',
    spec: 'Fingerprint + PIN + RFID card + key · For 40-80mm doors · Auto-lock · Battery backup' },

  { brand: 'Yale', sector: 'hardware', category: 'Locks & Security', isNew: true, isFeatured: false,
    name: 'Yale YRM-720 Mortise Smart Lock',
    spec: 'Smartphone + fingerprint + PIN · Bluetooth app · For 32-60mm doors · Chrome finish' },

  { brand: 'Dorset', sector: 'hardware', category: 'Locks & Security', isNew: false, isFeatured: false,
    name: 'Dorset Optima Mortise Lock (60mm)',
    spec: '60mm backset · SS body · 3 keys · Reversible latch · For interior bedroom doors' },

  { brand: 'Hafele', sector: 'hardware', category: 'Locks & Security', isNew: false, isFeatured: false,
    name: 'Hafele Startec Cylindrical Lock (Bathroom)',
    spec: 'Bathroom lock · Inside turn · 60mm · SS finish · Emergency release outside' },

  // ════════════════════════════════════════════════════════
  // 🔧 HARDWARE — HANDLES & KNOBS
  // ════════════════════════════════════════════════════════

  { brand: 'Hafele', sector: 'hardware', category: 'Handles & Knobs', isNew: false, isFeatured: true,
    name: 'Hafele Gavin D-Pull Handle 160mm (Satin Nickel)',
    spec: '160mm · Satin nickel · Zinc alloy · For cabinet doors & drawers · Pack of 10' },

  { brand: 'Hafele', sector: 'hardware', category: 'Handles & Knobs', isNew: false, isFeatured: false,
    name: 'Hafele Bow Handle 96mm (Matt Black)',
    spec: '96mm bore · Matt black · Die-cast zinc · Modern look · For modular kitchen' },

  { brand: 'Hafele', sector: 'hardware', category: 'Handles & Knobs', isNew: false, isFeatured: false,
    name: 'Hafele Main Door Handle 600mm (SS304)',
    spec: '600mm · Grade 304 SS · Tubular · 32mm diameter · For main/wooden/glass doors' },

  { brand: 'Ozone', sector: 'hardware', category: 'Handles & Knobs', isNew: true, isFeatured: false,
    name: 'Ozone Architectural Lever Handle (Satin Nickel)',
    spec: 'Lever style · Satin nickel · For internal doors · Complete with rose and latch' },

  { brand: 'Hettich', sector: 'hardware', category: 'Handles & Knobs', isNew: false, isFeatured: false,
    name: 'Hettich Cabinet Handle 128mm (Chrome)',
    spec: '128mm bore · Chrome finish · Zinc · For kitchen & wardrobe cabinets · Pack of 10' },

  { brand: 'Ebco', sector: 'hardware', category: 'Handles & Knobs', isNew: false, isFeatured: false,
    name: 'Ebco SS Cabinet Knob Round 30mm (Pack of 10)',
    spec: 'SS 304 · 30mm diameter · Screw-fix · For kitchen and bedroom cabinets' },

  // ════════════════════════════════════════════════════════
  // 🔧 HARDWARE — DOOR ACCESSORIES
  // ════════════════════════════════════════════════════════

  { brand: 'Dorset', sector: 'hardware', category: 'Door Accessories', isNew: false, isFeatured: false,
    name: 'Dorset Tower Bolt SS304 — 10 inch',
    spec: '10 inch · SS304 · For main doors · Heavy-duty · Barrel with guide · Easy install' },

  { brand: 'Dorset', sector: 'hardware', category: 'Door Accessories', isNew: false, isFeatured: false,
    name: 'Dorset Tower Bolt SS — 6 inch (Pack of 2)',
    spec: '6 inch · SS finish · For interior doors & windows · 2-piece pack · Budget-friendly' },

  { brand: 'Hafele', sector: 'hardware', category: 'Door Accessories', isNew: false, isFeatured: true,
    name: 'Hafele Startec Door Closer (Surface) — 60kg',
    spec: 'EN3 · Up to 60kg doors · Adjustable closing & latch speed · Silver finish · DIN EN 1154' },

  { brand: 'Hafele', sector: 'hardware', category: 'Door Accessories', isNew: true, isFeatured: false,
    name: 'Hafele Floor Spring (Concealed) — 80kg',
    spec: 'Concealed floor spring · Up to 80kg · For glass & heavy wooden doors · Adjustable' },

  { brand: 'Ozone', sector: 'hardware', category: 'Door Accessories', isNew: false, isFeatured: false,
    name: 'Ozone Stainless Steel Door Stopper (Floor)',
    spec: 'SS304 · Floor-mounted · Rubber tip · Prevents wall damage · Screw-fix · Low profile' },

  { brand: 'Godrej', sector: 'hardware', category: 'Door Accessories', isNew: false, isFeatured: false,
    name: 'Godrej Magnetic Door Stopper (SS)',
    spec: 'SS finish · Magnetic catch · Wall or floor mount · Strong hold · 2kg pull force' },

  { brand: 'Ebco', sector: 'hardware', category: 'Door Accessories', isNew: false, isFeatured: false,
    name: 'Ebco Adjustable Wardrobe Hanging Rod 900–1500mm',
    spec: 'Telescopic · 19mm dia · Chrome plated · With two end supports · For wardrobes' },

  // ════════════════════════════════════════════════════════
  // 🔧 HARDWARE — KITCHEN FITTINGS
  // ════════════════════════════════════════════════════════

  { brand: 'Hettich', sector: 'hardware', category: 'Kitchen Fittings', isNew: false, isFeatured: true,
    name: 'Hettich Carousel Corner Unit (800mm)',
    spec: '800×800mm cabinet · Full rotation · 2-tier kidney shape · For corner base units' },

  { brand: 'Hettich', sector: 'hardware', category: 'Kitchen Fittings', isNew: false, isFeatured: false,
    name: 'Hettich WingLine L Flap Lift System',
    spec: 'For wall units · Pneumatic soft-close · Up to 9.5kg door · Fold-up mechanism' },

  { brand: 'Ebco', sector: 'hardware', category: 'Kitchen Fittings', isNew: false, isFeatured: false,
    name: 'Ebco Stainless Steel Corner Shelf (2-Tier)',
    spec: 'SS304 · 2-tier · 270mm radius · Wall-mounted · For kitchen corner storage' },

  { brand: 'Hafele', sector: 'hardware', category: 'Kitchen Fittings', isNew: false, isFeatured: false,
    name: 'Hafele Bottle Pull-Out (400mm Cabinet)',
    spec: '400mm · Chrome wire · Single pull-out · For narrow cabinets · 5kg capacity' },

  { brand: 'Blum', sector: 'hardware', category: 'Kitchen Fittings', isNew: true, isFeatured: false,
    name: 'Blum SERVO-DRIVE for LEGRABOX (Single Drive)',
    spec: 'Touch-to-open for LEGRABOX drawers · TIP-ON electric · For handleless kitchens' },
]

async function seedProducts(brandIds: Record<string, string>) {
  await deleteExisting('product')
  let count   = 0
  let skipped = 0
  for (const p of rawProducts) {
    const brandRef = brandIds[p.brand]
    if (!brandRef) {
      warn(`Brand "${p.brand}" not found — skipping "${p.name}"`)
      skipped++
      continue
    }
    const { brand, ...rest } = p
    await client.create({
      _type: 'product',
      ...rest,
      slug: {
        _type: 'slug',
        current: p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 96),
      },
      brand: { _type: 'reference', _ref: brandRef },
    })
    count++
  }
  log(`Products (${count} created${skipped ? `, ${skipped} skipped` : ''})`)
}

// ─────────────────────────────────────────────────────────────
// WORKERS
// ─────────────────────────────────────────────────────────────
const workersData = [
  { name: 'Ramesh Sharma',      specialty: 'electrician', experience: 12, rating: 5, bio: 'Specialist in complete home wiring, panel upgrades and AC installation. 12+ years across Mumbai.',  isActive: true },
  { name: 'Anil Patil',         specialty: 'plumber',     experience: 8,  rating: 5, bio: 'Expert in sanitary installations, CPVC plumbing and bathroom fitouts. Neat and reliable.',          isActive: true },
  { name: 'Vijay Carpenter',    specialty: 'carpenter',   experience: 10, rating: 4, bio: 'Experienced in modular kitchen fitting, wardrobe work and all furniture hardware installations.',    isActive: true },
  { name: 'Suresh Kumar',       specialty: 'electrician', experience: 6,  rating: 4, bio: 'Skilled in light fixture installation, switchboard work, fan fitting and geyser connections.',       isActive: true },
  { name: 'Dinesh Kamble',      specialty: 'tiler',       experience: 9,  rating: 5, bio: 'Expert wall and floor tiler. Specialises in large-format tiles and anti-skid bathroom flooring.',   isActive: true },
  { name: 'Manoj Jadhav',       specialty: 'plumber',     experience: 5,  rating: 4, bio: 'Reliable for tap installation, cistern repair, pipe fitting and bathroom accessory mounting.',      isActive: true },
  { name: 'Santosh Nair',       specialty: 'electrician', experience: 15, rating: 5, bio: 'Senior electrician. Handles commercial wiring, DB installations and complete project supervision.', isActive: true },
  { name: 'Pravin Ghosalkar',   specialty: 'carpenter',   experience: 7,  rating: 4, bio: 'Specialises in door fitting, drawer channel installations and all Hettich/Blum hardware.',         isActive: true },
]

async function seedWorkers() {
  await deleteExisting('worker')
  for (const w of workersData) {
    await client.create({ _type: 'worker', ...w })
  }
  log(`Workers (${workersData.length})`)
}

// ─────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────
const testimonialsData = [
  { name: 'Rahul Mehta',        role: 'Homeowner, Andheri West',   rating: 5,
    quote: "Sourced all electrical for our 4BHK renovation from MyChoice — Polycab wires, Legrand switches, Indoasian MCBs. The owner guided every choice personally. Wouldn't go anywhere else." },
  { name: 'Priya Kapoor',       role: 'Architect, Bandra',          rating: 5,
    quote: "As an architect I've sourced from every hardware store in Mumbai. MyChoice stocks what I actually need — Blum, Hettich, Hafele all under one roof. The Jaquar CP range is unmatched too." },
  { name: 'Suresh Electricals', role: 'Electrical Contractor, Borivali', rating: 5,
    quote: "We buy Polycab wires, Legrand boards and Indoasian MCBs in bulk from here for every project. Trade pricing, always in stock, and the owner knows every product inside out." },
  { name: 'Neha Joshi',         role: 'Interior Designer, Juhu',    rating: 5,
    quote: "Found the complete Jaquar accessory range, Cera sanitaryware and Kolors switches in one visit. Saves me hours of running around. MyChoice is my first call for every project now." },
  { name: 'Vikram Singh',       role: 'Homeowner, Powai',           rating: 5,
    quote: "Used the WhatsApp quote system for our bathroom renovation — Jaquar faucets, Cera WC, Hirays lights. Got pricing within an hour. Products delivered, quality was excellent." },
  { name: 'Rohan Builders',     role: 'Developer, Thane',           rating: 5,
    quote: "Bulk order for 40 flats — Polycab wiring, Roma switches, Indoasian MCBs, Cera sanitaryware. Competitive rates and everything was ready on time. Very professional." },
]

async function seedTestimonials() {
  await deleteExisting('testimonial')
  for (const t of testimonialsData) {
    await client.create({ _type: 'testimonial', ...t })
  }
  log(`Testimonials (${testimonialsData.length})`)
}

// ─────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────
const faqsData = [
  { order: 1,  category: 'electrical',
    question: 'What wire size should I use for a 1.5 ton AC?',
    answer: "Use 2.5mm² copper wire (Polycab or Finolex FR/FRLS) for a dedicated 1.5-ton AC circuit. For a 2-ton AC, use 4mm². Always run a separate circuit for each AC. We'll calculate the exact requirement if you walk in." },

  { order: 2,  category: 'electrical',
    question: 'What is the difference between FR and FRLS wire?',
    answer: "FR (Fire Retardant) wire self-extinguishes if it catches fire. FRLS (Fire Retardant Low Smoke) additionally produces minimal toxic smoke — critical in enclosed Mumbai flats where smoke inhalation is the bigger danger. We recommend Polycab or Finolex FRLS for all residential use. Both are ISI certified." },

  { order: 3,  category: 'electrical',
    question: 'Which MCB brand is best — Legrand, Indoasian, or Havells?',
    answer: "All three are excellent. Legrand (DX3) and Havells are premium — better internal components, ideal for quality-conscious builds. Indoasian offers the best value for money and is ISI certified — great for standard residential use. We stock all three and can help you choose based on your budget and load requirements." },

  { order: 4,  category: 'electrical',
    question: 'What is the right MCB size for a 3BHK flat?',
    answer: "Typical 3BHK: 40A or 63A main RCCB at the top, with 6A MCBs for lighting circuits, 10A for fan circuits, 16A for power sockets, 20A for geyser, and 25-32A for each AC. The exact configuration depends on total load. Walk in and we'll size it correctly for you at no charge." },

  { order: 5,  category: 'electrical',
    question: 'Which LED light brands do you stock and which is best?',
    answer: "We stock Hirays, Ledvance (OSRAM technology), Philips and Syska. Hirays and Ledvance are our top recommendations for quality — better drivers, longer life, and consistent colour temperature. Philips is widely trusted for residential use. For architectural and premium projects, Hirays COB and track lights are excellent." },

  { order: 6,  category: 'electrical',
    question: 'What is the difference between Roma, Legrand, and Kolors switches?',
    answer: "Roma (Anchor) is the most widely used — reliable, affordable, ISI certified, widely available for repairs. Legrand Arteor is premium — screwless design, beautiful finishes, French engineering — ideal for modern or luxury interiors. Kolors is for premium designer interiors where aesthetics matter, with gold and graphite finish options. We'll show you all three in person." },

  { order: 7,  category: 'sanitary',
    question: 'What is the difference between CP and SS fittings for Mumbai homes?',
    answer: "CP (Chrome Plated) fittings look premium but can tarnish and pit over 3-5 years in Mumbai's hard, humid water conditions. SS (Stainless Steel 304) fittings — like Sanvo and SS range from Jaquar — last significantly longer with minimal maintenance. For bathrooms that won't be renovated for 10+ years, SS is the smarter choice. We stock both." },

  { order: 8,  category: 'sanitary',
    question: 'Which is better — Jaquar, Cera, or Eagle for bathroom faucets?',
    answer: "Jaquar is the gold standard — ceramic disc cartridges, ISI certified, 5-year warranty, widest service network. Cera is slightly below at a better price point — still very reliable. Eagle is the value option for budget bathrooms. For a home you'll live in long-term, Jaquar is worth the extra spend. We'll show you all three ranges." },

  { order: 9,  category: 'hardware',
    question: 'Hettich vs Blum — which is better for modular kitchen hardware?',
    answer: "Both are excellent German/Austrian brands. Blum TANDEM and LEGRABOX are considered the gold standard for drawers — buttery smooth, incredibly durable, 30kg load. Hettich Quadro and Antaro are very close in quality at a slightly lower price. For premium kitchens we recommend Blum; for quality kitchens on a controlled budget, Hettich is the call." },

  { order: 10, category: 'hardware',
    question: 'What type of hinge is best for modular kitchen shutters?',
    answer: "Concealed soft-close hinges — either Hettich Sensys or Blum CLIP top BLUMOTION — are the standard for modular kitchens. They're invisible when the door is closed, close silently, and last 20+ years. The overlay type (full, half, inset) depends on your cabinet design. Bring your shutter dimensions and we'll recommend the exact hinge." },

  { order: 11, category: 'general',
    question: 'Do I need to buy from MyChoice to use the Workers Network?',
    answer: "No — the Workers Network is open to everyone. Submit a request with job type, location and date. We'll assign the right verified professional. All coordination goes through MyChoice — you always have a single point of contact and accountability." },

  { order: 12, category: 'general',
    question: 'How does the WhatsApp quote system work?',
    answer: "Browse products, add items to your Quote List with quantities, then click 'Get Quote on WhatsApp.' It opens WhatsApp with your complete list pre-filled — just hit Send. The owner responds with pricing directly on WhatsApp. No forms, no waiting, no back-and-forth." },

  { order: 13, category: 'general',
    question: 'Do you offer bulk or trade pricing for contractors and developers?',
    answer: "Yes — contractors, electricians, plumbers, architects and developers who source regularly get preferential trade pricing. Walk in or WhatsApp us mentioning you're a trade buyer and we'll set you up immediately. We supply multiple ongoing projects across Mumbai." },
]

async function seedFaqs() {
  await deleteExisting('faq')
  for (const f of faqsData) {
    await client.create({ _type: 'faq', ...f })
  }
  log(`FAQs (${faqsData.length})`)
}

async function seedProductsWithoutClear(brandIds: Record<string, string>) {
  let count   = 0
  let skipped = 0
  for (const p of rawProducts) {
    const brandRef = brandIds[p.brand]
    if (!brandRef) {
      warn(`Brand "${p.brand}" not found — skipping "${p.name}"`)
      skipped++
      continue
    }
    const { brand, ...rest } = p
    await client.create({
      _type: 'product',
      ...rest,
      slug: {
        _type: 'slug',
        current: p.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 96),
      },
      brand: { _type: 'reference', _ref: brandRef },
    })
    count++
  }
  log(`Products (${count} created${skipped ? `, ${skipped} skipped` : ''})`)
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🌱 Seeding MyChoice — real product catalogue...\n')

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing in .env.local'); process.exit(1)
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('❌  SANITY_API_WRITE_TOKEN missing in .env.local')
    console.error('    Get it → sanity.io/manage → API → Tokens → Add (Editor role)')
    process.exit(1)
  }

  try {
    await seedSiteSettings()
    await deleteExisting('product')
    const brandIds = await seedBrands()
    await seedProductsWithoutClear(brandIds)
    await seedProducts(brandIds)
    await seedWorkers()
    await seedTestimonials()
    await seedFaqs()

    const totals = {
      brands:       brandsData.length,
      products:     rawProducts.length,
      workers:      workersData.length,
      testimonials: testimonialsData.length,
      faqs:         faqsData.length,
    }

    console.log('\n✅ Seeding complete!')
    console.log(`   Brands: ${totals.brands} · Products: ${totals.products} · Workers: ${totals.workers}`)
    console.log(`   Testimonials: ${totals.testimonials} · FAQs: ${totals.faqs}`)
    console.log('\n   Open localhost:3000 — full catalogue is live.\n')
  } catch (err) {
    console.error('\n❌ Failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }
}

main()
