import type { ListSummary, ListType } from "@/types/api";

export const LIST_TYPE_LABEL: Record<ListType, string> = { personal: "Personal", shared: "Compartida" };

/** «1 tarea», «3 tareas»… */
export function plural(count: number, singular: string, pluralForm = `${singular}s`) {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

/** Porcentaje de tareas hechas, redondeado. Una lista vacía cuenta como 0 %. */
export function progress(list: ListSummary) {
  return list.task_count ? Math.round((list.done_count / list.task_count) * 100) : 0;
}

/** Descripción que se muestra en la tarjeta. */
export function listDescription(list: ListSummary) {
  if (list.description) return list.description;
  if (list.is_default) return "Tus tareas que no pertenecen a otra lista.";
  return "Sin descripción.";
}

/** Compara sin distinguir mayúsculas ni tildes («lucia» encuentra «Lucía»). */
export function normalize(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}
