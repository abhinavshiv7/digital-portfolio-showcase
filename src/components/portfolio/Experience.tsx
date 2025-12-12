/**
 * Experience.tsx - Certifications & Achievements Section Component
 * 
 * Displays professional certifications and achievements with:
 * - Category cards with icons
 * - List of certifications and accomplishments
 * - Hover animations and glow effects
 * - Scroll-reveal animation on viewport entry
 * 
 * Note: This section is mapped to id="experience" for navigation
 * but displays as "Certifications & Achievements" in the UI.
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
 * - @/lib/utils: Utility functions (cn for classname merging)
 * - lucide-react: Category icons (Award, Trophy)
 * 
 * @component
 * @file src/components/portfolio/Experience.tsx
 */

import { Card } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export const Experience = () => {
  const { ref, isVisible } = useScrollReveal();

  /** Certifications and achievements organized by category */
  const experiences = [
    {
      title: "Cloud Certifications",
      company: "Professional Development",
      icon: Award,
      achievements: [
        "Google Cloud Associate Cloud Engineer (GCP ACE)",
        "Certified Kubernetes Administrator (CKA)",
        "Certified Kubernetes Application Developer (CKAD)",
        "AWS Cloud Practitioner",
        "Docker Essentials",
        "Cybersecurity Essentials"
      ]
    },
    {
      title: "Achievements & Recognition",
      company: "Competitions & Programs",
      icon: Trophy,
      achievements: [
        "Google STEP Intern 2025 - Selected for Google's prestigious internship program",
        "UiPath Student Developer Champion - Recognized for automation excellence",
        "Placed 46 at Global Rank in competitive programming",
        "NPTEL Cloud Computing Week 12 - Top performer in advanced cloud computing course"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4" ref={ref}>
      <div className={cn(
        "max-w-4xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Achievements</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="p-6 transition-all duration-300 animate-fade-in-left bg-card hover-glow-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Category Icon */}
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <exp.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                {/* Category Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>

                  {/* Achievements List */}
                  <div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-muted-foreground">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
