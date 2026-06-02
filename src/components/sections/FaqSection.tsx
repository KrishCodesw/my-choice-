'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { FAQ } from '@/types'

interface Props { faqs: FAQ[] }

const categories = [
  { value: 'all',        label: 'All'      },
  { value: 'electrical', label: 'Electrical' },
  { value: 'hardware',   label: 'Hardware'  },
  { value: 'sanitary',   label: 'Sanitary'  },
  { value: 'general',    label: 'General'   },
]

const fallback: FAQ[] = [
  { _id: '1', question: 'What wire size for a 1.5 ton AC?',                    answer: "Minimum 2.5mm² copper wire. We recommend Havells or Finolex 2.5mm² FR wire. Come in and we'll advise based on your specific installation.",                        category: 'electrical' },
  { _id: '2', question: 'Which MCB rating for my home?',                       answer: "For a 2-3BHK: 32A or 40A main MCB with 6A–16A branch MCBs. Exact rating depends on total load. Walk in and we'll calculate it free.",                              category: 'electrical' },
  { _id: '3', question: 'CP vs SS bathroom fittings — which is better?',       answer: "CP (Chrome Plated) looks great but tarnishes in humid Mumbai conditions. SS (Stainless Steel) is more durable long-term. We stock both — come see in person.",       category: 'sanitary'   },
  { _id: '4', question: 'What hinge for kitchen cabinets?',                    answer: "Concealed soft-close hinges — Hettich Sensys range. Hidden when closed, silent, built to last decades. Bring your cabinet dimensions and we'll advise the type.",     category: 'hardware'   },
  { _id: '5', question: 'Do I need to buy from MyChoice to use Workers?',      answer: "No — the Workers Network is open to everyone. Submit a request and we'll assign the right verified professional. All coordination through MyChoice.",                  category: 'general'    },
  { _id: '6', question: 'How does the WhatsApp quote system work?',             answer: "Add products to your Quote List, click 'Get Quote on WhatsApp.' It opens WhatsApp with your full list pre-filled. Hit Send — owner replies with pricing directly.", category: 'general'    },
]

export function FaqSection({ faqs }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [cat,  setCat]  = useState('all')

  const display = faqs.length > 0 ? faqs : fallback
  const filtered = cat === 'all' ? display : display.filter(f => f.category === cat)

  return (
    <section id="faq" className="bg-[#F0EDE6] text-[#0D0D0D] border-t border-[#0D0D0D]/10">

      {/* Header */}
      <div className="border-b border-[#0D0D0D]/10 px-6 md:px-10 py-5 flex items-center gap-4">
        <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">08</span>
        <span className="w-px h-4 bg-[#0D0D0D]/20" />
        <span className="text-label text-[#0D0D0D]">Common Questions</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#0D0D0D]/10">

        {/* Category filter — left rail */}
        <div className="p-6 md:p-8 flex flex-col gap-1">
          <p className="text-label-sm text-[#7A7A7A] mb-4">Filter by topic</p>
          {categories.map(c => (
            <button key={c.value} onClick={() => setCat(c.value)}
              className={`text-left py-2 px-3 text-label transition-colors duration-150 ${
                cat === c.value
                  ? 'bg-[#0D0D0D] text-[#F0EDE6]'
                  : 'text-[#7A7A7A] hover:text-[#0D0D0D] hover:bg-[#0D0D0D]/5'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Accordion — right 3 cols */}
        <div className="lg:col-span-3 divide-y divide-[#0D0D0D]/10">
          {filtered.length === 0 ? (
            <p className="p-8 font-serif italic text-[#7A7A7A] text-xl">No questions in this category yet.</p>
          ) : filtered.map(faq => (
            <div key={faq._id}>
              <button
                onClick={() => setOpen(open === faq._id ? null : faq._id)}
                className="w-full flex items-start justify-between gap-6 px-6 md:px-10 py-6 text-left group">
                <span className="font-serif text-[#0D0D0D] text-lg leading-snug group-hover:text-[#E8892A] transition-colors">
                  {faq.question}
                </span>
                <span className="text-[#E8892A] flex-shrink-0 mt-1 transition-transform duration-300"
                  style={{ transform: open === faq._id ? 'rotate(45deg)' : 'none' }}>
                  <Plus size={16} />
                </span>
              </button>
              {open === faq._id && (
                <div className="px-6 md:px-10 pb-6 text-sm text-[#7A7A7A] leading-relaxed max-w-2xl">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
