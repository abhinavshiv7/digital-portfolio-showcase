/**
 * Contact.tsx - Contact Section Component
 * 
 * Displays contact form and information with:
 * - Contact form with validation (name, email, company, WhatsApp, message)
 * - Form submission to Supabase edge function
 * - Contact info cards (email, WhatsApp, location)
 * - Scroll-reveal animation on viewport entry
 * 
 * Form Validation:
 * - Name: 2-100 characters (required)
 * - Email: Valid email, max 255 characters (required)
 * - Company: Max 100 characters (optional)
 * - WhatsApp: Max 20 characters (optional)
 * - Message: Max 1000 characters (optional)
 * 
 * Dependencies:
 * - @/components/ui/card: Styled card component
 * - @/components/ui/input: Input field component
 * - @/components/ui/textarea: Textarea component
 * - @/components/ui/button: Button component
 * - @/components/ui/label: Form label component
 * - @/hooks/use-toast: Toast notification hook
 * - @/hooks/use-scroll-reveal: Intersection Observer hook for animations
 * - @/integrations/supabase/client: Supabase client for edge function calls
 * - zod: Form validation schema
 * - lucide-react: Icons (Mail, MapPin, Phone, Send)
 * 
 * @component
 * @file src/components/portfolio/Contact.tsx
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { z } from "zod";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

/** Zod schema for contact form validation */
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().max(100).optional(),
  whatsapp: z.string().max(20).optional(),
  message: z.string().max(1000).optional(),
});

export const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  
  /** Form field values */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    whatsapp: "",
    message: "",
  });
  
  /** Form submission loading state */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  /**
   * Handles form submission
   * Validates data and sends to edge function for processing
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      const { error } = await supabase.functions.invoke("send-contact-confirmation", {
        body: validated,
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully! ✨",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        whatsapp: "",
        message: "",
      });
    } catch (error: unknown) {
      console.error("Contact form error:", error);
      const errorMessage = error instanceof Error ? error.message : "Please try again later.";
      toast({
        title: "Error sending message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Opens WhatsApp with pre-filled message */
  const handleWhatsAppClick = () => {
    const phone = "919341494320";
    const message = encodeURIComponent("Hi Abhinav! I found your portfolio and would like to connect.");
    window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="py-20 px-4" ref={ref}>
      <div className={cn(
        "max-w-6xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8 animate-fade-in-left">
            <Card className="p-6 bg-card hover-glow-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                  />
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    maxLength={100}
                  />
                </div>

                {/* WhatsApp Field */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
                  <Input
                    id="whatsapp"
                    placeholder="+1 234 567 8900"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    maxLength={20}
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    maxLength={1000}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information Cards */}
          <div className="space-y-6 animate-fade-in-right">
            {/* Email Card */}
            <Card className="p-6 bg-card hover-glow-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <a href="mailto:abhinav.shiv7@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    abhinav.shiv7@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            {/* WhatsApp Card */}
            <Card className="p-6 bg-card hover-glow-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Click to message on WhatsApp
                  </button>
                </div>
              </div>
            </Card>

            {/* Location Card */}
            <Card className="p-6 bg-card hover-glow-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Phagwara, Punjab, India
                  </p>
                </div>
              </div>
            </Card>

            {/* Call-to-Action Card */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 hover-glow-border">
              <h3 className="font-bold text-xl mb-4">Let's Build Something Amazing Together!</h3>
              <p className="text-muted-foreground">
                Whether you have a project in mind, need technical consultation, or just want to 
                discuss technology, I'm always excited to connect with fellow developers and 
                potential collaborators.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
