# Handoff de diseño: Figma y prototipo HTML

| Campo | Valor |
|---|---|
| Identificador | FE-FIGMA-HANDOFF (fuente única del handoff; el diseño conceptual es NEX-DOC-007) |
| Versión | v0.1 |
| Estado | Provisional. Relaciona pantallas con requisitos e implementación futura. **No aprueba ningún diseño.** |
| Fecha de actualización | 2026-11-17 |
| Autoría | Desarrollador del proyecto. Redacción asistida por Claude Code. |
| Documentos relacionados | [NEX-DOC-007 v0.6](../../../Nexora-Documentation/06-diseno/NEX-DOC-007_v0.6_diseno-interfaz-wireframes.md), [NEX-DOC-003 (propuesta)](../../../Nexora-Documentation/02-flujos/NEX-DOC-003_v0.1_flujos-y-pantallas.md), [COMPONENTS](COMPONENTS.md), [ARCHITECTURE_FRONTEND](ARCHITECTURE_FRONTEND.md), [STRUCTURE_FRONTEND](STRUCTURE_FRONTEND.md), [TRAZABILIDAD](../../../Nexora-Documentation/TRAZABILIDAD.md) |

## Historial de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-11-17 | Primera versión a partir de NEX-DOC-007 v0.6, el prototipo HTML y la consulta de solo lectura de Figma. |

## 1. Fuentes y su fiabilidad

| Fuente | Qué es | Estado |
|---|---|---|
| **Archivo de Figma** `https://www.figma.com/design/aV0lecm0TlGvOUQUf7Xa7U` | Diseño gráfico editable | Solo lectura. 1 página («Page 1») con **5 frames de escritorio de 1440×1000**: WF-001 Dashboard v0.2, WF-002 Mis listas v0.1, WF-003 Detalle de lista v0.1, WF-004 Crear y editar tarea v0.1, WF-005 Gestionar participantes v0.1. Consulta de metadatos del 2026-11-17: solo capas simples de texto y rectángulos (539 nodos); **sin componentes, variantes ni estilos**; sin frames móviles ni WF-006 a WF-013; sin estados de carga, error o vacío. |
| **Prototipo HTML** (`Nexora-Documentation/06-diseno/prototype/prototype.html`) | Demostración navegable de 13 pantallas | **No es un diseño aprobado.** No se conecta a ninguna API, no autentica y no guarda datos. Sus interacciones no son requisitos. |
| **NEX-DOC-007 v0.6** | Especificación textual de las 13 pantallas | Borrador. Distingue origen A (Figma), B (prototipo) y C (texto). |
| Exportación SVG de Figma | 5 SVG (WF-001 v0.2, WF-002 a WF-005 v0.1, del 13/11) | Copia en `09-historico/diseno/`; evidencia gráfica. |

> **Limitación de esta versión:** los **identificadores de nodo** de cada frame no se han podido registrar porque el plan Starter de la integración con Figma alcanzó su límite de llamadas durante esta ejecución. Columna «ID de nodo» = `[ PENDIENTE DE VALIDACIÓN ]`. El estado de los frames procede de la consulta de metadatos previa y del texto de NEX-DOC-007. El archivo de Figma **no se ha modificado**.

## 2. Pantallas, estado y correspondencia

| ID | Pantalla | Figma | ID de nodo | Estado de revisión | Ruta frontend | Implementado |
|---|---|---|---|---|---|---|
| WF-001 | Dashboard | Frame v0.2 | [ PENDIENTE ] | **Aprobada** | [ PENDIENTE DE DEFINIR ] | No |
| WF-002 | Mis listas | Frame v0.1 | [ PENDIENTE ] | **Aprobada** | [ PENDIENTE DE DEFINIR ] | No |
| WF-003 | Detalle de lista | Frame v0.1 | [ PENDIENTE ] | Pendiente de validación | [ PENDIENTE DE DEFINIR ] | No |
| WF-004 | Crear y editar tarea | Frame v0.1 | [ PENDIENTE ] | Pendiente de validación | [ PENDIENTE DE DEFINIR ] | No |
| WF-005 | Gestionar participantes | Frame v0.1 | [ PENDIENTE ] | Pendiente de validación | [ PENDIENTE DE DEFINIR ] | No |
| WF-006 | Notificaciones | No existe | — | Solo prototipo (referencia pendiente de validar) | — | No |
| WF-007 | Inicio de sesión | No existe | — | Solo prototipo | — | No |
| WF-008 | Registro | No existe | — | Solo prototipo | — | No |
| WF-009 | Recuperar contraseña | No existe | — | Solo prototipo | — | No |
| WF-010 | Ajustes | No existe | — | Solo prototipo | — | No |
| WF-011 | Calendario | No existe | — | Solo prototipo | — | No |
| WF-012 | Kanban | No existe | — | Solo prototipo | — | No |
| WF-013 | Invitaciones recibidas | No existe | — | Solo prototipo | — | No |

