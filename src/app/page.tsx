import { createClient } from '@/lib/supabase/server'
import { Hero } from '@/components/shop/Hero'
import { CategoryGrid } from '@/components/shop/CategoryGrid'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { ShieldCheck, Headphones, BadgePercent, Leaf } from 'lucide-react'

export const dynamic = 'force-dynamic'

const FEATURES = [
  { icon: Leaf, title: '100% Fresh', desc: 'Farm-fresh produce sourced daily' },
  { icon: BadgePercent, title: 'Best Prices', desc: 'Unbeatable deals on every aisle' },
  { icon: ShieldCheck, title: 'Quality Assured', desc: 'Every product quality checked' },
  { icon: Headphones, title: 'In-Store Support', desc: 'Our staff is always here to help' },
]

export default async function HomePage() {
  const supabase = createClient()

  const [{ data: categories, error: catError }, { data: featured, error: featError }, { data: freshArrivals, error: freshError }] = await Promise.all([

    supabase.from('categories').select('*').order('sort_order'),
    supabase.from('products').select('*, categories(*)').eq('is_featured', true).eq('is_active', true).limit(10),
    supabase.from('products').select('*, categories(*)').eq('is_fresh_arrival', true).eq('is_active', true).limit(10),
  ])

  if (catError) console.error('[Categories error]', catError.message)
  if (featError) console.error('[Featured error]', featError.message)
  if (freshError) console.error('[Fresh arrivals error]', freshError.message)

  return (
    <>
      <Hero />

      {/* Features bar */}
      <div className="bg-brand-red text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-white/70 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories && <CategoryGrid categories={categories} />}

      {/* Featured Products */}
      {featured && featured.length > 0 && (
        <section className="py-10 px-4 max-w-7xl mx-auto">
          <ProductGrid
            products={featured as any}
            title="Featured Products"
            subtitle="Hand-picked bestsellers just for you"
          />
        </section>
      )}

      {/* Fresh Arrivals */}
      {freshArrivals && freshArrivals.length > 0 && (
        <section className="py-10 px-4 max-w-7xl mx-auto">
          <ProductGrid
            products={freshArrivals as any}
            title="Fresh Arrivals"
            subtitle="New stock just landed — grab them before they're gone"
          />
        </section>
      )}

      {/* Testimonials */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-2">What Our Customers Say</h2>
        <p className="text-gray-500 text-center mb-10">Trusted by thousands of families in Jalahalli</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Priya Sharma', area: 'Jalahalli West', text: 'Best supermarket in the area. The vegetables are always fresh and the staff is very helpful. My go-to store every week!', rating: 5 },
            { name: 'Rajan Nair', area: 'Mathikere', text: 'Amazing variety of products under one roof. The meat section is excellent — fresh and well-priced. Highly recommend De Needs!', rating: 5 },
            { name: 'Sunita Reddy', area: 'Jalahalli East', text: 'Love the home decor section! Found beautiful items at very reasonable prices. The store is clean and well-organized.', rating: 5 },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-brand-yellow/40 rounded-2xl p-6 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-brand-yellow rounded-sm" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-yellow/40 flex items-center justify-center font-bold text-brand-red text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About section */}
      <section className="bg-brand-yellow/15 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Bangalore's Most Trusted Supermarket
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            De' Needs Hyper Bazzar is Jalahalli's premier grocery destination. We serve thousands of
            Bangalore families with fresh vegetables, quality meats, dairy, snacks, and home essentials.
            Located in the heart of Jalahalli, we offer the best prices and the freshest produce in
            North Bangalore.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            {['Grocery Store Bangalore', 'Supermarket Jalahalli', 'Fresh Vegetables Bangalore',
              'Meat Shop Bangalore', 'Online Grocery Delivery', 'Hypermarket North Bangalore'].map((tag) => (
              <span key={tag} className="bg-white border border-brand-yellow/60 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-brand-yellow font-black text-xl mb-1">De' Needs</div>
            <div className="text-gray-400 text-xs mb-3">Hyper Bazzar</div>
            <p className="text-gray-400 text-sm">Jalahalli, Bangalore — 560013</p>
            <p className="text-gray-400 text-sm mt-1">+91 98765 43210</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
            {['Groceries', 'Meat & Fish', 'Home Decor', 'Fresh Arrivals', 'Offers'].map((l) => (
              <p key={l} className="text-gray-400 text-sm mb-1.5 hover:text-brand-yellow cursor-pointer transition-colors">{l}</p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Customer Care</h4>
            {['Track Order', 'Return Policy', 'FAQ', 'Contact Us'].map((l) => (
              <p key={l} className="text-gray-400 text-sm mb-1.5 hover:text-brand-yellow cursor-pointer transition-colors">{l}</p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Store Hours</h4>
            <p className="text-gray-400 text-sm">Mon – Sat: 8 AM – 9 PM</p>
            <p className="text-gray-400 text-sm mt-1">Sunday: 9 AM – 7 PM</p>
            <div className="mt-4 bg-brand-yellow/20 border border-brand-yellow/50 rounded-lg p-3">
              <p className="text-brand-red text-xs font-semibold">Find Us</p>
              <p className="text-gray-400 text-xs mt-1">Near Jalahalli Cross, Bangalore North</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} De' Needs Hyper Bazzar. All rights reserved. | Jalahalli, Bangalore
        </div>
      </footer>
    </>
  )
}
