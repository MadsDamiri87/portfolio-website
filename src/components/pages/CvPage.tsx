import { BookOpen, FileText, GraduationCap, Mail, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { preload } from "react-dom";
import cvPdfUrl from "../../../docs/Mads_Damiri_CV_software_trainee_31-07-2026.pdf";
import cvHeroImage from "../../assets/images/cv-hero-me-working.webp";
import cvBgImage from "../../assets/images/cv-bg.webp";
import profileImage from "../../assets/images/mads-profile-nobg.webp";
import { cvOverlayHref } from "../../data/navigation";
import { profile } from "../../data/profile";
import { tagTone, techProjectHref } from "../projects/ProjectCard";
import { PdfOverlay } from "../ui/PdfOverlay";
import { TechPill } from "../ui/TechPill";

// The journey background is a CSS background, so the browser only finds it once
// it styles that section. Asking for it here starts it as the chunk loads.
preload(cvBgImage, { as: "image", fetchPriority: "high" });

const journeySteps = [
  {
    number: "2026",
    period: "Now",
    title: "Building software without leaving the human side behind",
    points: [
      "Studying Software Engineering while working in residential care and running my own psychotherapy practice.",
      "Used to balancing responsibility, deadlines and different kinds of problems.",
      "Bringing curiosity, structure and a strong habit of asking questions before jumping to solutions.",
    ],
    outcome: "A growing technical foundation shaped by real world responsibility, communication and perspective",
  },
  {
    number: "2026 - 2025",
    period: "2025 - 2026",
    title: "From theory to practice",
    points: [
      "Building upon last year. Fullstack learning platform with React, Spring Boot, MongoDB, PostgreSQL and more.",
      "Programming, web development, databases, software design and testing.",
      "Continuing working with OOP, Git, UML, ER models, SCRUM and Unified Process.",
    ],
    outcome: "A solid technical base and a growing design vocabulary.",
  },
  {
    number: "2025",
    period: "2025",
    title: "Software foundation",
    points: [
      "Starting engineering studies in software technology at VIA.",
      "JavaFX desktop application with file persistence and structured UI flows.",
      "Documentation, requirements, domain models and team-based delivery.",
    ],
    outcome: "Projects that connect architecture, implementation and user value.",
  },
  {
    number: "2025 - 2021",
    period: "2021 - 2025",
    title: "Understanding people before systems",
    points: [
      "Practising psychotherapy and coaching while working in residential-care.",
      "Learning communication, conflict resolution, ethics and how " +
      "to work with all kinds of people.",
      "Developing reflection, discipline and responsibility through everyday practice.",
    ],
    outcome: "A reflective mindset that turns feedback and challenges into opportunities for growth.",
  },
  {
    number: "2021 - 2019",
    period: "2019 - 2021",
    title: "Growing through responsibility",
    points: [
      "Taking responsibility as a Senior Consultant and Team-Leader.",
      "Coaching colleagues while balancing performance, teamwork and accountability.",
      "Learning how to lead, guide and motivate others",
    ],
    outcome: "Learning that trust is built by welcoming difficult" +
        " conversations with curiosity, reflection and gratitude.",
  },
  {
    number: "2019 - 2009",
    period: "2009 - 2019",
    title: "Becoming comfortable with discomfort",
    points: [
      "Choosing environments that challenged me socially, personally and professionally.",
      "Balancing education, work, sports and customer orientated roles while pushing myself into a new comfort zone.",
      "Taking action to create competence, which created confidence which created more action",
    ],
    outcome: "Learning who I want to be instead of what I want to do.",
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

const documents = [
  { label: "Curriculum Vitae", detail: "Education, projects and experience", href: cvOverlayHref },
  {
    label: "VIA's Brochure",
    detail: "VIA's explanation of a trainee",
    href: "/brochurer/Ingeni%C3%B8rtrainee%20folder%20-%20virksomhed.pdf",
  },
  {
    label: "MD's Brochure",
    detail: "MD's explanation of a trainee",
    href: "/brochurer/softwareingenioertrainee-brochure-done.pdf",
  },
];

function hashRequestsCv() {
  const [, query = ""] = window.location.hash.split("?");
  return new URLSearchParams(query).get("view") === "cv";
}

export function CvPage() {
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
        <img
          className="cv-hero-page__image"
          src={cvHeroImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        <div className="container cv-hero-page__inner">
          <div className="cv-hero-page__content">
            <h1>Software trainee</h1>
            <p>
              I enjoy working where people, ideas and technology meet. My path into software is
              driven by curiosity, responsibility and a strong interest in building systems
              that are clear, useful and maintainable.
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

      <div className="container section-divider" aria-hidden="true" />

      <section
        className="cv-journey-page"
        id="cv-journey"
        style={{ "--cv-bg": `url(${cvBgImage})` } as React.CSSProperties}
      >
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
              <h2>From human design to software design</h2>
            </div>

            <div className="cv-timeline">
              <span className="cv-timeline__beam" aria-hidden="true" />
              {journeySteps.map((step) => {
                return (
                  <article className="cv-timeline-card" key={step.title}>
                    <div className="cv-timeline-card__node" aria-hidden="true">
                      {step.number.split(/\s*[-–]\s*/).map((line, lineIndex) => (
                        <span key={lineIndex}>{line}</span>
                      ))}
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
                    <span className="cv-timeline-card__connector" />
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
                      {group.items.map((item) => {
                        const isProcess = group.label === "Process";

                        return (
                          <TechPill
                            key={item}
                            href={isProcess ? undefined : techProjectHref(item)}
                            plain={isProcess}
                            tone={cvTechTone(item)}
                          >
                            {item}
                          </TechPill>
                        );
                      })}
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
