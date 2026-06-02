import type { Testimonial, Brand, SiteSettings } from '@/types'

interface Props {
  testimonials: Testimonial[]
  brands: Brand[]
  settings: SiteSettings | null
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#b87333] text-sm mb-4">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
    </div>
  )
}

export function TrustSection({ testimonials, brands, settings }: Props) {
  const stats = settings?.stats
  return (
    <section id="trust" className="bg-[#f7f3ec] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">Why MyChoice</p>
          <h2 className="font-playfair text-headline font-bold text-[#1a1a2e]">
            BUILT ON <em className="text-[#b87333]">TRUST</em>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-[#ede7db] mb-16">
          {[
            { num: stats?.yearsInBusiness ?? '15+', label: 'Years in Business' },
            { num: stats?.brandsStocked ?? '50+', label: 'Brands Stocked' },
            { num: stats?.projectsSupplied ?? '500+', label: 'Projects Supplied' },
            { num: '3', label: 'Complete Sectors' },
          ].map((s, i) => (
            <div key={i} className="p-8 text-center border-r border-b md:border-b-0 border-[#ede7db] last:border-r-0">
              <div className="font-playfair text-5xl font-bold text-[#b87333] leading-none mb-2">{s.num}</div>
              <div className="text-[10px] tracking-[2px] uppercase text-[#8a7d6e]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {testimonials.slice(0, 3).map(t => (
              <div key={t._id} className="bg-[#0f1923] p-7 border border-[#b87333]/10">
                <Stars rating={t.rating} />
                <p className="font-cormorant italic text-[#f7f3ec] text-lg leading-relaxed mb-5 font-light">"{t.quote}"</p>
                {t.projectPhoto && (
                  <span className="inline-block text-[9px] tracking-[1.5px] uppercase text-[#52b788] border border-[#52b788]/30 px-2 py-0.5 mb-4">
                    ✓ Verified Purchase
                  </span>
                )}
                <div>
                  <p className="text-[#f7f3ec] font-medium text-sm">{t.name}</p>
                  {t.role && <p className="text-[#8899aa] text-xs mt-0.5">{t.role}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Brands */}
        {brands.length > 0 && (
          <>
            <p className="text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-6 copper-line">Brands We Stock</p>
            <div className="flex flex-wrap border border-[#ede7db]">
              {brands.map(b => (
                <div key={b._id} className="flex-1 min-w-[140px] p-6 text-center border-r border-b border-[#ede7db] hover:bg-white transition-colors">
                  <div className="font-playfair text-xl font-bold text-[#1a1a2e] mb-1">{b.name}</div>
                  {b.tagline && <div className="text-[10px] tracking-[1px] uppercase text-[#b87333]">{b.tagline}</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
