import { AboutSection } from "../sections/home/AboutSection";
import { CvSection } from "../sections/home/CvSection";
import { FeatureStrip } from "../sections/home/FeatureStrip";
import { HeroSection } from "../sections/home/HeroSection";
import { ProjectsSection } from "../sections/home/ProjectsSection";

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