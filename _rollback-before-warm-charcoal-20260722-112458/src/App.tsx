import { useEffect, useState } from "react";
import { SiteShell } from "./components/layout/SiteShell";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { CvPage } from "./components/pages/CvPage";
import { ProjectDetailPage } from "./components/pages/ProjectDetailPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { AboutSection } from "./components/sections/AboutSection";
import { CvSection } from "./components/sections/CvSection";
import { FeatureStrip } from "./components/sections/FeatureStrip";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { projects } from "./data/projects";

function getRoute() {
  const hash = window.location.hash;

  if (hash === "#/about") {
    return { page: "about" as const };
  }

  if (hash === "#/contact") {
    return { page: "contact" as const };
  }

  if (hash === "#/cv") {
    return { page: "cv" as const };
  }

  if (!hash.startsWith("#/projects")) {
    return { page: "home" as const };
  }

  const projectSlug = hash.match(/^#\/projects\/([^?]+)/)?.[1];

  if (projectSlug) {
    return { page: "project-detail" as const, projectSlug: decodeURIComponent(projectSlug) };
  }

  return { page: "projects" as const };
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const activePage =
    route.page === "projects" || route.page === "project-detail"
      ? "projects"
      : route.page === "about"
        ? "about"
        : route.page === "contact"
          ? "contact"
          : route.page === "cv"
            ? "cv"
            : "home";
  const activeProject =
    route.page === "project-detail"
      ? projects.find((project) => project.slug.toLowerCase() === route.projectSlug.toLowerCase())
      : undefined;

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute());

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route.page !== "home") {
      if (window.location.hash.includes("?tech=")) return;

      window.scrollTo({ top: 0 });
      return;
    }

    const targetId = window.location.hash.replace("#", "");
    if (!targetId || targetId === "home") return;

    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
  }, [route.page]);

  return (
    <SiteShell activePage={activePage}>
      {route.page === "project-detail" && activeProject ? (
        <ProjectDetailPage project={activeProject} />
      ) : route.page === "about" ? (
        <AboutPage />
      ) : route.page === "contact" ? (
        <ContactPage />
      ) : route.page === "cv" ? (
        <CvPage />
      ) : route.page === "projects" ? (
        <ProjectsPage />
      ) : (
        <>
          <HeroSection />
          <FeatureStrip />
          <ProjectsSection />
          <AboutSection />
          <CvSection />
        </>
      )}
    </SiteShell>
  );
}
