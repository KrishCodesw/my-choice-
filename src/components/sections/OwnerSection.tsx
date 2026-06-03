"use client";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export function OwnerSection({ settings }: Props) {
  return (
    <section id="owner" className="bg-[#1C2B1A] border-t border-[#2E3D2C]">
      {/* Header */}
      <div className="border-b border-[#2E3D2C] px-6 md:px-10 py-4 flex items-center gap-4">
        <span className="font-fraunces text-[#F4F4F0] text-3xl font-light select-none">
          07
        </span>
        <span className="w-px h-5 bg-[#2E3D2C]" />
        <span className="label text-[#F4F4F0]">The Owner</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#2E3D2C]">
        {/* Photo */}
        <div className="relative min-h-[360px] lg:min-h-[500px] bg-[#243524] overflow-hidden flex items-center justify-center">
          {settings?.ownerPhoto?.asset?.url ? (
            <img
              src={`${settings.ownerPhoto.asset.url}?w=800&h=900&fit=crop&auto=format`}
              alt={settings.ownerName ?? "Owner"}
              className="w-full h-full object-cover absolute inset-0"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 opacity-20">
              <span className="text-8xl">👤</span>
              <span className="label-sm text-[#8A8A7A]">Owner Photo</span>
            </div>
          )}
          {/* Accent bar */}
          <div className="absolute bottom-0 left-0 w-1 h-24 bg-[#3D6B45]" />
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 py-12 flex flex-col gap-8 relative overflow-hidden">
          {/* Big quote mark */}
          <span className="absolute right-6 top-4 font-fraunces text-[#F4F4F0]/[0.04] text-[200px] leading-none select-none pointer-events-none">
            "
          </span>

          <blockquote className="font-fraunces italic text-[#F4F4F0] text-2xl md:text-3xl leading-snug border-l-2 border-[#3D6B45] pl-6 relative z-10">
            "I've spent 25 years making sure every customer walks out with
            exactly what they need — and nothing they don't."
          </blockquote>

          <div>
            <h2 className="font-fraunces text-[#F4F4F0] text-3xl mb-1">
              {settings?.ownerName ?? "The Owner"}
            </h2>
            <p className="label-sm text-[#3D6B45] mb-5">
              {settings?.ownerTitle ?? "Founder · MyChoice Electric & Hardware"}
            </p>
            <p className="text-sm text-[#8A8A7A] leading-relaxed max-w-md">
              {settings?.ownerBio ??
                "With over 15 years of experience in electrical, hardware and sanitary ware, MyChoice was built on one principle - deep product knowledge and honest guidance. Whether you're a homeowner or a contractor sourcing for 50 sites, you'll get the same attention."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-[#1C2B1A] bg-[#3D6B45] px-5 py-2.5 hover:bg-[#F4F4F0] transition-colors"
            >
              WhatsApp
            </a>
            {settings?.instagramHandle && (
              <a
                href={`https://instagram.com/${settings.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[#F4F4F0] border border-[#2E3D2C] px-5 py-2.5 hover:border-[#3D6B45] hover:text-[#3D6B45] transition-colors"
              >
                Instagram
              </a>
            )}
            <a
              href="#booking"
              className="label text-[#F4F4F0] border border-[#2E3D2C] px-5 py-2.5 hover:border-[#3D6B45] hover:text-[#3D6B45] transition-colors"
            >
              Book 1:1 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
