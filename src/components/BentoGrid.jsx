import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/categories'

export default function BentoGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-display font-bold">Shop by <span className="gradient-text">Category</span></h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Explore our curated categories, each handpicked for the discerning shopper</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {categories.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={'relative group overflow-hidden rounded-2xl ' + cat.span}>
            <Link to={'/shop?category=' + cat.slug} className="block w-full h-full">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div><p className="text-white font-display text-xl font-bold">{cat.name}</p><p className="text-gray-300 text-sm mt-1">{cat.count} Products</p></div>
                <div className="p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight size={18} /></div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
