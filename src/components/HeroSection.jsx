import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-[#0a0a0a] to-pink-950/30" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm text-purple-300 mb-8 glow-purple">
              <Sparkles size={14} className="text-purple-400" /> New Collection 2025
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tight">
              Redefine<br />
              <span className="gradient-text">Your Style</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-gray-400 max-w-lg leading-relaxed">
              Discover curated collections of premium products that blend artisan craftsmanship with modern aesthetics. Every piece tells a story.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/shop" className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-gradient text-white font-semibold rounded-2xl flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow">
                Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all gradient-border">
                Our Story
              </Link>
            </div>

            <div className="flex items-center gap-10 mt-14">
              {[
                { val: '2K+', label: 'Products' },
                { val: '50K+', label: 'Customers' },
                { val: '4.9', label: 'Rating' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.15 }}>
                  <p className="text-3xl sm:text-4xl font-bold gradient-text">{s.val}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-orange-500/20 rounded-3xl rotate-6 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-3xl -rotate-3" />
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85" alt="VELORA luxury collection" className="relative rounded-3xl object-cover w-full h-full shadow-2xl shadow-purple-900/20" />

              {/* Floating cards */}
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-5 glow-purple">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Best Seller</p>
                <p className="font-display font-bold mt-1">Premium Watch</p>
                <p className="gradient-text font-bold text-lg mt-0.5">{"\u20B912,999"}</p>
              </motion.div>

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4 glow-pink">
                <p className="text-3xl">\u2B50</p>
                <p className="text-sm font-bold mt-1">Top Rated</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
