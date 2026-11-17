import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type PillTone = "info" | "accent" | "success" | "danger";

const dots: Record<PillTone, string> = {
  info: "bg-info",
  accent: "bg-accent",
  success: "bg-success",
  danger: "bg-danger",
};

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  /** Color del punto. Sin `tone` se muestra una píldora sin punto. */
  tone?: PillTone;
};

/**
 * Píldora con punto de color. El significado se comunica siempre con texto
 * además del color (NEX-DOC-007 §21): quien la use debe incluir la etiqueta.
 */
export function Pill({ tone, className, children, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] rounded-full bg-chip px-2.5 py-1.5 text-xs whitespace-nowrap text-fg",
        className,
      )}
      {...props}
    >
      {tone && <span aria-hidden="true" className={cn("h-[7px] w-[7px] rounded-full", dots[tone])} />}
      {children}
    </span>
  );
}
