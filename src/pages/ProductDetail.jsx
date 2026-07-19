import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowLeft, Truck, Shield, RotateCcw, ChevronRight, Check, Share2, Minus, Plus, ZoomIn } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import toast from 'react-hot-toast'
import { useState } from 'react'

const colorOptions = [
  { name: 'Midnight Black', hex: '#1a1a2e' },
  { name: 'Arctic White', hex: '#f0f0f0' },
  { name: 'Royal Purple', hex: '#7c3aed' },
  { name: 'Rose Gold', hex: '#e8b4b8' },
]

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL']

const specs = {
  Material: 'Premium grade, sourced ethically',
  Weight: 'Lightweight ergonomic build',
  Warranty: '1 Year manufacturer warranty',
  Origin: 'Designed in India',
  Care: 'See product label for details',
  Packaging: 'Eco-friendly premium box',
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { dispatch } = useCart()
  const [imgIdx, setImgIdx] = useState(0)
  const [tab, setTab] = useState('description')
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(2)
  const [qty, setQty] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  if (!product) return (
    <div className="pt-32 pb-16 text-center">
      <p className="text-gray-500 text-xl">Product not found</p>
      <Link to="/shop" className="mt-4 inline-block text-purple-400 hover:underline">Back to Shop</Link>
    </div>
  )

  const images = [product.image, ...(product.gallery || [])]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const disc = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const add = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', payload: product })
    toast.success(product.name + ' added to cart')
  }

  const toggleWishlist = () => {
    setWishlisted(!wishlisted)
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const share = () => {
    if (navigator.share) navigator.share({ title: product.name, url: window.location.href })
    else { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-purple-400 transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <Link to={'/shop?category=' + product.category.toLowerCase()} className="hover:text-purple-400 transition-colors">{product.category}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-300 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer group" onClick={() => setZoomed(true)}>
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-70 transition-opacity" />
              </div>
              {product.badge && <span className="absolute top-4 left-4 px-3 py-1 text-white text-xs font-medium rounded-full backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>{product.badge}</span>}
              {disc > 0 && <span className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 text-white text-xs font-bold rounded-full">{disc}% OFF</span>}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={'w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ' + (imgIdx === i ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-white/10 hover:border-white/30')}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <p className="text-purple-400 font-medium text-sm uppercase tracking-wider">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mt-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />)}</div>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full inline-flex items-center gap-1"><Check size={10} /> In Stock</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-4xl font-bold gradient-text">{'\u20B9' + product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-xl text-gray-500 line-through">{'\u20B9' + product.originalPrice.toLocaleString()}</span>}
              {disc > 0 && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg">Save {'\u20B9' + (product.originalPrice - product.price).toLocaleString()}</span>}
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes. Free shipping on orders above {'\u20B9'}999.</p>

            {/* Color Selector */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Color: <span className="text-white">{colorOptions[selectedColor].name}</span></p>
              <div className="flex gap-3">
                {colorOptions.map((c, i) => (
                  <button key={c.name} onClick={() => setSelectedColor(i)} className={'w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ' + (selectedColor === i ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-white/20 hover:border-white/40')} style={{ backgroundColor: c.hex }}>
                    {selectedColor === i && <Check size={14} className={c.hex === '#f0f0f0' ? 'text-black' : 'text-white'} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-300">Size: <span className="text-white">{sizeOptions[selectedSize]}</span></p>
                <button className="text-xs text-purple-400 hover:underline">Size Guide</button>
              </div>
              <div className="flex gap-2">
                {sizeOptions.map((s, i) => (
                  <button key={s} onClick={() => setSelectedSize(i)} className={'px-4 py-2 rounded-xl text-sm font-medium transition-all ' + (selectedSize === i ? 'text-white' : 'glass text-gray-300 hover:bg-white/10')} style={selectedSize === i ? { background: 'linear-gradient(135deg, #a855f7, #ec4899)' } : {}}>{s}</button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-4 mt-8">
              <div className="flex items-center gap-3 glass rounded-xl px-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 hover:text-purple-400 transition-colors"><Minus size={16} /></button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-1 hover:text-purple-400 transition-colors"><Plus size={16} /></button>
              </div>
              <button onClick={add} className="flex-1 py-4 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button onClick={toggleWishlist} className={'p-4 glass rounded-xl transition-colors ' + (wishlisted ? 'text-pink-400' : 'hover:text-pink-400')}>
                <Heart size={20} className={wishlisted ? 'fill-current' : ''} />
              </button>
              <button onClick={share} className="p-4 glass rounded-xl hover:text-purple-400 transition-colors">
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over \u20B9999' },
                { icon: Shield, label: '1 Year Warranty', sub: 'Full coverage' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30-day policy' },
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

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mt-16">
          <div className="flex gap-1 border-b border-white/10">
            {['description', 'specifications', 'reviews'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={'px-6 py-3 text-sm font-medium capitalize transition-colors relative ' + (tab === t ? 'text-white' : 'text-gray-500 hover:text-gray-300')}
              >
                {t}
                {tab === t && <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)' }} />}
              </button>
            ))}
          </div>
          <div className="py-8">
            <AnimatePresence mode="wait">
              {tab === 'description' && (
                <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
                  <p className="text-gray-300 leading-relaxed text-lg">{product.description}</p>
                  <div className="mt-6 space-y-3">
                    <h3 className="font-medium text-white">Key Highlights</h3>
                    <ul className="space-y-2">
                      {['Premium quality materials sourced from certified suppliers', 'Ergonomic design tested for daily comfort and durability', 'Eco-friendly packaging with carbon-neutral shipping', 'Backed by VELORA\'s quality promise and easy returns'].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-400"><Check size={16} className="text-green-400 mt-0.5 shrink-0" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
              {tab === 'specifications' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl">
                  <div className="glass rounded-2xl divide-y divide-white/10">
                    {Object.entries(specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between px-6 py-4">
                        <span className="text-gray-400">{key}</span>
                        <span className="text-white font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {tab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <p className="text-5xl font-bold gradient-text">{product.rating}.0</p>
                      <div className="flex gap-0.5 mt-2 justify-center">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />)}</div>
                      <p className="text-sm text-gray-500 mt-1">{product.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === product.rating ? 72 : star === product.rating - 1 ? 18 : star === product.rating + 1 ? 8 : 2
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-3">{star}</span>
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: pct + '%', background: 'linear-gradient(90deg, #a855f7, #ec4899)' }} /></div>
                            <span className="text-xs text-gray-500 w-8">{pct}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {[
                    { name: 'Aditi S.', date: '2 weeks ago', rating: 5, text: 'Absolutely love the quality! The packaging was beautiful and the product exceeded my expectations. Will definitely order again from VELORA.' },
                    { name: 'Karan P.', date: '1 month ago', rating: 5, text: 'Perfect gift for my wife. The attention to detail is remarkable. Fast shipping too!' },
                    { name: 'Neha R.', date: '1 month ago', rating: 4, text: 'Great product overall. Slightly different shade than expected but the quality makes up for it. Their customer support was very helpful.' },
                  ].map((r) => (
                    <div key={r.name} className="glass rounded-xl p-5 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>{r.name[0]}</div>
                          <div><p className="font-medium text-sm">{r.name}</p><p className="text-xs text-gray-500">{r.date}</p></div>
                        </div>
                        <div className="flex gap-0.5">{[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-8">You May Also <span className="gradient-text">Like</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer" onClick={() => setZoomed(false)}>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} src={images[imgIdx]} alt={product.name} className="max-w-full max-h-full object-contain rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
