'use client'
import { useState } from 'react'
import { Plus, Pencil, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Product, Category } from '@/types/database'
import { toast } from '@/components/ui/Toaster'
import { useRouter } from 'next/navigation'

interface Props {
  product?: Product
  categories: Pick<Category, 'id' | 'name'>[]
}

const EMPTY = { name: '', price: '', compare_price: '', stock_quantity: '', unit: 'piece', description: '', image_url: '', category_id: '', is_featured: false, is_fresh_arrival: false, is_active: true }

export function ProductForm({ product, categories }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(product ? {
    name: product.name,
    price: String(product.price),
    compare_price: product.compare_price ? String(product.compare_price) : '',
    stock_quantity: String(product.stock_quantity),
    unit: product.unit,
    description: product.description ?? '',
    image_url: product.image_url ?? '',
    category_id: product.category_id ?? '',
    is_featured: product.is_featured,
    is_fresh_arrival: product.is_fresh_arrival,
    is_active: product.is_active,
  } : EMPTY)
  const router = useRouter()

  const set = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        compare_price: form.compare_price ? parseFloat(form.compare_price) : null,
        stock_quantity: parseInt(form.stock_quantity),
        unit: form.unit,
        description: form.description || null,
        image_url: form.image_url || null,
        category_id: form.category_id || null,
        is_featured: form.is_featured,
        is_fresh_arrival: form.is_fresh_arrival,
        is_active: form.is_active,
        ...(!product && { slug: form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now() }),
      }

      if (product) {
        await supabase.from('products').update(payload).eq('id', product.id)
        toast('Product updated!')
      } else {
        await supabase.from('products').insert(payload as any)
        toast('Product added!')
      }

      setOpen(false)
      router.refresh()
    } catch {
      toast('Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={product
          ? 'flex items-center gap-1 text-xs text-brand-red hover:underline'
          : 'btn-primary flex items-center gap-2 text-sm'
        }
      >
        {product ? <><Pencil size={12} /> Edit</> : <><Plus size={16} /> Add Product</>}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <h2 className="font-bold text-gray-900">{product ? 'Edit Product' : 'Add New Product'}</h2>
                  <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name *</label>
                    <input required value={form.name} onChange={(e) => set('name', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none" />
                  </div>

                  {/* Price row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price (₹) *</label>
                      <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => set('price', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Compare Price (₹)</label>
                      <input type="number" step="0.01" min="0" value={form.compare_price} onChange={(e) => set('compare_price', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none" />
                    </div>
                  </div>

                  {/* Stock & Unit */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Qty *</label>
                      <input required type="number" min="0" value={form.stock_quantity} onChange={(e) => set('stock_quantity', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Unit</label>
                      <select value={form.unit} onChange={(e) => set('unit', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none bg-white">
                        {['piece', 'kg', 'g', 'litre', 'ml', 'pack', 'dozen', 'bundle'].map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                    <select value={form.category_id} onChange={(e) => set('category_id', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none bg-white">
                      <option value="">— Select Category —</option>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Image URL</label>
                    <input type="url" value={form.image_url} onChange={(e) => set('image_url', e.target.value)}
                      placeholder="https://..."
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none" />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                    <textarea rows={2} value={form.description} onChange={(e) => set('description', e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-brand-red outline-none resize-none" />
                  </div>

                  {/* Toggles */}
                  <div className="flex flex-wrap gap-4">
                    {[
                      { key: 'is_featured', label: 'Featured' },
                      { key: 'is_fresh_arrival', label: 'Fresh Arrival' },
                      { key: 'is_active', label: 'Active' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form[key as keyof typeof form] as boolean}
                          onChange={(e) => set(key, e.target.checked)}
                          className="w-4 h-4 accent-brand-red"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary py-3 rounded-xl disabled:opacity-60 mt-2">
                    {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
