import { ChevronLeft, ChevronRight } from "lucide-react";

type StripArrowsProps = {
  /** Move one item towards the start. */
  onBack: () => void;
  /** Move one item towards the end. */
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  backLabel: string;
  forwardLabel: string;
};

/**
 * The pair of chevrons that sit over a horizontal strip. They fade in while the
 * strip is hovered or focused and fade back out over the same stretch of time
 * the strip waits before it resumes moving on its own, so the hint is gone by
 * the time it starts again.
 *
 * Render inside an element that is `position: relative` and carries
 * `strip-arrows-shell`; the fade-out length comes from `--strip-arrow-fade-out`
 * on that same element.
 */
export function StripArrows({
  onBack,
  onForward,
  canGoBack,
  canGoForward,
  backLabel,
  forwardLabel,
}: StripArrowsProps) {
  return (
    <>
      <button
        aria-label={backLabel}
        className="strip-arrow strip-arrow--back"
        disabled={!canGoBack}
        onClick={onBack}
        type="button"
      >
        <ChevronLeft size={20} strokeWidth={2.1} />
      </button>
      <button
        aria-label={forwardLabel}
        className="strip-arrow strip-arrow--forward"
        disabled={!canGoForward}
        onClick={onForward}
        type="button"
      >
        <ChevronRight size={20} strokeWidth={2.1} />
      </button>
    </>
  );
}
