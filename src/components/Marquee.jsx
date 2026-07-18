const words = ['VELORA', 'PREMIUM', 'CRAFTED', 'MINIMAL', 'EXCLUSIVE', 'AUTHENTIC', 'CURATED', 'ARTISAN']

export default function Marquee() {
  return (
    <div className="py-8 border-y border-white/10 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="mx-8 text-2xl font-display font-bold text-white/10 hover:text-white/30 transition-colors cursor-default">{w}</span>
        ))}
      </div>
    </div>
  )
}
