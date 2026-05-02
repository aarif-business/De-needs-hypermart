'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Award, ShieldCheck } from 'lucide-react'

const BADGES = [
  { icon: Star, text: '4.8 Rated in Bangalore' },
  { icon: Award, text: 'Premium Quality' },
  { icon: ShieldCheck, text: '100% Fresh Guarantee' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-yellow via-yellow-300 to-brand-yellow min-h-[88vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B22222 1px, transparent 0)', backgroundSize: '32px 32px' }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-brand-red text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Now Open in Jalahalli, Bangalore
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
            Jalahalli's{' '}
            <span className="text-brand-red relative">
              One-Stop Shop
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10 Q150 2 298 10" stroke="#B22222" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>{' '}
            for Everything
          </h1>

          <p className="text-gray-700 text-lg mb-8 max-w-md leading-relaxed">
            Fresh groceries, premium meats, beautiful home decor — all under one roof.
            Serving Bangalore families with quality and care since 2018.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/products" className="btn-primary flex items-center gap-2 text-base px-7 py-3 rounded-xl shadow-lg shadow-brand-red/30">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/products?fresh=true" className="bg-white text-brand-red font-semibold px-7 py-3 rounded-xl border-2 border-brand-red hover:bg-brand-red hover:text-white transition-all duration-200">
              Fresh Arrivals
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4">
            {BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-800">
                <Icon size={16} className="text-brand-red" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden md:flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg">
            {/* Main card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
              <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-red font-black text-xl">DN</span>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">De' Needs</h3>
              <p className="text-brand-red font-semibold mb-6">Hyper Bazzar</p>
              <div className="grid grid-cols-3 gap-3">
                {['Veggies', 'Seafood', 'Decor', 'Dairy', 'Meat', 'Drinks'].map((item) => (
                  <div key={item} className="bg-brand-yellow/30 rounded-xl py-3 text-sm font-semibold text-gray-800">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-brand-red text-white px-4 py-2 rounded-2xl shadow-lg text-sm font-bold"
            >
              Hot Deals
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-gray-900 text-white px-4 py-2 rounded-2xl shadow-lg text-sm font-bold"
            >
              500+ Products
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  )
}
