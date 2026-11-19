"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { errorMessage } from "@/services/errors";
import { getList } from "@/services/lists";
import type { TaskList } from "@/types/api";
import { LIST_TYPE_LABEL } from "./list-summary";

/**
 * TEMPORAL: destino de las tarjetas de WF-002 hasta que exista WF-003 Detalle
 * de lista. Solo muestra la lista y el acceso a «Nueva tarea».
 */
export function ListDetailPlaceholder({ listId }: { listId: number }) {
  const [list, setList] = useState<TaskList | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getList(listId)
      .then((l) => active && setList(l))
      .catch((e: unknown) => active && setError(errorMessage(e)));
    return () => {
      active = false;
    };
  }, [listId]);

  const back = (
    <Link href="/lists" className="hover:underline">
      Mis listas
    </Link>
  );

  if (error) {
    return (
      <>
        <PageHeader eyebrow={back} title="Lista" />
        <Alert>{error}</Alert>
      </>
    );
  }
  if (!list) {
    return (
      <p role="status" className="text-muted">
        Cargando lista…
      </p>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={back}
        title={list.name}
        description={list.description ?? undefined}
        actions={<ButtonLink href={`/lists/${list.id}/tasks/new`}>＋ Nueva tarea</ButtonLink>}
      />
      <Panel title="Detalle de la lista en construcción">
        <p className="mb-3 text-sm leading-normal text-muted">
          Las tareas, los participantes y las vistas Calendario y Kanban llegarán con la pantalla WF-003.
        </p>
        <Badge>{LIST_TYPE_LABEL[list.list_type]}</Badge>
      </Panel>
    </>
  );
}
