import { Product } from '@/types/database'
import { ProductCard } from './ProductCard'

interface Props {
  products: Product[]
  title?: string
  subtitle?: string
}

export function ProductGrid({ products, title, subtitle }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">Try a different search or category</p>
      </div>
    )
  }

  return (
    <div>
      {title && (
        <div className="mb-6">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  )
}
