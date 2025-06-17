import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { AboutSection } from "@/components/sections/about-section"
import { TechnologySection } from "@/components/sections/technology-section"
import { TeamSection } from "@/components/sections/team-section"
import { CTASection } from "@/components/sections/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <TechnologySection />
      <TeamSection />
      <CTASection />
    </div>
  )
}
