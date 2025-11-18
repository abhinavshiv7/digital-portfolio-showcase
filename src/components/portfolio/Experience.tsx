import { Card } from "@/components/ui/card";
import { Award, Trophy } from "lucide-react";

export const Experience = () => {
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
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications & Achievements</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-left bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <exp.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>

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
