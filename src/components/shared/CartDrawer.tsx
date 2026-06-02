'use client'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartContext } from './CartProvider'
import { openWhatsApp, waMessages } from '@/lib/utils'

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeItem, updateQty, totalItems } = useCartContext()

  const handleGetQuote = () => {
    if (cart.length === 0) return
    const msg = waMessages.quoteCart(cart.map(c => ({ name: c.name, brand: c.brand, qty: c.qty })))
    openWhatsApp(msg)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#f7f3ec] z-50 flex flex-col shadow-2xl transition-transform duration-400 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="bg-[#0f1923] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="font-playfair text-xl font-semibold text-[#f7f3ec]">Quote List</h2>
            <p className="text-[10px] tracking-[1.5px] uppercase text-[#8899aa] mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[#8899aa] hover:text-[#d4956a] transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-[#ede7db]" />
              <p className="text-[#8a7d6e] text-sm">Your quote list is empty.<br />Browse products and add items.</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] tracking-[2px] uppercase text-[#b87333] border border-[#b87333] px-5 py-2.5 hover:bg-[#b87333] hover:text-white transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#ede7db]">
              {cart.map(item => (
                <div key={item.productId} className="py-4 flex gap-3 items-start">
                  {/* Icon placeholder */}
                  <div className="w-12 h-12 bg-[#0f1923] rounded flex items-center justify-center text-xl flex-shrink-0">
                    {item.sector === 'electrical' ? '⚡' : item.sector === 'hardware' ? '🔧' : '🚿'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#b87333] font-medium tracking-wide uppercase">{item.brand}</p>
                    <p className="text-sm text-[#1a1a2e] font-medium leading-tight mt-0.5">{item.name}</p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.productId, item.qty - 1)} className="w-6 h-6 border border-[#ede7db] bg-white flex items-center justify-center hover:border-[#b87333] transition-colors">
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-medium text-[#1a1a2e] min-w-[20px] text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.productId, item.qty + 1)} className="w-6 h-6 border border-[#ede7db] bg-white flex items-center justify-center hover:border-[#b87333] transition-colors">
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item.productId)} className="text-[#8a7d6e] hover:text-red-500 transition-colors mt-1">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 px-6 py-5 border-t border-[#ede7db]">
            <p className="text-xs text-[#8a7d6e] mb-3 text-center">
              Clicking below opens WhatsApp with your full list pre-filled
            </p>
            <button
              onClick={handleGetQuote}
              className="w-full bg-[#25d366] text-white py-4 flex items-center justify-center gap-3 font-medium text-sm tracking-wide hover:bg-[#1fb558] transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
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
