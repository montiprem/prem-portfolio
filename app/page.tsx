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
    <main>
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
    </main>
  );
}