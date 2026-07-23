import { Download } from "lucide-react";
import { experience } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { SectionHeading } from "../ui/SectionHeading";

export function CvSection() {
  return (
    <section className="section cv-section" id="cv">
      <div className="container cv-section__grid">
        <div>
          <SectionHeading eyebrow="CV" title="Focused on fullstack foundations" />
          <p className="section-copy">
            A compact CV snapshot for the website. The downloadable PDF can be
            connected here when the final CV file is ready.
          </p>
          <ButtonLink href="#contact" variant="primary" icon={Download}>
            Request CV
          </ButtonLink>
        </div>

        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline__item" key={`${item.period}-${item.title}`}>
              <span>{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
