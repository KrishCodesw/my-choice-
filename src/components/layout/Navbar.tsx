'use client'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartContext } from '@/components/shared/CartProvider'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Products',    href: '#products'  },
  { label: 'New In',      href: '#arrivals'  },
  { label: 'Workers',     href: '#workers'   },
  { label: 'About',       href: '#trust'     },
  { label: 'Find Us',     href: '#contact'   },
]

export function Navbar() {
  const { totalItems, setIsOpen, mounted } = useCartContext()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0f1923]/95 backdrop-blur-md border-b border-[#b87333]/20 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-playfair text-xl font-bold tracking-widest text-[#f7f3ec] uppercase">
          My<span className="text-[#b87333]">Choice</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[11px] tracking-[2px] uppercase text-[#8899aa] hover:text-[#d4956a] transition-colors duration-200 font-outfit font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Book 1:1 CTA */}
          <a
            href="#booking"
            className="hidden md:inline-flex items-center gap-2 bg-[#b87333] text-[#f7f3ec] text-[11px] tracking-[1.5px] uppercase font-medium px-5 py-2.5 hover:bg-[#d4956a] transition-colors duration-200"
          >
            Book 1:1
          </a>

          {/* Cart trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-[#8899aa] hover:text-[#d4956a] transition-colors"
            aria-label="Open quote cart"
          >
            <ShoppingBag size={20} />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b87333] text-[#f7f3ec] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#8899aa] hover:text-[#d4956a] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f1923] border-t border-[#b87333]/20 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-[12px] tracking-[2px] uppercase text-[#8899aa] hover:text-[#d4956a] transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex justify-center bg-[#b87333] text-[#f7f3ec] text-[11px] tracking-[1.5px] uppercase font-medium px-5 py-3 hover:bg-[#d4956a] transition-colors"
          >
            Book 1:1 with Owner
          </a>
        </div>
      )}
    </nav>
  )
}
