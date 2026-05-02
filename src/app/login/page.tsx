'use client'
import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/Toaster'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { toast(error.message, 'error'); setLoading(false) }
    else { router.push('/admin'); router.refresh() }
  }

  return (
    <div className="min-h-screen bg-brand-yellow/20 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-brand-yellow mx-auto mb-3">
            <Image src="/logo.png" alt="De' Needs Hyper Bazzar" fill className="object-cover" />
          </div>
          <div className="text-brand-red font-black text-xl">De' Needs</div>
          <div className="text-gray-500 text-sm">Admin Portal</div>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red outline-none"
              placeholder="admin@deneeds.in"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red outline-none"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary py-3 rounded-xl mt-2 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
