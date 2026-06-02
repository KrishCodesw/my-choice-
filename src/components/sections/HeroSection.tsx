'use client'
import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

export function HeroSection({ settings }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height } = el.getBoundingClientRect()
      const x = (clientX / width  - 0.5) * 20
      const y = (clientY / height - 0.5) * 10
      const glow = el.querySelector('.hero-glow') as HTMLElement | null
      if (glow) {
        glow.style.transform = `translate(${x * 2}px, ${y * 2}px)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const stats = [
    { num: settings?.stats?.yearsInBusiness ?? '15+', label: 'Years' },
    { num: settings?.stats?.brandsStocked ?? '50+', label: 'Brands' },
    { num: settings?.stats?.projectsSupplied ?? '500+', label: 'Projects' },
  ]

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen bg-[#0f1923] flex items-end overflow-hidden section-grid-bg"
    >
      {/* Animated glow blob */}
      <div className="hero-glow absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#b87333]/8 blur-[120px] pointer-events-none transition-transform duration-700 ease-out" />
      <div className="absolute bottom-1/3 left-1/5 w-[400px] h-[400px] rounded-full bg-[#b87333]/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-32">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-8"
            style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards 0.3s' }}
          >
            <div className="w-8 h-px bg-[#b87333]" />
            <span className="text-[11px] tracking-[3px] uppercase text-[#d4956a] font-medium">
              {settings?.address?.split('\n')[1] ?? "Mumbai's Exclusive Showroom"}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-playfair text-display font-black text-[#f7f3ec] mb-3"
            style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards 0.5s' }}
          >
            MY<br />
            <span className="text-[#b87333] italic">CHOICE</span>
          </h1>

          {/* Sub headline */}
          <p
            className="font-cormorant italic text-[clamp(20px,2.5vw,30px)] text-[#8899aa] font-light mb-10"
            style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards 0.65s' }}
          >
            Electric · Hardware · Sanitary Ware
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3"
            style={{ opacity: 0, animation: 'fadeUp 0.7s ease forwards 0.8s' }}
          >
            <a href="#products" className="bg-[#b87333] text-[#f7f3ec] px-7 py-3.5 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#d4956a] transition-colors">
              Browse Products
            </a>
            <a href="#booking" className="border border-[#f7f3ec]/20 text-[#f7f3ec] px-7 py-3.5 text-[12px] tracking-[1.5px] uppercase font-medium hover:border-[#b87333] hover:text-[#d4956a] transition-colors">
              Book 1:1
            </a>
            <a href="#workers" className="border border-[#f7f3ec]/20 text-[#f7f3ec] px-7 py-3.5 text-[12px] tracking-[1.5px] uppercase font-medium hover:border-[#b87333] hover:text-[#d4956a] transition-colors">
              Find a Worker
            </a>
          </div>
        </div>

        {/* Right side stats — desktop only */}
        <div
          className="hidden lg:flex flex-col gap-7 absolute right-6 top-1/2 -translate-y-1/2"
          style={{ opacity: 0, animation: 'fadeIn 1s ease forwards 1.2s' }}
        >
          {stats.map(s => (
            <div key={s.label} className="text-right pr-5 border-r border-[#b87333]/30">
              <div className="font-playfair text-4xl font-bold text-[#d4956a] leading-none">{s.num}</div>
              <div className="text-[10px] tracking-[2px] uppercase text-[#8899aa] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8899aa] hover:text-[#d4956a] transition-colors"
        style={{ opacity: 0, animation: 'fadeIn 1s ease forwards 1.5s' }}
      >
        <span className="text-[9px] tracking-[3px] uppercase">Explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#b87333] to-transparent" />
        <ArrowDown size={14} />
      </a>
    </section>
  )
}
