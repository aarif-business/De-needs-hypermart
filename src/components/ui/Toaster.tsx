'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Toast { id: string; message: string; type: 'success' | 'error' }

let toastFn: (msg: string, type?: Toast['type']) => void = () => {}

export function toast(message: string, type: Toast['type'] = 'success') {
  toastFn(message, type)
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toastFn = (message, type = 'success') => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-fade-in',
            t.type === 'success' ? 'bg-brand-red' : 'bg-red-600'
          )}
        >
          <span>{t.message}</span>
          <button onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
