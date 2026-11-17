/**
 * Modo de la capa de servicios.
 *
 * - `mock` (por defecto): datos simulados en el navegador. Permite usar las
 *   pantallas sin backend. Nada se guarda en una base de datos real.
 * - `http`: llamadas a la API real en `NEXT_PUBLIC_API_URL`.
 *
 * Se cambia con `NEXT_PUBLIC_API_MODE=http` en `.env.local` cuando el backend
 * tenga endpoints. Ningún componente debe saber en qué modo está.
 */
export const API_MODE: "mock" | "http" = process.env.NEXT_PUBLIC_API_MODE === "http" ? "http" : "mock";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
