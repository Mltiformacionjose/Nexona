# Pruebas del frontend de Nexora

| Campo | Valor |
|---|---|
| Identificador | TEST-FRONTEND |
| Versión | v0.1 |
| Estado | Provisional. **No existe ninguna prueba ni herramienta de pruebas.** El resto es propuesta. |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code. |
| Documentos relacionados | [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md), [FIGMA_HANDOFF](FIGMA_HANDOFF.md), ADR-0011 (Propuesta), AT-08 |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Estado real y propuesta de organización. |

> **No se afirma que lint, tipos o build pasen:** no se ejecutaron en esta reorganización documental.

## 1. Estado real

| Aspecto | Estado |
|---|---|
| Herramienta de pruebas (componentes, interacción, E2E) | **No elegida** (AT-08 Pendiente). No hay Jest, Vitest, Playwright ni Cypress en `package.json`. |
| Pruebas escritas | Ninguna |
| Lint | `npm run lint` (ESLint 9 con `eslint-config-next`: `core-web-vitals` y `typescript`) |
| Comprobación de tipos | No hay script. TypeScript está en modo estricto; se puede lanzar `npx tsc --noEmit` [PROPUESTA de comando] |
| Build | `npm run build` |

## 2. Comandos disponibles (desde la carpeta `frontend/`)

```powershell
npm ci            # instalar dependencias del package-lock
npm run lint      # ESLint
npx tsc --noEmit  # tipos (no es un script del proyecto)
npm run build     # compilación de producción
```

## 3. Qué deberán cubrir las pruebas [PROPUESTA]

Según NEX-DOC-006 v0.3 §11.2 y las reglas de NEX-DOC-007; todo condicionado a que existan pantallas.

| Área | Qué comprobar | Pantallas |
|---|---|---|
| Componentes | Representación de estados (Por hacer, En progreso, Hecha; vencida sin depender solo del color) | WF-001, WF-003, WF-012 |
| Interacción | Cambio de vista Lista / Calendario / Kanban; filtros de origen; cambio de estado | WF-001, WF-003, WF-011, WF-012 |
| Formularios y validación | Título obligatorio; contraseña de 12 caracteres; responsables solo en listas compartidas; conservar lo escrito tras un error | WF-004, WF-008, WF-005 |
| Estados de carga y error | Los estados aplicables por pantalla de [FIGMA_HANDOFF](FIGMA_HANDOFF.md) §6 | Todas |
| Navegación y rutas protegidas | Redirección sin sesión; ruta de retorno | `(private)` |
| Accesibilidad | Foco visible, teclado, etiquetas, contraste | Todas |
| Integración con la API | Contrato propuesto en [API_CONTRACT](../../../Nexora_Backend/backend/docs/API_CONTRACT.md), cookie de sesión real | Flujos F-01 a F-09 de NEX-DOC-003 |

## 4. Herramientas posibles

Next.js documenta guías para Jest, Vitest, Playwright y Cypress en `node_modules/next/dist/docs/01-app/02-guides/testing/`. La elección es una decisión pendiente (AT-08); este documento no recomienda ninguna sin necesidad concreta.

## 5. Trazabilidad

La columna «Prueba» de la cadena RF → flujo → pantalla → componente → implementación → prueba está vacía. Ver [TRAZABILIDAD](../../../Nexora-Documentation/TRAZABILIDAD.md).
