/**
 * Hero.tsx - Main Landing Section Component with Parallax Animation
 * 
 * This component renders the hero section with:
 * - Responsive navigation bar (desktop horizontal / mobile hamburger menu)
 * - Personal introduction with name and title
 * - Profile image with parallax scroll effect
 * - Call-to-action button
 * - Scroll-driven animations for text and image
 * 
 * Navigation automatically switches to hamburger menu when items wrap to
 * multiple lines (detected via scroll height comparison).
 * 
 * Dependencies:
 * - @/components/ui/button: Styled button component
 * - @/components/ui/sheet: Slide-out menu for mobile navigation
 * - @/assets/profile-portrait.jpg: Profile image asset
 * - @/hooks/use-parallax-scroll: Parallax scroll effect hook
 * 
 * @component
 * @file src/components/portfolio/Hero.tsx
 */

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import profileImage from "@/assets/profile-portrait2.jpg";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useParallaxScroll } from "@/hooks/use-parallax-scroll";

export const Hero = () => {
  /** Controls mobile menu open/close state */
  const [isOpen, setIsOpen] = useState(false);
  /** Determines if hamburger menu should be shown (when nav items wrap) */
  const [useHamburger, setUseHamburger] = useState(false);
  /** Reference to navigation list for overflow detection */
  const navRef = useRef<HTMLUListElement>(null);
  /** Reference to navigation container element */
  const containerRef = useRef<HTMLElement>(null);
  /** Parallax scroll hook for scroll-driven animations */
  const { scrollY } = useParallaxScroll();

  /**
   * Smoothly scrolls to a section by ID
   * Closes mobile menu first with delay to ensure proper scroll behavior
   */
  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.pointerEvents = '';
      
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }, 350);
  };

  /** Navigation items in display order matching section order on page */
  const navItems = [
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Tools", id: "tools" },
    { label: "Certifications", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Contact", id: "contact" },
  ];

  /** Detects if navigation items wrap to multiple lines and switches to hamburger menu */
  useEffect(() => {
    const checkOverflow = () => {
      if (navRef.current) {
        const navElement = navRef.current;
        const isWrapping = navElement.scrollHeight > navElement.clientHeight + 10;
        setUseHamburger(isWrapping);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  /** Calculate parallax transforms based on scroll position */
  const textParallax = scrollY * 0.3;
  const imageParallax = scrollY * 0.15;
  const navOpacity = Math.max(0, 1 - scrollY / 300);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Top Navigation Bar with fade on scroll */}
      <nav 
        ref={containerRef} 
        className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 py-6 md:py-8 transition-opacity duration-300"
        style={{ opacity: navOpacity }}
      >
        {/* Desktop Navigation - hidden when hamburger is needed */}
        <ul 
          ref={navRef}
          className={`flex justify-center items-center gap-6 md:gap-10 flex-wrap max-h-8 overflow-hidden ${useHamburger ? 'invisible absolute' : ''}`}
        >
          {navItems.map((item, index) => (
            <li 
              key={item.id}
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-sm md:text-base text-foreground/80 hover:text-primary transition-colors font-medium tracking-wide relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left whitespace-nowrap"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Navigation - shown when items don't fit in one line */}
        {useHamburger && (
          <div className="flex justify-start">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-foreground hover:text-primary transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-background border-border">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="mt-8">
                  <ul className="space-y-4">
                    {navItems.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            scrollToSection(item.id);
                          }}
                          className="text-lg text-foreground/80 hover:text-primary transition-colors font-medium tracking-wide w-full text-left py-2"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </nav>

      {/* Main Hero Content with Parallax */}
      <div className="px-6 md:px-12 lg:px-16 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left Column - Text Content with Parallax */}
          <div 
            className="space-y-6 md:space-y-8 pt-20 md:pt-0"
            style={{ transform: `translateY(${textParallax}px)` }}
          >
            <div className="space-y-3 md:space-y-4 overflow-hidden">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight tracking-tight opacity-0 animate-text-reveal"
                style={{ animationDelay: "0.2s" }}
              >
                Abhinav
              </h1>
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground/90 leading-tight opacity-0 animate-text-reveal"
                style={{ animationDelay: "0.4s" }}
              >
                Cloud Engineering Student
              </h2>
            </div>

            <p 
              className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed opacity-0 animate-slide-in-left"
              style={{ animationDelay: "0.6s" }}
            >
              Cloud Engineering student specializing in AWS, Azure, and GCP. Hands-on experience with Docker, Kubernetes, Terraform, and CI/CD pipelines. Pursuing cloud certifications while building scalable infrastructure solutions. Passionate about automation and DevOps practices.
            </p>

            <div className="opacity-0 animate-slide-in-up" style={{ animationDelay: "0.8s" }}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 py-6 text-sm md:text-base font-normal shadow-none"
                onClick={() => scrollToSection("contact")}
              >
                Get in touch
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Image with Parallax */}
          <div 
            className="flex justify-center md:justify-end items-center"
            style={{ transform: `translateY(${-imageParallax}px)` }}
          >
            <div 
              className="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] opacity-0 animate-slide-in-right"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-full h-full overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Abhinav - Cloud Engineering Student" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
        style={{ 
          animationDelay: "1.2s",
          opacity: Math.max(0, 1 - scrollY / 200)
        }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-float" />
        </div>
      </div>
    </section>
  );
};
