import NavBar from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { NaturalBlissSection } from "@/components/natural-bliss-section"
import { WildSection } from "@/components/wild-section"
import { DiscoverySection } from "@/components/discovery-section"
import { FoodSection } from "@/components/food-section"
import { FeaturedGrid } from "@/components/featured-grid"
import { LatestIssues } from "@/components/latest-issues"
import { MagazineSlider } from "@/components/magazine-slider"
import { SisterPublications } from "@/components/sister-publications"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

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
      <LatestIssues />
      <MagazineSlider />
      <SisterPublications />
      <Newsletter />
      <Footer />
    </main>
  )
}
