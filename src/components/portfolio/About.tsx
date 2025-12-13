/**
 * About.tsx - About Me Section Component with Parallax Animation
 * 
 * Displays personal introduction with:
 * - Bio paragraphs about background and expertise
 * - Highlight cards showcasing key strengths
 * - Scroll-reveal animation on viewport entry
 * - Parallax scroll effects for horizontal text movement
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
 * - @/hooks/use-parallax-scroll: Parallax scroll effect hook
 * - @/lib/utils: Utility functions (cn for classname merging)
 * - lucide-react: Icons (Code2, Lightbulb, Rocket)
 * 
 * @component
 * @file src/components/portfolio/About.tsx
 */

import { Card } from "@/components/ui/card";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

export const About = () => {
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

  /** Calculate horizontal parallax based on scroll relative to section */
  const relativeScroll = Math.max(0, scrollY - sectionTop + window.innerHeight);
  const leftParallax = Math.min(0, -50 + relativeScroll * 0.08);
  const rightParallax = Math.min(0, -50 + relativeScroll * 0.08);

  /** Highlight cards data - key strengths displayed as cards */
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and efficient code that stands the test of time"
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant, innovative solutions"
    },
    {
      icon: Rocket,
      title: "Fast Learner",
      description: "Constantly adapting and mastering new technologies and frameworks"
    }
  ];

  return (
    <section 
      id="about" 
      className="py-20 px-4 overflow-hidden" 
      ref={sectionRef}
    >
      <div 
        ref={ref}
        className={cn(
          "max-w-6xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Bio Paragraphs with horizontal parallax from left */}
          <div 
            className={cn(
              "space-y-6 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              transform: isVisible ? `translateX(${leftParallax}px)` : 'translateX(-50px)',
            }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a Cloud Engineering student specializing in AWS, Azure, and GCP. With hands-on 
              experience in Docker, Kubernetes, Terraform, and CI/CD pipelines, I'm passionate 
              about building scalable infrastructure solutions and automation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently pursuing cloud certifications while gaining practical DevOps experience, 
              I seek opportunities to contribute my technical skills to innovative cloud projects 
              and grow as a cloud professional. Every challenge is an opportunity to learn and 
              create impactful solutions.
            </p>
          </div>

          {/* Highlight Cards with horizontal parallax from right */}
          <div 
            className={cn(
              "grid gap-6 transition-all duration-700",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              transform: isVisible ? `translateX(${-rightParallax}px)` : 'translateX(50px)',
            }}
          >
            {highlights.map((highlight, index) => (
              <Card 
                key={index} 
                className={cn(
                  "p-6 transition-all duration-500 hover:-translate-y-1 bg-card hover-glow-border",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                    <p className="text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
