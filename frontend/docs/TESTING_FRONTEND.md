# Pruebas del frontend de Nexora

| Campo | Valor |
|---|---|
| Identificador | TEST-FRONTEND |
| Versión | v0.2 |
| Estado | Provisional. No hay herramienta de pruebas automáticas (AT-08 Pendiente). Hay una comprobación de humo de la API, lista para cuando exista el backend. |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code. |
| Documentos relacionados | [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md), [FIGMA_HANDOFF](FIGMA_HANDOFF.md), [API_CONTRACT](../../../Nexora_Backend/backend/docs/API_CONTRACT.md), ADR-0011 (Propuesta), AT-08 |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Estado real y propuesta de organización. |
| v0.2 | 2026-11-17 | Scripts `typecheck` y `smoke:api`; escenarios de verificación de registro, acceso y creación de tareas; resultado de las comprobaciones hechas. |

## 1. Estado real

| Aspecto | Estado |
|---|---|
| Herramienta de pruebas (componentes, interacción, E2E) | **No elegida** (AT-08 Pendiente). No hay Jest, Vitest, Playwright ni Cypress. |
| Pruebas automáticas del frontend | Ninguna |
| Comprobación de humo de la API | `npm run smoke:api` ([scripts/api-smoke.mjs](../scripts/api-smoke.mjs)). Sin dependencias. **Solo funciona con el backend en marcha**; hoy no hay endpoints. |
| Lint | `npm run lint` |
| Tipos | `npm run typecheck` |
| Build | `npm run build` |

## 2. Comandos (desde `frontend/`)

```powershell
npm ci               # instalar dependencias
npm run lint         # ESLint
npm run typecheck    # TypeScript estricto
npm run build        # compilación de producción
npm run smoke:api    # escenarios contra la API real (backend en marcha)
```

`smoke:api` usa `API_URL` o `NEXT_PUBLIC_API_URL` (por defecto `http://localhost:8000/api/v1`). **Crea usuarios, listas y una tarea**: usarlo solo con una base de datos de desarrollo.

## 3. Escenarios de verificación (registro, acceso y tareas)

Son las reglas que el modo simulado (`src/services/mock/db.ts`) ya aplica y que `smoke:api` comprueba contra el backend real. Cuando el backend exista, sirven para verificar que la base de datos y la API se comportan igual que la interfaz espera. Rutas y códigos: contrato en **PROPUESTA**.

| # | Escenario | Resultado esperado | Fuente | Mock (2026-11-17) |
|---|---|---|---|---|
| 1 | `GET /me` sin sesión | 401 | API_CONTRACT §3 | Pasa |
| 2 | Registro válido | 201 con `id`, `username`, `email` (sin contraseña) | RF-01 | Pasa |
| 3 | Correo repetido con otras mayúsculas | 409, error en el campo `email` | RN-01, `uq_users_email` | Pasa |
| 4 | Usuario repetido con otras mayúsculas | 409, error en el campo `username` | `uq_users_username` | Pasa |
| 5 | Contraseña de menos de 12 caracteres | 422 (el cliente ya lo impide) | CA-01 | Validación de cliente |
| 6 | Login con contraseña incorrecta | 401 con mensaje genérico | CA-02 | Pasa |
| 7 | Login correcto y `GET /me` | 200 | RF-02 | Pasa |
| 8 | Lista de la que no se es miembro | 404 (no revela que existe) | CA-10, CA-19 | Pasa |
| 9 | Tarea con título vacío o solo espacios | 422, campo `title` | CA-04, `ck_tasks_title` | Pasa |
| 10 | Responsable que no es miembro de la lista | 422, campo `assignee_ids` | CA-08, FK de `task_assignees` | Pasa |
| 11 | Responsables en una lista personal | 422, campo `assignee_ids` | CA-17, CA-18 | Pasa |
| 12 | Tarea válida | 201, `status = "todo"`, `completed_at = null`, responsables sin duplicados | CA-20, `ck_tasks_completed` | Pasa |
| 13 | Cerrar sesión y repetir una petición | 204 y después 401 | RF-02 | Pasa |

La columna «Mock» se comprobó ejecutando el módulo simulado con Node. Contra el backend real **no se ha ejecutado nada**.

Comprobaciones hechas en el navegador servido (`next start`): `/login`, `/register`, `/forgot-password` y `/lists/1/tasks/new` responden 200 con su título. Las etiquetas están asociadas a sus campos (`for` e `id`, `aria-describedby` en las ayudas). La ruta privada se sirve con «Comprobando sesión…»; la redirección a `/login` sin sesión ocurre en el navegador y **no se ha comprobado de forma automática** (no hay herramienta de navegador).

## 4. Qué deberán cubrir las pruebas automáticas [PROPUESTA]

| Área | Qué comprobar | Pantallas |
|---|---|---|
| Formularios y validación | Los escenarios de §3 en la interfaz: mensajes junto al campo, conservar lo escrito tras un error, borrar la contraseña tras un login fallido | WF-004, WF-007, WF-008, WF-009 |
| Navegación y rutas protegidas | Redirección sin sesión; cierre de sesión | `(private)` |
| Componentes | Estados de tarea sin depender solo del color | WF-001, WF-003, WF-012 |
| Interacción | Vistas Lista / Calendario / Kanban; cambio de estado | WF-003, WF-011, WF-012 |
| Estados de carga y error | Los de [FIGMA_HANDOFF](FIGMA_HANDOFF.md) §6 | Todas |
| Accesibilidad | Foco visible, teclado, etiquetas, contraste | Todas |

## 5. Herramientas posibles

Next.js documenta Jest, Vitest, Playwright y Cypress en `node_modules/next/dist/docs/01-app/02-guides/testing/`. La elección es AT-08 (Pendiente). Una opción razonable sería Vitest para las validaciones y el modo simulado, y Playwright para los flujos de §3 en el navegador. Es una propuesta, no una decisión.

## 6. Trazabilidad

Los escenarios de §3 cubren RF-01, RF-02, RF-03 (solicitud) y RF-19/RF-20 (crear tarea) a nivel de interfaz y de contrato. Ver [TRAZABILIDAD](../../../Nexora-Documentation/TRAZABILIDAD.md).
