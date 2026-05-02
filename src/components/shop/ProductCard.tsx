'use client'
import Link from 'next/link'
import { ShoppingCart, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types/database'
import { useCartStore } from '@/store/cartStore'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import { toast } from '@/components/ui/Toaster'
import { ProductImage } from './ProductImage'

interface Props {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCartStore()
  const discount = product.compare_price ? getDiscountPercent(product.price, product.compare_price) : 0
  const outOfStock = product.stock_quantity === 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (outOfStock) return
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      stock_quantity: product.stock_quantity,
      unit: product.unit,
    })
    toast(`${product.name} added to cart!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover cursor-pointer">
          {/* Image */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <ProductImage
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discount > 0 && (
                <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
              {product.is_fresh_arrival && (
                <span className="bg-brand-yellow text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              {outOfStock && (
                <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  OUT OF STOCK
                </span>
              )}
            </div>

            {/* Quick add overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex items-center gap-2 bg-brand-red text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-brand-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={14} /> Quick Add
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-xs text-gray-400 mb-0.5 capitalize">{product.unit}</p>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-brand-red transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.compare_price && (
                  <span className="text-xs text-gray-400 line-through ml-1.5">{formatPrice(product.compare_price)}</span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="bg-brand-yellow hover:bg-brand-yellow-dark text-gray-900 p-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Add to cart"
              >
                <ShoppingCart size={15} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
