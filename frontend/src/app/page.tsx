import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { TextAreaField, TextField } from "@/components/ui/field";
import { Panel } from "@/components/ui/panel";
import { Pill } from "@/components/ui/pill";

/*
 * Página TEMPORAL que sirve de muestrario de componentes mientras se construyen las
 * piezas de la interfaz. Se reemplazará por el Dashboard (WF-001).
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
      <header>
        <p className="text-2xl font-extrabold tracking-wide">NEXORA</p>
        <p className="mt-1 text-sm text-muted">Muestrario de componentes (temporal).</p>
      </header>

      <section aria-labelledby="botones" className="flex flex-col gap-3">
        <h2 id="botones" className="text-base font-bold">
          Botones
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button>Crear tarea</Button>
          <Button variant="secondary">Marcar todas como leídas</Button>
          <Button variant="ghost">Ver calendario</Button>
          <Button variant="danger">Expulsar</Button>
          <Button disabled>Deshabilitado</Button>
          <ButtonLink href="/" variant="ghost">
            Enlace con aspecto de botón
          </ButtonLink>
        </div>
      </section>

      <section aria-labelledby="etiquetas" className="flex flex-col gap-3">
        <h2 id="etiquetas" className="text-base font-bold">
          Etiquetas y estados
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Personal</Badge>
          <Badge>Compartida</Badge>
          <Badge tone="warning">Pendiente</Badge>
          <Pill tone="info">Por hacer</Pill>
          <Pill tone="accent">En progreso</Pill>
          <Pill tone="success">Hecha</Pill>
          <Pill tone="danger">Vencida</Pill>
          <Pill>Participante</Pill>
        </div>
      </section>

      <Panel
        title="Próximas tareas"
        description="Panel con encabezado, descripción y acción."
        actions={
          <Button variant="ghost" className="shrink-0">
            Ver calendario
          </Button>
        }
      >
        <p className="text-sm text-muted">Contenido del panel.</p>
      </Panel>

      <Panel title="Información de la tarea" description="Campos de formulario (estados de ejemplo).">
        <TextField label="Título *" placeholder="Ej. Preparar presentación del proyecto" />
        <TextAreaField
          label="Descripción"
          optional
          placeholder="Añade detalles, instrucciones o información útil..."
        />
        <TextField
          label="Fecha de vencimiento"
          optional
          type="date"
          hint="Puedes crear tareas sin fecha y añadirla más adelante."
        />
        <TextField label="Correo electrónico" type="email" defaultValue="correo-no-valido" error="Introduce un correo válido." />
      </Panel>
    </main>
  );
}
