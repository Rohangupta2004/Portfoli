import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 8)
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <h2 className="text-4xl sm:text-5xl font-display font-bold">Featured <span className="gradient-text">Products</span></h2>
        <p className="mt-4 text-gray-400">Handpicked essentials for the modern lifestyle</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  )
}
