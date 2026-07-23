import type { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  icon: Icon,
  variant = "secondary",
}: ButtonLinkProps) {
  return (
    <a className={cn("button", `button--${variant}`)} href={href}>
      <span>{children}</span>
      {Icon ? <Icon size={18} strokeWidth={1.9} /> : null}
    </a>
  );
}
