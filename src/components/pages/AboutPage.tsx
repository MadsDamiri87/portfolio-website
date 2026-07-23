import aboutHeroImage from "../../assets/images/about-hero-desk.webp";

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
      "I like understanding systems deeply, whether the system is software, a team, a workflow or a person trying to make sense of the world.",
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

export function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero-page">
        <img
          className="about-hero-page__image"
          src={aboutHeroImage}
          alt="My desk: two monitors running code and this portfolio, a laptop, and a whiteboard of system sketches behind it"
          decoding="async"
        />
        <div className="container about-hero-page__inner">
          <div className="about-hero-page__content">
            <h1>
              Why software engineering?
            </h1>
            <p>
              In contrast to my work as a therapist, there are specific and concrete solutions to
              problems in software. I enjoy finding or creating solutions to problems, and to be
              able to measure the success of these solutions. This is possible in this logical themed
              kind of work, opposed to working with people, where measuring success is more abstract and complex.
            </p>
            <p>Working with people gives me a sense of purpose, while working with software gives
              me the satisfaction of building something meaningful. I enjoy the process of solving
              problems, creating solutions, and becoming completely immersed in the work.</p>
          </div>
        </div>
      </section>

      <section className="about-story-board" aria-label="About Mads Damiri">
        <div className="container about-story-board__inner">
          <aside className="about-side-panel about-side-panel--reading">
            <div className="about-panel-heading">
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
    </div>
  );
}
