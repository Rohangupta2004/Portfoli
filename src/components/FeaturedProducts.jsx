import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8)
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-400 font-medium mb-4">Curated For You</p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold">Featured <span className="gradient-text">Products</span></h2>
          <p className="mt-4 text-gray-400">Handpicked essentials for the modern lifestyle</p>
        </div>
        <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">View all <ArrowRight size={16} /></Link>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  )
}
