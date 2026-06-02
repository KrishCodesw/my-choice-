'use client'
import { useState, useEffect, useCallback } from 'react'
import type { CartItem } from '@/types'

const CART_KEY = 'mychoice_cart'

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) setCart(JSON.parse(stored))
    } catch {}
  }, [])

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart, mounted])

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const existing = prev.find(c => c.productId === item.productId)
      if (existing) {
        return prev.map(c => c.productId === item.productId ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart(prev => prev.filter(c => c.productId !== productId))
  }, [])

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) { removeItem(productId); return }
    setCart(prev => prev.map(c => c.productId === productId ? { ...c, qty } : c))
  }, [removeItem])

  const clearCart = useCallback(() => setCart([]), [])

  const totalItems = cart.reduce((acc, c) => acc + c.qty, 0)

  return { cart, addItem, removeItem, updateQty, clearCart, totalItems, mounted }
}
