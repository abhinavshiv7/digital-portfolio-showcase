import { Linkedin } from "lucide-react";

const CodeforcesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-1C2.672 21 2 20.328 2 19.5V9c0-.828.672-1.5 1.5-1.5h1zm7-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-1c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h1zm7 9c.828 0 1.5.672 1.5 1.5v6c0 .828-.672 1.5-1.5 1.5h-1c-.828 0-1.5-.672-1.5-1.5v-6c0-.828.672-1.5 1.5-1.5h1z" />
  </svg>
);

export const Footer = () => {
  const socials = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/abhi-shiv",
      label: "LinkedIn",
    },
    {
      icon: <CodeforcesIcon className="h-5 w-5" />,
      href: "https://codeforces.com/profile/abhinav.shiv7",
      label: "Codeforces",
    },
  ];

  return (
    <footer className="py-8 px-4 border-t border-border/40">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abhinav. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
