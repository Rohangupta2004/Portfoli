import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const cats = ['All', ...new Set(products.map((p) => p.category))]
const sorts = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
  { label: 'Name A-Z', value: 'name' },
]

export default function Shop() {
  const [sp] = useSearchParams()
  const catParam = sp.get('category')
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState(catParam ? catParam.charAt(0).toUpperCase() + catParam.slice(1) : 'All')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let r = [...products]
    if (cat !== 'All') r = r.filter((p) => p.category === cat)
    if (search) r = r.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'asc') r.sort((a, b) => a.price - b.price)
    else if (sort === 'desc') r.sort((a, b) => b.price - a.price)
    else if (sort === 'name') r.sort((a, b) => a.name.localeCompare(b.name))
    return r
  }, [cat, search, sort])

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl sm:text-5xl font-display font-bold">The <span className="gradient-text">Shop</span></h1>
          <p className="mt-2 text-gray-400">{filtered.length} products</p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-3 glass rounded-xl text-white bg-transparent focus:outline-none cursor-pointer">
            {sorts.map((o) => <option key={o.value} value={o.value} className="bg-[#0f0f1a]">{o.label}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={'px-4 py-2 rounded-xl text-sm font-medium transition-all ' + (cat === c ? 'bg-purple-500 text-white' : 'glass text-gray-300 hover:bg-white/10')}>{c}</button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-500">No products found</p>
            <button onClick={() => { setSearch(''); setCat('All') }} className="mt-4 px-6 py-2 glass rounded-xl text-purple-400 hover:bg-white/10">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  )
}
