import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Clock, ShieldCheck, Award, Users, Leaf } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about De' Needs Hyper Bazzar — Jalahalli's premier supermarket serving Bangalore families since 2018.",
}

const VALUES = [
  { icon: Leaf, title: 'Always Fresh', desc: 'We source fresh produce daily from local farms and trusted suppliers across Karnataka.' },
  { icon: ShieldCheck, title: 'Quality First', desc: 'Every product on our shelves is quality-checked before it reaches you.' },
  { icon: Award, title: 'Best Prices', desc: 'We negotiate directly with suppliers to bring you the best prices in Jalahalli.' },
  { icon: Users, title: 'Community Focused', desc: 'Proudly serving thousands of Bangalore families since 2018.' },
]

const STORE_HOURS = [
  { day: 'Monday – Saturday', time: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 7:00 PM' },
  { day: 'Public Holidays', time: '10:00 AM – 6:00 PM' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-yellow via-yellow-300 to-brand-yellow py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #B22222 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-brand-red ring-offset-4 ring-offset-brand-yellow shadow-xl">
              <Image src="/logo.png" alt="De' Needs Hyper Bazzar" fill sizes="96px" className="object-cover" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            About <span className="text-brand-red">De' Needs</span> Hyper Bazzar
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Jalahalli's most trusted one-stop supermarket — bringing quality, freshness,
            and value to Bangalore families since 2018.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brand-red font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2 mb-5">
              From a Small Shop to Jalahalli's Favourite Hypermarket
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              De' Needs Hyper Bazzar started with a simple mission — to give the families of
              Jalahalli access to fresh, quality groceries at honest prices, all under one roof.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What began as a neighbourhood grocery store has grown into a full-fledged hypermarket
              stocking over 500 products across groceries, fresh produce, meat & fish, dairy,
              snacks, home essentials, and beautiful home decor.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we proudly serve thousands of families across Jalahalli, Mathikere,
              Yeshwanthpur, and the wider North Bangalore area — and we're just getting started.
            </p>
          </div>
          <div className="bg-brand-yellow/15 rounded-3xl p-8 border border-brand-yellow/40">
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '500+', label: 'Products' },
                { number: '5000+', label: 'Happy Families' },
                { number: '6+', label: 'Years of Service' },
                { number: '8', label: 'Categories' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl font-black text-brand-red">{s.number}</p>
                  <p className="text-sm text-gray-600 font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red font-semibold text-sm uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-12 h-12 bg-brand-yellow/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-brand-red" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-brand-red font-semibold text-sm uppercase tracking-widest">Visit Us</span>
          <h2 className="text-3xl font-black text-gray-900 mt-2">Find Us in Jalahalli</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">

          {/* Address */}
          <div className="bg-white rounded-2xl border p-6 flex flex-col gap-3">
            <div className="w-10 h-10 bg-brand-yellow/30 rounded-xl flex items-center justify-center">
              <MapPin size={20} className="text-brand-red" />
            </div>
            <h3 className="font-bold text-gray-900">Our Location</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Near Jalahalli Cross,<br />
              Jalahalli, Bangalore North,<br />
              Karnataka — 560013
            </p>
            <a
              href="https://maps.google.com/?q=Jalahalli+Cross+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red text-sm font-semibold hover:underline mt-auto"
            >
              Get Directions →
            </a>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl border p-6 flex flex-col gap-3">
            <div className="w-10 h-10 bg-brand-yellow/30 rounded-xl flex items-center justify-center">
              <Phone size={20} className="text-brand-red" />
            </div>
            <h3 className="font-bold text-gray-900">Contact Us</h3>
            <div className="flex flex-col gap-2">
              <a href="tel:+919876543210" className="text-gray-600 text-sm hover:text-brand-red transition-colors">
                +91 98765 43210
              </a>
              <a href="tel:+919876543211" className="text-gray-600 text-sm hover:text-brand-red transition-colors">
                +91 98765 43211
              </a>
            </div>
            <p className="text-gray-400 text-xs mt-auto">Available during store hours</p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-2xl border p-6 flex flex-col gap-3">
            <div className="w-10 h-10 bg-brand-yellow/30 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-brand-red" />
            </div>
            <h3 className="font-bold text-gray-900">Store Hours</h3>
            <div className="flex flex-col gap-2">
              {STORE_HOURS.map((h) => (
                <div key={h.day} className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-700">{h.day}</span>
                  <span className="text-sm text-gray-500">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-14 px-4 text-white text-center">
        <h2 className="text-3xl font-black mb-3">Ready to Shop?</h2>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          Browse our full range of fresh groceries, meats, dairy, snacks, and home decor.
        </p>
        <Link
          href="/products"
          className="inline-block bg-brand-yellow text-gray-900 font-bold px-10 py-3.5 rounded-xl hover:bg-brand-yellow-dark transition-colors text-base"
        >
          Browse All Products
        </Link>
      </section>

    </div>
  )
}
