import { useRef } from "react";
import { Footer } from "./Footer";
import { Header } from "../navigation/Header";

type SiteShellProps = {
  activePage: "home" | "about" | "projects" | "cv" | "contact";
  children: React.ReactNode;
};

export function SiteShell({ activePage, children }: SiteShellProps) {
  const mainRef = useRef<HTMLElement>(null);

  // The site routes on the hash, so the skip link moves focus directly
  // instead of navigating to "#main-content" and resetting the route.
  const skipToContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
    mainRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={skipToContent}>
        Skip to content
      </a>
      <Header activePage={activePage} />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
