import type { NavItem } from "../types";

// Anything that should open the CV overlay links here; the query survives the
// route match in App.tsx, which strips it before comparing paths. Lives here
// rather than in CvPage so the header can use it without pulling that
// lazy-loaded page into the main bundle.
export const cvOverlayHref = "#/cv?view=cv";

export const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#/about" },
  { label: "Projects", href: "#/projects" },
  { label: "CV", href: "#/cv" },
  { label: "Contact", href: "#/contact" },
];
