import type { LoginInput, RegisterInput, User } from "@/types/api";
import { API_MODE } from "./config";
import { request } from "./http";
import { mockDb } from "./mock/db";

/** POST /auth/register — RF-01. Crea la cuenta; no inicia sesión. */
export function register(input: RegisterInput): Promise<User> {
  if (API_MODE === "mock") return mockDb.register(input);
  return request<User>("/auth/register", { method: "POST", body: input });
}

/** POST /auth/login — RF-02. El backend responde con la cookie de sesión. */
export function login(input: LoginInput): Promise<User> {
  if (API_MODE === "mock") return mockDb.login(input);
  return request<User>("/auth/login", { method: "POST", body: input });
}

/** POST /auth/logout — RF-02. */
export function logout(): Promise<void> {
  if (API_MODE === "mock") return mockDb.logout();
  return request<void>("/auth/logout", { method: "POST" });
}

/** GET /me — usuario de la sesión actual (401 si no hay sesión). */
export function getCurrentUser(): Promise<User> {
  if (API_MODE === "mock") return mockDb.me();
  return request<User>("/me");
}
