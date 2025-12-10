import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile-portrait.jpg";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 py-6 md:py-8">
        <ul className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
          {[
            { label: "About", id: "about" },
            { label: "Skills", id: "skills" },
            { label: "Tools", id: "tools" },
            { label: "Certifications", id: "certifications" },
            { label: "Projects", id: "projects" },
            { label: "Education", id: "education" },
            { label: "Contact", id: "contact" },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-sm md:text-base text-foreground/80 hover:text-primary transition-colors font-medium tracking-wide relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

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
              Cloud Engineering student specializing in AWS, Azure, and GCP. Hands-on experience with Docker, Kubernetes, Terraform, and CI/CD pipelines. Pursuing cloud certifications while building scalable infrastructure solutions. Passionate about automation and DevOps practices.
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
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Abhinav - Cloud Engineering Student" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
