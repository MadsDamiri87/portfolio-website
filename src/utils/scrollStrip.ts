export function scrollStripByItem(strip: HTMLElement | null, direction: -1 | 1, smooth: boolean) {
  const item = strip?.children[0] as HTMLElement | undefined;
  if (!strip || !item) return;
  const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
  strip.scrollBy({
    left: (item.offsetWidth + gap) * direction,
    behavior: smooth ? "smooth" : "auto",
  });
}
export function loopCopies(itemCount: number, minItems = 10) {
  return Math.max(2, Math.ceil(minItems / Math.max(1, itemCount)));
}