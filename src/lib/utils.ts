import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '91XXXXXXXXXX'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WA}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener')
}

export function openWhatsAppTo(phone: string, message: string): void {
  const clean = phone.replace(/\D/g, '')
  window.open(`https://wa.me/${clean}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
}

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
    name: string; phone: string; job: string
    area: string; date: string; desc: string
  }) =>
    `Hello MyChoice! 👋\n\nI need a verified worker.\n\n` +
    `👤 *Name:* ${data.name}\n` +
    `📞 *My WhatsApp:* ${data.phone}\n` +
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

  // Owner → Worker: job assigned
  jobAssignedToWorker: (data: {
    workerName: string; customerName: string; customerPhone: string
    customerArea: string; jobType: string; scheduledDate: string
    scheduledTime: string; description: string; ownerNotes: string
  }) =>
    `Hi ${data.workerName}! 👷\n\n` +
    `*New job assigned from MyChoice:*\n\n` +
    `👤 *Customer:* ${data.customerName}\n` +
    `📞 *Contact:* ${data.customerPhone}\n` +
    `📍 *Location:* ${data.customerArea}\n` +
    `🔧 *Job:* ${data.jobType}\n` +
    `📅 *Date:* ${data.scheduledDate}\n` +
    `⏰ *Time:* ${data.scheduledTime}\n` +
    `📝 *Details:* ${data.description}\n` +
    (data.ownerNotes ? `\n🗒️ *Notes from owner:* ${data.ownerNotes}\n` : '') +
    `\nPlease confirm you can make it. Thank you!`,

  // Owner → Customer: job confirmed
  jobConfirmedToCustomer: (data: {
    customerName: string; workerName: string; workerSpecialty: string
    scheduledDate: string; scheduledTime: string; jobType: string
    ratingLink: string
  }) =>
    `Hello ${data.customerName}! 👋\n\n` +
    `*Your job request has been confirmed by MyChoice.*\n\n` +
    `🔧 *Job:* ${data.jobType}\n` +
    `👷 *Worker:* ${data.workerName} (${data.workerSpecialty})\n` +
    `📅 *Date:* ${data.scheduledDate}\n` +
    `⏰ *Time:* ${data.scheduledTime}\n\n` +
    `The worker will arrive at your location. For any changes, contact MyChoice directly.\n\n` +
    `After the job is done, please rate your experience:\n${data.ratingLink}`,

  // Owner → Customer: job complete, please rate
  jobRatingRequest: (data: {
    customerName: string; workerName: string; ratingLink: string
  }) =>
    `Hello ${data.customerName}! 👋\n\n` +
    `We hope ${data.workerName} did a great job for you!\n\n` +
    `Please take 10 seconds to rate your experience — it helps us maintain quality:\n` +
    `${data.ratingLink}\n\n` +
    `Thank you for choosing MyChoice! 🙏`,
}

export const sectorMeta = {
  electrical: { label: 'Electrical',    emoji: '⚡' },
  hardware:   { label: 'Hardware',      emoji: '🔧' },
  sanitary:   { label: 'Sanitary Ware', emoji: '🚿' },
} as const

export const specialtyMeta = {
  electrician: { label: 'Electrician',      emoji: '⚡' },
  plumber:     { label: 'Plumber',          emoji: '🔧' },
  carpenter:   { label: 'Carpenter',        emoji: '🪚' },
  tiler:       { label: 'Tiler',            emoji: '🪟' },
  general:     { label: 'General Worker',   emoji: '👷' },
} as const

export const jobTypeMeta: Record<string, { label: string; emoji: string }> = {
  electrical: { label: 'Electrical Work',     emoji: '⚡' },
  plumbing:   { label: 'Plumbing',            emoji: '🚿' },
  carpentry:  { label: 'Carpentry / Fitting', emoji: '🪚' },
  tiling:     { label: 'Tiling',              emoji: '🪟' },
  general:    { label: 'General Labour',      emoji: '👷' },
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
