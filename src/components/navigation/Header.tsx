import { useEffect, useRef, useState } from "react";
import { FileText, FolderKanban, GitBranch, Home, Mail, Menu, Network, UserRound, X } from "lucide-react";
import mdLogo from "../../assets/images/md-logo.webp";
import { navigation } from "../../data/navigation";
import { profile, socialProfiles } from "../../data/profile";

const socialLinks = [
  { label: "GitHub", href: socialProfiles.github, icon: GitBranch },
  { label: "LinkedIn", href: socialProfiles.linkedin, icon: Network },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

const mobileNavIcons = {
  Home,
  About: UserRound,
  Projects: FolderKanban,
  CV: FileText,
  Contact: Mail,
};

type HeaderProps = {
  activePage: "home" | "about" | "projects" | "cv" | "contact";
};

export function Header({ activePage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const closeMenu = () => setIsMenuOpen(false);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("hashchange", closeMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("hashchange", closeMenu);
    };
  }, [isMenuOpen]);

  const getNavClassName = (label: string) =>
    (activePage === "projects" && label === "Projects") ||
    (activePage === "about" && label === "About") ||
    (activePage === "cv" && label === "CV") ||
    (activePage === "contact" && label === "Contact") ||
    (activePage === "home" && label === "Home")
      ? "is-active"
      : undefined;

  return (
    <header className="header" ref={headerRef}>
      <div className="container header__inner">
        <a className="brand" href="#home" aria-label="Mads Damiri home">
          <span className="brand__mark" aria-hidden="true">
            <img src={mdLogo} alt="" />
          </span>
          <span className="brand__text">
            <strong>{profile.name}</strong>
            <span>{profile.role}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a className={getNavClassName(item.label)} key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <div className="socials" aria-label="Social links">
            {socialLinks.map(({ label, href, icon: Icon }) => {
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

          <a className="button button--primary button--compact" href="#/cv">
            <span>View CV</span>
            <FileText size={16} strokeWidth={1.9} />
          </a>

          <button
            className="icon-button header__menu"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? <X size={21} strokeWidth={1.9} /> : <Menu size={21} strokeWidth={1.9} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav className="mobile-nav is-open" id="mobile-navigation" aria-label="Mobile navigation">
          {navigation.map((item) => {
            const Icon = mobileNavIcons[item.label as keyof typeof mobileNavIcons];

            return (
              <a
                className={getNavClassName(item.label)}
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {Icon ? <Icon size={18} strokeWidth={1.8} /> : null}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
