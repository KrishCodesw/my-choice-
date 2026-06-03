'use client'
import { useEffect, useRef } from 'react'
import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

export function HeroSection({ settings }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Parallax glow on mouse move
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const glow = el.querySelector('.hero-glow') as HTMLElement
      if (!glow) return
      const x = (e.clientX / window.innerWidth  - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      glow.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const stats = [
    { num: settings?.stats?.yearsInBusiness  ?? '15+', label: 'Years' },
    { num: settings?.stats?.brandsStocked    ?? '50+', label: 'Brands' },
    { num: settings?.stats?.projectsSupplied ?? '500+', label: 'Projects' },
  ]

  return (
    <section id="home" ref={ref}
      className="relative min-h-screen bg-[#F4F4F0] flex flex-col overflow-hidden pt-14">

      {/* Decorative background blob */}
      <div className="hero-glow absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[#3D6B45]/8 blur-[100px] pointer-events-none transition-transform duration-700 ease-out" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#3D6B45]/5 blur-[80px] pointer-events-none" />

      {/* Top meta strip */}
      <div className="border-b border-[#DDDDD5] flex items-center justify-between px-6 md:px-10 py-3 mt-0">
        <div className="flex items-center gap-5">
          {['Electrical', 'Hardware', 'Sanitary Ware'].map((s, i) => (
            <span key={s} className="flex items-center gap-4">
              {i > 0 && <span className="w-px h-3 bg-[#DDDDD5]" />}
              <span className="label-sm text-[#AEAE9E]">{s}</span>
            </span>
          ))}
        </div>
        <span className="label-sm text-[#AEAE9E] hidden md:block">
          {settings?.address?.split('\n').pop() ?? 'Mumbai'}
        </span>
      </div>

      {/* Main hero content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 py-12 md:py-16 max-w-7xl w-full mx-auto relative z-10">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8"
          style={{ opacity: 0, animation: 'fadeIn 0.6s ease forwards 0.2s' }}>
          <div className="w-7 h-px bg-[#3D6B45]" />
          <span className="label text-[#3D6B45]">Exclusive Showroom</span>
        </div>

        {/* Headline */}
        <div className="mb-8" style={{ opacity: 0, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.35s' }}>
          <h1 className="font-fraunces text-display text-[#1C2B1A] leading-none">
            My
          </h1>
          <h1 className="font-fraunces text-display text-[#3D6B45] italic leading-none">
            Choice
          </h1>
        </div>

        {/* Sub */}
        <p className="font-fraunces italic text-[#8A8A7A] text-xl md:text-2xl mb-10 font-light"
          style={{ opacity: 0, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.5s' }}>
          Electric · Hardware · Sanitary Ware
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-16"
          style={{ opacity: 0, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.65s' }}>
          <a href="#products"
            className="label text-[#F4F4F0] bg-[#1C2B1A] px-7 py-3.5 hover:bg-[#3D6B45] transition-colors duration-200">
            Browse Products
          </a>
          <a href="#booking"
            className="label text-[#1C2B1A] border border-[#DDDDD5] px-7 py-3.5 hover:border-[#3D6B45] hover:text-[#3D6B45] transition-colors duration-200">
            Book 1:1 with Owner
          </a>
          <a href="#workers"
            className="label text-[#1C2B1A] border border-[#DDDDD5] px-7 py-3.5 hover:border-[#3D6B45] hover:text-[#3D6B45] transition-colors duration-200">
            Find a Worker
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 border-t border-[#DDDDD5] max-w-lg"
          style={{ opacity: 0, animation: 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards 0.8s' }}>
          {stats.map((s, i) => (
            <div key={s.label} className={`pt-5 pr-6 ${i > 0 ? 'pl-6 border-l border-[#DDDDD5]' : ''}`}>
              <div className="font-fraunces text-[#3D6B45] text-4xl md:text-5xl leading-none mb-1">{s.num}</div>
              <div className="label-sm text-[#AEAE9E]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a href="#products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#AEAE9E] hover:text-[#3D6B45] transition-colors"
        style={{ opacity: 0, animation: 'fadeIn 1s ease forwards 1.4s' }}>
        <span className="label-sm">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#3D6B45] to-transparent" />
      </a>
    </section>
  )
}
