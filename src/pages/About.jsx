import { motion } from 'framer-motion'
import { Target, Zap, Heart, Globe } from 'lucide-react'

const values = [
  { icon: Target, title: 'Precision', desc: 'Every product is tested and curated to meet our exacting standards of quality.' },
  { icon: Zap, title: 'Innovation', desc: 'We embrace cutting-edge design and technology in everything we offer.' },
  { icon: Heart, title: 'Passion', desc: 'Built by people who genuinely love great products and exceptional experiences.' },
  { icon: Globe, title: 'Sustainability', desc: 'Committed to ethical sourcing and reducing our environmental footprint.' },
]

export default function About() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl sm:text-6xl font-display font-bold leading-tight">We Build <span className="gradient-text">Experiences</span><br />Not Just Stores</h1>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">VELORA was born from a simple idea \u2014 online shopping should feel as premium as the products you buy. We combine artisan curation with modern technology to create an e-commerce experience that sets new standards.</p>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" alt="Our story" className="rounded-2xl shadow-2xl" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold mb-6">Our <span className="gradient-text">Story</span></h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>Founded in 2024, VELORA started as a passion project to reimagine online retail. We noticed most e-commerce platforms prioritised volume over experience, leaving customers scrolling through endless mediocre options.</p>
              <p>We took a different approach. Every product on VELORA is handpicked by our team of curators \u2014 designers, technologists, and lifestyle enthusiasts who believe the things you own should spark joy.</p>
              <p>Today, we serve over 50,000 customers across India, delivering not just products but a carefully crafted experience from discovery to doorstep.</p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-display font-bold text-center mb-16">Our <span className="gradient-text">Values</span></motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-xl flex items-center justify-center mb-4"><Icon size={24} className="text-purple-400" /></div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Portfolio Disclaimer</p>
        <p className="text-gray-400 max-w-2xl mx-auto">This is a <strong className="text-white">conceptual portfolio project</strong> built by Rohan Gupta to demonstrate full-stack e-commerce development. No real transactions are processed. Razorpay operates in test mode only.</p>
      </section>
    </div>
  )
}
