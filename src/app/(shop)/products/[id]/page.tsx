import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { AddToCartButton } from '@/components/shop/AddToCartButton'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Package, Tag } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient()
  const { data } = await supabase.from('products').select('name, description').eq('id', params.id).single()
  if (!data) return { title: 'Product Not Found' }
  return {
    title: data.name,
    description: data.description ?? `Buy ${data.name} at De' Needs Hyper Bazzar, Jalahalli Bangalore`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const supabase = createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  const { data: related } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('category_id', product.category_id)
    .eq('is_active', true)
    .neq('id', product.id)
    .limit(5)

  const discount = product.compare_price ? getDiscountPercent(product.price, product.compare_price) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill className="object-cover" priority />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🛒</div>
          )}
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-brand-red text-white font-bold px-3 py-1.5 rounded-full text-sm">
              -{discount}% OFF
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          {product.categories && (
            <span className="text-brand-red text-sm font-semibold mb-2">{(product.categories as any).name}</span>
          )}
          <h1 className="text-3xl font-black text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-black text-gray-900">{formatPrice(product.price)}</span>
            {product.compare_price && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
            )}
            <span className="text-sm text-gray-500">/ {product.unit}</span>
          </div>

          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          )}

          <div className="flex items-center gap-3 mb-6 text-sm">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium ${product.stock_quantity > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              <Package size={14} />
              {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
            </div>
            {product.tags?.length > 0 && product.tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                <Tag size={12} /> {tag}
              </div>
            ))}
          </div>

          <AddToCartButton product={product as any} />
        </div>
      </div>

      {/* Related */}
      {related && related.length > 0 && (
        <ProductGrid products={related as any} title="You might also like" />
      )}
    </div>
  )
}
