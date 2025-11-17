import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Skills = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "JavaScript/TypeScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "C++", level: 75 }
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "React/Next.js", level: 92 },
        { name: "Node.js", level: 88 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 }
      ]
    },
    {
      category: "Database & Backend",
      skills: [
        { name: "SQL/PostgreSQL", level: 82 },
        { name: "MongoDB", level: 80 },
        { name: "Firebase", level: 85 },
        { name: "REST APIs", level: 88 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
