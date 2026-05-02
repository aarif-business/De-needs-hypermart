import { createClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { q?: string; category?: string; fresh?: string; offers?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const title = searchParams.q
    ? `Search: "${searchParams.q}"`
    : searchParams.category
    ? `${searchParams.category.replace(/-/g, ' ')} — Shop Online`
    : 'All Products'
  return { title, description: `Shop ${title} at De' Needs Hyper Bazzar, Jalahalli Bangalore.` }
}

export default async function ProductsPage({ searchParams }: Props) {
  const supabase = createClient()
  const { q, category, fresh, offers } = searchParams

  const [{ data: categories }, productsResult] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order'),
    (async () => {
      let query = supabase
        .from('products')
        .select('*, categories(*)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (q) query = query.ilike('name', `%${q}%`)
      if (category) {
        const { data: cat } = await supabase.from('categories').select('id').eq('slug', category).single()
        if (cat) query = query.eq('category_id', cat.id)
      }
      if (fresh === 'true') query = query.eq('is_fresh_arrival', true)
      if (offers === 'true') query = query.not('compare_price', 'is', null)

      return query.limit(60)
    })(),
  ])

  const { data: products, error: productsError } = productsResult
  if (productsError) console.error('[Products fetch error]', productsError.message, productsError.details)

  const pageTitle = q
    ? `Results for "${q}"`
    : fresh === 'true' ? 'Fresh Arrivals'
    : offers === 'true' ? 'Special Offers'
    : category ? category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'All Products'

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-red transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{pageTitle}</span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border p-4 sticky top-24">
            <h3 className="font-bold text-sm text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-col gap-1">
              <Link
                href="/products"
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${!category ? 'bg-brand-yellow font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                All Products
              </Link>
              {categories?.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className={`text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${category === cat.slug ? 'bg-brand-yellow font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span>{cat.icon}</span> {cat.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex flex-col gap-1">
              <Link href="/products?fresh=true" className={`text-sm px-3 py-2 rounded-lg transition-colors ${fresh === 'true' ? 'bg-brand-yellow font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
                Fresh Arrivals
              </Link>
              <Link href="/products?offers=true" className={`text-sm px-3 py-2 rounded-lg transition-colors ${offers === 'true' ? 'bg-brand-yellow font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>
                On Sale
              </Link>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900 capitalize">{pageTitle}</h1>
            <span className="text-sm text-gray-500">{products?.length ?? 0} products</span>
          </div>
          <ProductGrid products={(products as any) ?? []} />
        </div>
      </div>
    </div>
  )
}
