'use client'
import { useEffect, useRef } from 'react'
import type { Product } from '@/types'

interface Props { arrivals: Product[] }

const fallback = [
  { _id:'1', name:'Arteor Modular Switches', brand:{ name:'Legrand'  }, sector:'electrical' as const, spec:'4 finishes — white, champagne, graphite, mirror', isNew:true, isFeatured:true  },
  { _id:'2', name:'Opal Shower System',      brand:{ name:'Jaquar'   }, sector:'sanitary'   as const, spec:'Overhead + handheld + thermostatic · Complete set', isNew:true, isFeatured:true  },
  { _id:'3', name:'Concealed Door Closer',   brand:{ name:'Hafele'   }, sector:'hardware'   as const, spec:'Adjustable speed · Fire rated · Up to 80kg doors',  isNew:true, isFeatured:false },
]

const emoji: Record<string, string> = { electrical:'⚡', hardware:'🔧', sanitary:'🚿' }

export function NewArrivalsSection({ arrivals }: Props) {
  const ref  = useRef<HTMLElement>(null)
  const display = arrivals.length > 0 ? arrivals : fallback

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="arrivals" ref={ref} className="bg-[#1C2B1A] border-t border-[#2E3D2C]">

      {/* Section header */}
      <div className="border-b border-[#2E3D2C] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-fraunces text-[#2E3D2C] text-3xl font-light select-none">03</span>
          <span className="w-px h-5 bg-[#2E3D2C]" />
          <span className="label text-[#F4F4F0]">New Arrivals</span>
        </div>
        <span className="label-sm text-[#8A8A7A]">Updated regularly</span>
      </div>

      {/* Ticker */}
      <div className="border-b border-[#2E3D2C] bg-[#3D6B45] py-3 overflow-hidden">
        <div className="ticker-track flex gap-10 w-max">
          {[...display, ...display].map((p, i) => (
            <span key={i} className="label text-[#1C2B1A] whitespace-nowrap flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#1C2B1A] opacity-50" />
              {p.brand?.name} — {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2E3D2C]">
        {display.slice(0, 3).map((p, i) => (
          <div key={p._id}
            className="reveal p-8 md:p-10 flex flex-col gap-6 hover:bg-[#243524] transition-colors duration-300"
            style={{ transitionDelay: `${i * 80}ms` }}>

            {/* Index + badge */}
            <div className="flex items-center justify-between">
              <span className="font-fraunces text-[#2E3D2C] text-5xl leading-none select-none">0{i + 1}</span>
              <span className="label-sm text-[#3D6B45] border border-[#3D6B45] px-2 py-0.5">New</span>
            </div>

            {/* Image / placeholder */}
            <div className="aspect-video bg-[#243524] border border-[#2E3D2C] flex items-center justify-center overflow-hidden">
              {(p as Product).image?.asset?.url ? (
                <img src={`${(p as Product).image!.asset.url}?w=600&h=400&fit=crop&auto=format`}
                  alt={p.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl opacity-15">{emoji[p.sector]}</span>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="label-sm text-[#3D6B45] mb-2">{p.brand?.name}</p>
              <h3 className="font-fraunces text-[#F4F4F0] text-2xl leading-snug mb-3">{p.name}</h3>
              {p.spec && <p className="text-sm text-[#8A8A7A] leading-relaxed">{p.spec}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
