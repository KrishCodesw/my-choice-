'use client'
import { useState, useEffect, useRef } from 'react'
import { openWhatsApp, waMessages, specialtyMeta } from '@/lib/utils'
import type { Worker } from '@/types'

interface Props { workers: Worker[] }

export function WorkersSection({ workers }: Props) {
  const [jobType, setJobType] = useState('Electrical Work')
  const [area,    setArea]    = useState('')
  const [date,    setDate]    = useState('')
  const [desc,    setDesc]    = useState('')
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.05 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleRequest = () => {
    openWhatsApp(waMessages.workerRequest({
      job: jobType,
      area: area || '[Area not specified]',
      date: date || '[Date not specified]',
      desc: desc || '[No description]',
    }))
  }

  const fallback: Partial<Worker>[] = [
    { _id: '1', name: 'Ramesh Sharma',   specialty: 'electrician', experience: 12, rating: 5 },
    { _id: '2', name: 'Anil Patil',      specialty: 'plumber',     experience: 8,  rating: 5 },
    { _id: '3', name: 'Vijay Carpenter', specialty: 'carpenter',   experience: 10, rating: 4 },
    { _id: '4', name: 'Suresh Kumar',    specialty: 'electrician', experience: 6,  rating: 4 },
  ]
  const display = workers.length > 0 ? workers : fallback

  const inputClass = "w-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#F0EDE6] px-4 py-3 text-sm font-sans focus:border-[#E8892A] outline-none transition-colors placeholder:text-[#3A3A3A]"
  const labelClass = "text-label-sm text-[#7A7A7A] block mb-2"

  return (
    <section id="workers" ref={ref} className="bg-[#0D0D0D] border-t border-[#232323]">

      {/* Header */}
      <div className="border-b border-[#232323] px-6 md:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">05</span>
          <span className="w-px h-4 bg-[#232323]" />
          <span className="text-label text-[#F0EDE6]">Workers Network</span>
        </div>
        <span className="text-label-sm text-[#7A7A7A]">All contact via MyChoice only</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#232323]">

        {/* Workers list */}
        <div>
          <div className="divide-y divide-[#232323]">
            {display.map((w, i) => (
              <div key={w._id}
                className="reveal flex items-center gap-5 px-6 md:px-10 py-6 hover:bg-[#1A1A1A] transition-colors"
                style={{ transitionDelay: `${i * 60}ms` }}>

                {/* Index */}
                <span className="font-mono text-[#232323] text-2xl font-bold flex-shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-[#F0EDE6] text-xl">{w.name}</h3>
                    <span className="text-label-sm text-[#52b788] border border-[#52b788]/30 px-2 py-0.5">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-label-sm text-[#E8892A]">
                    {w.specialty ? specialtyMeta[w.specialty]?.label : 'Specialist'}
                    {w.experience ? ` · ${w.experience} yrs` : ''}
                  </p>
                </div>

                {/* Stars */}
                {w.rating && (
                  <div className="text-[#E8892A] text-xs tracking-wider flex-shrink-0">
                    {'★'.repeat(Math.round(w.rating))}
                  </div>
                )}

                {/* Lock icon */}
                <div className="flex-shrink-0 text-[#232323] text-lg">🔒</div>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="border-t border-[#232323] px-6 md:px-10 py-5">
            <p className="text-sm text-[#7A7A7A] leading-relaxed max-w-sm">
              Worker contact details are not shared directly. All job coordination goes through MyChoice — ensuring quality and accountability.
            </p>
          </div>
        </div>

        {/* Request form */}
        <div className="p-6 md:p-10 flex flex-col gap-5">
          <div>
            <p className="text-label text-[#F0EDE6] mb-1">Request a Worker</p>
            <p className="text-sm text-[#7A7A7A]">Fill in the details — we'll assign the right professional.</p>
          </div>

          <div>
            <label className={labelClass}>Job Type</label>
            <select value={jobType} onChange={e => setJobType(e.target.value)} className={inputClass}>
              <option>Electrical Work</option>
              <option>Plumbing</option>
              <option>Carpentry / Fitting</option>
              <option>Tiling</option>
              <option>General Labour</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Your Area</label>
              <input type="text" placeholder="e.g. Andheri West"
                value={area} onChange={e => setArea(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Preferred Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Brief Description</label>
            <textarea rows={3} placeholder="Describe the job..."
              value={desc} onChange={e => setDesc(e.target.value)}
              className={`${inputClass} resize-none`} />
          </div>

          <button onClick={handleRequest}
            className="w-full bg-[#E8892A] text-[#0D0D0D] py-4 text-label hover:bg-[#F0EDE6] transition-colors duration-200">
            Request via WhatsApp →
          </button>
        </div>
      </div>
    </section>
  )
}
