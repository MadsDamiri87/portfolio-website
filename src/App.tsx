import { Suspense, lazy, useEffect, useState } from "react";
import { SiteShell } from "./components/layout/SiteShell";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { AboutSection } from "./components/sections/AboutSection";
import { CvSection } from "./components/sections/CvSection";
import { FeatureStrip } from "./components/sections/FeatureStrip";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { projects } from "./data/projects";

// The home page ships in the main bundle; the sub-pages are fetched on first visit.
const AboutPage = lazy(() =>
  import("./components/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import("./components/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const CvPage = lazy(() => import("./components/pages/CvPage").then((m) => ({ default: m.CvPage })));
const ProjectDetailPage = lazy(() =>
  import("./components/pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })),
);
const ProjectsPage = lazy(() =>
  import("./components/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })),
);

type Route =
  | { page: "home" }
  | { page: "about" }
  | { page: "contact" }
  | { page: "cv" }
  | { page: "projects" }
  | { page: "project-detail"; projectSlug: string }
  | { page: "not-found" };

function getRoute(): Route {
  const hash = window.location.hash;

  // Anything that is not "#/..." is a plain anchor on the home page (#home, #projects, ...).
  if (!hash.startsWith("#/")) {
    return { page: "home" };
  }

  // Drop any query string ("?tech=React") and trailing slashes before matching.
  const path = hash.split("?")[0].replace(/\/+$/, "");

  if (path === "#") return { page: "home" };
  if (path === "#/about") return { page: "about" };
  if (path === "#/contact") return { page: "contact" };
  if (path === "#/cv") return { page: "cv" };
  if (path === "#/projects") return { page: "projects" };

  const projectSlug = path.match(/^#\/projects\/(.+)$/)?.[1];

  if (projectSlug) {
    return { page: "project-detail", projectSlug: decodeURIComponent(projectSlug) };
  }

  return { page: "not-found" };
}

function getActivePage(route: Route) {
  switch (route.page) {
    case "project-detail":
      return "projects" as const;
    case "not-found":
      return "home" as const;
    default:
      return route.page;
  }
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const activePage = getActivePage(route);
  const activeProject =
    route.page === "project-detail"
      ? projects.find((project) => project.slug.toLowerCase() === route.projectSlug.toLowerCase())
      : undefined;

  // Changing project without leaving the detail page still has to reset the scroll position.
  const routeKey = route.page === "project-detail" ? `project-detail/${route.projectSlug}` : route.page;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey]);

  const renderPage = () => {
    switch (route.page) {
      case "project-detail":
        return activeProject ? <ProjectDetailPage project={activeProject} /> : <NotFoundPage variant="project" />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "cv":
        return <CvPage />;
      case "projects":
        return <ProjectsPage />;
      case "not-found":
        return <NotFoundPage variant="page" />;
      default:
        return (
          <>
            <HeroSection />
            <FeatureStrip />
            <ProjectsSection />
            <AboutSection />
            <CvSection />
          </>
        );
    }
  };

  return (
    <SiteShell activePage={activePage}>
      <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>{renderPage()}</Suspense>
    </SiteShell>
  );
}
