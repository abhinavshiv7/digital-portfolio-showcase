/**
 * Education.tsx - Education Section Component
 * 
 * Displays academic background with:
 * - University and degree information
 * - Relevant coursework as badges
 * - Academic focus areas
 * - Scroll-reveal animation on viewport entry
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/components/ui/badge: Badge component for coursework
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
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
import { cn } from "@/lib/utils";

export const Education = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="education" className="py-20 px-4" ref={ref}>
      <div className={cn(
        "max-w-4xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        {/* Education Card */}
        <Card className="p-8 transition-all duration-300 animate-fade-in bg-card hover-glow-border">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Graduation Icon */}
            <div className="flex-shrink-0">
              <div className="p-4 bg-primary/10 rounded-lg">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              {/* Degree Information */}
              <div>
                <h3 className="text-2xl font-bold mb-2">Bachelor of Technology in Computer Science & Engineering</h3>
                <p className="text-primary font-semibold text-lg">Lovely Professional University</p>
                <p className="text-muted-foreground">Expected Graduation: July 2027</p>
                <p className="text-muted-foreground mt-1">Specialization: Cloud Engineering</p>
              </div>

              {/* Relevant Coursework */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Cloud Computing",
                    "Data Structures & Algorithms",
                    "Database Systems",
                    "Operating Systems",
                    "Computer Networks",
                    "Software Engineering",
                    "Web Development",
                    "Machine Learning"
                  ].map((course, index) => (
                    <Badge key={index} variant="outline">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Academic Focus */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Academic Focus
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Specializing in Cloud Engineering & DevOps</li>
                  <li>• Active participant in cloud computing workshops</li>
                  <li>• Building hands-on experience with container orchestration</li>
                  <li>• Pursuing advanced cloud certifications</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
