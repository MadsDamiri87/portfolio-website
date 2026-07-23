import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../../data/projects";
import { ProjectCard } from "../projects/ProjectCard";
import { SectionHeading } from "../ui/SectionHeading";

const stripDotCount = 4;
const stripFadeThreshold = 12;
const stripAutoResumeDelay = 1500;
const stripAutoScrollSpeed = 0.1;

export function ProjectsSection() {
  const stripRef = useRef<HTMLDivElement>(null);
  const isPointerOverStripRef = useRef(false);
  const lastAutoFrameRef = useRef<number | null>(null);
  const preciseScrollLeftRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const [scrollState, setScrollState] = useState({
    activeDot: 0,
    canScrollLeft: false,
    canScrollRight: false,
  });
  const newestProjects = useMemo(
    () => [...projects].sort((a, b) => (b.semester ?? 0) - (a.semester ?? 0)).slice(0, 6),
    [],
  );
  const loopedProjects = useMemo(() => [...newestProjects, ...newestProjects], [newestProjects]);

  const getLoopWidth = () => {
    const strip = stripRef.current;
    const loopStartCard = strip?.children[newestProjects.length] as HTMLElement | undefined;

    return loopStartCard?.offsetLeft ?? 0;
  };

  const updateScrollState = () => {
    const strip = stripRef.current;
    if (!strip) return;

    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    const scrollLeft = Math.max(0, strip.scrollLeft);
    const loopWidth = getLoopWidth();
    const loopScroll = loopWidth > 0 ? scrollLeft % loopWidth : scrollLeft;
    const progress = loopWidth > 0 ? loopScroll / loopWidth : maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const canScroll = maxScroll > stripFadeThreshold;

    setScrollState((current) => {
      const next = {
        activeDot: Math.min(stripDotCount - 1, Math.floor(progress * stripDotCount)),
        canScrollLeft: canScroll,
        canScrollRight: canScroll,
      };

      if (
        current.activeDot === next.activeDot &&
        current.canScrollLeft === next.canScrollLeft &&
        current.canScrollRight === next.canScrollRight
      ) {
        return current;
      }

      return next;
    });
  };

  const pauseAutoScroll = () => {
    preciseScrollLeftRef.current = stripRef.current?.scrollLeft ?? preciseScrollLeftRef.current;
    stripRef.current?.classList.remove("is-auto-scrolling");
    pauseUntilRef.current = performance.now() + stripAutoResumeDelay;
  };

  const handleStripPointerEnter = () => {
    isPointerOverStripRef.current = true;
    stripRef.current?.classList.remove("is-auto-scrolling");
  };

  const handleStripPointerLeave = () => {
    isPointerOverStripRef.current = false;
    pauseAutoScroll();
  };

  const handleStripScroll = () => {
    if (!stripRef.current?.classList.contains("is-auto-scrolling")) {
      preciseScrollLeftRef.current = stripRef.current?.scrollLeft ?? preciseScrollLeftRef.current;
    }

    updateScrollState();
  };

  useEffect(() => {
    updateScrollState();
    const frame = requestAnimationFrame(updateScrollState);
    const timeout = window.setTimeout(updateScrollState, 250);

    const handleResize = () => updateScrollState();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const tick = (time: number) => {
      const strip = stripRef.current;

      if (strip) {
        const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);

        if (maxScroll > stripFadeThreshold && time >= pauseUntilRef.current && !isPointerOverStripRef.current) {
          strip.classList.add("is-auto-scrolling");
          strip.style.scrollSnapType = "none";

          const lastFrame = lastAutoFrameRef.current ?? time;
          const delta = Math.min(time - lastFrame, 48);
          const loopWidth = getLoopWidth();

          let nextScroll = preciseScrollLeftRef.current + delta * stripAutoScrollSpeed;

          if (loopWidth > 0 && nextScroll >= loopWidth) {
            nextScroll %= loopWidth;
          }

          preciseScrollLeftRef.current = Math.min(maxScroll, nextScroll);
          strip.scrollLeft = preciseScrollLeftRef.current;
          updateScrollState();
        } else {
          strip.classList.remove("is-auto-scrolling");
        }
      }

      lastAutoFrameRef.current = time;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToDot = (dotIndex: number) => {
    const strip = stripRef.current;
    if (!strip) return;

    pauseAutoScroll();

    const loopWidth = getLoopWidth();
    const target = loopWidth * (dotIndex / stripDotCount);

    preciseScrollLeftRef.current = target;
    strip.scrollTo({ left: target, behavior: "smooth" });
  };

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
            scrollState.canScrollLeft ? "has-left-fade" : "",
            scrollState.canScrollRight ? "has-right-fade" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className="projects-grid projects-grid--home-strip"
            onFocus={pauseAutoScroll}
            onKeyDown={pauseAutoScroll}
            onPointerDown={pauseAutoScroll}
            onPointerEnter={handleStripPointerEnter}
            onPointerLeave={handleStripPointerLeave}
            onScroll={handleStripScroll}
            onTouchStart={pauseAutoScroll}
            onWheel={pauseAutoScroll}
            ref={stripRef}
          >
            {loopedProjects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} />
            ))}
          </div>
        </div>
        <div className="projects-strip-dots" aria-label="Project strip position">
          {Array.from({ length: stripDotCount }).map((_, index) => (
            <button
              aria-label={`Go to project group ${index + 1}`}
              className={scrollState.activeDot === index ? "is-active" : ""}
              key={index}
              onClick={() => scrollToDot(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
