# NEX-DOC-006A — Arquitectura del Frontend

| Campo | Valor |
|---|---|
| Identificador | NEX-DOC-006A |
| Versión | v0.1 |
| Estado | Provisional. Describe el código real a 2026-11-17; lo previsto está separado y marcado como propuesta. |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code contrastada con el código. |
| Documentos relacionados | [Arquitectura global](../../../Nexora-Documentation/05-arquitectura/ARQUITECTURA_GLOBAL.md), [COMPONENTS](COMPONENTS.md), [FIGMA_HANDOFF](FIGMA_HANDOFF.md), [TESTING_FRONTEND](TESTING_FRONTEND.md), [API_CONTRACT (backend)](../../../Nexora_Backend/backend/docs/API_CONTRACT.md), ADR-0005 (Propuesta) |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Primera versión. Sustituye la parte de frontend de NEX-DOC-006 v0.3. |
| v0.2 | 2026-11-17 | Rutas, capa de servicios con modo simulado, formularios y comprobación de sesión implementados. |

Leyenda: **[IMPLEMENTADO]** existe en el código; **[PROPUESTA]** descrito en documentos, sin código ni aprobación; **[PENDIENTE]** sin decidir.

> **Aviso (AGENTS.md):** esta versión de Next.js (16.4.6) tiene cambios incompatibles respecto a versiones anteriores. Antes de escribir código hay que consultar la documentación incluida en `node_modules/next/dist/docs/`. Un ejemplo relevante: la convención `middleware` está **obsoleta y renombrada a `proxy`** (`proxy.ts`).

## 1. Objetivo y responsabilidades

El frontend es la interfaz de Nexora: pantallas, navegación, formularios y presentación de datos. **No accede a PostgreSQL ni contiene reglas de negocio ni comprobaciones de permisos como barrera de seguridad**; todo eso es del backend.

**Estado real (2026-11-17):** fundación visual, primitivos de `components/ui` (ver [COMPONENTS](COMPONENTS.md)), marco autenticado y las pantallas WF-004 (nueva tarea), WF-007, WF-008 y WF-009. Todas llaman a `src/services/`, que hoy funciona en **modo simulado** porque el backend no tiene endpoints. La página `/` es un muestrario temporal.

## 2. Tecnologías reales

Fuente: `package.json`.

| Componente | Versión | Uso actual |
|---|---|---|
| Next.js | 16.4.6 | App Router. |
| React / React DOM | 19.3.0 | — |
| TypeScript | ^5 | `strict: true`; alias `@/*` → `./src/*`. |
| Tailwind CSS | 4.3.3 | `@import "tailwindcss"` en `globals.css`; regla de Turbopack con `@tailwindcss/turbopack` 4.3.3. |
| ESLint | ^9 con `eslint-config-next` 16.4.6 | Configuración plana: `core-web-vitals` y `typescript`. |

Opciones activas en `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `experimental.agentFeedback: true` y la regla de Turbopack para CSS. `cacheComponents` hace que la obtención de datos sea dinámica por defecto y se cachee de forma explícita con `use cache`; conviene leer su documentación antes de diseñar la carga de datos.

No hay biblioteca de componentes, de formularios, de estado global, de peticiones HTTP (se usa `fetch`) ni de pruebas. Tampoco hay `proxy.ts`.

## 3. Estructura de carpetas

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        [IMPLEMENTADO] lang="es", fuente Inter, metadatos de Nexora
│   │   ├── page.tsx          [TEMPORAL] muestrario de componentes
│   │   ├── globals.css       [IMPLEMENTADO] tokens del tema oscuro violeta y foco visible
│   │   ├── (public)/         [IMPLEMENTADO] layout, login/, register/, forgot-password/
│   │   └── (private)/        [IMPLEMENTADO] layout (sesión + barra lateral), lists/[listId]/tasks/new/
│   ├── components/ui/                [IMPLEMENTADO] button, badge, pill, panel, field, alert
│   ├── components/layout/            [IMPLEMENTADO] sidebar, page-header
│   ├── features/auth/                [IMPLEMENTADO] auth-card, login/register/forgot-password-form, session-provider
│   ├── features/tasks/               [IMPLEMENTADO] task-form, new-task-screen, status
│   ├── features/lists/ invitations/ notifications/ dashboard/   vacíos
│   ├── services/                     [IMPLEMENTADO] config, http, errors, auth, lists, tasks, mock/db
│   ├── lib/                          [IMPLEMENTADO] cn.ts, validation.ts
│   ├── types/                        [IMPLEMENTADO] api.ts
│   ├── hooks/                        vacío
├── scripts/                  api-smoke.mjs (comprobación de la API real)
├── public/                   SVG de la plantilla
├── next.config.ts  tsconfig.json  eslint.config.mjs  package.json  .env.example
└── docs/                     esta documentación
```

