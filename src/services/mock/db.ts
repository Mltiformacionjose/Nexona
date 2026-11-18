/**
 * Base de datos simulada para el modo `mock`.
 *
 * Imita las restricciones del modelo v0.6 (NEX-DOC-005, PROPUESTA) y las
 * respuestas del contrato de API, para que las pantallas se comporten igual
 * que con el backend real. Vive en el navegador (sessionStorage): se pierde al
 * cerrar la pestaña. NO es una base de datos ni sustituye a las pruebas del backend.
 *
 * Como en el modelo v0.6 no hay tabla de membresías: los miembros de una lista
 * son su propietario y las invitaciones aceptadas. Cada cuenta tiene una lista
 * personal por defecto, «Mis tareas».
 *
 * Cuenta de demostración: demo@nexora.app / nexora-demo-1234
 */

import type { Id, LoginInput, RegisterInput, Task, TaskCreateInput, TaskList, User } from "@/types/api";
import { ApiError } from "../errors";

type MockUser = User & { password: string };
type InvitationStatus = "pending" | "accepted" | "rejected" | "cancelled" | "removed";
type MockInvitation = { id: Id; list_id: Id; invited_user_id: Id; status: InvitationStatus };
type MockState = {
  users: MockUser[];
  lists: TaskList[];
  invitations: MockInvitation[];
  tasks: Task[];
  sessionUserId: Id | null;
};

// Cambia con el modelo para no leer datos guardados con la forma anterior.
const STORAGE_KEY = "nexora-mock-db-v0.6";

const DEFAULT_LIST_NAME = "Mis tareas";

function seed(): MockState {
  return {
    users: [
      { id: 1, username: "demo", email: "demo@nexora.app", password: "nexora-demo-1234" },
      { id: 2, username: "Alex", email: "alex@nexora.app", password: "alex-password-1234" },
      { id: 3, username: "Lucía", email: "lucia@nexora.app", password: "lucia-password-1234" },
    ],
    lists: [
      { id: 1, name: "Proyecto Nexora", description: null, list_type: "shared", owner_id: 1, is_default: false },
      { id: 2, name: DEFAULT_LIST_NAME, description: null, list_type: "personal", owner_id: 1, is_default: true },
      { id: 3, name: DEFAULT_LIST_NAME, description: null, list_type: "personal", owner_id: 2, is_default: true },
      { id: 4, name: DEFAULT_LIST_NAME, description: null, list_type: "personal", owner_id: 3, is_default: true },
    ],
    // Alex y Lucía aceptaron la invitación a «Proyecto Nexora»: son miembros.
    invitations: [
      { id: 1, list_id: 1, invited_user_id: 2, status: "accepted" },
      { id: 2, list_id: 1, invited_user_id: 3, status: "accepted" },
    ],
    tasks: [],
    sessionUserId: null,
  };
}

let state: MockState | null = null;

function load(): MockState {
  if (state) return state;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    state = saved ? (JSON.parse(saved) as MockState) : seed();
  } catch {
    state = seed();
  }
  return state;
}

function save() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Sin almacenamiento disponible: los datos duran hasta recargar.
  }
}

/** Simula la latencia de red para ver los estados de carga. */
function delay() {
  return new Promise((resolve) => setTimeout(resolve, 350));
}

function publicUser({ id, username, email }: MockUser): User {
  return { id, username, email };
}

function nextId(rows: { id: Id }[]) {
  return rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
}

function requireSession(db: MockState): MockUser {
  const user = db.users.find((u) => u.id === db.sessionUserId);
  if (!user) throw new ApiError(401, "not_authenticated", "Tu sesión ha caducado. Inicia sesión de nuevo.");
  return user;
}

/** Miembros de una lista: el propietario más las invitaciones aceptadas (modelo v0.6). */
function memberIds(db: MockState, list: TaskList): Id[] {
  const accepted = db.invitations
    .filter((i) => i.list_id === list.id && i.status === "accepted")
    .map((i) => i.invited_user_id);
  return [list.owner_id, ...accepted];
}

