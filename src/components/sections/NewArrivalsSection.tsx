"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import type { Product } from "@/types";

interface Props {
  arrivals: Product[];
}

const fallback = [
  {
    _id: "1",
    name: "",
    brand: { name: "Jaquar" },
    sector: "sanitary" as const,
    spec: "Short Body Tap · Chrome Finish",
    isNew: true,
    isFeatured: true,
    imageUrl: "/shortbodytaps4.jpg",
  },
  {
    _id: "2",
    name: "",
    brand: { name: "Natts" },
    sector: "hardware" as const,
    spec: "Luxury Brass Handle · Solid Grip",
    isNew: true,
    isFeatured: true,
    imageUrl: "/brasshandle2.jpg",
  },
  {
    _id: "3",
    name: "",
    brand: { name: "Eagle" },
    sector: "sanitary" as const,
    spec: "Wash Basin · Matte Finish",
    isNew: true,
    isFeatured: false,
    imageUrl: "/basins.jpg",
  },
];

const emoji: Record<string, string> = {
  electrical: "⚡",
  hardware: "🔧",
  sanitary: "🚿",
};

export function NewArrivalsSection({ arrivals }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Force local fallback to ensure user's requested images show up
  const display = fallback;

  return (
    <section id="arrivals" ref={ref} className="bg-[#1C2B1A] border-t border-[#2E3D2C]">
      {/* Section header */}
      <div className="border-b border-[#2E3D2C] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-fraunces text-[#2E3D2C] text-3xl font-light select-none">
            03
          </span>
          <span className="w-px h-5 bg-[#2E3D2C]" />
          <span className="label text-[#F4F4F0]">New Arrivals</span>
        </div>
        <span className="label-sm text-[#8A8A7A]">Updated regularly</span>
      </div>

      {/* Cards with Staggered Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2E3D2C]">
        {display.slice(0, 3).map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="p-8 md:p-10 flex flex-col gap-6 hover:bg-[#243524] transition-colors duration-200 cursor-pointer active:scale-[0.99]"
          >
            {/* Index + badge */}
            <div className="flex items-center justify-between">
              <span className="font-fraunces text-[#2E3D2C] text-5xl leading-none select-none">
                0{i + 1}
              </span>
              <span className="label-sm text-[#3D6B45] border border-[#3D6B45] px-2 py-0.5">
                New
              </span>
            </div>

            {/* Image */}
            <div className="aspect-video bg-[#243524] border border-[#2E3D2C] flex items-center justify-center overflow-hidden relative group">
              <Image 
                src={(p as any).imageUrl}
                alt={p.brand?.name || "New Arrival"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
              {/* Fallback text if image still fails to render visually */}
              <span className="absolute inset-0 flex items-center justify-center text-[#F4F4F0]/10 pointer-events-none">
                {p.brand?.name}
              </span>
            </div>

            {/* Info */}
            <div>
              <p className="label-sm text-[#3D6B45] mb-2">{p.brand?.name}</p>
              {p.spec && (
                <p className="font-fraunces text-[#F4F4F0] text-2xl leading-snug group-hover:text-[#F4F4F0] transition-colors">
                  {p.spec}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
