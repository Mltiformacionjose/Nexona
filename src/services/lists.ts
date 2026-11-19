import type { Id, ListCreateInput, ListMember, ListSummary, TaskList } from "@/types/api";
import { API_MODE } from "./config";
import { request } from "./http";
import { mockDb } from "./mock/db";

/** GET /lists — RF-10. Listas propias y compartidas conmigo, incluida «Mis tareas», con su resumen. */
export function getLists(): Promise<ListSummary[]> {
  if (API_MODE === "mock") return mockDb.getLists();
  return request<ListSummary[]>("/lists");
}

/** POST /lists — RF-08 (personal), RF-09 (compartida). */
export function createList(input: ListCreateInput): Promise<TaskList> {
  if (API_MODE === "mock") return mockDb.createList(input);
  return request<TaskList>("/lists", { method: "POST", body: input });
}

/** GET /lists/{list_id} — RF-10. 404 si no existe o no es accesible. */
export function getList(listId: Id): Promise<TaskList> {
  if (API_MODE === "mock") return mockDb.getList(listId);
  return request<TaskList>(`/lists/${listId}`);
}

/** GET /lists/{list_id}/members — RF-24. */
export function getMembers(listId: Id): Promise<ListMember[]> {
  if (API_MODE === "mock") return mockDb.getMembers(listId);
  return request<ListMember[]>(`/lists/${listId}/members`);
}
