'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Category } from '@/types/database'

interface Props { categories: Category[] }

export function CategoryGrid({ categories }: Props) {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="section-title mb-2">Shop by Category</h2>
      <p className="text-gray-500 mb-8">Everything you need, all in one place</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={`/products?category=${cat.slug}`}>
              <div className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-yellow hover:shadow-md hover:bg-brand-yellow/10 transition-all duration-200 cursor-pointer text-center">
                <span className="text-3xl">{cat.icon || '🛒'}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-brand-red transition-colors leading-tight">
                  {cat.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
