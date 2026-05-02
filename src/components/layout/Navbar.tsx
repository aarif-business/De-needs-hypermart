'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, Menu, X, ChevronDown, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { cn } from '@/lib/utils'

const MEGA_MENU = [
  {
    label: 'Groceries',
    href: '/products?category=groceries',
    items: ['Rice & Grains', 'Pulses & Lentils', 'Oils & Ghee', 'Spices & Masala', 'Flour & Atta', 'Sugar & Salt'],
  },
  {
    label: 'Meat & Fish',
    href: '/products?category=meat-fish',
    items: ['Chicken', 'Mutton', 'Fish & Prawns', 'Eggs', 'Ready to Cook'],
  },
  {
    label: 'Home Decor',
    href: '/products?category=home-decor',
    items: ['Cushions & Covers', 'Wall Art', 'Candles & Diffusers', 'Planters', 'Table Decor'],
  },
]

const NAV_LINKS = [
  { label: 'Fresh Arrivals', href: '/products?fresh=true' },
  { label: 'Offers', href: '/products?offers=true' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const router = useRouter()
  const { itemCount, toggleCart } = useCartStore()
  const count = itemCount()
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) { router.push(`/products?q=${encodeURIComponent(query.trim())}`); setQuery('') }
  }

  return (
    <header className={cn('sticky top-0 z-50 w-full transition-all duration-300', scrolled ? 'shadow-md' : '')}>
      {/* Top bar */}
      <div className="bg-brand-red text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <span className="flex items-center gap-1"><MapPin size={11} /> Jalahalli, Bangalore — Free delivery above ₹499</span>
        <span className="hidden sm:block">📞 +91 98765 43210</span>
      </div>

      {/* Main nav */}
      <div className="bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-brand-red ring-offset-1 ring-offset-brand-yellow flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="De' Needs Hyper Bazzar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight hidden sm:flex">
                <span className="text-brand-red font-black text-lg tracking-tight">De' Needs</span>
                <span className="text-gray-800 font-semibold text-[10px] tracking-widest uppercase">Hyper Bazzar</span>
              </div>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search groceries, meat, home decor..."
                className="w-full pl-4 pr-12 py-2.5 rounded-full text-sm bg-white border-2 border-transparent focus:border-brand-red outline-none transition-all shadow-sm"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-brand-red text-white p-2 rounded-full hover:bg-brand-red-dark transition-colors">
                <Search size={15} />
              </button>
            </div>
          </form>

          {/* Cart */}
          <button onClick={toggleCart} className="relative flex-shrink-0 bg-brand-red text-white p-2.5 rounded-full hover:bg-brand-red-dark transition-colors">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-gray-800" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Bottom nav with megamenu */}
      <div className="bg-white border-b hidden md:block" ref={megaRef}>
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 h-11">
          {MEGA_MENU.map((cat) => (
            <div key={cat.label} className="relative">
              <button
                onMouseEnter={() => setMegaOpen(cat.label)}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  megaOpen === cat.label ? 'bg-brand-yellow text-brand-red' : 'hover:bg-gray-50 text-gray-700'
                )}
              >
                {cat.label} <ChevronDown size={14} className={cn('transition-transform', megaOpen === cat.label && 'rotate-180')} />
              </button>
            </div>
          ))}
          <div className="w-px h-5 bg-gray-200 mx-2" />
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand-red hover:bg-gray-50 rounded-md transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mega dropdown */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              onMouseLeave={() => setMegaOpen(null)}
              className="absolute left-0 right-0 bg-white border-b shadow-xl z-40"
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                {MEGA_MENU.filter((c) => c.label === megaOpen).map((cat) => (
                  <div key={cat.label}>
                    <Link href={cat.href} className="text-brand-red font-bold text-base mb-3 block hover:underline">
                      All {cat.label} →
                    </Link>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {cat.items.map((item) => (
                        <Link
                          key={item}
                          href={`/products?category=${cat.label.toLowerCase().replace(/ & /g, '-')}&sub=${encodeURIComponent(item)}`}
                          onClick={() => setMegaOpen(null)}
                          className="text-sm text-gray-600 hover:text-brand-red hover:bg-brand-yellow/20 px-3 py-2 rounded-lg transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {MEGA_MENU.map((cat) => (
                <Link key={cat.label} href={cat.href} onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-brand-yellow/30 rounded-lg">
                  {cat.label}
                </Link>
              ))}
              {NAV_LINKS.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
