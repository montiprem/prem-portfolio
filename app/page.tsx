import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import LifePhilosophy from "@/components/sections/LifePhilosophy";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";
import CommunityPresence from "@/components/sections/CommunityPresence";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Phone-specific layout wrapper for mobile spacing improvements */}
      <div className="mobile-optimized-container">
        <Hero />
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <LifePhilosophy />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Skills />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Experience />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Projects />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Testimonials />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <FAQSection />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CommunityPresence />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>
    </main>
  );
}