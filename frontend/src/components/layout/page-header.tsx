import type { ReactNode } from "react";

type PageHeaderProps = {
  /** Migas de pan o antetítulo, encima del título. */
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  /** Botones o etiquetas a la derecha. */
  actions?: ReactNode;
};

/** Encabezado de las pantallas con sesión. */
export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="mb-7 flex flex-col items-start justify-between gap-5 md:flex-row">
      <div>
        {eyebrow && (
          <div className="mb-2.5 text-xs font-extrabold tracking-[0.09em] text-accent-text uppercase">{eyebrow}</div>
        )}
        <h1 className="mb-2 text-2xl leading-tight font-bold tracking-[-0.03em] md:text-[29px]">{title}</h1>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {actions}
    </header>
  );
}