El propósito de cada carpeta es el de NEX-DOC-006 v0.3 §3 (propuesta, AT-02): `app/` rutas y layouts; `components/ui/` componentes visuales sin lógica de dominio; `components/layout/` marco de navegación; `features/` código por área; `hooks/` lógica React reutilizable; `services/` llamadas a la API (ningún componente llama a una URL directamente); `lib/` utilidades; `types/` tipos de las respuestas de la API, desacoplados de los modelos del backend.

## 4. Páginas y rutas

Los grupos de rutas no alteran la URL (ver `route-groups` en la documentación de Next). Las URL son una **propuesta** de esta implementación, pendiente de confirmar por el desarrollador.

| Ruta | Pantalla | Grupo | Estado |
|---|---|---|---|
| `/login` | WF-007 Acceso | `(public)` | [IMPLEMENTADO] |
| `/register` | WF-008 Registro | `(public)` | [IMPLEMENTADO] |
| `/forgot-password` | WF-009 Recuperar contraseña (solicitud) | `(public)` | [IMPLEMENTADO] |
| `/lists/[listId]/tasks/new` | WF-004 Crear tarea | `(private)` | [IMPLEMENTADO] |
| `/` | WF-001 Dashboard | `(private)` | [TEMPORAL] hoy muestrario, fuera de `(private)` |
| `/lists`, `/lists/[listId]`, `/lists/[listId]/participants`, `/invitations`, `/notifications`, `/settings` | WF-002, 003, 005, 013, 006, 010 | `(private)` | [PROPUESTA] enlazadas desde la barra lateral; aún dan 404 |

Con `cacheComponents`, los parámetros dinámicos son datos de la petición: la página de WF-004 los lee dentro de `<Suspense>` (guía `dynamic-routes`).

## 5. Componentes y reutilización

Ver [COMPONENTS](COMPONENTS.md). Regla: `components/ui` no conoce el dominio; `components/layout` es el marco; lo propio de un área (formularios, pantallas) va en `features/<área>`.

## 6. Estado, formularios y validación [IMPLEMENTADO]

Sin bibliotecas añadidas. Cada formulario es un componente de cliente con `<form action>` y `useActionState` de React (guía `forms` de Next). La acción valida con `src/lib/validation.ts`, llama al servicio y devuelve el estado: errores por campo, error general y valores para conservar lo escrito. La contraseña se borra tras un login fallido. Los errores de la API que señalan un campo (`error.fields`) se muestran junto a ese campo.

La validación del cliente es solo ayuda de usabilidad. Sus límites copian el modelo v0.5 (usuario ≤ 50, correo ≤ 255, título ≤ 150, contraseña ≥ 12). La validación que cuenta es la del backend.

Estado compartido: solo la sesión (`SessionProvider`, contexto de React). No hay estado global.

## 7. Comunicación con la API [IMPLEMENTADO, contrato en PROPUESTA]

```
componente → features/*/…-form.tsx → services/{auth,lists,tasks}.ts ─┬─ mock/db.ts   (NEXT_PUBLIC_API_MODE=mock, por defecto)
                                                                    └─ http.ts      (NEXT_PUBLIC_API_MODE=http → NEXT_PUBLIC_API_URL)
```

