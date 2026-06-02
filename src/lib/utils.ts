import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── WhatsApp URL builder ─────────────────────────────────────
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '91XXXXXXXXXX'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener')
}

// ─── Pre-built WhatsApp messages ─────────────────────────────
export const waMessages = {
  general: () =>
    `Hello MyChoice! 👋\n\nI found you online and wanted to connect.`,

  directions: () =>
    `Hello MyChoice! 👋\n\nCould you please share your store location / directions?`,

  bookVisit: (data: {
    name: string; phone: string; date: string
    time: string; type: string; desc: string
  }) =>
    `Hello MyChoice! 👋\n\nI'd like to book a 1:1 consultation.\n\n` +
    `👤 *Name:* ${data.name}\n` +
    `📞 *Phone:* ${data.phone}\n` +
    `📅 *Date:* ${data.date}\n` +
    `⏰ *Time:* ${data.time}\n` +
    `🤝 *Meeting type:* ${data.type}\n` +
    `📋 *What I need:* ${data.desc}\n\n` +
    `Please confirm my slot. Thank you!`,

  workerRequest: (data: {
    job: string; area: string; date: string; desc: string
  }) =>
    `Hello MyChoice! 👋\n\nI need a verified worker.\n\n` +
    `🔧 *Job type:* ${data.job}\n` +
    `📍 *Location:* ${data.area}\n` +
    `📅 *Preferred date:* ${data.date}\n` +
    `📝 *Details:* ${data.desc}\n\n` +
    `Please assign someone. Thank you!`,

  quoteCart: (items: { name: string; brand: string; qty: number }[]) => {
    const list = items.map(i => `• ${i.brand} ${i.name} × ${i.qty}`).join('\n')
    return (
      `Hello MyChoice! 👋\n\nI'd like a quote for the following:\n\n` +
      `🛒 *My Requirements:*\n${list}\n\n` +
      `Please share the best price. Thank you!`
    )
  },
}

// ─── Sector display helpers ───────────────────────────────────
export const sectorMeta = {
  electrical: { label: 'Electrical', emoji: '⚡', color: 'amber' },
  hardware:   { label: 'Hardware',   emoji: '🔧', color: 'slate' },
  sanitary:   { label: 'Sanitary Ware', emoji: '🚿', color: 'blue' },
} as const

export const specialtyMeta = {
  electrician: { label: 'Electrician', emoji: '⚡' },
  plumber:     { label: 'Plumber',     emoji: '🔧' },
  carpenter:   { label: 'Carpenter',   emoji: '🪚' },
  tiler:       { label: 'Tiler',       emoji: '🪟' },
  general:     { label: 'General Worker', emoji: '👷' },
} as const
