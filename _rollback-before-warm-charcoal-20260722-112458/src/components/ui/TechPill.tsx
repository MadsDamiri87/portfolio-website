type TechPillProps = {
  children: React.ReactNode;
  href?: string;
  tone?:
    | "blue"
    | "violet"
    | "green"
    | "amber"
    | "react"
    | "js"
    | "java"
    | "postgres"
    | "html"
    | "css"
    | "test"
    | "network";
};

export function TechPill({ children, href, tone = "blue" }: TechPillProps) {
  const className = `tech-pill tech-pill--${tone}${href ? " tech-pill--link" : ""}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return <span className={className}>{children}</span>;
}
