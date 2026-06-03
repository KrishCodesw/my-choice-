'use client'
import { useState, useEffect, useRef } from 'react'
import { openWhatsApp, waMessages, specialtyMeta } from '@/lib/utils'
import type { Worker } from '@/types'

interface Props { workers: Worker[] }

const fallback: Partial<Worker>[] = [
  { _id:'1', name:'Ramesh Sharma',   specialty:'electrician', experience:12, rating:5 },
  { _id:'2', name:'Anil Patil',      specialty:'plumber',     experience:8,  rating:5 },
  { _id:'3', name:'Vijay Carpenter', specialty:'carpenter',   experience:10, rating:4 },
  { _id:'4', name:'Suresh Kumar',    specialty:'electrician', experience:6,  rating:4 },
]

export function WorkersSection({ workers }: Props) {
  const [jobType, setJobType] = useState('Electrical Work')
  const [area,    setArea]    = useState('')
  const [date,    setDate]    = useState('')
  const [desc,    setDesc]    = useState('')
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.06 }
    )
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleRequest = () => openWhatsApp(waMessages.workerRequest({
    job:  jobType,
    area: area || '[Not specified]',
    date: date  || '[Not specified]',
    desc: desc  || '[No description]',
  }))

  const display = workers.length > 0 ? workers : fallback

  const inputClass = "w-full bg-[#EEEEE8] border border-[#DDDDD5] text-[#1C2B1A] px-4 py-3 text-sm font-chivo focus:border-[#3D6B45] outline-none transition-colors placeholder:text-[#AEAE9E]"
  const labelClass = "label-sm text-[#8A8A7A] block mb-2"

  return (
    <section id="workers" ref={ref} className="bg-[#F4F4F0] border-t border-[#DDDDD5]">

      {/* Header */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-fraunces text-[#DDDDD5] text-3xl font-light select-none">05</span>
          <span className="w-px h-5 bg-[#DDDDD5]" />
          <span className="label text-[#1C2B1A]">Workers Network</span>
        </div>
        <span className="label-sm text-[#AEAE9E]">All contact via MyChoice only</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DDDDD5]">

        {/* Workers list */}
        <div>
          <div className="divide-y divide-[#DDDDD5]">
            {display.map((w, i) => (
              <div key={w._id}
                className="reveal flex items-center gap-5 px-6 md:px-10 py-6 hover:bg-[#EEEEE8] transition-colors duration-200"
                style={{ transitionDelay: `${i * 55}ms` }}>
                <span className="font-fraunces text-[#DDDDD5] text-2xl font-light w-8 flex-shrink-0 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-fraunces text-[#1C2B1A] text-xl">{w.name}</h3>
                    <span className="label-sm text-[#3D6B45] border border-[#3D6B45]/30 bg-[#EBF2EC] px-2 py-0.5">✓ Verified</span>
                  </div>
                  <p className="label-sm text-[#3D6B45]">
                    {w.specialty ? specialtyMeta[w.specialty]?.label : 'Specialist'}
                    {w.experience ? ` · ${w.experience} yrs` : ''}
                  </p>
                </div>
                {w.rating && (
                  <div className="text-[#3D6B45] text-xs tracking-wider flex-shrink-0">
                    {'★'.repeat(Math.round(w.rating))}
                  </div>
                )}
                <span className="text-[#DDDDD5] flex-shrink-0">🔒</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#DDDDD5] px-6 md:px-10 py-6">
            <p className="text-sm text-[#8A8A7A] leading-relaxed max-w-sm">
              Worker contact details are never shared directly. All coordination goes through MyChoice — ensuring quality and full accountability.
            </p>
          </div>
        </div>

        {/* Request form */}
        <div className="p-6 md:p-10 flex flex-col gap-5">
          <div>
            <p className="font-fraunces text-[#1C2B1A] text-2xl mb-1">Request a Worker</p>
            <p className="text-sm text-[#8A8A7A]">We'll assign the right verified professional.</p>
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
            <textarea rows={3} placeholder="Describe the job briefly..."
              value={desc} onChange={e => setDesc(e.target.value)}
              className={`${inputClass} resize-none`} />
          </div>

          <button onClick={handleRequest}
            className="w-full bg-[#1C2B1A] text-[#F4F4F0] py-4 label hover:bg-[#3D6B45] transition-colors duration-200">
            Request via WhatsApp →
          </button>
        </div>
      </div>
    </section>
  )
}