- `http.ts` es la única función que llama a `fetch`: JSON, `credentials: "include"` (cookie `HttpOnly` del backend) y conversión de la estructura de error del contrato en `ApiError`. Sin respuesta del servidor, lanza un error con `status 0`.
- `mock/db.ts` imita las respuestas y restricciones del contrato y del modelo v0.5: unicidad sin distinguir mayúsculas, error de acceso genérico, 404 en listas ajenas, responsables solo miembros y ninguno en listas personales, estado inicial `todo`. Guarda los datos en `sessionStorage`. **No es una base de datos.**
- Tipos en `src/types/api.ts` (snake_case, ids enteros). Cuando exista OpenAPI, mandará OpenAPI (ADR-0009, Pendiente).
- Endpoints usados: `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `POST /auth/password-reset/request`, `GET /me`, `GET /lists/{id}`, `GET /lists/{id}/members` y `POST /lists/{id}/tasks`.
- El registro no inicia sesión: el contrato no lo dice. Tras registrarse se invita a iniciar sesión.

Cliente HTTP: `fetch` nativo (AT-03 sigue Pendiente; esto es lo mínimo, no una decisión cerrada).

Mantener sincronizados los tipos de `src/types/` con OpenAPI del backend (ADR-0009, Pendiente).

## 8. Gestión de errores [PROPUESTA]

Mostrar mensajes de usuario según la estructura de error propuesta (`error.code`, `error.message`, `error.fields`) y los estados transversales de 007 §18 (carga, vacío, error con reintento, validación, sin permiso, confirmación, éxito). Next.js ofrece las convenciones `error`, `loading`, `not-found`, `unauthorized` y `forbidden` en App Router (ver su documentación); su adopción no está decidida.

## 9. Autenticación desde el cliente [PENDIENTE, ADR-0008]

Sesión por cookie `HttpOnly` gestionada por el backend; el frontend no guarda tokens.

[IMPLEMENTADO, provisional] El layout `(private)` envuelve las pantallas en `SessionProvider`. Este llama a `GET /me`: con 401 redirige a `/login` y, si no, ofrece el usuario a la barra lateral y a las pantallas. Es una comprobación en el navegador, solo para la navegación.

[PROPUESTA] Cuando ADR-0008 y AT-04 (dominios, SameSite, CORS) estén decididos, la comprobación podrá hacerse también en el servidor de Next (`proxy.ts`). Nada de esto sustituye la autorización del backend en cada petición.

## 10. Diseño responsive y accesibilidad

Criterios de NEX-DOC-007 (desktop-first, adaptación móvil posterior; no depender solo del color; etiquetas visibles; foco visible; teclado). El tema oscuro violeta ya está implementado como tokens CSS en `globals.css` (tema único; no hay tema claro diseñado) con tipografía Inter y foco visible global. Los textos son de 12 px como mínimo (el prototipo usa 8–10 px). Contraste: todo cumple WCAG AA salvo el botón primario (3,10:1); ver [COMPONENTS](COMPONENTS.md) §5. La adaptación móvil no está implementada.

## 11. Variables de entorno

| Variable | Dónde | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_MODE` | `.env.local` | `mock` (por defecto) o `http`. |
| `NEXT_PUBLIC_API_URL` | `.env.local` (copiar de `.env.example`) | URL base de la API en modo `http`. Es pública (se incluye en el cliente): **no poner secretos**. |

`.env.local` está ignorado por Git. Ambas se leen en `src/services/config.ts`.

## 12. Pruebas, build y ejecución

Ver [TESTING_FRONTEND](TESTING_FRONTEND.md) y el [README](../README.md). Scripts: `dev`, `build`, `start`, `lint`, `typecheck` y `smoke:api`. No hay pruebas automáticas de interfaz.

## 13. Brechas respecto a NEX-DOC-006 v0.3

| 006 v0.3 afirma | Realidad |
|---|---|
| `features/*` con componentes por área | `auth` y `tasks` con contenido; el resto vacías |
| Pruebas con herramienta por elegir (AT-08) | Sin herramienta |
| Interfaz oscura violeta | Implementada como tokens y primitivos |
| Metadatos del producto | Corregidos (`title: "Nexora"`, `lang="es"`); I-20 resuelta en el código |

## 14. Mejoras propuestas (no aprobadas)

- Elegir herramienta de pruebas (AT-08). Next.js documenta Jest, Vitest, Playwright y Cypress en `node_modules/next/dist/docs/01-app/02-guides/testing/`.
