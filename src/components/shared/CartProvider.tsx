'use client'
import { createContext, useContext } from 'react'
import { useCart } from '@/hooks/useCart'
import type { CartItem } from '@/types'

interface CartContextType {
  cart: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  mounted: boolean
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

import { useState } from 'react'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartState = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <CartContext.Provider value={{ ...cartState, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be inside CartProvider')
  return ctx
}
