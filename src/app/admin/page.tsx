import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { Package, ShoppingBag, TrendingUp, AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboard() {
  const supabase = createClient()

  const [
    { count: totalProducts },
    { count: totalOrders },
    { data: recentOrders },
    { data: lowStock },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('products').select('name, stock_quantity').lt('stock_quantity', 10).eq('is_active', true).limit(5),
  ])

  const { data: revenue } = await supabase.from('orders').select('total_amount').eq('status', 'delivered')
  const totalRevenue = revenue?.reduce((sum, o) => sum + o.total_amount, 0) ?? 0

  const STATS = [
    { label: 'Total Products', value: totalProducts ?? 0, icon: Package, color: 'bg-brand-yellow/30 text-yellow-800' },
    { label: 'Total Orders', value: totalOrders ?? 0, icon: ShoppingBag, color: 'bg-brand-yellow/50 text-yellow-900' },
    { label: 'Revenue', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'bg-brand-yellow/20 text-yellow-800' },
    { label: 'Low Stock Items', value: lowStock?.length ?? 0, icon: AlertTriangle, color: 'bg-red-50 text-brand-red' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border p-5">
          <h2 className="font-bold text-gray-900 mb-4">Recent Orders</h2>
          {recentOrders?.length === 0 ? (
            <p className="text-gray-400 text-sm">No orders yet</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentOrders?.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">#{order.id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatPrice(order.total_amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'delivered' ? 'bg-brand-yellow/40 text-yellow-900' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                      'bg-brand-yellow/20 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl border p-5">
          <h2 className="font-bold text-gray-900 mb-4">Low Stock Alert</h2>
          {lowStock?.length === 0 ? (
            <p className="text-gray-400 text-sm">All products are well stocked</p>
          ) : (
            <div className="flex flex-col gap-3">
              {lowStock?.map((p) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b last:border-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock_quantity === 0 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                    {p.stock_quantity} left
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