**Aprobación declarada (2026-11-17):** el desarrollador comunica que el diseño ha sido aprobado y que el prototipo HTML «le ha gustado» a la profesora, y que el frontend se desarrollará siguiendo ese prototipo. Es la evidencia que se registra. **Alcance por confirmar:** si cubre las 13 pantallas tal como están en el prototipo (incluido el botón «Rechazar» y la navegación con «Invitaciones», I-25), y la adaptación a pantallas estrechas (I-26). Hasta confirmarlo, la tabla de arriba conserva los estados anteriores y el desarrollo sigue el prototipo.

Una pantalla dibujada en Figma **no** está aprobada por ese hecho. WF-003, WF-004 y WF-005 requieren validación expresa (P-13). WF-006 a WF-013 siguen siendo referencias del prototipo (P-18).

## 3. Navegación

Ver mapa en [NEX-DOC-003](../../../Nexora-Documentation/02-flujos/NEX-DOC-003_v0.1_flujos-y-pantallas.md) §4. Navegación lateral persistente en pantallas autenticadas (Inicio, Mis listas, Compartidas, Notificaciones, Ajustes y perfil); composición centrada sin navegación lateral en autenticación. La ruta de retorno debe mantenerse (ej.: Mis listas → Proyecto → Tareas → Nueva tarea).

## 4. Componentes y variantes

Figma **no tiene componentes ni variantes**. Los componentes reutilizables identificados en NEX-DOC-007 §20 están en [COMPONENTS](COMPONENTS.md). Antes de implementar conviene convertir en componentes de Figma al menos: botón, campo, etiqueta de estado, tarjeta y shell, con variantes (normal, hover, foco, deshabilitado, error). [ PROPUESTA ] Requiere autorización para modificar Figma.

## 5. Formularios, validaciones y mensajes

Reglas procedentes de NEX-DOC-007 y NEX-DOC-001 v0.5. Los **textos exactos** de los mensajes de error no están definidos en el diseño: se indica la regla y el texto queda por redactar.

| Pantalla | Campo | Regla | Mensaje |
|---|---|---|---|
| WF-008 Registro | Nombre de usuario | Obligatorio; único sin distinguir mayúsculas (RN-01, PROPUESTA) | [ PENDIENTE ] |
| WF-008 | Correo | Obligatorio; normalizado; único | [ PENDIENTE ] |
| WF-008 | Contraseña | Obligatoria; mínimo 12 caracteres (007) | [ PENDIENTE ] |
| WF-007 Inicio de sesión | Correo y contraseña | Error de credenciales genérico, sin decir cuál falló (CA-02) | Genérico; texto [ PENDIENTE ] |
| WF-009 Recuperar | Correo | Respuesta siempre genérica, exista o no la cuenta | Genérico; texto [ PENDIENTE ] |
| WF-004 Tarea | Título | Obligatorio; error junto al campo; no guardar sin título (CA-04, CA-15) | [ PENDIENTE ] |
| WF-004 | Descripción | Opcional | — |
| WF-004 | Fecha de vencimiento | Opcional; solo fecha, sin hora | — |
| WF-004 | Estado | «Por hacer» fijo al crear; editable al editar | — |
| WF-004 | Responsables | Selector múltiple; solo en listas compartidas; solo miembros (CA-17, CA-18) | [ PENDIENTE ] |
| WF-002 | Nueva lista: nombre, descripción | Nombre obligatorio, descripción opcional (001 §4.1). **No hay pantalla diseñada.** | [ PENDIENTE ] |
| WF-005 | Invitar usuario | Solo usuarios registrados; no duplicar invitación pendiente ni invitar a miembros | [ PENDIENTE ] |

El aviso de términos «Nexora · El uso de la aplicación está sujeto a sus términos de uso» aparece en WF-001, WF-007 y WF-008; el texto legal definitivo está pendiente.

## 6. Estados por pantalla

NEX-DOC-007 §18 define estados **transversales** (carga, vacío, error, validación, sin permiso, confirmación, éxito) pero **ningún frame los dibuja**. Esta tabla propone a qué pantallas aplica cada estado según su contenido, **sin aplicarlos indiscriminadamente**. [ PROPUESTA, NO APROBADA ]. «·» = no aplica.

| Pantalla | Carga | Vacío | Error | Validación | Sin permiso | Confirmación | Éxito |
|---|---|---|---|---|---|---|---|
| WF-001 Dashboard | Sí | Sí (sin tareas) | Sí | · | · | · | · |
| WF-002 Mis listas | Sí | Sí (sin listas / sin resultados de búsqueda) | Sí | · | · | Sí (eliminar lista) | Sí (lista creada) |
| WF-003 Detalle de lista | Sí | Sí (sin tareas) | Sí | · | Sí (lista ajena: se muestra como no encontrada, PROPUESTA) | Sí (eliminar tarea) | · |
| WF-004 Crear/editar tarea | · | · | Sí (fallo al guardar) | Sí | Sí | · | Sí (guardada) |
| WF-005 Participantes | Sí | Sí (sin invitaciones pendientes) | Sí | Sí (invitación duplicada) | Sí (solo propietario) | Sí (expulsar) | Sí (invitación enviada) |
| WF-006 Notificaciones | Sí | Sí (sin avisos) | Sí | · | · | · | · |
| WF-007 Inicio de sesión | Sí (al enviar) | · | Sí (credenciales) | Sí | · | · | · |
| WF-008 Registro | Sí (al enviar) | · | Sí | Sí | · | · | Sí (cuenta creada) |
| WF-009 Recuperar | Sí (al enviar) | · | Sí | Sí | · | · | Sí (mensaje genérico) |
| WF-010 Ajustes | · | · | Sí | · | · | · | Sí (preferencia guardada) |
| WF-011 Calendario | Sí | Sí (mes sin tareas; sección «Sin fecha») | Sí | · | · | · | · |
| WF-012 Kanban | Sí | Sí (columna vacía) | Sí | · | · | · | · |
| WF-013 Invitaciones recibidas | Sí | Sí (sin invitaciones) | Sí | · | · | · | Sí (aceptada) |

