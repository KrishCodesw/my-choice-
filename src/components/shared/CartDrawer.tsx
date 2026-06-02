'use client'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCartContext } from './CartProvider'
import { openWhatsApp, waMessages } from '@/lib/utils'

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeItem, updateQty, totalItems } = useCartContext()

  const handleGetQuote = () => {
    if (!cart.length) return
    openWhatsApp(waMessages.quoteCart(cart.map(c => ({ name: c.name, brand: c.brand, qty: c.qty }))))
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-[380px] bg-[#F0EDE6] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Header */}
        <div className="bg-[#0D0D0D] px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-[#232323]">
          <div>
            <h2 className="font-serif text-[#F0EDE6] text-xl">Quote List</h2>
            <p className="text-label-sm text-[#7A7A7A] mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-[#7A7A7A] hover:text-[#F0EDE6] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag size={40} className="text-[#0D0D0D]/10" />
              <p className="text-sm text-[#7A7A7A]">Your quote list is empty.<br />Browse products and add items.</p>
              <button onClick={() => setIsOpen(false)}
                className="text-label text-[#0D0D0D] border border-[#0D0D0D] px-5 py-2.5 hover:bg-[#0D0D0D] hover:text-[#F0EDE6] transition-colors">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#0D0D0D]/10">
              {cart.map(item => (
                <div key={item.productId} className="flex gap-3 items-center px-6 py-4">
                  <div className="w-10 h-10 bg-[#0D0D0D] flex items-center justify-center text-lg flex-shrink-0">
                    {item.sector === 'electrical' ? '⚡' : item.sector === 'hardware' ? '🔧' : '🚿'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-label-sm text-[#E8892A]">{item.brand}</p>
                    <p className="text-sm text-[#0D0D0D] font-medium leading-tight truncate">{item.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="w-6 h-6 border border-[#0D0D0D]/15 flex items-center justify-center hover:border-[#E8892A] transition-colors">
                      <Minus size={9} />
                    </button>
                    <span className="text-sm font-mono w-5 text-center text-[#0D0D0D]">{item.qty}</span>
                    <button onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="w-6 h-6 border border-[#0D0D0D]/15 flex items-center justify-center hover:border-[#E8892A] transition-colors">
                      <Plus size={9} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.productId)} className="text-[#7A7A7A] hover:text-red-500 transition-colors ml-1">
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="flex-shrink-0 border-t border-[#0D0D0D]/10 p-6">
            <p className="text-label-sm text-[#7A7A7A] text-center mb-3">
              Opens WhatsApp with your full list pre-filled
            </p>
            <button onClick={handleGetQuote}
              className="w-full bg-[#25d366] text-white py-4 flex items-center justify-center gap-2 text-label hover:bg-[#1fb558] transition-colors">
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
