import { GitBranch, Mail, Network } from "lucide-react";
import { profile } from "../../data/profile";

const links = [
  { label: "GitHub", href: "https://github.com/MadsDamiri87", icon: GitBranch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mads-damiri-1a2a94123/", icon: Network },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2026 {profile.name}- Portfolio and CV.</p>
        <div className="footer__contact" aria-label="Contact information">
          <a href={`mailto:${profile.email}`}>Email: {profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>Phone: {profile.phone}</a>
        </div>
        <div className="footer__links">
          {links.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} aria-label={label}>
              <Icon size={18} strokeWidth={1.8} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
