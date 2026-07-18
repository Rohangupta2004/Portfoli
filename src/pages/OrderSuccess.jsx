import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function OrderSuccess() {
  const { state } = useLocation()
  const { orderId, paymentId } = state || {}
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}>
          <CheckCircle size={80} className="mx-auto text-green-400 mb-6" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-4xl font-display font-bold mb-4">Order <span className="gradient-text">Confirmed!</span></h1>
          <p className="text-gray-400 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
          {orderId && (
            <div className="glass rounded-2xl p-6 text-left space-y-3 mb-8">
              <div className="flex justify-between"><span className="text-gray-400">Order ID</span><span className="font-mono text-sm">{orderId}</span></div>
              {paymentId && <div className="flex justify-between"><span className="text-gray-400">Payment ID</span><span className="font-mono text-sm">{paymentId}</span></div>}
              <div className="flex justify-between"><span className="text-gray-400">Status</span><span className="text-green-400 font-medium">Confirmed</span></div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90">Continue Shopping <ArrowRight size={18} /></Link>
            <Link to="/" className="px-8 py-3 glass text-white font-medium rounded-xl hover:bg-white/10">Back to Home</Link>
          </div>
          <p className="mt-8 text-xs text-gray-600">This is a demo transaction. No real payment was charged.</p>
        </motion.div>
      </div>
    </div>
  )
}
