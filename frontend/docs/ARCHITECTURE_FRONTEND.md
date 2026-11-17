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

Leyenda: **[IMPLEMENTADO]** existe en el código; **[PROPUESTA]** descrito en documentos, sin código ni aprobación; **[PENDIENTE]** sin decidir.

> **Aviso (AGENTS.md):** esta versión de Next.js (16.4.6) tiene cambios incompatibles respecto a versiones anteriores. Antes de escribir código hay que consultar la documentación incluida en `node_modules/next/dist/docs/`. Un ejemplo relevante: la convención `middleware` está **obsoleta y renombrada a `proxy`** (`proxy.ts`).

## 1. Objetivo y responsabilidades

El frontend es la interfaz de Nexora: pantallas, navegación, formularios y presentación de datos. **No accede a PostgreSQL ni contiene reglas de negocio ni comprobaciones de permisos como barrera de seguridad**; todo eso es del backend.

**Estado real:** el proyecto es la plantilla de create-next-app con la estructura de carpetas creada (todas vacías, con `.gitkeep`). **No hay pantallas de Nexora, componentes, llamadas a la API ni autenticación.**

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

No hay biblioteca de componentes, de formularios, de estado global, de peticiones HTTP ni de pruebas. Tampoco hay `proxy.ts`.

## 3. Estructura de carpetas

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        [IMPLEMENTADO] plantilla: Geist, title "Create Next App", lang="en"
│   │   ├── page.tsx          [IMPLEMENTADO] página de bienvenida de la plantilla
│   │   ├── globals.css       [IMPLEMENTADO] tema claro/oscuro de la plantilla
│   │   ├── (public)/         vacío (.gitkeep)  -> rutas sin sesión [PROPUESTA]
│   │   └── (private)/        vacío (.gitkeep)  -> rutas con sesión [PROPUESTA]
│   ├── components/ui/ layout/        vacíos
│   ├── features/auth/ lists/ tasks/ invitations/ notifications/ dashboard/   vacíos
│   ├── hooks/ services/ lib/ types/  vacíos
├── public/                   SVG de la plantilla
├── next.config.ts  tsconfig.json  eslint.config.mjs  package.json  .env.example
└── docs/                     esta documentación
```

El propósito de cada carpeta es el de NEX-DOC-006 v0.3 §3 (propuesta, AT-02): `app/` rutas y layouts; `components/ui/` componentes visuales sin lógica de dominio; `components/layout/` marco de navegación; `features/` código por área; `hooks/` lógica React reutilizable; `services/` llamadas a la API (ningún componente llama a una URL directamente); `lib/` utilidades; `types/` tipos de las respuestas de la API, desacoplados de los modelos del backend.

## 4. Páginas y rutas

[IMPLEMENTADO] Solo `/` (plantilla). [PROPUESTA] Grupos de rutas `(public)` (registro, inicio de sesión, recuperación) y `(private)` (dashboard, listas, tareas, notificaciones, ajustes), correspondientes a las pantallas WF-001 a WF-013 de [NEX-DOC-007](../../../Nexora-Documentation/06-diseno/NEX-DOC-007_v0.6_diseno-interfaz-wireframes.md). Los grupos de rutas no alteran la URL (ver `route-groups` en la documentación de Next). **Las URL concretas no están definidas.**

## 5. Componentes y reutilización

Ver [COMPONENTS](COMPONENTS.md). Hoy no existe ningún componente propio.

## 6. Estado, formularios y validación [PENDIENTE]

No hay decisión ni código. Criterios del proyecto: validar en el cliente solo como ayuda de usabilidad (mensaje junto al campo, conservando lo escrito, según NEX-DOC-007 §18); la validación obligatoria es la del backend. Reglas de campos en [FIGMA_HANDOFF](FIGMA_HANDOFF.md). Elegir bibliotecas de formularios o estado sería una decisión nueva (no se recomienda añadirlas sin necesidad).

## 7. Comunicación con la API [PROPUESTA]

Sin código. Propuesta de 006 v0.3 y de la [arquitectura global](../../../Nexora-Documentation/05-arquitectura/ARQUITECTURA_GLOBAL.md): llamadas concentradas en `src/services/`, URL base en `NEXT_PUBLIC_API_URL` (ejemplo `http://localhost:8000/api/v1`), JSON, sesión por cookie. Cliente HTTP y estrategia: AT-03, Pendiente. Contrato: [API_CONTRACT](../../../Nexora_Backend/backend/docs/API_CONTRACT.md) (propuesta, sin endpoints implementados).

Mantener sincronizados los tipos de `src/types/` con OpenAPI del backend (ADR-0009, Pendiente).

## 8. Gestión de errores [PROPUESTA]

Mostrar mensajes de usuario según la estructura de error propuesta (`error.code`, `error.message`, `error.fields`) y los estados transversales de 007 §18 (carga, vacío, error con reintento, validación, sin permiso, confirmación, éxito). Next.js ofrece las convenciones `error`, `loading`, `not-found`, `unauthorized` y `forbidden` en App Router (ver su documentación); su adopción no está decidida.

## 9. Autenticación desde el cliente [PENDIENTE, ADR-0008]

Propuesta: sesión por cookie `HttpOnly` gestionada por el backend; el frontend no guarda tokens. Protección de rutas: [PROPUESTA] comprobar la sesión en el servidor de Next (`proxy.ts` para redirecciones y comprobación en el acceso a datos), sin sustituir la autorización del backend. Nada implementado; depende de SameSite/CORS/dominios (AT-04).

## 10. Diseño responsive y accesibilidad

Criterios de NEX-DOC-007 (desktop-first, adaptación móvil posterior; no depender solo del color; etiquetas visibles; foco visible; teclado). Hoy el CSS es el de la plantilla: **el tema oscuro violeta del diseño no está implementado** (la plantilla solo alterna claro/oscuro con `prefers-color-scheme`). Tokens de diseño pendientes ([FIGMA_HANDOFF](FIGMA_HANDOFF.md)).

## 11. Variables de entorno

| Variable | Dónde | Descripción |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `.env.local` (copiar de `.env.example`) | URL base de la API. Es pública (se incluye en el cliente): **no poner secretos**. |

`.env.local` está ignorado por Git. No hay lectura de esta variable en el código actual.

## 12. Pruebas, build y ejecución

Ver [TESTING_FRONTEND](TESTING_FRONTEND.md) y el [README](../README.md). Scripts: `dev`, `build`, `start`, `lint`. No hay script de pruebas ni de comprobación de tipos.

## 13. Brechas respecto a NEX-DOC-006 v0.3

| 006 v0.3 afirma | Realidad |
|---|---|
| `features/*` con componentes por área | Carpetas vacías |
| Pruebas con herramienta por elegir (AT-08) | Sin herramienta |
| Interfaz oscura violeta | CSS de plantilla |
| Metadatos del producto | `title: "Create Next App"`, `lang="en"` (I-20) |

## 14. Mejoras propuestas (no aprobadas)

- Sustituir los metadatos de la plantilla por los de Nexora y fijar el idioma (`es`).
- Añadir un script de comprobación de tipos (`tsc --noEmit`) cuando haya código.
- Elegir herramienta de pruebas (AT-08). Next.js documenta Jest, Vitest, Playwright y Cypress en `node_modules/next/dist/docs/01-app/02-guides/testing/`.
