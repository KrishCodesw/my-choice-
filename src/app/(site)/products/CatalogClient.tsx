"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Check, ArrowLeft, Search, X } from "lucide-react";
import { useCartContext } from "@/components/shared/CartProvider";
import type { Product, Sector } from "@/types";

interface Props { initialProducts: Product[] }

const sectors: { value: Sector | "all"; label: string; emoji: string }[] = [
  { value: "all",        label: "All Products",  emoji: "🏪" },
  { value: "electrical", label: "Electrical",    emoji: "⚡" },
  { value: "hardware",   label: "Hardware",      emoji: "🔧" },
  { value: "sanitary",   label: "Sanitary Ware", emoji: "🚿" },
];

const sectorBg: Record<string, string> = {
  electrical: "#FFF8E8",
  hardware:   "#F0F4F0",
  sanitary:   "#EEF4F8",
};

export function CatalogClient({ initialProducts }: Props) {
  const [activeSector, setActiveSector] = useState<Sector | "all">("all");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery]       = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());
  const { addItem, setIsOpen } = useCartContext();

  // Categories for active sector
  const categories = useMemo(() => {
    const source = activeSector === "all"
      ? initialProducts
      : initialProducts.filter(p => p.sector === activeSector);
    const cats = Array.from(new Set(source.map(p => p.category).filter(Boolean))) as string[];
    return ["all", ...cats.sort()];
  }, [initialProducts, activeSector]);

  // Reset category when sector changes
  const handleSectorChange = (s: Sector | "all") => {
    setActiveSector(s);
    setActiveCategory("all");
  };

  const filtered = useMemo(() => {
    return initialProducts.filter(p => {
      const matchSector   = activeSector === "all" || p.sector === activeSector;
      const matchCategory = activeCategory === "all" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch   = !q
        || p.name.toLowerCase().includes(q)
        || p.brand?.name?.toLowerCase().includes(q)
        || p.category?.toLowerCase().includes(q)
        || p.spec?.toLowerCase().includes(q);
      return matchSector && matchCategory && matchSearch;
    });
  }, [initialProducts, activeSector, activeCategory, searchQuery]);

  const handleAdd = (p: Product) => {
    addItem({ productId: p._id, name: p.name, brand: p.brand?.name ?? "", sector: p.sector });
    setAdded(prev => new Set([...prev, p._id]));
    setTimeout(() => setAdded(prev => { const s = new Set(prev); s.delete(p._id); return s; }), 1500);
  };

  // Group by category for display
  const grouped = useMemo(() => {
    if (searchQuery || activeCategory !== "all") return { "Results": filtered };
    const groups: Record<string, Product[]> = {};
    filtered.forEach(p => {
      const cat = p.category || "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filtered, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col pt-14 font-chivo">

      {/* Page header */}
      <header className="px-6 md:px-10 py-10 border-b border-[#DDDDD5] bg-[#EEEEE8]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 label-sm text-[#8A8A7A] hover:text-[#1C2B1A] mb-5"
          style={{ transition: "color 150ms" }}
        >
          <ArrowLeft size={12} strokeWidth={1.5} /> Back to Showroom
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-fraunces text-4xl md:text-5xl text-[#1C2B1A] font-light leading-none">
              Full <em className="text-[#3D6B45] font-normal">Catalogue</em>
            </h1>
            <p className="text-sm text-[#8A8A7A] mt-3">
              {initialProducts.length} products across 3 sectors · {new Set(initialProducts.map(p => p.brand?.name)).size} brands
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="self-start md:self-auto label text-[#F4F4F0] bg-[#1C2B1A] px-6 py-3 hover:bg-[#3D6B45]"
            style={{ transition: "background-color 150ms" }}
          >
            View Quote List →
          </button>
        </div>
      </header>

      {/* Sticky filter bar */}
      <div className="sticky top-14 z-20 bg-[#F4F4F0] border-b border-[#DDDDD5]">
        {/* Sector tabs */}
        <div className="flex overflow-x-auto border-b border-[#DDDDD5] scrollbar-none">
          {sectors.map(s => (
            <button
              key={s.value}
              onClick={() => handleSectorChange(s.value)}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 label relative"
              style={{
                color: activeSector === s.value ? "#1C2B1A" : "#AEAE9E",
                transition: "color 150ms",
              }}
            >
              <span>{s.emoji}</span>
              <span>{s.label}</span>
              {activeSector === s.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D6B45]" />
              )}
            </button>
          ))}
        </div>

        {/* Category pills + search */}
        <div className="flex flex-col md:flex-row md:items-center gap-0 md:divide-x divide-[#DDDDD5]">
          {/* Category pills — scrollable */}
          <div className="flex gap-0 overflow-x-auto scrollbar-none py-2 px-4 flex-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-3 py-1 text-[10px] tracking-wider uppercase mx-1 border"
                style={{
                  background:   activeCategory === cat ? "#1C2B1A" : "transparent",
                  color:        activeCategory === cat ? "#F4F4F0" : "#8A8A7A",
                  borderColor:  activeCategory === cat ? "#1C2B1A" : "#DDDDD5",
                  transition:   "background-color 150ms, color 150ms, border-color 150ms",
                }}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative border-t md:border-t-0 border-[#DDDDD5] md:w-64">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AEAE9E]" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search products or brands..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-3 pl-10 pr-8 text-sm outline-none text-[#1C2B1A] placeholder:text-[#AEAE9E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AEAE9E] hover:text-[#1C2B1A]"
                style={{ transition: "color 120ms" }}
              >
                <X size={13} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product grid — grouped by category */}
      <main className="flex-1 px-6 md:px-10 py-8">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-fraunces italic text-[#8A8A7A] text-2xl mb-3">No products match your filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="label-sm text-[#3D6B45] border border-[#3D6B45] px-4 py-2 hover:bg-[#3D6B45] hover:text-[#F4F4F0]"
              style={{ transition: "background-color 150ms, color 150ms" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, products]) => (
              <div key={category}>
                {/* Category heading */}
                {Object.keys(grouped).length > 1 && (
                  <div className="flex items-center gap-4 mb-5">
                    <h2 className="font-fraunces text-xl text-[#1C2B1A]">{category}</h2>
                    <div className="flex-1 h-px bg-[#DDDDD5]" />
                    <span className="label-sm text-[#AEAE9E]">{products.length} items</span>
                  </div>
                )}

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-[#DDDDD5] border border-[#DDDDD5]">
                  {products.map(p => {
                    const isAdded = added.has(p._id);
                    return (
                      <div
                        key={p._id}
                        className="flex flex-col p-5 bg-[#F4F4F0] hover:bg-white group"
                        style={{ transition: "background-color 150ms" }}
                      >
                        {/* Badges */}
                        <div className="flex gap-2 mb-4 min-h-[18px]">
                          {p.isNew && (
                            <span className="label-sm text-[#3D6B45] border border-[#3D6B45] px-1.5 py-0.5">
                              New
                            </span>
                          )}
                          {p.isFeatured && (
                            <span className="label-sm text-[#1C2B1A] border border-[#DDDDD5] px-1.5 py-0.5">
                              Top Pick
                            </span>
                          )}
                        </div>

                        {/* Image / placeholder */}
                        <div
                          className="aspect-square mb-4 flex items-center justify-center overflow-hidden"
                          style={{ background: sectorBg[p.sector] ?? "#EEEEE8" }}
                        >
                          {p.image?.asset?.url ? (
                            <img
                              src={`${p.image.asset.url}?w=300&h=300&fit=crop&auto=format`}
                              alt={p.name}
                              loading="lazy"
                              className="w-full h-full object-contain group-hover:scale-105"
                              style={{ transition: "transform 400ms cubic-bezier(0.23,1,0.32,1)" }}
                            />
                          ) : (
                            <span className="text-4xl opacity-20">
                              {p.sector === "electrical" ? "⚡" : p.sector === "hardware" ? "🔧" : "🚿"}
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <p className="label-sm text-[#3D6B45] mb-1">{p.brand?.name}</p>
                          {p.category && (
                            <p className="label-sm text-[#AEAE9E] mb-1.5">{p.category}</p>
                          )}
                          <h3 className="font-fraunces text-[#1C2B1A] text-base leading-snug mb-2">
                            {p.name}
                          </h3>
                          {p.spec && (
                            <p className="text-[11px] text-[#8A8A7A] leading-relaxed line-clamp-2">
                              {p.spec}
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <button
                          onClick={() => handleAdd(p)}
                          className="mt-4 w-full py-2.5 flex items-center justify-center gap-1.5 label"
                          style={{
                            background:   isAdded ? "#3D6B45" : "transparent",
                            color:        isAdded ? "#F4F4F0" : "#1C2B1A",
                            border:       isAdded ? "1px solid #3D6B45" : "1px solid #DDDDD5",
                            transform:    "scale(1)",
                            transition:   "background-color 150ms, color 150ms, border-color 150ms, transform 100ms cubic-bezier(0.23,1,0.32,1)",
                          }}
                          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
                          onMouseUp={e   => (e.currentTarget.style.transform = "scale(1)")}
                          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                        >
                          {isAdded
                            ? <><Check size={11} strokeWidth={2} /> Added</>
                            : <><Plus size={11} strokeWidth={1.5} /> Add to Quote</>
                          }
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 z-20 border-t border-[#DDDDD5] bg-[#EEEEE8] px-6 md:px-10 py-4 flex items-center justify-between">
        <p className="label-sm text-[#8A8A7A]">
          {filtered.length} of {initialProducts.length} products
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="label text-[#F4F4F0] bg-[#3D6B45] px-6 py-2.5 hover:bg-[#1C2B1A]"
          style={{ transition: "background-color 150ms, transform 100ms cubic-bezier(0.23,1,0.32,1)" }}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={e   => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Get Quote on WhatsApp →
        </button>
      </div>
    </div>
  );
}
