/**
 * Skills.tsx - Skills & Expertise Section Component with Parallax
 * 
 * Displays technical skills organized by category with:
 * - Progress bars showing proficiency levels
 * - Hover effects with scale and glow animations
 * - Scroll-reveal animation on viewport entry
 * - Staggered card reveal animations
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/components/ui/progress: Progress bar component
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
 * - @/hooks/use-parallax-scroll: Parallax scroll effect hook
 * - @/lib/utils: Utility functions (cn for classname merging)
 * 
 * @component
 * @file src/components/portfolio/Skills.tsx
 */

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

export const Skills = () => {
  const { ref, isVisible } = useScrollReveal();
  const { scrollY } = useParallaxScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionTop, setSectionTop] = useState(0);

  /** Calculate section position for parallax offset */
  useEffect(() => {
    if (sectionRef.current) {
      setSectionTop(sectionRef.current.offsetTop);
    }
  }, []);

  /** Calculate parallax based on scroll relative to section */
  const relativeScroll = Math.max(0, scrollY - sectionTop + window.innerHeight);
  const headerParallax = Math.min(0, -30 + relativeScroll * 0.05);

  /** Skills organized by category with proficiency levels (0-100) */
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", level: 88 },
        { name: "JavaScript", level: 85 },
        { name: "Java", level: 82 },
        { name: "C++", level: 80 }
      ]
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 82 },
        { name: "Terraform", level: 80 },
        { name: "CI/CD Pipelines", level: 78 }
      ]
    },
    {
      category: "Cloud Platforms",
      skills: [
        { name: "Google Cloud Platform", level: 85 },
        { name: "AWS", level: 80 },
        { name: "Azure", level: 75 }
      ]
    },
    {
      category: "Web & Databases",
      skills: [
        { name: "HTML/CSS/Tailwind", level: 88 },
        { name: "Node.js", level: 82 },
        { name: "Oracle SQL", level: 80 },
        { name: "MongoDB", level: 78 }
      ]
    },
    {
      category: "Data & Analytics",
      skills: [
        { name: "Pandas", level: 85 },
        { name: "NumPy", level: 83 },
        { name: "Power BI", level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 overflow-hidden" ref={sectionRef}>
      <div 
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Section Header with parallax */}
        <div 
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            transform: isVisible ? `translateY(${headerParallax}px)` : 'translateY(30px)',
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Skills Grid with staggered reveal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex}
              className={cn(
                "p-6 space-y-6 hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out bg-card cursor-pointer hover-glow-border",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              )}
              style={{ 
                transitionDelay: isVisible ? `${categoryIndex * 0.1}s` : '0s',
              }}
            >
              <h3 className="text-xl font-bold text-primary">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={isVisible ? skill.level : 0} className="h-2 transition-all duration-1000" style={{ transitionDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s` }} />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
