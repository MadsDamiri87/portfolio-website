import { useEffect, useRef, useState } from "react";
import { scrollStripByItem } from "../utils/scrollStrip";

type ContinuousMode = {
  kind: "continuous";
  speed: number;
  dotCount: number;
};
type SlideMode = {
  kind: "slide";
  interval: number;
  onAdvance?: () => void;
};
type AutoScrollStripOptions = {
  itemCount: number;

  enabled: boolean;
  resumeDelay: number;
  fadeThreshold?: number;
  edgeFades?: "position" | "scrollable";

  resetKey?: string | number;
  mode: ContinuousMode | SlideMode;
};
export type StripScrollState = {
  activeDot: number;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  atStart: boolean;
  atEnd: boolean;
};
const AUTO_SCROLLING_CLASS = "is-auto-scrolling";
export function useAutoScrollStrip({
  itemCount,
  enabled,
  resumeDelay,
  fadeThreshold = 12,
  edgeFades = "position",
  resetKey,
  mode,
}: AutoScrollStripOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const isPointerOverRef = useRef(false);
  const preciseScrollLeftRef = useRef(0);
  const pauseUntilRef = useRef(0);

  const lastTickRef = useRef<number | null>(null);

  const [state, setState] = useState<StripScrollState>({
    activeDot: 0,
    canScrollLeft: false,
    canScrollRight: false,
    atStart: true,
    atEnd: false,
  });
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const getLoopWidth = () => {
    const loopStart = ref.current?.children[itemCount] as HTMLElement | undefined;
    return loopStart?.offsetLeft ?? 0;
  };
  const getSlideWidth = () => {
    const strip = ref.current;
    const firstSlide = strip?.children[0] as HTMLElement | undefined;
    return firstSlide?.offsetWidth ?? strip?.clientWidth ?? 0;
  };

  const updateScrollState = () => {
    const strip = ref.current;
    if (!strip) return;
    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    const scrollLeft = Math.max(0, strip.scrollLeft);
    const loopWidth = getLoopWidth();
    const loopScroll = loopWidth > 0 ? scrollLeft % loopWidth : scrollLeft;
    let activeDot: number;
    if (modeRef.current.kind === "continuous") {
      const { dotCount } = modeRef.current;
      const progress = loopWidth > 0 ? loopScroll / loopWidth : maxScroll > 0 ? scrollLeft / maxScroll : 0;
      activeDot = Math.min(dotCount - 1, Math.floor(progress * dotCount));
    } else {
      const slideWidth = getSlideWidth();
      activeDot = Math.min(itemCount - 1, slideWidth > 0 ? Math.round(loopScroll / slideWidth) : 0);
    }
    const overflows = maxScroll > fadeThreshold;
    setState((current) => {
      const next = {
        activeDot,
        canScrollLeft: edgeFades === "scrollable" ? overflows : loopScroll > fadeThreshold,
        canScrollRight: edgeFades === "scrollable" ? overflows : maxScroll - scrollLeft > fadeThreshold,
        atStart: scrollLeft <= fadeThreshold,
        atEnd: maxScroll - scrollLeft <= fadeThreshold,
      };
      if (
        current.activeDot === next.activeDot &&
        current.canScrollLeft === next.canScrollLeft &&
        current.canScrollRight === next.canScrollRight &&
        current.atStart === next.atStart &&
        current.atEnd === next.atEnd
      ) {
        return current;
      }
      return next;
    });
  };
  const pause = () => {
    preciseScrollLeftRef.current = ref.current?.scrollLeft ?? preciseScrollLeftRef.current;
    ref.current?.classList.remove(AUTO_SCROLLING_CLASS);
    pauseUntilRef.current = performance.now() + resumeDelay;
    if (modeRef.current.kind === "slide") lastTickRef.current = null;
  };
  const handlePointerEnter = () => {
    isPointerOverRef.current = true;
    ref.current?.classList.remove(AUTO_SCROLLING_CLASS);
  };

  const handlePointerLeave = () => {
    isPointerOverRef.current = false;
    pause();
  };
  const handleScroll = () => {
    if (!ref.current?.classList.contains(AUTO_SCROLLING_CLASS)) {
      preciseScrollLeftRef.current = ref.current?.scrollLeft ?? preciseScrollLeftRef.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount]);

  useEffect(() => {
    if (resetKey === undefined) return;
    preciseScrollLeftRef.current = 0;
    ref.current?.scrollTo({ left: 0 });
    updateScrollState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, itemCount]);

  useEffect(() => {
    if (!enabled) {
      ref.current?.classList.remove(AUTO_SCROLLING_CLASS);
      return;
    }
    let frame = 0;
    let loopResetTimeout = 0;
    const resetLoop = (strip: HTMLDivElement) => {
      const previousScrollBehavior = strip.style.scrollBehavior;
      strip.style.scrollBehavior = "auto";
      strip.scrollLeft = 0;
      strip.style.scrollBehavior = previousScrollBehavior;
      preciseScrollLeftRef.current = 0;
      updateScrollState();
    };
    const tick = (time: number) => {
      const strip = ref.current;
      const currentMode = modeRef.current;

      if (strip) {
        const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
        const running =
          itemCount > 1 &&
          maxScroll > fadeThreshold &&
          time >= pauseUntilRef.current &&
          !isPointerOverRef.current &&
          !document.hidden;
        if (running) {
          strip.classList.add(AUTO_SCROLLING_CLASS);

          if (currentMode.kind === "continuous") {
            const lastFrame = lastTickRef.current ?? time;
            const delta = Math.min(time - lastFrame, 48);
            const loopWidth = getLoopWidth();
            let nextScroll = preciseScrollLeftRef.current + delta * currentMode.speed;
            if (loopWidth > 0 && nextScroll >= loopWidth) nextScroll %= loopWidth;
            preciseScrollLeftRef.current = Math.min(maxScroll, nextScroll);
            strip.scrollLeft = preciseScrollLeftRef.current;
          } else {
            if (lastTickRef.current === null) lastTickRef.current = time;

            if (time - lastTickRef.current >= currentMode.interval) {
              const slideWidth = getSlideWidth();
              const loopWidth = getLoopWidth();
              const loopScroll = loopWidth > 0 ? strip.scrollLeft % loopWidth : strip.scrollLeft;
              const currentSlide = slideWidth > 0 ? Math.round(loopScroll / slideWidth) : 0;
              const nextSlide = currentSlide + 1;
              const target = nextSlide * slideWidth;
              preciseScrollLeftRef.current = target;
              currentMode.onAdvance?.();
              strip.scrollTo({ left: target, behavior: "smooth" });
              if (nextSlide >= itemCount) {
                window.clearTimeout(loopResetTimeout);
                loopResetTimeout = window.setTimeout(() => resetLoop(strip), 900);
              }
              lastTickRef.current = time;
            }
          }
          updateScrollState();
        } else {
          strip.classList.remove(AUTO_SCROLLING_CLASS);
          if (currentMode.kind === "slide") lastTickRef.current = null;
        }
      }
      if (modeRef.current.kind === "continuous") lastTickRef.current = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(loopResetTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount, enabled]);
  const scrollToDot = (dotIndex: number) => {
    const strip = ref.current;
    if (!strip) return;
    pause();
    const currentMode = modeRef.current;
    let target: number;

    if (currentMode.kind === "continuous") {
      target = getLoopWidth() * (dotIndex / currentMode.dotCount);
    } else {
      target = getSlideWidth() * dotIndex;
      currentMode.onAdvance?.();
    }

    preciseScrollLeftRef.current = target;
    strip.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollByItem = (direction: -1 | 1) => {
    pause();
    scrollStripByItem(ref.current, direction, enabled);
  };
  const stripProps = {
    onFocus: pause,
    onKeyDown: pause,
    onPointerDown: pause,
    onScroll: handleScroll,
    onTouchStart: pause,
    onWheel: pause,
  };

  const hoverProps = {
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
  };

  return { ref, state, pause, scrollToDot, scrollByItem, stripProps, hoverProps };
}