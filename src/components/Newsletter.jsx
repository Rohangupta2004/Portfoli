import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const submit = (e) => { e.preventDefault(); toast.success('Thank you for subscribing!'); setEmail('') }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-white/10 p-12 md:p-16 text-center">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Stay in the <span className="gradient-text">Loop</span></h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">Get exclusive drops, early access, and style inspiration delivered to your inbox.</p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
            <button type="submit" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"><Send size={18} /> Subscribe</button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
