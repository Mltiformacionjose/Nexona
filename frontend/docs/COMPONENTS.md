# Componentes del frontend de Nexora

| Campo | Valor |
|---|---|
| Identificador | FE-COMPONENTS |
| Versión | v0.1 |
| Estado | Provisional. **Ningún componente está implementado.** Todo lo listado es propuesta derivada del diseño. |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code. |
| Documentos relacionados | [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md), [FIGMA_HANDOFF](FIGMA_HANDOFF.md), [NEX-DOC-007 §20](../../../Nexora-Documentation/06-diseno/NEX-DOC-007_v0.6_diseno-interfaz-wireframes.md) |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Inventario de componentes reutilizables identificados en NEX-DOC-007 §20 y en las pantallas. |

## 1. Estado

`src/components/ui/` y `src/components/layout/` están **vacíos** (solo `.gitkeep`). El código actual es la plantilla de create-next-app. Este documento no inventa una biblioteca de componentes: lista lo que el diseño pide, para planificar.

Convención de [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md) (propuesta): `ui/` = componentes visuales sin lógica de dominio que reciben datos por propiedades; `layout/` = marco estructural; `features/<área>/` = piezas específicas de un área.

## 2. Componentes reutilizables identificados (NEX-DOC-007 §20) [PROPUESTA]

| Componente | Pantallas donde aparece | Variantes / estados mencionados en el diseño | En Figma | Implementado |
|---|---|---|---|---|
| Shell autenticado (barra lateral, perfil, contenido) | WF-001 a WF-006, WF-010 a WF-013 | Navegación: Inicio, Mis listas, Compartidas, Notificaciones, Ajustes | Dibujado como capas simples en WF-001 a 005; **no es un componente** de Figma | No |
| Cabecera contextual (ruta, título, descripción, acción principal) | WF-002 a WF-005, WF-006, WF-011 a WF-013 | — | Capas simples | No |
| Botones primario, secundario, destructivo | Todas | Destructivo: eliminar y expulsar (con confirmación) | Capas simples | No |
| Tarjetas de resumen, de lista y de tarea | WF-001, WF-002, WF-003, WF-012 | Resumen: Por hacer, En progreso, Hechas, Vencidas | Capas simples | No |
| Etiquetas de estado, de tipo de lista y de estado de invitación | WF-001 a WF-005, WF-012, WF-013 | Estado de tarea: Por hacer, En progreso, Hecha; lista: personal, compartida; invitación: pendiente (y otras por decidir) | Capas simples | No |
| Selector de vistas Lista / Calendario / Kanban | WF-001, WF-003, WF-011, WF-012 | 3 opciones | Capas simples | No |
| Selector Cuadrícula / Lista | WF-002 | 2 opciones | Capas simples | No |
| Campos de texto, fecha, contraseña, área de texto, selector múltiple | WF-004, WF-005, WF-007 a WF-009 | Validación, error, deshabilitado: **no definidos** | Capas simples | No |
| Avatares y grupos de participantes | WF-002, WF-003, WF-005, WF-012 | — | Capas simples | No |
| Alertas, mensajes vacíos, confirmaciones y toasts | Transversal | Estados de 007 §18 | **No están en Figma** | No |

## 3. Componentes de pantalla (features) previstos [PROPUESTA]

Se derivan de la estructura de `src/features/`: `auth` (WF-007 a WF-009), `lists` (WF-002, WF-003), `tasks` (WF-003, WF-004, WF-011, WF-012), `invitations` (WF-005, WF-013), `notifications` (WF-006, WF-010), `dashboard` (WF-001). Su composición no está definida.

## 4. Reglas de diseño aplicables

- Los componentes visuales no conocen la API ni contienen reglas de negocio.
- No comunicar estado solo con color (texto o icono además).
- Etiquetas visibles en los campos; foco visible; uso por teclado.
- Tokens de diseño (colores, tipografía, espaciado, contraste) **no cerrados** (007 §24). Dirección visual: oscura, violeta, tipografía provisional Inter. Nota: el código actual usa Geist y Arial de la plantilla.

## 5. Trazabilidad

La columna «Componente» de la cadena RF → flujo → pantalla → componente → implementación → prueba está **vacía** mientras no existan componentes. Ver [TRAZABILIDAD](../../../Nexora-Documentation/TRAZABILIDAD.md).
