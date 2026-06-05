"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQ } from "@/types";

interface Props {
  faqs: FAQ[];
}

const cats = [
  { value: "all", label: "All" },
  { value: "electrical", label: "Electrical" },
  { value: "hardware", label: "Hardware" },
  { value: "sanitary", label: "Sanitary" },
  { value: "general", label: "General" },
];

const fallback: FAQ[] = [
  {
    _id: "1",
    question: "What wire size for a 1.5 ton AC?",
    answer:
      "Minimum 2.5mm² copper wire. We recommend Havells or Finolex 2.5mm² FR wire. Come in and we'll advise based on your specific installation.",
    category: "electrical",
  },
  {
    _id: "2",
    question: "Which MCB rating for my home?",
    answer:
      "For a 2-3BHK: 32A or 40A main MCB with 6A–16A branch MCBs. Exact rating depends on total load. Walk in and we'll calculate it free.",
    category: "electrical",
  },
  {
    _id: "3",
    question: "CP vs SS bathroom fittings — which is better?",
    answer:
      "CP looks great but tarnishes in Mumbai conditions. SS is more durable long-term. We stock both — come see in person.",
    category: "sanitary",
  },
  {
    _id: "4",
    question: "What hinge for kitchen cabinets?",
    answer:
      "Concealed soft-close hinges — Hettich Sensys range. Hidden when closed, silent, built to last decades. Bring cabinet dimensions and we'll advise.",
    category: "hardware",
  },
  {
    _id: "5",
    question: "Do I need to buy here to use the Workers Network?",
    answer:
      "No — the Workers Network is open to everyone. Submit a request and we'll assign the right verified professional. All coordination through MyChoice.",
    category: "general",
  },
  {
    _id: "6",
    question: "How does the WhatsApp quote system work?",
    answer:
      "Add products to your Quote List, click 'Get Quote on WhatsApp.' It opens WhatsApp with your full list pre-filled. Hit Send — owner replies with pricing.",
    category: "general",
  },
];

export function FaqSection({ faqs }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const [cat, setCat] = useState("all");

  const display = faqs.length > 0 ? faqs : fallback;
  const filtered =
    cat === "all" ? display : display.filter((f) => f.category === cat);

  return (
    <section id="faq" className="bg-[#F4F4F0] border-t border-[#DDDDD5]">
      {/* Header */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center gap-4">
        <span className="font-fraunces text-[#1C2B1A] text-3xl font-light select-none">
          08
        </span>
        <span className="w-px h-5 bg-[#DDDDD5]" />
        <span className="label text-[#1C2B1A]">Common Questions</span>
      </div>

      {/* Category Pills - More compact horizontal layout */}
      <div className="px-6 md:px-10 py-4 border-b border-[#DDDDD5] flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.value}
            onClick={() => setCat(c.value)}
            className={`px-4 py-1.5 label-sm transition-all duration-200 rounded-full ${
              cat === c.value
                ? "bg-[#1C2B1A] text-[#F4F4F0]"
                : "text-[#8A8A7A] hover:text-[#1C2B1A] hover:bg-[#EEEEE8]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="divide-y divide-[#DDDDD5]">
        {filtered.length === 0 ? (
          <p className="p-8 font-fraunces italic text-[#8A8A7A] text-xl">
            No questions in this category yet.
          </p>
        ) : (
          filtered.map((faq) => (
            <div key={faq._id} className="group">
              <motion.button
                whileTap={{ scale: 0.995 }}
                onClick={() => setOpen(open === faq._id ? null : faq._id)}
                className="w-full flex items-start justify-between gap-6 px-6 md:px-10 py-5 text-left transition-colors duration-200"
              >
                <span className="font-fraunces text-[#1C2B1A] text-lg md:text-xl leading-snug group-hover:text-[#3D6B45] transition-colors">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: open === faq._id ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="text-[#3D6B45] flex-shrink-0 mt-1"
                >
                  <Plus size={16} strokeWidth={1.5} />
                </motion.span>
              </motion.button>
              
              <AnimatePresence initial={false}>
                {open === faq._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-10 pb-6 text-sm md:text-base text-[#8A8A7A] leading-relaxed max-w-3xl">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
