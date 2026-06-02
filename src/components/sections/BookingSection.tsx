'use client'
import { useState } from 'react'
import { openWhatsApp, waMessages } from '@/lib/utils'

export function BookingSection() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', desc: '' })
  const [meetingType, setMeetingType] = useState<'showroom' | 'video'>('showroom')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleBook = () => {
    const msg = waMessages.bookVisit({
      name: form.name || '[Not provided]',
      phone: form.phone || '[Not provided]',
      date: form.date || '[Not selected]',
      time: form.time || '[Not selected]',
      type: meetingType === 'showroom' ? '🏪 Visit Showroom' : '📱 Video Call',
      desc: form.desc || '[Not specified]',
    })
    openWhatsApp(msg)
  }

  const inputClass = "w-full bg-[#0f1923] border border-[#1e2d40] text-[#1a1a2e] bg-white px-4 py-3 text-sm font-outfit focus:border-[#b87333] outline-none transition-colors"
  const labelClass = "block text-[10px] tracking-[2px] uppercase text-[#8a7d6e] mb-2"

  return (
    <section id="booking" className="bg-[#ede7db] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-3">Expert Consultation</p>
            <h2 className="font-playfair text-headline font-bold text-[#1a1a2e] mb-6">
              BOOK A <em className="text-[#b87333]">1:1</em>
            </h2>
            <p className="text-[#8a7d6e] text-sm leading-relaxed max-w-md mb-10">
              Not sure what you need? The owner will walk you through it — whether you visit the showroom or hop on a quick call.
            </p>

            {/* Info blocks */}
            <div className="space-y-6">
              {[
                { icon: '🏪', title: 'In-Store', desc: 'Visit the showroom and see products first-hand. 30 min session.' },
                { icon: '📱', title: 'Video Call', desc: 'Quick consultation from wherever you are. Share photos, get guidance.' },
                { icon: '💬', title: 'Confirmed on WhatsApp', desc: 'The owner confirms your slot directly. No app needed.' },
              ].map(b => (
                <div key={b.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#0f1923] flex items-center justify-center text-lg flex-shrink-0">{b.icon}</div>
                  <div>
                    <h4 className="font-medium text-[#1a1a2e] text-sm mb-0.5">{b.title}</h4>
                    <p className="text-xs text-[#8a7d6e] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-[#f7f3ec] p-8 border border-[#ede7db]">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Your Name</label>
                <input type="text" placeholder="Full name" className={inputClass} value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className={inputClass} value={form.phone} onChange={set('phone')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>Preferred Date</label>
                <input type="date" className={inputClass} value={form.date} onChange={set('date')} />
              </div>
              <div>
                <label className={labelClass}>Preferred Time</label>
                <select className={inputClass} value={form.time} onChange={set('time')}>
                  <option value="">Select a slot</option>
                  <option>Morning (10am – 12pm)</option>
                  <option>Afternoon (12pm – 3pm)</option>
                  <option>Evening (4pm – 7pm)</option>
                </select>
              </div>
            </div>

            {/* Meeting type */}
            <div className="mb-4">
              <label className={labelClass}>Meeting Type</label>
              <div className="flex border border-[#ede7db]">
                {(['showroom', 'video'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setMeetingType(type)}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-r border-[#ede7db] last:border-r-0 ${
                      meetingType === type ? 'bg-[#0f1923] text-[#d4956a]' : 'text-[#8a7d6e] hover:bg-[#ede7db]'
                    }`}
                  >
                    {type === 'showroom' ? '🏪 Visit Showroom' : '📱 Video Call'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className={labelClass}>What do you need help with?</label>
              <textarea
                rows={3}
                placeholder="e.g. Electrical for 3BHK, sanitary fittings for 2 bathrooms..."
                className={`${inputClass} resize-none`}
                value={form.desc}
                onChange={set('desc')}
              />
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-[#b87333] text-[#f7f3ec] py-4 text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#d4956a] transition-colors"
            >
              Confirm Booking via WhatsApp →
            </button>
            <p className="text-center text-xs text-[#8a7d6e] mt-3">Opens WhatsApp with your details pre-filled</p>
          </div>
        </div>
      </div>
    </section>
  )
}
