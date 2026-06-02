import type { SiteSettings } from '@/types'

interface Props { settings: SiteSettings | null }

export function OwnerSection({ settings }: Props) {
  return (
    <section id="owner" className="bg-[#162030] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <div className="aspect-[3/4] max-w-md bg-[#1e2d40] border border-[#b87333]/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(184,115,51,0.1)_0%,transparent_60%)]" />
            <span className="text-8xl opacity-50 relative z-10">👤</span>
            <span className="text-[11px] tracking-[2px] uppercase text-[#8899aa] relative z-10">Owner Photo</span>
          </div>

          {/* Content */}
          <div>
            <p className="copper-line text-[10px] tracking-[3px] uppercase text-[#b87333] font-medium mb-6">The Face Behind MyChoice</p>

            <blockquote className="font-cormorant italic text-[clamp(20px,2.5vw,28px)] text-[#f7f3ec] font-light leading-relaxed border-l-2 border-[#b87333] pl-6 mb-8">
              "I've spent 15 years making sure every customer walks out with exactly what they need — and nothing they don't."
            </blockquote>

            <h2 className="font-playfair text-3xl font-bold text-[#f7f3ec] mb-1">
              {settings?.ownerName ?? 'The Owner'}
            </h2>
            <p className="text-[11px] tracking-[2px] uppercase text-[#d4956a] mb-6">
              {settings?.ownerTitle ?? 'Founder · MyChoice Electric & Hardware'}
            </p>

            <p className="text-[#8899aa] text-sm leading-relaxed mb-8 max-w-lg">
              {settings?.ownerBio ??
                'With over 15 years of experience in electrical, hardware and sanitary ware, MyChoice was built on one principle — deep product knowledge and honest guidance. Whether you\'re a homeowner or a contractor sourcing for 50 sites, you\'ll get the same attention.'}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#f7f3ec]/20 text-[#f7f3ec] px-5 py-2.5 text-[11px] tracking-[1.5px] uppercase hover:border-[#b87333] hover:text-[#d4956a] transition-colors"
              >
                💬 WhatsApp
              </a>
              {settings?.instagramHandle && (
                <a
                  href={`https://instagram.com/${settings.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#f7f3ec]/20 text-[#f7f3ec] px-5 py-2.5 text-[11px] tracking-[1.5px] uppercase hover:border-[#b87333] hover:text-[#d4956a] transition-colors"
                >
                  📸 Instagram
                </a>
              )}
              <a
                href="#booking"
                className="bg-[#b87333] text-[#f7f3ec] px-5 py-2.5 text-[11px] tracking-[1.5px] uppercase hover:bg-[#d4956a] transition-colors"
              >
                Book 1:1 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
