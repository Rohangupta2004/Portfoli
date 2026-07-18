import { Link } from 'react-router-dom'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

const sections = {
  Shop: [['All Products', '/shop'], ['Electronics', '/shop?category=electronics'], ['Fashion', '/shop?category=fashion'], ['Accessories', '/shop?category=accessories']],
  Company: [['About', '/about'], ['Careers', '#'], ['Blog', '#']],
  Support: [['Help Center', '#'], ['Shipping', '#'], ['Returns', '#']],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050510]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="font-display text-3xl font-bold gradient-text tracking-wider">VELORA</Link>
            <p className="mt-4 text-gray-400 max-w-xs leading-relaxed">Premium e-commerce experience. Curated collections for the modern lifestyle.</p>
            <div className="flex gap-4 mt-6">
              {[Github, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 glass rounded-lg hover:text-purple-400 transition-colors"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          {Object.entries(sections).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-medium text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {items.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-sm text-gray-400 hover:text-purple-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>2025 VELORA. All rights reserved.</p>
          <p>Conceptual portfolio project by Rohan Gupta</p>
        </div>
      </div>
    </footer>
  )
}
