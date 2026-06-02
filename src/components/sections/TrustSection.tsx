'use client'
import { useEffect, useRef } from 'react'
import type { Testimonial, Brand, SiteSettings } from '@/types'

interface Props { testimonials: Testimonial[]; brands: Brand[]; settings: SiteSettings | null }

export function TrustSection({ testimonials, brands, settings }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const stats = settings?.stats
  const fallbackTestimonials = [
    { _id: '1', name: 'Rahul Mehta',        role: 'Homeowner, Andheri West', rating: 5, quote: "Sourced all electrical fittings for our 4BHK from MyChoice. The owner personally guided us through every product. Wouldn't go anywhere else." },
    { _id: '2', name: 'Priya Kapoor',       role: 'Architect, Bandra',       rating: 5, quote: "As an architect I've tried every hardware store in Mumbai. MyChoice is the only one that stocks what I need — and the Jaquar range is unmatched." },
    { _id: '3', name: 'Suresh Electricals', role: 'Contractor, Borivali',    rating: 5, quote: "Trade pricing, fast availability, and they know their products inside out. Our go-to for every project across Mumbai." },
  ]
  const displayTestimonials = testimonials.length > 0 ? testimonials.slice(0, 3) : fallbackTestimonials

  return (
    <section id="trust" ref={ref} className="bg-[#F0EDE6] text-[#0D0D0D]">

      {/* Header */}
      <div className="border-b border-[#0D0D0D]/10 px-6 md:px-10 py-5 flex items-center gap-4">
        <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">04</span>
        <span className="w-px h-4 bg-[#0D0D0D]/20" />
        <span className="text-label text-[#0D0D0D]">Why MyChoice</span>
      </div>

      {/* Stats — big numbers row */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#0D0D0D]/10 border-b border-[#0D0D0D]/10">
        {[
          { num: stats?.yearsInBusiness  ?? '15+', label: 'Years in Business'  },
          { num: stats?.brandsStocked    ?? '50+', label: 'Brands Stocked'     },
          { num: stats?.projectsSupplied ?? '500+', label: 'Projects Supplied' },
          { num: '3',                               label: 'Complete Sectors'  },
        ].map((s, i) => (
          <div key={i} className="reveal px-6 md:px-10 py-10" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="font-serif text-[#0D0D0D] text-5xl md:text-6xl mb-2">{s.num}</div>
            <div className="text-label text-[#7A7A7A]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0D0D0D]/10 border-b border-[#0D0D0D]/10">
        {displayTestimonials.map((t, i) => (
          <div key={t._id} className="reveal p-8 md:p-10 flex flex-col gap-5"
            style={{ transitionDelay: `${i * 100}ms` }}>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} className="text-[#E8892A] text-xs">★</span>
              ))}
            </div>

            <blockquote className="font-serif italic text-[#0D0D0D] text-xl leading-snug flex-1">
              "{t.quote}"
            </blockquote>

            <div className="border-t border-[#0D0D0D]/10 pt-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-[#0D0D0D]">{t.name}</p>
                {t.role && <p className="text-label-sm text-[#7A7A7A] mt-0.5">{t.role}</p>}
              </div>
              {(t as import("@/types").Testimonial).projectPhoto && (
                <span className="text-label-sm text-[#E8892A] border border-[#E8892A]/30 px-2 py-0.5">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Brands row */}
      <div className="px-6 md:px-10 py-8">
        <p className="text-label text-[#7A7A7A] mb-6">Brands We Stock</p>
        <div className="flex flex-wrap gap-0 border border-[#0D0D0D]/10">
          {(brands.length > 0 ? brands : [
            { _id:'1', name:'Havells', sector:'electrical' as const },
            { _id:'2', name:'Jaquar',  sector:'sanitary'   as const },
            { _id:'3', name:'Anchor',  sector:'electrical' as const },
            { _id:'4', name:'Kohler',  sector:'sanitary'   as const },
            { _id:'5', name:'Hettich', sector:'hardware'   as const },
            { _id:'6', name:'Legrand', sector:'electrical' as const },
          ]).map((b, i, arr) => (
            <div key={b._id}
              className={`px-6 py-5 border-r border-b border-[#0D0D0D]/10 hover:bg-[#0D0D0D] hover:text-[#F0EDE6] transition-colors duration-200 group ${
                i === arr.length - 1 ? 'border-r-0' : ''
              }`}>
              <div className="font-serif text-xl text-[#0D0D0D] group-hover:text-[#F0EDE6] transition-colors">{b.name}</div>
              <div className="text-label-sm text-[#7A7A7A] group-hover:text-[#7A7A7A] mt-0.5 capitalize">{b.sector}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