## 7. Comportamientos documentados y su procedencia

Distinción de NEX-DOC-007 §25 y §29:

- **Origen A (Figma):** estructura de WF-001 a WF-005 (ver NEX-DOC-007 §25.2).
- **Origen B (solo prototipo):** WF-006 a WF-013 completas; buscadores; filtros por tipo de lista; marcar como leído; navegación mensual; aceptar invitación. **No son requisitos.**
- **Origen C (solo texto):** cálculo real de contadores, validaciones, reglas de expulsión.
- **Contradicción abierta:** NEX-DOC-007 v0.6 dice que WF-013 no ofrece «rechazar», RN-05 sí lo contempla y **el prototipo actual sí incluye el botón «Rechazar»** (P-04, I-04, I-25).
- **Sin requisito funcional:** vistas Calendario y Kanban, buscadores (P-14, P-18).

### Hallazgos de la lectura del prototipo actual (2026-11-17)

Son hechos observados en `prototype.html`; **ninguno es requisito ni aprobación**.

| Observación | Frente a | Registro |
|---|---|---|
| Navegación lateral: Inicio, Mis listas, **Invitaciones**, Notificaciones, Ajustes. No hay «Compartidas». | 007 §4 (Inicio, Mis listas, Compartidas, Notificaciones, Ajustes y perfil) | I-25 |
| WF-013 con botones «Rechazar» y «Aceptar invitación». | 007 WF-013 (solo aceptar) | I-04, I-25 |
| El Dashboard etiqueta «Lista privada»; WF-002 usa la etiqueta «PERSONAL». | Terminología (P-03) | I-03 |
| Reglas CSS de adaptación a ≤1000 px y ≤720 px (sidebar horizontal, columnas apiladas). | 007 §21 (móvil, fase posterior); Figma sin frames móviles | I-26 |
| «Nueva lista» solo muestra un aviso; no hay formulario. «Añadir responsable» no tiene comportamiento. | Huecos de NEX-DOC-003 §9 | — |
| Los controles de búsqueda, filtros por estado y por responsable y los recuentos son estáticos. | RF-23 (PROPUESTA), P-14 | — |
| Sesión: aviso de 7 días en WF-010 y cierre de sesión simulado. Todas las acciones muestran «simulación visual». | 007 §29 | — |
| Los datos de ejemplo son ilustrativos y a veces incoherentes entre pantallas (por ejemplo, fechas distintas de una misma tarea en la lista y en Kanban). | 007 («cifras ilustrativas») | — |
| Barra de estado de tarea de WF-003: «Estado: Todos» y «Responsable: Todos»; tipografía Inter, tema oscuro y acento violeta. | 007 §2 | — |

## 8. Diseño responsive

Desktop-first (frames de 1440×1000). La adaptación móvil es fase posterior y **no está diseñada**: menú lateral → menú compacto, tablas → tarjetas o filas apiladas, calendario → agenda diaria, Kanban → desplazamiento horizontal o una columna a la vez (NEX-DOC-007 §21).

## 9. Accesibilidad

Criterios de NEX-DOC-007 §3 y §21: contraste suficiente, tamaños legibles, estado no comunicado solo por color (las tareas vencidas deben distinguirse sin depender solo del color), etiquetas visibles, foco visible, uso por teclado. Requisito no funcional de 001: nivel básico (contraste, teclado, etiquetas). Los valores de contraste concretos y los tokens están sin cerrar.

## 10. Correspondencia Figma ↔ frontend

Hoy es nula: no hay componentes ni rutas de Nexora. Cuando existan, esta sección registrará: frame/ID de nodo → ruta → componente de `features/` → prueba. Cadena de trazabilidad completa en [TRAZABILIDAD](../../../Nexora-Documentation/TRAZABILIDAD.md).

## 11. Pendientes de diseño antes de implementar (de NEX-DOC-007 §24 y §30)

1. Validar WF-003, WF-004 y WF-005; revisar WF-006 a WF-013.
2. Trasladar WF-006 a WF-013 a Figma (con autorización).
3. Diseñar los huecos de NEX-DOC-003 §9 (restablecer contraseña, nueva lista, confirmaciones, rechazar invitación, detalle de tarea).
4. Diseñar los estados de la sección 6 y la versión móvil.
5. Cerrar tokens de diseño, tipografía y contraste; textos legales; textos de error.
