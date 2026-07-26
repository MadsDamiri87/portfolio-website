type TechPillProps = {
  children: React.ReactNode;
  href?: string;
  plain?: boolean;
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

export function TechPill({ children, href, plain = false, tone = "blue" }: TechPillProps) {
  const className = `tech-pill tech-pill--${tone}${href ? " tech-pill--link" : ""}${plain ? " tech-pill--plain" : ""}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return <span className={className}>{children}</span>;
}
