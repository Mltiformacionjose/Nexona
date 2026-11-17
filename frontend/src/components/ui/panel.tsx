import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  /** Título del panel (encabezado de nivel 2). */
  title?: ReactNode;
  description?: ReactNode;
  /** Controles alineados a la derecha del encabezado. */
  actions?: ReactNode;
};

/** Contenedor con borde y fondo de panel, con encabezado opcional. */
export function Panel({ title, description, actions, className, children, ...props }: PanelProps) {
  const hasHeader = title || description || actions;
  return (
    <section className={cn("rounded-panel border border-line bg-panel p-[22px]", className)} {...props}>
      {hasHeader && (
        <header className="mb-4 flex items-center justify-between gap-3.5">
          <div>
            {title && <h2 className="text-base font-bold">{title}</h2>}
            {description && <p className="mt-1.5 text-xs leading-normal text-muted">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
