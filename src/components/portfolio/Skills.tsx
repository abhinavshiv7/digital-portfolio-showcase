import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export const Skills = () => {
  const { ref, isVisible } = useScrollReveal();
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
    <section id="skills" className="py-20 px-4" ref={ref}>
      <div className={cn(
        "max-w-6xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex}
              className="p-6 space-y-6 hover:shadow-lg transition-all duration-300 animate-fade-in bg-card"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-primary">{category.category}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
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
