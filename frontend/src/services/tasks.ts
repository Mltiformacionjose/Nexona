import type { Id, Task, TaskCreateInput } from "@/types/api";
import { API_MODE } from "./config";
import { request } from "./http";
import { mockDb } from "./mock/db";

/** POST /lists/{list_id}/tasks — RF-19, RF-20. */
export function createTask(listId: Id, input: TaskCreateInput): Promise<Task> {
  if (API_MODE === "mock") return mockDb.createTask(listId, input);
  return request<Task>(`/lists/${listId}/tasks`, { method: "POST", body: input });
}
