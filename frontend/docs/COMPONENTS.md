# Componentes del frontend de Nexora

| Campo | Valor |
|---|---|
| Identificador | FE-COMPONENTS |
| Versión | v0.2 |
| Estado | Provisional. Implementados los primitivos de `components/ui` listados en la sección 2; el resto es propuesta derivada del diseño. |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code. |
| Documentos relacionados | [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md), [STRUCTURE_FRONTEND](STRUCTURE_FRONTEND.md), [FIGMA_HANDOFF](FIGMA_HANDOFF.md), [NEX-DOC-007 §20](../../../Nexora-Documentation/06-diseno/NEX-DOC-007_v0.6_diseno-interfaz-wireframes.md) |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Inventario de componentes reutilizables identificados en NEX-DOC-007 §20 y en las pantallas. |
| v0.2 | 2026-11-17 | Se implementan Button, ButtonLink, Badge, Pill, Panel, TextField y TextAreaField. Se añade la tabla de contraste. |

## 1. Estado

Los primitivos visuales viven en `src/components/ui/`. Son **componentes de servidor** (no necesitan JavaScript en el cliente), no tienen lógica de dominio ni conocen la API, y no añaden dependencias: solo Tailwind y la utilidad `cn` (`src/lib/cn.ts`).

La muestra visual de cada uno está en la página temporal `/` (muestrario), que se sustituirá por el Dashboard.

## 2. Componentes implementados

| Componente | Archivo | Variantes / opciones | Uso en el diseño |
|---|---|---|---|
| `Button`, `ButtonLink` | `ui/button.tsx` | `primary`, `secondary`, `ghost`, `danger`; deshabilitado. `ButtonLink` es un enlace de navegación con el mismo aspecto. | Acciones de todas las pantallas |
| `Badge` | `ui/badge.tsx` | Tonos `accent` y `warning`; texto en mayúsculas | Tipo de lista, rol, invitación pendiente |
| `Pill` | `ui/pill.tsx` | Punto opcional `info`, `accent`, `success`, `danger`; el texto siempre acompaña al color | Estado de tarea, rol «Participante» |
| `Panel` | `ui/panel.tsx` | Encabezado opcional: título (h2), descripción y acciones | Paneles y tarjetas de todas las pantallas |
| `TextField`, `TextAreaField` | `ui/field.tsx` | Etiqueta, «Opcional», ayuda y error; estados normal, error y deshabilitado | Formularios WF-004, WF-005, WF-007 a WF-009 |

Accesibilidad de los campos: la etiqueta está unida al control (`htmlFor`), la ayuda y el error por `aria-describedby`, el error usa `aria-invalid` y `role="alert"`. El foco visible es global (`globals.css`).

## 3. Componentes pendientes [PROPUESTA]

Derivados de NEX-DOC-007 §20; todavía **no implementados**.

| Componente | Pantallas donde aparece | Notas |
|---|---|---|
| Shell autenticado (barra lateral, perfil) | WF-001 a WF-006, WF-010 a WF-013 | Navegación del prototipo aprobado: Inicio, Mis listas, Invitaciones, Notificaciones, Ajustes |
| Cabecera de página (ruta, título, descripción, acción) | La mayoría | — |
| Tarjetas de resumen, de lista y de tarea | WF-001, WF-002, WF-003, WF-012 | Sobre `Panel` |
| Selector de vistas (Lista, Calendario, Kanban) y de presentación (Cuadrícula, Lista) | WF-001, WF-002, WF-003, WF-011, WF-012 | Necesita interacción en el cliente |
| Selector múltiple de responsables | WF-004 | Solo en listas compartidas |
| Interruptor (toggle) | WF-010 | — |
| Avatares y grupos de participantes | WF-002, WF-003, WF-005, WF-012 | — |
| Alertas, mensajes vacíos, confirmaciones y toasts | Transversal | Estados de [FIGMA_HANDOFF](FIGMA_HANDOFF.md) §6 |

## 4. Reglas

- Los componentes visuales no conocen la API ni contienen reglas de negocio.
- No comunicar estado solo con color: el texto va siempre.
- Etiquetas visibles en los campos; foco visible; uso por teclado.
- El prototipo usa tamaños de texto de 8 a 10 px; en la implementación **el mínimo es 12 px** por legibilidad (NEX-DOC-007 §3). Es una adaptación de la implementación, no un cambio de diseño.

## 5. Contraste de los colores del diseño

Cálculo WCAG 2.x sobre los colores de los tokens de `globals.css` (mínimo AA: 4,5:1 en texto normal).

| Combinación | Contraste | AA |
|---|---|---|
| Texto general sobre panel | 15,09 : 1 | Cumple |
| Pill: texto sobre chip | 12,43 : 1 | Cumple |
| Error de campo sobre panel | 11,23 : 1 | Cumple |
| Botón peligro | 8,68 : 1 | Cumple |
| Badge: acento claro sobre tinte | 7,36 : 1 | Cumple |
| Badge advertencia | 7,30 : 1 | Cumple |
| Texto atenuado sobre fondo / sobre panel | 6,80 / 6,16 : 1 | Cumple |
| Placeholder sobre campo | 5,83 : 1 | Cumple |
| **Botón primario: blanco sobre acento** | **3,10 : 1** | **No cumple** |
| Alternativa: texto oscuro sobre acento | 6,14 : 1 | Cumpliría |

El botón primario del diseño aprobado no alcanza AA. Se ha **respetado el diseño** y queda como decisión pendiente (propuesta: texto oscuro sobre el violeta, o un violeta más oscuro). **[ REQUIERE CONFIRMACIÓN DEL DESARROLLADOR ]**

## 6. Trazabilidad

La cadena RF → flujo → pantalla → componente → implementación → prueba tiene ya la columna «Componente» posible para los primitivos, pero ninguno es todavía una pantalla completa. No hay pruebas de componentes (AT-08). Ver [TRAZABILIDAD](../../../Nexora-Documentation/TRAZABILIDAD.md).
