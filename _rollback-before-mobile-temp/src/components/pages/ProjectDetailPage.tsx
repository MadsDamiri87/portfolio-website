import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Layers,
  Monitor,
  Network,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "../../types";
import { tagTone } from "../projects/ProjectCard";
import { TechPill } from "../ui/TechPill";

type ProjectDetailPageProps = {
  project: Project;
};

const documentationFadeThreshold = 12;
const documentationAutoResumeDelay = 1500;
const documentationAutoScrollSpeed = 0.065;
const maxDocumentationDotCount = 4;
const technicalChoiceFadeThreshold = 12;
const technicalChoiceAutoResumeDelay = 5000;
const technicalChoiceAutoRotationInterval = 6000;

type TechnicalChoice = NonNullable<NonNullable<Project["detail"]>["technicalChoices"]>[number];
type TechnicalChoiceSlide = {
  category: string;
  choices: TechnicalChoice[];
};

function buildTechnicalChoiceSlides(choices: TechnicalChoice[]) {
  const slides: TechnicalChoiceSlide[] = [];
  const slideMap = new Map<string, TechnicalChoiceSlide>();
  const categoryCounts = new Map<string, number>();

  choices.forEach((choice) => {
    const category = choice.category ?? "Implementation";
    const count = categoryCounts.get(category) ?? 0;
    const slideIndex = choice.slide ? choice.slide - 1 : Math.floor(count / 4);
    const key = `${category}-${slideIndex}`;

    if (!slideMap.has(key)) {
      const slide = { category, choices: [] };
      slideMap.set(key, slide);
      slides.push(slide);
    }

    slideMap.get(key)?.choices.push(choice);
    categoryCounts.set(category, count + 1);
  });

  return slides;
}

