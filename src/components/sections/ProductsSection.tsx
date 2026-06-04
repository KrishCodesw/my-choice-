"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, LayoutGroup } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product, Sector } from "@/types";

// 1. Define the props so page.tsx stops throwing type errors
interface ProductsSectionProps {
  products: Product[];
}

const sectorCategories: Record<Sector, { name: string; image: string }[]> = {
  electrical: [
    {
      name: "Switches & Plates",
      image: "/switches top.jpg",
    },
    {
      name: "Wires & Cables",
      image: "/polycab.jpg",
    },
    {
      name: "Circuit Protection (MCBs)",
      image: "/mcbb.webp",
    },
    {
      name: "LED & Luminaires",
      image: "/lightled.jpg",
    },
  ],
  hardware: [
    {
      name: "Concealed Hinges",
      image: "/hinges.jpg",
    },
    {
      name: "Mortise Locksets",
      image: "/lockm.jpg",
    },
    {
      name: "Drawer Systems",
      image: "/channel.webp",
    },
    {
      name: "Architectural Knobs",
      image: "/brasshandle2.jpg",
    },
  ],
  sanitary: [
    {
      name: "Luxury Faucets",
      image: "/taps2.jpg",
    },
    {
      name: "Wall-Hung WCs",
      image: "/wc.webp",
    },
    {
      name: "Overhead Showers",
      image: "/shower.jpg",
    },
    {
      name: "Vitreous Basins",
      image: "/basins.jpg",
    },
  ],
};

export function ProductsSection({ products }: ProductsSectionProps) {
  const [activeSector, setActiveSector] = useState<Sector>("electrical");
  const categories = sectorCategories[activeSector];

  // Optional Utility: Calculate active items per sector dynamically to keep the UI rich
  const getSectorCount = (sec: Sector) =>
    products.filter((p) => p.sector === sec).length;

  return (
    <section
      id="products"
      className="bg-[#F4F4F0] border-t border-[#DDDDD5] font-chivo"
    >
      {/* Header Bar */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-fraunces text-[#DDDDD5] text-3xl font-light select-none">
            03
          </span>
          <span className="w-px h-5 bg-[#DDDDD5]" />
          <span className="label text-[#1C2B1A]">Product Categories</span>
        </div>
      </div>

      {/* Sector Navigation Tabs with LayoutGroup for sliding underline */}
      <LayoutGroup>
        <div className="flex border-b border-[#DDDDD5]">
          {(["electrical", "hardware", "sanitary"] as Sector[]).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className={`flex-1 py-4 label text-xs uppercase tracking-widest transition-colors relative group ${
                activeSector === s
                  ? "text-[#1C2B1A] font-medium"
                  : "text-[#AEAE9E] hover:text-[#8A8A7A]"
              }`}
            >
              {activeSector === s && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D6B45]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="inline-flex items-center gap-1.5 active:scale-95 transition-transform duration-100">
                {s === "sanitary" ? "Sanitary Ware" : s}
                <span className="text-[9px] font-mono opacity-60">
                  ({getSectorCount(s)})
                </span>
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {/* Grid Displaying Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#DDDDD5]">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col p-6 bg-[#F4F4F0] hover:bg-[#FAFAF6] transition-colors group cursor-pointer active:scale-[0.99] duration-200"
          >
            {/* Elegant Cover Image */}
            <div className="aspect-4/5 bg-[#EEEEE8] mb-4 overflow-hidden relative">
              <Image
                src={cat.image}
                alt={cat.name}
                width={600}
                height={750}
                className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500 ease-out"
              />
            </div>

            {/* Meta */}
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3D6B45] mb-0.5">
                  {activeSector}
                </p>
                <h3 className="font-fraunces text-[#1C2B1A] text-lg font-normal leading-tight group-hover:text-[#3D6B45] transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Link Block to Full Table Manifest */}
      <div className="border-t border-[#DDDDD5] px-6 md:px-10 py-5 flex items-center justify-between bg-[#EEEEE8]">
        <p className="text-xs uppercase text-[#AEAE9E] tracking-wider">
          Select standard items directly from internal schedules
        </p>
        <Link
          href="/products"
          className="bg-[#3D6B45] text-[#F4F4F0] px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#1C2B1A] transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
        >
          Open Digital Catalog <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
