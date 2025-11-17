import { Card } from "@/components/ui/card";
import { Code2, Lightbulb, Rocket } from "lucide-react";

export const About = () => {
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
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6 animate-fade-in-left">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Computer Science student dedicated to crafting innovative solutions 
              that make a real-world impact. My journey in technology is driven by curiosity and 
              a commitment to continuous learning.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a strong foundation in software development and a keen interest in emerging 
              technologies, I strive to bridge the gap between theory and practical application. 
              Every project is an opportunity to push boundaries and create something meaningful.
            </p>
          </div>

          <div className="grid gap-6 animate-fade-in-right">
            {highlights.map((highlight, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
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
