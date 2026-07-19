import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowLeft, Truck, Shield, RotateCcw, Share2, ChevronRight, Minus, Plus, Check, Package, Ruler, MessageSquare } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import toast from 'react-hot-toast'
import { useState } from 'react'

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = [
  { name: 'Obsidian', hex: '#1a1a2e' },
  { name: 'Ivory', hex: '#f5f0e8' },
  { name: 'Midnight Blue', hex: '#1e3a5f' },
  { name: 'Burgundy', hex: '#722f37' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { dispatch } = useCart()
  const nav = useNavigate()
  const [imgIdx, setImgIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState(colors[0].name)
  const [activeTab, setActiveTab] = useState('description')
  const [wishlisted, setWishlisted] = useState(false)

  if (!product)
    return (
      <div className="pt-32 pb-16 text-center">
        <Package size={64} className="mx-auto text-gray-600 mb-6" />
        <h1 className="text-2xl font-display font-bold mb-2">Product not found</h1>
        <p className="text-gray-500 mb-6">This item may have been removed or the link is incorrect.</p>
        <Link to="/shop" className="px-8 py-3 gradient-btn text-white font-medium rounded-xl inline-flex items-center gap-2">Back to Shop</Link>
      </div>
    )

  const images = [product.image, ...(product.gallery || [])]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const disc = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const inStock = true

  const addToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', payload: product })
    toast.success(qty + 'x ' + product.name + ' added to cart')
  }

  const buyNow = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', payload: product })
    nav('/checkout')
  }

  const toggleWishlist = () => {
    setWishlisted(!wishlisted)
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const share = () => {
    if (navigator.share) navigator.share({ title: product.name, url: window.location.href })
    else { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }
  }

  const specs = [
    { label: 'Brand', value: 'VELORA' },
    { label: 'Category', value: product.category },
    { label: 'Material', value: 'Premium Grade' },
    { label: 'Origin', value: 'Imported' },
    { label: 'Warranty', value: '1 Year' },
    { label: 'SKU', value: 'VLR-' + String(product.id).padStart(5, '0') },
  ]

  const reviews = [
    { name: 'Aditi S.', rating: 5, date: '2 weeks ago', text: 'Absolutely love this product! The quality is exceptional and it looks even better in person. Highly recommend.' },
    { name: 'Karan M.', rating: 5, date: '1 month ago', text: 'Worth every rupee. The packaging was beautiful and the product exceeded my expectations. Will buy from VELORA again.' },
    { name: 'Sneha P.', rating: 4, date: '1 month ago', text: 'Great product overall. Delivery was quick and the quality is top-notch. Minus one star for slightly delayed shipping.' },
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-violet-400 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link to={'/shop?category=' + product.category.toLowerCase()} className="hover:text-violet-400 transition-colors">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Images */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-card glow-purple">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIdx}
                  src={images[imgIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              {disc > 0 && <span className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">{disc}% OFF</span>}
              {product.badge && <span className="absolute top-4 right-4 px-3 py-1.5 glass-strong text-violet-300 text-xs font-bold rounded-full">{product.badge}</span>}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button onClick={share} className="p-2.5 glass-strong rounded-xl hover:bg-white/20 transition-colors" title="Share"><Share2 size={16} /></button>
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={'w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ' + (imgIdx === i ? 'border-violet-500 ring-2 ring-violet-500/30' : 'border-white/10 hover:border-white/30')}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right — Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            {/* Category + Title */}
            <p className="text-sm text-violet-400 font-semibold uppercase tracking-wider">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-2 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'} />
                ))}
              </div>
              <span className="text-sm text-white font-medium">{product.rating}.0</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              {inStock && <span className="ml-auto flex items-center gap-1.5 text-sm text-emerald-400 font-medium"><Check size={14} /> In Stock</span>}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mt-6">
              <span className="text-4xl font-bold gradient-text">{'\u20B9' + product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{'\u20B9' + product.originalPrice.toLocaleString()}</span>
              )}
              {disc > 0 && <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 text-sm font-semibold rounded-lg">Save {disc}%</span>}
            </div>

            {/* Short description */}
            <p className="mt-6 text-gray-400 leading-relaxed text-base">{product.description}</p>

            {/* Divider */}
            <div className="border-t border-white/[0.06] my-8" />

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Color: <span className="text-white">{selectedColor}</span></p>
              <div className="flex gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={'w-10 h-10 rounded-full border-2 transition-all ' + (selectedColor === c.name ? 'border-violet-500 ring-2 ring-violet-500/30 scale-110' : 'border-white/20 hover:border-white/40')}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-300">Size: <span className="text-white">{selectedSize}</span></p>
                <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"><Ruler size={12} /> Size Guide</button>
              </div>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ' + (selectedSize === s ? 'gradient-btn text-white shadow-lg shadow-purple-500/20' : 'glass text-gray-300 hover:bg-white/10')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-300 mb-3">Quantity</p>
              <div className="inline-flex items-center glass rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-white/10 rounded-l-xl transition-colors"><Minus size={16} /></button>
                <span className="w-12 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-white/10 rounded-r-xl transition-colors"><Plus size={16} /></button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={addToCart}
                className="flex-1 py-4 gradient-btn text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="flex-1 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Buy Now
              </button>
              <button
                onClick={toggleWishlist}
                className={'p-4 glass rounded-2xl transition-all duration-300 ' + (wishlisted ? 'text-pink-500 bg-pink-500/10 border-pink-500/30' : 'hover:text-pink-400')}
              >
                <Heart size={20} className={wishlisted ? 'fill-pink-500' : ''} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders above \u20B9999' },
                { icon: Shield, label: '1 Year Warranty', sub: 'Full coverage' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30-day policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <Icon size={20} className="mx-auto text-violet-400 mb-2" />
                  <p className="text-xs font-semibold">{label}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs — Description / Specs / Reviews */}
        <div className="mt-20">
          <div className="flex gap-1 border-b border-white/[0.06]">
            {[
              { key: 'description', label: 'Description', icon: Package },
              { key: 'specs', label: 'Specifications', icon: Ruler },
              { key: 'reviews', label: 'Reviews (' + product.reviews + ')', icon: MessageSquare },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={'flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 -mb-px ' + (activeTab === key ? 'text-violet-400 border-violet-400' : 'text-gray-500 border-transparent hover:text-gray-300')}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">About this product</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Key Highlights</h4>
                  <ul className="space-y-2">
                    {['Premium quality materials sourced from trusted suppliers', 'Meticulous craftsmanship with attention to every detail', 'Designed for durability, built to last years', 'Eco-conscious packaging using recycled materials', 'Backed by VELORA\'s satisfaction guarantee'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400">
                        <Check size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                <div className="glass-card overflow-hidden">
                  {specs.map(({ label, value }, i) => (
                    <div key={label} className={'flex justify-between px-6 py-4 ' + (i % 2 === 0 ? 'bg-white/[0.02]' : '')}>
                      <span className="text-gray-400 font-medium">{label}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                {/* Summary */}
                <div className="glass-card p-6 mb-8 flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold gradient-text">{product.rating}.0</p>
                    <div className="flex gap-0.5 mt-2 justify-center">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-700'} />)}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{product.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 2 : 1
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-3">{star}</span>
                          <Star size={12} className="fill-amber-400 text-amber-400" />
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: pct + '%' }} />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {/* Individual reviews */}
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="glass-card p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold">{r.name[0]}</div>
                          <div>
                            <p className="font-semibold text-sm">{r.name}</p>
                            <div className="flex gap-0.5">{[...Array(r.rating)].map((_, j) => <Star key={j} size={12} className="fill-amber-400 text-amber-400" />)}</div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{r.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-bold">You May Also <span className="gradient-text">Like</span></h2>
              <Link to="/shop" className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">View all <ChevronRight size={14} /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
