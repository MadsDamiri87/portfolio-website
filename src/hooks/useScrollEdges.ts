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

  // Measure on mount, once painted, and whenever the box changes width.
  useEffect(() => {
    update();
    const frame = requestAnimationFrame(update);
    const timeout = window.setTimeout(update, 250);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, ...edges, onScroll: update };
}
