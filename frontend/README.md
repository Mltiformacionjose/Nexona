# Nexora — Frontend

Nexora es una aplicación web de gestión de tareas y listas personales y compartidas: permite crear y organizar tareas, compartir listas con otras personas, recibir avisos y ver un resumen del trabajo. Este repositorio contiene el **frontend**, la interfaz de usuario. El backend vive en otro repositorio.

> **Estado real (2026-11-17):** desarrollo en marcha, pieza a pieza y con un commit por pieza. Hecho: fundación visual del diseño aprobado (tema oscuro violeta, Inter, español) y los primitivos `Button`, `Badge`, `Pill`, `Panel` y campos de formulario. La página `/` es un muestrario temporal. **Todavía no hay pantallas de Nexora ni conexión con la API.** Ver [COMPONENTS](docs/COMPONENTS.md).

## Responsabilidad del frontend

Mostrar la interfaz, recoger acciones del usuario y comunicarse con la API del backend. **No accede a PostgreSQL**, no aplica reglas de negocio ni sustituye la autorización del backend. Ver [ARCHITECTURE_FRONTEND](docs/ARCHITECTURE_FRONTEND.md).

## Tecnologías

Next.js 16.4.6 (App Router), React 19.3.0, TypeScript 5 (estricto), Tailwind CSS 4.3.3, ESLint 9.

> **Importante:** esta versión de Next.js tiene cambios incompatibles con versiones anteriores. Consulta la documentación incluida en `node_modules/next/dist/docs/` antes de escribir código (ver `AGENTS.md`).

## Requisitos previos

- Node.js con npm (el proyecto se ha usado con Node 24; la versión mínima no está documentada).
- Opcional para trabajar con datos reales: el backend de Nexora en ejecución (aún no hay endpoints).

## Instalación (PowerShell, desde esta carpeta)

```powershell
npm ci
```

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta el valor. `.env.local` está ignorado por Git.

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL base de la API del backend (ejemplo: `http://localhost:8000/api/v1`). Es **pública**: no pongas secretos. Todavía no se lee en el código. |

## Ejecución local

```powershell
npm run dev
```

Abre `http://localhost:3000`. Hoy muestra la página de bienvenida de la plantilla.

## Comandos de comprobación y build

```powershell
npm run lint        # ESLint
npx tsc --noEmit    # comprobación de tipos (no es un script del proyecto)
npm run build       # compilación de producción
npm run start       # sirve la compilación
```

No hay pruebas automáticas todavía ([TESTING_FRONTEND](docs/TESTING_FRONTEND.md)). Este README no afirma que estos comandos pasen.

## Estructura del proyecto

```
src/app/            rutas y layouts; grupos (public) y (private) vacíos
src/components/     ui/ y layout/ (vacíos)
src/features/       auth, lists, tasks, invitations, notifications, dashboard (vacíos)
src/hooks/ services/ lib/ types/   (vacíos)
public/             recursos estáticos (SVG de la plantilla)
docs/               documentación del frontend
```

## Comunicación con el backend

El frontend llamará a la API HTTP del backend (JSON, sesión por cookie) desde `src/services/`. **El contrato HTTP está en estado de propuesta** y no hay endpoints implementados: ver el [contrato de API del backend](../../Nexora_Backend/backend/docs/API_CONTRACT.md).

## Documentación

- [Estructura del proyecto](docs/STRUCTURE_FRONTEND.md)
- [Arquitectura del frontend (006A)](docs/ARCHITECTURE_FRONTEND.md)
- [Componentes](docs/COMPONENTS.md)
- [Handoff de Figma](docs/FIGMA_HANDOFF.md)
- [Pruebas](docs/TESTING_FRONTEND.md)
- Documentación general del proyecto (requisitos, flujos, dominio, arquitectura global, decisiones): carpeta independiente `Nexora-Documentation`, fuera de este repositorio.
