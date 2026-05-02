import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  const cookieStore = cookies()
  return createServerClient<Database>(url, key, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name, value, options) => { try { cookieStore.set({ name, value, ...options }) } catch {} },
      remove: (name, options) => { try { cookieStore.set({ name, value: '', ...options }) } catch {} },
    },
  })
}