/** Lista accesible para el usuario; si no es miembro responde 404 (no revela su existencia). */
function requireList(db: MockState, listId: Id, userId: Id): TaskList {
  const list = db.lists.find((l) => l.id === listId);
  if (!list || !memberIds(db, list).includes(userId))
    throw new ApiError(404, "not_found", "La lista no existe o no tienes acceso a ella.");
  return list;
}

export const mockDb = {
  async register(input: RegisterInput): Promise<User> {
    await delay();
    const db = load();
    const username = input.username.trim();
    const email = input.email.trim();
    // uq_users_username / uq_users_email: únicos sin distinguir mayúsculas.
    if (db.users.some((u) => u.username.toLowerCase() === username.toLowerCase()))
      throw new ApiError(409, "username_taken", "Ese nombre de usuario ya está en uso.", ["username"]);
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase()))
      throw new ApiError(409, "email_taken", "Ya existe una cuenta con ese correo.", ["email"]);
    const user: MockUser = { id: nextId(db.users), username, email, password: input.password };
    db.users.push(user);
    // Regla del backend (v0.6): el registro crea también la lista «Mis tareas».
    db.lists.push({
      id: nextId(db.lists),
      name: DEFAULT_LIST_NAME,
      description: null,
      list_type: "personal",
      owner_id: user.id,
      is_default: true,
    });
    save();
    return publicUser(user);
  },

  async login(input: LoginInput): Promise<User> {
    await delay();
    const db = load();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === input.email.trim().toLowerCase() && u.password === input.password,
    );
    // CA-02: error genérico, sin decir qué dato ha fallado.
    if (!user) throw new ApiError(401, "invalid_credentials", "El correo o la contraseña no son correctos.");
    db.sessionUserId = user.id;
    save();
    return publicUser(user);
  },

  async logout(): Promise<void> {
    await delay();
    const db = load();
    db.sessionUserId = null;
    save();
  },

  /** No envía correo: en modo simulado solo confirma la petición. */
  async requestPasswordReset(email: string): Promise<void> {
    void email;
    await delay();
  },

  async me(): Promise<User> {
    await delay();
    return publicUser(requireSession(load()));
  },

  /** Listas de las que el usuario es propietario o miembro (GET /lists). */
  async getLists(): Promise<TaskList[]> {
    await delay();
    const db = load();
    const user = requireSession(db);
    return db.lists.filter((list) => memberIds(db, list).includes(user.id));
  },

  async getList(listId: Id): Promise<TaskList> {
    await delay();
    const db = load();
    return requireList(db, listId, requireSession(db).id);
  },

  async getMembers(listId: Id) {
    await delay();
    const db = load();
    const list = requireList(db, listId, requireSession(db).id);
    return memberIds(db, list).map((id) => {
      const member = db.users.find((u) => u.id === id)!;
      return { user_id: member.id, username: member.username, is_owner: member.id === list.owner_id };
    });
  },

  async createTask(listId: Id, input: TaskCreateInput): Promise<Task> {
    await delay();
    const db = load();
    const user = requireSession(db);
    const list = requireList(db, listId, user.id);

    const title = input.title.trim();
    if (!title) throw new ApiError(422, "validation_error", "El título es obligatorio.", ["title"]);
    // CA-17, CA-18: no hay responsables en listas personales; solo miembros de la lista.
    // En el modelo v0.6 esto lo comprueba el backend (la BD ya no lo garantiza).
    if (input.assignee_ids.length && list.list_type === "personal")
      throw new ApiError(422, "validation_error", "Las listas personales no admiten responsables.", ["assignee_ids"]);
    const members = memberIds(db, list);
    if (input.assignee_ids.some((id) => !members.includes(id)))
      throw new ApiError(422, "validation_error", "Solo puedes asignar miembros de esta lista.", ["assignee_ids"]);

    const task: Task = {
      id: nextId(db.tasks),
      list_id: listId,
      title,
      description: input.description?.trim() || null,
      due_date: input.due_date || null,
      status: "todo", // CA-20: estado inicial «Por hacer».
      creator_id: user.id,
      assignee_ids: [...new Set(input.assignee_ids)],
      completed_at: null,
      created_at: new Date().toISOString(),
    };
    db.tasks.push(task);
    save();
    return task;
  },
};
