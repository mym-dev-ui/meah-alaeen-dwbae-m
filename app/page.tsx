import { Navbar } from "@/components/navbar"
import { HeroSlider } from "@/components/hero-slider"
import { CategorySection } from "@/components/category-section"
import { BestsellersSection } from "@/components/bestsellers-section"
import { OurStoryBanner } from "@/components/our-story-banner"
import { Footer } from "@/components/footer-alain"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSlider />
      <CategorySection />
      <BestsellersSection />
      <OurStoryBanner />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
