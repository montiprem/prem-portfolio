import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import FAQSection from "@/components/sections/FAQSection";
import Contact from "@/components/sections/Contact";

import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden w-full">
      {/* MOBILE ONLY: Soft Background Glow Overlay (Hard Ring edges ko conceal karne ke liye) */}
      <div className="block md:hidden pointer-events-none fixed inset-0 z-0 bg-radial from-blue-900/10 via-background/80 to-background opacity-80" />

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        
        <ScrollReveal>
          <About />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Skills />
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

        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>
    </main>
  );
}