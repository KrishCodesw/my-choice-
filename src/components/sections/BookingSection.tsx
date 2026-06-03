'use client'
import { useState } from 'react'
import { openWhatsApp, waMessages } from '@/lib/utils'

export function BookingSection() {
  const [form, setForm] = useState({ name:'', phone:'', date:'', time:'', desc:'' })
  const [meetingType, setMeetingType] = useState<'showroom'|'video'>('showroom')
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleBook = () => openWhatsApp(waMessages.bookVisit({
    name:  form.name  || '[Not provided]',
    phone: form.phone || '[Not provided]',
    date:  form.date  || '[Not selected]',
    time:  form.time  || '[Not selected]',
    type:  meetingType === 'showroom' ? '🏪 Visit Showroom' : '📱 Video Call',
    desc:  form.desc  || '[Not specified]',
  }))

  const inputClass = "w-full bg-[#EEEEE8] border border-[#DDDDD5] text-[#1C2B1A] px-4 py-3 text-sm font-chivo focus:border-[#3D6B45] outline-none transition-colors placeholder:text-[#AEAE9E]"
  const labelClass = "label-sm text-[#8A8A7A] block mb-2"

  return (
    <section id="booking" className="bg-[#EEEEE8] border-t border-[#DDDDD5]">

      {/* Header */}
      <div className="border-b border-[#DDDDD5] px-6 md:px-10 py-4 flex items-center gap-4">
        <span className="font-fraunces text-[#DDDDD5] text-3xl font-light select-none">06</span>
        <span className="w-px h-5 bg-[#DDDDD5]" />
        <span className="label text-[#1C2B1A]">Book a 1:1</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DDDDD5]">

        {/* Left — why */}
        <div className="px-6 md:px-10 py-12 flex flex-col gap-8 relative overflow-hidden">
          <div className="absolute right-6 bottom-6 font-fraunces text-[#1C2B1A]/[0.04] leading-none select-none pointer-events-none text-[160px]">
            1:1
          </div>
          <div>
            <h2 className="font-fraunces text-large text-[#1C2B1A] leading-none mb-4">
              Not sure<br />
              <em className="text-[#3D6B45]">what you need?</em>
            </h2>
            <p className="text-sm text-[#8A8A7A] leading-relaxed max-w-sm">
              The owner will walk you through it — in the showroom or on a call. Bring your floor plan, photos, or just a rough idea.
            </p>
          </div>
          <div className="space-y-5">
            {[
              { icon:'🏪', title:'In-Store Visit',       desc:'See products first-hand. 30 min session with the owner.'   },
              { icon:'📱', title:'Video Call',            desc:'Quick consultation from wherever you are.'                 },
              { icon:'💬', title:'Confirmed on WhatsApp', desc:'Owner confirms your slot directly. No app needed.'         },
            ].map(b => (
              <div key={b.title} className="flex gap-4 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <p className="font-chivo font-medium text-sm text-[#1C2B1A]">{b.title}</p>
                  <p className="text-xs text-[#8A8A7A] mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="px-6 md:px-10 py-12 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Your Name</label><input type="text" placeholder="Full name" className={inputClass} value={form.name} onChange={set('name')} /></div>
            <div><label className={labelClass}>Phone</label><input type="tel" placeholder="+91 XXXXX XXXXX" className={inputClass} value={form.phone} onChange={set('phone')} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Date</label><input type="date" className={inputClass} value={form.date} onChange={set('date')} /></div>
            <div>
              <label className={labelClass}>Time</label>
              <select className={inputClass} value={form.time} onChange={set('time')}>
                <option value="">Select slot</option>
                <option>Morning (10am – 12pm)</option>
                <option>Afternoon (12pm – 3pm)</option>
                <option>Evening (4pm – 7pm)</option>
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Meeting Type</label>
            <div className="flex border border-[#DDDDD5]">
              {(['showroom','video'] as const).map(t => (
                <button key={t} onClick={() => setMeetingType(t)}
                  className={`flex-1 py-3 label transition-colors duration-200 border-r border-[#DDDDD5] last:border-r-0 ${
                    meetingType === t ? 'bg-[#1C2B1A] text-[#F4F4F0]' : 'text-[#8A8A7A] hover:text-[#1C2B1A]'
                  }`}>
                  {t === 'showroom' ? '🏪 Visit Store' : '📱 Video Call'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>What do you need help with?</label>
            <textarea rows={3} placeholder="e.g. Electrical for 3BHK, sanitary for 2 bathrooms..."
              className={`${inputClass} resize-none`} value={form.desc} onChange={set('desc')} />
          </div>
          <button onClick={handleBook}
            className="w-full bg-[#3D6B45] text-[#F4F4F0] py-4 label hover:bg-[#1C2B1A] transition-colors duration-200">
            Confirm Booking via WhatsApp →
          </button>
          <p className="text-center label-sm text-[#AEAE9E]">Opens WhatsApp with your details pre-filled</p>
        </div>
      </div>
    </section>
  )
}
