import type { Metadata } from "next";
import { Suspense } from "react";
import { NewTaskScreen } from "@/features/tasks/new-task-screen";

export const metadata: Metadata = { title: "Nueva tarea · Nexora" };

/** WF-004 Crear tarea. */
export default function NewTaskPage({ params }: PageProps<"/lists/[listId]/tasks/new">) {
  // Con Cache Components los parámetros son datos de la petición: se leen dentro de Suspense.
  return (
    <Suspense fallback={<p role="status" className="text-muted">Cargando…</p>}>
      <NewTask params={params} />
    </Suspense>
  );
}

async function NewTask({ params }: Pick<PageProps<"/lists/[listId]/tasks/new">, "params">) {
  const { listId } = await params;
  // Un identificador no numérico se trata como lista inexistente (id 0).
  const id = /^\d+$/.test(listId) ? Number(listId) : 0;
  return <NewTaskScreen listId={id} />;
}
