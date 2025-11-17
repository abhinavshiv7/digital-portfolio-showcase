import { useState, useEffect } from "react";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Tools } from "@/components/portfolio/Tools";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
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
