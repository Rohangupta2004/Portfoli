import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Target, Zap, Heart, Globe, Award, Users, Package, MapPin } from 'lucide-react'

const values = [
  { icon: Target, title: 'Precision', desc: 'Every product is tested and curated to meet our exacting standards of quality and durability.' },
  { icon: Zap, title: 'Innovation', desc: 'We embrace cutting-edge design and technology in everything we offer to our customers.' },
  { icon: Heart, title: 'Passion', desc: 'Built by people who genuinely love great products and exceptional shopping experiences.' },
  { icon: Globe, title: 'Sustainability', desc: 'Committed to ethical sourcing and reducing our environmental footprint at every step.' },
]

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Happy Customers' },
  { icon: Package, value: 2000, suffix: '+', label: 'Premium Products' },
  { icon: MapPin, value: 500, suffix: '+', label: 'Cities Delivered' },
  { icon: Award, value: 15, suffix: '', label: 'Industry Awards' },
]

const team = [
  { name: 'Vikram Patel', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', bio: 'Former McKinsey consultant with 10+ years in luxury retail.' },
  { name: 'Sneha Iyer', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', bio: 'Ex-Apple designer who brings minimalism and function together.' },
  { name: 'Raj Malhotra', role: 'CTO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', bio: 'Full-stack architect who scaled systems at Flipkart and Swiggy.' },
  { name: 'Meera Kapoor', role: 'Head of Curation', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', bio: 'Fashion editor turned curator, handpicks every product on VELORA.' },
]

function Counter({ target, suffix }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-purple-400 font-medium uppercase tracking-widest mb-4">About VELORA</p>
            <h1 className="text-5xl sm:text-6xl font-display font-bold leading-tight">
              We Build <span className="gradient-text">Experiences</span><br />Not Just Stores
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              VELORA was born from a simple idea &mdash; online shopping should feel as premium as the products you buy. We combine artisan curation with modern technology to create an e-commerce experience that sets new standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center">
              <Icon size={28} className="mx-auto text-purple-400 mb-3" />
              <p className="text-3xl sm:text-4xl font-bold gradient-text"><Counter target={value} suffix={suffix} /></p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl opacity-50" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))' }} />
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" alt="Our story" className="relative rounded-2xl shadow-2xl" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm text-purple-400 font-medium uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">The <span className="gradient-text">Story</span></h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>Founded in 2024, VELORA started as a passion project to reimagine online retail. We noticed most e-commerce platforms prioritised volume over experience, leaving customers scrolling through endless mediocre options.</p>
              <p>We took a different approach. Every product on VELORA is handpicked by our team of curators &mdash; designers, technologists, and lifestyle enthusiasts who believe the things you own should spark joy.</p>
              <p>Today, we serve over 50,000 customers across India, delivering not just products but a carefully crafted experience from discovery to doorstep.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.03) 50%, transparent 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-sm text-purple-400 font-medium uppercase tracking-widest mb-2">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">Our <span className="gradient-text">Values</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group">
                <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))' }}>
                  <Icon size={26} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm text-purple-400 font-medium uppercase tracking-widest mb-2">The People Behind VELORA</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">Meet Our <span className="gradient-text">Team</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden group">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg">{m.name}</h3>
                <p className="text-sm gradient-text-subtle font-medium">{m.role}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{m.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Portfolio Disclaimer</p>
          <p className="text-gray-400 leading-relaxed">
            This is a <strong className="text-white">conceptual portfolio project</strong> built by Rohan Gupta to demonstrate full-stack e-commerce development. No real transactions are processed. Razorpay operates in test mode only. All product images are from Unsplash.
          </p>
        </div>
      </section>
    </div>
  )
}
