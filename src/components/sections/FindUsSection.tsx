'use client'
import { openWhatsApp, waMessages } from '@/lib/utils'
import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

export function FindUsSection({ settings }: Props) {
  return (
    <section id="contact" className="bg-[#0D0D0D] border-t border-[#232323]">

      {/* Header */}
      <div className="border-b border-[#232323] px-6 md:px-10 py-5 flex items-center gap-4">
        <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">09</span>
        <span className="w-px h-4 bg-[#232323]" />
        <span className="text-label text-[#F0EDE6]">Find Us</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#232323]">

        {/* Contact details */}
        <div className="divide-y divide-[#232323]">
          {[
            { label: 'Address',          value: settings?.address          ?? 'Shop No. XX, [Street]\nMumbai — 400 0XX',        icon: '📍' },
            { label: 'Hours',            value: `Mon–Sat: ${settings?.mondayToSaturday ?? '10am–8pm'}\nSunday: ${settings?.sunday ?? '11am–6pm'}`, icon: '⏰' },
            { label: 'Phone & WhatsApp', value: settings?.phone            ?? '+91 XXXXX XXXXX',                                icon: '📞' },
            { label: 'Instagram',        value: settings?.instagramHandle  ? `@${settings.instagramHandle}` : '@mychoice.mumbai', icon: '📸' },
          ].map(d => (
            <div key={d.label} className="flex gap-5 px-6 md:px-10 py-7">
              <span className="text-xl flex-shrink-0 mt-0.5">{d.icon}</span>
              <div>
                <p className="text-label-sm text-[#E8892A] mb-1">{d.label}</p>
                <p className="text-[#F0EDE6] text-sm leading-relaxed whitespace-pre-line">{d.value}</p>
              </div>
            </div>
          ))}

          <div className="px-6 md:px-10 py-7">
            <button onClick={() => openWhatsApp(waMessages.directions())}
              className="text-label text-[#0D0D0D] bg-[#E8892A] px-6 py-3 hover:bg-[#F0EDE6] transition-colors duration-200">
              Get Directions via WhatsApp →
            </button>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative min-h-[320px] bg-[#1A1A1A] grid-texture flex flex-col items-center justify-center gap-3">
          <span className="text-5xl">📍</span>
          <p className="text-label-sm text-[#7A7A7A]">Google Maps Here</p>
          <p className="text-xs text-[#3A3A3A]">Add embed URL in Site Settings</p>
        </div>
      </div>
    </section>
  )
}
