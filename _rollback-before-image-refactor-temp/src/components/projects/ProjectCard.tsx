import { ExternalLink } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import type { Project } from "../../types";
import { TechPill } from "../ui/TechPill";

type ProjectCardProps = {
  project: Project;
};

export function tagTone(tag: string) {
  if (tag === "React") return "react";
  if (["JavaScript", "Vite", "Maven"].includes(tag)) return "js";
  if (["HTML"].includes(tag)) return "html";
  if (["CSS"].includes(tag)) return "css";
  if (["PostgreSQL"].includes(tag)) return "postgres";
  if (["Java", "Spring Boot", "JPA"].includes(tag)) return "java";
  if (["JUnit", "Testcontainers"].includes(tag)) return "test";
  if (["TCP/UDP"].includes(tag)) return "network";
  if (["TypeScript", "SQL"].includes(tag)) return "amber";
  if (["Node.js", "API"].includes(tag)) return "green";
  if (["JavaFX", "FXML", "NoSQL"].includes(tag)) return "violet";
  return "blue";
}

export function techProjectHref(tag: string) {
  return `#/projects?tech=${encodeURIComponent(tag)}`;
}

export function projectDetailHref(project: Project) {
  return `#/projects/${project.slug}`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const detailHref = projectDetailHref(project);

  const openProject = () => {
    window.location.hash = detailHref;
  };

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;

    openProject();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter") return;
    if ((event.target as HTMLElement).closest("a, button")) return;

    openProject();
  };

  return (
    <article
      className={`project-card project-card--${project.accent}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <a className="project-card__open" href={detailHref} aria-label={`Open ${project.title}`}>
        <ExternalLink size={17} strokeWidth={1.9} />
      </a>
      <a className="project-preview" href={detailHref} aria-label={`Open ${project.title}`}>
          <img className="project-preview__image" src={project.image} alt={project.title} />
      </a>
      <div className="project-card__body">
        <p>{project.category}</p>
        <h3>
          <a href={detailHref}>{project.title}</a>
        </h3>
        <span>{project.description}</span>
      </div>
      <div className="project-card__tags">
        {project.tags.map((tag) => (
          <TechPill href={techProjectHref(tag)} key={tag} tone={tagTone(tag)}>
            {tag}
          </TechPill>
        ))}
      </div>
    </article>
  );
}
