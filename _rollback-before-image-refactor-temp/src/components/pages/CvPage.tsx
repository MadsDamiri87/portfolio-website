import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Download,
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
  UserRound,
} from "lucide-react";
import profileImage from "../../assets/images/mads-profile-nobg.webp";
import { profile } from "../../data/profile";
import { tagTone } from "../projects/ProjectCard";
import { TechPill } from "../ui/TechPill";

const journeySteps = [
  {
    number: "01",
    period: "Before software",
    title: "People, responsibility and structure",
    subtitle: "Communication first",
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
    subtitle: "Learning the craft",
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
    subtitle: "Building real systems",
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
    subtitle: "Growing with purpose",
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
    subtitle: "Design, code and improve",
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

const documents = [
  { label: "Curriculum Vitae", detail: "Education, projects and experience" },
  { label: "Trainee Profile", detail: "How I can contribute next to the study" },
  { label: "Project Archive", detail: "Selected technical work and case notes" },
];

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
  return (
    <div className="cv-page">
      <section className="cv-hero-page" id="cv">
        <div className="container cv-hero-page__inner">
          <div className="cv-hero-page__content">
            <p className="eyebrow">Curriculum Vitae</p>
            <h1>Software trainee with a fullstack foundation.</h1>
            <p>
              I connect people, ideas and technology. My path into software is driven by
              curiosity, responsibility and a strong interest in building systems that are clear,
              useful and maintainable.
            </p>
            <div className="cv-hero-page__actions">
              <a className="button button--primary" href="#cv-journey">
                <span>View Journey</span>
                <ArrowRight size={18} strokeWidth={1.9} />
              </a>
              <a className="button button--secondary" href="#/contact">
                <span>Contact Me</span>
                <Mail size={18} strokeWidth={1.9} />
              </a>
            </div>
            <div className="cv-hero-page__tags" aria-label="CV highlights">
              <span>VIA Software Engineering</span>
              <span>Open to trainee roles</span>
              <span>Aarhus, Denmark</span>
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
              <span />
              Open to trainee opportunities
            </span>
            <h2>{profile.name}</h2>
            <p>Software engineering student with a people-first background and a practical fullstack direction.</p>

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

            <div className="cv-strengths">
              <p>Core strengths</p>
              {["Communication", "Problem solving", "Ownership", "Continuous learning"].map((item) => (
                <span key={item}>
                  <ShieldCheck size={15} strokeWidth={1.8} />
                  {item}
                </span>
              ))}
            </div>
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
                        <span>
                          <Icon size={22} strokeWidth={1.8} />
                        </span>
                        <div>
                          <h3>{step.title}</h3>
                          <small>{step.subtitle}</small>
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
                <Code2 size={20} strokeWidth={1.8} />
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
              <a className="cv-inline-link" href="https://github.com/MadsDamiri87">
                <GitBranch size={16} strokeWidth={1.8} />
                <span>More on GitHub</span>
                <ArrowRight size={16} strokeWidth={1.8} />
              </a>
            </div>

            <div className="cv-side-panel glass-panel">
              <div className="cv-side-panel__heading">
                <h2>Work Maturity</h2>
                <BriefcaseBusiness size={20} strokeWidth={1.8} />
              </div>
              <div className="cv-maturity-list">
                {maturity.map((item) => (
                  <div className="cv-maturity-row" key={item.label}>
                    <span>{item.label}</span>
                    <DotLevel level={item.level} />
                  </div>
                ))}
              </div>
            </div>

            <div className="cv-side-panel glass-panel">
              <div className="cv-side-panel__heading">
                <h2>Documents</h2>
                <FileText size={20} strokeWidth={1.8} />
              </div>
              <div className="cv-document-list">
                {documents.map((document) => (
                  <a href="#/contact" key={document.label}>
                    <span>
                      <BookOpen size={18} strokeWidth={1.8} />
                    </span>
                    <span>
                      <strong>{document.label}</strong>
                      <small>{document.detail}</small>
                    </span>
                    <Download size={16} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
