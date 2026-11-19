import { cn } from "@/lib/cn";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  /** Glifo decorativo delante del texto (no se lee en voz alta). */
  glyph?: string;
};

type SegmentedProps<T extends string> = {
  /** Nombre del grupo para lectores de pantalla. */
  label: string;
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * Grupo de botones donde solo uno está activo: filtros y selectores de vista
 * (Todas/Personales/Compartidas, Cuadrícula/Lista, Lista/Calendario/Kanban).
 * Cada botón indica su estado con `aria-pressed`.
 */
export function Segmented<T extends string>({ label, options, value, onChange, className }: SegmentedProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex items-center gap-[5px] rounded-[9px] border border-line bg-panel-2 p-1", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-md px-2.5 py-2 text-xs whitespace-nowrap",
              active ? "bg-accent-soft text-fg" : "text-muted hover:text-fg",
            )}
          >
            {option.glyph && (
              <span aria-hidden="true" className="mr-1.5">
                {option.glyph}
              </span>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
