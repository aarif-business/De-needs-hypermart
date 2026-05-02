'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const cartTotal = total()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-brand-red text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span className="font-bold text-lg">Your Cart</span>
                {items.length > 0 && (
                  <span className="bg-white text-brand-red text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button onClick={toggleCart} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-medium text-lg">Your cart is empty</p>
                  <button onClick={toggleCart} className="btn-primary text-sm">
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-gray-50 rounded-xl p-3"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0 border">
                        {item.image_url ? (
                          <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🛒</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.unit}</p>
                        <p className="text-brand-red font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-1 bg-white border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock_quantity}
                            className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors disabled:opacity-40"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t px-5 py-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-sm">Subtotal</span>
                  <span className="font-bold text-lg text-gray-900">{formatPrice(cartTotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="btn-primary w-full text-center block text-base py-3 rounded-xl"
                >
                  Proceed to Checkout
                </Link>
                <button onClick={clearCart} className="w-full text-center text-xs text-gray-400 hover:text-red-500 mt-3 transition-colors">
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
