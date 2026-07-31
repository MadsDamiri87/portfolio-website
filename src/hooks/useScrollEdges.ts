import { useEffect, useRef, useState } from "react";
import { scrollStripByItem } from "../utils/scrollStrip";

const edgeSlop = 8;

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
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const frame = requestAnimationFrame(update);
    const timeout = window.setTimeout(update, 250);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
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
  const scrollByItem = (direction: -1 | 1, smooth = true) =>
    scrollStripByItem(ref.current, direction, smooth);
  return { ref, ...edges, scrollByItem };
}
