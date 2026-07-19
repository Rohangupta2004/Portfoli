import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.15)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.05)_0%,_transparent_40%)]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-violet-300 mb-8">
              <Sparkles size={14} className="text-amber-400" />
              <span>New Collection 2025</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight">
              Redefine
              <br />
              <span className="gradient-text">Your Style</span>
            </h1>

            <p className="mt-8 text-lg text-gray-400 max-w-lg leading-relaxed">
              Discover curated collections of premium products that blend artisan craftsmanship with modern aesthetics. Every piece tells a story of excellence.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/shop" className="group px-8 py-4 gradient-btn text-white font-semibold rounded-2xl flex items-center gap-3 shadow-lg shadow-purple-500/20">
                Explore Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
                Our Story
              </Link>
            </div>

            <div className="flex items-center gap-10 mt-14">
              {[
                { num: '2K+', label: 'Products' },
                { num: '50K+', label: 'Customers' },
                { num: '4.9', label: 'Rating' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <p className="text-3xl font-bold gradient-text">{s.num}</p>
                  <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-amber-500/10 rounded-[2rem] blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-3xl rotate-6" />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                alt="VELORA luxury collection"
                className="relative rounded-3xl object-cover w-full h-full shadow-2xl ring-1 ring-white/10"
              />
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 glow-purple animate-float">
                <p className="text-xs text-gray-400">Best Seller</p>
                <p className="font-bold">Premium Watch</p>
                <p className="text-violet-400 font-bold">\u20B912,999</p>
              </div>
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4 glow-fuchsia animate-float" style={{ animationDelay: '2s' }}>
                <p className="text-2xl">\u2B50</p>
                <p className="text-sm font-bold">Top Rated</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
