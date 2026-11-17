import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "accent" | "warning";

const tones: Record<BadgeTone, string> = {
  accent: "bg-accent-tint text-accent-text",
  warning: "bg-warning-soft text-warning",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

/** Etiqueta corta en mayúsculas: tipo de lista, rol, invitación pendiente… */
export function Badge({ tone = "accent", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold tracking-wider uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
