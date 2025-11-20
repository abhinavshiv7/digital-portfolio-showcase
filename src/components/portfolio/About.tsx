import { Card } from "@/components/ui/card";
import { Code2, Lightbulb, Rocket } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

export const About = () => {
  const { ref, isVisible } = useScrollReveal();
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
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className={cn(
        "max-w-6xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="space-y-6 animate-fade-in-left">
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
