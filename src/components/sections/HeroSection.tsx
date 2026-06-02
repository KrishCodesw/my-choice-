'use client'
import { useEffect, useRef } from 'react'
import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

const sectors = ['Electrical', 'Hardware', 'Sanitary Ware']

export function HeroSection({ settings }: Props) {
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.style.transform = 'scaleX(1)'
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen bg-[#0D0D0D] grid-texture flex flex-col justify-between pt-14 overflow-hidden">

      {/* Big background number */}
      <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[#F0EDE6]/[0.02] leading-none"
          style={{ fontSize: 'clamp(200px, 35vw, 480px)' }}>
          01
        </span>
      </div>

      {/* Top strip */}
      <div className="border-b border-[#232323] flex items-center justify-between px-6 md:px-10 py-3 mt-14">
        <div className="flex items-center gap-6">
          {sectors.map((s, i) => (
            <span key={s} className="text-label-sm text-[#7A7A7A] flex items-center gap-2">
              {i > 0 && <span className="text-[#2A2A2A]">·</span>}
              {s}
            </span>
          ))}
        </div>
        <span className="text-label-sm text-[#7A7A7A]">
          {settings?.address?.split('\n').pop() ?? 'Mumbai'}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-12">
        <div className="max-w-7xl w-full">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6"
            style={{ opacity: 0, animation: 'fadeIn 0.6s ease forwards 0.2s' }}>
            <div className="w-6 h-px bg-[#E8892A]" />
            <span className="text-label text-[#E8892A]">Exclusive Showroom</span>
          </div>

          {/* Headline — asymmetric */}
          <div style={{ opacity: 0, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.3s' }}>
            <h1 className="font-serif text-huge text-[#F0EDE6] leading-none">
              My
            </h1>
            <div className="flex items-end gap-6 md:gap-10">
              <h1 className="font-serif text-huge text-[#E8892A] italic leading-none">
                Choice
              </h1>
              {/* Vertical text — desktop only */}
              <div className="hidden lg:flex flex-col justify-end pb-2 gap-1">
                <span className="text-label-sm text-[#7A7A7A] writing-mode-vertical"
                  style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
                  EST. MUMBAI
                </span>
              </div>
            </div>
          </div>

          {/* Sub + Stats row */}
          <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#232323]"
            style={{ opacity: 0, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.6s' }}>
            {[
              { num: settings?.stats?.yearsInBusiness ?? '15+', label: 'Years' },
              { num: settings?.stats?.brandsStocked    ?? '50+', label: 'Brands' },
              { num: settings?.stats?.projectsSupplied ?? '500+', label: 'Projects' },
            ].map((s, i) => (
              <div key={s.label} className={`py-6 px-0 md:px-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-[#232323]' : ''}`}>
                <div className="font-serif text-[#F0EDE6] text-5xl md:text-6xl">{s.num}</div>
                <div className="text-label text-[#7A7A7A] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div className="border-t border-[#232323] grid grid-cols-3 divide-x divide-[#232323]"
        style={{ opacity: 0, animation: 'fadeIn 0.8s ease forwards 0.9s' }}>
        {[
          { label: 'Browse Products', href: '#products', primary: false },
          { label: 'Book 1:1 with Owner', href: '#booking', primary: true },
          { label: 'Find a Worker', href: '#workers', primary: false },
        ].map(b => (
          <a key={b.href} href={b.href}
            className={`flex items-center justify-center py-4 text-label transition-all duration-200 ${
              b.primary
                ? 'bg-[#E8892A] text-[#0D0D0D] hover:bg-[#F0EDE6]'
                : 'text-[#7A7A7A] hover:text-[#F0EDE6] hover:bg-[#1A1A1A]'
            }`}>
            {b.label}
          </a>
        ))}
      </div>
    </section>
  )
}
