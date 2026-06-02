'use client'
import { useEffect, useRef } from 'react'
import type { Product } from '@/types'

interface Props { arrivals: Product[] }

const fallback = [
  { _id: '1', name: 'Arteor Modular Switches', brand: { name: 'Legrand' }, sector: 'electrical' as const, spec: 'Available in 4 finishes — white, champagne, graphite, mirror', isNew: true, isFeatured: true },
  { _id: '2', name: 'Opal Shower System',      brand: { name: 'Jaquar'  }, sector: 'sanitary'   as const, spec: 'Overhead + handheld + thermostatic control · Complete set',  isNew: true, isFeatured: true },
  { _id: '3', name: 'Concealed Door Closer',   brand: { name: 'Hafele'  }, sector: 'hardware'   as const, spec: 'Adjustable closing speed · Fire rated · For doors up to 80kg', isNew: true, isFeatured: false },
]

export function NewArrivalsSection({ arrivals }: Props) {
  const ref = useRef<HTMLElement>(null)
  const display = arrivals.length > 0 ? arrivals : fallback

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="arrivals" ref={ref} className="bg-[#0D0D0D] border-t border-[#232323]">

      {/* Header */}
      <div className="border-b border-[#232323] px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">03</span>
          <span className="w-px h-4 bg-[#232323]" />
          <span className="text-label text-[#F0EDE6]">New Arrivals</span>
        </div>
        <span className="text-label-sm text-[#7A7A7A]">Fresh stock · Updated regularly</span>
      </div>

      {/* Ticker */}
      <div className="border-b border-[#232323] py-3 overflow-hidden bg-[#E8892A]">
        <div className="ticker-track flex gap-12 w-max">
          {[...display, ...display].map((p, i) => (
            <span key={i} className="text-label text-[#0D0D0D] whitespace-nowrap flex items-center gap-3">
              <span className="w-1 h-1 bg-[#0D0D0D] rounded-full" />
              {p.brand?.name} — {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#232323]">
        {display.slice(0, 3).map((p, i) => (
          <div key={p._id}
            className="reveal p-8 md:p-10 flex flex-col gap-6 hover:bg-[#1A1A1A] transition-colors duration-300"
            style={{ transitionDelay: `${i * 100}ms` }}>

            {/* Number + New badge */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[#232323] text-5xl font-bold leading-none">
                0{i + 1}
              </span>
              <span className="text-label-sm text-[#E8892A] border border-[#E8892A] px-2 py-0.5">
                New
              </span>
            </div>

            {/* Image placeholder */}
            <div className="aspect-video bg-[#1A1A1A] border border-[#232323] flex items-center justify-center">
              {(p as Product).image?.asset?.url ? (
                <img
                  src={`${(p as Product).image!.asset.url}?w=600&h=400&fit=crop&auto=format`}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-5xl opacity-20">
                  {p.sector === 'electrical' ? '⚡' : p.sector === 'hardware' ? '🔧' : '🚿'}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-label-sm text-[#E8892A] mb-2">{p.brand?.name}</p>
              <h3 className="font-serif text-[#F0EDE6] text-2xl leading-tight mb-3">{p.name}</h3>
              {p.spec && <p className="text-sm text-[#7A7A7A] leading-relaxed">{p.spec}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
