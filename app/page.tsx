import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ProcessSection } from "@/components/sections/process-section"
import { AboutSection } from "@/components/sections/about-section"
import { CtaSection } from "@/components/sections/cta-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/sections/footer"
import { AnimatedSection } from "@/components/animations/section-animation"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AnimatedSection id="services" className="py-24">
          <ServicesSection />
        </AnimatedSection>

        <AnimatedSection id="projects" className="py-24">
          <ProjectsSection />
        </AnimatedSection>

        <AnimatedSection id="projects" className="py-24">
          <ProcessSection />
        </AnimatedSection>

        <AnimatedSection id="about" className="py-24">
          <AboutSection />
        </AnimatedSection>
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
