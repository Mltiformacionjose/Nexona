/**
 * Tipos de los datos que intercambian frontend y backend.
 *
 * Reflejan el contrato de API (PROPUESTA, sin endpoints implementados) y el
 * modelo de datos v0.6 (PROPUESTA). Los nombres van en snake_case porque así
 * los devolverá FastAPI. Cuando exista OpenAPI, este archivo debe ajustarse a
 * él (ADR-0009): OpenAPI manda.
 */

export type Id = number;

/** Valores de `tasks.status` (CHECK ck_tasks_status). */
export type TaskStatus = "todo" | "in_progress" | "done";

/** Valores de `task_lists.list_type` (CHECK ck_task_lists_type). */
export type ListType = "personal" | "shared";

/** Perfil público del usuario (nunca incluye la contraseña). */
export type User = {
  id: Id;
  username: string;
  email: string;
};

export type TaskList = {
  id: Id;
  name: string;
  description: string | null;
  list_type: ListType;
  owner_id: Id;
  /** Lista personal por defecto «Mis tareas», creada al registrarse (modelo v0.6). */
  is_default: boolean;
};

/**
 * Lista con el resumen que muestra WF-002 Mis listas (GET /lists).
 * Los recuentos son una PROPUESTA del contrato de API (v0.3): evitan pedir
 * las tareas de cada lista solo para contarlas.
 */
export type ListSummary = TaskList & {
  task_count: number;
  done_count: number;
  /** Propietario más participantes con la invitación aceptada. */
  member_count: number;
};

/** Participante de una lista (incluye al propietario). */
export type ListMember = {
  user_id: Id;
  username: string;
  is_owner: boolean;
};

export type Task = {
  id: Id;
  list_id: Id;
  title: string;
  description: string | null;
  /** Fecha sin hora, `AAAA-MM-DD`. */
  due_date: string | null;
  status: TaskStatus;
  creator_id: Id;
  assignee_ids: Id[];
  completed_at: string | null;
  created_at: string;
};

/* ---------- Cuerpos de petición ---------- */

/** POST /auth/register */
export type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

/** POST /auth/login */
export type LoginInput = {
  email: string;
  password: string;
};

/** POST /lists — RF-08, RF-09. La lista nueva nunca es la lista por defecto. */
export type ListCreateInput = {
  name: string;
  description: string | null;
  list_type: ListType;
};

/** POST /lists/{list_id}/tasks. El estado inicial lo fija el backend («todo»). */
export type TaskCreateInput = {
  title: string;
  description: string | null;
  due_date: string | null;
  assignee_ids: Id[];
};

/* ---------- Errores ---------- */

/** Estructura de error propuesta en API_CONTRACT §3. */
export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    fields?: string[];
  };
};
