import { useEffect, useState } from "react";

/**
 * Tracks a media query and re-renders when it flips, so layout decisions that
 * CSS cannot express - swapping an element for another kind of element, say -
 * can follow the same breakpoints as the stylesheet.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" || !window.matchMedia ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
