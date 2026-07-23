import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FileText,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
// The PDF lives in docs/, which is not served as-is — importing it lets Vite
// emit it as a build asset and hand back the URL it ends up on.
import cvPdfUrl from "../../../docs/Mads Damiri - CV - software trainee 01-07-2026.pdf";
import cvHeroImage from "../../assets/images/cv-hero-bg.webp";
import profileImage from "../../assets/images/mads-profile-nobg.webp";
import { profile, socialProfiles } from "../../data/profile";
import { tagTone } from "../projects/ProjectCard";
import { PdfOverlay } from "../ui/PdfOverlay";
import { TechPill } from "../ui/TechPill";

const journeySteps = [
  {
    number: "01",
    period: "Before software",
    title: "People, responsibility and structure",
    icon: HeartHandshake,
    tone: "cyan",
    points: [
      "Years of practical work with people, trust and responsibility.",
      "A calm way of collaborating, listening and following through.",
      "A strong sense for clear communication before technical decisions.",
    ],
    outcome: "Human perspective, ownership and patience under pressure.",
  },
  {
    number: "02",
    period: "2025 - 2026",
    title: "Software foundation",
    icon: GraduationCap,
    tone: "blue",
    points: [
      "Diploma engineering studies in software technology at VIA.",
      "Programming, web development, databases, software design and testing.",
      "Working with OOP, Git, UML, ER models, SCRUM and Unified Process.",
    ],
    outcome: "A solid technical base and a growing design vocabulary.",
  },
  {
    number: "03",
    period: "Projects",
    title: "From theory to practice",
    icon: Rocket,
    tone: "violet",
    points: [
      "Fullstack learning platform with React, Spring Boot and PostgreSQL.",
      "JavaFX desktop application with file persistence and structured UI flows.",
      "Documentation, requirements, domain models and team-based delivery.",
    ],
    outcome: "Projects that connect architecture, implementation and user value.",
  },
  {
    number: "04",
    period: "Now",
    title: "Trainee direction",
    icon: Target,
    tone: "blue",
    points: [
      "Looking for a trainee or student developer role next to the study.",
      "Interested in backend, data modelling, fullstack systems and quality.",
      "Motivated by feedback, domain knowledge and real business constraints.",
    ],
    outcome: "Ready to contribute, learn fast and become useful in a team.",
  },
  {
    number: "05",
    period: "Next step",
    title: "Impact as a software engineer",
    icon: Sparkles,
    tone: "amber",
    points: [
      "Build maintainable software that solves concrete problems.",
      "Keep strengthening fundamentals across architecture, tests and delivery.",
      "Grow into a developer who creates value for users and the business.",
    ],
    outcome: "A long-term path toward thoughtful, reliable software engineering.",
  },
];

const techGroups = [
  { label: "Languages", items: ["Java", "JavaScript", "TypeScript", "SQL"] },
  { label: "Frontend", items: ["React", "HTML", "CSS", "Vite"] },
  { label: "Backend & Data", items: ["Spring Boot", "PostgreSQL", "REST APIs", "JPA"] },
  { label: "Process", items: ["Git", "SCRUM", "UP", "UML", "Testing"] },
];

const cvTechToneOverrides: Partial<Record<string, ReturnType<typeof tagTone>>> = {
  "REST APIs": "green",
  Git: "blue",
  SCRUM: "violet",
  UP: "amber",
  UML: "blue",
};

function cvTechTone(item: string) {
  return cvTechToneOverrides[item] ?? tagTone(item);
}

const maturity = [
  { label: "Technical skills", level: 6 },
  { label: "Problem solving", level: 7 },
  { label: "Communication", level: 8 },
  { label: "Responsibility", level: 8 },
  { label: "Learning agility", level: 9 },
];

// Anything that should open the CV overlay links here; the query survives the
// route match in App.tsx, which strips it before comparing paths.
export const cvOverlayHref = "#/cv?view=cv";

const documents = [
  { label: "Curriculum Vitae", detail: "Education, projects and experience", href: cvOverlayHref },
  { label: "Trainee Profile", detail: "How I can contribute next to the study", href: "#/contact" },
  { label: "Project Archive", detail: "Selected technical work and case notes", href: "#/projects" },
];

function hashRequestsCv() {
  const [, query = ""] = window.location.hash.split("?");
  return new URLSearchParams(query).get("view") === "cv";
}

function DotLevel({ level }: { level: number }) {
  return (
    <span className="cv-dot-level" aria-label={`${level} out of 10`}>
      {Array.from({ length: 10 }, (_, index) => (
        <span className={index < level ? "is-filled" : undefined} key={index} />
      ))}
    </span>
  );
}

