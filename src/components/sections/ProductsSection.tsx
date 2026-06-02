'use client'
import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import { useCartContext } from '@/components/shared/CartProvider'
import { sectorMeta } from '@/lib/utils'
import type { Product, Sector } from '@/types'

interface Props { products: Product[] }

const sectors: Sector[] = ['electrical', 'hardware', 'sanitary']

export function ProductsSection({ products }: Props) {
  const [activeSector, setActiveSector] = useState<Sector>('electrical')
  const [added, setAdded] = useState<Set<string>>(new Set())
  const { addItem, setIsOpen } = useCartContext()

  const filtered = products.filter(p => p.sector === activeSector)

  const handleAdd = (p: Product) => {
    addItem({
      productId: p._id,
      name: p.name,
      brand: p.brand?.name ?? '',
      sector: p.sector,
      image: p.image?.asset?.url,
    })
    setAdded(prev => new Set([...prev, p._id]))
    setTimeout(() => {
      setAdded(prev => { const s = new Set(prev); s.delete(p._id); return s })
    }, 1800)
  }

  return (
    <section id="products" className="bg-[#f7f3ec] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">Our Collection</p>
          <h2 className="font-playfair text-headline font-bold text-[#1a1a2e]">
            WHAT WE <em className="text-[#b87333]">STOCK</em>
          </h2>
          <p className="text-[#8a7d6e] text-sm mt-3 max-w-md leading-relaxed">
            Three sectors. Fifty brands. Add any product to your quote list and get pricing on WhatsApp instantly.
          </p>
        </div>

        {/* Sector tabs */}
        <div className="flex border border-[#ede7db] w-fit mb-10">
          {sectors.map(s => (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className={`px-6 py-3 text-[11px] tracking-[2px] uppercase font-medium transition-all duration-200 ${
                activeSector === s
                  ? 'bg-[#0f1923] text-[#d4956a]'
                  : 'text-[#8a7d6e] hover:text-[#b87333] hover:bg-[#ede7db]'
              } border-r border-[#ede7db] last:border-r-0`}
            >
              {sectorMeta[s].emoji} {sectorMeta[s].label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[#8a7d6e]">
            <p className="text-lg font-cormorant italic mb-2">No products yet in this sector.</p>
            <p className="text-sm">Add products via the Sanity Studio dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#ede7db]">
            {filtered.map(p => {
              const isAdded = added.has(p._id)
              return (
                <div key={p._id} className="bg-[#f7f3ec] hover:bg-white transition-colors group relative overflow-hidden p-6">
                  {/* New / Featured badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {p.isNew && (
                      <span className="bg-[#b87333] text-[#f7f3ec] text-[8px] tracking-[1.5px] uppercase px-2 py-0.5 font-semibold">New</span>
                    )}
                    {p.isFeatured && (
                      <span className="bg-[#0f1923] text-[#d4956a] text-[8px] tracking-[1.5px] uppercase px-2 py-0.5 font-semibold">Top Pick</span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#0f1923] rounded flex items-center justify-center text-2xl mb-4">
                    {sectorMeta[p.sector].emoji}
                  </div>

                  {/* Brand */}
                  <p className="text-[9px] tracking-[2px] uppercase text-[#b87333] font-semibold mb-1.5">{p.brand?.name}</p>

                  {/* Name */}
                  <h3 className="font-playfair text-lg font-semibold text-[#1a1a2e] leading-tight mb-2">{p.name}</h3>

                  {/* Category */}
                  {p.category && (
                    <p className="text-[10px] tracking-[1px] uppercase text-[#8a7d6e] mb-2">{p.category}</p>
                  )}

                  {/* Spec */}
                  {p.spec && (
                    <p className="text-xs text-[#8a7d6e] leading-relaxed mb-5 line-clamp-2">{p.spec}</p>
                  )}

                  {/* Add to quote */}
                  <button
                    onClick={() => handleAdd(p)}
                    className={`w-full py-2.5 flex items-center justify-center gap-2 text-[11px] tracking-[1.5px] uppercase font-medium transition-all duration-200 ${
                      isAdded
                        ? 'bg-[#2d6a4f] text-white'
                        : 'bg-[#0f1923] text-[#d4956a] hover:bg-[#b87333] hover:text-white'
                    }`}
                  >
                    {isAdded ? <><Check size={12} /> Added</> : <><Plus size={12} /> Add to Quote</>}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Quote CTA */}
        <div className="mt-8 flex items-center justify-between border-t border-[#ede7db] pt-6">
          <p className="text-sm text-[#8a7d6e]">Added products to your list?</p>
          <button
            onClick={() => setIsOpen(true)}
            className="text-[11px] tracking-[2px] uppercase text-[#b87333] border border-[#b87333] px-5 py-2.5 hover:bg-[#b87333] hover:text-white transition-colors font-medium"
          >
            View Quote List →
          </button>
        </div>
      </div>
    </section>
  )
}
