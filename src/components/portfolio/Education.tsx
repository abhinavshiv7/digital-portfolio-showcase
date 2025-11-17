import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";

export const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <Card className="p-8 hover:shadow-lg transition-all duration-300 animate-fade-in bg-card">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-primary/10 rounded-lg">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Bachelor of Science in Computer Science</h3>
                <p className="text-primary font-semibold text-lg">University Name</p>
                <p className="text-muted-foreground">Expected Graduation: May 2025</p>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-sm">GPA: 3.8/4.0</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Data Structures & Algorithms",
                    "Web Development",
                    "Database Systems",
                    "Machine Learning",
                    "Software Engineering",
                    "Computer Networks",
                    "Operating Systems",
                    "Artificial Intelligence"
                  ].map((course, index) => (
                    <Badge key={index} variant="outline">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Honors & Awards
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Dean's List - All Semesters</li>
                  <li>• Computer Science Department Scholarship</li>
                  <li>• Winner, University Hackathon 2024</li>
                  <li>• President, Computer Science Student Association</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
