import aboutHeroImage from "../../assets/images/about-hero-desk.webp";

const journeyItems = [
  {
    title: "Curiosity",
    description: "I try to ask good questions to uncover hidden problems and constraints.",
  },
  {
    title: "People",
    description: "I work with people by building relations grounded in authenticity and respect.",
  },
  {
    title: "Systems",
    description: "I build for simplicity and always aim to minimize technical debt",
  },
  {
    title: "Responsibility",
    description: "I take ownership of outcomes and measure success by impact, not activity.",
  },
  {
    title: "Growth",
    description: "It's impossible for me not to be curious. So I keep learning, " +
        "improving and iterating — both on my work and on myself",
  },
];

const aboutTextPanels = {
  left: {
    title: "Background",
    paragraphs: [
      "I study Software Engineering full time while working 30 hours a week at a residential care facility." +
      "I also run a psychotherapy practice on the side where i have about 8 to 12 clients a week.",
      "I've always enjoyed / preferred to have a lot on my plate, because I have a lot of different " +
      "interests and hobbies.",
      "This trait has shaped how I work: structured, curious, intentional and used to balancing many " +
      "moving parts without losing sight of what's important.",
      "I like understanding systems deeply, whether the system is software, a team, a workflow or a person trying to make sense of the world.",
    ],
  },
  right: {
    title: "Perspective",
    paragraphs: [
      "My psychotherapy background has taught me to be aware of where i'm listening from. " +
      "- If i'm listening to reply or listening to understand." +
      " It has helped me to ask sharper questions and understand context before jumping to conclusions or solutions.",
      "In software, that translates into an ability to navigating disagreements and conflicts more constructively." +
      "Better understanding of clients-demands and what they're actually trying to say." +
      "I believe it improves code reviews og technical discussions, because .",
      "I read widely across software, psychology and psychotherapy because I like finding the principles beneath the surface.",
      "I think it also affects the way I approach problems in general. I try not to get too attached " +
      "to my first explanation of why something isn't working. Whether I'm debugging code, discussing " +
      "a technical decision or trying to understand a requirement, I'd rather ask another question " +
      "than confidently solve the wrong problem."

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
              me the satisfaction of building something measurable and useful. I enjoy the process of solving
              problems, creating solutions, and becoming completely immersed in the work.</p>
          </div>
        </div>
      </section>

      <div className="container section-divider" aria-hidden="true" />

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
