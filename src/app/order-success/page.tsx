import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderSuccessPage({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={48} className="text-green-500" />
      </div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Order Placed! 🎉</h1>
      <p className="text-gray-600 mb-2">
        Thank you for shopping at De' Needs Hyper Bazzar.
      </p>
      {searchParams.id && (
        <p className="text-sm text-gray-400 mb-6">Order ID: <span className="font-mono text-gray-600">{searchParams.id.slice(0, 8).toUpperCase()}</span></p>
      )}
      <p className="text-sm text-gray-500 mb-8">
        Our team will call you at your provided number to confirm delivery details.
        Expected delivery: <strong>within 2–4 hours</strong>.
      </p>
      <Link href="/" className="btn-primary inline-block px-8 py-3 rounded-xl">
        Continue Shopping
      </Link>
    </div>
  )
}