function DiagramPreview() {
  return (
    <div className="detail-diagram-preview" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function GithubMark() {
  return (
    <svg aria-hidden="true" className="github-mark" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
    </svg>
  );
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const documentationRef = useRef<HTMLDivElement>(null);
  const technicalChoiceRef = useRef<HTMLDivElement>(null);
  const isPointerOverDocumentationRef = useRef(false);
  const isPointerOverTechnicalChoiceRef = useRef(false);
  const lastDocumentationFrameRef = useRef<number | null>(null);
  const lastTechnicalChoiceRotationRef = useRef<number | null>(null);
  const preciseDocumentationScrollLeftRef = useRef(0);
  const preciseTechnicalChoiceScrollLeftRef = useRef(0);
  const documentationPauseUntilRef = useRef(0);
  const technicalChoicePauseUntilRef = useRef(0);
  const technicalChoiceTransitionTimeoutRef = useRef<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [activeDocument, setActiveDocument] = useState<{ image: string; title: string } | null>(null);
  const [isTechnicalChoiceTransitioning, setIsTechnicalChoiceTransitioning] = useState(false);
  const [documentationScrollState, setDocumentationScrollState] = useState({
    activeDot: 0,
    canScrollLeft: false,
    canScrollRight: false,
  });
  const [technicalChoiceScrollState, setTechnicalChoiceScrollState] = useState({
    activeDot: 0,
    canScrollLeft: false,
    canScrollRight: false,
  });
  const detail = project.detail;
  const title = detail?.displayTitle ?? project.title;
  const screenshots = useMemo(() => project.screenshots?.length ? project.screenshots : [project.image], [project]);
  const activeScreenshotIndex = activeScreenshot ? screenshots.indexOf(activeScreenshot) : -1;
  const heroScreenshots = screenshots.slice(0, 3);
  const documentationItems = useMemo(() => detail?.documentation ?? [], [detail?.documentation]);
  const documentationDotCount = Math.min(maxDocumentationDotCount, Math.max(1, documentationItems.length));
  const loopedDocumentationItems = useMemo(
    () => (documentationItems.length > 1 ? [...documentationItems, ...documentationItems] : documentationItems),
    [documentationItems],
  );
  const technicalChoices = useMemo(() => detail?.technicalChoices ?? [], [detail?.technicalChoices]);
  const technicalChoiceSlides = useMemo(() => buildTechnicalChoiceSlides(technicalChoices), [technicalChoices]);
  const loopedTechnicalChoiceSlides = useMemo(
    () => (technicalChoiceSlides.length > 1 ? [...technicalChoiceSlides, ...technicalChoiceSlides] : technicalChoiceSlides),
    [technicalChoiceSlides],
  );

  const getDocumentationLoopWidth = () => {
    const strip = documentationRef.current;
    const loopStartCard = strip?.children[documentationItems.length] as HTMLElement | undefined;

    return loopStartCard?.offsetLeft ?? 0;
  };

  const updateDocumentationScrollState = () => {
    const strip = documentationRef.current;
    if (!strip) return;

    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    const scrollLeft = Math.max(0, strip.scrollLeft);
    const loopWidth = getDocumentationLoopWidth();
    const loopScroll = loopWidth > 0 ? scrollLeft % loopWidth : scrollLeft;
    const progress = loopWidth > 0 ? loopScroll / loopWidth : maxScroll > 0 ? scrollLeft / maxScroll : 0;

    setDocumentationScrollState((current) => {
      const next = {
        activeDot: Math.min(documentationDotCount - 1, Math.floor(progress * documentationDotCount)),
        canScrollLeft: loopScroll > documentationFadeThreshold,
        canScrollRight: maxScroll - scrollLeft > documentationFadeThreshold,
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

  const pauseDocumentationAutoScroll = () => {
    preciseDocumentationScrollLeftRef.current =
      documentationRef.current?.scrollLeft ?? preciseDocumentationScrollLeftRef.current;
    documentationRef.current?.classList.remove("is-auto-scrolling");
    documentationPauseUntilRef.current = performance.now() + documentationAutoResumeDelay;
  };

  const handleDocumentationPointerEnter = () => {
    isPointerOverDocumentationRef.current = true;
    documentationRef.current?.classList.remove("is-auto-scrolling");
  };

  const handleDocumentationPointerLeave = () => {
    isPointerOverDocumentationRef.current = false;
    pauseDocumentationAutoScroll();
  };

  const handleDocumentationScroll = () => {
    if (!documentationRef.current?.classList.contains("is-auto-scrolling")) {
      preciseDocumentationScrollLeftRef.current =
        documentationRef.current?.scrollLeft ?? preciseDocumentationScrollLeftRef.current;
    }

    updateDocumentationScrollState();
  };

  useEffect(() => {
    updateDocumentationScrollState();
    const frame = requestAnimationFrame(updateDocumentationScrollState);
    const timeout = window.setTimeout(updateDocumentationScrollState, 250);

    const handleResize = () => updateDocumentationScrollState();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [documentationItems.length]);

  useEffect(() => {
    let frame = 0;

    const tick = (time: number) => {
      const strip = documentationRef.current;

      if (strip) {
        const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);

        if (
          documentationItems.length > 1 &&
          maxScroll > documentationFadeThreshold &&
          time >= documentationPauseUntilRef.current &&
          !isPointerOverDocumentationRef.current
        ) {
          strip.classList.add("is-auto-scrolling");

          const lastFrame = lastDocumentationFrameRef.current ?? time;
          const delta = Math.min(time - lastFrame, 48);
          const loopWidth = getDocumentationLoopWidth();
          let nextScroll = preciseDocumentationScrollLeftRef.current + delta * documentationAutoScrollSpeed;

          if (loopWidth > 0 && nextScroll >= loopWidth) {
            nextScroll %= loopWidth;
          }

          preciseDocumentationScrollLeftRef.current = Math.min(maxScroll, nextScroll);
          strip.scrollLeft = preciseDocumentationScrollLeftRef.current;
          updateDocumentationScrollState();
        } else {
          strip.classList.remove("is-auto-scrolling");
        }
      }

      lastDocumentationFrameRef.current = time;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [documentationItems.length]);

  const scrollDocumentationToDot = (dotIndex: number) => {
    const strip = documentationRef.current;
    if (!strip) return;

    pauseDocumentationAutoScroll();

    const loopWidth = getDocumentationLoopWidth();
    const target = loopWidth * (dotIndex / documentationDotCount);

    preciseDocumentationScrollLeftRef.current = target;
    strip.scrollTo({ left: target, behavior: "smooth" });
  };

  const getTechnicalChoiceLoopWidth = () => {
    const strip = technicalChoiceRef.current;
    const loopStartSlide = strip?.children[technicalChoiceSlides.length] as HTMLElement | undefined;

    return loopStartSlide?.offsetLeft ?? 0;
  };

  const getTechnicalChoiceSlideWidth = () => {
    const strip = technicalChoiceRef.current;
    const firstSlide = strip?.children[0] as HTMLElement | undefined;

    return firstSlide?.offsetWidth ?? strip?.clientWidth ?? 0;
  };

  const updateTechnicalChoiceScrollState = () => {
    const strip = technicalChoiceRef.current;
    if (!strip) return;

    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    const scrollLeft = Math.max(0, strip.scrollLeft);
    const loopWidth = getTechnicalChoiceLoopWidth();
    const loopScroll = loopWidth > 0 ? scrollLeft % loopWidth : scrollLeft;
    const slideWidth = getTechnicalChoiceSlideWidth();
    const activeDot = slideWidth > 0 ? Math.round(loopScroll / slideWidth) : 0;

    setTechnicalChoiceScrollState((current) => {
      const next = {
        activeDot: Math.min(technicalChoiceSlides.length - 1, activeDot),
        canScrollLeft: loopScroll > technicalChoiceFadeThreshold,
        canScrollRight: maxScroll - scrollLeft > technicalChoiceFadeThreshold,
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

  const pauseTechnicalChoiceAutoScroll = () => {
    preciseTechnicalChoiceScrollLeftRef.current =
      technicalChoiceRef.current?.scrollLeft ?? preciseTechnicalChoiceScrollLeftRef.current;
    technicalChoiceRef.current?.classList.remove("is-auto-scrolling");
    technicalChoicePauseUntilRef.current = performance.now() + technicalChoiceAutoResumeDelay;
    lastTechnicalChoiceRotationRef.current = null;
  };

  const showTechnicalChoiceTransitionFade = () => {
    setIsTechnicalChoiceTransitioning(true);

    if (technicalChoiceTransitionTimeoutRef.current) {
      window.clearTimeout(technicalChoiceTransitionTimeoutRef.current);
    }

    technicalChoiceTransitionTimeoutRef.current = window.setTimeout(() => {
      setIsTechnicalChoiceTransitioning(false);
      technicalChoiceTransitionTimeoutRef.current = null;
    }, 950);
  };

  const handleTechnicalChoicePointerEnter = () => {
    isPointerOverTechnicalChoiceRef.current = true;
    technicalChoiceRef.current?.classList.remove("is-auto-scrolling");
  };

  const handleTechnicalChoicePointerLeave = () => {
    isPointerOverTechnicalChoiceRef.current = false;
    pauseTechnicalChoiceAutoScroll();
  };

  const handleTechnicalChoiceScroll = () => {
    if (!technicalChoiceRef.current?.classList.contains("is-auto-scrolling")) {
      preciseTechnicalChoiceScrollLeftRef.current =
        technicalChoiceRef.current?.scrollLeft ?? preciseTechnicalChoiceScrollLeftRef.current;
    }

    updateTechnicalChoiceScrollState();
  };

  useEffect(() => {
    preciseTechnicalChoiceScrollLeftRef.current = 0;
    technicalChoiceRef.current?.scrollTo({ left: 0 });
    updateTechnicalChoiceScrollState();
  }, [project.slug, technicalChoiceSlides.length]);

  useEffect(() => {
    updateTechnicalChoiceScrollState();
    const frame = requestAnimationFrame(updateTechnicalChoiceScrollState);
    const timeout = window.setTimeout(updateTechnicalChoiceScrollState, 250);

    const handleResize = () => updateTechnicalChoiceScrollState();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [technicalChoiceSlides.length]);

  useEffect(() => {
    return () => {
      if (technicalChoiceTransitionTimeoutRef.current) {
        window.clearTimeout(technicalChoiceTransitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let loopResetTimeout = 0;

    const resetTechnicalChoiceLoop = (strip: HTMLDivElement) => {
      const previousScrollBehavior = strip.style.scrollBehavior;
      strip.style.scrollBehavior = "auto";
      strip.scrollLeft = 0;
      strip.style.scrollBehavior = previousScrollBehavior;
      preciseTechnicalChoiceScrollLeftRef.current = 0;
      updateTechnicalChoiceScrollState();
    };

    const tick = (time: number) => {
      const strip = technicalChoiceRef.current;

      if (strip) {
        const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);

        if (
          technicalChoiceSlides.length > 1 &&
          maxScroll > technicalChoiceFadeThreshold &&
          time >= technicalChoicePauseUntilRef.current &&
          !isPointerOverTechnicalChoiceRef.current
        ) {
          strip.classList.add("is-auto-scrolling");

          if (lastTechnicalChoiceRotationRef.current === null) {
            lastTechnicalChoiceRotationRef.current = time;
          }

          if (time - lastTechnicalChoiceRotationRef.current >= technicalChoiceAutoRotationInterval) {
            const slideWidth = getTechnicalChoiceSlideWidth();
            const loopWidth = getTechnicalChoiceLoopWidth();
            const loopScroll = loopWidth > 0 ? strip.scrollLeft % loopWidth : strip.scrollLeft;
            const currentSlide = slideWidth > 0 ? Math.round(loopScroll / slideWidth) : 0;
            const nextSlide = currentSlide + 1;
            const target = nextSlide * slideWidth;

            preciseTechnicalChoiceScrollLeftRef.current = target;
            showTechnicalChoiceTransitionFade();
            strip.scrollTo({ left: target, behavior: "smooth" });

            if (nextSlide >= technicalChoiceSlides.length) {
              window.clearTimeout(loopResetTimeout);
              loopResetTimeout = window.setTimeout(() => {
                resetTechnicalChoiceLoop(strip);
              }, 900);
            }

            lastTechnicalChoiceRotationRef.current = time;
          }

          updateTechnicalChoiceScrollState();
        } else {
          strip.classList.remove("is-auto-scrolling");
          lastTechnicalChoiceRotationRef.current = null;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(loopResetTimeout);
    };
  }, [technicalChoiceSlides.length]);

  const scrollTechnicalChoiceToDot = (dotIndex: number) => {
    const strip = technicalChoiceRef.current;
    if (!strip) return;

    pauseTechnicalChoiceAutoScroll();

    const slideWidth = getTechnicalChoiceSlideWidth();
    const target = slideWidth * dotIndex;

    preciseTechnicalChoiceScrollLeftRef.current = target;
    showTechnicalChoiceTransitionFade();
    strip.scrollTo({ left: target, behavior: "smooth" });
  };

  const showPreviousScreenshot = () => {
    if (activeScreenshotIndex <= 0) return;

    setActiveScreenshot(screenshots[activeScreenshotIndex - 1]);
  };

  const showNextScreenshot = () => {
    if (activeScreenshotIndex < 0 || activeScreenshotIndex >= screenshots.length - 1) return;

    setActiveScreenshot(screenshots[activeScreenshotIndex + 1]);
  };

  const facts = [
    { label: "Completed", value: detail?.timeline ?? project.year ?? "In progress", icon: Calendar },
    { label: "Development Time", value: detail?.duration ?? "Project period", icon: Monitor },
    { label: "Code Size", value: detail?.codeSize ?? project.type ?? project.category, icon: Code2 },
    { label: "Type", value: project.type ?? project.category, icon: Layers },
    { label: "Team Size", value: detail?.teamSize ?? "Project team", icon: Network },
    { label: "Status", value: project.status ?? "Completed", icon: ExternalLink },
  ];

  return (
    <section className="project-detail-page">
      <div className="container project-detail-page__inner">
        <div className="project-detail-hero">
          <div className="project-detail-hero__copy">
            <a className="project-detail-back" href="#/projects">
              <ArrowLeft size={16} strokeWidth={1.9} />
              Back to projects
            </a>
            <h1>{title}</h1>
            <h2>{detail?.subtitle ?? project.description}</h2>
            <p>{project.description}</p>

            <div className="project-detail-tags">
              {project.tags.map((tag) => (
                <TechPill key={tag} tone={tagTone(tag)}>
                  {tag}
                </TechPill>
              ))}
            </div>

            <div className="project-detail-actions">
              {detail?.githubUrl ? (
                <a className="button button--github button--compact" href={detail.githubUrl} target="_blank" rel="noreferrer">
                  <GithubMark />
                  View on GitHub
                </a>
              ) : null}
              {detail?.liveUrl ? (
                <a className="button button--secondary button--compact" href={detail.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo
                  <ExternalLink size={16} strokeWidth={1.9} />
                </a>
              ) : null}
            </div>
          </div>

          <div className="project-detail-hero__screens" aria-label={`${title} screenshots`}>
            {heroScreenshots.map((screenshot, index) => (
              <button
                className={`project-detail-hero__screen project-detail-hero__screen--${index + 1}`}
                key={screenshot}
                onClick={() => {
                  setActiveDocument(null);
                  setActiveScreenshot(screenshot);
                  setIsGalleryOpen(true);
                }}
                type="button"
              >
                <img src={screenshot} alt={`${title} screenshot ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="project-facts-strip" aria-label="Project facts">
          {facts.map(({ label, value, icon: Icon }) => (
            <div className="project-fact" key={label}>
              <Icon size={20} strokeWidth={1.85} />
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        {detail?.about?.length ? (
          <section className="project-detail-section project-detail-about">
            <h2>About the project</h2>
            <div>
              {detail.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        <div className="project-detail-split">
          {technicalChoiceSlides.length ? (
            <section className="project-detail-section">
              <div className="project-detail-section__header">
                <h2>Technical choices</h2>
              </div>
              <div
                className={[
                  "technical-choice-strip-shell",
                  technicalChoiceScrollState.canScrollLeft ? "has-left-fade" : "",
                  technicalChoiceScrollState.canScrollRight ? "has-right-fade" : "",
                  isTechnicalChoiceTransitioning ? "is-transitioning" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className="technical-choice-slide-track"
                  onFocus={pauseTechnicalChoiceAutoScroll}
                  onKeyDown={pauseTechnicalChoiceAutoScroll}
                  onPointerDown={pauseTechnicalChoiceAutoScroll}
                  onPointerEnter={handleTechnicalChoicePointerEnter}
                  onPointerLeave={handleTechnicalChoicePointerLeave}
                  onScroll={handleTechnicalChoiceScroll}
                  onTouchStart={pauseTechnicalChoiceAutoScroll}
                  onWheel={pauseTechnicalChoiceAutoScroll}
                  ref={technicalChoiceRef}
                >
                  {loopedTechnicalChoiceSlides.map((slide, slideIndex) => (
                    <div className="technical-choice-slide" key={`${slide.category}-${slideIndex}`}>
                      <div className="technical-choice-category">
                        <span>{slide.category}</span>
                      </div>
                      <div className="technical-choice-grid">
                        {slide.choices.map((choice) => (
                          <article className="technical-choice" key={`${slide.category}-${choice.title}`}>
                            <Code2 size={23} strokeWidth={1.85} />
                            <h3>{choice.title}</h3>
                            <p>{choice.description}</p>
                          </article>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {technicalChoiceSlides.length > 1 ? (
                <div className="technical-choice-dots" aria-label="Technical choices position">
                  {technicalChoiceSlides.map((_, index) => (
                    <button
                      aria-label={`Go to technical choices group ${index + 1}`}
                      className={technicalChoiceScrollState.activeDot === index ? "is-active" : ""}
                      key={index}
                      onClick={() => scrollTechnicalChoiceToDot(index)}
                      type="button"
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="project-detail-section project-gallery-panel">
            <div className="project-detail-section__header">
            </div>
            <div className="project-screenshot-stack">
              {screenshots.slice(0, 5).map((screenshot, index) => (
                <button
                  className={`project-screenshot-stack__item project-screenshot-stack__item--${index + 1}`}
                  key={screenshot}
                  onClick={() => {
                    setActiveScreenshot(null);
                    setIsGalleryOpen(true);
                  }}
                  type="button"
                >
                  <img src={screenshot} alt={`${title} gallery preview ${index + 1}`} />
                </button>
              ))}
            </div>
          </section>
        </div>

        {documentationItems.length ? (
          <section className="project-detail-section">
            <div className="project-detail-section__header">
              <h2>Documentation & Analysis</h2>
            </div>
            <div
              className={[
                "documentation-strip-shell",
                documentationScrollState.canScrollLeft ? "has-left-fade" : "",
                documentationScrollState.canScrollRight ? "has-right-fade" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                className="documentation-grid"
                onFocus={pauseDocumentationAutoScroll}
                onKeyDown={pauseDocumentationAutoScroll}
                onPointerDown={pauseDocumentationAutoScroll}
                onPointerEnter={handleDocumentationPointerEnter}
                onPointerLeave={handleDocumentationPointerLeave}
                onScroll={handleDocumentationScroll}
                onTouchStart={pauseDocumentationAutoScroll}
                onWheel={pauseDocumentationAutoScroll}
                ref={documentationRef}
              >
                {loopedDocumentationItems.map((item, index) => (
                  <button
                    className="documentation-card"
                    key={`${item.title}-${index}`}
                    onClick={() => {
                      if (item.image) {
                        setActiveDocument({ image: item.image, title: item.title });
                        setIsGalleryOpen(true);
                        return;
                      }

                      setIsGalleryOpen(true);
                    }}
                    type="button"
                  >
                    <DiagramPreview />
                    <div>
                      <span>{item.type ?? "Document"}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <FileText size={17} strokeWidth={1.9} />
                  </button>
                ))}
              </div>
            </div>
            {documentationItems.length > 1 ? (
              <div className="documentation-strip-dots" aria-label="Documentation strip position">
                {Array.from({ length: documentationDotCount }).map((_, index) => (
                  <button
                    aria-label={`Go to documentation group ${index + 1}`}
                    className={documentationScrollState.activeDot === index ? "is-active" : ""}
                    key={index}
                    onClick={() => scrollDocumentationToDot(index)}
                    type="button"
                  />
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        {isGalleryOpen ? (
          <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${title} gallery`}>
            <button
              className="project-lightbox__backdrop"
              onClick={() => {
                setIsGalleryOpen(false);
                setActiveScreenshot(null);
                setActiveDocument(null);
              }}
              type="button"
              aria-label="Close gallery"
            />
            <div className={activeScreenshot || activeDocument ? "project-lightbox__panel is-viewing-image" : "project-lightbox__panel"}>
              <button
                className="project-lightbox__close"
                onClick={() => {
                  if (activeScreenshot) {
                    setActiveScreenshot(null);
                    return;
                  }

                  if (activeDocument) {
                    setActiveDocument(null);
                    setIsGalleryOpen(false);
                    return;
                  }

                  setIsGalleryOpen(false);
                }}
                type="button"
                aria-label={activeScreenshot ? "Back to gallery" : "Close overlay"}
              >
                <X size={21} strokeWidth={1.9} />
              </button>

              {activeDocument ? (
                <>
                  <div className="project-lightbox__header">
                    <h2>{activeDocument.title}</h2>
                  </div>
                  <div className="project-lightbox__image-stage">
                    <img className="project-lightbox__image" src={activeDocument.image} alt={activeDocument.title} />
                  </div>
                  <div className="project-lightbox__actions">
                    <a className="button button--secondary button--compact" href={activeDocument.image} target="_blank" rel="noreferrer">
                      View full size
                      <ExternalLink size={16} strokeWidth={1.9} />
                    </a>
                  </div>
                </>
              ) : activeScreenshot ? (
                <>
                  <div className="project-lightbox__image-stage">
                    <button
                      aria-label="Previous screenshot"
                      className="project-lightbox__nav project-lightbox__nav--previous"
                      disabled={activeScreenshotIndex <= 0}
                      onClick={showPreviousScreenshot}
                      type="button"
                    >
                      <ChevronLeft size={24} strokeWidth={1.9} />
                    </button>
                    <img className="project-lightbox__image" src={activeScreenshot} alt={`${title} selected screenshot`} />
                    <button
                      aria-label="Next screenshot"
                      className="project-lightbox__nav project-lightbox__nav--next"
                      disabled={activeScreenshotIndex >= screenshots.length - 1}
                      onClick={showNextScreenshot}
                      type="button"
                    >
                      <ChevronRight size={24} strokeWidth={1.9} />
                    </button>
                  </div>
                  <div className="project-lightbox__actions">
                    <a className="button button--secondary button--compact" href={activeScreenshot} target="_blank" rel="noreferrer">
                      View full size
                      <ExternalLink size={16} strokeWidth={1.9} />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="project-lightbox__header">
                    <h2>{title} screenshots</h2>
                    <span>Select a screenshot to view it larger.</span>
                  </div>
                  <div className="project-lightbox__grid">
                    {screenshots.map((screenshot, index) => (
                      <button key={screenshot} onClick={() => setActiveScreenshot(screenshot)} type="button">
                        <img src={screenshot} alt={`${title} screenshot ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
