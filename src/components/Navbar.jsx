import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { count, dispatch } = useCart()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-2xl font-bold gradient-text tracking-wider">VELORA</Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={'text-sm font-medium transition-colors hover:text-purple-400 ' + (loc.pathname === l.to ? 'text-purple-400' : 'text-gray-300')}>{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Link to={user ? '/checkout' : '/auth'} className="p-2 hover:text-purple-400 transition-colors"><User size={20} /></Link>
            <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} className="relative p-2 hover:text-purple-400 transition-colors">
              <ShoppingBag size={20} />
              {count > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">{count}</span>}
            </button>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-strong">
            <div className="px-4 py-4 space-y-3">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-gray-300 hover:text-purple-400">{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
