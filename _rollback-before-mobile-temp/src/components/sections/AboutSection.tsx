import { ArrowRight, HeartHandshake } from "lucide-react";
import { skills } from "../../data/projects";
import { techProjectHref } from "../projects/ProjectCard";
import { TechPill } from "../ui/TechPill";

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-section__grid">
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h2>Technical and general background</h2>
          <p>
            I am studying software engineering meanwhile practising building
            different kinds of practical projects while strengthening the
            fundamentals: clean code, data flow,
            testing and clear architecture.
          </p>
          <p>I've always been fond of computers, technology,
            programming, making homepages and more. I have even used this skill
            on multiple occasions on school projects before I came to the
            conclusion, that i wanted to to be a programmer.
            I just had too much fun with it, and therefor I didn't think
            of it as work or a profession.
          </p>
          <p>
            Before entering software, I spent years working closely with people.
            That experience shapes how I communicate, take responsibility and
            approach teamwork.
          </p>
          <a className="text-link" href="#cv">
            Read more in CV
            <ArrowRight size={17} strokeWidth={1.9} />
          </a>
        </div>

        <aside className="background-panel">
          <div className="background-panel__icon">
            <HeartHandshake size={28} strokeWidth={1.8} />
          </div>
          <h3>Practical, calm and curious</h3>
          <p>
            I like software that feels understandable from the inside out:
            readable code, predictable behavior and interfaces that make sense.
          </p>
          <div className="skill-cloud">
            {skills.map((skill, index) => (
              <TechPill
                href={techProjectHref(skill)}
                key={skill}
                tone={index % 4 === 0 ? "amber" : index % 3 === 0 ? "green" : "blue"}
              >
                {skill}
              </TechPill>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
