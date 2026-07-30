import { AboutSection } from "../sections/home/AboutSection";
import { CvSection } from "../sections/home/CvSection";
import { FeatureStrip } from "../sections/home/FeatureStrip";
import { HeroSection } from "../sections/home/HeroSection";
import { ProjectsSection } from "../sections/home/ProjectsSection";

/**
 * The landing page. Unlike the other routes it is assembled from the teaser
 * sections in `sections/home`, each of which links on to the full page for
 * that topic. Kept in the main bundle (see App.tsx) so the first view paints
 * without waiting on a second request.
 */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="container section-divider" aria-hidden="true" />
      <FeatureStrip />
      <ProjectsSection />
      <AboutSection />
      <CvSection />
    </>
  );
}
