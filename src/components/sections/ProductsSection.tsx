"use client";
import { useState } from "react";
import Link from "next/link";
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
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Wires & Cables",
      image:
        "https://images.unsplash.com/photo-1601564267677-a36d03ce2d1c?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Circuit Protection (MCBs)",
      image:
        "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "LED & Luminaires",
      image:
        "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?q=80&w=600&auto=format&fit=crop",
    },
  ],
  hardware: [
    {
      name: "Concealed Hinges",
      image:
        "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Mortise Locksets",
      image:
        "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Drawer Systems",
      image:
        "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Architectural Knobs",
      image:
        "https://images.unsplash.com/photo-1301490214611-6670868f18fa?q=80&w=600&auto=format&fit=crop",
    },
  ],
  sanitary: [
    {
      name: "Luxury Faucets",
      image:
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Wall-Hung WCs",
      image:
        "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Overhead Showers",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Vitreous Basins",
      image:
        "https://images.unsplash.com/photo-1620626011161-997c51447094?q=80&w=600&auto=format&fit=crop",
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
            02
          </span>
          <span className="w-px h-5 bg-[#DDDDD5]" />
          <span className="label text-[#1C2B1A]">Product Categories</span>
        </div>
      </div>

      {/* Sector Navigation Tabs */}
      <div className="flex border-b border-[#DDDDD5]">
        {(["electrical", "hardware", "sanitary"] as Sector[]).map((s) => (
          <button
            key={s}
            onClick={() => setActiveSector(s)}
            className={`flex-1 py-4 label text-xs uppercase tracking-widest transition-all relative ${
              activeSector === s
                ? "text-[#1C2B1A] font-medium"
                : "text-[#AEAE9E] hover:text-[#8A8A7A]"
            }`}
          >
            {activeSector === s && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D6B45]" />
            )}
            <span className="inline-flex items-center gap-1.5">
              {s === "sanitary" ? "Sanitary Ware" : s}
              <span className="text-[9px] font-mono opacity-60">
                ({getSectorCount(s)})
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Grid Displaying Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#DDDDD5]">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col p-6 bg-[#F4F4F0] hover:bg-[#FAFAF6] transition-colors group"
          >
            {/* Elegant Cover Image */}
            <div className="aspect-[4/5] bg-[#EEEEE8] mb-4 overflow-hidden relative">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover mix-blend-multiply opacity-85 group-hover:scale-102 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
              />
            </div>

            {/* Meta */}
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#3D6B45] mb-0.5">
                  {activeSector}
                </p>
                <h3 className="font-fraunces text-[#1C2B1A] text-lg font-normal leading-tight">
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
          className="bg-[#3D6B45] text-[#F4F4F0] px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#1C2B1A] transition-colors flex items-center gap-2"
        >
          Open Digital Catalog <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
