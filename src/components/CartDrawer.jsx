import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { items, isOpen, total, dispatch } = useCart()
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => dispatch({ type: 'CLOSE_CART' })} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f1a] border-l border-white/10 z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-display font-bold">Your Cart</h2>
              <button onClick={() => dispatch({ type: 'CLOSE_CART' })} className="p-2 hover:text-purple-400 transition-colors"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag size={48} className="mb-4" /><p>Your cart is empty</p>
                </div>
              ) : items.map((item) => (
                <div key={item.id} className="flex gap-4 glass rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-purple-400 font-bold mt-1">{'\u20B9' + (item.price * item.qty).toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })} className="p-1 glass rounded-lg hover:bg-white/10"><Minus size={14} /></button>
                      <span className="text-sm font-medium">{item.qty}</span>
                      <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })} className="p-1 glass rounded-lg hover:bg-white/10"><Plus size={14} /></button>
                    </div>
                  </div>
                  <button onClick={() => dispatch({ type: 'REMOVE', payload: item.id })} className="text-gray-500 hover:text-red-400 self-start"><X size={16} /></button>
                </div>
              ))}
            </div>
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="gradient-text">{'\u20B9' + total.toLocaleString()}</span></div>
                <Link to="/checkout" onClick={() => dispatch({ type: 'CLOSE_CART' })} className="block w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center font-medium rounded-xl hover:opacity-90 transition-opacity">Checkout</Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
