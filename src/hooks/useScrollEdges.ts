import { useEffect, useRef, useState } from "react";

/** Ignore a pixel or two of rounding before calling an edge reachable. */
const edgeSlop = 8;

/**
 * Reports whether a horizontal scroller still has content to the left or the
 * right of what is on screen. Used to show a hint only on the side there is
 * somewhere to go.
 *
 * Unlike `useAutoScrollStrip` this only observes: it never moves the element.
 */
export function useScrollEdges<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ canScrollLeft: false, canScrollRight: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const next = {
      canScrollLeft: el.scrollLeft > edgeSlop,
      canScrollRight: maxScroll - el.scrollLeft > edgeSlop,
    };

    setEdges((current) =>
      current.canScrollLeft === next.canScrollLeft && current.canScrollRight === next.canScrollRight
        ? current
        : next,
    );
  };

  // Measure on mount, once painted, and whenever it scrolls or changes size.
  // The scroll listener is attached here rather than through an onScroll prop:
  // scroll events do not bubble, so React's synthetic version is easy to miss.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    const frame = requestAnimationFrame(update);
    const timeout = window.setTimeout(update, 250);

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Catches the row growing or shrinking, e.g. when filters change.
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, ...edges };
}
