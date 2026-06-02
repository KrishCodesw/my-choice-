import { sectorMeta } from '@/lib/utils'
import type { Product } from '@/types'

interface Props { arrivals: Product[] }

export function NewArrivalsSection({ arrivals }: Props) {
  return (
    <section id="arrivals" className="bg-[#162030] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">Just In</p>
          <h2 className="font-playfair text-headline font-bold text-[#f7f3ec]">
            NEW <em className="text-[#b87333]">ARRIVALS</em>
          </h2>
          <p className="text-[#8899aa] text-sm mt-3 max-w-md leading-relaxed">
            Fresh stock, premium brands. Visit the showroom or WhatsApp us to check availability.
          </p>
        </div>

        {arrivals.length === 0 ? (
          <div className="text-center py-16 text-[#8899aa]">
            <p className="font-cormorant italic text-xl">New arrivals will appear here.</p>
            <p className="text-sm mt-2">Mark products as "New Arrival" in Sanity Studio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {arrivals.map(p => (
              <div key={p._id} className="bg-[#1e2d40] border border-[#b87333]/10 p-7 hover:border-[#b87333]/30 transition-colors relative group">
                <span className="absolute top-5 right-5 bg-[#b87333] text-[#f7f3ec] text-[8px] tracking-[1.5px] uppercase px-2.5 py-1 font-semibold">New</span>
                <div className="text-3xl mb-4">{sectorMeta[p.sector]?.emoji}</div>
                <p className="text-[9px] tracking-[2px] uppercase text-[#d4956a] mb-1.5">{p.brand?.name}</p>
                <h3 className="font-playfair text-xl font-semibold text-[#f7f3ec] mb-2">{p.name}</h3>
                {p.spec && <p className="text-sm text-[#8899aa] leading-relaxed">{p.spec}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
