"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Check, ArrowLeft, Search, ListFilter } from "lucide-react";
import { useCartContext } from "@/components/shared/CartProvider";
import type { Product, Sector } from "@/types";

interface Props {
  initialProducts: Product[];
}

const sectors: { value: Sector | "all"; label: string }[] = [
  { value: "all", label: "All Sectors" },
  { value: "electrical", label: "Electrical" },
  { value: "hardware", label: "Hardware" },
  { value: "sanitary", label: "Sanitary Ware" },
];

export function CatalogClient({ initialProducts }: Props) {
  const [activeSector, setActiveSector] = useState<Sector | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [added, setAdded] = useState<Set<string>>(new Set());
  const { addItem, setIsOpen } = useCartContext();

  const filtered = initialProducts.filter((p) => {
    const matchesSector = activeSector === "all" || p.sector === activeSector;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
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
      1200,
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col pt-20 font-chivo">
      {/* Header */}
      <header className="px-6 md:px-10 py-12 border-b border-[#DDDDD5] bg-[#EEEEE8]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 label-sm text-[#8A8A7A] hover:text-[#1C2B1A] transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Back to Showroom
        </Link>
        <h1 className="font-fraunces text-4xl md:text-5xl text-[#1C2B1A] font-light leading-none">
          Product <em className="text-[#3D6B45] font-normal">Manifest</em>
        </h1>
      </header>

      {/* Filter / Search Bar */}
      <div className="sticky top-0 z-20 bg-[#F4F4F0] border-b border-[#DDDDD5] flex flex-col md:flex-row justify-between items-stretch md:items-center">
        <div className="flex overflow-x-auto border-b md:border-b-0 border-[#DDDDD5]">
          {sectors.map((s) => (
            <button
              key={s.value}
              onClick={() => setActiveSector(s.value)}
              className={`px-6 py-4 text-xs tracking-wider uppercase transition-all relative ${
                activeSector === s.value
                  ? "text-[#1C2B1A] font-medium"
                  : "text-[#AEAE9E] hover:text-[#8A8A7A]"
              }`}
            >
              {activeSector === s.value && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D6B45]" />
              )}
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative md:border-l border-[#DDDDD5] flex-1 md:max-w-xs">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AEAE9E]"
          />
          <input
            type="text"
            placeholder="Filter by keyword, brand, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-4 pl-11 pr-6 text-sm outline-none text-[#1C2B1A] placeholder:text-[#AEAE9E]"
          />
        </div>
      </div>

      {/* Manifest Table Layout */}
      <main className="flex-1 px-6 md:px-10 py-8">
        <div className="border border-[#DDDDD5] bg-[#EEEEE8] overflow-hidden">
          {/* Table Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#DDDDD5] text-xs uppercase tracking-wider text-[#8A8A7A] font-medium">
            <div className="col-span-2">Brand</div>
            <div className="col-span-3">Item Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-3">Technical Specifications</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center font-fraunces italic text-[#8A8A7A] text-xl">
              No line items match your active filters.
            </div>
          ) : (
            <div className="divide-y divide-[#DDDDD5]">
              {filtered.map((p) => {
                const isAdded = added.has(p._id);
                return (
                  <div
                    key={p._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 items-center bg-[#F4F4F0] hover:bg-[#FAFAF6] transition-colors"
                  >
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 text-xs uppercase tracking-wider text-[#3D6B45] font-semibold md:font-normal">
                      {p.brand?.name || "Generic"}
                    </div>

                    {/* Item Description */}
                    <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                      {p.isNew && (
                        <span className="text-[9px] border border-[#3D6B45] text-[#3D6B45] px-1 font-mono uppercase">
                          New
                        </span>
                      )}
                      <h3 className="text-sm font-medium text-[#1C2B1A]">
                        {p.name}
                      </h3>
                    </div>

                    {/* Category */}
                    <div className="col-span-1 md:col-span-2 text-xs text-[#8A8A7A]">
                      <span className="md:hidden text-[#AEAE9E]">
                        Category:{" "}
                      </span>
                      {p.category || "—"}
                    </div>

                    {/* Tech Specs */}
                    <div className="col-span-1 md:col-span-3 text-xs text-[#6A6A5A] font-mono leading-relaxed">
                      {p.spec || "Standard Variant Specifications"}
                    </div>

                    {/* Action CTA */}
                    <div className="col-span-1 md:col-span-2 text-right mt-2 md:mt-0">
                      <button
                        onClick={() => handleAdd(p)}
                        className={`w-full md:w-auto px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
                          isAdded
                            ? "bg-[#3D6B45] border-[#3D6B45] text-[#F4F4F0]"
                            : "border-[#DDDDD5] text-[#1C2B1A] hover:border-[#1C2B1A] hover:bg-[#1C2B1A] hover:text-[#F4F4F0]"
                        }`}
                      >
                        {isAdded ? (
                          <Check size={12} className="inline mr-1" />
                        ) : (
                          <Plus size={12} className="inline mr-1" />
                        )}
                        {isAdded ? "Added" : "Add to List"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 border-t border-[#DDDDD5] bg-[#EEEEE8] px-6 md:px-10 py-4 flex items-center justify-between z-20">
        <p className="text-xs uppercase tracking-widest text-[#8A8A7A]">
          {filtered.length} Line Items Listed
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1C2B1A] text-[#F4F4F0] px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#3D6B45] transition-colors"
        >
          Review Quote Cart
        </button>
      </div>
    </div>
  );
}
