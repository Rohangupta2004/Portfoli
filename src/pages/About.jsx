import { motion } from 'framer-motion'
import { Target, Zap, Heart, Globe, Users, Award, TrendingUp, MapPin } from 'lucide-react'

const values = [
  { icon: Target, title: 'Precision', desc: 'Every product is rigorously tested and curated to meet our exacting standards of quality and design.' },
  { icon: Zap, title: 'Innovation', desc: 'We embrace cutting-edge design and technology, constantly pushing the boundaries of what e-commerce can be.' },
  { icon: Heart, title: 'Passion', desc: 'Built by people who genuinely love great products and are obsessed with delivering exceptional experiences.' },
  { icon: Globe, title: 'Sustainability', desc: 'Committed to ethical sourcing, eco-friendly packaging, and reducing our environmental footprint every day.' },
]

const stats = [
  { icon: Users, num: '50K+', label: 'Happy Customers' },
  { icon: Award, num: '2K+', label: 'Products Curated' },
  { icon: TrendingUp, num: '98%', label: 'Satisfaction Rate' },
  { icon: MapPin, num: '500+', label: 'Cities Delivered' },
]

const team = [
  { name: 'Aanya Kapoor', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Vikram Desai', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Meera Joshi', role: 'Lead Curator', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Rahul Nair', role: 'CTO', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
]

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.1)_0%,_transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm uppercase tracking-[0.3em] text-violet-400 font-medium mb-6">Our Story</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05]">
              We Build{' '}
              <span className="gradient-text">Experiences</span>
              <br />
              Not Just Stores
            </h1>
            <p className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              VELORA was born from a simple belief — online shopping should feel as premium as the products you buy. We combine artisan curation with modern technology to set new standards in e-commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, num, label }, i) => (
              <motion.div key={label} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <Icon size={24} className="mx-auto text-violet-400 mb-3" />
                <p className="text-3xl font-bold gradient-text">{num}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="VELORA story — curated shopping experience"
              className="relative rounded-2xl shadow-2xl ring-1 ring-white/10 w-full"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400 font-medium mb-4">The Beginning</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-8">
              From Idea to{' '}
              <span className="gradient-text">Revolution</span>
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                Founded in 2024, VELORA started as a passion project to reimagine online retail in India. We noticed most e-commerce platforms prioritised sheer volume over experience — leaving customers drowning in mediocre options with no sense of curation.
              </p>
              <p>
                We took a radically different approach. Every single product on VELORA is handpicked by our team of curators — designers, technologists, and lifestyle enthusiasts who believe the things you own should spark joy and stand the test of time.
              </p>
              <p>
                Today, we serve over <strong className="text-white">50,000 customers</strong> across <strong className="text-white">500+ cities</strong> in India, delivering not just products but a carefully crafted experience from discovery to doorstep.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400 font-medium mb-4">What Drives Us</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              Our Core <span className="gradient-text">Values</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ delay: i * 0.12 }}
                className="glass-card p-8 text-center hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={26} className="text-violet-400" />
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
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-400 font-medium mb-4">The People</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">Passionate individuals who bring VELORA to life every single day.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m, i) => (
            <motion.div key={m.name} {...fadeUp} transition={{ delay: i * 0.12 }} className="group text-center">
              <div className="relative mx-auto w-48 h-48 mb-5 rounded-2xl overflow-hidden ring-1 ring-white/10">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-lg">{m.name}</h3>
              <p className="text-sm text-violet-400 mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission image section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80" alt="Mission" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-[#060608]/70" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-400 font-medium mb-4">Our Mission</p>
            <h2 className="text-3xl sm:text-5xl font-display font-bold leading-tight mb-6">
              To make every purchase feel like{' '}
              <span className="gradient-text">unwrapping a gift</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              We believe shopping is an experience, not a transaction. From the moment you browse to the instant you unbox, every touchpoint is designed with intention, care, and a little bit of magic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="glass-card p-10 max-w-2xl mx-auto">
          <p className="text-sm text-violet-400 uppercase tracking-[0.2em] font-medium mb-3">Portfolio Disclaimer</p>
          <p className="text-gray-400 leading-relaxed">
            This is a <strong className="text-white">conceptual portfolio project</strong> built by <strong className="text-white">Rohan Gupta</strong> to demonstrate full-stack e-commerce development with React, Supabase, and Razorpay. No real transactions are processed. All payments run in test mode.
          </p>
        </div>
      </section>
    </div>
  )
}
