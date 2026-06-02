'use client'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartContext } from '@/components/shared/CartProvider'

const links = [
  { label: 'Products', href: '#products' },
  { label: 'New In',   href: '#arrivals' },
  { label: 'Workers',  href: '#workers'  },
  { label: 'Find Us',  href: '#contact'  },
]

export function Navbar() {
  const { totalItems, setIsOpen, mounted } = useCartContext()
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#232323]' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* Logo */}
          <a href="#home" className="font-serif text-[#F0EDE6] text-lg tracking-wide">
            My<span className="text-[#E8892A]">Choice</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="text-label text-[#7A7A7A] hover:text-[#F0EDE6] transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a href="#booking"
              className="hidden md:flex items-center text-label text-[#0D0D0D] bg-[#E8892A] px-4 py-2 hover:bg-[#F0EDE6] transition-colors duration-200">
              Book 1:1
            </a>
            <button onClick={() => setIsOpen(true)}
              className="relative p-2 text-[#7A7A7A] hover:text-[#F0EDE6] transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E8892A] text-[#0D0D0D] text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-[#7A7A7A] hover:text-[#F0EDE6]"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0D0D0D] flex flex-col pt-14">
          <div className="flex flex-col px-6 py-10 gap-6">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-serif text-[#F0EDE6] text-4xl hover:text-[#E8892A] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setMobileOpen(false)}
              className="mt-4 font-serif text-[#F0EDE6] text-4xl hover:text-[#E8892A] transition-colors">
              Book 1:1
            </a>
          </div>
        </div>
      )}
    </>
  )
}
