"use client";
import { openWhatsApp, waMessages } from "@/lib/utils";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export function FindUsSection({ settings }: Props) {
  return (
    <section id="contact" className="bg-[#0f1923] py-24 px-6 section-grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">
            Visit Us
          </p>
          <h2 className="font-playfair text-headline font-bold text-[#f7f3ec]">
            FIND <em className="text-[#b87333]">US</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Details */}
          <div className="space-y-0 divide-y divide-[#b87333]/10">
            {[
              {
                icon: "📍",
                label: "Address",
                value:
                  settings?.address ??
                  "Shop No. XX, [Street Name]\nMumbai — 400 0XX",
              },
              {
                icon: "⏰",
                label: "Store Hours",
                value: `Mon – Sat: ${settings?.mondayToSaturday ?? "10:00 AM – 8:00 PM"}\nSunday: ${settings?.sunday ?? "11:00 AM – 6:00 PM"}`,
              },
              {
                icon: "📞",
                label: "Phone & WhatsApp",
                value: settings?.phone ?? "+91 XXXXX XXXXX",
              },
              {
                icon: "📸",
                label: "Instagram",
                value: settings?.instagramHandle
                  ? `@${settings.instagramHandle}`
                  : "@mychoice.mumbai",
              },
            ].map((d) => (
              <div key={d.label} className="flex gap-4 py-6">
                <span className="text-2xl flex-shrink-0 mt-0.5">{d.icon}</span>
                <div>
                  <p className="text-[10px] tracking-[2px] uppercase text-[#b87333] font-medium mb-1">
                    {d.label}
                  </p>
                  <p className="text-[#f7f3ec] text-sm leading-relaxed whitespace-pre-line">
                    {d.value}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <button
                onClick={() => openWhatsApp(waMessages.directions())}
                className="bg-[#b87333] text-[#f7f3ec] px-7 py-3.5 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#d4956a] transition-colors"
              >
                Get Directions via WhatsApp →
              </button>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="aspect-[4/3] bg-[#162030] border border-[#b87333]/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(184,115,51,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(184,115,51,0.06) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <span className="text-5xl relative z-10 animate-bounce">📍</span>
            <p className="text-[11px] tracking-[2px] uppercase text-[#8899aa] relative z-10">
              Google Maps Embed Here
            </p>
            <p className="text-xs text-[#8899aa]/60 relative z-10">
              Add your Google Maps embed URL in Site Settings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
