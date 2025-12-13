/**
 * Tools.tsx - Tools & Technologies Section Component with Parallax
 * 
 * Displays development tools and technologies organized by category with:
 * - Icon-based category headers
 * - List of tools within each category
 * - Hover animations and glow effects
 * - Scroll-reveal animation on viewport entry
 * - Staggered card reveal with alternating directions
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
 * - @/hooks/use-parallax-scroll: Parallax scroll effect hook
 * - @/lib/utils: Utility functions (cn for classname merging)
 * - lucide-react: Category icons
 * 
 * @component
 * @file src/components/portfolio/Tools.tsx
 */

import { Card } from "@/components/ui/card";
import { Cloud, Container, Database, GitBranch, Server, Terminal } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

export const Tools = () => {
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

  /** Tools organized by category with associated icons */
  const tools = [
    {
      icon: Cloud,
      name: "Cloud Platforms",
      items: ["Google Cloud Platform", "AWS", "Azure"]
    },
    {
      icon: Container,
      name: "Container & Orchestration",
      items: ["Docker", "Kubernetes", "Docker Compose"]
    },
    {
      icon: Server,
      name: "Infrastructure as Code",
      items: ["Terraform", "CloudFormation", "Ansible"]
    },
    {
      icon: GitBranch,
      name: "Version Control & CI/CD",
      items: ["Git", "GitHub Actions", "Jenkins"]
    },
    {
      icon: Database,
      name: "Databases",
      items: ["Oracle SQL", "MongoDB", "PostgreSQL"]
    },
    {
      icon: Terminal,
      name: "Development Tools",
      items: ["VS Code", "IntelliJ IDEA", "Power BI"]
    }
  ];

  return (
    <section id="tools" className="py-20 px-4 overflow-hidden" ref={sectionRef}>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tools & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            The technologies and tools I work with on a daily basis
          </p>
        </div>

        {/* Tools Grid with alternating slide directions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            // Alternate between left and right slide directions
            const isEven = index % 2 === 0;
            return (
              <Card 
                key={index}
                className={cn(
                  "p-6 transition-all duration-500 hover:-translate-y-1 bg-card hover-glow-border",
                  isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${isEven ? '-translate-x-10' : 'translate-x-10'}`
                )}
                style={{ transitionDelay: isVisible ? `${index * 0.08}s` : '0s' }}
              >
                <div className="flex items-start gap-4">
                  {/* Category Icon */}
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  {/* Category Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                    <ul className="space-y-1">
                      {tool.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
