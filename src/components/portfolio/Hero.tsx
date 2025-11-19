import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-8 md:px-16 py-8 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
          Abhinav
        </div>
        <button 
          className="text-foreground hover:text-primary transition-colors"
          onClick={() => scrollToSection("contact")}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 md:px-16 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Text Content */}
          <div className="space-y-6 animate-fade-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Abhinav
              </h1>
              <h2 className="text-2xl md:text-3xl font-light text-foreground/80">
                Cloud Engineering Student
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Specializing in Kubernetes, Terraform, and GCP. Building scalable cloud infrastructure solutions with hands-on experience in Docker, CI/CD pipelines, and DevOps practices.
              </p>
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm px-8 py-6 text-base"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
            </Button>
          </div>

          {/* Right Column - Profile Image Placeholder */}
          <div className="flex justify-center md:justify-end animate-fade-in-right">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-border">
                <User className="w-32 h-32 md:w-40 md:h-40 text-muted-foreground/30" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/20 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
