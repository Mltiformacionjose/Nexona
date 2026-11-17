/**
 * Error de la API con la estructura propuesta en API_CONTRACT §3:
 * `{ "error": { "code", "message", "fields" } }`.
 * `message` es apto para mostrar al usuario.
 */
export class ApiError extends Error {
  constructor(
    /** Código HTTP; 0 si no hubo respuesta (sin conexión). */
    readonly status: number,
    readonly code: string,
    message: string,
    /** Campos del formulario a los que se refiere el error. */
    readonly fields: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Mensaje para el usuario a partir de cualquier error capturado. */
export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Ha ocurrido un error inesperado. Inténtalo de nuevo.";
}
