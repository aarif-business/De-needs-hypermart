'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/Toaster'

const STATUSES = ['pending', 'confirmed', 'processing', 'delivered', 'cancelled']

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus)
  const router = useRouter()

  const handleChange = async (newStatus: string) => {
    setStatus(newStatus)
    const supabase = createClient()
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    if (error) { toast('Failed to update status', 'error'); setStatus(currentStatus) }
    else { toast('Order status updated!'); router.refresh() }
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:border-brand-red outline-none"
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  )
}
