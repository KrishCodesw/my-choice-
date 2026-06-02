'use client'
import { useState, useRef, useEffect } from 'react'
import { Plus, Check, ArrowRight } from 'lucide-react'
import { useCartContext } from '@/components/shared/CartProvider'
import type { Product, Sector } from '@/types'

interface Props { products: Product[] }

const sectors: { value: Sector; label: string; short: string }[] = [
  { value: 'electrical', label: 'Electrical',    short: '⚡' },
  { value: 'hardware',   label: 'Hardware',      short: '🔧' },
  { value: 'sanitary',   label: 'Sanitary Ware', short: '🚿' },
]

export function ProductsSection({ products }: Props) {
  const [active, setActive] = useState<Sector>('electrical')
  const [added, setAdded] = useState<Set<string>>(new Set())
  const { addItem, setIsOpen } = useCartContext()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [active])

  const filtered = products.filter(p => p.sector === active)

  const handleAdd = (p: Product) => {
    addItem({ productId: p._id, name: p.name, brand: p.brand?.name ?? '', sector: p.sector })
    setAdded(prev => new Set([...prev, p._id]))
    setTimeout(() => setAdded(prev => { const s = new Set(prev); s.delete(p._id); return s }), 1800)
  }

  return (
    <section id="products" ref={ref} className="bg-[#F0EDE6] text-[#0D0D0D]">

      {/* Section header */}
      <div className="border-b border-[#0D0D0D]/10 px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">02</span>
          <span className="w-px h-4 bg-[#0D0D0D]/20" />
          <span className="text-label text-[#0D0D0D]">What We Stock</span>
        </div>
        <button onClick={() => setIsOpen(true)}
          className="text-label text-[#E8892A] hover:text-[#0D0D0D] transition-colors flex items-center gap-1.5">
          View Quote List <ArrowRight size={10} />
        </button>
      </div>

      {/* Sector tabs */}
      <div className="border-b border-[#0D0D0D]/10 flex">
        {sectors.map((s, i) => (
          <button key={s.value} onClick={() => setActive(s.value)}
            className={`flex-1 py-4 text-label transition-all duration-200 border-r border-[#0D0D0D]/10 last:border-r-0 relative ${
              active === s.value
                ? 'text-[#0D0D0D]'
                : 'text-[#7A7A7A] hover:text-[#0D0D0D]'
            }`}>
            {active === s.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8892A]" />
            )}
            <span className="hidden md:inline">{s.label}</span>
            <span className="md:hidden">{s.short} {s.label}</span>
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="px-10 py-20 text-center text-[#7A7A7A]">
          <p className="font-serif italic text-2xl">No products yet.</p>
          <p className="text-sm mt-2">Add products in Sanity Studio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-[#0D0D0D]/10">
          {filtered.map((p, i) => {
            const isAdded = added.has(p._id)
            return (
              <div key={p._id} className="reveal group flex flex-col p-6 md:p-8 hover:bg-white transition-colors duration-200"
                style={{ transitionDelay: `${i * 40}ms` }}>

                {/* Badges */}
                <div className="flex gap-2 mb-5 min-h-[20px]">
                  {p.isNew && (
                    <span className="text-label-sm text-[#E8892A] border border-[#E8892A] px-2 py-0.5">New</span>
                  )}
                  {p.isFeatured && (
                    <span className="text-label-sm text-[#0D0D0D] border border-[#0D0D0D] px-2 py-0.5">Top Pick</span>
                  )}
                </div>

                {/* Image or placeholder */}
                <div className="aspect-square bg-[#F0EDE6] border border-[#0D0D0D]/8 mb-5 flex items-center justify-center overflow-hidden">
                  {p.image?.asset?.url ? (
                    <img src={`${p.image.asset.url}?w=400&h=400&fit=crop&auto=format`}
                      alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl opacity-30">
                      {p.sector === 'electrical' ? '⚡' : p.sector === 'hardware' ? '🔧' : '🚿'}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-label-sm text-[#E8892A] mb-1">{p.brand?.name}</p>
                  {p.category && <p className="text-label-sm text-[#7A7A7A] mb-2">{p.category}</p>}
                  <h3 className="font-serif text-[#0D0D0D] text-lg leading-tight mb-2">{p.name}</h3>
                  {p.spec && <p className="text-xs text-[#7A7A7A] leading-relaxed line-clamp-2">{p.spec}</p>}
                </div>

                {/* Add button */}
                <button onClick={() => handleAdd(p)}
                  className={`mt-5 w-full py-2.5 flex items-center justify-center gap-2 text-label transition-all duration-200 ${
                    isAdded
                      ? 'bg-[#0D0D0D] text-[#F0EDE6]'
                      : 'border border-[#0D0D0D] text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#F0EDE6]'
                  }`}>
                  {isAdded ? <><Check size={11} /> Added</> : <><Plus size={11} /> Add to Quote</>}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Footer strip */}
      <div className="border-t border-[#0D0D0D]/10 px-6 md:px-10 py-4 flex items-center justify-between">
        <p className="text-label-sm text-[#7A7A7A]">
          {filtered.length} products in {sectors.find(s => s.value === active)?.label}
        </p>
        <button onClick={() => setIsOpen(true)}
          className="text-label bg-[#E8892A] text-[#0D0D0D] px-5 py-2 hover:bg-[#0D0D0D] hover:text-[#F0EDE6] transition-colors">
          Get Quote on WhatsApp →
        </button>
      </div>
    </section>
  )
}
