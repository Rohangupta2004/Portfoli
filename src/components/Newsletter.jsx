import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const submit = (e) => { e.preventDefault(); toast.success('Thank you for subscribing!'); setEmail('') }
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-12 md:p-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-fuchsia-900/20 to-amber-900/10" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-violet-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-500/15 rounded-full blur-[100px]" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Stay in the <span className="gradient-text">Loop</span></h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">Get exclusive drops, early access, and style inspiration delivered to your inbox.</p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors" />
            <button type="submit" className="px-6 py-3.5 gradient-btn text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"><Send size={18} /> Subscribe</button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
