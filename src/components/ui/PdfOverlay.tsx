import { Download, ExternalLink, FileText, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type PdfOverlayProps = {
  src: string;
  title: string;
  downloadName?: string;
  onClose: () => void;
};

export function PdfOverlay({ src, title, downloadName, onClose }: PdfOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Touch devices (phones/tablets) cannot scroll a PDF embedded in an iframe:
  // iOS Safari renders only the first page, Android usually shows nothing. On
  // those we skip the embed and send people to the native viewer instead.
  const [canEmbed, setCanEmbed] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setCanEmbed(!query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    }, 0);

    const elementToRestore = restoreFocusRef.current;

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      elementToRestore?.focus();
    };
  }, [close]);

  return (
    <div className="pdf-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <button className="pdf-overlay__backdrop" onClick={close} type="button" aria-label={`Close ${title}`} />

      <div className="pdf-overlay__panel" ref={panelRef}>
        <div className="pdf-overlay__bar">
          <h2>{title}</h2>
          <div className="pdf-overlay__actions">
            <a className="button button--secondary button--compact" href={src} target="_blank" rel="noreferrer">
              Open in new tab
              <ExternalLink size={15} strokeWidth={1.9} />
            </a>
            <a className="button button--secondary button--compact" href={src} download={downloadName}>
              Download
              <Download size={15} strokeWidth={1.9} />
            </a>
            <button className="pdf-overlay__close" onClick={close} type="button" aria-label="Close">
              <X size={20} strokeWidth={1.9} />
            </button>
          </div>
        </div>

        <div className="pdf-overlay__stage">
          {canEmbed ? (
            <iframe src={`${src}#view=FitH`} title={title} />
          ) : (
            <div className="pdf-overlay__fallback">
              <FileText size={40} strokeWidth={1.6} />
              <p>
                Inline preview is not supported on mobile browsers. Open the PDF in your
                viewer to read and scroll through every page.
              </p>
              <div className="pdf-overlay__fallback-actions">
                <a className="button button--primary" href={src} target="_blank" rel="noreferrer">
                  Open PDF
                  <ExternalLink size={17} strokeWidth={1.9} />
                </a>
                <a className="button button--secondary" href={src} download={downloadName}>
                  Download
                  <Download size={17} strokeWidth={1.9} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
