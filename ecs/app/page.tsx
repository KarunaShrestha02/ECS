import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { NaturalBlissSection } from "@/components/natural-bliss-section"
import { WildSection } from "@/components/wild-section"
import { DiscoverySection } from "@/components/discovery-section"
import { FoodSection } from "@/components/food-section"
import { FeaturedGrid } from "@/components/featured-grid"
import { CurrentIssue } from "@/components/currrent-issue"
import { Footer } from "@/components/footer"
import { SisterPublications } from "@/components/sister-publications"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <NaturalBlissSection />
      <WildSection />
      <DiscoverySection />
      <FoodSection />
      <FeaturedGrid />
      <CurrentIssue />
      <SisterPublications />
      <Newsletter />
      <Footer />
    </main>
  )
}

