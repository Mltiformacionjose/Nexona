import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type AlertTone = "danger" | "success";

const tones: Record<AlertTone, string> = {
  danger: "border-danger/40 bg-danger-soft text-danger-text",
  success: "border-success/40 bg-success/10 text-fg",
};

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone;
};

/**
 * Mensaje general de un formulario (error del servidor, confirmación).
 * Los errores se anuncian a lectores de pantalla con role="alert";
 * las confirmaciones, con role="status".
 */
export function Alert({ tone = "danger", className, ...props }: AlertProps) {
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      className={cn("mb-[17px] rounded-lg border px-3.5 py-3 text-sm leading-normal", tones[tone], className)}
      {...props}
    />
  );
}
