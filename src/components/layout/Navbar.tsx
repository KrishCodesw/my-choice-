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
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          /* Specific properties only — never transition: all */
          transition: 'background-color 200ms cubic-bezier(0.23,1,0.32,1), border-color 200ms cubic-bezier(0.23,1,0.32,1)',
          backgroundColor: scrolled ? 'rgba(244,244,240,0.96)' : 'transparent',
          borderBottom: scrolled ? '1px solid #DDDDD5' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* Logo */}
          <a
            href="#home"
            className="font-fraunces text-[#1C2B1A] text-xl tracking-tight"
            style={{ transition: 'color 150ms cubic-bezier(0.23,1,0.32,1)' }}
          >
            My<em className="text-[#3D6B45] not-italic">Choice</em>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="label text-[#8A8A7A]"
                style={{ transition: 'color 120ms cubic-bezier(0.23,1,0.32,1)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1C2B1A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A8A7A')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="#booking"
              className="hidden md:flex label text-[#F4F4F0] bg-[#1C2B1A] px-5 py-2.5"
              style={{ transition: 'background-color 150ms cubic-bezier(0.23,1,0.32,1), transform 100ms cubic-bezier(0.23,1,0.32,1)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3D6B45')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1C2B1A')}
            >
              Book 1:1
            </a>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label={`Open quote list${totalItems > 0 ? `, ${totalItems} items` : ''}`}
              className="relative p-2 text-[#8A8A7A]"
              style={{ transition: 'color 120ms cubic-bezier(0.23,1,0.32,1), transform 100ms cubic-bezier(0.23,1,0.32,1)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1C2B1A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A8A7A')}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-[#3D6B45] text-[#F4F4F0] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-chivo tabular-nums"
                  style={{ animation: 'fadeIn 200ms cubic-bezier(0.23,1,0.32,1) forwards' }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-[#8A8A7A]"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ transition: 'color 120ms, transform 100ms cubic-bezier(0.23,1,0.32,1)' }}
            >
              {mobileOpen
                ? <X size={18} strokeWidth={1.5} />
                : <Menu size={18} strokeWidth={1.5} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — slides down */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: '#F4F4F0',
          /* Translate, not opacity — keeps layout stable */
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)',
          /* Drawer curve for menu too */
          transition: mobileOpen
            ? 'transform 360ms cubic-bezier(0.32,0.72,0,1)'
            : 'transform 260ms cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        <div className="flex flex-col px-8 pt-24 pb-10 gap-0">
          {[...links, { label: 'Book 1:1', href: '#booking' }].map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-fraunces text-[#1C2B1A] border-b border-[#DDDDD5] py-5 text-4xl"
              style={{
                /* Stagger each link 40ms */
                opacity:   mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 300ms cubic-bezier(0.23,1,0.32,1) ${i * 40 + 80}ms, transform 300ms cubic-bezier(0.23,1,0.32,1) ${i * 40 + 80}ms, color 120ms`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#3D6B45')}
              onMouseLeave={e => (e.currentTarget.style.color = '#1C2B1A')}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="px-8 pb-10 label text-[#AEAE9E]">
          Mumbai's Exclusive Showroom
        </div>
      </div>
    </>
  )
}
