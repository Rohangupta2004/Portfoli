import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { loadRazorpay, initiatePayment } from '../lib/razorpay'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { items, total, dispatch } = useCart()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pincode: '' })
  const [busy, setBusy] = useState(false)
  const gst = Math.round(total * 0.18)
  const grand = total + gst

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const pay = async (e) => {
    e.preventDefault()
    if (!items.length) { toast.error('Cart is empty'); return }
    setBusy(true)
    const ok = await loadRazorpay()
    if (!ok) { toast.error('Payment gateway failed to load'); setBusy(false); return }
    const oid = 'VLR-' + Date.now()
    initiatePayment({
      amount: grand, orderId: oid, customerName: form.name, customerEmail: form.email,
      onSuccess: (res) => { dispatch({ type: 'CLEAR' }); nav('/order-success', { state: { orderId: oid, paymentId: res.razorpay_payment_id } }); toast.success('Payment successful!'); setBusy(false) },
      onFailure: () => { toast.error('Payment cancelled'); setBusy(false) },
    })
  }

  if (!items.length)
    return <div className="pt-32 pb-16 text-center"><Package size={64} className="mx-auto text-gray-600 mb-6" /><h1 className="text-2xl font-display font-bold">Nothing to checkout</h1><p className="text-gray-500 mt-2">Add items to your cart first.</p></div>

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-display font-bold mb-8"><span className="gradient-text">Checkout</span></motion.h1>
        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={pay} className="lg:col-span-3 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Package size={20} className="text-purple-400" /> Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n: 'name', l: 'Full Name', t: 'text', s: 2 },
                  { n: 'email', l: 'Email', t: 'email', s: 1 },
                  { n: 'phone', l: 'Phone', t: 'tel', s: 1 },
                  { n: 'address', l: 'Address', t: 'text', s: 2 },
                  { n: 'city', l: 'City', t: 'text', s: 1 },
                  { n: 'pincode', l: 'PIN Code', t: 'text', s: 1 },
                ].map((f) => (
                  <div key={f.n} className={f.s === 2 ? 'sm:col-span-2' : ''}>
                    <label className="text-sm text-gray-400 mb-1 block">{f.l}</label>
                    <input name={f.n} type={f.t} value={form[f.n]} onChange={change} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500" />
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" disabled={busy} className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
              <Lock size={18} /> {busy ? 'Processing...' : 'Pay \u20B9' + grand.toLocaleString() + ' with Razorpay'}
            </button>
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1"><Lock size={12} /> Payments secured via Razorpay (Test Mode)</p>
          </form>
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-gray-500">Qty: {item.qty}</p></div>
                    <p className="text-sm font-bold">{'\u20B9' + (item.price * item.qty).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-400"><span>Subtotal</span><span>{'\u20B9' + total.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm text-gray-400"><span>Shipping</span><span className="text-green-400">Free</span></div>
                <div className="flex justify-between text-sm text-gray-400"><span>GST (18%)</span><span>{'\u20B9' + gst.toLocaleString()}</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10"><span>Total</span><span className="gradient-text">{'\u20B9' + grand.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
