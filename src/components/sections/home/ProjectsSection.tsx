import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { projects } from "../../../data/projects";
import { useAutoScrollStrip } from "../../../hooks/useAutoScrollStrip";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { ProjectCard } from "../../projects/ProjectCard";
import { SectionHeading } from "../../ui/SectionHeading";

const stripDotCount = 4;
const stripFadeThreshold = 12;
const stripAutoResumeDelay = 1500;
const stripAutoScrollSpeed = 0.1;

export function ProjectsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const newestProjects = useMemo(
    () => [...projects].sort((a, b) => (b.semester ?? 0) - (a.semester ?? 0)).slice(0, 6),
    [],
  );
  const loopedProjects = useMemo(() => [...newestProjects, ...newestProjects], [newestProjects]);

  const strip = useAutoScrollStrip({
    itemCount: newestProjects.length,
    enabled: !prefersReducedMotion,
    resumeDelay: stripAutoResumeDelay,
    fadeThreshold: stripFadeThreshold,
    // The strip loops, so both edges stay soft for as long as it overflows.
    edgeFades: "scrollable",
    mode: { kind: "continuous", speed: stripAutoScrollSpeed, dotCount: stripDotCount },
  });

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <SectionHeading
          title="Projects"
          action={
            <a className="text-link" href="#/projects">
              View all projects
              <ArrowRight size={17} strokeWidth={1.9} />
            </a>
          }
        />
        <div
          className={[
            "projects-strip-shell",
            strip.state.canScrollLeft ? "has-left-fade" : "",
            strip.state.canScrollRight ? "has-right-fade" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="projects-grid projects-grid--home-strip" {...strip.stripProps} ref={strip.ref}>
            {loopedProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}
          </div>
        </div>
        <div className="projects-strip-dots" aria-label="Project strip position">
          {Array.from({ length: stripDotCount }).map((_, index) => (
            <button
              aria-label={`Go to project group ${index + 1}`}
              className={strip.state.activeDot === index ? "is-active" : ""}
              key={index}
              onClick={() => strip.scrollToDot(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
