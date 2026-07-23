import { features } from "../../data/profile";

export function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="Portfolio strengths">
      <div className="container feature-strip__grid">
        {features.map(({ title, description }) => (
          <article className="feature-card" key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
