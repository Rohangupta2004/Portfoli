import { motion } from 'framer-motion'
import { Target, Zap, Heart, Globe, Users, Award, ShoppingBag, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  { icon: Target, title: 'Precision', desc: 'Every product is tested and curated to meet our exacting standards of quality and craftsmanship.' },
  { icon: Zap, title: 'Innovation', desc: 'We embrace cutting-edge design and technology in everything we offer to our customers.' },
  { icon: Heart, title: 'Passion', desc: 'Built by people who genuinely love great products and exceptional shopping experiences.' },
  { icon: Globe, title: 'Sustainability', desc: 'Committed to ethical sourcing, eco-friendly packaging, and reducing our environmental footprint.' },
]

const stats = [
  { icon: Users, value: '50,000+', label: 'Happy Customers' },
  { icon: ShoppingBag, value: '2,000+', label: 'Premium Products' },
  { icon: Award, value: '99.2%', label: 'Satisfaction Rate' },
  { icon: Headphones, value: '24/7', label: 'Customer Support' },
]

const team = [
  { name: 'Vikram Arora', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', bio: 'Former product lead at a top ecommerce firm. Obsessed with creating seamless shopping experiences.' },
  { name: 'Meera Kapoor', role: 'Head of Curation', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', bio: 'Award-winning stylist turned curator. Handpicks every product that makes it onto VELORA.' },
  { name: 'Aditya Rao', role: 'CTO', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', bio: 'Full-stack engineer with a passion for building performant, beautiful interfaces at scale.' },
]

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-[#0a0a0a] to-pink-950/20" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[80px]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-medium mb-6">About VELORA</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05]">
              We Build{' '}
              <span className="gradient-text">Experiences</span>
              <br />Not Just Stores
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              VELORA was born from a simple belief: online shopping should feel as premium as the products you buy. We combine artisan curation with modern technology to redefine e-commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors group">
              <Icon size={28} className="mx-auto text-purple-400 group-hover:scale-110 transition-transform" />
              <p className="text-2xl sm:text-3xl font-bold gradient-text mt-3">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=85" alt="VELORA warehouse" className="relative rounded-2xl shadow-2xl shadow-purple-900/10 w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-sm uppercase tracking-[0.2em] text-purple-400 font-medium mb-4">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              From Passion Project to <span className="gradient-text">Premium Brand</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed mt-6">
              <p>Founded in 2024, VELORA started as a passion project to reimagine online retail. We noticed most e-commerce platforms prioritised volume over experience, leaving customers scrolling through endless mediocre options.</p>
              <p>We took a different approach. Every product on VELORA is handpicked by our team of curators \u2014 designers, technologists, and lifestyle enthusiasts who believe the things you own should spark joy.</p>
              <p>Today, we serve over 50,000 customers across India, delivering not just products but a carefully crafted experience from discovery to doorstep.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-purple-400 font-medium mb-4">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Our Core <span className="gradient-text">Values</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="glass rounded-2xl p-8 text-center hover:bg-white/10 transition-all group gradient-border">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={26} className="text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-3">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-400 font-medium mb-4">The People Behind VELORA</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Meet Our <span className="gradient-text">Team</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass rounded-2xl overflow-hidden group hover:bg-white/10 transition-all">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-sm text-purple-400 font-medium mt-1">{t.role}</p>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{t.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-orange-900/20 border border-white/10 p-12 md:p-16 text-center">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/15 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/15 rounded-full blur-[80px]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Ready to Experience <span className="gradient-text">VELORA</span>?</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">Explore our curated collection and discover products that redefine quality and style.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-gradient text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">Shop Now</Link>
          </div>
        </motion.div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="glass rounded-2xl p-8">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">Portfolio Disclaimer</p>
          <p className="text-sm text-gray-400 leading-relaxed">This is a <strong className="text-white">conceptual portfolio project</strong> built by <strong className="text-white">Rohan Gupta</strong> to demonstrate full-stack e-commerce development skills. No real transactions are processed. Razorpay operates in test mode only.</p>
        </div>
      </section>
    </div>
  )
}
