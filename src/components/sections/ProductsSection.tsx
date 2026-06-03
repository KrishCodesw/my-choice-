// "use client";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Plus, Check, ArrowRight } from "lucide-react";
// import { useCartContext } from "@/components/shared/CartProvider";
// import type { Product, Sector } from "@/types";

// interface Props {
//   products: Product[];
// }

// const sectors: { value: Sector; label: string }[] = [
//   { value: "electrical", label: "Electrical" },
//   { value: "hardware", label: "Hardware" },
//   { value: "sanitary", label: "Sanitary Ware" },
// ];

// const emoji: Record<Sector, string> = {
//   electrical: "⚡",
//   hardware: "🔧",
//   sanitary: "🚿",
// };

// export function ProductsSection({ products }: Props) {
//   const [active, setActive] = useState<Sector>("electrical");
//   const [added, setAdded] = useState<Set<string>>(new Set());
//   const { addItem, setIsOpen } = useCartContext();
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       (es) =>
//         es.forEach((e) => {
//           if (e.isIntersecting) e.target.classList.add("visible");
//         }),
//       { threshold: 0.06 },
//     );
//     ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
//     return () => obs.disconnect();
//   }, [active]);

//   const filtered = products.filter((p) => p.sector === active);

//   // Limit to 4 items for the homepage preview to avoid pushing content too far down
//   const displayedProducts = filtered.slice(0, 4);

//   const handleAdd = (p: Product) => {
//     addItem({
//       productId: p._id,
//       name: p.name,
//       brand: p.brand?.name ?? "",
//       sector: p.sector,
//     });
//     setAdded((prev) => new Set([...prev, p._id]));
//     setTimeout(
//       () =>
//         setAdded((prev) => {
//           const s = new Set(prev);
//           s.delete(p._id);
//           return s;
//         }),
//       1800,
//     );
//   };

//   return (
//     <section
//       id="products"
//       ref={ref}
//       className="bg-[#F4F4F0] border-t border-[#DDDDD5]"
//     >
//       {/* Section header */}
//       <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <span className="font-fraunces text-[#DDDDD5] text-3xl font-light select-none">
//             02
//           </span>
//           <span className="w-px h-5 bg-[#DDDDD5]" />
//           <span className="label text-[#1C2B1A]">Our Collection</span>
//         </div>
//         <button
//           onClick={() => setIsOpen(true)}
//           className="label text-[#3D6B45] hover:text-[#1C2B1A] transition-colors flex items-center gap-1.5"
//         >
//           Quote List <ArrowRight size={10} />
//         </button>
//       </div>

//       {/* Sector tabs */}
//       <div className="flex border-b border-[#DDDDD5]">
//         {sectors.map((s) => (
//           <button
//             key={s.value}
//             onClick={() => setActive(s.value)}
//             className={`flex-1 py-4 label transition-all duration-200 border-r border-[#DDDDD5] last:border-r-0 relative ${
//               active === s.value
//                 ? "text-[#1C2B1A]"
//                 : "text-[#AEAE9E] hover:text-[#8A8A7A]"
//             }`}
//           >
//             {active === s.value && (
//               <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3D6B45]" />
//             )}
//             {s.label}
//           </button>
//         ))}
//       </div>

//       {/* Grid */}
//       {displayedProducts.length === 0 ? (
//         <div className="px-10 py-20 text-center">
//           <p className="font-fraunces italic text-2xl text-[#8A8A7A]">
//             No products yet.
//           </p>
//           <p className="label-sm text-[#AEAE9E] mt-2">
//             Add products in Sanity Studio.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 divide-x divide-y divide-[#DDDDD5]">
//           {displayedProducts.map((p, i) => {
//             const isAdded = added.has(p._id);
//             return (
//               <div
//                 key={p._id}
//                 className="reveal flex flex-col p-6 md:p-7 bg-[#F4F4F0] hover:bg-[#FAFAF6] transition-colors duration-200 group"
//                 style={{ transitionDelay: `${i * 35}ms` }}
//               >
//                 {/* Badges */}
//                 <div className="flex gap-2 mb-4 min-h-[20px]">
//                   {p.isNew && (
//                     <span className="label-sm text-[#3D6B45] border border-[#3D6B45] px-2 py-0.5">
//                       New
//                     </span>
//                   )}
//                   {p.isFeatured && (
//                     <span className="label-sm text-[#1C2B1A] border border-[#DDDDD5] px-2 py-0.5">
//                       Top Pick
//                     </span>
//                   )}
//                 </div>

//                 {/* Image / placeholder */}
//                 <div className="aspect-square bg-[#EEEEE8] mb-5 overflow-hidden flex items-center justify-center">
//                   {p.image?.asset?.url ? (
//                     <img
//                       src={`${p.image.asset.url}?w=400&h=400&fit=crop&auto=format`}
//                       alt={p.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                   ) : (
//                     <span className="text-4xl opacity-20">
//                       {emoji[p.sector]}
//                     </span>
//                   )}
//                 </div>

//                 {/* Info */}
//                 <div className="flex-1">
//                   <p className="label-sm text-[#3D6B45] mb-1">
//                     {p.brand?.name}
//                   </p>
//                   {p.category && (
//                     <p className="label-sm text-[#AEAE9E] mb-2">{p.category}</p>
//                   )}
//                   <h3 className="font-fraunces text-[#1C2B1A] text-lg leading-snug mb-2">
//                     {p.name}
//                   </h3>
//                   {p.spec && (
//                     <p className="text-xs text-[#8A8A7A] leading-relaxed line-clamp-2">
//                       {p.spec}
//                     </p>
//                   )}
//                 </div>

//                 {/* CTA */}
//                 <button
//                   onClick={() => handleAdd(p)}
//                   className={`mt-5 w-full py-2.5 flex items-center justify-center gap-2 label transition-all duration-200 ${
//                     isAdded
//                       ? "bg-[#3D6B45] text-[#F4F4F0]"
//                       : "border border-[#DDDDD5] text-[#1C2B1A] hover:border-[#1C2B1A] hover:bg-[#1C2B1A] hover:text-[#F4F4F0]"
//                   }`}
//                 >
//                   {isAdded ? (
//                     <>
//                       <Check size={11} /> Added
//                     </>
//                   ) : (
//                     <>
//                       <Plus size={11} /> Add to Quote
//                     </>
//                   )}
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Footer strip */}
//       <div className="border-t border-[#DDDDD5] px-6 md:px-10 py-5 flex items-center justify-between gap-4 flex-wrap">
//         <p className="label-sm text-[#AEAE9E]">
//           Showing {displayedProducts.length} of {filtered.length} products ·{" "}
//           {sectors.find((s) => s.value === active)?.label}
//         </p>
//         <Link
//           href="/products"
//           className="label text-[#F4F4F0] bg-[#3D6B45] px-6 py-3 hover:bg-[#1C2B1A] transition-colors duration-200 flex items-center gap-2"
//         >
//           View Full Catalog <ArrowRight size={14} />
//         </Link>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Sector } from "@/types";

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

export function ProductsSection() {
  const [activeSector, setActiveSector] = useState<Sector>("electrical");
  const categories = sectorCategories[activeSector];

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
            {s === "sanitary" ? "Sanitary Ware" : s}
          </button>
        ))}
      </div>

      {/* Grid Displaying Category Cards Instead of Loose Products */}
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
                className="w-full h-full object-cover  mix-blend-multiply opacity-85 group-hover:scale-102 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-500"
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
