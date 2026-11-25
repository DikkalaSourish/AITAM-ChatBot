import { Link } from "@tanstack/react-router";

import logo from "@/assets/aitam-logo.png";
import { cn } from "@/lib/utils";

/** Shared institutional mark for the AITAM AI Assistant. */
export function BrandMark({
  className,
  size = "md",
  withText = true,
  asLink = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  asLink?: boolean;
}) {
  const dimension = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const content = (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <img
        src={logo}
        alt="AITAM institutional logo"
        className={cn(dimension, "shrink-0 object-contain")}
      />
      {withText && (
        <span className="min-w-0">
          <span className="block truncate font-display text-base leading-tight font-semibold text-foreground">
            AITAM AI Assistant
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Aditya Institute of Technology and Management
          </span>
        </span>
      )}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" className="min-w-0">
      {content}
    </Link>
  );
}
