import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-[#0a0a0a] to-pink-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-purple-300 mb-6"><Sparkles size={14} /> New Collection 2025</div>
            <h1 className="text-5xl sm:text-7xl font-display font-bold leading-tight">Redefine<br /><span className="gradient-text">Your Style</span></h1>
            <p className="mt-6 text-lg text-gray-400 max-w-lg leading-relaxed">Discover curated collections of premium products that blend artisan craftsmanship with modern aesthetics. Every piece tells a story.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/shop" className="group px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity">Explore Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></Link>
              <Link to="/about" className="px-8 py-3 glass text-white font-medium rounded-xl hover:bg-white/10 transition-colors">Our Story</Link>
            </div>
            <div className="flex items-center gap-8 mt-12">
              <div><p className="text-3xl font-bold gradient-text">2K+</p><p className="text-sm text-gray-500">Products</p></div>
              <div className="w-px h-10 bg-white/10" />
              <div><p className="text-3xl font-bold gradient-text">50K+</p><p className="text-sm text-gray-500">Customers</p></div>
              <div className="w-px h-10 bg-white/10" />
              <div><p className="text-3xl font-bold gradient-text">4.9</p><p className="text-sm text-gray-500">Rating</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl rotate-6" />
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" alt="Luxury collection" className="relative rounded-3xl object-cover w-full h-full shadow-2xl" />
              <div className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 animate-float">
                <p className="text-xs text-gray-400">Best Seller</p><p className="font-bold">Premium Watch</p><p className="text-purple-400 font-bold">\u20B912,999</p>
              </div>
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl p-4 animate-float" style={{ animationDelay: '2s' }}>
                <p className="text-2xl">\u2B50</p><p className="text-sm font-bold">Top Rated</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
