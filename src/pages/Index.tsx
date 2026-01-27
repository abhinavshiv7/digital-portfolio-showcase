/**
 * Index.tsx - Main Landing Page
 * 
 * This is the primary entry point for the portfolio website.
 * It assembles all portfolio sections in the correct display order.
 * 
 * Sections are rendered in this order:
 * 1. Hero - Main landing section with navigation and intro
 * 2. About - Personal introduction and highlights
 * 3. Projects - Featured projects carousel
 * 4. Skills - Technical skills with progress bars
 * 5. Tools - Technologies and tools used
 * 6. Experience - Certifications and achievements
 * 7. Education - Academic background
 * 8. Contact - Contact form and information
 * 
 * @component
 * @file src/pages/Index.tsx
 */

import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Tools } from "@/components/portfolio/Tools";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card/30 via-50% to-muted/40">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Tools />
      <Experience />
      <Education />
      <Contact />
    </div>
  );
};

export default Index;
