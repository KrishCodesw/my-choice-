'use client'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartContext } from '@/components/shared/CartProvider'

const links = [
  { label: 'Products', href: '#products' },
  { label: 'New In',   href: '#arrivals' },
  { label: 'Workers',  href: '#workers'  },
  { label: 'About',    href: '#trust'    },
  { label: 'Find Us',  href: '#contact'  },
]

export function Navbar() {
  const { totalItems, setIsOpen, mounted } = useCartContext()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#F4F4F0]/96 backdrop-blur-md border-b border-[#DDDDD5]'
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* Logo */}
          <a href="#home" className="font-fraunces text-[#1C2B1A] text-xl tracking-tight">
            My<em className="text-[#3D6B45]">Choice</em>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="label text-[#8A8A7A] hover:text-[#1C2B1A] transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a href="#booking"
              className="hidden md:flex label text-[#F4F4F0] bg-[#1C2B1A] px-5 py-2.5 hover:bg-[#3D6B45] transition-colors duration-200">
              Book 1:1
            </a>
            <button onClick={() => setIsOpen(true)}
              className="relative p-2 text-[#8A8A7A] hover:text-[#1C2B1A] transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#3D6B45] text-[#F4F4F0] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-chivo">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-[#8A8A7A] hover:text-[#1C2B1A] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`fixed inset-0 z-40 bg-[#F4F4F0] flex flex-col transition-all duration-300 ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col px-8 pt-24 pb-10 gap-2 flex-1">
          {[...links, { label: 'Book 1:1', href: '#booking' }].map((l, i) => (
            <a key={l.href} href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-fraunces text-[#1C2B1A] border-b border-[#DDDDD5] py-5 text-4xl hover:text-[#3D6B45] transition-colors"
              style={{ transitionDelay: `${i * 40}ms` }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="px-8 pb-10 label text-[#8A8A7A]">
          Mumbai's Exclusive Showroom
        </div>
      </div>
    </>
  )
}
