import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const data = [
  { id: 1, name: 'Priya Sharma', role: 'Fashion Designer', text: 'VELORA has the most curated collection I have found online. The quality is exceptional and the packaging feels like receiving a gift.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', rating: 5 },
  { id: 2, name: 'Arjun Mehta', role: 'Tech Entrepreneur', text: 'From sleek gadgets to premium accessories, everything on VELORA screams quality. My go-to for thoughtful gifts.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', rating: 5 },
  { id: 3, name: 'Ananya Reddy', role: 'Interior Stylist', text: 'The home collection transformed my apartment. Each piece is minimal yet impactful. Customer service is equally stellar.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', rating: 5 },
]

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold">What People <span className="gradient-text">Say</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, j) => <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />)}</div>
              <p className="text-gray-300 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div><p className="font-medium text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
