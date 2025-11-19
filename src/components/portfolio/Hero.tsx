import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 py-6 md:py-8 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-light text-foreground tracking-wider">
          Abhinav
        </div>
        <button 
          className="text-foreground hover:text-primary transition-colors p-2"
          onClick={() => scrollToSection("contact")}
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-16 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8 pt-20 md:pt-0">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight tracking-tight">
                Abhinav
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground/90 leading-tight">
                Cloud Engineering Student
              </h2>
            </div>

            <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
              I specialize in creating logos, visual identities, mobile apps, websites, social media content, and editorial designs.
            </p>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-sm md:text-base font-normal shadow-none"
              onClick={() => scrollToSection("contact")}
            >
              Get in touch
            </Button>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center md:justify-end items-center">
            <div className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5]">
              <div className="w-full h-full bg-muted/30 flex items-center justify-center overflow-hidden">
                <User className="w-24 h-24 md:w-32 md:h-32 text-muted-foreground/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
