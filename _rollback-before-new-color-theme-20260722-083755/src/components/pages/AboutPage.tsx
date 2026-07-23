import {
  BookOpen,
  Boxes,
  Code2,
} from "lucide-react";
import aboutHeroImage from "../../assets/images/about-hero-bg-warm.webp";

const journeyItems = [
  {
    title: "Curiosity",
    description: "I ask better questions to uncover real problems and meaningful constraints.",
  },
  {
    title: "People",
    description: "I work with thoughtful people and build relationships grounded in trust.",
  },
  {
    title: "Systems",
    description: "I design for clarity and scale, favoring simple models and strong boundaries.",
  },
  {
    title: "Responsibility",
    description: "I take ownership of outcomes and measure success by impact, not activity.",
  },
  {
    title: "Growth",
    description: "I stay curious, keep learning and iterate on myself as much as my work.",
  },
];

const aboutTextPanels = {
  left: {
    title: "Background",
    paragraphs: [
      "I study Software Engineering while working full time and running a psychotherapy practice on the side.",
      "That combination has shaped how I work: structured, curious and used to balancing many moving parts without losing sight of people.",
      "I like understanding systems deeply, whether the system is software, a team, a workflow or a person trying to make sense of complexity.",
    ],
  },
  right: {
    title: "Perspective",
    paragraphs: [
      "My psychotherapy background has trained me to listen carefully, ask sharper questions and understand context before jumping to solutions.",
      "In software, that translates into clear boundaries, readable code and systems that are easier to explain, maintain and improve over time.",
      "I read widely across software, psychology and psychotherapy because I like finding the principles beneath the surface.",
    ],
  },
};

function EnergyOverlay() {
  const paths = [
    { direction: "code-to-books", d: "M 682 286 C 838 276, 1008 294, 1168 372 C 1264 420, 1392 312, 1542 252" },
    { direction: "code-to-books", d: "M 686 342 C 842 326, 1006 326, 1178 398 C 1284 448, 1404 382, 1558 346" },
    { direction: "code-to-books", d: "M 682 322 C 856 312, 1010 336, 1190 410 C 1308 458, 1418 456, 1578 492" },
    { direction: "code-to-books", d: "M 704 392 C 878 366, 1036 354, 1204 418 C 1332 466, 1438 524, 1610 594" },
    { direction: "code-to-books", d: "M 718 504 C 904 452, 1068 404, 1214 424 C 1352 442, 1458 640, 1662 690" },
    { direction: "books-to-code", d: "M 1588 252 C 1440 282, 1332 356, 1202 412 C 1046 480, 874 382, 688 286" },
    { direction: "books-to-code", d: "M 1640 604 C 1472 550, 1350 474, 1212 428 C 1038 370, 902 506, 704 548" },
  ];

  return (
    <svg
      className="about-energy-overlay"
      viewBox="0 0 1773 887"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aboutEnergyGradient" x1="100%" x2="0%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#20c7e7" stopOpacity="0.78" />
          <stop offset="42%" stopColor="#dfefff" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#7f52ff" stopOpacity="0.78" />
        </linearGradient>
        <filter id="aboutEnergyGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map(({ d, direction }, index) => (
        <path
          className={`about-energy-path about-energy-path--${direction}`}
          d={d}
          id={`about-energy-path-${index + 1}`}
          key={d}
        />
      ))}

      {paths.map(({ d, direction }, index) => (
        <circle
          className={`about-energy-signal about-energy-signal--${direction}`}
          key={`${d}-signal`}
          r={direction === "books-to-code" ? 4.2 : 3.2}
        >
          <animateMotion
            begin={`${index * 0.78}s`}
            dur={`${direction === "books-to-code" ? 5.2 + index * 0.28 : 8.4 + index * 0.42}s`}
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href={`#about-energy-path-${index + 1}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

export function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero-page">
        <img className="about-hero-page__image" src={aboutHeroImage} alt="" aria-hidden="true" />
        <EnergyOverlay />
        <div className="about-water-glimmer" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container about-hero-page__inner">
          <div className="about-hero-page__content">
            <p className="eyebrow">About</p>
            <h1>
              I build systems with <span>intent</span>, <span>clarity</span>, and context.
            </h1>
            <p>
              I'm a developer and builder focused on creating software that solves real problems and scales with
              purpose.
            </p>
            <p>I care about structure, simplicity, and the long-term impact of what we ship.</p>
            <div className="about-hero-page__tags" aria-label="Profile highlights">
              <span>
                <Code2 size={16} strokeWidth={1.9} />
                Full-Stack Engineer
              </span>
              <span>
                <Boxes size={16} strokeWidth={1.9} />
                System Thinker
              </span>
              <span>
                <BookOpen size={16} strokeWidth={1.9} />
                Lifelong Learner
              </span>
            </div>
          </div>

        </div>
      </section>

      <section className="about-story-board" aria-label="About Mads Damiri">
        <div className="container about-story-board__inner">
          <aside className="about-side-panel about-side-panel--reading">
            <div className="about-panel-heading">
              <BookOpen size={20} strokeWidth={1.8} />
              <h2>{aboutTextPanels.left.title}</h2>
            </div>
            <div className="about-text-box">
              {aboutTextPanels.left.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </aside>

          <div className="about-journey" aria-label="Personal and technical journey">
            <div className="about-journey__line" />
            {journeyItems.map(({ title, description }, index) => (
              <article className="about-journey-card" key={title}>
                <div className="about-journey-card__node" />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <aside className="about-side-panel about-side-panel--focus">
            <div className="about-panel-heading">
              <Code2 size={20} strokeWidth={1.8} />
              <h2>{aboutTextPanels.right.title}</h2>
            </div>
            <div className="about-text-box">
              {aboutTextPanels.right.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
