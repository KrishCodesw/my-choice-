'use client'
import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

export function OwnerSection({ settings }: Props) {
  return (
    <section id="owner" className="bg-[#0D0D0D] border-t border-[#232323]">

      {/* Header */}
      <div className="border-b border-[#232323] px-6 md:px-10 py-5 flex items-center gap-4">
        <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">07</span>
        <span className="w-px h-4 bg-[#232323]" />
        <span className="text-label text-[#F0EDE6]">The Owner</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#232323]">

        {/* Photo */}
        <div className="relative min-h-[360px] lg:min-h-[500px] bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
          {settings?.ownerPhoto?.asset?.url ? (
            <img
              src={`${settings.ownerPhoto.asset.url}?w=800&h=800&fit=crop&auto=format`}
              alt={settings.ownerName ?? 'Owner'}
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 opacity-20">
              <span className="text-8xl">👤</span>
              <span className="text-label-sm text-[#7A7A7A]">Owner Photo</span>
            </div>
          )}
          {/* Amber corner accent */}
          <div className="absolute bottom-0 left-0 w-1 h-20 bg-[#E8892A]" />
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 py-12 flex flex-col gap-8 relative overflow-hidden">

          {/* Big quote mark */}
          <span className="absolute right-8 top-6 font-serif text-[#F0EDE6]/[0.04] text-[180px] leading-none select-none pointer-events-none">"</span>

          <blockquote className="font-serif italic text-[#F0EDE6] text-2xl md:text-3xl leading-snug relative z-10 border-l-2 border-[#E8892A] pl-6">
            "I've spent 15 years making sure every customer walks out with exactly what they need — and nothing they don't."
          </blockquote>

          <div>
            <h2 className="font-serif text-[#F0EDE6] text-3xl mb-1">
              {settings?.ownerName ?? 'The Owner'}
            </h2>
            <p className="text-label-sm text-[#E8892A] mb-5">
              {settings?.ownerTitle ?? 'Founder · MyChoice Electric & Hardware'}
            </p>
            <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-md">
              {settings?.ownerBio ?? "With over 15 years of experience in electrical, hardware and sanitary ware, MyChoice was built on one principle — deep product knowledge and honest guidance."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}`}
              target="_blank" rel="noopener noreferrer"
              className="text-label text-[#0D0D0D] bg-[#E8892A] px-5 py-2.5 hover:bg-[#F0EDE6] transition-colors">
              WhatsApp
            </a>
            {settings?.instagramHandle && (
              <a href={`https://instagram.com/${settings.instagramHandle}`}
                target="_blank" rel="noopener noreferrer"
                className="text-label text-[#F0EDE6] border border-[#232323] px-5 py-2.5 hover:border-[#E8892A] hover:text-[#E8892A] transition-colors">
                Instagram
              </a>
            )}
            <a href="#booking"
              className="text-label text-[#F0EDE6] border border-[#232323] px-5 py-2.5 hover:border-[#E8892A] hover:text-[#E8892A] transition-colors">
              Book 1:1 →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
