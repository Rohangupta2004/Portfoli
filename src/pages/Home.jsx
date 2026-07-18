import HeroSection from '../components/HeroSection'
import Marquee from '../components/Marquee'
import BentoGrid from '../components/BentoGrid'
import FeaturedProducts from '../components/FeaturedProducts'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <BentoGrid />
      <FeaturedProducts />
      <Testimonials />
      <Newsletter />
    </>
  )
}
