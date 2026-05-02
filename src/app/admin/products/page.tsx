import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { ProductForm } from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Manage Products' }

export default async function AdminProductsPage() {
  const supabase = createClient()
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }).limit(50),
    supabase.from('categories').select('id, name').order('sort_order'),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-900">Products</h1>
        <ProductForm categories={categories ?? []} />
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 truncate max-w-[200px]">{p.name}</p>
                  {p.is_fresh_arrival && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">Fresh Arrival</span>}
                </td>
                <td className="px-4 py-3 text-gray-500">{(p.categories as any)?.name ?? '—'}</td>
                <td className="px-4 py-3 font-semibold">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${p.stock_quantity === 0 ? 'text-red-500' : p.stock_quantity < 10 ? 'text-orange-500' : 'text-green-600'}`}>
                    {p.stock_quantity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <ProductForm product={p as any} categories={categories ?? []} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!products || products.length === 0) && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📦</p>
            <p>No products yet. Add your first product!</p>
          </div>
        )}
      </div>
    </div>
  )
}
