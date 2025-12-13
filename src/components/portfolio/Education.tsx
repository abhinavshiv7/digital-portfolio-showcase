/**
 * Education.tsx - Education Section Component with Parallax
 * 
 * Displays academic background with:
 * - University and degree information
 * - Relevant coursework as badges
 * - Academic focus areas
 * - Scroll-reveal animation on viewport entry
 * - Staggered reveal for content sections
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/components/ui/badge: Badge component for coursework
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
 * - @/hooks/use-parallax-scroll: Parallax scroll effect hook
 * - @/lib/utils: Utility functions (cn for classname merging)
 * - lucide-react: Icons (GraduationCap, Award)
 * 
 * @component
 * @file src/components/portfolio/Education.tsx
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

export const Education = () => {
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
  const cardParallax = Math.min(0, -20 + relativeScroll * 0.04);

  /** Relevant coursework list */
  const courses = [
    "Cloud Computing",
    "Data Structures & Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Web Development",
    "Machine Learning"
  ];

  return (
    <section id="education" className="py-20 px-4 overflow-hidden" ref={sectionRef}>
      <div 
        ref={ref}
        className={cn(
          "max-w-4xl mx-auto transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Section Header */}
        <div 
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Education Card with parallax */}
        <Card 
          className={cn(
            "p-8 transition-all duration-700 bg-card hover-glow-border",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{ 
            transform: isVisible ? `translateY(${cardParallax}px) scale(1)` : 'translateY(20px) scale(0.95)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Graduation Icon */}
            <div 
              className={cn(
                "flex-shrink-0 transition-all duration-500",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              )}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="p-4 bg-primary/10 rounded-lg">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              {/* Degree Information */}
              <div 
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: '0.3s' }}
              >
                <h3 className="text-2xl font-bold mb-2">Bachelor of Technology in Computer Science & Engineering</h3>
                <p className="text-primary font-semibold text-lg">Lovely Professional University</p>
                <p className="text-muted-foreground">Expected Graduation: July 2027</p>
                <p className="text-muted-foreground mt-1">Specialization: Cloud Engineering</p>
              </div>

              {/* Relevant Coursework */}
              <div 
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: '0.4s' }}
              >
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {courses.map((course, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className={cn(
                        "transition-all duration-300",
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                      )}
                      style={{ transitionDelay: isVisible ? `${0.5 + (index * 0.05)}s` : '0s' }}
                    >
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Academic Focus */}
              <div 
                className={cn(
                  "transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: '0.6s' }}
              >
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Academic Focus
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    "Specializing in Cloud Engineering & DevOps",
                    "Active participant in cloud computing workshops",
                    "Building hands-on experience with container orchestration",
                    "Pursuing advanced cloud certifications"
                  ].map((item, index) => (
                    <li 
                      key={index}
                      className={cn(
                        "transition-all duration-300",
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                      )}
                      style={{ transitionDelay: isVisible ? `${0.7 + (index * 0.1)}s` : '0s' }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
