'use client'
import { openWhatsApp, waMessages } from '@/lib/utils'
import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

export function FindUsSection({ settings }: Props) {
  return (
    <section id="contact" className="bg-[#EEEEE8] border-t border-[#DDDDD5]">

      {/* Header */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center gap-4">
        <span className="font-fraunces text-[#DDDDD5] text-3xl font-light select-none">09</span>
        <span className="w-px h-5 bg-[#DDDDD5]" />
        <span className="label text-[#1C2B1A]">Find Us</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DDDDD5]">

        {/* Details */}
        <div className="divide-y divide-[#DDDDD5]">
          {[
            { icon:'📍', label:'Address',          value: settings?.address ?? 'Shop No. XX, [Street]\nMumbai — 400 0XX'                                                   },
            { icon:'⏰', label:'Store Hours',       value: `Mon–Sat: ${settings?.mondayToSaturday ?? '10:00 AM – 8:00 PM'}\nSunday: ${settings?.sunday ?? '11:00 AM – 6:00 PM'}` },
            { icon:'📞', label:'Phone & WhatsApp',  value: settings?.phone ?? '+91 XXXXX XXXXX'                                                                             },
            { icon:'📸', label:'Instagram',         value: settings?.instagramHandle ? `@${settings.instagramHandle}` : '@mychoice.mumbai'                                  },
          ].map(d => (
            <div key={d.label} className="flex gap-5 px-6 md:px-10 py-7 hover:bg-[#E6E6DE] transition-colors duration-200">
              <span className="text-xl flex-shrink-0 mt-0.5">{d.icon}</span>
              <div>
                <p className="label-sm text-[#3D6B45] mb-1">{d.label}</p>
                <p className="text-sm text-[#1C2B1A] leading-relaxed whitespace-pre-line">{d.value}</p>
              </div>
            </div>
          ))}
          <div className="px-6 md:px-10 py-7">
            <button onClick={() => openWhatsApp(waMessages.directions())}
              className="label text-[#F4F4F0] bg-[#3D6B45] px-7 py-3.5 hover:bg-[#1C2B1A] transition-colors duration-200">
              Get Directions via WhatsApp →
            </button>
          </div>
        </div>

        {/* Map */}
        <div className="relative min-h-[300px] bg-[#E6E6DE] flex flex-col items-center justify-center gap-3"
          style={{
            backgroundImage: 'linear-gradient(rgba(61,107,69,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,107,69,0.06) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}>
          <span className="text-5xl">📍</span>
          <p className="label-sm text-[#8A8A7A]">Google Maps Here</p>
          <p className="text-xs text-[#AEAE9E]">Add embed URL in Site Settings</p>
        </div>
      </div>
    </section>
  )
}
