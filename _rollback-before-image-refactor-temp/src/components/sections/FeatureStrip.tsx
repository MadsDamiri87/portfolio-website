import { features } from "../../data/profile";

export function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="Portfolio strengths">
      <div className="container feature-strip__grid">
        {features.map(({ title, description, icon: Icon, tone }) => (
          <article className="feature-card" key={title}>
            <div className={`feature-card__icon feature-card__icon--${tone}`}>
              <Icon size={29} strokeWidth={1.8} />
            </div>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
