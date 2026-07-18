import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, total, dispatch } = useCart()
  const gst = Math.round(total * 0.18)
  const grand = total + gst

  if (items.length === 0)
    return (
      <div className="pt-32 pb-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-600 mb-6" />
        <h1 className="text-2xl font-display font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some products to get started.</p>
        <Link to="/shop" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl inline-flex items-center gap-2 hover:opacity-90">Continue Shopping</Link>
      </div>
    )

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold mb-8">Shopping <span className="gradient-text">Cart</span></motion.h1>
        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="flex justify-between"><div><h3 className="font-medium text-lg">{item.name}</h3><p className="text-sm text-purple-400">{item.category}</p></div>
                  <button onClick={() => dispatch({ type: 'REMOVE', payload: item.id })} className="text-gray-500 hover:text-red-400"><X size={20} /></button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })} className="p-2 glass rounded-lg hover:bg-white/10"><Minus size={14} /></button>
                    <span className="w-8 text-center font-medium">{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })} className="p-2 glass rounded-lg hover:bg-white/10"><Plus size={14} /></button>
                  </div>
                  <p className="text-xl font-bold">{'\u20B9' + (item.price * item.qty).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 glass rounded-2xl p-6 sm:p-8">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>{'\u20B9' + total.toLocaleString()}</span></div>
            <div className="flex justify-between text-gray-400"><span>Shipping</span><span className="text-green-400">Free</span></div>
            <div className="flex justify-between text-gray-400"><span>GST (18%)</span><span>{'\u20B9' + gst.toLocaleString()}</span></div>
            <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-bold"><span>Total</span><span className="gradient-text">{'\u20B9' + grand.toLocaleString()}</span></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link to="/shop" className="flex-1 py-3 glass text-center text-white font-medium rounded-xl hover:bg-white/10 flex items-center justify-center gap-2"><ArrowLeft size={18} /> Continue Shopping</Link>
            <Link to="/checkout" className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-center text-white font-medium rounded-xl hover:opacity-90">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
