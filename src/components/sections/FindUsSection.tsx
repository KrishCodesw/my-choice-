"use client";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";

import { openWhatsApp, waMessages } from "@/lib/utils";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export function FindUsSection({ settings }: Props) {
  return (
    <section id="contact" className="bg-[#EEEEE8] border-t border-[#DDDDD5]">
      {/* Header */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center gap-4">
        <span className="font-fraunces text-[#1C2B1A] text-3xl font-light select-none">
          09
        </span>
        <span className="w-px h-5 bg-[#DDDDD5]" />
        <span className="label text-[#1C2B1A]">Find Us</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DDDDD5]">
        {/* Details */}
        <div className="divide-y divide-[#DDDDD5]">
          {[
            {
              icon: MapPin,
              label: "Address",
              value:
                settings?.address ?? "Shop No. XX, [Street]\nMumbai — 400 0XX",
            },
            {
              icon: Clock,
              label: "Store Hours",
              value: `Mon–Sat: ${settings?.mondayToSaturday ?? "09:00 AM – 09:00 PM"}\nSunday: ${settings?.sunday ?? "11:00 AM – 6:00 PM"}`,
            },
            {
              icon: Phone,
              label: "Phone & WhatsApp",
              value: settings?.phone ?? "+91 99206 70029",
            },
          ].map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex gap-5 px-6 md:px-10 py-7 hover:bg-[#E6E6DE] transition-colors duration-200"
              >
                <Icon
                  className="w-5 h-5 text-[#3D6B45] flex-shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="label-sm text-[#3D6B45] mb-1">{d.label}</p>
                  <p className="text-sm text-[#1C2B1A] leading-relaxed whitespace-pre-line">
                    {d.value}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="px-6 md:px-10 py-7">
            <button
              onClick={() => openWhatsApp(waMessages.directions())}
              className="label text-[#F4F4F0] bg-[#3D6B45] px-7 py-3.5 flex items-center gap-2 hover:bg-[#1C2B1A] transition-colors duration-200"
            >
              <span>Get Directions via WhatsApp</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Map */}
        <div
          className="relative min-h-[350px] lg:min-h-full bg-[#E6E6DE] flex flex-col items-center justify-center gap-3 overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(61,107,69,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(61,107,69,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        >
          {settings?.googleMapsUrl ? (
            <iframe
              src={settings.googleMapsUrl}
              className="absolute inset-0 w-full h-full border-0  opacity-80  hover:opacity-100 transition-all duration-700 ease-in-out"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location Map"
            />
          ) : (
            <>
              <MapPin className="w-12 h-12 text-[#3D6B45]" strokeWidth={1.2} />
              <p className="label-sm text-[#8A8A7A]">Google Maps Here</p>
              <p className="text-xs text-[#AEAE9E]">
                Add embed URL in Site Settings
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
