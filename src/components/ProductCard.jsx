import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart()
  const add = (e) => { e.preventDefault(); dispatch({ type: 'ADD', payload: product }); toast.success(product.name + ' added to cart') }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
      <Link to={'/product/' + product.id} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10">
          <div className="aspect-square overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button onClick={add} className="w-full py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
              <ShoppingBag size={16} /> Add to Cart
            </button>
          </div>
          <button className="absolute top-3 right-3 p-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-pink-400"><Heart size={16} /></button>
          {product.badge && <span className="absolute top-3 left-3 px-3 py-1 bg-purple-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">{product.badge}</span>}
        </div>
        <div className="mt-3 px-1">
          <p className="text-xs text-purple-400 font-medium">{product.category}</p>
          <h3 className="font-medium text-white mt-0.5">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold">{'\u20B9' + product.price.toLocaleString()}</span>
            {product.originalPrice && <span className="text-sm text-gray-500 line-through">{'\u20B9' + product.originalPrice.toLocaleString()}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
