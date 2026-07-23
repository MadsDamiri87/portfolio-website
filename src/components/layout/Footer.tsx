import { GitBranch, Mail, Network } from "lucide-react";
import { profile, socialProfiles } from "../../data/profile";

const links = [
  { label: "GitHub", href: socialProfiles.github, icon: GitBranch },
  { label: "LinkedIn", href: socialProfiles.linkedin, icon: Network },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name} - Portfolio and CV.
        </p>
        <div className="footer__contact" aria-label="Contact information">
          <a href={`mailto:${profile.email}`}>Email: {profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>Phone: {profile.phone}</a>
        </div>
        <div className="footer__links">
          {links.map(({ label, href, icon: Icon }) => {
            const isExternal = href.startsWith("http");

            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
