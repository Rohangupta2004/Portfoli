import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = isLogin ? await signIn(email, pw) : await signUp(email, pw)
    if (error) { toast.error(error.message); setLoading(false); return }
    toast.success(isLogin ? 'Welcome back!' : 'Account created! Check your email.')
    if (isLogin) nav('/')
    setLoading(false)
  }

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="max-w-md mx-auto px-4 w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-gray-400 mt-2">{isLogin ? 'Sign in to your LUXE account' : 'Join the LUXE experience'}</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" required minLength={6} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50">
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')} <ArrowRight size={18} />
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
