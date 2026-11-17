# Estructura del proyecto Frontend

| Campo | Valor |
|---|---|
| Identificador | STRUCT-FRONTEND |
| Versión | v0.1 |
| Estado | Provisional. Refleja la estructura real a 2026-11-17; lo previsto está marcado como propuesta. |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code, contrastada con el sistema de archivos. |
| Documentos relacionados | [README](../README.md), [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md), [COMPONENTS](COMPONENTS.md), [FIGMA_HANDOFF](FIGMA_HANDOFF.md) |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Primera versión. |

Este archivo responde a «¿dónde está cada cosa y dónde va lo nuevo?». Para el porqué de cada capa, ver [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md).

## 1. Árbol real

Todo lo que no figura como «con contenido» está vacío (solo `.gitkeep`).

```
frontend/
├── README.md                    Guía de entrada (instalación, comandos, enlaces)
├── package.json                 Dependencias y scripts: dev, build, start, lint
├── package-lock.json            Versiones exactas (usar `npm ci`)
├── next.config.ts               Opciones de Next.js (cacheComponents, partialPrefetching, Turbopack + Tailwind)
├── tsconfig.json                TypeScript estricto; alias @/* -> src/*
├── eslint.config.mjs            ESLint: core-web-vitals + typescript
├── next-env.d.ts                Tipos generados por Next.js (no editar)
├── .env.example                 Variables de entorno de ejemplo (NEXT_PUBLIC_API_URL)
├── .env.local                   Valores reales locales (ignorado por Git; no documentar su contenido)
├── public/                      Recursos estáticos: SVG de la plantilla (file, globe, next, vercel, window)
├── src/
│   ├── app/                     Rutas y layouts (App Router)
│   │   ├── layout.tsx           [con contenido] layout raíz de la plantilla
│   │   ├── page.tsx             [con contenido] página de bienvenida de la plantilla
│   │   ├── globals.css          [con contenido] Tailwind + tema claro/oscuro de la plantilla
│   │   ├── favicon.ico
│   │   ├── (public)/            vacío. Previsto: acceso sin sesión
│   │   └── (private)/           vacío. Previsto: pantallas con sesión
│   ├── components/
│   │   ├── ui/                  vacío. Previsto: componentes visuales sin lógica de dominio
│   │   └── layout/              vacío. Previsto: shell, navegación lateral, cabecera
│   ├── features/                vacío. Una carpeta por área:
│   │   ├── auth/  lists/  tasks/  invitations/  notifications/  dashboard/
│   ├── hooks/                   vacío. Lógica React reutilizable
│   ├── services/                vacío. Llamadas a la API (ningún componente llama a una URL directamente)
│   ├── lib/                     vacío. Utilidades y configuración compartida
│   └── types/                   vacío. Tipos de las respuestas de la API
└── docs/                        Documentación específica del frontend
    ├── ARCHITECTURE_FRONTEND.md Arquitectura (006A)
    ├── COMPONENTS.md            Componentes previstos
    ├── FIGMA_HANDOFF.md         Pantallas, estados y correspondencia con Figma (fuente única)
    ├── TESTING_FRONTEND.md      Pruebas
    └── STRUCTURE_FRONTEND.md    Este archivo
```

No existen: `proxy.ts`, carpeta de pruebas, `tests/`, ni ningún componente propio.

## 2. Dónde va lo nuevo [PROPUESTA, derivada de ARCHITECTURE_FRONTEND]

| Qué añades | Dónde | Regla |
|---|---|---|
| Una pantalla nueva | `src/app/(public)/…` o `src/app/(private)/…` | La página compone piezas de `features/` y `components/`; no contiene lógica de datos. |
| Un botón, campo o tarjeta genérica | `src/components/ui/` | Recibe datos por propiedades y no conoce la API. |
| Barra lateral, cabecera, marco autenticado | `src/components/layout/` | — |
| Algo propio de un área (por ejemplo la fila de una tarea) | `src/features/<área>/` | Una carpeta por área funcional. |
| Una llamada a la API | `src/services/` | Única capa que conoce las URL. |
| Un tipo de respuesta de la API | `src/types/` | Desacoplado de los modelos del backend. |
| Una función auxiliar | `src/lib/` | Sin dependencias de React si es posible. |
| Un hook reutilizable | `src/hooks/` | No conoce detalles del transporte HTTP. |
| Documentación | `docs/` | Actualizar [FIGMA_HANDOFF](FIGMA_HANDOFF.md) y [COMPONENTS](COMPONENTS.md) a la vez. |

Las rutas con grupos `(public)` y `(private)` no cambian la URL. Antes de crear convenciones de Next.js (`proxy`, `loading`, `error`, `not-found`…) consulta `node_modules/next/dist/docs/` (ver `AGENTS.md`).

## 3. Relación con el diseño

| Pantalla (NEX-DOC-007) | Carpeta de destino prevista | Estado de diseño |
|---|---|---|
| WF-007 a WF-009 (acceso) | `src/app/(public)/` + `features/auth/` | Solo prototipo |
| WF-001 Dashboard | `src/app/(private)/` + `features/dashboard/` | Aprobada |
| WF-002, WF-003 | `features/lists/` | WF-002 aprobada; WF-003 pendiente de validación |
| WF-004, WF-011, WF-012 | `features/tasks/` | WF-004 pendiente; WF-011 y WF-012 solo prototipo |
| WF-005, WF-013 | `features/invitations/` | WF-005 pendiente; WF-013 solo prototipo |
| WF-006, WF-010 | `features/notifications/` | Solo prototipo |

Las rutas concretas **no están definidas**. El prototipo HTML y el diseño no deben copiarse tal cual: son referencias, no requisitos.

## 4. Archivos que no se versionan

`.env.local`, `node_modules/`, `.next/`, `next-env.d.ts` y `*.tsbuildinfo` los ignora el `.gitignore` del repositorio. Los valores de `.env.local` no se documentan.

## 5. Observaciones sobre la estructura actual

- El nombre del paquete en `package.json` es `nexona` (grafía heredada; inconsistencia I-19). No se cambia en esta fase.
- `layout.tsx` y `page.tsx` son de la plantilla (inconsistencia I-20).
- La estructura física (esta carpeta `frontend/` dentro de un repositorio con otro nombre) es **provisional**: la subida de su contenido a la raíz del repositorio está aplazada (ADR-0002).
