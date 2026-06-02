'use client'
import { useState } from 'react'
import { openWhatsApp, waMessages } from '@/lib/utils'

export function BookingSection() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', desc: '' })
  const [meetingType, setMeetingType] = useState<'showroom' | 'video'>('showroom')
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleBook = () => {
    openWhatsApp(waMessages.bookVisit({
      name:  form.name  || '[Not provided]',
      phone: form.phone || '[Not provided]',
      date:  form.date  || '[Not selected]',
      time:  form.time  || '[Not selected]',
      type:  meetingType === 'showroom' ? '🏪 Visit Showroom' : '📱 Video Call',
      desc:  form.desc  || '[Not specified]',
    }))
  }

  const inputClass = "w-full bg-[#F0EDE6] border border-[#0D0D0D]/15 text-[#0D0D0D] px-4 py-3 text-sm font-sans focus:border-[#E8892A] outline-none transition-colors"
  const labelClass = "text-label-sm text-[#7A7A7A] block mb-2"

  return (
    <section id="booking" className="bg-[#F0EDE6] text-[#0D0D0D] border-t border-[#0D0D0D]/10">

      {/* Header */}
      <div className="border-b border-[#0D0D0D]/10 px-6 md:px-10 py-5 flex items-center gap-4">
        <span className="font-mono text-[9px] text-[#7A7A7A] tracking-widest">06</span>
        <span className="w-px h-4 bg-[#0D0D0D]/20" />
        <span className="text-label text-[#0D0D0D]">Book a 1:1</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#0D0D0D]/10">

        {/* Left — why */}
        <div className="px-6 md:px-10 py-12 flex flex-col gap-8 relative overflow-hidden">

          {/* Big background number */}
          <span className="absolute right-0 bottom-0 font-serif text-[#0D0D0D]/[0.04] leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(120px, 20vw, 260px)' }}>
            1:1
          </span>

          <div>
            <h2 className="font-serif text-large text-[#0D0D0D] leading-none mb-4">
              Not sure<br />
              <em>what you need?</em>
            </h2>
            <p className="text-[#7A7A7A] text-sm leading-relaxed max-w-sm">
              The owner will walk you through it — in the showroom or on a call. Bring your floor plan, photos, or just a rough idea.
            </p>
          </div>

          <div className="space-y-5">
            {[
              { icon: '🏪', title: 'In-Store Visit',    desc: 'See products first-hand. 30 min session with the owner.' },
              { icon: '📱', title: 'Video Call',         desc: 'Quick consultation from wherever you are.'               },
              { icon: '💬', title: 'Confirmed on WhatsApp', desc: 'Owner confirms your slot directly. No app needed.'   },
            ].map(b => (
              <div key={b.title} className="flex gap-4 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <p className="font-medium text-sm text-[#0D0D0D]">{b.title}</p>
                  <p className="text-xs text-[#7A7A7A] mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="px-6 md:px-10 py-12 flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Your Name</label>
              <input type="text" placeholder="Full name" className={inputClass} value={form.name} onChange={set('name')} />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputClass} value={form.phone} onChange={set('phone')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Preferred Date</label>
              <input type="date" className={inputClass} value={form.date} onChange={set('date')} />
            </div>
            <div>
              <label className={labelClass}>Preferred Time</label>
              <select className={inputClass} value={form.time} onChange={set('time')}>
                <option value="">Select slot</option>
                <option>Morning (10am – 12pm)</option>
                <option>Afternoon (12pm – 3pm)</option>
                <option>Evening (4pm – 7pm)</option>
              </select>
            </div>
          </div>

          {/* Meeting type toggle */}
          <div>
            <label className={labelClass}>Meeting Type</label>
            <div className="flex border border-[#0D0D0D]/15">
              {(['showroom', 'video'] as const).map(type => (
                <button key={type} onClick={() => setMeetingType(type)}
                  className={`flex-1 py-3 text-label transition-colors duration-200 border-r border-[#0D0D0D]/15 last:border-r-0 ${
                    meetingType === type
                      ? 'bg-[#0D0D0D] text-[#F0EDE6]'
                      : 'text-[#7A7A7A] hover:text-[#0D0D0D]'
                  }`}>
                  {type === 'showroom' ? '🏪 Visit Store' : '📱 Video Call'}
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
            className="w-full bg-[#0D0D0D] text-[#F0EDE6] py-4 text-label hover:bg-[#E8892A] hover:text-[#0D0D0D] transition-colors duration-200">
            Confirm Booking via WhatsApp →
          </button>
          <p className="text-center text-label-sm text-[#7A7A7A]">Opens WhatsApp with your details pre-filled</p>
        </div>
      </div>
    </section>
  )
}
