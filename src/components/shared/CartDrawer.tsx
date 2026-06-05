'use client'
import { useEffect, useRef } from 'react'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartContext } from './CartProvider'
import { openWhatsApp, waMessages } from '@/lib/utils'

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeItem, updateQty, totalItems } = useCartContext()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Trap focus inside drawer when open
  useEffect(() => {
    if (!isOpen) return
    const drawer = drawerRef.current
    if (!drawer) return
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    first?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [setIsOpen])

  const handleGetQuote = () => {
    if (!cart.length) return
    openWhatsApp(waMessages.quoteCart(cart.map(c => ({ name: c.name, brand: c.brand, qty: c.qty }))))
  }

  return (
    <>
      {/* Backdrop — fades in/out */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(28,43,26,0.35)',
          backdropFilter: 'blur(2px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          /* Specific property, not `all` */
          transition: 'opacity 240ms cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Drawer — iOS-like enter/exit curve */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quote list"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '100%', maxWidth: 380,
          zIndex: 51,
          display: 'flex', flexDirection: 'column',
          background: '#F4F4F0',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          /* Drawer curve — cubic-bezier(0.32,0.72,0,1) */
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: isOpen
            ? 'transform 340ms cubic-bezier(0.32,0.72,0,1)'
            : 'transform 240ms cubic-bezier(0.32,0.72,0,1)', /* exit faster */
        }}
      >
        {/* Header */}
        <div className="bg-[#1C2B1A] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="font-fraunces text-[#F4F4F0] text-xl">Quote List</h2>
            <p className="label-sm text-[#8A8A7A] mt-0.5">
              {totalItems} item{totalItems !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="btn text-[#8A8A7A] hover:text-[#F4F4F0] p-1 rounded-sm"
            style={{ transition: 'color 120ms cubic-bezier(0.23,1,0.32,1)' }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag
                size={40} strokeWidth={1}
                className="text-[#DDDDD5]"
                style={{
                  opacity: 0,
                  animation: 'fadeIn 300ms cubic-bezier(0.23,1,0.32,1) 100ms forwards',
                }}
              />
              <p
                className="text-sm text-[#8A8A7A]"
                style={{
                  opacity: 0,
                  animation: 'fadeUp 300ms cubic-bezier(0.23,1,0.32,1) 150ms forwards',
                }}
              >
                Your quote list is empty.<br />Browse products and add items.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="btn label text-[#1C2B1A] border border-[#DDDDD5] px-5 py-2.5"
                style={{
                  opacity: 0,
                  animation: 'fadeUp 300ms cubic-bezier(0.23,1,0.32,1) 200ms forwards',
                  /* Active press feedback */
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#DDDDD5]">
              {cart.map((item, i) => (
                <div
                  key={item.productId}
                  className="flex gap-3 items-center px-6 py-4"
                  style={{
                    /* Stagger items on open — 30-80ms between each */
                    opacity: 0,
                    animation: `fadeUp 250ms cubic-bezier(0.23,1,0.32,1) ${i * 40}ms forwards`,
                    /* Subtle hover only on pointer devices */
                  }}
                >
                  <div className="w-10 h-10 bg-[#1C2B1A] flex items-center justify-center text-lg flex-shrink-0">
                    {item.sector === 'electrical' ? '⚡' : item.sector === 'hardware' ? '🔧' : '🚿'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="label-sm text-[#3D6B45]">{item.brand}</p>
                    <p className="text-sm text-[#1C2B1A] font-medium leading-tight truncate">{item.name}</p>
                  </div>

                  {/* Qty controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className="btn w-6 h-6 border border-[#DDDDD5] flex items-center justify-center rounded-sm"
                      style={{ transition: 'border-color 120ms, transform 100ms cubic-bezier(0.23,1,0.32,1)' }}
                    >
                      <Minus size={9} strokeWidth={1.5} />
                    </button>
                    <span className="text-sm font-chivo w-5 text-center text-[#1C2B1A] tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      aria-label="Increase quantity"
                      className="btn w-6 h-6 border border-[#DDDDD5] flex items-center justify-center rounded-sm"
                      style={{ transition: 'border-color 120ms, transform 100ms cubic-bezier(0.23,1,0.32,1)' }}
                    >
                      <Plus size={9} strokeWidth={1.5} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    aria-label={`Remove ${item.name}`}
                    className="btn text-[#AEAE9E] ml-1 p-0.5 rounded-sm"
                    style={{ transition: 'color 120ms, transform 100ms cubic-bezier(0.23,1,0.32,1)' }}
                  >
                    <X size={13} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 border-t border-[#DDDDD5] p-6">
            <p className="label-sm text-[#AEAE9E] text-center mb-3">
              Opens WhatsApp with your full list pre-filled
            </p>
            <button
              onClick={handleGetQuote}
              className="btn w-full bg-[#25d366] text-white py-4 label rounded-sm"
              style={{
                transition: 'background-color 150ms cubic-bezier(0.23,1,0.32,1), transform 100ms cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#1da851'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.backgroundColor = '#25d366'
              }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get Quote on WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  )
}
