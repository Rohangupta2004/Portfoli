import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart()
  const add = (e) => { e.preventDefault(); dispatch({ type: 'ADD', payload: product }); toast.success(product.name + ' added to cart') }
  const disc = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5 }}>
      <Link to={'/product/' + product.id} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
          <div className="aspect-square overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button onClick={add} className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              <ShoppingBag size={16} /> Add to Cart
            </button>
          </div>
          <button className="absolute top-3 right-3 p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-pink-400"><Heart size={16} /></button>
          {product.badge && <span className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md">{product.badge}</span>}
          {disc > 0 && <span className="absolute top-3 left-3 mt-8 px-2 py-0.5 bg-green-500/90 text-white text-xs font-bold rounded-full">-{disc}%</span>}
        </div>
        <div className="mt-4 px-1">
          <p className="text-xs text-purple-400 font-medium uppercase tracking-wider">{product.category}</p>
          <h3 className="font-medium text-white mt-1 group-hover:text-purple-300 transition-colors">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'} />)}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold gradient-text">{'\u20B9' + product.price.toLocaleString()}</span>
            {product.originalPrice && <span className="text-sm text-gray-500 line-through">{'\u20B9' + product.originalPrice.toLocaleString()}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
