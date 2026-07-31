import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Layers,
  Monitor,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import projectDetailBackground from "../../assets/images/project-detail-system-map-bg.webp";
import { useAutoScrollStrip } from "../../hooks/useAutoScrollStrip";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import type { Project } from "../../types";
import { loopCopies } from "../../utils/scrollStrip";
import { tagTone, techProjectHref } from "../projects/ProjectCard";
import { StripArrows } from "../ui/StripArrows";
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

/** 1 -> "1st semester", 2 -> "2nd semester", and so on. */
function formatSemester(semester?: number) {
  if (!semester) return "Not listed";

  const suffix = semester === 1 ? "st" : semester === 2 ? "nd" : semester === 3 ? "rd" : "th";

  return `${semester}${suffix} semester`;
}

function DiagramPreview({ image }: { image?: string }) {
  return (
    <div className="detail-diagram-preview" aria-hidden="true">
      {image ? (
        <img src={image} alt="" loading="lazy" decoding="async" />
      ) : (
        <>
          <span />
          <span />
          <span />
          <span />
          <span />
        </>
      )}
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
  const prefersReducedMotion = usePrefersReducedMotion();
  const lightboxPanelRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const technicalChoiceTransitionTimeoutRef = useRef<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [activeDocument, setActiveDocument] = useState<{ image: string; title: string } | null>(null);
  const [isTechnicalChoiceTransitioning, setIsTechnicalChoiceTransitioning] = useState(false);
  const detail = project.detail;
  const title = detail?.displayTitle ?? project.title;
  const screenshots = useMemo(
    () => (project.screenshots?.length ? project.screenshots : [project.image]),
    [project.screenshots, project.image],
  );
  const activeScreenshotIndex = activeScreenshot ? screenshots.indexOf(activeScreenshot) : -1;
  const heroScreenshots = screenshots.slice(0, 3);
  const documentationItems = useMemo(() => detail?.documentation ?? [], [detail?.documentation]);
  const documentationDotCount = Math.min(maxDocumentationDotCount, Math.max(1, documentationItems.length));

  const loopedDocumentationItems = useMemo(() => {
    if (documentationItems.length < 2) return documentationItems;

    return Array.from({ length: loopCopies(documentationItems.length) }, () => documentationItems).flat();
  }, [documentationItems]);
  const technicalChoices = useMemo(() => detail?.technicalChoices ?? [], [detail?.technicalChoices]);
  const technicalChoiceSlides = useMemo(() => buildTechnicalChoiceSlides(technicalChoices), [technicalChoices]);
  const loopedTechnicalChoiceSlides = useMemo(
    () => (technicalChoiceSlides.length > 1 ? [...technicalChoiceSlides, ...technicalChoiceSlides] : technicalChoiceSlides),
    [technicalChoiceSlides],
  );

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

  useEffect(() => {
    return () => {
      if (technicalChoiceTransitionTimeoutRef.current) {
        window.clearTimeout(technicalChoiceTransitionTimeoutRef.current);
      }
    };
  }, []);

  const documentationStrip = useAutoScrollStrip({
    itemCount: documentationItems.length,
    enabled: !prefersReducedMotion,
    resumeDelay: documentationAutoResumeDelay,
    fadeThreshold: documentationFadeThreshold,
    mode: {
      kind: "continuous",
      speed: documentationAutoScrollSpeed,
      dotCount: documentationDotCount,
    },
  });

  const technicalChoiceStrip = useAutoScrollStrip({
    itemCount: technicalChoiceSlides.length,
    enabled: !prefersReducedMotion,
    resumeDelay: technicalChoiceAutoResumeDelay,
    fadeThreshold: technicalChoiceFadeThreshold,
    resetKey: project.slug,
    mode: {
      kind: "slide",
      interval: technicalChoiceAutoRotationInterval,
      onAdvance: showTechnicalChoiceTransitionFade,
    },
  });

  const openLightbox = (event: { currentTarget: HTMLElement }) => {
    lastFocusedElementRef.current = event.currentTarget;
    setIsGalleryOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setIsGalleryOpen(false);
    setActiveScreenshot(null);
    setActiveDocument(null);
  }, []);

  const showPreviousScreenshot = () => {
    if (activeScreenshotIndex <= 0) return;

    setActiveScreenshot(screenshots[activeScreenshotIndex - 1]);
  };

  const showNextScreenshot = () => {
    if (activeScreenshotIndex < 0 || activeScreenshotIndex >= screenshots.length - 1) return;

    setActiveScreenshot(screenshots[activeScreenshotIndex + 1]);
  };

  const showPreviousScreenshotRef = useRef(showPreviousScreenshot);
  const showNextScreenshotRef = useRef(showNextScreenshot);
  showPreviousScreenshotRef.current = showPreviousScreenshot;
  showNextScreenshotRef.current = showNextScreenshot;

  useEffect(() => {
    if (!isGalleryOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") showPreviousScreenshotRef.current();
      if (event.key === "ArrowRight") showNextScreenshotRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    const restoreFocusTo = lastFocusedElementRef.current;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      lightboxPanelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      restoreFocusTo?.focus();
    };
  }, [isGalleryOpen, closeLightbox]);

  const facts = [
    { label: "Completed", value: detail?.timeline ?? project.year ?? "In progress", icon: Calendar },
    { label: "Development Time", value: detail?.duration ?? "Project period", icon: Monitor },
    { label: "Semester", value: formatSemester(project.semester), icon: GraduationCap },
    { label: "Role", value: detail?.role ?? "Developer", icon: UserRound },
    { label: "Type", value: project.type ?? project.category, icon: Layers },
    { label: "Team Size", value: detail?.teamSize ?? "Project team", icon: Users },
  ];

  return (
    <section className="project-detail-page">
      <img className="project-detail-page__background" src={projectDetailBackground} alt="" aria-hidden="true" />
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
                <TechPill href={techProjectHref(tag)} key={tag} tone={tagTone(tag)}>
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
                onClick={(event) => {
                  setActiveDocument(null);
                  setActiveScreenshot(screenshot);
                  openLightbox(event);
                }}
                type="button"
              >
                <img
                  src={screenshot}
                  alt={`${title} screenshot ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
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
                  "strip-arrows-shell",
                  technicalChoiceStrip.state.canScrollLeft ? "has-left-fade" : "",
                  technicalChoiceStrip.state.canScrollRight ? "has-right-fade" : "",
                  isTechnicalChoiceTransitioning ? "is-transitioning" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--strip-arrow-fade-out": `${technicalChoiceAutoResumeDelay}ms` } as React.CSSProperties}
                {...technicalChoiceStrip.hoverProps}
              >
                <StripArrows
                  backLabel="Show previous technical choices"
                  canGoBack={!technicalChoiceStrip.state.atStart}
                  canGoForward={!technicalChoiceStrip.state.atEnd}
                  forwardLabel="Show next technical choices"
                  onBack={() => technicalChoiceStrip.scrollByItem(-1)}
                  onForward={() => technicalChoiceStrip.scrollByItem(1)}
                />
                <div
                  className="technical-choice-slide-track"
                  {...technicalChoiceStrip.stripProps}
                  ref={technicalChoiceStrip.ref}
                >
                  {loopedTechnicalChoiceSlides.map((slide, slideIndex) => (
                    <div className="technical-choice-slide" key={`${slide.category}-${slideIndex}`}>
                      <div className="technical-choice-category">
                        <span>{slide.category}</span>
                      </div>
                      <div className="technical-choice-grid">
                        {slide.choices.map((choice, choiceIndex) => (
                          <article className="technical-choice" key={`${choice.title}-${choiceIndex}`}>
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
                      className={technicalChoiceStrip.state.activeDot === index ? "is-active" : ""}
                      key={index}
                      onClick={() => technicalChoiceStrip.scrollToDot(index)}
                      type="button"
                    />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section className="project-detail-section project-gallery-panel">
            <div className="project-screenshot-stack">
              {screenshots.slice(0, 5).map((screenshot, index) => (
                <button
                  aria-label={`Open ${title} gallery`}
                  className={`project-screenshot-stack__item project-screenshot-stack__item--${index + 1}`}
                  key={screenshot}
                  onClick={(event) => {
                    setActiveScreenshot(null);
                    setActiveDocument(null);
                    openLightbox(event);
                  }}
                  type="button"
                >
                  <img src={screenshot} alt="" loading="lazy" decoding="async" />
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
                "strip-arrows-shell",
                documentationStrip.state.canScrollLeft ? "has-left-fade" : "",
                documentationStrip.state.canScrollRight ? "has-right-fade" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--strip-arrow-fade-out": `${documentationAutoResumeDelay}ms` } as React.CSSProperties}
              {...documentationStrip.hoverProps}
            >
              <StripArrows
                backLabel="Show previous documents"
                canGoBack={!documentationStrip.state.atStart}
                canGoForward={!documentationStrip.state.atEnd}
                forwardLabel="Show next documents"
                onBack={() => documentationStrip.scrollByItem(-1)}
                onForward={() => documentationStrip.scrollByItem(1)}
              />
              <div
                className="documentation-grid"
                {...documentationStrip.stripProps}
                ref={documentationStrip.ref}
              >
                {loopedDocumentationItems.map((item, index) => (
                  <button
                    className="documentation-card"
                    key={`${item.title}-${index}`}
                    onClick={(event) => {
                      setActiveScreenshot(null);
                      setActiveDocument(item.image ? { image: item.image, title: item.title } : null);
                      openLightbox(event);
                    }}
                    type="button"
                  >
                    <DiagramPreview image={item.image} />
                    <div>
                      <span>{item.type ?? "Document"}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {documentationItems.length > 1 ? (
              <div className="documentation-strip-dots" aria-label="Documentation strip position">
                {Array.from({ length: documentationDotCount }).map((_, index) => (
                  <button
                    aria-label={`Go to documentation group ${index + 1}`}
                    className={documentationStrip.state.activeDot === index ? "is-active" : ""}
                    key={index}
                    onClick={() => documentationStrip.scrollToDot(index)}
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
              onClick={closeLightbox}
              type="button"
              aria-label="Close gallery"
            />
            <div
              className={activeScreenshot || activeDocument ? "project-lightbox__panel is-viewing-image" : "project-lightbox__panel"}
              ref={lightboxPanelRef}
            >
              <button
                className="project-lightbox__close"
                onClick={() => {
                  if (activeScreenshot) {
                    setActiveScreenshot(null);
                    return;
                  }

                  closeLightbox();
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
                  <div
                    className={
                      screenshots.length > 1
                        ? "project-lightbox__image-stage project-lightbox__image-stage--has-nav"
                        : "project-lightbox__image-stage"
                    }
                  >
                    {screenshots.length > 1 ? (
                      <button
                        aria-label="Previous screenshot"
                        className="project-lightbox__nav project-lightbox__nav--previous"
                        disabled={activeScreenshotIndex <= 0}
                        onClick={showPreviousScreenshot}
                        type="button"
                      >
                        <ChevronLeft size={24} strokeWidth={1.9} />
                      </button>
                    ) : null}
                    <img className="project-lightbox__image" src={activeScreenshot} alt={`${title} selected screenshot`} />
                    {screenshots.length > 1 ? (
                      <button
                        aria-label="Next screenshot"
                        className="project-lightbox__nav project-lightbox__nav--next"
                        disabled={activeScreenshotIndex >= screenshots.length - 1}
                        onClick={showNextScreenshot}
                        type="button"
                      >
                        <ChevronRight size={24} strokeWidth={1.9} />
                      </button>
                    ) : null}
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
                        <img
                          src={screenshot}
                          alt={`${title} screenshot ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                        />
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
