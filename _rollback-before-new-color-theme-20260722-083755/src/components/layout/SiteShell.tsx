import { Footer } from "./Footer";
import { Header } from "../navigation/Header";

type SiteShellProps = {
  activePage: "home" | "about" | "projects" | "cv" | "contact";
  children: React.ReactNode;
};

export function SiteShell({ activePage, children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <Header activePage={activePage} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
