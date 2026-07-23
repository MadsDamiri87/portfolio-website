import { Download } from "lucide-react";
import { experience } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { SectionHeading } from "../ui/SectionHeading";

export function CvSection() {
  return (
    <section className="section cv-section" id="cv">
      <div className="container cv-section__grid">
        <div className="cv-section__content">
          <SectionHeading title="Trainee Applicant" />
          <p className="section-copy">
            I'm currently searching for opportunities to work as a trainee. Preferably for a company
            that is well established and has assignments that hopefully will be so far out of my
            comfort-zone that it will force me to grow faster and
            further into my coming profession as a passionate programmer.
          </p>
          <p>
            There are still some companies that does not quite know, what this trainee concept
            revolves around. So to make it easy to understand, it is basically the same
            as a student-worker but with more flexibility and availability compared to the average
            student worker. Basically student-workers has their job on the side, as they complete their
            education, while trainees has their education on the side, while they work for the company
          </p>
          <p>
            If you want to know further about this, I have the official brochure from VIA University College
            for you to download right below. - Also i have added my own copy which, after my opinion
            explains the concept further, and it includes what kind of technologies we learn on
            the first 3 semesters, to provide with a better picture of what we are capable of on which
            stage. Happy reading
          </p>
          <div className="cv-section__actions">
            <ButtonLink href="/brochurer/Ingeni%C3%B8rtrainee%20folder%20-%20virksomhed.pdf" variant="primary" icon={Download}>
              View VIA's Brochure
            </ButtonLink>
            <ButtonLink href="/brochurer/softwareingenioertrainee-brochure-done.pdf" variant="primary" icon={Download}>
              View MD's Brochure
            </ButtonLink>
          </div>
        </div>

        <div className="timeline timeline--centered">
          {experience.map((item) => (
            <article className="timeline__item" key={`${item.title}`}>
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
