"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { errorMessage } from "@/services/errors";
import { getLists } from "@/services/lists";
import type { ListSummary, ListType, TaskList } from "@/types/api";
import { ListCard, ListRow } from "./list-card";
import { normalize, plural } from "./list-summary";
import { NewListDialog } from "./new-list-dialog";

type TypeFilter = "all" | ListType;
type Layout = "grid" | "list";

type Load = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; lists: ListSummary[] };

/** La lista por defecto primero; el resto, en el orden de la API. */
function sortLists(lists: ListSummary[]) {
  return [...lists].sort((a, b) => Number(b.is_default) - Number(a.is_default));
}

/**
 * WF-002 Mis listas (RF-10): listas propias y compartidas del usuario.
 * Buscar, filtrar por tipo y cambiar de presentación se hace en el navegador:
 * organizan la vista y no tienen requisito funcional (NEX-DOC-007 §26).
 */
export function ListsScreen() {
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [layout, setLayout] = useState<Layout>("grid");
  const [created, setCreated] = useState<TaskList | null>(null);

  const fetchLists = useCallback(() => {
    let active = true;
    getLists()
      .then((lists) => active && setLoad({ status: "ready", lists: sortLists(lists) }))
      .catch((error: unknown) => active && setLoad({ status: "error", message: errorMessage(error) }));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => fetchLists(), [fetchLists]);

  const lists = useMemo(() => (load.status === "ready" ? load.lists : []), [load]);
  const counts = {
    all: lists.length,
    personal: lists.filter((l) => l.list_type === "personal").length,
    shared: lists.filter((l) => l.list_type === "shared").length,
  };
  const visible = useMemo(() => {
    const q = normalize(query);
    return lists.filter((l) => (type === "all" || l.list_type === type) && (!q || normalize(l.name).includes(q)));
  }, [lists, query, type]);

  return (
    <>
      <PageHeader
        eyebrow="Organización"
        title="Mis listas"
        description="Accede a tus espacios personales y compartidos."
        actions={
          <NewListDialog
            onCreated={(list) => {
              setCreated(list);
              fetchLists();
            }}
          />
        }
      />

      {created && (
        <Alert tone="success">
          Lista «{created.name}» creada.{" "}
          <Link href={`/lists/${created.id}`} className="font-semibold text-accent-text hover:underline">
            Abrir la lista
          </Link>
          <Button variant="ghost" className="ml-3 px-2.5 py-1.5" onClick={() => setCreated(null)}>
            Cerrar aviso
          </Button>
        </Alert>
      )}

      <div className="mb-[17px] flex flex-wrap items-center justify-between gap-3.5">
        <div className="w-full max-w-[330px]">
          <label htmlFor="list-search" className="sr-only">
            Buscar una lista por nombre
          </label>
          <input
            id="list-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="⌕  Buscar una lista..."
            className="w-full rounded-lg border border-line bg-panel-2 px-3.5 py-[13px] text-fg outline-none placeholder:text-muted focus-visible:border-accent"
          />
        </div>
        <Segmented
          label="Filtrar por tipo de lista"
          value={type}
          onChange={setType}
          options={[
            { value: "all", label: `Todas · ${counts.all}` },
            { value: "personal", label: `Personales · ${counts.personal}` },
            { value: "shared", label: `Compartidas · ${counts.shared}` },
          ]}
        />
        <Segmented
          label="Presentación"
          value={layout}
          onChange={setLayout}
          options={[
            { value: "grid", label: "Cuadrícula", glyph: "▦" },
            { value: "list", label: "Lista", glyph: "☷" },
          ]}
        />
      </div>

      <div className="mb-[17px] flex items-center justify-between gap-3.5">
        <h2 className="text-[17px] font-bold">Tus espacios</h2>
        {load.status === "ready" && (
          <span className="text-sm text-muted" aria-live="polite">
            {visible.length === lists.length
              ? plural(lists.length, "lista")
              : `${visible.length} de ${plural(lists.length, "lista")}`}
          </span>
        )}
      </div>

      {load.status === "loading" && (
        <p role="status" className="text-muted">
          Cargando listas…
        </p>
      )}

      {load.status === "error" && (
        <Alert>
          {load.message}{" "}
          <Button
            variant="ghost"
            className="ml-2 px-2.5 py-1.5"
            onClick={() => {
              setLoad({ status: "loading" });
              fetchLists();
            }}
          >
            Reintentar
          </Button>
        </Alert>
      )}

      {load.status === "ready" && visible.length === 0 && (
        <div className="rounded-panel border border-dashed border-line p-8 text-center text-sm text-muted">
          {lists.length === 0
            ? "Todavía no tienes listas. Crea la primera con «Nueva lista»."
            : "Ninguna lista coincide con la búsqueda o el filtro."}
        </div>
      )}

      {load.status === "ready" &&
        visible.length > 0 &&
        (layout === "grid" ? (
          <ul className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((list) => (
              <li key={list.id} className="grid">
                <ListCard list={list} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="rounded-panel border border-line bg-panel px-[22px] py-2">
            {visible.map((list) => (
              <ListRow key={list.id} list={list} />
            ))}
          </ul>
        ))}
    </>
  );
}
