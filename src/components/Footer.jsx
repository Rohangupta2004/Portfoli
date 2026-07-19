import { Link } from 'react-router-dom'
import { Github, Twitter, Instagram, Linkedin } from 'lucide-react'

const sections = {
  Shop: [['All Products', '/shop'], ['Electronics', '/shop?category=electronics'], ['Fashion', '/shop?category=fashion'], ['Accessories', '/shop?category=accessories']],
  Company: [['About', '/about'], ['Careers', '#'], ['Blog', '#']],
  Support: [['Help Center', '#'], ['Shipping', '#'], ['Returns', '#']],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#040406]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="font-display text-3xl font-bold gradient-text tracking-[0.15em]">VELORA</Link>
            <p className="mt-4 text-gray-400 max-w-xs leading-relaxed">Premium e-commerce experience. Where luxury meets everyday living.</p>
            <div className="flex gap-3 mt-6">
              {[Github, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 glass rounded-xl hover:text-violet-400 hover:bg-white/[0.06] transition-all"><Icon size={18} /></a>
              ))}
            </div>
          </div>
          {Object.entries(sections).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2.5">
                {items.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-sm text-gray-400 hover:text-violet-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2025 VELORA. All rights reserved.</p>
          <p>Conceptual portfolio project by <span className="text-violet-400">Rohan Gupta</span></p>
        </div>
      </div>
    </footer>
  )
}
