"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Testimonial, Brand, SiteSettings } from "@/types";

interface Props {
  testimonials: Testimonial[];
  brands: Brand[];
  settings: SiteSettings | null;
}

const fallbackT: Testimonial[] = [
  {
    _id: "1",
    name: "Rahul Mehta",
    role: "Homeowner, Andheri West",
    rating: 5,
    quote:
      "Sourced all electrical fittings for our 4BHK from MyChoice. The owner guided us through every product personally. Wouldn't go anywhere else.",
  },
  {
    _id: "2",
    name: "Priya Kapoor",
    role: "Architect, Bandra",
    rating: 5,
    quote:
      "MyChoice is the only store in Mumbai that stocks what I need. The Jaquar range is unmatched and the owner actually knows his products.",
  },
  {
    _id: "3",
    name: "Suresh Electricals",
    role: "Contractor, Borivali",
    rating: 5,
    quote:
      "Trade pricing, fast availability, and genuine expertise. Our go-to for every project. Reliable every single time.",
  },
];

const fallbackB: Brand[] = [
  {
    _id: "1",
    name: "Havells",
    sector: "electrical",
    tagline: "ISI certified",
  },
  {
    _id: "2",
    name: "Jaquar",
    sector: "sanitary",
    tagline: "India's finest",
  },
  {
    _id: "3",
    name: "Anchor",
    sector: "electrical",
    tagline: "Trusted wiring",
  },
  {
    _id: "4",
    name: "Kohler",
    sector: "sanitary",
    tagline: "Luxury ware",
  },
  {
    _id: "5",
    name: "Hettich",
    sector: "hardware",
    tagline: "German hardware",
  },
  {
    _id: "6",
    name: "Legrand",
    sector: "electrical",
    tagline: "French engineering",
  },
];

export function TrustSection({ testimonials, brands, settings }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.06 },
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const stats = settings?.stats;
  const displayT =
    testimonials.length > 0 ? testimonials.slice(0, 3) : fallbackT;
  const displayB = brands.length > 0 ? brands : fallbackB;

  return (
    <section
      id="trust"
      ref={ref}
      className="bg-[#EEEEE8] border-t border-[#DDDDD5]"
    >
      {/* Header */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center gap-4">
        <span className="font-fraunces text-[#1C2B1A] text-3xl font-light select-none">
          04
        </span>
        <span className="w-px h-5 bg-[#DDDDD5]" />
        <span className="label text-[#1C2B1A]">Why MyChoice</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#DDDDD5] border-b border-[#DDDDD5]">
        {[
          { num: stats?.yearsInBusiness ?? "15+", label: "Years in Business" },
          { num: stats?.brandsStocked ?? "50+", label: "Brands Stocked" },
          {
            num: stats?.projectsSupplied ?? "500+",
            label: "Projects Supplied",
          },
          { num: "3", label: "Complete Sectors" },
        ].map((s, i) => (
          <div
            key={i}
            className="reveal px-6 md:px-10 py-10"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="font-fraunces text-[#3D6B45] text-5xl md:text-6xl leading-none mb-2">
              {s.num}
            </div>
            <div className="label-sm text-[#8A8A7A]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DDDDD5] border-b border-[#DDDDD5]">
        {displayT.map((t, i) => (
          <div
            key={t._id}
            className="reveal p-8 md:p-10 flex flex-col gap-5 bg-[#EEEEE8] hover:bg-[#F4F4F0] transition-colors duration-300"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {/* Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} className="text-[#3D6B45] text-sm">
                  ★
                </span>
              ))}
            </div>
            <blockquote className="font-fraunces italic text-[#1C2B1A] text-xl leading-snug flex-1">
              "{t.quote}"
            </blockquote>
            <div className="border-t border-[#DDDDD5] pt-4 flex items-center justify-between">
              <div>
                <p className="font-chivo font-medium text-sm text-[#1C2B1A]">
                  {t.name}
                </p>
                {t.role && (
                  <p className="label-sm text-[#AEAE9E] mt-0.5">{t.role}</p>
                )}
              </div>
              {t.projectPhoto?.asset?.url && (
                <div className="relative w-12 h-12 overflow-hidden border border-[#DDDDD5]">
                  <Image
                    src={`${t.projectPhoto.asset.url}?w=100&h=100&fit=crop`}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              )}
              {t.projectPhoto && (
                <span className="label-sm text-[#3D6B45] border border-[#3D6B45]/30 px-2 py-0.5">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Brands: The Kinetic Ribbon */}
      <div className="py-20 bg-[#F4F4F0] border-b border-[#DDDDD5] overflow-hidden">
        <div className="px-6 md:px-10 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#3D6B45]" />
            <span className="label text-forest">BRANDS WE STOCK</span>
          </div>
          <span className="label-sm text-[#AEAE9E]">Authorized Dealer</span>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div className="ticker-track flex gap-12 md:gap-24 w-max py-4">
            {[...displayB, ...displayB, ...displayB].map((b, i) => (
              <motion.div
                key={`${b._id}-${i}`}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex flex-col items-center gap-2 group cursor-crosshair"
              >
                <div className="font-fraunces text-3xl md:text-5xl text-ink/20 group-hover:text-forest transition-colors duration-500 font-bold tracking-tighter">
                  {b.name.toUpperCase()}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1 h-1 rounded-full bg-forest" />
                  <span className="label-sm text-forest">{b.sector}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
