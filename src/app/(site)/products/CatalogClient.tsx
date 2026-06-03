"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Check, ArrowLeft, Search } from "lucide-react";
import { useCartContext } from "@/components/shared/CartProvider";
import type { Product, Sector } from "@/types";

interface Props {
  initialProducts: Product[];
}

const sectors: { value: Sector | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "electrical", label: "Electrical" },
  { value: "hardware", label: "Hardware" },
  { value: "sanitary", label: "Sanitary Ware" },
];

const emoji: Record<Sector, string> = {
  electrical: "⚡",
  hardware: "🔧",
  sanitary: "🚿",
};

export function CatalogClient({ initialProducts }: Props) {
  const [active, setActive] = useState<Sector | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());
  const { addItem, setIsOpen } = useCartContext();

  // Filter by sector AND search query
  const filtered = initialProducts.filter((p) => {
    const matchesSector = active === "all" || p.sector === active;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const handleAdd = (p: Product) => {
    addItem({
      productId: p._id,
      name: p.name,
      brand: p.brand?.name ?? "",
      sector: p.sector,
    });
    setAdded((prev) => new Set([...prev, p._id]));
    setTimeout(
      () =>
        setAdded((prev) => {
          const s = new Set(prev);
          s.delete(p._id);
          return s;
        }),
      1800,
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col pt-20">
      {/* Page Header */}
      <header className="px-6 md:px-10 py-10 md:py-16 border-b border-[#DDDDD5] bg-[#EEEEE8]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 label-sm text-[#8A8A7A] hover:text-[#1C2B1A] transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
        <h1 className="font-fraunces text-4xl md:text-5xl text-[#1C2B1A] leading-tight mb-4">
          Complete <em className="text-[#3D6B45]">Catalog</em>
        </h1>
        <p className="text-[#8A8A7A] max-w-md leading-relaxed">
          Browse our full inventory of electrical, hardware, and sanitary
          products. Add items to your list to get a customized quote via
          WhatsApp.
        </p>
      </header>

      {/* Toolbar: Filters & Search */}
      <div className="sticky top-0 z-20 bg-[#F4F4F0] border-b border-[#DDDDD5] flex flex-col md:flex-row md:items-center justify-between">
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar w-full md:w-auto border-b md:border-b-0 border-[#DDDDD5]">
          {sectors.map((s) => (
            <button
              key={s.value}
              onClick={() => setActive(s.value)}
              className={`whitespace-nowrap px-6 py-4 label transition-all duration-200 border-r border-[#DDDDD5] relative ${
                active === s.value
                  ? "text-[#1C2B1A]"
                  : "text-[#AEAE9E] hover:text-[#8A8A7A]"
              }`}
            >
              {active === s.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D6B45]" />
              )}
              {s.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 md:border-l border-[#DDDDD5]">
          <Search
            size={16}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#AEAE9E]"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-4 pl-14 pr-6 text-sm font-chivo text-[#1C2B1A] placeholder:text-[#AEAE9E] outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      <main className="flex-1">
        {filtered.length === 0 ? (
          <div className="px-10 py-32 text-center flex flex-col items-center justify-center">
            <span className="text-5xl mb-4 opacity-20">🔍</span>
            <p className="font-fraunces italic text-2xl text-[#8A8A7A]">
              No products found.
            </p>
            <p className="label-sm text-[#AEAE9E] mt-2">
              Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 divide-x divide-y divide-[#DDDDD5]">
            {filtered.map((p) => {
              const isAdded = added.has(p._id);
              return (
                <div
                  key={p._id}
                  className="flex flex-col p-6 md:p-7 bg-[#F4F4F0] hover:bg-[#FAFAF6] transition-colors duration-200 group border-b border-[#DDDDD5] last:border-b-0 md:last:border-b"
                >
                  {/* Badges */}
                  <div className="flex gap-2 mb-4 min-h-[20px]">
                    {p.isNew && (
                      <span className="label-sm text-[#3D6B45] border border-[#3D6B45] px-2 py-0.5">
                        New
                      </span>
                    )}
                    {p.isFeatured && (
                      <span className="label-sm text-[#1C2B1A] border border-[#DDDDD5] px-2 py-0.5">
                        Top Pick
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="aspect-square bg-[#EEEEE8] mb-5 overflow-hidden flex items-center justify-center">
                    {p.image?.asset?.url ? (
                      <img
                        src={`${p.image.asset.url}?w=400&h=400&fit=crop&auto=format`}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-4xl opacity-20">
                        {emoji[p.sector]}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="label-sm text-[#3D6B45] mb-1">
                      {p.brand?.name}
                    </p>
                    {p.category && (
                      <p className="label-sm text-[#AEAE9E] mb-2">
                        {p.category}
                      </p>
                    )}
                    <h3 className="font-fraunces text-[#1C2B1A] text-lg leading-snug mb-2">
                      {p.name}
                    </h3>
                    {p.spec && (
                      <p className="text-xs text-[#8A8A7A] leading-relaxed line-clamp-2">
                        {p.spec}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleAdd(p)}
                    className={`mt-5 w-full py-2.5 flex items-center justify-center gap-2 label transition-all duration-200 ${
                      isAdded
                        ? "bg-[#3D6B45] text-[#F4F4F0]"
                        : "border border-[#DDDDD5] text-[#1C2B1A] hover:border-[#1C2B1A] hover:bg-[#1C2B1A] hover:text-[#F4F4F0]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={11} /> Added
                      </>
                    ) : (
                      <>
                        <Plus size={11} /> Add to Quote
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Quote Summary (Mobile friendly) */}
      <div className="sticky bottom-0 border-t border-[#DDDDD5] bg-[#F4F4F0] px-6 md:px-10 py-4 flex items-center justify-between z-20">
        <p className="label-sm text-[#8A8A7A]">
          Showing {filtered.length} items
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="label text-[#F4F4F0] bg-[#1C2B1A] px-6 py-3 hover:bg-[#3D6B45] transition-colors duration-200"
        >
          Review Quote List
        </button>
      </div>
    </div>
  );
}
