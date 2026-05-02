import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import { OrderStatusSelect } from '@/components/admin/OrderStatusSelect'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Manage Orders' }

export default async function AdminOrdersPage() {
  const supabase = createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-brand-yellow/30 text-yellow-800',
    confirmed: 'bg-brand-yellow/50 text-yellow-900',
    processing: 'bg-brand-yellow/20 text-yellow-800',
    delivered: 'bg-brand-yellow/40 text-yellow-900',
    cancelled: 'bg-red-100 text-red-600',
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-gray-900 mb-8">Orders</h1>
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {['Order ID', 'Date', 'Phone', 'Amount', 'Status', 'Update'].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-xs text-gray-600">#{order.id.slice(0, 8).toUpperCase()}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(order.created_at).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3 text-gray-700">{order.phone ?? '—'}</td>
                <td className="px-4 py-3 font-bold">{formatPrice(order.total_amount)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!orders || orders.length === 0) && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
