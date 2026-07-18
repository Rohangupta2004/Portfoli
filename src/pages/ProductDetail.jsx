import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { dispatch } = useCart()
  const [imgIdx, setImgIdx] = useState(0)

  if (!product) return <div className="pt-32 text-center text-gray-500 text-xl">Product not found</div>

  const images = [product.image, ...(product.gallery || [])]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const add = () => { dispatch({ type: 'ADD', payload: product }); toast.success(product.name + ' added to cart') }
  const disc = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"><ArrowLeft size={18} /> Back to Shop</Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={'w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ' + (imgIdx === i ? 'border-purple-500' : 'border-transparent')}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <p className="text-purple-400 font-medium">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mt-2">{product.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />)}</div>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl font-bold gradient-text">{'\u20B9' + product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-xl text-gray-500 line-through">{'\u20B9' + product.originalPrice.toLocaleString()}</span>}
              {disc > 0 && <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded-lg">{disc}% OFF</span>}
            </div>
            <p className="mt-6 text-gray-400 leading-relaxed">{product.description}</p>
            <div className="flex gap-4 mt-8">
              <button onClick={add} className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"><ShoppingBag size={20} /> Add to Cart</button>
              <button className="p-4 glass rounded-xl hover:text-pink-400 transition-colors"><Heart size={20} /></button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over \u20B9999' },
                { icon: Shield, label: 'Warranty', sub: '1 Year Coverage' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30-Day Policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <Icon size={20} className="mx-auto text-purple-400" />
                  <p className="text-sm font-medium mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-display font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
