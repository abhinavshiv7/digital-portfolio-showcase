import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState, useCallback } from "react";

export const Projects = () => {
  const { ref, isVisible } = useScrollReveal();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!api) return;
    e.preventDefault();
    
    if (e.deltaX > 0 || e.deltaY > 0) {
      api.scrollNext();
    } else if (e.deltaX < 0 || e.deltaY < 0) {
      api.scrollPrev();
    }
  }, [api]);

  const projects = [
    {
      title: "FitLife Planner & AI Assistant",
      description: "AI-powered health application delivering personalized fitness plans and real-time health tips using Natural Language Processing",
      tags: ["Python", "NLP", "AI/ML", "Health Tech"],
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop",
      github: "https://github.com/abhinavshiv7/FitLife-Planner",
      demo: "https://github.com/abhinavshiv7/FitLife-Planner"
    },
    {
      title: "Smart Directory Manager",
      description: "Python-based automation tool for intelligent file organization with command-line interface for efficient directory management",
      tags: ["Python", "Automation", "CLI", "File Management"],
      image: "https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=800&auto=format&fit=crop",
      github: "https://github.com/abhinavshiv7/Smart_Directory_Manager",
      demo: "https://github.com/abhinavshiv7/Smart_Directory_Manager"
    },
    {
      title: "Cloud Infrastructure Dashboard",
      description: "Real-time monitoring dashboard for cloud resources with automated alerts and cost optimization recommendations",
      tags: ["React", "GCP", "Terraform", "Docker"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      title: "DevOps Pipeline Automation",
      description: "End-to-end CI/CD pipeline with automated testing, security scanning, and multi-environment deployments",
      tags: ["GitHub Actions", "Kubernetes", "AWS", "Jenkins"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
      github: "#",
      demo: "#"
    },
    {
      title: "API Gateway & Microservices",
      description: "Scalable microservices architecture with centralized API gateway, load balancing, and service mesh integration",
      tags: ["Node.js", "Docker", "Kong", "Redis"],
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&auto=format&fit=crop",
      github: "#",
      demo: "#"
    }
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const carouselElement = document.getElementById("projects-carousel");
    if (!carouselElement) return;

    carouselElement.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      carouselElement.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <section id="projects" className="py-20 px-4" ref={ref}>
      <div className={cn(
        "max-w-6xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </div>

        <div id="projects-carousel">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-4/5 lg:basis-3/5">
                  <div className={cn(
                    "transition-all duration-300",
                    current === index ? "scale-100 opacity-100" : "scale-95 opacity-50"
                  )}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-card hover-glow-border">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-4 pt-4">
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                          <Button size="sm" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12" />
            <CarouselNext className="right-0 md:-right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
