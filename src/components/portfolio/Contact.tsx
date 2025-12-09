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


const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().max(100).optional(),
  whatsapp: z.string().max(20).optional(),
  message: z.string().max(1000).optional(),
});

export const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    whatsapp: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validated = contactSchema.parse(formData);

      // Call edge function
      const { data, error } = await supabase.functions.invoke("send-contact-confirmation", {
        body: validated,
      });

      if (error) throw error;

      toast({
        title: "Message sent successfully! ✨",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        whatsapp: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phone = "919341494320";
    const message = encodeURIComponent("Hi Abhinav! I found your portfolio and would like to connect.");
    window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank");
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-4 bg-gradient-to-b from-background via-card/30 to-muted/20" 
      ref={ref}
    >
      <div className={cn(
        "max-w-6xl mx-auto transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in-left">
            <Card className="p-6 bg-card">
              <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-6 animate-fade-in-right">
            <Card className="p-6 bg-card hover:shadow-lg transition-all">
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

            <Card className="p-6 bg-card hover:shadow-lg transition-all">
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

            <Card className="p-6 bg-card hover:shadow-lg transition-all">
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

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
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
