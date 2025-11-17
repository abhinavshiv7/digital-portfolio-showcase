import { Card } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Software Development Intern",
      company: "Tech Innovations Inc.",
      period: "Jun 2024 - Aug 2024",
      description: "Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality features.",
      achievements: [
        "Improved application performance by 40%",
        "Implemented new features used by 10,000+ users",
        "Participated in code reviews and agile ceremonies"
      ]
    },
    {
      title: "Research Assistant",
      company: "University Computer Science Lab",
      period: "Jan 2024 - May 2024",
      description: "Conducted research on machine learning algorithms and their applications in natural language processing.",
      achievements: [
        "Co-authored research paper on NLP techniques",
        "Developed ML models with 85% accuracy",
        "Presented findings at student research symposium"
      ]
    },
    {
      title: "Web Development Volunteer",
      company: "Local Non-Profit Organization",
      period: "Sep 2023 - Dec 2023",
      description: "Built and deployed a responsive website to increase community engagement and donations.",
      achievements: [
        "Increased online donations by 60%",
        "Improved user engagement metrics by 45%",
        "Trained staff on website management"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 animate-fade-in-left bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{exp.description}</p>

                  <div>
                    <p className="font-semibold mb-2">Key Achievements:</p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-muted-foreground text-sm">
                          • {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
