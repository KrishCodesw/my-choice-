'use client'
import { useState } from 'react'
import { openWhatsApp, waMessages, specialtyMeta } from '@/lib/utils'
import type { Worker } from '@/types'

interface Props { workers: Worker[] }

export function WorkersSection({ workers }: Props) {
  const [jobType, setJobType] = useState('Electrical Work')
  const [area, setArea] = useState('')
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')

  const handleRequest = () => {
    const msg = waMessages.workerRequest({
      job: jobType,
      area: area || '[Area not specified]',
      date: date || '[Date not specified]',
      desc: desc || '[No description provided]',
    })
    openWhatsApp(msg)
  }

  return (
    <section id="workers" className="bg-[#0f1923] py-24 px-6 section-grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">Trusted Professionals</p>
          <h2 className="font-playfair text-headline font-bold text-[#f7f3ec]">
            WORKERS <em className="text-[#b87333]">NETWORK</em>
          </h2>
          <p className="text-[#8899aa] text-sm mt-3 max-w-xl leading-relaxed">
            Verified electricians, plumbers, and carpenters — vetted and approved by MyChoice. All service requests go through us. No direct contact shared with workers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Workers grid */}
          <div>
            {workers.length === 0 ? (
              <div className="text-[#8899aa] font-cormorant italic text-xl py-10">
                Worker profiles will appear here once added in Sanity Studio.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workers.map(w => (
                  <div key={w._id} className="bg-[#162030] border border-[#b87333]/10 p-6 hover:border-[#b87333]/30 transition-colors relative">
                    <span className="absolute top-4 right-4 text-[#52b788] text-[9px] tracking-[1.5px] uppercase border border-[#52b788]/30 px-2 py-0.5 font-semibold">
                      ✓ Verified
                    </span>
                    <div className="w-12 h-12 bg-[#1e2d40] rounded-full flex items-center justify-center text-2xl mb-4">
                      {specialtyMeta[w.specialty]?.emoji ?? '👷'}
                    </div>
                    <h3 className="font-playfair text-xl font-semibold text-[#f7f3ec] mb-1">{w.name}</h3>
                    <p className="text-[10px] tracking-[1.5px] uppercase text-[#b87333] mb-2">{specialtyMeta[w.specialty]?.label}</p>
                    {w.experience && <p className="text-xs text-[#8899aa] mb-2">{w.experience} years experience</p>}
                    {w.rating && (
                      <div className="text-[#b87333] text-sm tracking-wider mb-3">
                        {'★'.repeat(Math.round(w.rating))}{'☆'.repeat(5 - Math.round(w.rating))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[11px] text-[#8899aa] border-t border-[#1e2d40] pt-3 mt-1">
                      <span>🔒</span> Contact via MyChoice only
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Request form */}
          <div className="bg-[#162030] border border-[#b87333]/15 p-8">
            <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-6">Request a Worker</p>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-[#8899aa] mb-2">Job Type</label>
                <select
                  value={jobType}
                  onChange={e => setJobType(e.target.value)}
                  className="w-full bg-[#0f1923] border border-[#1e2d40] text-[#f7f3ec] px-4 py-3 text-sm font-outfit focus:border-[#b87333] outline-none transition-colors"
                >
                  <option>Electrical Work</option>
                  <option>Plumbing</option>
                  <option>Carpentry / Fitting</option>
                  <option>Tiling</option>
                  <option>General Labour</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[2px] uppercase text-[#8899aa] mb-2">Your Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Andheri West"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                    className="w-full bg-[#0f1923] border border-[#1e2d40] text-[#f7f3ec] px-4 py-3 text-sm font-outfit focus:border-[#b87333] outline-none transition-colors placeholder:text-[#8899aa]/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[2px] uppercase text-[#8899aa] mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-[#0f1923] border border-[#1e2d40] text-[#f7f3ec] px-4 py-3 text-sm font-outfit focus:border-[#b87333] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-[2px] uppercase text-[#8899aa] mb-2">Brief Description</label>
                <textarea
                  placeholder="Describe the job briefly..."
                  rows={3}
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full bg-[#0f1923] border border-[#1e2d40] text-[#f7f3ec] px-4 py-3 text-sm font-outfit focus:border-[#b87333] outline-none transition-colors resize-none placeholder:text-[#8899aa]/50"
                />
              </div>

              <button
                onClick={handleRequest}
                className="w-full bg-[#b87333] text-[#f7f3ec] py-4 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#d4956a] transition-colors"
              >
                Request via WhatsApp →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
