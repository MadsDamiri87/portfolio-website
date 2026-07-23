import { GitBranch, Mail, Network } from "lucide-react";
import { profile } from "../../data/profile";

const contactLinks = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", value: "github.com", href: "https://github.com/MadsDamiri87", icon: GitBranch },
  { label: "LinkedIn", value: "linkedin.com", href: "https://www.linkedin.com/in/mads-damiri-1a2a94123/", icon: Network },
];

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-section__inner">
        <div>
          <h2>Lets build something solid.</h2>
          <p>
            I am interested in projects, internships and collaborations
            where good structure and user experience matter.
          </p>
        </div>
        <div className="contact-links">
          {contactLinks.map(({ label, value, href, icon: Icon }) => (
            <a key={label} href={href}>
              <Icon size={21} strokeWidth={1.8} />
              <span>
                <strong>{label}</strong>
                <small>{value}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
