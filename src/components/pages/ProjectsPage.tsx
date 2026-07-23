import { BarChart3, Boxes, Filter, GitBranch, Grid2X2, Layers, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import projectsHeroImage from "../../assets/images/projects-system-bg.webp";
import { projects } from "../../data/projects";
import type { Project } from "../../types";
import { ProjectCard, tagTone } from "../projects/ProjectCard";
import { TechPill } from "../ui/TechPill";

const statusFilters = ["All", "Featured", "In progress", "Learning lab"] as const;
const semesterFilters = [1, 2, 3, 4, 5, 6, 7] as const;
type SemesterFilter = "All" | (typeof semesterFilters)[number];

function getTechFromHash() {
  const [, queryString = ""] = window.location.hash.split("?");
  return new URLSearchParams(queryString).get("tech") ?? "All";
}

function projectMatches(project: Project, query: string, tech: string, status: string, semester: SemesterFilter) {
  const searchable = [
    project.title,
    project.category,
    project.description,
    project.type,
    project.source,
    project.semester ? `${project.semester}. semester` : "",
    ...project.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    searchable.includes(query.toLowerCase()) &&
    (tech === "All" || project.tags.includes(tech)) &&
    (status === "All" || project.status === status) &&
    (semester === "All" || project.semester === semester)
  );
}

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState(getTechFromHash);
  const [selectedStatus, setSelectedStatus] = useState<(typeof statusFilters)[number]>("All");
  const [selectedSemester, setSelectedSemester] = useState<SemesterFilter>("All");

  const technologies = useMemo(
    () => ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags))).sort()],
    [],
  );

  const filteredProjects = useMemo(
    () => projects.filter((project) => projectMatches(project, query, selectedTech, selectedStatus, selectedSemester)),
    [query, selectedTech, selectedStatus, selectedSemester],
  );

  const semesterGroups = useMemo(
    () =>
      semesterFilters.map((semester) => ({
        semester,
        items: projects.filter((project) => project.semester === semester),
      })),
    [],
  );

  const totalTechnologies = technologies.length - 1;

  const clearTechFilter = () => {
    setSelectedTech("All");
    window.history.replaceState(null, "", "#/projects");
  };

  useEffect(() => {
    const applyHashFilter = () => {
      const techFromHash = getTechFromHash();

      setSelectedTech(techFromHash);

      if (techFromHash !== "All") {
        window.setTimeout(() => {
          document.getElementById("project-results")?.scrollIntoView({ block: "start" });
        }, 0);
      }
    };

    applyHashFilter();
    window.addEventListener("hashchange", applyHashFilter);

    return () => window.removeEventListener("hashchange", applyHashFilter);
  }, []);

  return (
    <section className="projects-page">
      <img className="projects-page__background" src={projectsHeroImage} alt="" aria-hidden="true" />
      <div className="container projects-page__inner">
        <header className="projects-page__header">
          <div>
            <h1>Projects</h1>
            <span>Systems, school projects and experiments collected in one searchable overview.</span>
          </div>
          <div className="projects-page__meta">
            <strong>{projects.length}</strong>
            <span>Total projects</span>
          </div>
        </header>

        <section className="projects-intro-card" aria-label="How to use the project archive">
          <div>
            <h2>A practical overview of what I have built</h2>
            <p>
              This page collects my school projects, experiments and fullstack work in one place.
              It is meant to show how I think through systems, turn requirements into working
              software and keep track of the technologies I have used along the way.
            </p>
          </div>
          <div>
            <h3>How to navigate</h3>
            <p>
              Search by project, technology or concept, filter by semester or status, and use the
              technology tags to compare related projects. Open a project card to see the details,
              screenshots, technical decisions and documentation.
            </p>
          </div>
        </section>

        <div className="projects-page__layout">
          <div className="projects-page__main" id="project-results">
            <div className="projects-toolbar">
              <label className="projects-search">
                <Search size={19} strokeWidth={1.9} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects or technologies..."
                  type="search"
                />
              </label>

              <div className="projects-filter-group" aria-label="Project status filters">
                <Filter size={17} strokeWidth={1.9} />
                {statusFilters.map((status) => (
                  <button
                    className={selectedStatus === status ? "is-active" : ""}
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    type="button"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="semester-filter" aria-label="Semester filters">
              <button
                className={selectedSemester === "All" ? "is-active" : ""}
                onClick={() => setSelectedSemester("All")}
                type="button"
              >
                <strong>All</strong>
                <span>{projects.length} projects</span>
              </button>
              {semesterGroups.map(({ semester, items }) => (
                <button
                  className={selectedSemester === semester ? "is-active" : ""}
                  key={semester}
                  onClick={() => setSelectedSemester(semester)}
                  type="button"
                >
                  <strong>{semester}. semester</strong>
                  <span>{items.length ? `${items.length} projects` : "Coming soon"}</span>
                </button>
              ))}
            </div>

            <div className="projects-tech-filter" aria-label="Technology filters">
              {technologies.map((tech) => (
                <button
                  className={selectedTech === tech ? "is-active" : ""}
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  type="button"
                >
                  {tech === "All" ? <span>All technologies</span> : <TechPill tone={tagTone(tech)}>{tech}</TechPill>}
                </button>
              ))}
            </div>

            {selectedTech !== "All" ? (
              <div className="projects-filter-notice">
                <span>
                  Showing projects using <strong>{selectedTech}</strong>
                </span>
                <button onClick={clearTechFilter} type="button">
                  Clear filter
                </button>
              </div>
            ) : null}

            <div className="projects-result-bar">
              <span>
                Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
              </span>
              <span>
                {selectedSemester === "All" ? "All semesters" : `${selectedSemester}. semester`} ·{" "}
                {selectedTech === "All" ? "All technologies" : selectedTech}
              </span>
            </div>

            {filteredProjects.length ? (
              <div className="projects-page-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            ) : (
              <div className="projects-empty-state">
                <strong>No projects match this filter yet.</strong>
                <span>
                  {selectedSemester === "All"
                    ? "Try another technology or status."
                    : `Projects from ${selectedSemester}. semester will show here as they are added.`}
                </span>
              </div>
            )}
          </div>

          <aside className="projects-overview" aria-label="Project overview">
            <div className="projects-overview__block">
              <h2>
                <BarChart3 size={18} strokeWidth={1.9} />
                Overview
              </h2>
              <div className="overview-stat">
                <span>
                  <strong>{projects.length}</strong>
                  Projects
                </span>
              </div>
              <div className="overview-stat">
                <span>
                  <strong>{totalTechnologies}</strong>
                  Technologies
                </span>
              </div>
              <div className="overview-stat">
                <span>
                  <strong>100%</strong>
                  Built by me
                </span>
              </div>
              <div className="overview-stat">
                <span>
                  <strong>{selectedSemester === "All" ? "1-7" : selectedSemester}</strong>
                  Semester view
                </span>
              </div>
            </div>

            <div className="projects-overview__block">
              <h2>Most Used</h2>
              <div className="overview-tech-list">
                {technologies
                  .filter((tech) => tech !== "All")
                  .slice(0, 8)
                  .map((tech) => (
                    <button key={tech} onClick={() => setSelectedTech(tech)} type="button">
                      <TechPill tone={tagTone(tech)}>{tech}</TechPill>
                    </button>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
