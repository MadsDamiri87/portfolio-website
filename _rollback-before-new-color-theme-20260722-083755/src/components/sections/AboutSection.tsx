import { ArrowRight, HeartHandshake } from "lucide-react";
import { skills } from "../../data/projects";
import { techProjectHref } from "../projects/ProjectCard";
import { TechPill } from "../ui/TechPill";

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="container about-section__grid">
        <div className="about-copy">
          <h2>Technical and general background</h2>
          <p>
            I am currently studying software engineering at VIA University College, while
            practising building different kinds of practical projects to help strengthen and improving my
            skills.
          </p>
          <p>I've always been fond of computers, technology,
            programming, making homepages and more. I have even used this skill
            on multiple occasions on school projects before I came to the
            realization and afterwards the conclusion, that i wanted to to be a programmer.
            I just had too much fun with it, and therefor I didn't think
            of it as work or something i could do as a profession.
          </p>
          <p>
            Before starting my road towards becoming a software engineer,
            I spent a lot of years working closely with people in different ways.
            The knowledge and experience i've been able to extract from that,
            has shaped the way i interact with people in almost every way.
            And most importantly. It has taught me a better way to listen and understand
            people as well as concepts.
          </p>
          <p>
          <a className="text-link" href="#/cv">
            Read more in CV
            <ArrowRight size={17} strokeWidth={1.9} />
          </a>
          </p>
        </div>

        <aside className="background-panel">
          <h3>Practical, calm and curious</h3>
          <p>
            I like writing code, and even though AI most likely will put an end to that at
            some point in a not so distant future, i still like the puzzle that a complex code
            contains of.
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
