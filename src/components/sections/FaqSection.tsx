'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import type { FAQ } from '@/types'

interface Props { faqs: FAQ[] }

const categories = [
  { value: 'all', label: 'All' },
  { value: 'electrical', label: '⚡ Electrical' },
  { value: 'hardware', label: '🔧 Hardware' },
  { value: 'sanitary', label: '🚿 Sanitary' },
  { value: 'general', label: '🏪 General' },
]

const fallbackFaqs: FAQ[] = [
  { _id: '1', question: 'What wire size should I use for a 1.5 ton AC?', answer: 'For a 1.5 ton AC (typically 1500W), you need a minimum 2.5mm² copper wire. We recommend Havells or Finolex 2.5mm² FR wire. Come to MyChoice and we\'ll show you the right options.', category: 'electrical' },
  { _id: '2', question: 'What\'s the difference between CP and SS bathroom fittings?', answer: 'CP (Chrome Plated) fittings have a shiny chrome finish but can tarnish over time, especially in humid Mumbai conditions. SS (Stainless Steel) fittings are more durable and corrosion-resistant. For Mumbai\'s water quality, we generally recommend SS for long-term use.', category: 'sanitary' },
  { _id: '3', question: 'Which MCB rating is right for my home?', answer: 'For a standard 2-3BHK, you typically need a 32A or 40A main MCB with 6A–16A branch MCBs for individual circuits. The exact rating depends on your total load. Walk into MyChoice and we\'ll calculate the right setup for free.', category: 'electrical' },
  { _id: '4', question: 'Do I need to buy from MyChoice to use the Workers Network?', answer: 'No — the Workers Network is open to everyone. Submit a service request and we\'ll assign the right verified professional. All coordination goes through MyChoice, so you always have a point of contact.', category: 'general' },
  { _id: '5', question: 'How does the WhatsApp quote system work?', answer: 'Browse products, add items to your Quote List, and click "Get Quote on WhatsApp." It opens WhatsApp with a pre-filled message listing all your items. Just hit Send — the owner responds with pricing directly on WhatsApp.', category: 'general' },
]

export function FaqSection({ faqs }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs
  const filtered = activeCategory === 'all' ? displayFaqs : displayFaqs.filter(f => f.category === activeCategory)

  return (
    <section id="faq" className="bg-[#f7f3ec] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left */}
          <div>
            <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">Good to Know</p>
            <h2 className="font-playfair text-headline font-bold text-[#1a1a2e] mb-6">
              COMMON <em className="text-[#b87333]">QUESTIONS</em>
            </h2>
            <p className="text-[#8a7d6e] text-sm leading-relaxed mb-8">
              Real answers to questions our customers ask every day. If your question isn't here, just WhatsApp us.
            </p>

            {/* Category filters */}
            <div className="flex flex-col gap-2">
              {categories.map(c => (
                <button
                  key={c.value}
                  onClick={() => setActiveCategory(c.value)}
                  className={`text-left px-4 py-2.5 text-[11px] tracking-[1.5px] uppercase font-medium transition-colors ${
                    activeCategory === c.value
                      ? 'bg-[#0f1923] text-[#d4956a]'
                      : 'text-[#8a7d6e] hover:text-[#b87333] hover:bg-[#ede7db]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2">
            {filtered.length === 0 ? (
              <p className="text-[#8a7d6e] font-cormorant italic text-xl">No FAQs in this category yet.</p>
            ) : (
              <div className="divide-y divide-[#ede7db]">
                {filtered.map(faq => (
                  <div key={faq._id}>
                    <button
                      onClick={() => setOpen(open === faq._id ? null : faq._id)}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    >
                      <span className="text-[#1a1a2e] font-medium text-sm group-hover:text-[#b87333] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span className="text-[#b87333] flex-shrink-0 transition-transform duration-300" style={{ transform: open === faq._id ? 'rotate(45deg)' : 'none' }}>
                        <Plus size={18} />
                      </span>
                    </button>
                    {open === faq._id && (
                      <div className="pb-5 text-sm text-[#8a7d6e] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
