import { ChevronLeft, ChevronRight } from "lucide-react";

type StripArrowsProps = {
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  backLabel: string;
  forwardLabel: string;
};

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