export function CvPage() {
  // Opens on mount when the header sent us here with ?view=cv, and on later
  // hash changes so the header button works while already on this page.
  const [isCvOpen, setIsCvOpen] = useState(hashRequestsCv);

  useEffect(() => {
    const syncFromHash = () => {
      if (hashRequestsCv()) setIsCvOpen(true);
    };

    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const closeCv = () => {
    setIsCvOpen(false);

    // Drop the query so a reload does not reopen it. replaceState does not fire
    // hashchange, so the route stays put.
    if (hashRequestsCv()) {
      window.history.replaceState(null, "", "#/cv");
    }
  };

  const openCv = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsCvOpen(true);
  };

  return (
    <div className="cv-page">
      <section className="cv-hero-page" id="cv">
        <img className="cv-hero-page__image" src={cvHeroImage} alt="" aria-hidden="true" />
        <div className="container cv-hero-page__inner">
          <div className="cv-hero-page__content">
            <h1>Software trainee</h1>
            <p>
              I connect people, ideas and technology. My path into software is driven by
              curiosity, responsibility and a strong interest in building systems that are clear,
              useful and maintainable.
            </p>

            <div className="cv-hero-page__tags" aria-label="CV highlights">
              <span>VIA Software Engineering</span>
              <span>Open to trainee roles</span>
              <span>Aarhus, Denmark</span>
            </div>
            <div className="cv-hero-page__actions">
              <a className="button button--secondary" href="#/contact">
                <span>Contact Me</span>
                <Mail size={18} strokeWidth={1.9} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-journey-page" id="cv-journey">
        <div className="container cv-journey-page__inner">
          <aside className="cv-profile-panel glass-panel" aria-label="CV profile">
            <div className="cv-profile-panel__image">
              <img src={profileImage} alt="Mads Damiri" />
            </div>
            <span className="cv-status">
             Open to trainee opportunities
            </span>
            <h2>{profile.name}</h2>
            <p>Software engineering student with a people-focused background and a practical direction.</p>

            <div className="cv-profile-facts">
              <span>
                <MapPin size={16} strokeWidth={1.8} />
                Aarhus, Denmark
              </span>
              <span>
                <GraduationCap size={16} strokeWidth={1.8} />
                VIA University College
              </span>
              <span>
                <Mail size={16} strokeWidth={1.8} />
                {profile.email}
              </span>
            </div>

            <a className="button button--primary cv-profile-panel__cta" href={cvOverlayHref} onClick={openCv}>
              <FileText aria-hidden="true" size={17} strokeWidth={1.9} />
              <span>View CV</span>
            </a>
          </aside>

          <div className="cv-journey-map" aria-label="Journey timeline">
            <div className="cv-journey-map__header">
              <p className="eyebrow">Journey Timeline</p>
              <h2>From human insight to software craft.</h2>
            </div>

            <div className="cv-timeline">
              <span className="cv-timeline__beam" aria-hidden="true" />
              {journeySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article className={`cv-timeline-card cv-timeline-card--${step.tone}`} key={step.number}>
                    <div className="cv-timeline-card__node" aria-hidden="true">
                      {step.number}
                    </div>
                    <div className="cv-timeline-card__period">{step.period}</div>
                    <div className="cv-timeline-card__body">
                      <div className="cv-timeline-card__title">
                        <div>
                          <h3>{step.title}</h3>
                        </div>
                      </div>
                      <ul>
                        {step.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                      <div className="cv-timeline-card__outcome">
                        <strong>Outcome</strong>
                        <p>{step.outcome}</p>
                      </div>
                    </div>
                    {index < journeySteps.length - 1 ? <span className="cv-timeline-card__connector" /> : null}
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="cv-side-stack" aria-label="Technical stack and documents">
            <div className="cv-side-panel glass-panel">
              <div className="cv-side-panel__heading">
                <h2>Technical Stack</h2>
              </div>
              <div className="cv-tech-list">
                {techGroups.map((group) => (
                  <div className="cv-tech-group" key={group.label}>
                    <p>{group.label}</p>
                    <div>
                      {group.items.map((item) => (
                        <TechPill key={item} tone={cvTechTone(item)}>
                          {item}
                        </TechPill>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cv-side-panel glass-panel">
              <div className="cv-side-panel__heading">
                <h2>Documents</h2>
              </div>
              <div className="cv-document-list">
                {documents.map((document) => (
                  <a href={document.href} key={document.label}>
                    <span>
                      <BookOpen size={18} strokeWidth={1.8} />
                    </span>
                    <span>
                      <strong>{document.label}</strong>
                      <small>{document.detail}</small>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {isCvOpen ? (
        <PdfOverlay
          src={cvPdfUrl}
          title="Curriculum Vitae"
          downloadName="Mads Damiri - CV.pdf"
          onClose={closeCv}
        />
      ) : null}
    </div>
  );
}
