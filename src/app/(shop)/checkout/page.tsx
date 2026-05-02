'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/Toaster'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', notes: '' })

  const cartTotal = total()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id ?? null,
          total_amount: cartTotal,
          phone: form.phone,
          notes: form.notes,
        })
        .select()
        .single()

      if (error) throw error

      await supabase.from('order_items').insert(
        items.map((item) => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          product_image: item.image_url,
          quantity: item.quantity,
          unit_price: item.price,
        }))
      )

      clearCart()
      router.push(`/order-success?id=${order.id}`)
    } catch {
      toast('Failed to place order. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" strokeWidth={1} />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <button onClick={() => router.push('/products')} className="btn-primary mt-4">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900 mb-2">Place Your Order</h1>
      <p className="text-gray-500 text-sm mb-8">Our team will contact you to confirm your order.</p>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-bold text-gray-900 mb-4">Your Details</h2>
            <div className="flex flex-col gap-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                { key: 'notes', label: 'Special Instructions (optional)', type: 'text', placeholder: 'Any notes for the store...' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type={type}
                    required={key !== 'notes'}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary py-4 text-base rounded-xl disabled:opacity-60"
          >
            {loading ? 'Placing Order...' : `Confirm Order — ${formatPrice(cartTotal)}`}
          </button>
        </form>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border p-5 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border flex-shrink-0">
                    {item.image_url ? (
                      <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-yellow/20 text-brand-red font-bold text-xs">DN</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
