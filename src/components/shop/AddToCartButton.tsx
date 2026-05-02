'use client'
import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Product } from '@/types/database'
import { useCartStore } from '@/store/cartStore'
import { toast } from '@/components/ui/Toaster'

export function AddToCartButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const { addItem } = useCartStore()
  const outOfStock = product.stock_quantity === 0

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        stock_quantity: product.stock_quantity,
        unit: product.unit,
      })
    }
    toast(`${qty}x ${product.name} added to cart!`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-bold text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock_quantity, q + 1))}
            disabled={qty >= product.stock_quantity}
            className="px-4 py-3 hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={20} />
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
