import { RackSection } from "@/components/dc/rack-section"
import { HeroOverlay } from "@/components/site/hero-overlay"
import { SiteHeader } from "@/components/site/site-header"
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "@/components/site/sections"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0e11] text-white">
      <SiteHeader />
      <div id="hero">
        <RackSection className="h-[100svh] w-full" overlay={<HeroOverlay />} />
      </div>
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
