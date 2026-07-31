/**
 * Moves a horizontal strip by exactly one item — one project card, one
 * documentation card, one slide — measured from the layout so it keeps up when
 * the cards resize.
 */
export function scrollStripByItem(strip: HTMLElement | null, direction: -1 | 1, smooth: boolean) {
  const item = strip?.children[0] as HTMLElement | undefined;
  if (!strip || !item) return;

  const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
  strip.scrollBy({
    left: (item.offsetWidth + gap) * direction,
    behavior: smooth ? "smooth" : "auto",
  });
}

/**
 * How many times a set of items has to be repeated for a seamless loop.
 *
 * The strip wraps by subtracting one set's width, which it can only reach if
 * the scrollable distance is longer than that set. Two copies are enough for a
 * long set, but a short one — two documentation cards, say — is narrower than
 * the strip itself, so it needs more.
 */
export function loopCopies(itemCount: number, minItems = 10) {
  return Math.max(2, Math.ceil(minItems / Math.max(1, itemCount)));
}
