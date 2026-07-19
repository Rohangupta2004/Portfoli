import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Star, ArrowLeft, Truck, Shield, RotateCcw, ChevronRight, Minus, Plus, Check, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import toast from 'react-hot-toast'
import { useState } from 'react'

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colorOptions = [
  { name: 'Midnight Black', hex: '#1a1a2e' },
  { name: 'Arctic White', hex: '#f0f0f0' },
  { name: 'Royal Purple', hex: '#7c3aed' },
  { name: 'Rose Gold', hex: '#e8a87c' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { dispatch } = useCart()
  const [imgIdx, setImgIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].name)
  const [wishlisted, setWishlisted] = useState(false)

  if (!product)
    return (
      <div className="pt-32 pb-16 text-center">
        <Package size={64} className="mx-auto text-gray-600 mb-6" />
        <h1 className="text-2xl font-display font-bold">Product not found</h1>
        <Link to="/shop" className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300"><ArrowLeft size={18} /> Back to Shop</Link>
      </div>
    )

  const images = [product.image, ...(product.gallery || [])]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const disc = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const inStock = true
  const stockCount = Math.floor(Math.random() * 20) + 3

  const addToCart = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', payload: product })
    toast.success(qty > 1 ? qty + 'x ' + product.name + ' added to cart' : product.name + ' added to cart')
  }

  const toggleWishlist = () => {
    setWishlisted(!wishlisted)
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const specs = [
    { label: 'Brand', value: 'VELORA' },
    { label: 'Category', value: product.category },
    { label: 'SKU', value: 'VLR-' + String(product.id).padStart(5, '0') },
    { label: 'Weight', value: '0.' + (product.id * 3 + 2) + ' kg' },
    { label: 'Material', value: product.category === 'Fashion' ? 'Premium Cotton Blend' : product.category === 'Electronics' ? 'Aluminium + Glass' : 'Mixed Premium Materials' },
    { label: 'Origin', value: 'Designed in India' },
    { label: 'Warranty', value: product.category === 'Electronics' ? '2 Years' : '1 Year' },
    { label: 'Return Policy', value: '30 Days Easy Return' },
  ]

  const reviewsData = [
    { name: 'Amit S.', date: '2 weeks ago', rating: 5, text: 'Absolutely stunning quality. The craftsmanship is impeccable and it arrived in beautiful packaging. Will definitely buy again.' },
    { name: 'Sneha R.', date: '1 month ago', rating: 5, text: 'Exceeded my expectations. The photos do not do justice to how premium this feels in person. Worth every rupee.' },
    { name: 'Rahul K.', date: '1 month ago', rating: 4, text: 'Great product overall. Delivery was quick and the item matched the description perfectly. Minor packaging dent but the product was fine.' },
  ]

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
          <span className="text-gray-300">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
              <AnimatePresence mode="wait">
                <motion.img key={imgIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} src={images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
              </AnimatePresence>
              {product.badge && <span className="absolute top-4 left-4 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">{product.badge}</span>}
              {disc > 0 && <span className="absolute top-4 right-4 px-3 py-1.5 bg-green-500/90 text-white text-xs font-bold rounded-full">-{disc}%</span>}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={'w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ' + (imgIdx === i ? 'border-purple-500 glow-purple' : 'border-white/10 hover:border-white/30')}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-purple-400 font-medium uppercase tracking-wider">{product.category}</p>
                <h1 className="text-3xl sm:text-4xl font-display font-bold mt-2 leading-tight">{product.name}</h1>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
                ))}
              </div>
              <span className="text-sm text-gray-400">{product.rating}.0</span>
              <span className="text-sm text-gray-600">|</span>
              <span className="text-sm text-gray-400">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mt-6">
              <span className="text-4xl font-bold gradient-text">{'\u20B9' + product.price.toLocaleString()}</span>
              {product.originalPrice && <span className="text-xl text-gray-500 line-through">{'\u20B9' + product.originalPrice.toLocaleString()}</span>}
              {disc > 0 && <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-lg">Save {disc}%</span>}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mt-4">
              <div className={'w-2 h-2 rounded-full ' + (inStock ? 'bg-green-400' : 'bg-red-400')} />
              <span className={'text-sm ' + (inStock ? 'text-green-400' : 'text-red-400')}>{inStock ? 'In Stock' : 'Out of Stock'}</span>
              {inStock && <span className="text-sm text-gray-600">\u2022 Only {stockCount} left</span>}
            </div>

            <p className="mt-6 text-gray-400 leading-relaxed text-base">{product.description}</p>

            {/* Color Selector */}
            <div className="mt-8">
              <p className="text-sm font-medium text-gray-300 mb-3">Color: <span className="text-white">{selectedColor}</span></p>
              <div className="flex gap-3">
                {colorOptions.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)} className={'w-10 h-10 rounded-xl border-2 transition-all flex items-center justify-center ' + (selectedColor === c.name ? 'border-purple-500 scale-110' : 'border-white/10 hover:border-white/30')} style={{ backgroundColor: c.hex }}>
                    {selectedColor === c.name && <Check size={14} className={c.hex === '#f0f0f0' ? 'text-gray-800' : 'text-white'} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Size: <span className="text-white">{selectedSize}</span></p>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={'w-12 h-12 rounded-xl text-sm font-medium transition-all ' + (selectedSize === s ? 'bg-purple-500 text-white glow-purple' : 'glass text-gray-300 hover:bg-white/10')}>{s}</button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-4 mt-8">
              <div className="flex items-center glass rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:text-purple-400 transition-colors"><Minus size={18} /></button>
                <span className="w-12 text-center font-semibold text-lg">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:text-purple-400 transition-colors"><Plus size={18} /></button>
              </div>
              <button onClick={addToCart} className="flex-1 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-gradient text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button onClick={toggleWishlist} className={'p-4 glass rounded-xl transition-all ' + (wishlisted ? 'text-pink-400 glow-pink' : 'text-gray-400 hover:text-pink-400')}>
                <Heart size={20} className={wishlisted ? 'fill-pink-400' : ''} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over \u20B9999' },
                { icon: Shield, label: 'Secure Payment', sub: 'SSL Encrypted' },
                { icon: RotateCcw, label: 'Easy Returns', sub: '30-Day Policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <Icon size={20} className="mx-auto text-purple-400" />
                  <p className="text-xs font-medium mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description / Specs / Reviews */}
        <div className="mt-20">
          <div className="flex gap-1 border-b border-white/10">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={'px-6 py-4 text-sm font-medium capitalize transition-all relative ' + (activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300')}>
                {tab}
                {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />}
              </button>
            ))}
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
                  <h3 className="text-xl font-display font-bold mb-4">About This Product</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{product.description}</p>
                  <div className="space-y-3">
                    <p className="text-gray-400 leading-relaxed">Every VELORA product is carefully sourced and quality-checked to ensure it meets our premium standards. This item comes with elegant packaging, making it perfect as a gift or a treat for yourself.</p>
                    <p className="text-gray-400 leading-relaxed">Our commitment to quality means we stand behind every purchase with our satisfaction guarantee. If you are not completely satisfied, our hassle-free return policy has you covered.</p>
                  </div>
                </motion.div>
              )}
              {activeTab === 'specifications' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-2xl">
                  <h3 className="text-xl font-display font-bold mb-6">Technical Specifications</h3>
                  <div className="space-y-0">
                    {specs.map((s, i) => (
                      <div key={s.label} className={'flex justify-between py-4 border-b border-white/5 ' + (i === 0 ? 'border-t' : '')}>
                        <span className="text-gray-500">{s.label}</span>
                        <span className="text-white font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-center">
                      <p className="text-5xl font-bold gradient-text">{product.rating}.0</p>
                      <div className="flex gap-0.5 mt-2 justify-center">{[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />)}</div>
                      <p className="text-sm text-gray-500 mt-1">{product.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const pct = star === product.rating ? 75 : star === product.rating - 1 ? 20 : 5
                        return (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 w-3">{star}</span>
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: pct + '%' }} />
                            </div>
                            <span className="text-xs text-gray-600 w-8">{pct}%</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviewsData.map((r, i) => (
                      <div key={i} className="glass rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm">{r.name[0]}</div>
                            <div><p className="font-medium text-sm">{r.name}</p><p className="text-xs text-gray-500">{r.date}</p></div>
                          </div>
                          <div className="flex gap-0.5">{[...Array(r.rating)].map((_, j) => <Star key={j} size={12} className="fill-yellow-400 text-yellow-400" />)}</div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 pt-16 border-t border-white/10">
            <h2 className="text-2xl font-display font-bold mb-8">You May Also <span className="gradient-text">Like</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
