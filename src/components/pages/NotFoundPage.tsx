import { ArrowLeft, Compass } from "lucide-react";

type NotFoundPageProps = {
  variant?: "page" | "project";
};

const copy = {
  page: {
    title: "Page not found",
    description: "That link does not point to a page on this site. It may be outdated or mistyped.",
    actionHref: "#home",
    actionLabel: "Back to home",
  },
  project: {
    title: "Project not found",
    description:
      "That project does not exist, or it has been renamed. The full archive is still one click away.",
    actionHref: "#/projects",
    actionLabel: "Back to projects",
  },
};

export function NotFoundPage({ variant = "page" }: NotFoundPageProps) {
  const { title, description, actionHref, actionLabel } = copy[variant];

  return (
    <section className="not-found-page">
      <div className="container not-found-page__inner">
        <span className="not-found-page__mark" aria-hidden="true">
          <Compass size={30} strokeWidth={1.7} />
        </span>
        <p className="not-found-page__code">404</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <a className="button button--primary" href={actionHref}>
          <ArrowLeft size={18} strokeWidth={1.9} />
          <span>{actionLabel}</span>
        </a>
      </div>
    </section>
  );
}
