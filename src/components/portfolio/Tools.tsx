import { Card } from "@/components/ui/card";
import { Code2, Database, FileCode2, GitBranch, Laptop, Terminal } from "lucide-react";

export const Tools = () => {
  const tools = [
    {
      icon: GitBranch,
      name: "Version Control",
      items: ["Git", "GitHub", "GitLab"]
    },
    {
      icon: Terminal,
      name: "Development",
      items: ["VS Code", "IntelliJ IDEA", "Vim"]
    },
    {
      icon: Database,
      name: "Databases",
      items: ["PostgreSQL", "MongoDB", "Redis"]
    },
    {
      icon: FileCode2,
      name: "Frameworks",
      items: ["React", "Next.js", "Express"]
    },
    {
      icon: Laptop,
      name: "Design",
      items: ["Figma", "Adobe XD", "Canva"]
    },
    {
      icon: Code2,
      name: "Testing",
      items: ["Jest", "Cypress", "Postman"]
    }
  ];

  return (
    <section id="tools" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tools & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            The technologies and tools I work with on a daily basis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in bg-card"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
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
          ))}
        </div>
      </div>
    </section>
  );
};
